// SPN Actros L (DT E 1005), detailed procedural model for the web.
//
// The img2threejs reconstruction in ../actros/ fixed the measurements (cab 2.5 x 2.3 m, height
// 3.96 m, wheel stations, camera solve against the owner's photo). Its generator only knows boxes,
// cylinders and straight extrusions, which is why that build read as a toy. This module models the
// same truck with the shapes a real one needs: a lofted cab with rounded edges and a raked
// windscreen, a perforated grille with bars and star, lathed tyres with tread and steel disc
// wheels, and the chassis parts that show from the side. Still code only: no downloaded meshes,
// no photo textures; small canvas textures carry the plate, lettering, grille mesh and tread.
//
// Frame: metres, Y up, vehicle forward +Z, the vehicle's left is +X, origin on the ground under
// the front of the cab. buildActros returns a Group: the body merged per material, plus four
// pivots named "wheel" that roll about X. LAMPS gives the lamp positions in the same frame.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { TessellateModifier } from "three/examples/jsm/modifiers/TessellateModifier.js";
import { mergeGeometries, mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const TAU = Math.PI * 2;
export const WHEEL_RADIUS = 0.505;
export const FRONT_AXLE = -1.45;
export const REAR_AXLE = -5.15;
export const TRUCK_MID = (FRONT_AXLE + REAR_AXLE) / 2;

/* ---------------- materials ---------------- */

function canvas(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  return c;
}

function texture(c, { srgb = true, repeat = null } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  return t;
}

// Perforated grille: staggered round holes, as colour and bump.
function grilleMaps() {
  const draw = (g, w, h, hole, plate) => {
    g.fillStyle = plate;
    g.fillRect(0, 0, w, h);
    g.fillStyle = hole;
    const step = w / 8;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        g.beginPath();
        g.arc(col * step + (row % 2 ? step / 2 : 0), row * step * 0.866, step * 0.34, 0, TAU);
        g.fill();
      }
    }
  };
  return {
    // UVs are metres; ten tiles per metre puts the holes about 12 mm apart, as on the truck.
    map: texture(canvas(64, 56, (g, w, h) => draw(g, w, h, "#08090a", "#b4b8bd")), { repeat: [10, 11.4] }),
    bump: texture(canvas(64, 56, (g, w, h) => draw(g, w, h, "#000", "#fff")), { srgb: false, repeat: [10, 11.4] }),
  };
}

// Tyre tread: four circumferential grooves plus sipes, only on the running band.
function treadBump() {
  const c = canvas(64, 256, (g, w, h) => {
    g.fillStyle = "#808080";
    g.fillRect(0, 0, w, h);
    g.fillStyle = "#fff";
    g.fillRect(0, h * 0.34, w, h * 0.32);
    g.fillStyle = "#000";
    for (const v of [0.38, 0.46, 0.54, 0.62]) g.fillRect(0, h * v, w, h * 0.018);
    for (let i = 0; i < 4; i++) {
      g.save();
      g.translate((i + 0.5) * (w / 4), h * 0.5);
      g.rotate(0.35);
      g.fillRect(-1, -h * 0.15, 2, h * 0.3);
      g.restore();
    }
  });
  return texture(c, { srgb: false, repeat: [24, 1] });
}

function plateMap() {
  return texture(
    canvas(520, 110, (g, w, h) => {
      g.fillStyle = "#f3f3ef";
      g.fillRect(0, 0, w, h);
      g.fillStyle = "#123c9c";
      g.fillRect(0, 0, 58, h);
      g.fillStyle = "#ffd22e";
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU;
        g.beginPath();
        g.arc(29 + Math.cos(a) * 15, 38 + Math.sin(a) * 15, 2.6, 0, TAU);
        g.fill();
      }
      g.fillStyle = "#fff";
      g.font = "bold 26px sans-serif";
      g.textAlign = "center";
      g.fillText("D", 29, 96);
      g.strokeStyle = "#222";
      g.lineWidth = 5;
      g.strokeRect(2.5, 2.5, w - 5, h - 5);
      g.fillStyle = "#111";
      g.font = "bold 84px 'DIN Alternate', 'Arial Narrow', Arial, sans-serif";
      g.textAlign = "left";
      g.fillText("DT E 1005", 78, 86);
    }),
  );
}

function letteringMap(text, color, font) {
  return texture(
    canvas(1024, 128, (g, w, h) => {
      g.clearRect(0, 0, w, h);
      g.fillStyle = color;
      g.font = font;
      g.textBaseline = "middle";
      g.fillText(text, 8, h / 2 + 4);
    }),
  );
}

// The light strip on the sun visor: "GIGA" bold, "SPACE" thin, widely tracked.
function nameplateMap() {
  return texture(
    canvas(1024, 64, (g, w, h) => {
      g.fillStyle = "#d4d7db";
      g.fillRect(0, 0, w, h);
      g.fillStyle = "#3a3d42";
      g.textBaseline = "middle";
      let x = 330;
      for (const [text, weight] of [["GIGA", 800], ["SPACE", 300]]) {
        g.font = `${weight} 34px Archivo, Arial, sans-serif`;
        for (const ch of text) {
          g.fillText(ch, x, h / 2 + 2);
          x += g.measureText(ch).width + 14;
        }
      }
    }),
  );
}

