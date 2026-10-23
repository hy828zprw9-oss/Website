// The road through the page: four small WebGL stages that share one procedural SPN Actros.
//
//   hero     the Actros comes out of the distance toward you, the camera walks round it,
//            then it pulls away to the right (scroll-linked after the intro)
//   shuttle  inside the Pendelverkehr card it runs A -> B, turns, and comes back
//   traffic  in the Fuhrpark section trucks pass left -> right and right -> left
//   away     at the end of the page it drives off into the dark, tail lights last
//
// Every stage renders only while on screen. With reduced motion each stage draws one still frame.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { mergeGeometries, toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { createSPNActrosLTractorUnitModel as createActros } from "../build/actros.web.ts";

const WHEEL_RADIUS = 0.53;
const TRUCK_MID = -3.0; // local z between the axles; trucks are placed and steered by this point
const WHEEL_IDS = ["wheelFront", "wheelFrontR", "wheelRear", "wheelRearR"];

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const mix = (a, b, t) => a + (b - a) * t;
const seg = (v, a, b) => clamp01((v - a) / (b - a));
const outQuart = (t) => 1 - (1 - t) ** 4;
const inCubic = (t) => t * t * t;
const inOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const deg = THREE.MathUtils.degToRad;

/* ---------- the truck ---------- */

let prototype = null;

// One merged mesh per material for the body, plus the four wheel stations as separate pivots
// so they can roll. Brings ~62 draw calls per truck down to about two dozen.
function truckPrototype() {
  if (prototype) return prototype;
  const model = createActros({ castShadow: false, receiveShadow: false });
  model.updateMatrixWorld(true);
  const nodes = model.userData.sculptRuntime.nodes;
  const wheelNodes = WHEEL_IDS.map((id) => nodes[id]);
  const wheelOf = (o) => {
    for (let p = o; p; p = p.parent) if (wheelNodes.includes(p)) return p;
    return null;
  };

  const group = new THREE.Group();
  group.name = "SPN Actros";
  const inverse = new THREE.Matrix4();
  const relative = new THREE.Matrix4();
  for (const node of wheelNodes) {
    const pivot = new THREE.Group();
    pivot.name = "wheel";
    node.matrixWorld.decompose(pivot.position, pivot.quaternion, pivot.scale);
    inverse.copy(node.matrixWorld).invert();
    node.traverse((o) => {
      if (!o.isMesh) return;
      const part = o.clone(false);
      relative.multiplyMatrices(inverse, o.matrixWorld);
      relative.decompose(part.position, part.quaternion, part.scale);
      pivot.add(part);
    });
    group.add(pivot);
  }

  const byMaterial = new Map();
  model.traverse((o) => {
    if (!o.isMesh || o.isInstancedMesh || wheelOf(o)) return;
    let g = o.geometry.clone().applyMatrix4(o.matrixWorld);
    // Smooth the rounded extrusion fillets, keep box edges crisp.
    g = toCreasedNormals(g, deg(35));
    for (const name of Object.keys(g.attributes)) if (!["position", "normal", "uv"].includes(name)) g.deleteAttribute(name);
    if (!byMaterial.has(o.material)) byMaterial.set(o.material, []);
    byMaterial.get(o.material).push(g);
  });
  for (const [material, geometries] of byMaterial) group.add(new THREE.Mesh(mergeGeometries(geometries), material));
  prototype = group;
  return prototype;
}

let glowMap = null;
function glowTexture() {
  if (glowMap) return glowMap;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, "rgba(255,255,255,1)");
  r.addColorStop(0.18, "rgba(255,255,255,0.85)");
  r.addColorStop(0.45, "rgba(255,255,255,0.22)");
  r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  glowMap = new THREE.CanvasTexture(c);
  glowMap.colorSpace = THREE.SRGBColorSpace;
  return glowMap;
}

let shadowMap = null;
function shadowTexture() {
  if (shadowMap) return shadowMap;
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 128;
  const g = c.getContext("2d");
  g.translate(32, 64);
  g.scale(1, 2);
  const r = g.createRadialGradient(0, 0, 4, 0, 0, 32);
  r.addColorStop(0, "rgba(0,0,0,0.55)");
  r.addColorStop(0.55, "rgba(0,0,0,0.3)");
  r.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = r;
  g.fillRect(-32, -32, 64, 64);
  shadowMap = new THREE.CanvasTexture(c);
  return shadowMap;
}