function makeMaterials({ night }) {
  const P = (o) => new THREE.MeshPhysicalMaterial(o);
  const grille = grilleMaps();
  return {
    // Silver metallic: partial metalness under a clear coat reads as paint, not bare metal.
    paint: P({ color: "#c2c6cc", metalness: 0.6, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.05 }),
    trim: P({ color: "#121315", roughness: 0.55 }),
    gloss: P({ color: "#0b0b0c", roughness: 0.18, clearcoat: 0.8, clearcoatRoughness: 0.08 }),
    // Tinted, see-through glass: the cab interior shows behind it, the studio panels reflect on it.
    glass: P({ color: "#58606b", roughness: 0.04, metalness: 0.9, envMapIntensity: 1.3, transparent: true, opacity: 0.62 }),
    cabin: new THREE.MeshStandardMaterial({ color: "#4a4d53", roughness: 0.8 }),
    shell: new THREE.MeshStandardMaterial({ color: "#232529", roughness: 0.9, side: THREE.BackSide }),
    screen: new THREE.MeshStandardMaterial({ color: "#000", emissive: "#7fb2ff", emissiveIntensity: night ? 0.9 : 0.5 }),
    cavity: new THREE.MeshStandardMaterial({ color: "#040405", roughness: 0.9 }),
    nameplate: new THREE.MeshStandardMaterial({ map: nameplateMap(), roughness: 0.35, metalness: 0.4 }),
    chrome: P({ color: "#eef0f3", metalness: 1, roughness: 0.06 }),
    satin: P({ color: "#c7cbd1", metalness: 1, roughness: 0.24 }),
    grille: P({ color: "#ffffff", map: grille.map, bumpMap: grille.bump, bumpScale: 1.2, metalness: 0.65, roughness: 0.38 }),
    rubber: P({ color: "#151516", roughness: 0.9, bumpMap: treadBump(), bumpScale: 2.5 }),
    rim: P({ color: "#26282c", metalness: 0.55, roughness: 0.32, clearcoat: 0.4 }),
    alu: P({ color: "#cfd3d8", metalness: 1, roughness: 0.3 }),
    chassis: P({ color: "#101112", roughness: 0.72 }),
    lens: P({ color: "#15181c", roughness: 0.04, clearcoat: 1, metalness: 0.3 }),
    led: new THREE.MeshStandardMaterial({ color: "#000", emissive: "#eef5ff", emissiveIntensity: night ? 3.2 : 1.6 }),
    tail: new THREE.MeshStandardMaterial({ color: "#2a0000", emissive: "#ff1724", emissiveIntensity: night ? 2.4 : 1.2 }),
    amber: new THREE.MeshStandardMaterial({ color: "#2a1400", emissive: "#ff8a00", emissiveIntensity: night ? 1.4 : 0.8 }),
    plate: new THREE.MeshStandardMaterial({ map: plateMap(), roughness: 0.5 }),
    lettering: new THREE.MeshStandardMaterial({
      map: letteringMap("SPN-TRANSPORTE", "#2b2d31", "italic 800 78px Saira, 'Arial Black', sans-serif"),
      transparent: true,
      roughness: 0.4,
      metalness: 0.3,
    }),
    model: new THREE.MeshStandardMaterial({
      map: letteringMap("ACTROS L", "#1d1f23", "italic 700 84px Archivo, 'Arial Black', sans-serif"),
      transparent: true,
      roughness: 0.4,
      metalness: 0.3,
    }),
    sideLettering: new THREE.MeshStandardMaterial({
      map: letteringMap("SPN-TRANSPORTE", "#d0111f", "italic 800 78px Saira, 'Arial Black', sans-serif"),
      transparent: true,
      roughness: 0.4,
    }),
  };
}

/* ---------------- geometry helpers ---------------- */

const SEG = { front: 7, corner: 9, side: 16, rear: 14 };

// Plan-view rounded rectangle, sampled with fixed counts per segment so neighbouring sections
// stay in step (corner maps to corner) when they are lofted together.
function planRing({ hw, zf, zr, r }) {
  r = Math.min(r, hw - 0.01, (zf - zr) / 2 - 0.01);
  const pts = [];
  const line = (x0, z0, x1, z1, n) => {
    for (let i = 0; i < n; i++) pts.push([x0 + ((x1 - x0) * i) / n, z0 + ((z1 - z0) * i) / n]);
  };
  const arc = (cx, cz, a0, a1, n) => {
    for (let i = 0; i < n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      pts.push([cx + r * Math.cos(a), cz + r * Math.sin(a)]);
    }
  };
  line(0, zf, hw - r, zf, SEG.front);
  arc(hw - r, zf - r, Math.PI / 2, 0, SEG.corner);
  line(hw, zf - r, hw, zr + r, SEG.side);
  arc(hw - r, zr + r, 0, -Math.PI / 2, SEG.corner);
  line(hw - r, zr, -(hw - r), zr, SEG.rear);
  arc(-(hw - r), zr + r, -Math.PI / 2, -Math.PI, SEG.corner);
  line(-hw, zr + r, -hw, zf - r, SEG.side);
  arc(-(hw - r), zf - r, Math.PI, Math.PI / 2, SEG.corner);
  line(-(hw - r), zf, 0, zf, SEG.front);
  return pts;
}

// Loft horizontal plan rings (each {y, hw, zf, zr, r}) into one smooth closed body.
function loft(sections, { capTop = true, capBottom = true, skip = null } = {}) {
  const rings = sections.map((s) => planRing(s));
  const n = rings[0].length;
  const pos = [];
  const uv = [];
  sections.forEach((s, j) => {
    rings[j].forEach(([x, z], i) => {
      pos.push(x, s.y, z);
      uv.push(i / n, j / (sections.length - 1));
    });
  });
  const idx = [];
  for (let j = 0; j < sections.length - 1; j++) {
    for (let i = 0; i < n; i++) {
      if (skip && skip(i, j)) continue;
      const a = j * n + i;
      const b = j * n + ((i + 1) % n);
      const c = (j + 1) * n + i;
      const d = (j + 1) * n + ((i + 1) % n);
      idx.push(a, d, b, a, c, d);
    }
  }
  const cap = (j, up) => {
    const s = sections[j];
    const ring = rings[j];
    const cx = ring.reduce((acc, p) => acc + p[0], 0) / n;
    const cz = ring.reduce((acc, p) => acc + p[1], 0) / n;
    const centre = pos.length / 3;
    pos.push(cx, s.y, cz);
    uv.push(0.5, up ? 1 : 0);
    for (let i = 0; i < n; i++) {
      const a = j * n + i;
      const b = j * n + ((i + 1) % n);
      if (up) idx.push(centre, b, a);
      else idx.push(centre, a, b);
    }
  };
  if (capTop) cap(sections.length - 1, true);
  if (capBottom) cap(0, false);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  // Winding check: the front-centre vertex of the middle ring must face +Z.
  const probe = Math.floor(sections.length / 2) * n;
  if (g.attributes.normal.getZ(probe) < 0) {
    for (let k = 0; k < idx.length; k += 3) [idx[k + 1], idx[k + 2]] = [idx[k + 2], idx[k + 1]];
    g.setIndex(idx);
    g.computeVertexNormals();
  }
  return g;
}

// Section values at height y (linear between neighbours).
function sectionAt(sections, y) {
  if (y <= sections[0].y) return sections[0];
  for (let j = 0; j < sections.length - 1; j++) {
    const a = sections[j];
    const b = sections[j + 1];
    if (y <= b.y) {
      const t = (y - a.y) / (b.y - a.y);
      const m = (k) => a[k] + (b[k] - a[k]) * t;
      return { y, hw: m("hw"), zf: m("zf"), zr: m("zr"), r: m("r") };
    }
  }
  return sections[sections.length - 1];
}

// The body's front surface: z at (x, y), following the plan corner radius.
function frontZ(sections, x, y) {
  const s = sectionAt(sections, y);
  const flat = s.hw - s.r;
  const ax = Math.abs(x);
  if (ax <= flat) return s.zf;
  const dx = Math.min(ax - flat, s.r);
  return s.zf - s.r + Math.sqrt(Math.max(0, s.r * s.r - dx * dx));
}

// Points on the body surface, pushed `off` out along the plan normal (not just along one axis,
// which would sink a panel into the rounded corners and make it flicker there).
function onFrontOf(sections, x, y, off, out) {
  const s = sectionAt(sections, y);
  const dx = Math.min(Math.max(Math.abs(x) - (s.hw - s.r), 0), s.r);
  const dz = Math.sqrt(Math.max(0, s.r * s.r - dx * dx));
  return out.set(x + Math.sign(x) * (dx / s.r) * off, y, s.zf - s.r + dz + (dz / s.r) * off);
}

function onSideOf(sections, z, y, off, out) {
  const s = sectionAt(sections, y);
  const front = s.zf - s.r;
  const rear = s.zr + s.r;
  const dz = z > front ? Math.min(z - front, s.r) : z < rear ? -Math.min(rear - z, s.r) : 0;
  const dx = Math.sqrt(Math.max(0, s.r * s.r - dz * dz));
  return out.set(s.hw - s.r + dx + (dx / s.r) * off, y, z + (dz / s.r) * off);
}

// A thin panel cut from a 2D outline and pressed onto a surface. project(u, v) -> Vector3.
function pressed(outline, project, maxEdge = 0.07, holes = []) {
  const shape = new THREE.Shape(outline.map(([u, v]) => new THREE.Vector2(u, v)));
  for (const hole of holes) shape.holes.push(new THREE.Path(hole.map(([u, v]) => new THREE.Vector2(u, v))));
  let g = new THREE.ShapeGeometry(shape, 6);
  g.deleteAttribute("normal");
  g = new TessellateModifier(maxEdge, 8).modify(g);
  const p = g.attributes.position;
  const v3 = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    project(p.getX(i), p.getY(i), v3);
    p.setXYZ(i, v3.x, v3.y, v3.z);
  }
  g = mergeVertices(g);
  g.computeVertexNormals();
  return g;
}