class Truck {
  constructor({ night = false } = {}) {
    this.object = truckPrototype().clone();
    this.wheels = this.object.children.filter((c) => c.name === "wheel");
    this.lamps = [];

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(3.3, 7.4),
      new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false, toneMapped: false, opacity: night ? 0.9 : 0.75 }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, 0.012, TRUCK_MID);
    shadow.renderOrder = 1;
    this.object.add(shadow);

    const lamp = (x, y, z, color, size, additive) => {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture(),
          color,
          transparent: true,
          depthWrite: false,
          fog: false,
          blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
          toneMapped: false,
        }),
      );
      sprite.position.set(x, y, z);
      sprite.userData.size = size;
      this.object.add(sprite);
      this.lamps.push(sprite);
      return sprite;
    };
    // Headlights sit just proud of the lens; tail lights on the rear cross-member.
    // By day the lamps are small lit points; at night they bloom (additive).
    for (const x of [-0.98, 0.98]) lamp(x, 0.9, 0.16, night ? "#eaf2ff" : "#ffffff", night ? 1.4 : 0.5, night);
    for (const x of [-0.82, 0.82]) lamp(x, 0.78, -6.16, night ? "#ff1f2d" : "#e0101c", night ? 1.25 : 0.32, night);
    this.distance = 0;
  }

  // Position by the mid point between the axles, heading as rotation about Y (0 = +Z).
  place(x, z, heading = 0) {
    this.object.rotation.y = heading;
    this.object.position.set(x - Math.sin(heading) * TRUCK_MID, 0, z - Math.cos(heading) * TRUCK_MID);
  }

  roll(distance) {
    this.distance = distance;
    const angle = distance / WHEEL_RADIUS;
    for (const w of this.wheels) w.rotation.x = angle;
  }

  // Keep lamps a few pixels wide at any distance so a far truck still reads as two lights.
  sizeLamps(camera, pixelsFloor, viewportHeight) {
    const world = new THREE.Vector3();
    const perPixel = (2 * Math.tan(deg(camera.fov) / 2)) / viewportHeight;
    for (const s of this.lamps) {
      s.getWorldPosition(world);
      const d = world.distanceTo(camera.position);
      const size = Math.max(s.userData.size, d * perPixel * pixelsFloor);
      s.scale.set(size, size, 1);
    }
  }
}

/* ---------- scenery ---------- */

function roadTexture(night, anisotropy) {
  // One 12 m tile of a two-lane road, 9 m wide: edge lines and a dashed centre line.
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 512;
  const g = c.getContext("2d");
  const pxPerM = 256 / 9;
  const pyPerM = 512 / 12;
  g.fillStyle = night ? "#0c0c0e" : "#e7e7eb";
  g.fillRect(0, 0, 256, 512);
  g.fillStyle = night ? "#3a3a3c" : "#ffffff";
  g.fillRect(0.35 * pxPerM, 0, 0.15 * pxPerM, 512);
  g.fillRect(256 - 0.5 * pxPerM, 0, 0.15 * pxPerM, 512);
  g.fillRect(128 - 0.075 * pxPerM, 0, 0.15 * pxPerM, 4.5 * pyPerM);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = anisotropy;
  return t;
}