function roundedRect(x0, y0, x1, y1, r, seg = 5) {
  const pts = [];
  const corners = [
    [x1 - r, y0 + r, -Math.PI / 2],
    [x1 - r, y1 - r, 0],
    [x0 + r, y1 - r, Math.PI / 2],
    [x0 + r, y0 + r, Math.PI],
  ];
  for (const [cx, cy, a0] of corners) {
    for (let i = 0; i <= seg; i++) {
      const a = a0 + (Math.PI / 2) * (i / seg);
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
  }
  return pts;
}

// Fillet segments scale with the build quality (set per build): far-away trucks need fewer.
let filletQuality = 1;
const rbox = (w, h, d, r, seg = 3) =>
  new RoundedBoxGeometry(w, h, d, Math.max(1, Math.round(seg * filletQuality)), Math.min(r, w / 2 - 1e-3, h / 2 - 1e-3, d / 2 - 1e-3));

/* ---------------- assembly ---------------- */

class Builder {
  constructor() {
    this.groups = new Map(); // group -> material -> geometries
  }

  add(geometry, material, { at = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1], group = "body", mirror = false } = {}) {
    const m = new THREE.Matrix4().compose(
      new THREE.Vector3(...at),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)),
      new THREE.Vector3(...scale),
    );
    this.push(geometry, material, m, group);
    if (mirror) this.push(geometry, material, new THREE.Matrix4().makeScale(-1, 1, 1).multiply(m), mirror === true ? group : mirror);
  }

  push(geometry, material, matrix, group) {
    let g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
    g.applyMatrix4(matrix);
    if (matrix.determinant() < 0) {
      // A mirror turns triangles inside out: swap two corners of every triangle.
      for (const name of Object.keys(g.attributes)) {
        const a = g.attributes[name];
        for (let i = 0; i < a.count; i += 3) {
          for (let k = 0; k < a.itemSize; k++) {
            const t = a.array[(i + 1) * a.itemSize + k];
            a.array[(i + 1) * a.itemSize + k] = a.array[(i + 2) * a.itemSize + k];
            a.array[(i + 2) * a.itemSize + k] = t;
          }
        }
      }
    }
    if (!g.attributes.uv) g.setAttribute("uv", new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    if (!g.attributes.normal) g.computeVertexNormals();
    for (const name of Object.keys(g.attributes)) if (!["position", "normal", "uv"].includes(name)) g.deleteAttribute(name);
    if (!this.groups.has(group)) this.groups.set(group, new Map());
    const byMaterial = this.groups.get(group);
    if (!byMaterial.has(material)) byMaterial.set(material, []);
    byMaterial.get(material).push(g);
  }

  meshes(group) {
    const out = [];
    for (const [material, geometries] of this.groups.get(group) ?? []) {
      const mesh = new THREE.Mesh(mergeGeometries(geometries), material);
      // Glass and the inside-out cab shell stay out of the shadow map: both acne badly at grazing light.
      const solid = !material.transparent && material.side !== THREE.BackSide;
      mesh.castShadow = solid;
      mesh.receiveShadow = solid;
      out.push(mesh);
    }
    return out;
  }
}

// Cab plan sections, floor to roof. The windscreen face leans back ~9 degrees, the GigaSpace
// roof tapers and rolls over at the front.
const CAB = [
  { y: 1.08, hw: 1.245, zf: 0.0, zr: -2.3, r: 0.2 },
  { y: 1.45, hw: 1.25, zf: 0.0, zr: -2.3, r: 0.24 },
  { y: 2.12, hw: 1.25, zf: -0.01, zr: -2.3, r: 0.26 },
  { y: 2.7, hw: 1.248, zf: -0.1, zr: -2.3, r: 0.26 },
  { y: 3.22, hw: 1.24, zf: -0.18, zr: -2.3, r: 0.24 },
  { y: 3.5, hw: 1.235, zf: -0.22, zr: -2.3, r: 0.22 },
  { y: 3.68, hw: 1.215, zf: -0.29, zr: -2.29, r: 0.21 },
  { y: 3.81, hw: 1.18, zf: -0.39, zr: -2.27, r: 0.2 },
  { y: 3.9, hw: 1.12, zf: -0.52, zr: -2.23, r: 0.18 },
  { y: 3.95, hw: 1.03, zf: -0.68, zr: -2.17, r: 0.15 },
  { y: 3.97, hw: 0.9, zf: -0.86, zr: -2.08, r: 0.1 },
];
for (const y of [2.3, 3.17]) CAB.splice(CAB.findIndex((s) => s.y > y), 0, sectionAt(CAB, y));

// The windscreen opening in the cab skin: between those two rings, across the flat front and the
// first three steps of each corner arc (out to |x| = 1.12, see planRing's point order).
const WINDSCREEN = { y0: 2.3, y1: 3.17, x: 1.12 };
const windscreenHole = (i, j) => CAB[j].y >= WINDSCREEN.y0 - 1e-6 && CAB[j + 1].y <= WINDSCREEN.y1 + 1e-6 && (i <= 9 || i >= 86);

// Lower front: bumper and the fascia that carries the headlights; wraps back into the wheel arch.
const FASCIA = [
  { y: 0.3, hw: 1.17, zf: 0.06, zr: -0.82, r: 0.32 },
  { y: 0.36, hw: 1.235, zf: 0.13, zr: -0.82, r: 0.34 },
  { y: 0.62, hw: 1.25, zf: 0.15, zr: -0.82, r: 0.34 },
  { y: 0.98, hw: 1.25, zf: 0.13, zr: -0.82, r: 0.32 },
  { y: 1.1, hw: 1.248, zf: 0.05, zr: -0.82, r: 0.28 },
];

function body(b, M) {
  b.add(loft(CAB, { skip: windscreenHole }), M.paint);
  b.add(loft(FASCIA), M.paint);

  // Black cab underside so the silver never shows from below.
  b.add(rbox(2.4, 0.05, 2.25, 0.02), M.chassis, { at: [0, 1.07, -1.17] });

  // Windscreen: a black frame band, the glass inside it, both pressed onto the raked front.
  const onFront = (off) => (u, v, out) => onFrontOf(CAB, u, v, off, out);
  // The frame is a ring that overlaps the cut edge; the glass spans it.
  b.add(pressed(roundedRect(-1.19, 2.24, 1.19, 3.24, 0.1), onFront(0.006), 0.07, [roundedRect(-1.09, 2.33, 1.09, 3.14, 0.04).reverse()]), M.gloss);
  b.add(pressed(roundedRect(-1.13, 2.29, 1.13, 3.18, 0.06), onFront(0.012)), M.glass);
  // Black frit along the bottom of the screen, the two wipers parked on it.
  b.add(pressed(roundedRect(-1.12, 2.3, 1.12, 2.42, 0.03), onFront(0.016)), M.gloss);
  for (const [x, a] of [[-0.5, 0.16], [0.42, 0.1]]) {
    b.add(rbox(0.9, 0.022, 0.022, 0.01, 2), M.trim, { at: [x, 2.4, frontZ(CAB, x, 2.4) + 0.03], rot: [0, 0, a] });
  }

  // Sun visor, gloss black, tilted forward; the nameplate on it.
  b.add(rbox(2.44, 0.31, 0.3, 0.07, 4), M.gloss, { at: [0, 3.37, -0.09], rot: [-0.08, 0, 0] });
  b.add(new THREE.PlaneGeometry(1.5, 0.094), M.nameplate, { at: [0, 3.37, 0.067], rot: [-0.08, 0, 0] });
  for (const x of [-1.05, 1.05]) b.add(rbox(0.12, 0.04, 0.05, 0.015, 2), M.amber, { at: [x, 3.54, -0.08] });
  // Roof antenna, and the two marker domes on short posts at the front roof corners.
  b.add(new THREE.CylinderGeometry(0.006, 0.01, 0.42, 6), M.trim, { at: [-0.42, 4.17, -0.75], rot: [0.12, 0, 0] });
  b.add(new THREE.CylinderGeometry(0.012, 0.012, 0.14, 8), M.trim, { at: [0.95, 4.02, -0.86], mirror: true });
  b.add(new THREE.SphereGeometry(0.046, 16, 10), M.chrome, { at: [0.95, 4.11, -0.86], mirror: true });

  // The big corner pieces either side of the hood flap: proud of it, wrapping round to the side.
  b.add(rbox(0.27, 0.74, 0.4, 0.022, 3), M.paint, { at: [1.122, 1.87, -0.13], mirror: true });
  b.add(rbox(0.03, 0.74, 0.06, 0.012, 2), M.cavity, { at: [0.975, 1.87, 0.02], mirror: true });

  // Hood flap emblem, the company lettering and the model badge above the grille.
  b.add(new THREE.CylinderGeometry(0.035, 0.035, 0.012, 24), M.chrome, { at: [0, 2.17, frontZ(CAB, 0, 2.17) + 0.006], rot: [Math.PI / 2, 0, 0] });
  b.add(new THREE.PlaneGeometry(0.62, 0.078), M.lettering, { at: [-0.6, 1.925, 0.004] });
  b.add(new THREE.PlaneGeometry(0.5, 0.075), M.model, { at: [0.62, 1.93, 0.004] });

  // Cab interior behind the glass: dark shell, dashboard with a lit cluster, wheel, two seats.
  b.add(new THREE.BoxGeometry(2.36, 2.35, 2.04), M.shell, { at: [0, 2.375, -1.23] });
  b.add(rbox(2.3, 0.3, 0.62, 0.08, 3), M.cabin, { at: [0, 2.3, -0.56] });
  b.add(new THREE.PlaneGeometry(0.42, 0.11), M.screen, { at: [0.58, 2.47, -0.86], rot: [-0.5, 0, 0] });
  b.add(new THREE.TorusGeometry(0.22, 0.024, 8, 32), M.cabin, { at: [0.58, 2.52, -0.95], rot: [-0.5, 0, 0] });
  for (const x of [0.58, -0.58]) {
    b.add(rbox(0.56, 0.78, 0.16, 0.07, 3), M.cabin, { at: [x, 2.32, -1.5], rot: [-0.14, 0, 0] });
    b.add(rbox(0.32, 0.2, 0.13, 0.05, 2), M.cabin, { at: [x, 2.84, -1.58], rot: [-0.14, 0, 0] });
    b.add(rbox(0.52, 0.13, 0.52, 0.05, 2), M.cabin, { at: [x, 1.9, -1.2] });
  }
}