function road(stage, { night, centreX = 1.75, from = -400, to = 400 }) {
  const length = to - from;
  const map = roadTexture(night, stage.renderer.capabilities.getMaxAnisotropy());
  map.repeat.set(1, length / 12);
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(9, length), new THREE.MeshBasicMaterial({ map, toneMapped: false }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(centreX, 0, (from + to) / 2);
  return mesh;
}

function lightRig(scene, { night }) {
  const key = new THREE.DirectionalLight(night ? "#ffffff" : "#fff4e6", night ? 2.4 : 2.3);
  const rim = new THREE.DirectionalLight(night ? "#c4d6ff" : "#e2ebff", night ? 1.7 : 1.1);
  if (night) {
    scene.add(new THREE.HemisphereLight("#8c96a8", "#050505", 0.5));
    key.position.set(-8, 11, -6);
    rim.position.set(7, 5, 10);
  } else {
    scene.add(new THREE.HemisphereLight("#ffffff", "#c9cbd1", 1.5));
    key.position.set(-9, 12, 9);
    rim.position.set(6, 6, -10);
  }
  scene.add(key, rim);
  return { key, rim };
}

/* ---------- stage plumbing ---------- */

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

class Stage {
  constructor(host, { background, night = false, fov = 30, fog = null, exposure = night ? 1.0 : 1.12 }) {
    this.host = host;
    this.night = night;
    this.canvas = document.createElement("canvas");
    this.canvas.className = "stage3d";
    this.canvas.setAttribute("aria-hidden", "true");
    host.prepend(this.canvas);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = exposure;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(background);
    if (fog) this.scene.fog = new THREE.Fog(background, fog[0], fog[1]);
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = night ? 0.4 : 0.85;
    pmrem.dispose();
    this.lights = lightRig(this.scene, { night });

    this.camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 600);
    this.width = 1;
    this.height = 1;
    this.visible = false;
    new ResizeObserver(() => this.resize()).observe(host);
    this.resize();
  }

  resize() {
    const w = Math.max(1, this.host.clientWidth);
    const h = Math.max(1, this.host.clientHeight);
    if (w === this.width && h === this.height) return;
    this.width = w;
    this.height = h;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (reduced.matches && this.ready) this.frame(0, 0);
  }

  // Distance at which a box of the given projected width/height fits the given frame fractions.
  fit(objWidth, objHeight, fracW, fracH) {
    const t = Math.tan(deg(this.camera.fov) / 2);
    return Math.max(objHeight / fracH / (2 * t), objWidth / fracW / (2 * t * this.camera.aspect));
  }

  orbit(target, azimuth, elevation, distance) {
    const a = deg(azimuth);
    const e = deg(elevation);
    this.camera.position.set(
      target.x + Math.sin(a) * Math.cos(e) * distance,
      target.y + Math.sin(e) * distance,
      target.z + Math.cos(a) * Math.cos(e) * distance,
    );
    this.camera.lookAt(target);
  }

  frame(time, dt) {
    this.update(time, dt);
    this.renderer.render(this.scene, this.camera);
    if (!this.live) {
      this.live = true;
      this.host.classList.add("is-live");
    }
  }
}

const vh = () => window.innerHeight || document.documentElement.clientHeight;

/* ---------- hero: approach, walk-round, pull away ---------- */

class HeroStage extends Stage {
  constructor(host, section) {
    super(host, { background: "#f5f5f7", fov: 30, fog: [40, 200] });
    this.section = section;
    this.scene.add(road(this, { night: false, centreX: 1.75, from: -420, to: 160 }));
    this.truck = new Truck();
    this.scene.add(this.truck.object);
    this.target = new THREE.Vector3();
    this.introStart = null;
    // Arriving after the visitor has already scrolled down: skip the approach.
    if (this.progress() > 0.04 || reduced.matches) this.introStart = -1e9;

    // A real cast shadow from the key light on the road; the blob stays as contact occlusion.
    // The shadow frustum travels with the truck so it stays tight (and sharp) all the way in.
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const { key } = this.lights;
    key.castShadow = true;
    const mapSize = window.matchMedia("(max-width: 48rem)").matches ? 1024 : 2048;
    key.shadow.mapSize.set(mapSize, mapSize);
    Object.assign(key.shadow.camera, { left: -6, right: 6, top: 7, bottom: -7, near: 1, far: 60 });
    key.shadow.camera.updateProjectionMatrix();
    key.shadow.bias = -0.0005;
    key.shadow.normalBias = 0.03;
    this.keyDirection = key.position.clone().normalize().multiplyScalar(24);
    this.scene.add(key.target);
    const catcher = new THREE.Mesh(new THREE.PlaneGeometry(40, 640), new THREE.ShadowMaterial({ opacity: 0.2 }));
    catcher.rotation.x = -Math.PI / 2;
    catcher.position.set(1.75, 0.005, -150);
    catcher.receiveShadow = true;
    this.scene.add(catcher);
    this.truck.object.traverse((o) => {
      if (o.isMesh && !o.material.transparent) o.castShadow = true;
    });

    // Desktop: the camera leans a few degrees toward the pointer, damped, so the scene has depth
    // to the hand as well as to the scroll.
    this.pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener(
        "pointermove",
        (event) => {
          this.pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
          this.pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
        },
        { passive: true },
      );
    }
  }

  progress() {
    const r = this.section.getBoundingClientRect();
    return clamp01(-r.top / Math.max(1, r.height - vh()));
  }

  update(time) {
    const dt = this.lastTime === undefined ? 0 : Math.max(0, time - this.lastTime);
    // The approach runs on capped frame steps from the first drawn frame, so a slow first
    // frame (shader compile) does not swallow the start of it.
    if (this.introStart === null) {
      this.introStart = 0;
      this.introClock = 0;
    } else if (this.introStart === 0) {
      this.introClock += Math.min(time - this.lastTime, 1 / 30);
    }
    this.lastTime = time;
    const k = reduced.matches || this.introStart !== 0 ? 1 : clamp01(this.introClock / 4.2);
    const p = reduced.matches ? 0 : this.progress();

    const arrive = outQuart(k);
    const leave = inCubic(seg(p, 0.5, 0.94));
    const z = mix(-190, 0, arrive) + 80 * leave;
    this.truck.place(0, z + TRUCK_MID, 0);
    this.truck.roll(z);

    const turn = inOutCubic(seg(p, 0.04, 0.5));
    const sway = reduced.matches ? 0 : Math.sin(time * 0.35) * 2.2 * (1 - turn) * arrive;
    const follow = reduced.matches ? 0 : 1 - Math.exp(-dt * 3);
    this.pointer.x += (this.pointer.tx - this.pointer.x) * follow;
    this.pointer.y += (this.pointer.ty - this.pointer.y) * follow;
    const lean = arrive * (1 - 0.7 * turn);
    const azimuth = mix(mix(-3, -30, inOutCubic(k)), -90, turn) + sway + this.pointer.x * 6 * lean;
    const elevation = Math.max(1, mix(4.5, 2.5, turn) - this.pointer.y * 2 * lean);

    const a = Math.abs(Math.sin(deg(azimuth)));
    const projectedWidth = 2.5 * Math.sqrt(1 - a * a) + 6.4 * a;
    const narrow = this.camera.aspect < 0.8;
    const distance = this.fit(projectedWidth, 4.0, narrow ? 0.88 : 0.6, narrow ? 0.34 : 0.4);
    // Phones frame the whole tractor (rear chassis included), wide screens favour the cab.
    this.target.set(0, 1.85, mix(narrow ? -2.7 : -1.9, TRUCK_MID, turn));
    this.orbit(this.target, azimuth, elevation, distance);

    // Sit the truck under the headline, then centre it once the copy has gone.
    const drop = mix(narrow ? 0.27 : 0.25, 0.06, turn);
    this.camera.setViewOffset(this.width, this.height, 0, -drop * this.height, this.width, this.height);
    this.truck.sizeLamps(this.camera, 3, this.height);

    const { key } = this.lights;
    key.target.position.set(0, 0, z + TRUCK_MID);
    key.position.copy(key.target.position).add(this.keyDirection);
  }
}

/* ---------- shuttle: A -> B, U-turn, back ---------- */

const LANE = 2.6;
const HALF = 9;
const STOP = 3.2; // stops sit where the whole truck stands on the straight; A/B mark its middle
const ARC = Math.PI * LANE;
const LOOP = 4 * HALF + 2 * ARC;

function loopPoint(s) {
  s = ((s % LOOP) + LOOP) % LOOP;
  if (s < 2 * HALF) return { x: -LANE, z: -HALF + s, tx: 0, tz: 1 };
  s -= 2 * HALF;
  if (s < ARC) {
    const th = Math.PI - s / LANE;
    return { x: LANE * Math.cos(th), z: HALF + LANE * Math.sin(th), tx: Math.sin(th), tz: -Math.cos(th) };
  }
  s -= ARC;
  if (s < 2 * HALF) return { x: LANE, z: HALF - s, tx: 0, tz: -1 };
  s -= 2 * HALF;
  const th = -s / LANE;
  return { x: LANE * Math.cos(th), z: -HALF + LANE * Math.sin(th), tx: Math.sin(th), tz: -Math.cos(th) };
}