function grille(b, M) {
  const flat = (off) => (u, v, out) => out.set(u, v, off);
  // Black cavity behind the louvres, so the gaps between them read deep.
  const opening = [[-0.95, 1.865], [0.95, 1.865], [0.86, 1.18], [0.72, 0.99], [0, 0.92], [-0.72, 0.99], [-0.86, 1.18]];
  b.add(pressed(opening, flat(0.004), 0.12), M.cavity);
  // Four silver louvres narrowing downwards, each with a perforated insert across its face.
  for (const [y, h, hw] of [[1.78, 0.12, 0.935], [1.6, 0.125, 0.905], [1.42, 0.125, 0.87], [1.24, 0.13, 0.83]]) {
    b.add(rbox(hw * 2, h, 0.07, 0.024, 3), M.paint, { at: [0, y, 0.035] });
    b.add(pressed(roundedRect(-hw + 0.13, y - h * 0.32, hw - 0.13, y + h * 0.32, 0.012, 2), flat(0.0715), 0.12), M.grille);
  }
  // The bottom louvre is a chevron pointing down.
  const chevron = new THREE.Shape([[-0.72, 1.125], [0, 1.09], [0.72, 1.125], [0.67, 0.99], [0, 0.93], [-0.67, 0.99]].map(([x, y]) => new THREE.Vector2(x, y)));
  b.add(new THREE.ExtrudeGeometry(chevron, { depth: 0.064, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 2 }), M.paint, { at: [0, 0, 0.0] });
  b.add(pressed([[-0.59, 1.1], [0, 1.07], [0.59, 1.1], [0.56, 1.02], [0, 0.97], [-0.56, 1.02]], flat(0.0715), 0.12), M.grille);
  // Three-pointed star in its ring, across the upper two louvres.
  const cy = 1.69;
  b.add(new THREE.TorusGeometry(0.205, 0.022, 12, 64), M.chrome, { at: [0, cy, 0.11] });
  b.add(new THREE.CircleGeometry(0.19, 48), M.gloss, { at: [0, cy, 0.09] });
  const star = new THREE.Shape();
  for (let i = 0; i < 3; i++) {
    const a = Math.PI / 2 + (i * TAU) / 3;
    const tip = [Math.cos(a) * 0.19, Math.sin(a) * 0.19];
    const l = [Math.cos(a + Math.PI / 3) * 0.035, Math.sin(a + Math.PI / 3) * 0.035];
    if (i === 0) star.moveTo(...tip);
    else star.lineTo(...tip);
    star.lineTo(...l);
  }
  star.closePath();
  b.add(new THREE.ExtrudeGeometry(star, { depth: 0.018, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.004, bevelSegments: 2 }), M.chrome, { at: [0, cy, 0.095] });
}

function lights(b, M) {
  const onFascia = (off) => (u, v, out) => onFrontOf(FASCIA, u, v, off, out);
  // Headlight: an angular dark lens across the fascia corner with an LED line and two projectors.
  const lens = [[0.56, 0.8], [1.15, 0.79], [1.235, 1.07], [0.72, 1.1]];
  b.add(pressed(lens, onFascia(0.006), 0.05), M.lens, { mirror: true });
  b.add(pressed([[0.66, 1.055], [1.17, 1.03], [1.2, 1.06], [0.7, 1.085]], onFascia(0.011), 0.04), M.led, { mirror: true });
  b.add(pressed([[1.155, 0.84], [1.18, 0.84], [1.205, 1.03], [1.18, 1.035]], onFascia(0.011), 0.04), M.led, { mirror: true });
  for (const [x, r] of [[0.8, 0.06], [1.0, 0.055]]) {
    b.add(new THREE.SphereGeometry(r, 20, 8, 0, TAU, 0, Math.PI / 2), M.chrome, { at: [x, 0.92, frontZ(FASCIA, x, 0.92) - 0.02], rot: [Math.PI / 2, 0, 0], mirror: true });
    b.add(new THREE.CircleGeometry(r * 0.45, 16), M.lens, { at: [x, 0.92, frontZ(FASCIA, x, 0.92) + 0.003], mirror: true });
  }
  // Air intake, black, trapezoid; number plate in it; fog lights in the corners.
  b.add(pressed([[-0.74, 0.76], [0.74, 0.76], [0.62, 0.36], [-0.62, 0.36]], onFascia(0.005)), M.trim);
  b.add(new THREE.PlaneGeometry(0.52, 0.11), M.plate, { at: [0, 0.47, frontZ(FASCIA, 0, 0.47) + 0.014] });
  b.add(pressed(roundedRect(0.86, 0.42, 1.1, 0.56, 0.04), onFascia(0.005), 0.04), M.trim, { mirror: true });
  b.add(new THREE.CylinderGeometry(0.035, 0.035, 0.015, 20), M.chrome, { at: [0.98, 0.49, frontZ(FASCIA, 0.98, 0.49) + 0.01], rot: [Math.PI / 2, 0, 0], mirror: true });
  // Lower lip.
  b.add(pressed([[-1.12, 0.36], [1.12, 0.36], [1.05, 0.31], [-1.05, 0.31]], onFascia(0.003)), M.trim);
}

function sides(b, M) {
  // +X side only; mirrored onto -X.
  const side = (off) => (u, v, out) => onSideOf(CAB, -u, v, off, out);
  // Door window with its black frame, raked at the front like the A-pillar.
  b.add(pressed([[0.26, 2.22], [1.12, 2.22], [1.12, 3.06], [0.42, 3.06], [0.26, 2.7]], side(0.006), 0.08), M.gloss, { mirror: true });
  b.add(pressed([[0.31, 2.27], [1.07, 2.27], [1.07, 3.0], [0.44, 3.0], [0.31, 2.68]], side(0.011), 0.08), M.glass, { mirror: true });
  // Door shut lines and the handle.
  for (const [z0, z1, y0, y1] of [[0.2, 0.22, 1.12, 3.12], [1.22, 1.24, 1.12, 3.12], [0.2, 1.24, 3.11, 3.13]]) {
    b.add(pressed(roundedRect(z0, y0, z1, y1, 0.005, 1), side(0.004), 0.2), M.trim, { mirror: true });
  }
  b.add(rbox(0.02, 0.035, 0.16, 0.012, 2), M.chrome, { at: [1.262, 2.0, -1.06], mirror: true });
  // Grab handle behind the door, rear side vent of the sleeper section.
  b.add(new THREE.CylinderGeometry(0.016, 0.016, 1.2, 10), M.satin, { at: [1.285, 1.95, -1.32], mirror: true });
  for (let i = 0; i < 6; i++) b.add(rbox(0.012, 0.022, 0.42, 0.008, 2), M.trim, { at: [1.258, 2.35 + i * 0.06, -1.78], mirror: true });
  b.add(new THREE.PlaneGeometry(0.62, 0.078), M.sideLettering, { at: [1.256, 1.6, -0.75], rot: [0, Math.PI / 2, 0] });
  b.add(new THREE.PlaneGeometry(0.62, 0.078), M.sideLettering, { at: [-1.256, 1.6, -0.75], rot: [0, -Math.PI / 2, 0] });

  // MirrorCam: an arm out of the roof corner, the camera head hanging off it.
  b.add(rbox(0.32, 0.05, 0.07, 0.02, 2), M.gloss, { at: [1.33, 3.17, -0.16], rot: [0, -0.5, -0.12], mirror: true });
  b.add(rbox(0.11, 0.2, 0.13, 0.04, 3), M.gloss, { at: [1.47, 3.08, -0.05], mirror: true });

  // Front wheel arch: black flare over the tyre and a dark liner inside.
  b.add(new THREE.TorusGeometry(0.6, 0.05, 8, 40, Math.PI), M.trim, { at: [1.235, 0.505, FRONT_AXLE], rot: [0, Math.PI / 2, 0], mirror: true });
  b.add(new THREE.CylinderGeometry(0.58, 0.58, 0.4, 32, 1, true, 0, Math.PI), M.chassis, { at: [1.04, 0.505, FRONT_AXLE], rot: [0, 0, Math.PI / 2], mirror: true });

  // Entry steps behind the front wheel: a black box with two alloy treads.
  b.add(rbox(0.34, 0.72, 0.5, 0.05, 3), M.trim, { at: [1.06, 0.74, -2.25], mirror: true });
  for (const y of [0.5, 0.86]) b.add(rbox(0.3, 0.035, 0.46, 0.012, 2), M.alu, { at: [1.1, y, -2.25], mirror: true });
}

function chassis(b, M) {
  for (const x of [-0.43, 0.43]) b.add(rbox(0.08, 0.28, 6.05, 0.01, 1), M.chassis, { at: [x, 0.86, -3.02] });
  for (const z of [-2.6, -3.9, -5.95]) b.add(rbox(0.8, 0.12, 0.1, 0.01, 1), M.chassis, { at: [0, 0.86, z] });
  b.add(rbox(0.8, 0.5, 2.0, 0.08, 2), M.chassis, { at: [0, 0.78, -1.5] }); // engine and gearbox
  // Fuel tank (left): brushed aluminium with two straps and a cap.
  b.add(rbox(0.62, 0.6, 1.4, 0.16, 4), M.alu, { at: [0.93, 0.74, -3.3] });
  for (const z of [-2.85, -3.75]) b.add(rbox(0.64, 0.62, 0.035, 0.16, 4), M.chassis, { at: [0.93, 0.74, z] });
  b.add(new THREE.CylinderGeometry(0.055, 0.055, 0.04, 20), M.chrome, { at: [0.93, 1.05, -3.6] });
  // Right side: battery box, AdBlue tank, exhaust silencer box.
  b.add(rbox(0.56, 0.56, 0.9, 0.06, 3), M.trim, { at: [-0.93, 0.78, -2.95] });
  b.add(rbox(0.52, 0.5, 0.55, 0.12, 3), M.alu, { at: [-0.93, 0.74, -3.85] });
  b.add(rbox(0.5, 0.56, 0.5, 0.08, 3), M.satin, { at: [-0.93, 0.8, -4.33] });
  // Fifth wheel: a disc plate with the coupling slot, on its mounting plate.
  const plate = new THREE.Shape();
  plate.absarc(0, 0, 0.47, -Math.PI / 2 + 0.22, -Math.PI / 2 - 0.22 + TAU, false);
  plate.lineTo(-0.035, -0.05);
  plate.lineTo(0.035, -0.05);
  plate.closePath();
  b.add(new THREE.ExtrudeGeometry(plate, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2, curveSegments: 40 }), M.gloss, {
    at: [0, 1.24, -4.92],
    rot: [Math.PI / 2, 0, 0],
  });
  b.add(rbox(1.0, 0.12, 1.1, 0.02, 2), M.chassis, { at: [0, 1.12, -4.92] });
  // Rear mudguards over the twin wheels, and the flaps behind them.
  b.add(new THREE.CylinderGeometry(0.6, 0.6, 0.68, 32, 1, true, 0.25, Math.PI - 0.5), M.trim, {
    at: [0.98, 0.52, REAR_AXLE],
    rot: [0, 0, Math.PI / 2],
    mirror: true,
  });
  b.add(rbox(0.6, 0.55, 0.012, 0.01, 1), M.trim, { at: [0.98, 0.42, REAR_AXLE - 0.62], mirror: true });
  // Rear light bar on the last cross-member.
  b.add(rbox(2.1, 0.1, 0.08, 0.02, 2), M.chassis, { at: [0, 0.74, -6.02] });
  b.add(rbox(0.2, 0.1, 0.05, 0.02, 2), M.tail, { at: [0.84, 0.75, -6.06], mirror: true });
  b.add(rbox(0.08, 0.1, 0.05, 0.02, 2), M.amber, { at: [1.0, 0.75, -6.06], mirror: true });
  // Air and electric coils behind the cab, red and yellow.
  for (const [x, mat] of [[0.18, M.tail], [-0.18, M.amber]]) {
    const pts = [];
    for (let i = 0; i <= 160; i++) {
      const t = i / 160;
      const a = t * TAU * 9;
      pts.push(new THREE.Vector3(x + Math.cos(a) * 0.07, 1.55 - t * 0.45, -2.42 + Math.sin(a) * 0.07 - t * 0.5));
    }
    b.add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), Math.round(320 * filletQuality), 0.009, 5), mat);
  }
}