class ShuttleStage extends Stage {
  constructor(host) {
    super(host, { background: "#ffffff", fov: 22, exposure: 0.95 });
    // Track ribbon along the loop.
    const pts = [];
    for (let i = 0; i <= 160; i++) {
      const q = loopPoint((i / 160) * LOOP);
      pts.push(new THREE.Vector3(q.x, 0.01, q.z));
    }
    const curve = new THREE.CatmullRomCurve3(pts, true);
    const ribbon = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 240, 0.06, 4, true),
      new THREE.MeshBasicMaterial({ color: "#d2d2d7", toneMapped: false }),
    );
    ribbon.scale.y = 0.2;
    this.scene.add(ribbon);
    const stop = new THREE.MeshBasicMaterial({ color: "#1d1d1f", toneMapped: false });
    for (const z of [-HALF + STOP, HALF - STOP]) {
      const disc = new THREE.Mesh(new THREE.CircleGeometry(0.3, 32), stop);
      disc.rotation.x = -Math.PI / 2;
      disc.position.set(-LANE - 1.9, 0.015, z);
      this.scene.add(disc);
    }
    this.truck = new Truck();
    this.scene.add(this.truck.object);
    this.labels = [...host.querySelectorAll("[data-stop]")];
    this.stops = [new THREE.Vector3(-LANE - 1.9, 0, -HALF + STOP), new THREE.Vector3(-LANE - 1.9, 0, HALF - STOP)];
  }

  update(time) {
    // hold at A 1.1 s, A -> B 3 s, hold at B 1.1 s, round the far side back to A 5.8 s
    const t = reduced.matches ? 0 : time % 11;
    const a = STOP;
    const b = 2 * HALF - STOP;
    let s;
    if (t < 1.1) s = a;
    else if (t < 4.1) s = mix(a, b, inOutCubic((t - 1.1) / 3));
    else if (t < 5.2) s = b;
    else s = mix(b, LOOP + a, inOutCubic((t - 5.2) / 5.8));
    const q = loopPoint(s);
    this.truck.place(q.x, q.z, Math.atan2(q.tx, q.tz));
    this.truck.roll(Math.floor((reduced.matches ? 0 : time) / 11) * LOOP + s);

    // The loop plus a truck half-way round either U-turn: about 27 m end to end.
    const distance = this.fit(2 * (HALF + LANE + 1.8), 11, 0.98, 0.9);
    this.orbit(new THREE.Vector3(0.2, 0, 0), -90, 56, distance);
    this.camera.updateMatrixWorld();
    this.truck.sizeLamps(this.camera, 2, this.height);

    // Pin the A / B captions under their stop discs.
    const v = new THREE.Vector3();
    this.labels.forEach((label, i) => {
      v.copy(this.stops[i]).project(this.camera);
      label.style.transform = `translate(${((v.x + 1) / 2) * this.width}px, ${((1 - v.y) / 2) * this.height}px)`;
    });
  }
}

/* ---------- traffic: both directions through the frame ---------- */

class TrafficStage extends Stage {
  constructor(host) {
    super(host, { background: "#000000", night: true, fov: 24, fog: [26, 70] });
    this.scene.add(road(this, { night: true, centreX: 0, from: -300, to: 300 }));
    this.pool = Array.from({ length: 6 }, () => {
      const truck = new Truck({ night: true });
      truck.object.visible = false;
      this.scene.add(truck.object);
      return { truck, active: false };
    });
    this.lanes = [
      { x: -1.75, dir: 1, speed: 12.5, next: 0 },
      { x: 1.75, dir: -1, speed: 10, next: 1.4 },
    ];
    this.last = null;
    this.target = new THREE.Vector3();
  }

  progress() {
    const r = this.host.getBoundingClientRect();
    return clamp01((vh() - r.top) / (vh() + r.height));
  }

  spawn(lane, z) {
    const slot = this.pool.find((s) => !s.active);
    if (!slot) return;
    Object.assign(slot, { active: true, lane, z, distance: Math.random() * 10 });
    slot.truck.object.visible = true;
  }