// One wheel station: a lathed tyre with tread, a steel disc wheel with ten hand-holes and nuts.
function wheel(b, M, group, { x, z, twin = false, side = 1, q = 1 }) {
  const R = WHEEL_RADIUS;
  const W = 0.315;
  const h = W / 2;
  const profile = [
    [0.29, -0.82 * h], [0.315, -0.97 * h], [0.37, -1.0 * h], [0.43, -0.98 * h], [R - 0.03, -0.9 * h],
    [R - 0.006, -0.72 * h], [R, -0.5 * h], [R, 0.5 * h], [R - 0.006, 0.72 * h], [R - 0.03, 0.9 * h],
    [0.43, 0.98 * h], [0.37, 1.0 * h], [0.315, 0.97 * h], [0.29, 0.82 * h],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const tyre = new THREE.LatheGeometry(profile, Math.round(48 * q));
  const disc = new THREE.LatheGeometry(
    [[0.06, 0.07], [0.1, 0.075], [0.17, 0.075], [0.2, 0.05], [0.255, 0.02], [0.284, 0.05], [0.296, 0.12], [0.296, -0.13], [0.284, -0.14]].map(
      ([r, y]) => new THREE.Vector2(r, y),
    ),
    Math.round(40 * q),
  );
  const offsets = twin ? [0.16, -0.17] : [0];
  for (const off of offsets) {
    // Lathe axis is Y; turn it onto X and push it out to the wheel's own station.
    const outer = off === offsets[0];
    const at = [side * (x + off), 0, 0];
    const rot = [0, 0, -side * Math.PI / 2];
    b.add(tyre, M.rubber, { at, rot, group });
    if (outer) {
      b.add(disc, M.rim, { at, rot, group });
      // Hand-holes and wheel nuts on the outer disc face.
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * TAU;
        const face = side * (x + off + 0.072);
        b.add(rbox(0.012, 0.03, 0.07, 0.012, 2), M.chassis, {
          at: [side * (x + off + 0.052), Math.cos(a) * 0.215, Math.sin(a) * 0.215],
          rot: [a, 0, 0],
          group,
        });
        b.add(new THREE.CylinderGeometry(0.017, 0.017, 0.035, 6), M.chrome, {
          at: [face + side * 0.012, Math.cos(a + 0.31) * 0.14, Math.sin(a + 0.31) * 0.14],
          rot: [0, 0, Math.PI / 2],
          group,
        });
      }
      const cap = new THREE.SphereGeometry(0.085, Math.round(24 * q), 10, 0, TAU, 0, Math.PI / 2.4);
      b.add(cap, M.chrome, { at: [side * (x + off + 0.07), 0, 0], rot: [0, 0, -side * Math.PI / 2], group });
    }
  }
}

/* ---------------- public ---------------- */

const cache = new Map();

// quality 1 = hero; 0.6 = traffic / phones. night = brighter lamp emission.
export function buildActros({ quality = 1, night = false } = {}) {
  const key = `${quality}|${night}`;
  if (!cache.has(key)) {
    const M = makeMaterials({ night });
    const b = new Builder();
    filletQuality = quality;
    body(b, M);
    grille(b, M);
    lights(b, M);
    sides(b, M);
    chassis(b, M);
    const stations = [
      { id: "FL", x: 1.03, z: FRONT_AXLE, side: 1 },
      { id: "FR", x: 1.03, z: FRONT_AXLE, side: -1 },
      { id: "RL", x: 0.98, z: REAR_AXLE, side: 1, twin: true },
      { id: "RR", x: 0.98, z: REAR_AXLE, side: -1, twin: true },
    ];
    for (const s of stations) wheel(b, M, s.id, { ...s, q: quality });

    const root = new THREE.Group();
    root.name = "SPN Actros L";
    for (const mesh of b.meshes("body")) root.add(mesh);
    for (const s of stations) {
      const pivot = new THREE.Group();
      pivot.name = "wheel";
      pivot.position.set(0, WHEEL_RADIUS, s.z);
      for (const mesh of b.meshes(s.id)) pivot.add(mesh);
      root.add(pivot);
    }
    cache.set(key, root);
  }
  return cache.get(key);
}

// Lamp positions in the truck's own frame, for glow sprites and headlight beams.
export const LAMPS = {
  head: [new THREE.Vector3(0.92, 0.93, 0.16), new THREE.Vector3(-0.92, 0.93, 0.16)],
  tail: [new THREE.Vector3(0.84, 0.75, -6.1), new THREE.Vector3(-0.84, 0.75, -6.1)],
};