  update(time) {
    const p = this.progress();
    // Phones see one truck at a time, bigger; wide screens see both lanes pass.
    const distance = this.fit(this.camera.aspect < 1.4 ? 8 : 14, 4.2, 0.9, 0.6);
    this.target.set(0, 1.7, mix(-3, 3, p));
    this.orbit(this.target, mix(-82, -98, p), 3.5, distance);
    this.camera.updateMatrixWorld();
    const narrow = this.camera.aspect < 1.4;
    const edge = distance * Math.tan(deg(this.camera.fov) / 2) * this.camera.aspect + 7.5;

    if (reduced.matches) {
      if (!this.parked) {
        this.parked = true;
        this.spawn(this.lanes[0], -3.5);
        this.spawn(this.lanes[1], 5.5);
      }
    } else {
      const dt = this.last === null ? 0 : Math.min(0.1, time - this.last);
      this.last = time;
      if (!this.seeded) {
        this.seeded = true;
        this.spawn(this.lanes[0], -6);
        this.spawn(this.lanes[1], 9);
      }
      for (const lane of this.lanes) {
        lane.next -= dt;
        if (lane.next <= 0) {
          this.spawn(lane, -lane.dir * edge + this.target.z);
          // A phone sees a short stretch of road, so traffic comes more often there.
          lane.next = narrow ? 1.4 + Math.random() * 1.2 : 2.4 + Math.random() * 2;
        }
      }
      for (const s of this.pool) {
        if (!s.active) continue;
        s.z += s.lane.dir * s.lane.speed * dt;
        s.distance += s.lane.speed * dt;
        if (Math.abs(s.z - this.target.z) > edge + 2) {
          s.active = false;
          s.truck.object.visible = false;
        }
      }
    }
    for (const s of this.pool) {
      if (!s.active) continue;
      s.truck.place(s.lane.x, s.z, s.lane.dir > 0 ? 0 : Math.PI);
      s.truck.roll(s.distance);
      s.truck.sizeLamps(this.camera, 2, this.height);
    }
  }
}

/* ---------- away: drives off into the dark as the page ends ---------- */

class AwayStage extends Stage {
  constructor(host) {
    super(host, { background: "#000000", night: true, fov: 28, fog: [24, 120] });
    this.scene.add(road(this, { night: true, centreX: 1.75, from: -40, to: 420 }));
    this.truck = new Truck({ night: true });
    this.scene.add(this.truck.object);
  }

  progress() {
    const r = this.host.getBoundingClientRect();
    const start = r.top + window.scrollY - vh();
    const end = document.documentElement.scrollHeight - vh();
    if (end <= start) return 1;
    return clamp01((window.scrollY - start) / (end - start));
  }

  update() {
    const p = reduced.matches ? 0.35 : this.progress();
    const z = mix(5, 190, p * p);
    this.truck.place(0, z, 0);
    this.truck.roll(z);
    const narrow = this.camera.aspect < 0.9;
    this.camera.position.set(narrow ? 0.6 : 1.2, 2.5, narrow ? -15 : -11);
    this.camera.lookAt(0.4, 1.6, 40);
    this.camera.updateMatrixWorld();
    this.truck.sizeLamps(this.camera, 4, this.height);
  }
}

/* ---------- mount ---------- */

const KINDS = {
  hero: (host) => new HeroStage(host, host.closest("[data-scroll-stage]") ?? host),
  shuttle: (host) => new ShuttleStage(host),
  traffic: (host) => new TrafficStage(host),
  away: (host) => new AwayStage(host),
};

export function mountRoad({ root = document, onFail = () => {} } = {}) {
  const hosts = [...root.querySelectorAll("[data-stage]")].filter((h) => KINDS[h.dataset.stage]);
  const stages = new Map();
  let running = false;
  const clock = new THREE.Clock();

  const loop = () => {
    const live = [...stages.values()].filter((s) => s.visible);
    if (!live.length || reduced.matches) {
      running = false;
      return;
    }
    const time = clock.getElapsedTime();
    for (const s of live) s.frame(time);
    requestAnimationFrame(loop);
  };
  const wake = () => {
    if (running || reduced.matches) return;
    running = true;
    requestAnimationFrame(loop);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        let stage = stages.get(entry.target);
        if (!stage && entry.isIntersecting) {
          try {
            stage = KINDS[entry.target.dataset.stage](entry.target);
          } catch (error) {
            // No WebGL after all: stop here and let the page fall back to its photo scenes.
            io.disconnect();
            onFail(error);
            return;
          }
          stage.ready = true;
          stages.set(entry.target, stage);
        }
        if (!stage) continue;
        stage.visible = entry.isIntersecting;
        if (stage.visible && reduced.matches) stage.frame(0, 0);
      }
      wake();
    },
    { rootMargin: "25% 0px" },
  );
  for (const host of hosts) io.observe(host);

  reduced.addEventListener?.("change", () => {
    for (const s of stages.values()) if (s.visible) s.frame(0, 0);
    wake();
  });
  return stages;
}
