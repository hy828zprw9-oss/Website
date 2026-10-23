import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export type ProceduralModelOptions = {
  wireframe?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  textureSize?: number;
  textureAnisotropy?: number;
  qualityPriority?: 'reference-fidelity' | 'balanced';
};

export type ProceduralModelRuntime = {
  nodes: Record<string, THREE.Object3D>;
  meshes: Record<string, THREE.Mesh>;
  sockets: Record<string, THREE.Object3D>;
  colliders: Record<string, unknown>;
  destructionGroups: Record<string, THREE.Object3D[]>;
};

type SculptMaterialSpec = Record<string, any>;

// bevelEnabled defaults to true on THREE.ExtrudeGeometry and rounds every
// corner — sharp/pointed profiles (blades, fork tines, spikes) need
// bevelEnabled: false plus lineTo()-only path segments near the tip, since a
// curve command cannot produce a true converging point.
function buildExtrudeShape(points: [number, number][], holes?: [number, number][][]): THREE.Shape {
  const shape = new THREE.Shape();
  if (points.length > 0) {
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i += 1) {
      shape.lineTo(points[i][0], points[i][1]);
    }
  }
  // Cutouts (e.g. an oval wire-cutter hole) as THREE.Path added to shape.holes —
  // dep-free boolean subtraction via the tessellator, no CSG library needed.
  for (const loop of holes ?? []) {
    if (loop.length < 3) continue;
    const path = new THREE.Path();
    path.moveTo(loop[0][0], loop[0][1]);
    for (let i = 1; i < loop.length; i += 1) path.lineTo(loop[i][0], loop[i][1]);
    path.closePath();
    shape.holes.push(path);
  }
  return shape;
}

// Build an N-gon oval loop (for hole authoring from a compact {cx,cy,rx,ry} descriptor).
function ovalLoop(cx: number, cy: number, rx: number, ry: number, seg = 24): [number, number][] {
  const loop: [number, number][] = [];
  for (let i = 0; i < seg; i += 1) {
    const a = (i / seg) * Math.PI * 2;
    loop.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
  }
  return loop;
}

function buildExtrudeGeometry(profile: { points: [number, number][]; depth: number; holes?: [number, number][][]; ovalHoles?: { cx: number; cy: number; rx: number; ry: number }[] }): THREE.ExtrudeGeometry {
  const holes = [...(profile.holes ?? []), ...((profile.ovalHoles ?? []).map((o) => ovalLoop(o.cx, o.cy, o.rx, o.ry)))];
  const shape = buildExtrudeShape(profile.points, holes);
  return new THREE.ExtrudeGeometry(shape, {
    depth: profile.depth,
    bevelEnabled: false,
    steps: 1,
  });
}

function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function readLayerNumber(value: unknown, keys: string[], fallback: number): number {
  if (typeof value === 'number') return value;
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    for (const key of keys) {
      if (typeof record[key] === 'number') return record[key] as number;
    }
  }
  return fallback;
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = /^#[0-9a-f]{3}$/i.test(hex)
    ? '#' + hex.slice(1).split('').map((part) => part + part).join('')
    : hex;
  const value = /^#[0-9a-f]{6}$/i.test(normalized) ? Number.parseInt(normalized.slice(1), 16) : 0x8a7a5f;
  return [clampAlbedoChannel((value >> 16) & 255), clampAlbedoChannel((value >> 8) & 255), clampAlbedoChannel(value & 255)];
}

function materialPalette(spec: SculptMaterialSpec): string[] {
  const palette = spec.colorVariation?.palette;
  if (Array.isArray(palette) && palette.length > 0) return palette.filter((value) => typeof value === 'string');
  const secondary = spec.albedo?.secondary;
  const colors = [spec.baseColor ?? spec.color ?? spec.albedo?.dominant, ...(Array.isArray(secondary) ? secondary : [])];
  return colors.filter((value): value is string => typeof value === 'string' && value.startsWith('#'));
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function clampAlbedoChannel(value: number): number {
  return Math.max(30, Math.min(240, Math.round(value)));
}

function clampPbrF0(value: number): number {
  return Math.max(0.02, Math.min(1, value));
}

function clampPbrIor(value: number): number {
  return Math.max(1, Math.min(2.5, value));
}

function clampPbrMetalness(value: number): number {
  return value >= 0.5 ? 1 : 0;
}

function clampedAlbedoColor(spec: SculptMaterialSpec): THREE.Color {
  const source = typeof spec.baseColor === 'string' ? spec.baseColor : '#8A7A5F';
  // setStyle with an explicit SRGBColorSpace, NOT the numeric constructor.
  //
  // `new THREE.Color(r, g, b)` treats its arguments as LINEAR working-space components,
  // while an authored `baseColor` hex is sRGB. Feeding one to the other skipped the
  // transfer function and lifted every dark albedo: #2e2a28, authored as a near-black
  // vinyl, rendered at roughly sRGB 0.46 — a mid grey. The error is largest exactly where
  // it matters most, because the transfer curve is steepest near black.
  return new THREE.Color().setStyle(source, THREE.SRGBColorSpace);
}

function smoothCurve(value: number): number {
  return value * value * (3 - 2 * value);
}

function periodicHash(x: number, y: number, seed: number, periodX: number, periodY: number): number {
  const wrappedX = ((x % periodX) + periodX) % periodX;
  const wrappedY = ((y % periodY) + periodY) % periodY;
  let value = Math.imul(wrappedX + seed * 17, 374761393) ^ Math.imul(wrappedY + seed * 31, 668265263);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
}

function periodicValueNoise(u: number, v: number, seed: number, periodX: number, periodY: number): number {
  const x = u * periodX;
  const y = v * periodY;
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = smoothCurve(x - x0);
  const ty = smoothCurve(y - y0);
  const a = periodicHash(x0, y0, seed, periodX, periodY);
  const b = periodicHash(x0 + 1, y0, seed, periodX, periodY);
  const c = periodicHash(x0, y0 + 1, seed, periodX, periodY);
  const d = periodicHash(x0 + 1, y0 + 1, seed, periodX, periodY);
  return THREE.MathUtils.lerp(THREE.MathUtils.lerp(a, b, tx), THREE.MathUtils.lerp(c, d, tx), ty);
}

type SurfaceBand = {
  frequency: number;
  amplitude: number;
  stretchX: number;
  stretchY: number;
  ridge: boolean;
};

function surfaceBands(spec: SculptMaterialSpec): SurfaceBand[] {
  const source = Array.isArray(spec.surfaceFrequencyBands) ? spec.surfaceFrequencyBands : [];
  const parsed = source.flatMap((item: unknown) => {
    if (!item || typeof item !== 'object') return [];
    const band = item as Record<string, unknown>;
    const frequency = typeof band.frequency === 'number' ? band.frequency : 0;
    const amplitude = typeof band.amplitude === 'number' ? band.amplitude : 0;
    if (frequency <= 0 || amplitude <= 0) return [];
    const stretch = Array.isArray(band.stretch) ? band.stretch : [1, 1];
    const description = `${String(band.pattern ?? '')} ${String(band.role ?? '')}`.toLowerCase();
    return [{
      frequency,
      amplitude,
      stretchX: typeof stretch[0] === 'number' ? Math.max(0.1, stretch[0]) : 1,
      stretchY: typeof stretch[1] === 'number' ? Math.max(0.1, stretch[1]) : 1,
      ridge: /(ridge|groove|grain|fiber|striated|crack)/.test(description),
    }];
  });
  return parsed.length > 0 ? parsed : [
    { frequency: 2, amplitude: 0.42, stretchX: 1, stretchY: 1, ridge: false },
    { frequency: 12, amplitude: 0.22, stretchX: 1, stretchY: 1, ridge: false },
    { frequency: 56, amplitude: 0.08, stretchX: 1, stretchY: 1, ridge: false },
  ];
}

function sampleSurface(u: number, v: number, bands: SurfaceBand[], seed: number): number {
  let value = 0;
  let weight = 0;
  for (let index = 0; index < bands.length; index += 1) {
    const band = bands[index];
    const periodX = Math.max(1, Math.round(band.frequency * band.stretchX));
    const periodY = Math.max(1, Math.round(band.frequency * band.stretchY));
    let sample = periodicValueNoise(u, v, seed + index * 1013, periodX, periodY);
    if (band.ridge) sample = 1 - Math.abs(sample * 2 - 1);
    value += sample * band.amplitude;
    weight += band.amplitude;
  }
  return weight > 0 ? clamp01(value / weight) : 0.5;
}

function mixPalette(colors: [number, number, number][], value: number): [number, number, number] {
  if (colors.length === 1) return colors[0];
  const scaled = clamp01(value) * (colors.length - 1);
  const index = Math.min(colors.length - 2, Math.floor(scaled));
  const mix = scaled - index;
  const a = colors[index];
  const b = colors[index + 1];
  return [
    Math.round(THREE.MathUtils.lerp(a[0], b[0], mix)),
    Math.round(THREE.MathUtils.lerp(a[1], b[1], mix)),
    Math.round(THREE.MathUtils.lerp(a[2], b[2], mix)),
  ];
}

type ColorGradientStop = { offset: number; color: string };
type ColorGradientSpec = {
  type: 'linear' | 'radial';
  axis: [number, number];
  stops: ColorGradientStop[];
};

function parseRgba(value: string): [number, number, number] {
  const match = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(value);
  if (!match) return [138, 122, 95];
  return [clampAlbedoChannel(Number(match[1])), clampAlbedoChannel(Number(match[2])), clampAlbedoChannel(Number(match[3]))];
}

// Analytical per-pixel gradient sample. The extraction schema's colorGradient carries
// exact rgba(...) stop colors (see extract_part_color_recipe.py), so this samples the
// same trend directly in JS math rather than round-tripping through a Canvas 2D
// createLinearGradient/createRadialGradient object — same visual result, and it composes
// directly with the existing noise/height-correlated colorVariation blend below.
function sampleColorGradient(gradient: ColorGradientSpec, u: number, v: number): [number, number, number] {
  const stops = gradient.stops.length >= 2 ? gradient.stops : [{ offset: 0, color: 'rgba(138,122,95,1)' }, { offset: 1, color: 'rgba(138,122,95,1)' }];
  let t: number;
  if (gradient.type === 'radial') {
    const [cx, cy] = gradient.axis;
    const dx = u - cx;
    const dy = v - cy;
    const maxRadius = Math.max(0.001, Math.hypot(Math.max(cx, 1 - cx), Math.max(cy, 1 - cy)));
    t = clamp01(Math.hypot(dx, dy) / maxRadius);
  } else {
    const [ax, ay] = gradient.axis;
    const projection = (u - 0.5) * ax + (v - 0.5) * ay;
    const maxProjection = 0.5 * (Math.abs(ax) + Math.abs(ay)) || 0.5;
    t = clamp01(projection / maxProjection + 0.5);
  }
  const scaled = t * (stops.length - 1);
  const index = Math.min(stops.length - 2, Math.max(0, Math.floor(scaled)));
  const mix = scaled - index;
  const a = parseRgba(stops[index].color);
  const b = parseRgba(stops[index + 1].color);
  return [
    THREE.MathUtils.lerp(a[0], b[0], mix),
    THREE.MathUtils.lerp(a[1], b[1], mix),
    THREE.MathUtils.lerp(a[2], b[2], mix),
  ];
}

function writePixel(data: Uint8ClampedArray, offset: number, red: number, green: number, blue: number): void {
  data[offset] = Math.max(0, Math.min(255, Math.round(red)));
  data[offset + 1] = Math.max(0, Math.min(255, Math.round(green)));
  data[offset + 2] = Math.max(0, Math.min(255, Math.round(blue)));
  data[offset + 3] = 255;
}

function makeCanvas(size: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

function createMapTexture(
  canvas: HTMLCanvasElement,
  colorSpace: THREE.ColorSpace,
  spec: SculptMaterialSpec,
  options: ProceduralModelOptions,
): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  const projection = spec.textureProjection && typeof spec.textureProjection === 'object' ? spec.textureProjection : {};
  const repeat = Array.isArray(projection.repeat) ? projection.repeat : [2, 2];
  texture.colorSpace = colorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(
    typeof repeat[0] === 'number' ? repeat[0] : 2,
    typeof repeat[1] === 'number' ? repeat[1] : 2,
  );
  texture.anisotropy = Math.max(1, Math.round(options.textureAnisotropy ?? projection.anisotropy ?? 8));
  texture.needsUpdate = true;
  return texture;
}

type ProceduralTextureSet = {
  albedo: THREE.Texture;
  roughness: THREE.Texture;
  height: THREE.Texture;
  normal: THREE.Texture;
  ao: THREE.Texture;
  source: 'reference-pixel-extraction' | 'procedural';
};

function referenceMapUrl(spec: SculptMaterialSpec, channel: string): string | null {
  const reference = spec.referencePbr;
  if (!reference || typeof reference !== 'object') return null;
  if (reference.usable === false) return null;
  const confidence = typeof reference.confidence === 'number'
    ? reference.confidence
    : (typeof reference.estimatedFidelity === 'number' ? reference.estimatedFidelity : 0);
  const threshold = typeof reference.targetThreshold === 'number' ? reference.targetThreshold : 0.7;
  if (confidence < threshold) return null;
  const maps = reference.maps;
  if (!maps || typeof maps !== 'object') return null;
  const map = (maps as Record<string, unknown>)[channel];
  if (!map || typeof map !== 'object') return null;
  const record = map as Record<string, unknown>;
  const url = typeof record.url === 'string' && record.url.trim() ? record.url : record.path;
  return typeof url === 'string' && url.trim() ? url : null;
}

function createLoadedMapTexture(
  url: string,
  colorSpace: THREE.ColorSpace,
  spec: SculptMaterialSpec,
  options: ProceduralModelOptions,
): THREE.Texture {
  const texture = new THREE.TextureLoader().load(url);
  const projection = spec.textureProjection && typeof spec.textureProjection === 'object' ? spec.textureProjection : {};
  const repeat = Array.isArray(projection.repeat) ? projection.repeat : [1, 1];
  texture.colorSpace = colorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(
    typeof repeat[0] === 'number' ? repeat[0] : 1,
    typeof repeat[1] === 'number' ? repeat[1] : 1,
  );
  texture.anisotropy = Math.max(1, Math.round(options.textureAnisotropy ?? projection.anisotropy ?? 8));
  texture.needsUpdate = true;
  return texture;
}

function makeReferenceTextureSet(spec: SculptMaterialSpec, options: ProceduralModelOptions): ProceduralTextureSet | null {
  const albedo = referenceMapUrl(spec, 'albedo');
  const roughness = referenceMapUrl(spec, 'roughness');
  const height = referenceMapUrl(spec, 'height');
  const normal = referenceMapUrl(spec, 'normal');
  const ao = referenceMapUrl(spec, 'ao');
  if (!albedo || !roughness || !height || !normal || !ao) return null;
  return {
    albedo: createLoadedMapTexture(albedo, THREE.SRGBColorSpace, spec, options),
    roughness: createLoadedMapTexture(roughness, THREE.NoColorSpace, spec, options),
    height: createLoadedMapTexture(height, THREE.NoColorSpace, spec, options),
    normal: createLoadedMapTexture(normal, THREE.NoColorSpace, spec, options),
    ao: createLoadedMapTexture(ao, THREE.NoColorSpace, spec, options),
    source: 'reference-pixel-extraction',
  };
}

function makeProceduralTextureSet(
  id: string,
  spec: SculptMaterialSpec,
  options: ProceduralModelOptions,
): ProceduralTextureSet | null {
  if (typeof document === 'undefined') return null;
  const qualityFirst = (options.qualityPriority ?? 'reference-fidelity') === 'reference-fidelity';
  const requested = options.textureSize ?? spec.textureResolution;
  const requestedSize = typeof requested === 'number' && Number.isFinite(requested)
    ? requested
    : (qualityFirst ? 1024 : 512);
  const size = Math.max(256, Math.min(2048, 2 ** Math.round(Math.log2(requestedSize))));
  const canvases = {
    albedo: makeCanvas(size),
    roughness: makeCanvas(size),
    height: makeCanvas(size),
    normal: makeCanvas(size),
    ao: makeCanvas(size),
  };
  const contexts = {
    albedo: canvases.albedo.getContext('2d'),
    roughness: canvases.roughness.getContext('2d'),
    height: canvases.height.getContext('2d'),
    normal: canvases.normal.getContext('2d'),
    ao: canvases.ao.getContext('2d'),
  };
  if (!contexts.albedo || !contexts.roughness || !contexts.height || !contexts.normal || !contexts.ao) return null;
  const images = {
    albedo: contexts.albedo.createImageData(size, size),
    roughness: contexts.roughness.createImageData(size, size),
    height: contexts.height.createImageData(size, size),
    normal: contexts.normal.createImageData(size, size),
    ao: contexts.ao.createImageData(size, size),
  };
  const seed = hashString(id);
  const bands = surfaceBands(spec);
  const heightField = new Float32Array(size * size);
  const roughnessField = new Float32Array(size * size);
  const palette = materialPalette(spec);
  const fallback = typeof spec.baseColor === 'string' ? spec.baseColor : '#8A7A5F';
  const colors = (palette.length >= 2 ? palette : [fallback, '#6E614B', '#A08F70']).map(hexToRgb);
  const baseRoughness = clamp01(readLayerNumber(spec.roughness, ['base'], 0.76));
  const roughnessVariation = clamp01(readLayerNumber(spec.roughness, ['variation'], 0.18));
  const colorAmplitude = clamp01(readLayerNumber(spec.colorVariation, ['amplitude', 'variation'], 0.18));
  const heightCorrelation = clamp01(readLayerNumber(spec.colorVariation, ['heightCorrelation'], 0.3));
  const colorGradient: ColorGradientSpec | undefined = spec.colorGradient;
  for (let y = 0; y < size; y += 1) {
    const v = y / size;
    for (let x = 0; x < size; x += 1) {
      const u = x / size;
      const index = y * size + x;
      const height = sampleSurface(u, v, bands, seed + 101);
      const roughNoise = sampleSurface(u, v, bands, seed + 7001);
      const colorNoise = sampleSurface(u, v, bands, seed + 15013);
      heightField[index] = height;
      roughnessField[index] = clamp01(baseRoughness + (roughNoise - 0.5) * roughnessVariation * 2);
      let color: [number, number, number];
      if (colorGradient) {
        // Evidence-derived spatial gradient (Plan 1.3 Workstream C) takes priority
        // over the noise-based palette blend below — it is a measured trend, not a guess.
        color = sampleColorGradient(colorGradient, u, v);
      } else {
        const paletteValue = clamp01(
          0.5 + (colorNoise - 0.5) * colorAmplitude * 2 + (height - 0.5) * heightCorrelation
        );
        color = mixPalette(colors, paletteValue);
      }
      writePixel(images.albedo.data, index * 4, color[0], color[1], color[2]);
    }
  }
  const normalStrength = Math.max(0.05, readLayerNumber(spec.normal, ['strength', 'amplitude'], 0.35));
  const aoStrength = clamp01(readLayerNumber(spec.ambientOcclusion, ['cavityStrength', 'strength'], 0.35));
  for (let y = 0; y < size; y += 1) {
    const up = ((y - 1 + size) % size) * size;
    const down = ((y + 1) % size) * size;
    for (let x = 0; x < size; x += 1) {
      const left = (x - 1 + size) % size;
      const right = (x + 1) % size;
      const index = y * size + x;
      const center = heightField[index];
      const dx = (heightField[y * size + right] - heightField[y * size + left]) * normalStrength * 6;
      const dy = (heightField[down + x] - heightField[up + x]) * normalStrength * 6;
      const inverseLength = 1 / Math.sqrt(dx * dx + dy * dy + 1);
      const normalX = -dx * inverseLength;
      const normalY = -dy * inverseLength;
      const normalZ = inverseLength;
      const neighborAverage = (
        heightField[y * size + left] + heightField[y * size + right]
        + heightField[up + x] + heightField[down + x]
      ) * 0.25;
      const cavity = Math.max(0, neighborAverage - center);
      const ao = clamp01(1 - aoStrength * (cavity * 12 + (1 - center) * 0.16));
      const offset = index * 4;
      const heightByte = center * 255;
      const roughnessByte = roughnessField[index] * 255;
      writePixel(images.height.data, offset, heightByte, heightByte, heightByte);
      writePixel(images.roughness.data, offset, roughnessByte, roughnessByte, roughnessByte);
      writePixel(
        images.normal.data, offset,
        (normalX * 0.5 + 0.5) * 255,
        (normalY * 0.5 + 0.5) * 255,
        (normalZ * 0.5 + 0.5) * 255,
      );
      writePixel(images.ao.data, offset, ao * 255, ao * 255, ao * 255);
    }
  }
  contexts.albedo.putImageData(images.albedo, 0, 0);
  contexts.roughness.putImageData(images.roughness, 0, 0);
  contexts.height.putImageData(images.height, 0, 0);
  contexts.normal.putImageData(images.normal, 0, 0);
  contexts.ao.putImageData(images.ao, 0, 0);
  return {
    albedo: createMapTexture(canvases.albedo, THREE.SRGBColorSpace, spec, options),
    roughness: createMapTexture(canvases.roughness, THREE.NoColorSpace, spec, options),
    height: createMapTexture(canvases.height, THREE.NoColorSpace, spec, options),
    normal: createMapTexture(canvases.normal, THREE.NoColorSpace, spec, options),
    ao: createMapTexture(canvases.ao, THREE.NoColorSpace, spec, options),
    source: 'procedural',
  };
}

function createSculptMaterial(id: string, spec: SculptMaterialSpec, options: ProceduralModelOptions, denseComponent = false): THREE.MeshPhysicalMaterial {
  // A material that declares -- with evidence -- that its subject carries no texture
  // detail gets NO texture set. Synthesising one anyway is not a harmless default: the
  // branch below then forces color to white and roughness to 1 and reads both from the
  // generated maps, so the authored albedo and the reference-derived roughness are both
  // discarded, and the model gains mottling the reference does not have. Measured on the
  // tuxedo cat, whose black fur rendered as speckled grey-and-white from a palette that
  // only ever described two flat regions.
  const textureless = (spec.textureless as { declared?: boolean } | undefined)?.declared === true;
  const textures = textureless
    ? null
    : makeReferenceTextureSet(spec, options) ?? makeProceduralTextureSet(id, spec, options);
  const material = new THREE.MeshPhysicalMaterial({
    color: textures ? 0xffffff : clampedAlbedoColor(spec),
    roughness: textures ? 1 : clamp01(readLayerNumber(spec.roughness, ['base'], 0.76)),
    metalness: clampPbrMetalness(readLayerNumber(spec.metalness, ['base'], 0.0)),
    clearcoat: clamp01(readLayerNumber(spec.clearcoat, ['base', 'amount'], 0)),
    clearcoatRoughness: clamp01(readLayerNumber(spec.clearcoatRoughness, ['base'], 0.25)),
    transmission: clamp01(readLayerNumber(spec.transmission, ['base', 'amount'], 0)),
    ior: clampPbrIor(readLayerNumber(spec.ior, ['base', 'value'], 1.5)),
    thickness: Math.max(0, readLayerNumber(spec.thickness, ['base', 'amount'], 0)),
    attenuationDistance: Math.max(0.001, readLayerNumber(spec.attenuationDistance, ['base', 'value'], Infinity)),
    attenuationColor: new THREE.Color(typeof spec.attenuationColor === 'string' ? spec.attenuationColor : '#ffffff'),
    sheen: clamp01(readLayerNumber(spec.sheen, ['base', 'amount'], 0)),
    sheenColor: new THREE.Color(typeof spec.sheenColor === 'string' ? spec.sheenColor : '#ffffff'),
    sheenRoughness: clamp01(readLayerNumber(spec.sheenRoughness, ['base'], 1.0)),
    iridescence: clamp01(readLayerNumber(spec.iridescence, ['base', 'amount'], 0)),
    iridescenceIOR: clampPbrIor(readLayerNumber(spec.iridescenceIOR, ['base', 'value'], 1.3)),
    anisotropy: clamp01(readLayerNumber(spec.anisotropy, ['base', 'amount'], 0)),
    anisotropyRotation: readLayerNumber(spec.anisotropy, ['rotation'], 0),
    specularIntensity: clampPbrF0(readLayerNumber(spec.specularF0 ?? spec.f0 ?? spec.specularIntensity, ['base', 'value'], 1.0)),
    specularColor: new THREE.Color(typeof spec.specularColor === 'string' ? spec.specularColor : '#ffffff'),
    emissive: new THREE.Color(typeof spec.emissive === 'string' ? spec.emissive : '#000000'),
    emissiveIntensity: Math.max(0, readLayerNumber(spec.emissiveIntensity, ['base'], 1.0)),
    opacity: clamp01(readLayerNumber(spec.opacity, ['base'], 1)),
    transparent: readLayerNumber(spec.transmission, ['base', 'amount'], 0) > 0 || readLayerNumber(spec.opacity, ['base'], 1) < 1,
    alphaTest: Math.max(0, readLayerNumber(spec.alpha, ['cutoff', 'alphaTest'], 0)),
    wireframe: options.wireframe ?? false,
    side: spec.doubleSided === true ? THREE.DoubleSide : THREE.FrontSide,
    flatShading: spec.flatShading === true,
  });
  if (textures) {
    material.map = textures.albedo;
    material.roughnessMap = textures.roughness;
    material.normalMap = textures.normal;
    material.normalScale.setScalar(Math.max(0.05, readLayerNumber(spec.normal, ['strength', 'amplitude'], 0.35)));
    material.aoMap = textures.ao;
    material.aoMap.channel = 0;
    material.aoMapIntensity = readLayerNumber(spec.ambientOcclusion, ['cavityStrength', 'strength'], 0.35);
    const denseMesh = denseComponent || spec.denseMesh === true || spec.geometryDensity === 'dense' || spec.topologyClass === 'dense';
    const bumpScale = Math.max(0, readLayerNumber(spec.bump, ['amplitude', 'strength'], 0));
    const effectiveBumpScale = denseMesh ? Math.max(0.05, bumpScale) : bumpScale;
    if (effectiveBumpScale > 0) {
      material.bumpMap = textures.height;
      material.bumpScale = effectiveBumpScale;
    }
    const displacementScale = Math.max(0, readLayerNumber(spec.displacement, ['amplitude', 'strength'], 0));
    const effectiveDisplacementScale = denseMesh ? Math.max(0.005, displacementScale) : displacementScale;
    if (effectiveDisplacementScale > 0) {
      material.displacementMap = textures.height;
      material.displacementScale = effectiveDisplacementScale;
      material.displacementBias = -effectiveDisplacementScale * 0.5;
    }
  }
  material.envMapIntensity = readLayerNumber(spec, ['envMapIntensity'], 0.8);
  material.userData.sculptMaterial = spec;
  material.userData.proceduralMapsIndependent = true;
  material.userData.pbrConstraints = { albedoRange: [30, 240], binaryMetalness: true, f0Range: [0.02, 1], iorRange: [1, 2.5] };
  material.userData.pbrTextureSource = textures?.source ?? 'flat-fallback';
  material.userData.referencePbr = spec.referencePbr ?? null;
  material.userData.referenceMaterialId = spec.referenceMaterialId ?? spec.materialReference?.profileId ?? null;
  material.userData.materialEvidence = spec.materialEvidence ?? null;
  material.userData.validationViews = spec.materialReference?.validationViews ?? [];
  material.needsUpdate = true;
  return material;
}

type AttachmentEndpoint = {
  start: THREE.Vector3;
  midpoint: THREE.Vector3;
  quaternion: THREE.Quaternion;
  length: number;
  baseRadius: number;
  endRadius: number;
};

function readVector3(value: unknown, fallback: [number, number, number]): THREE.Vector3 {
  if (Array.isArray(value) && value.length === 3 && value.every((item) => typeof item === 'number')) {
    return new THREE.Vector3(value[0], value[1], value[2]);
  }
  return new THREE.Vector3(fallback[0], fallback[1], fallback[2]);
}

function readNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function makeAttachmentEndpoint(attachment: unknown): AttachmentEndpoint | null {
  if (!attachment || typeof attachment !== 'object') return null;
  const record = attachment as Record<string, unknown>;
  const start = readVector3(record.localStart, [0, 0, 0]);
  const end = readVector3(record.localEnd, [0, 1, 0]);
  const delta = end.clone().sub(start);
  const length = delta.length();
  if (length <= 0.0001) return null;
  const direction = delta.clone().normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  const baseRadius = Math.max(0.005, readNumber(record.baseRadius, 0.06));
  const endRadius = Math.max(0.003, readNumber(record.endRadius, baseRadius * 0.55));
  return {
    start,
    midpoint: delta.multiplyScalar(0.5),
    quaternion,
    length,
    baseRadius,
    endRadius,
  };
}

// Generated from ObjectSculptSpec target: SPN Actros L tractor unit
// Sculpt build pass: optimization-pass
// This factory is intentionally pass-gated. Finish browser screenshot review before unlocking deeper passes.
export function createSPNActrosLTractorUnitModel(options: ProceduralModelOptions = {}): THREE.Group {
  const root = new THREE.Group();
  root.name = "SPN Actros L tractor unit";
  root.userData.reconstructionEvidence = {"itemFamily": null, "subtype": null, "componentAdapter": null, "route": null, "exactnessTier": null, "referenceCamera": {"solved": false, "fovDegrees": 38.0, "aspect": 0.8864059590316573, "orientation": {"yaw": 28.0, "pitch": 6.0, "roll": 0.0}, "positionHint": [5.2, 2.2, 8.0], "note": "Front three-quarter view from the vehicle's left, camera roughly at cab-floor height; estimated, not solved (no projection route)."}, "approximationNotes": []};
  root.userData.materialPipeline = {"schemaVersion": 1, "status": "proceed", "registry": "/home/user/Website/.claude/skills/img2threejs/docs/materials/material-reference.json", "analysisArtifact": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-analysis.json", "targetThreshold": 0.7, "unresolvedNotObservedMaterials": [], "regions": [{"componentId": "cabShell", "regionId": "paint", "specMaterialId": "paintSilver", "profileId": "coating.painted-metal", "status": "proceed"}, {"componentId": "sunVisor", "regionId": "visor", "specMaterialId": "trimBlack", "profileId": "plastic.matte", "status": "proceed"}, {"componentId": "windshield", "regionId": "glass", "specMaterialId": "glassTint", "profileId": "glass.clear", "status": "proceed"}, {"componentId": "grilleMesh", "regionId": "mesh", "specMaterialId": "grilleMeshDark", "profileId": "metal.aluminum", "status": "proceed"}, {"componentId": "wheelFront", "regionId": "tyre", "specMaterialId": "tyreRubber", "profileId": "rubber.matte", "status": "proceed"}, {"componentId": "headlight", "regionId": "lens", "specMaterialId": "lampLens", "profileId": "glass.clear", "status": "proceed"}, {"componentId": "numberPlate", "regionId": "plate", "specMaterialId": "plateWhite", "profileId": "plastic.matte", "status": "proceed"}, {"componentId": "starRing", "regionId": "chrome", "specMaterialId": "chromeBright", "profileId": "metal.steel-polished", "status": "proceed"}, {"componentId": "rimFront", "regionId": "rim", "specMaterialId": "alloyRim", "profileId": "metal.aluminum", "status": "proceed"}], "controlledViewsRequired": ["albedo-unlit", "backlight-transmission", "environment-reflection", "grazing", "neutral-studio", "reference-beauty"]};
  root.userData.materialReferenceRegistry = "/home/user/Website/.claude/skills/img2threejs/docs/materials/material-reference.json";

  const materialMap: Record<string, THREE.Material> = {};
  materialMap["paintSilver"] = createSculptMaterial(
    "paintSilver",
    {"id": "paintSilver", "name": "Cab paint (silver metallic, clearcoated)", "type": "physical", "shaderModel": "MeshPhysicalMaterial / PBR approximation", "baseColor": "#a7acb2", "color": "#a7acb2", "albedo": {"dominant": "#b9bdc2", "secondary": ["#d4d7db", "#8d9196"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "colorVariation": {"palette": ["#b9bdc2", "#d4d7db", "#8d9196"], "pattern": "uniform", "amplitude": 0.04, "heightCorrelation": 0.1}, "roughness": {"base": 0.38, "variation": 0.05, "map": "none (textureless)", "localResponse": "slightly lower roughness on convex panel crowns than in recesses"}, "metalness": {"base": 1.0, "variation": 0.02}, "ambientOcclusion": {"cavityStrength": 0.35, "contactShadowBias": 0.3, "notes": "Darken panel seams, grille recess, wheel arches and the cab/chassis junction."}, "wear": {"edgeWear": 0.02, "scratches": [], "chips": []}, "dirt": {"amount": 0.05, "cavityBias": 0.4, "color": "#3a3833"}, "localOverrides": [{"id": "clearcoatGloss", "description": "Clearcoat layer (clearcoat 1.0, clearcoatRoughness 0.08) gives the bright sky highlight on upper panels.", "confidence": 0.65, "roughness": 0.08, "clearcoat": 1.0, "clearcoatRoughness": 0.08}], "shaderNotes": ["Scalar PBR estimated from a single daylight photo; not measured."], "clearcoat": {"base": 1.0}, "clearcoatRoughness": {"base": 0.08}, "referenceMaterialId": "coating.painted-metal", "materialFamily": "coating", "materialSubtype": "paint-over-metal", "materialFinish": "gloss-or-satin", "materialReference": {"registry": "/home/user/Website/.claude/skills/img2threejs/docs/materials/material-reference.json", "profileId": "coating.painted-metal", "method": "family-subtype-finish", "confidence": 0.719, "sourceRefs": ["three.mesh-physical", "gltf.2", "khronos.gltf-pbr", "adobe.pbr-guide-1", "adobe.pbr-guide-2"], "requiredMaps": ["map", "roughnessMap"], "optionalMaps": ["normalMap", "clearcoatMap", "clearcoatRoughnessMap", "metalnessMap"], "validationViews": ["albedo-unlit", "neutral-studio", "grazing", "environment-reflection", "reference-beauty"]}, "ior": {"base": 1.5, "variation": 0.0}, "textureAnalysis": {"finishClass": "painted-metal", "recipe": {"metalness": 0.0, "roughness": 0.5, "clearcoat": 1.0, "clearcoatRoughness": 0.05, "transmission": 0.0, "ior": 1.5, "envMapIntensity": 1.0, "anisotropy": 0.0, "procedural": "flat-clearcoat"}, "palette": ["#8B9AAF", "#8A97AD", "#7D8BA2", "#7B89A0", "#76849B"], "paletteHueRisk": [{"stop": "#8B9AAF", "hueRisk": "blue-collapse", "suggestedRgb": [175, 154, 139]}, {"stop": "#8A97AD", "hueRisk": "blue-collapse", "suggestedRgb": [173, 151, 138]}, {"stop": "#7D8BA2", "hueRisk": "blue-collapse", "suggestedRgb": [162, 139, 125]}, {"stop": "#7B89A0", "hueRisk": "blue-collapse", "suggestedRgb": [160, 137, 123]}, {"stop": "#76849B", "hueRisk": "blue-collapse", "suggestedRgb": [155, 132, 118]}], "gradientAxis": "vertical", "stats": {"meanLum": 141.0, "meanSaturation": 0.221, "gradientStrength": 0.084, "mottle": 0.0, "streakRatio": 0.25, "hueSpread": 0.0, "specularFraction": 0.0}}, "materialEvidence": {"componentId": "cabShell", "regionId": "paint", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/00-paint.png", "bbox": {"x": 300, "y": 500, "width": 80, "height": 60}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0047}, "observations": ["chromatic base-colour response", "directional surface frequency", "single-image PBR inference requires controlled render validation"], "hypothesis": {"componentId": "cabShell", "regionId": "paint", "materialId": null, "family": "coating", "subtype": "paint-over-metal", "finish": "gloss-or-satin", "aliases": [], "confidence": 0.719, "source": "vision"}, "alternatives": []}, "envMapIntensity": 1.0, "textureless": {"declared": true, "evidence": ["renders/material-pass/first-capture-stretched-crops.png: stretched reference crop smeared photo pixels across the paintSilver parts", "material-evidence crop for paintSilver: metallic silver: photo panels show smooth gradients only (crop mottle ~0.002), so flake is below web resolution"]}},
    options
  );
  materialMap["trimBlack"] = createSculptMaterial(
    "trimBlack",
    {"id": "trimBlack", "name": "Black trim plastic (visor, lower bumper, mirror housings, frame)", "type": "standard", "shaderModel": "MeshStandardMaterial / PBR approximation", "baseColor": "#151618", "color": "#151618", "albedo": {"dominant": "#17181a", "secondary": ["#222326", "#0e0f10"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "colorVariation": {"palette": ["#17181a", "#222326", "#0e0f10"], "pattern": "uniform", "amplitude": 0.04, "heightCorrelation": 0.1}, "roughness": {"base": 0.62, "variation": 0.05, "map": "none (textureless)", "localResponse": "slightly lower roughness on convex panel crowns than in recesses"}, "metalness": {"base": 0.0, "variation": 0.02}, "ambientOcclusion": {"cavityStrength": 0.35, "contactShadowBias": 0.3, "notes": "Darken panel seams, grille recess, wheel arches and the cab/chassis junction."}, "wear": {"edgeWear": 0.02, "scratches": [], "chips": []}, "dirt": {"amount": 0.05, "cavityBias": 0.4, "color": "#3a3833"}, "localOverrides": [], "shaderNotes": ["Scalar PBR estimated from a single daylight photo; not measured."], "referenceMaterialId": "plastic.matte", "materialFamily": "plastic", "materialSubtype": "generic-polymer", "materialFinish": "matte", "materialReference": {"registry": "/home/user/Website/.claude/skills/img2threejs/docs/materials/material-reference.json", "profileId": "plastic.matte", "method": "family-subtype-finish", "confidence": 0.751, "sourceRefs": ["three.mesh-standard", "adobe.pbr-guide-1", "google.filament-pbr", "mit.material-recognition"], "requiredMaps": ["map", "roughnessMap"], "optionalMaps": ["normalMap", "aoMap"], "validationViews": ["albedo-unlit", "neutral-studio", "grazing"]}, "ior": {"base": 1.5, "variation": 0.0}, "textureAnalysis": {"finishClass": "painted-metal", "recipe": {"metalness": 0.0, "roughness": 0.5, "clearcoat": 1.0, "clearcoatRoughness": 0.05, "transmission": 0.0, "ior": 1.5, "envMapIntensity": 1.0, "anisotropy": 0.0, "procedural": "flat-clearcoat"}, "palette": ["#1C1F2F", "#1B1E2F", "#1A1D2D", "#1B1D2C", "#0E0F1B"], "paletteHueRisk": [{"stop": "#1C1F2F", "hueRisk": "blue-collapse", "suggestedRgb": [47, 31, 28]}, {"stop": "#1B1E2F", "hueRisk": "blue-collapse", "suggestedRgb": [47, 30, 27]}, {"stop": "#1A1D2D", "hueRisk": "blue-collapse", "suggestedRgb": [45, 29, 26]}, {"stop": "#1B1D2C", "hueRisk": "blue-collapse", "suggestedRgb": [44, 29, 27]}, {"stop": "#0E0F1B", "hueRisk": "blue-collapse", "suggestedRgb": [27, 15, 14]}], "gradientAxis": "vertical", "stats": {"meanLum": 28.9, "meanSaturation": 0.425, "gradientStrength": 0.06, "mottle": 0.002, "streakRatio": 1.64, "hueSpread": 0.005, "specularFraction": 0.0}}, "materialEvidence": {"componentId": "sunVisor", "regionId": "visor", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/01-visor.png", "bbox": {"x": 260, "y": 212, "width": 180, "height": 16}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0028}, "observations": ["chromatic base-colour response", "single-image PBR inference requires controlled render validation"], "hypothesis": {"componentId": "sunVisor", "regionId": "visor", "materialId": null, "family": "plastic", "subtype": "generic-polymer", "finish": "matte", "aliases": [], "confidence": 0.751, "source": "vision"}, "alternatives": []}, "envMapIntensity": 0.7, "textureless": {"declared": true, "evidence": ["renders/material-pass/first-capture-stretched-crops.png: stretched reference crop smeared photo pixels across the trimBlack parts", "material-evidence crop for trimBlack: satin black visor/bumper plastic, uniform in the photo"]}},
    options
  );
  materialMap["glassTint"] = createSculptMaterial(
    "glassTint",
    {"id": "glassTint", "name": "Tinted glass (windshield, side windows)", "type": "physical", "shaderModel": "MeshPhysicalMaterial / PBR approximation", "baseColor": "#10161b", "color": "#10161b", "albedo": {"dominant": "#1d252c", "secondary": ["#2b3740", "#12171c"], "samplingNotes": "Dark blue-grey glass, reflections of sky; interior unresolved."}, "colorVariation": {"palette": ["#1d252c", "#2b3740", "#12171c"], "pattern": "uniform", "amplitude": 0.04, "heightCorrelation": 0.1}, "roughness": {"base": 0.04, "variation": 0.05, "map": "none (textureless)", "localResponse": "slightly lower roughness on convex panel crowns than in recesses"}, "metalness": {"base": 0.0, "variation": 0.02}, "ambientOcclusion": {"cavityStrength": 0.35, "contactShadowBias": 0.3, "notes": "Darken panel seams, grille recess, wheel arches and the cab/chassis junction."}, "wear": {"edgeWear": 0.02, "scratches": [], "chips": []}, "dirt": {"amount": 0.05, "cavityBias": 0.4, "color": "#3a3833"}, "localOverrides": [{"id": "fritBand", "description": "Black ceramic frit band along the lower windshield edge, ~6% of glass height.", "confidence": 0.6}], "shaderNotes": ["Scalar PBR estimated from a single daylight photo; not measured."], "clearcoat": {"base": 1.0}, "clearcoatRoughness": {"base": 0.0525}, "referenceMaterialId": "glass.clear", "materialFamily": "glass", "materialSubtype": "clear", "materialFinish": "polished", "materialReference": {"registry": "/home/user/Website/.claude/skills/img2threejs/docs/materials/material-reference.json", "profileId": "glass.clear", "method": "family-subtype-finish", "confidence": 0.727, "sourceRefs": ["three.mesh-physical", "three.pmrem", "gltf.2", "khronos.transmission", "khronos.volume", "google.filament-pbr"], "requiredMaps": ["roughnessMap", "thicknessMap"], "optionalMaps": ["map", "normalMap", "transmissionMap"], "validationViews": ["neutral-studio", "environment-reflection", "backlight-transmission", "reference-beauty"]}, "transmission": {"base": 0.0}, "ior": {"base": 1.5, "variation": 0.0}, "textureAnalysis": {"finishClass": "painted-metal", "recipe": {"metalness": 0.0, "roughness": 0.5, "clearcoat": 1.0, "clearcoatRoughness": 0.05, "transmission": 0.0, "ior": 1.5, "envMapIntensity": 1.0, "anisotropy": 0.0, "procedural": "flat-clearcoat"}, "palette": ["#29384D", "#2C3C50", "#2E3C51", "#2F4054", "#324256"], "paletteHueRisk": [{"stop": "#29384D", "hueRisk": "blue-collapse", "suggestedRgb": [77, 56, 41]}, {"stop": "#2C3C50", "hueRisk": "blue-collapse", "suggestedRgb": [80, 60, 44]}, {"stop": "#2E3C51", "hueRisk": "blue-collapse", "suggestedRgb": [81, 60, 46]}, {"stop": "#2F4054", "hueRisk": "blue-collapse", "suggestedRgb": [84, 64, 47]}, {"stop": "#324256", "hueRisk": "blue-collapse", "suggestedRgb": [86, 66, 50]}], "gradientAxis": "horizontal", "stats": {"meanLum": 60.3, "meanSaturation": 0.433, "gradientStrength": 0.065, "mottle": 0.003, "streakRatio": 2.08, "hueSpread": 0.005, "specularFraction": 0.0}}, "materialEvidence": {"componentId": "windshield", "regionId": "glass", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/02-glass.png", "bbox": {"x": 200, "y": 300, "width": 200, "height": 70}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0137}, "observations": ["chromatic base-colour response", "directional surface frequency", "single-image PBR inference requires controlled render validation"], "hypothesis": {"componentId": "windshield", "regionId": "glass", "materialId": null, "family": "glass", "subtype": "clear", "finish": "polished", "aliases": [], "confidence": 0.727, "source": "vision"}, "alternatives": []}, "needsEnvironment": true, "envMapIntensity": 1.4, "textureless": {"declared": true, "evidence": ["renders/material-pass/first-capture-stretched-crops.png: stretched reference crop smeared photo pixels across the glassTint parts", "material-evidence crop for glassTint: dark tinted glass; opaque reflective treatment because the cab has no modelled interior to transmit"]}},
    options
  );
  materialMap["chromeBright"] = createSculptMaterial(
    "chromeBright",
    {"id": "chromeBright", "name": "Chrome (star ring, slat edges, plate)", "type": "physical", "shaderModel": "MeshPhysicalMaterial / PBR approximation", "baseColor": "#d8dade", "color": "#d8dade", "albedo": {"dominant": "#d8dade", "secondary": ["#f2f3f5", "#7d8086"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "colorVariation": {"palette": ["#d8dade", "#f2f3f5", "#7d8086"], "pattern": "uniform", "amplitude": 0.04, "heightCorrelation": 0.1}, "roughness": {"base": 0.1, "variation": 0.05, "map": "none (textureless)", "localResponse": "slightly lower roughness on convex panel crowns than in recesses"}, "metalness": {"base": 1.0, "variation": 0.02}, "ambientOcclusion": {"cavityStrength": 0.35, "contactShadowBias": 0.3, "notes": "Darken panel seams, grille recess, wheel arches and the cab/chassis junction."}, "wear": {"edgeWear": 0.02, "scratches": [], "chips": []}, "dirt": {"amount": 0.05, "cavityBias": 0.4, "color": "#3a3833"}, "localOverrides": [], "shaderNotes": ["Scalar PBR estimated from a single daylight photo; not measured."], "referenceMaterialId": "metal.steel-polished", "materialFamily": "metal", "materialSubtype": "steel", "materialFinish": "polished", "materialReference": {"registry": "/home/user/Website/.claude/skills/img2threejs/docs/materials/material-reference.json", "profileId": "metal.steel-polished", "method": "family-subtype-finish", "confidence": 0.824, "sourceRefs": ["three.mesh-standard", "three.pmrem", "gltf.2", "khronos.gltf-pbr", "adobe.pbr-guide-2", "google.filament-pbr"], "requiredMaps": ["map", "roughnessMap"], "optionalMaps": ["normalMap", "metalnessMap"], "validationViews": ["neutral-studio", "environment-reflection", "grazing", "reference-beauty"]}, "anisotropy": {"base": 0.0, "variation": 0.0}, "textureAnalysis": {"finishClass": "painted-metal", "recipe": {"metalness": 0.0, "roughness": 0.5, "clearcoat": 1.0, "clearcoatRoughness": 0.05, "transmission": 0.0, "ior": 1.5, "envMapIntensity": 1.0, "anisotropy": 0.0, "procedural": "flat-clearcoat"}, "palette": ["#6B7387", "#373E4F", "#1E2231", "#0F0D16", "#07030C"], "paletteHueRisk": [{"stop": "#6B7387", "hueRisk": "blue-collapse", "suggestedRgb": [135, 115, 107]}, {"stop": "#373E4F", "hueRisk": "blue-collapse", "suggestedRgb": [79, 62, 55]}, {"stop": "#1E2231", "hueRisk": "blue-collapse", "suggestedRgb": [49, 34, 30]}, {"stop": "#0F0D16", "hueRisk": "blue-collapse", "suggestedRgb": [22, 13, 15]}, {"stop": "#07030C", "hueRisk": "blue-collapse", "suggestedRgb": [12, 3, 7]}], "gradientAxis": "horizontal", "stats": {"meanLum": 41.7, "meanSaturation": 0.498, "gradientStrength": 0.431, "mottle": 0.013, "streakRatio": 1.14, "hueSpread": 0.063, "specularFraction": 0.0}}, "materialEvidence": {"componentId": "starRing", "regionId": "chrome", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/07-chrome.png", "bbox": {"x": 236, "y": 600, "width": 20, "height": 40}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0008}, "observations": ["chromatic base-colour response", "strong image-space gradient; verify it is material pattern, not lighting", "single-image PBR inference requires controlled render validation"], "hypothesis": {"componentId": "starRing", "regionId": "chrome", "materialId": null, "family": "metal", "subtype": "steel", "finish": "polished", "aliases": [], "confidence": 0.824, "source": "vision"}, "alternatives": []}, "needsEnvironment": true, "envMapIntensity": 1.2, "textureless": {"declared": true, "evidence": ["renders/material-pass/first-capture-stretched-crops.png: stretched reference crop smeared photo pixels across the chromeBright parts", "material-evidence crop for chromeBright: mirror chrome on the star ring and plate trims"]}},
    options
  );
  materialMap["grilleMeshDark"] = createSculptMaterial(
    "grilleMeshDark",
    {"id": "grilleMeshDark", "name": "Grille perforated mesh (dark)", "type": "standard", "shaderModel": "MeshStandardMaterial / PBR approximation", "baseColor": "#1f2124", "color": "#1f2124", "albedo": {"dominant": "#2b2d31", "secondary": ["#35383d", "#1c1d20"], "samplingNotes": "Dark grey perforated mesh between the slats."}, "colorVariation": {"palette": ["#2b2d31", "#35383d", "#1c1d20"], "pattern": "uniform", "amplitude": 0.04, "heightCorrelation": 0.1}, "roughness": {"base": 0.45, "variation": 0.05, "map": "none (textureless)", "localResponse": "slightly lower roughness on convex panel crowns than in recesses"}, "metalness": {"base": 1.0, "variation": 0.02}, "ambientOcclusion": {"cavityStrength": 0.35, "contactShadowBias": 0.3, "notes": "Darken panel seams, grille recess, wheel arches and the cab/chassis junction."}, "wear": {"edgeWear": 0.02, "scratches": [], "chips": []}, "dirt": {"amount": 0.05, "cavityBias": 0.4, "color": "#3a3833"}, "localOverrides": [{"id": "perforationDarkening", "description": "Perforation read as darker AO band; holes not modelled individually.", "confidence": 0.6}], "shaderNotes": ["Scalar PBR estimated from a single daylight photo; not measured."], "referenceMaterialId": "metal.aluminum", "materialFamily": "metal", "materialSubtype": "aluminum", "materialFinish": "satin", "materialReference": {"registry": "/home/user/Website/.claude/skills/img2threejs/docs/materials/material-reference.json", "profileId": "metal.aluminum", "method": "family-subtype-finish", "confidence": 0.829, "sourceRefs": ["three.mesh-standard", "three.pmrem", "gltf.2", "khronos.gltf-pbr", "adobe.pbr-guide-2", "google.filament-pbr"], "requiredMaps": ["map", "roughnessMap"], "optionalMaps": ["normalMap", "anisotropyMap"], "validationViews": ["neutral-studio", "environment-reflection", "grazing"]}, "anisotropy": {"base": 0.2, "variation": 0.0}, "textureAnalysis": {"finishClass": "candy-coat", "recipe": {"metalness": 0.35, "roughness": 0.18, "clearcoat": 0.6, "clearcoatRoughness": 0.15, "transmission": 0.0, "ior": 1.5, "envMapIntensity": 0.7, "anisotropy": 0.0, "procedural": "gradient-smoke"}, "palette": ["#1B1D33", "#505470", "#5F6381", "#686B8A", "#6E7491"], "paletteHueRisk": [{"stop": "#1B1D33", "hueRisk": "blue-collapse", "suggestedRgb": [51, 29, 27]}, {"stop": "#505470", "hueRisk": "blue-collapse", "suggestedRgb": [112, 84, 80]}, {"stop": "#5F6381", "hueRisk": "blue-collapse", "suggestedRgb": [129, 99, 95]}, {"stop": "#686B8A", "hueRisk": "blue-collapse", "suggestedRgb": [138, 107, 104]}, {"stop": "#6E7491", "hueRisk": "blue-collapse", "suggestedRgb": [145, 116, 110]}], "gradientAxis": "vertical", "stats": {"meanLum": 93.1, "meanSaturation": 0.36, "gradientStrength": 0.34, "mottle": 0.216, "streakRatio": 5.43, "hueSpread": 0.002, "specularFraction": 0.0}}, "materialEvidence": {"componentId": "grilleMesh", "regionId": "mesh", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/03-mesh.png", "bbox": {"x": 340, "y": 700, "width": 120, "height": 20}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0023}, "observations": ["chromatic base-colour response", "directional surface frequency", "visible meso/micro variation", "strong image-space gradient; verify it is material pattern, not lighting", "single-image PBR inference requires controlled render validation"], "hypothesis": {"componentId": "grilleMesh", "regionId": "mesh", "materialId": null, "family": "metal", "subtype": "aluminum", "finish": "satin", "aliases": [], "confidence": 0.829, "source": "vision"}, "alternatives": []}, "needsEnvironment": true, "envMapIntensity": 0.6, "textureless": {"declared": true, "evidence": ["renders/material-pass/first-capture-stretched-crops.png: stretched reference crop smeared photo pixels across the grilleMeshDark parts", "material-evidence crop for grilleMeshDark: perforated dark grille read as a uniform dark metal panel at web scale"]}},
    options
  );
  materialMap["tyreRubber"] = createSculptMaterial(
    "tyreRubber",
    {"id": "tyreRubber", "name": "Tyre rubber", "type": "standard", "shaderModel": "MeshStandardMaterial / PBR approximation", "baseColor": "#141416", "color": "#141416", "albedo": {"dominant": "#18181a", "secondary": ["#202022", "#101011"], "samplingNotes": "Matte black rubber."}, "colorVariation": {"palette": ["#18181a", "#202022", "#101011"], "pattern": "uniform", "amplitude": 0.04, "heightCorrelation": 0.1}, "roughness": {"base": 0.9, "variation": 0.05, "map": "none (textureless)", "localResponse": "slightly lower roughness on convex panel crowns than in recesses"}, "metalness": {"base": 0.0, "variation": 0.02}, "ambientOcclusion": {"cavityStrength": 0.35, "contactShadowBias": 0.3, "notes": "Darken panel seams, grille recess, wheel arches and the cab/chassis junction."}, "wear": {"edgeWear": 0.02, "scratches": [], "chips": []}, "dirt": {"amount": 0.05, "cavityBias": 0.4, "color": "#3a3833"}, "localOverrides": [], "shaderNotes": ["Scalar PBR estimated from a single daylight photo; not measured."], "referenceMaterialId": "rubber.matte", "materialFamily": "rubber", "materialSubtype": "generic-elastomer", "materialFinish": "matte", "materialReference": {"registry": "/home/user/Website/.claude/skills/img2threejs/docs/materials/material-reference.json", "profileId": "rubber.matte", "method": "family-subtype-finish", "confidence": 0.8, "sourceRefs": ["three.mesh-standard", "adobe.pbr-guide-1", "google.filament-pbr", "mit.material-recognition"], "requiredMaps": ["map", "roughnessMap", "normalMap"], "optionalMaps": ["aoMap"], "validationViews": ["albedo-unlit", "neutral-studio", "grazing", "reference-beauty"]}, "ior": {"base": 1.48, "variation": 0.0}, "textureAnalysis": {"finishClass": "painted-metal", "recipe": {"metalness": 0.0, "roughness": 0.5, "clearcoat": 1.0, "clearcoatRoughness": 0.05, "transmission": 0.0, "ior": 1.5, "envMapIntensity": 1.0, "anisotropy": 0.0, "procedural": "flat-clearcoat"}, "palette": ["#09070E", "#09060E", "#0B080F", "#100D12", "#28262B"], "paletteHueRisk": [{"stop": "#09070E", "hueRisk": "blue-collapse", "suggestedRgb": [14, 7, 9]}, {"stop": "#09060E", "hueRisk": "blue-collapse", "suggestedRgb": [14, 6, 9]}, {"stop": "#0B080F", "hueRisk": "blue-collapse", "suggestedRgb": [15, 8, 11]}, {"stop": "#100D12", "hueRisk": "blue-collapse", "suggestedRgb": [18, 13, 16]}], "gradientAxis": "vertical", "stats": {"meanLum": 13.8, "meanSaturation": 0.43, "gradientStrength": 0.13, "mottle": 0.004, "streakRatio": 1.24, "hueSpread": 0.014, "specularFraction": 0.0}}, "materialEvidence": {"componentId": "wheelFront", "regionId": "tyre", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/04-tyre.png", "bbox": {"x": 700, "y": 985, "width": 50, "height": 50}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0024}, "observations": ["chromatic base-colour response", "single-image PBR inference requires controlled render validation"], "hypothesis": {"componentId": "wheelFront", "regionId": "tyre", "materialId": null, "family": "rubber", "subtype": "generic-elastomer", "finish": "matte", "aliases": [], "confidence": 0.8, "source": "vision"}, "alternatives": []}, "envMapIntensity": 0.4, "textureless": {"declared": true, "evidence": ["renders/material-pass/first-capture-stretched-crops.png: stretched reference crop smeared photo pixels across the tyreRubber parts", "material-evidence crop for tyreRubber: matte tyre rubber, no tread pattern visible at this distance"]}},
    options
  );
  materialMap["alloyRim"] = createSculptMaterial(
    "alloyRim",
    {"id": "alloyRim", "name": "Wheel rim (dark painted steel, silver nuts)", "type": "physical", "shaderModel": "MeshPhysicalMaterial / PBR approximation", "baseColor": "#3a3c42", "color": "#3a3c42", "albedo": {"dominant": "#2e2f34", "secondary": ["#45474d", "#1c1d21"], "samplingNotes": "Black-grey steel wheel with bright wheel nuts; verified crop shows the dark rim face."}, "colorVariation": {"palette": ["#2e2f34", "#45474d", "#1c1d21"], "pattern": "uniform", "amplitude": 0.04, "heightCorrelation": 0.1}, "roughness": {"base": 0.35, "variation": 0.05, "map": "none (textureless)", "localResponse": "slightly lower roughness on convex panel crowns than in recesses"}, "metalness": {"base": 1.0, "variation": 0.02}, "ambientOcclusion": {"cavityStrength": 0.35, "contactShadowBias": 0.3, "notes": "Darken panel seams, grille recess, wheel arches and the cab/chassis junction."}, "wear": {"edgeWear": 0.02, "scratches": [], "chips": []}, "dirt": {"amount": 0.05, "cavityBias": 0.4, "color": "#3a3833"}, "localOverrides": [], "shaderNotes": ["Scalar PBR estimated from a single daylight photo; not measured."], "referenceMaterialId": "metal.aluminum", "materialFamily": "metal", "materialSubtype": "aluminum", "materialFinish": "satin", "materialReference": {"registry": "/home/user/Website/.claude/skills/img2threejs/docs/materials/material-reference.json", "profileId": "metal.aluminum", "method": "family-subtype-finish", "confidence": 0.782, "sourceRefs": ["three.mesh-standard", "three.pmrem", "gltf.2", "khronos.gltf-pbr", "adobe.pbr-guide-2", "google.filament-pbr"], "requiredMaps": ["map", "roughnessMap"], "optionalMaps": ["normalMap", "anisotropyMap"], "validationViews": ["neutral-studio", "environment-reflection", "grazing"]}, "anisotropy": {"base": 0.2, "variation": 0.0}, "textureAnalysis": {"finishClass": "painted-metal", "recipe": {"metalness": 0.0, "roughness": 0.5, "clearcoat": 1.0, "clearcoatRoughness": 0.05, "transmission": 0.0, "ior": 1.5, "envMapIntensity": 1.0, "anisotropy": 0.0, "procedural": "flat-clearcoat"}, "palette": ["#0A090E", "#14131C", "#211F28", "#04030A", "#1A1920"], "paletteHueRisk": [{"stop": "#0A090E", "hueRisk": "blue-collapse", "suggestedRgb": [14, 9, 10]}, {"stop": "#14131C", "hueRisk": "blue-collapse", "suggestedRgb": [28, 19, 20]}, {"stop": "#211F28", "hueRisk": "blue-collapse", "suggestedRgb": [40, 31, 33]}, {"stop": "#04030A", "hueRisk": "blue-collapse", "suggestedRgb": [10, 3, 4]}, {"stop": "#1A1920", "hueRisk": "blue-collapse", "suggestedRgb": [32, 25, 26]}], "gradientAxis": "vertical", "stats": {"meanLum": 17.7, "meanSaturation": 0.598, "gradientStrength": 0.135, "mottle": 0.012, "streakRatio": 1.04, "hueSpread": 0.007, "specularFraction": 0.0}}, "materialEvidence": {"componentId": "rimFront", "regionId": "rim", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/08-rim.png", "bbox": {"x": 722, "y": 880, "width": 30, "height": 40}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0012}, "observations": ["chromatic base-colour response", "single-image PBR inference requires controlled render validation"], "hypothesis": {"componentId": "rimFront", "regionId": "rim", "materialId": null, "family": "metal", "subtype": "aluminum", "finish": "satin", "aliases": [], "confidence": 0.782, "source": "vision"}, "alternatives": []}, "needsEnvironment": true, "envMapIntensity": 0.9, "textureless": {"declared": true, "evidence": ["renders/material-pass/first-capture-stretched-crops.png: stretched reference crop smeared photo pixels across the alloyRim parts", "material-evidence crop for alloyRim: dark painted steel rim"]}},
    options
  );
  materialMap["lampLens"] = createSculptMaterial(
    "lampLens",
    {"id": "lampLens", "name": "Headlight lens + DRL", "type": "physical", "shaderModel": "MeshPhysicalMaterial / PBR approximation", "baseColor": "#22262b", "color": "#22262b", "albedo": {"dominant": "#e9eef2", "secondary": ["#ffffff", "#9aa3aa"], "samplingNotes": "Clear lens over chrome reflector; white daytime running light strip."}, "colorVariation": {"palette": ["#e9eef2", "#ffffff", "#9aa3aa"], "pattern": "uniform", "amplitude": 0.04, "heightCorrelation": 0.1}, "roughness": {"base": 0.12, "variation": 0.05, "map": "none (textureless)", "localResponse": "slightly lower roughness on convex panel crowns than in recesses"}, "metalness": {"base": 0.0, "variation": 0.02}, "ambientOcclusion": {"cavityStrength": 0.35, "contactShadowBias": 0.3, "notes": "Darken panel seams, grille recess, wheel arches and the cab/chassis junction."}, "wear": {"edgeWear": 0.02, "scratches": [], "chips": []}, "dirt": {"amount": 0.05, "cavityBias": 0.4, "color": "#3a3833"}, "localOverrides": [{"id": "drlEmission", "description": "DRL strip emissive white, intensity ~1.2.", "confidence": 0.6, "emissive": "#ffffff", "emissiveIntensity": 1.2}], "shaderNotes": ["Scalar PBR estimated from a single daylight photo; not measured."], "emissive": "#cfe0f2", "emissiveIntensity": 0.08, "referenceMaterialId": "glass.clear", "materialFamily": "glass", "materialSubtype": "clear", "materialFinish": "polished", "materialReference": {"registry": "/home/user/Website/.claude/skills/img2threejs/docs/materials/material-reference.json", "profileId": "glass.clear", "method": "family-subtype-finish", "confidence": 0.829, "sourceRefs": ["three.mesh-physical", "three.pmrem", "gltf.2", "khronos.transmission", "khronos.volume", "google.filament-pbr"], "requiredMaps": ["roughnessMap", "thicknessMap"], "optionalMaps": ["map", "normalMap", "transmissionMap"], "validationViews": ["neutral-studio", "environment-reflection", "backlight-transmission", "reference-beauty"]}, "transmission": {"base": 0.0}, "ior": {"base": 1.5, "variation": 0.0}, "textureAnalysis": {"finishClass": "painted-metal", "recipe": {"metalness": 0.0, "roughness": 0.5, "clearcoat": 1.0, "clearcoatRoughness": 0.05, "transmission": 0.0, "ior": 1.5, "envMapIntensity": 1.0, "anisotropy": 0.0, "procedural": "flat-clearcoat"}, "palette": ["#12101A", "#12101E", "#2D2D3D", "#3C3D4F", "#494A5C"], "paletteHueRisk": [{"stop": "#12101A", "hueRisk": "blue-collapse", "suggestedRgb": [26, 16, 18]}, {"stop": "#12101E", "hueRisk": "blue-collapse", "suggestedRgb": [30, 16, 18]}, {"stop": "#2D2D3D", "hueRisk": "blue-collapse", "suggestedRgb": [61, 45, 45]}, {"stop": "#3C3D4F", "hueRisk": "blue-collapse", "suggestedRgb": [79, 61, 60]}, {"stop": "#494A5C", "hueRisk": "blue-collapse", "suggestedRgb": [92, 74, 73]}], "gradientAxis": "vertical", "stats": {"meanLum": 45.7, "meanSaturation": 0.397, "gradientStrength": 0.239, "mottle": 0.031, "streakRatio": 1.51, "hueSpread": 0.01, "specularFraction": 0.003}}, "materialEvidence": {"componentId": "headlight", "regionId": "lens", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/05-lens.png", "bbox": {"x": 520, "y": 822, "width": 55, "height": 35}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0019}, "observations": ["chromatic base-colour response", "strong image-space gradient; verify it is material pattern, not lighting", "single-image PBR inference requires controlled render validation"], "hypothesis": {"componentId": "headlight", "regionId": "lens", "materialId": null, "family": "glass", "subtype": "clear", "finish": "polished", "aliases": [], "confidence": 0.829, "source": "vision"}, "alternatives": []}, "needsEnvironment": true, "envMapIntensity": 0.5, "textureless": {"declared": true, "evidence": ["renders/material-pass/first-capture-stretched-crops.png: stretched reference crop smeared photo pixels across the lampLens parts", "material-evidence crop for lampLens: smoked headlight lens over chrome reflectors; reads dark in daylight with a faint LED glow"]}},
    options
  );
  materialMap["plateWhite"] = createSculptMaterial(
    "plateWhite",
    {"id": "plateWhite", "name": "Number plate", "type": "standard", "shaderModel": "MeshStandardMaterial / PBR approximation", "baseColor": "#efefea", "color": "#efefea", "albedo": {"dominant": "#efefea", "secondary": ["#ffffff", "#1d3c8f"], "samplingNotes": "White plate with blue EU band; characters not reproduced."}, "colorVariation": {"palette": ["#efefea", "#ffffff", "#1d3c8f"], "pattern": "uniform", "amplitude": 0.04, "heightCorrelation": 0.1}, "roughness": {"base": 0.6, "variation": 0.05, "map": "none (textureless)", "localResponse": "slightly lower roughness on convex panel crowns than in recesses"}, "metalness": {"base": 0.0, "variation": 0.02}, "ambientOcclusion": {"cavityStrength": 0.35, "contactShadowBias": 0.3, "notes": "Darken panel seams, grille recess, wheel arches and the cab/chassis junction."}, "wear": {"edgeWear": 0.02, "scratches": [], "chips": []}, "dirt": {"amount": 0.05, "cavityBias": 0.4, "color": "#3a3833"}, "localOverrides": [], "shaderNotes": ["Scalar PBR estimated from a single daylight photo; not measured."], "referenceMaterialId": "plastic.matte", "materialFamily": "plastic", "materialSubtype": "generic-polymer", "materialFinish": "matte", "materialReference": {"registry": "/home/user/Website/.claude/skills/img2threejs/docs/materials/material-reference.json", "profileId": "plastic.matte", "method": "family-subtype-finish", "confidence": 0.806, "sourceRefs": ["three.mesh-standard", "adobe.pbr-guide-1", "google.filament-pbr", "mit.material-recognition"], "requiredMaps": ["map", "roughnessMap"], "optionalMaps": ["normalMap", "aoMap"], "validationViews": ["albedo-unlit", "neutral-studio", "grazing"]}, "ior": {"base": 1.5, "variation": 0.0}, "textureAnalysis": {"finishClass": "candy-coat", "recipe": {"metalness": 0.35, "roughness": 0.18, "clearcoat": 0.6, "clearcoatRoughness": 0.15, "transmission": 0.0, "ior": 1.5, "envMapIntensity": 0.7, "anisotropy": 0.0, "procedural": "gradient-smoke"}, "palette": ["#5F6277", "#505566", "#52586B", "#505164", "#4D5062"], "paletteHueRisk": [{"stop": "#5F6277", "hueRisk": "blue-collapse", "suggestedRgb": [119, 98, 95]}, {"stop": "#505566", "hueRisk": "blue-collapse", "suggestedRgb": [102, 85, 80]}, {"stop": "#52586B", "hueRisk": "blue-collapse", "suggestedRgb": [107, 88, 82]}, {"stop": "#505164", "hueRisk": "blue-collapse", "suggestedRgb": [100, 81, 80]}, {"stop": "#4D5062", "hueRisk": "blue-collapse", "suggestedRgb": [98, 80, 77]}], "gradientAxis": "horizontal", "stats": {"meanLum": 70.3, "meanSaturation": 0.348, "gradientStrength": 0.367, "mottle": 0.069, "streakRatio": 7.24, "hueSpread": 0.007, "specularFraction": 0.0}}, "materialEvidence": {"componentId": "numberPlate", "regionId": "plate", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/06-plate.png", "bbox": {"x": 250, "y": 957, "width": 80, "height": 20}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0016}, "observations": ["chromatic base-colour response", "directional surface frequency", "visible meso/micro variation", "strong image-space gradient; verify it is material pattern, not lighting", "single-image PBR inference requires controlled render validation"], "hypothesis": {"componentId": "numberPlate", "regionId": "plate", "materialId": null, "family": "plastic", "subtype": "generic-polymer", "finish": "matte", "aliases": [], "confidence": 0.806, "source": "vision"}, "alternatives": []}, "textureless": {"declared": true, "evidence": ["renders/material-pass/first-capture-stretched-crops.png: stretched reference crop smeared photo pixels across the plateWhite parts", "material-evidence crop for plateWhite: number plate kept blank: registration characters are not reproduced"]}},
    options
  );

  const nodes: Record<string, THREE.Object3D> = { root };
  const meshes: Record<string, THREE.Mesh> = {};
  const sockets: Record<string, THREE.Object3D> = {};
  const colliders: Record<string, unknown> = {};
  const destructionGroups: Record<string, THREE.Object3D[]> = {};

  const endpoint_root_0 = makeAttachmentEndpoint(null);
  const node_root_0 = new THREE.Group();
  node_root_0.name = "Ladder frame chassis__pivot";
  node_root_0.scale.set(1, 1, 1);
  if (endpoint_root_0) {
    node_root_0.position.copy(endpoint_root_0.start);
    node_root_0.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_root_0.position.set(0.0, 0.8, -3.0);
    node_root_0.rotation.set(0.0, 0.0, 0.0);
  }
  node_root_0.userData.sculptComponent = {"id": "root", "name": "Ladder frame chassis", "level": "macro", "role": "chassis", "importance": 0.7, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Ladder frame chassis", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": null, "attachment": null, "dimensions": {"width": 0.95, "height": 0.3, "depth": 6.2, "units": "relative", "confidence": 0.5}, "transform": {"position": [0, 0.8, -3.0], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "frameRails", "description": "Two parallel C-section rails read as one dark beam at web scale.", "confidence": 0.5, "level": "meso", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_root_0.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_root_0);
  nodes["root"] = node_root_0;
  const mesh_root_0Geometry = endpoint_root_0
    ? new THREE.CylinderGeometry(endpoint_root_0.endRadius, endpoint_root_0.baseRadius, endpoint_root_0.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_root_0) {
    mesh_root_0Geometry.scale(0.95, 0.3, 6.2);
  }
  const mesh_root_0 = new THREE.Mesh(
    mesh_root_0Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_root_0.name = "Ladder frame chassis";
  if (endpoint_root_0) {
    mesh_root_0.position.copy(endpoint_root_0.midpoint);
    mesh_root_0.quaternion.copy(endpoint_root_0.quaternion);
  }
  mesh_root_0.castShadow = options.castShadow ?? true;
  mesh_root_0.receiveShadow = options.receiveShadow ?? true;
  mesh_root_0.userData.sculptComponent = {"id": "root", "name": "Ladder frame chassis", "level": "macro", "role": "chassis", "importance": 0.7, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Ladder frame chassis", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": null, "attachment": null, "dimensions": {"width": 0.95, "height": 0.3, "depth": 6.2, "units": "relative", "confidence": 0.5}, "transform": {"position": [0, 0.8, -3.0], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "frameRails", "description": "Two parallel C-section rails read as one dark beam at web scale.", "confidence": 0.5, "level": "meso", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_root_0.add(mesh_root_0);
  meshes["root"] = mesh_root_0;
  colliders["root"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_cabShell_1 = makeAttachmentEndpoint(null);
  const node_cabShell_1 = new THREE.Group();
  node_cabShell_1.name = "Cab floor pan and mounts (cab pivot)__pivot";
  node_cabShell_1.scale.set(1, 1, 1);
  if (endpoint_cabShell_1) {
    node_cabShell_1.position.copy(endpoint_cabShell_1.start);
    node_cabShell_1.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_cabShell_1.position.set(0.0, 0.38, 1.8);
    node_cabShell_1.rotation.set(0.0, 0.0, 0.0);
  }
  node_cabShell_1.userData.sculptComponent = {"id": "cabShell", "name": "Cab floor pan and mounts (cab pivot)", "level": "macro", "role": "body", "importance": 0.6, "confidence": 0.6, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Cab underside pan; carries the cab hierarchy pivot so the rounded body shell can be a rotated leaf extrusion.", "geometryDescriptor": {"topologyIntent": "Cab floor pan and mounts (cab pivot)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurface", "localStart": [0, 0.38, 1.8], "localEnd": [0, 0.38, 1.8], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.3, "height": 0.08, "depth": 2.2, "units": "relative", "confidence": 0.6}, "transform": {"position": [0, 0.38, 1.8], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "paintSilver"}, "materialRegions": [{"regionId": "paint", "materialId": "paintSilver", "profileId": "coating.painted-metal", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/00-paint.png", "bbox": {"x": 300, "y": 500, "width": 80, "height": 60}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0047}}]};
  node_cabShell_1.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_cabShell_1);
  nodes["cabShell"] = node_cabShell_1;
  const mesh_cabShell_1Geometry = endpoint_cabShell_1
    ? new THREE.CylinderGeometry(endpoint_cabShell_1.endRadius, endpoint_cabShell_1.baseRadius, endpoint_cabShell_1.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_cabShell_1) {
    mesh_cabShell_1Geometry.scale(2.3, 0.08, 2.2);
  }
  const mesh_cabShell_1 = new THREE.Mesh(
    mesh_cabShell_1Geometry,
    materialMap["paintSilver"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_cabShell_1.name = "Cab floor pan and mounts (cab pivot)";
  if (endpoint_cabShell_1) {
    mesh_cabShell_1.position.copy(endpoint_cabShell_1.midpoint);
    mesh_cabShell_1.quaternion.copy(endpoint_cabShell_1.quaternion);
  }
  mesh_cabShell_1.castShadow = options.castShadow ?? true;
  mesh_cabShell_1.receiveShadow = options.receiveShadow ?? true;
  mesh_cabShell_1.userData.sculptComponent = {"id": "cabShell", "name": "Cab floor pan and mounts (cab pivot)", "level": "macro", "role": "body", "importance": 0.6, "confidence": 0.6, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Cab underside pan; carries the cab hierarchy pivot so the rounded body shell can be a rotated leaf extrusion.", "geometryDescriptor": {"topologyIntent": "Cab floor pan and mounts (cab pivot)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurface", "localStart": [0, 0.38, 1.8], "localEnd": [0, 0.38, 1.8], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.3, "height": 0.08, "depth": 2.2, "units": "relative", "confidence": 0.6}, "transform": {"position": [0, 0.38, 1.8], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "paintSilver"}, "materialRegions": [{"regionId": "paint", "materialId": "paintSilver", "profileId": "coating.painted-metal", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/00-paint.png", "bbox": {"x": 300, "y": 500, "width": 80, "height": 60}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0047}}]};
  node_cabShell_1.add(mesh_cabShell_1);
  meshes["cabShell"] = mesh_cabShell_1;
  colliders["cabShell"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_cabBody_2 = makeAttachmentEndpoint(null);
  const node_cabBody_2 = new THREE.Group();
  node_cabBody_2.name = "Cab body shell (GigaSpace)__pivot";
  node_cabBody_2.scale.set(1, 1, 1);
  if (endpoint_cabBody_2) {
    node_cabBody_2.position.copy(endpoint_cabBody_2.start);
    node_cabBody_2.rotation.set(-1.5707963267948966, 0.0, 0.0);
  } else {
    node_cabBody_2.position.set(0.0, -0.04, 1.2);
    node_cabBody_2.rotation.set(-1.5707963267948966, 0.0, 0.0);
  }
  node_cabBody_2.userData.sculptComponent = {"id": "cabBody", "name": "Cab body shell (GigaSpace)", "level": "macro", "role": "body", "importance": 1.0, "confidence": 0.75, "primitive": "extrude", "topologyClass": "assembled-solid", "topologyRationale": "Pressed-steel cab with large-radius vertical corner wraps; a plan-view rounded footprint extruded to cab height carries those fillets.", "geometryDescriptor": {"topologyIntent": "Cab body shell (GigaSpace)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.22, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry", "profile2D": {"points": [[-1.25, 0.24], [-1.2418, 0.1779], [-1.2178, 0.12], [-1.1797, 0.0703], [-1.13, 0.0322], [-1.0721, 0.0082], [-1.01, 0.0], [1.01, 0.0], [1.0721, 0.0082], [1.13, 0.0322], [1.1797, 0.0703], [1.2178, 0.12], [1.2418, 0.1779], [1.25, 0.24], [1.25, 2.3], [1.2466, 2.3259], [1.2366, 2.35], [1.2207, 2.3707], [1.2, 2.3866], [1.1759, 2.3966], [1.15, 2.4], [-1.15, 2.4], [-1.1759, 2.3966], [-1.2, 2.3866], [-1.2207, 2.3707], [-1.2366, 2.35], [-1.2466, 2.3259], [-1.25, 2.3]], "depth": 2.32}, "extrudeAxis": "plan footprint, extruded +Y via rotation [-pi/2, 0, 0]"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, -0.04, 1.2], "localEnd": [0, -0.04, 1.2], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.5, "height": 2.32, "depth": 2.4, "units": "relative", "confidence": 0.75}, "transform": {"position": [0, -0.04, 1.2], "rotation": [-1.5707963267948966, 0, 0], "scale": [1, 1, 1]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "doorSeam", "description": "Door panel seam and handle on both cab sides, rendered as a thin dark groove line.", "confidence": 0.6, "level": "meso", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.38, "microRoughness": 0.08, "bumpAmplitude": 0.0, "seams": "door and tilt-cab panel gaps 4 mm; below web view scale, omitted from geometry", "aoLocality": "darken the cab underside / chassis junction and the wheel-arch return", "evidence": ["front-3q-left"]}};
  node_cabBody_2.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_cabBody_2);
  nodes["cabBody"] = node_cabBody_2;
  const mesh_cabBody_2Geometry = endpoint_cabBody_2
    ? new THREE.CylinderGeometry(endpoint_cabBody_2.endRadius, endpoint_cabBody_2.baseRadius, endpoint_cabBody_2.length, 16, 6)
    : buildExtrudeGeometry({"points": [[-1.25, 0.24], [-1.2418, 0.1779], [-1.2178, 0.12], [-1.1797, 0.0703], [-1.13, 0.0322], [-1.0721, 0.0082], [-1.01, 0.0], [1.01, 0.0], [1.0721, 0.0082], [1.13, 0.0322], [1.1797, 0.0703], [1.2178, 0.12], [1.2418, 0.1779], [1.25, 0.24], [1.25, 2.3], [1.2466, 2.3259], [1.2366, 2.35], [1.2207, 2.3707], [1.2, 2.3866], [1.1759, 2.3966], [1.15, 2.4], [-1.15, 2.4], [-1.1759, 2.3966], [-1.2, 2.3866], [-1.2207, 2.3707], [-1.2366, 2.35], [-1.2466, 2.3259], [-1.25, 2.3]], "depth": 2.32});
  if (!endpoint_cabBody_2) {
    mesh_cabBody_2Geometry.scale(1.0, 1.0, 1.0);
  }
  const mesh_cabBody_2 = new THREE.Mesh(
    mesh_cabBody_2Geometry,
    materialMap["paintSilver"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_cabBody_2.name = "Cab body shell (GigaSpace)";
  if (endpoint_cabBody_2) {
    mesh_cabBody_2.position.copy(endpoint_cabBody_2.midpoint);
    mesh_cabBody_2.quaternion.copy(endpoint_cabBody_2.quaternion);
  }
  mesh_cabBody_2.castShadow = options.castShadow ?? true;
  mesh_cabBody_2.receiveShadow = options.receiveShadow ?? true;
  mesh_cabBody_2.userData.sculptComponent = {"id": "cabBody", "name": "Cab body shell (GigaSpace)", "level": "macro", "role": "body", "importance": 1.0, "confidence": 0.75, "primitive": "extrude", "topologyClass": "assembled-solid", "topologyRationale": "Pressed-steel cab with large-radius vertical corner wraps; a plan-view rounded footprint extruded to cab height carries those fillets.", "geometryDescriptor": {"topologyIntent": "Cab body shell (GigaSpace)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.22, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry", "profile2D": {"points": [[-1.25, 0.24], [-1.2418, 0.1779], [-1.2178, 0.12], [-1.1797, 0.0703], [-1.13, 0.0322], [-1.0721, 0.0082], [-1.01, 0.0], [1.01, 0.0], [1.0721, 0.0082], [1.13, 0.0322], [1.1797, 0.0703], [1.2178, 0.12], [1.2418, 0.1779], [1.25, 0.24], [1.25, 2.3], [1.2466, 2.3259], [1.2366, 2.35], [1.2207, 2.3707], [1.2, 2.3866], [1.1759, 2.3966], [1.15, 2.4], [-1.15, 2.4], [-1.1759, 2.3966], [-1.2, 2.3866], [-1.2207, 2.3707], [-1.2366, 2.35], [-1.2466, 2.3259], [-1.25, 2.3]], "depth": 2.32}, "extrudeAxis": "plan footprint, extruded +Y via rotation [-pi/2, 0, 0]"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, -0.04, 1.2], "localEnd": [0, -0.04, 1.2], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.5, "height": 2.32, "depth": 2.4, "units": "relative", "confidence": 0.75}, "transform": {"position": [0, -0.04, 1.2], "rotation": [-1.5707963267948966, 0, 0], "scale": [1, 1, 1]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "doorSeam", "description": "Door panel seam and handle on both cab sides, rendered as a thin dark groove line.", "confidence": 0.6, "level": "meso", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.38, "microRoughness": 0.08, "bumpAmplitude": 0.0, "seams": "door and tilt-cab panel gaps 4 mm; below web view scale, omitted from geometry", "aoLocality": "darken the cab underside / chassis junction and the wheel-arch return", "evidence": ["front-3q-left"]}};
  node_cabBody_2.add(mesh_cabBody_2);
  meshes["cabBody"] = mesh_cabBody_2;
  colliders["cabBody"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_roofCap_3 = makeAttachmentEndpoint(null);
  const node_roofCap_3 = new THREE.Group();
  node_roofCap_3.name = "High-roof cap (GigaSpace)__pivot";
  node_roofCap_3.scale.set(1, 1, 1);
  if (endpoint_roofCap_3) {
    node_roofCap_3.position.copy(endpoint_roofCap_3.start);
    node_roofCap_3.rotation.set(0.0, 1.5707963267948966, 0.0);
  } else {
    node_roofCap_3.position.set(-1.22, -1.18, 1.2);
    node_roofCap_3.rotation.set(0.0, 1.5707963267948966, 0.0);
  }
  node_roofCap_3.userData.sculptComponent = {"id": "roofCap", "name": "High-roof cap (GigaSpace)", "level": "macro", "role": "body", "importance": 0.9, "confidence": 0.7, "primitive": "extrude", "topologyClass": "assembled-solid", "topologyRationale": "Aero high roof: side profile with a large front-top radius, extruded across the cab width.", "geometryDescriptor": {"topologyIntent": "High-roof cap (GigaSpace)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.2, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry", "profile2D": {"points": [[0.09, 3.4], [2.41, 3.4], [2.41, 3.84], [2.4059, 3.8711], [2.3939, 3.9], [2.3749, 3.9249], [2.35, 3.9439], [2.3211, 3.9559], [2.29, 3.96], [0.51, 3.96], [0.4013, 3.9457], [0.3, 3.9037], [0.213, 3.837], [0.1463, 3.75], [0.1043, 3.6487], [0.09, 3.54]], "depth": 2.44}, "extrudeAxis": "side profile (px = -z, py = y), extruded +X via rotation [0, pi/2, 0]"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [-1.22, -1.18, 1.2], "localEnd": [-1.22, -1.18, 1.2], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.44, "height": 0.56, "depth": 2.32, "units": "relative", "confidence": 0.7}, "transform": {"position": [-1.22, -1.18, 1.2], "rotation": [0, 1.5707963267948966, 0], "scale": [1, 1, 1]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "roofAntenna", "description": "Short black roof antenna plus amber roof marker lights; antenna modelled as a thin cylinder.", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.38, "microRoughness": 0.08, "bumpAmplitude": 0.0, "aoLocality": "soft occlusion where the roof cap meets the visor", "evidence": ["front-3q-left"]}};
  node_roofCap_3.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_roofCap_3);
  nodes["roofCap"] = node_roofCap_3;
  const mesh_roofCap_3Geometry = endpoint_roofCap_3
    ? new THREE.CylinderGeometry(endpoint_roofCap_3.endRadius, endpoint_roofCap_3.baseRadius, endpoint_roofCap_3.length, 16, 6)
    : buildExtrudeGeometry({"points": [[0.09, 3.4], [2.41, 3.4], [2.41, 3.84], [2.4059, 3.8711], [2.3939, 3.9], [2.3749, 3.9249], [2.35, 3.9439], [2.3211, 3.9559], [2.29, 3.96], [0.51, 3.96], [0.4013, 3.9457], [0.3, 3.9037], [0.213, 3.837], [0.1463, 3.75], [0.1043, 3.6487], [0.09, 3.54]], "depth": 2.44});
  if (!endpoint_roofCap_3) {
    mesh_roofCap_3Geometry.scale(1.0, 1.0, 1.0);
  }
  const mesh_roofCap_3 = new THREE.Mesh(
    mesh_roofCap_3Geometry,
    materialMap["paintSilver"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_roofCap_3.name = "High-roof cap (GigaSpace)";
  if (endpoint_roofCap_3) {
    mesh_roofCap_3.position.copy(endpoint_roofCap_3.midpoint);
    mesh_roofCap_3.quaternion.copy(endpoint_roofCap_3.quaternion);
  }
  mesh_roofCap_3.castShadow = options.castShadow ?? true;
  mesh_roofCap_3.receiveShadow = options.receiveShadow ?? true;
  mesh_roofCap_3.userData.sculptComponent = {"id": "roofCap", "name": "High-roof cap (GigaSpace)", "level": "macro", "role": "body", "importance": 0.9, "confidence": 0.7, "primitive": "extrude", "topologyClass": "assembled-solid", "topologyRationale": "Aero high roof: side profile with a large front-top radius, extruded across the cab width.", "geometryDescriptor": {"topologyIntent": "High-roof cap (GigaSpace)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.2, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry", "profile2D": {"points": [[0.09, 3.4], [2.41, 3.4], [2.41, 3.84], [2.4059, 3.8711], [2.3939, 3.9], [2.3749, 3.9249], [2.35, 3.9439], [2.3211, 3.9559], [2.29, 3.96], [0.51, 3.96], [0.4013, 3.9457], [0.3, 3.9037], [0.213, 3.837], [0.1463, 3.75], [0.1043, 3.6487], [0.09, 3.54]], "depth": 2.44}, "extrudeAxis": "side profile (px = -z, py = y), extruded +X via rotation [0, pi/2, 0]"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [-1.22, -1.18, 1.2], "localEnd": [-1.22, -1.18, 1.2], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.44, "height": 0.56, "depth": 2.32, "units": "relative", "confidence": 0.7}, "transform": {"position": [-1.22, -1.18, 1.2], "rotation": [0, 1.5707963267948966, 0], "scale": [1, 1, 1]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "roofAntenna", "description": "Short black roof antenna plus amber roof marker lights; antenna modelled as a thin cylinder.", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.38, "microRoughness": 0.08, "bumpAmplitude": 0.0, "aoLocality": "soft occlusion where the roof cap meets the visor", "evidence": ["front-3q-left"]}};
  node_roofCap_3.add(mesh_roofCap_3);
  meshes["roofCap"] = mesh_roofCap_3;
  colliders["roofCap"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_frontFascia_4 = makeAttachmentEndpoint(null);
  const node_frontFascia_4 = new THREE.Group();
  node_frontFascia_4.name = "Lower front fascia (grille surround + bumper carrier)__pivot";
  node_frontFascia_4.scale.set(1, 1, 1);
  if (endpoint_frontFascia_4) {
    node_frontFascia_4.position.copy(endpoint_frontFascia_4.start);
    node_frontFascia_4.rotation.set(-1.5707963267948966, 0.0, 0.0);
  } else {
    node_frontFascia_4.position.set(0.0, -0.93, 1.2);
    node_frontFascia_4.rotation.set(-1.5707963267948966, 0.0, 0.0);
  }
  node_frontFascia_4.userData.sculptComponent = {"id": "frontFascia", "name": "Lower front fascia (grille surround + bumper carrier)", "level": "macro", "role": "body", "importance": 0.85, "confidence": 0.7, "primitive": "extrude", "topologyClass": "assembled-solid", "topologyRationale": "Front fascia below the cab floor; separate box leaves the wheel arch open behind it.", "geometryDescriptor": {"topologyIntent": "Lower front fascia (grille surround + bumper carrier)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.1, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry", "profile2D": {"points": [[-1.25, 0.24], [-1.2411, 0.1727], [-1.2152, 0.11], [-1.1738, 0.0562], [-1.12, 0.0148], [-1.0573, -0.0111], [-0.99, -0.02], [0.99, -0.02], [1.0573, -0.0111], [1.12, 0.0148], [1.1738, 0.0562], [1.2152, 0.11], [1.2411, 0.1727], [1.25, 0.24], [1.25, 0.68], [-1.25, 0.68]], "depth": 1.06}, "extrudeAxis": "plan footprint, extruded +Y via rotation [-pi/2, 0, 0]"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, -0.93, 1.2], "localEnd": [0, -0.93, 1.2], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.5, "height": 1.06, "depth": 0.7, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.93, 1.2], "rotation": [-1.5707963267948966, 0, 0], "scale": [1, 1, 1]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "wheelArchFront", "description": "Open wheel arch behind the fascia and below the cab floor exposes the upper front tyre.", "confidence": 0.65, "level": "meso", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_frontFascia_4.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_frontFascia_4);
  nodes["frontFascia"] = node_frontFascia_4;
  const mesh_frontFascia_4Geometry = endpoint_frontFascia_4
    ? new THREE.CylinderGeometry(endpoint_frontFascia_4.endRadius, endpoint_frontFascia_4.baseRadius, endpoint_frontFascia_4.length, 16, 6)
    : buildExtrudeGeometry({"points": [[-1.25, 0.24], [-1.2411, 0.1727], [-1.2152, 0.11], [-1.1738, 0.0562], [-1.12, 0.0148], [-1.0573, -0.0111], [-0.99, -0.02], [0.99, -0.02], [1.0573, -0.0111], [1.12, 0.0148], [1.1738, 0.0562], [1.2152, 0.11], [1.2411, 0.1727], [1.25, 0.24], [1.25, 0.68], [-1.25, 0.68]], "depth": 1.06});
  if (!endpoint_frontFascia_4) {
    mesh_frontFascia_4Geometry.scale(1.0, 1.0, 1.0);
  }
  const mesh_frontFascia_4 = new THREE.Mesh(
    mesh_frontFascia_4Geometry,
    materialMap["paintSilver"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_frontFascia_4.name = "Lower front fascia (grille surround + bumper carrier)";
  if (endpoint_frontFascia_4) {
    mesh_frontFascia_4.position.copy(endpoint_frontFascia_4.midpoint);
    mesh_frontFascia_4.quaternion.copy(endpoint_frontFascia_4.quaternion);
  }
  mesh_frontFascia_4.castShadow = options.castShadow ?? true;
  mesh_frontFascia_4.receiveShadow = options.receiveShadow ?? true;
  mesh_frontFascia_4.userData.sculptComponent = {"id": "frontFascia", "name": "Lower front fascia (grille surround + bumper carrier)", "level": "macro", "role": "body", "importance": 0.85, "confidence": 0.7, "primitive": "extrude", "topologyClass": "assembled-solid", "topologyRationale": "Front fascia below the cab floor; separate box leaves the wheel arch open behind it.", "geometryDescriptor": {"topologyIntent": "Lower front fascia (grille surround + bumper carrier)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.1, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry", "profile2D": {"points": [[-1.25, 0.24], [-1.2411, 0.1727], [-1.2152, 0.11], [-1.1738, 0.0562], [-1.12, 0.0148], [-1.0573, -0.0111], [-0.99, -0.02], [0.99, -0.02], [1.0573, -0.0111], [1.12, 0.0148], [1.1738, 0.0562], [1.2152, 0.11], [1.2411, 0.1727], [1.25, 0.24], [1.25, 0.68], [-1.25, 0.68]], "depth": 1.06}, "extrudeAxis": "plan footprint, extruded +Y via rotation [-pi/2, 0, 0]"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, -0.93, 1.2], "localEnd": [0, -0.93, 1.2], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.5, "height": 1.06, "depth": 0.7, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.93, 1.2], "rotation": [-1.5707963267948966, 0, 0], "scale": [1, 1, 1]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "wheelArchFront", "description": "Open wheel arch behind the fascia and below the cab floor exposes the upper front tyre.", "confidence": 0.65, "level": "meso", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_frontFascia_4.add(mesh_frontFascia_4);
  meshes["frontFascia"] = mesh_frontFascia_4;
  colliders["frontFascia"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_sunVisor_5 = makeAttachmentEndpoint(null);
  const node_sunVisor_5 = new THREE.Group();
  node_sunVisor_5.name = "Black sun visor__pivot";
  node_sunVisor_5.scale.set(1, 1, 1);
  if (endpoint_sunVisor_5) {
    node_sunVisor_5.position.copy(endpoint_sunVisor_5.start);
    node_sunVisor_5.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_sunVisor_5.position.set(0.0, 2.13, 1.18);
    node_sunVisor_5.rotation.set(0.0, 0.0, 0.0);
  }
  node_sunVisor_5.userData.sculptComponent = {"id": "sunVisor", "name": "Black sun visor", "level": "meso", "role": "trim", "importance": 0.85, "confidence": 0.75, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Black sun visor", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.06, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, 2.13, 1.18], "localEnd": [0, 2.13, 1.18], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.46, "height": 0.32, "depth": 0.2, "units": "relative", "confidence": 0.75}, "transform": {"position": [0, 2.13, 1.18], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "gigaspacePlate", "description": "Silver GIGASPACE nameplate centred on the visor front (component visorPlate).", "confidence": 0.7, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "trimBlack"}, "materialRegions": [{"regionId": "visor", "materialId": "trimBlack", "profileId": "plastic.matte", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/01-visor.png", "bbox": {"x": 260, "y": 212, "width": 180, "height": 16}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0028}}]};
  node_sunVisor_5.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_sunVisor_5);
  nodes["sunVisor"] = node_sunVisor_5;
  const mesh_sunVisor_5Geometry = endpoint_sunVisor_5
    ? new THREE.CylinderGeometry(endpoint_sunVisor_5.endRadius, endpoint_sunVisor_5.baseRadius, endpoint_sunVisor_5.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_sunVisor_5) {
    mesh_sunVisor_5Geometry.scale(2.46, 0.32, 0.2);
  }
  const mesh_sunVisor_5 = new THREE.Mesh(
    mesh_sunVisor_5Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_sunVisor_5.name = "Black sun visor";
  if (endpoint_sunVisor_5) {
    mesh_sunVisor_5.position.copy(endpoint_sunVisor_5.midpoint);
    mesh_sunVisor_5.quaternion.copy(endpoint_sunVisor_5.quaternion);
  }
  mesh_sunVisor_5.castShadow = options.castShadow ?? true;
  mesh_sunVisor_5.receiveShadow = options.receiveShadow ?? true;
  mesh_sunVisor_5.userData.sculptComponent = {"id": "sunVisor", "name": "Black sun visor", "level": "meso", "role": "trim", "importance": 0.85, "confidence": 0.75, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Black sun visor", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.06, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, 2.13, 1.18], "localEnd": [0, 2.13, 1.18], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.46, "height": 0.32, "depth": 0.2, "units": "relative", "confidence": 0.75}, "transform": {"position": [0, 2.13, 1.18], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "gigaspacePlate", "description": "Silver GIGASPACE nameplate centred on the visor front (component visorPlate).", "confidence": 0.7, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "trimBlack"}, "materialRegions": [{"regionId": "visor", "materialId": "trimBlack", "profileId": "plastic.matte", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/01-visor.png", "bbox": {"x": 260, "y": 212, "width": 180, "height": 16}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0028}}]};
  node_sunVisor_5.add(mesh_sunVisor_5);
  meshes["sunVisor"] = mesh_sunVisor_5;
  colliders["sunVisor"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_windshield_6 = makeAttachmentEndpoint(null);
  const node_windshield_6 = new THREE.Group();
  node_windshield_6.name = "Windshield__pivot";
  node_windshield_6.scale.set(1, 1, 1);
  if (endpoint_windshield_6) {
    node_windshield_6.position.copy(endpoint_windshield_6.start);
    node_windshield_6.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_windshield_6.position.set(0.0, 1.48, 1.205);
    node_windshield_6.rotation.set(0.0, 0.0, 0.0);
  }
  node_windshield_6.userData.sculptComponent = {"id": "windshield", "name": "Windshield", "level": "meso", "role": "glazing", "importance": 0.85, "confidence": 0.75, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Windshield", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, 1.48, 1.205], "localEnd": [0, 1.48, 1.205], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.28, "height": 1.0, "depth": 0.04, "units": "relative", "confidence": 0.75}, "transform": {"position": [0, 1.48, 1.205], "rotation": [0, 0, 0]}, "material": "glassTint", "materialLayers": ["glassTint"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(29, 37, 44, 1.0)", "secondaryAlbedo": "rgba(43, 55, 64, 1.0)", "materialClass": "glass", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Dark blue-grey glass, reflections of sky; interior unresolved."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "wiperArms", "description": "Two black wiper arms parked on the lower windshield (component wiper, mirrored).", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.04, "microRoughness": 0.0, "bumpAmplitude": 0.0, "reflection": "environment reflection carries the glass read; no interior modelled", "evidence": ["front-3q-left"]}, "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "glassTint"}, "materialRegions": [{"regionId": "glass", "materialId": "glassTint", "profileId": "glass.clear", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/02-glass.png", "bbox": {"x": 200, "y": 300, "width": 200, "height": 70}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0137}}]};
  node_windshield_6.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_windshield_6);
  nodes["windshield"] = node_windshield_6;
  const mesh_windshield_6Geometry = endpoint_windshield_6
    ? new THREE.CylinderGeometry(endpoint_windshield_6.endRadius, endpoint_windshield_6.baseRadius, endpoint_windshield_6.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_windshield_6) {
    mesh_windshield_6Geometry.scale(2.28, 1.0, 0.04);
  }
  const mesh_windshield_6 = new THREE.Mesh(
    mesh_windshield_6Geometry,
    materialMap["glassTint"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_windshield_6.name = "Windshield";
  if (endpoint_windshield_6) {
    mesh_windshield_6.position.copy(endpoint_windshield_6.midpoint);
    mesh_windshield_6.quaternion.copy(endpoint_windshield_6.quaternion);
  }
  mesh_windshield_6.castShadow = options.castShadow ?? true;
  mesh_windshield_6.receiveShadow = options.receiveShadow ?? true;
  mesh_windshield_6.userData.sculptComponent = {"id": "windshield", "name": "Windshield", "level": "meso", "role": "glazing", "importance": 0.85, "confidence": 0.75, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Windshield", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, 1.48, 1.205], "localEnd": [0, 1.48, 1.205], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.28, "height": 1.0, "depth": 0.04, "units": "relative", "confidence": 0.75}, "transform": {"position": [0, 1.48, 1.205], "rotation": [0, 0, 0]}, "material": "glassTint", "materialLayers": ["glassTint"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(29, 37, 44, 1.0)", "secondaryAlbedo": "rgba(43, 55, 64, 1.0)", "materialClass": "glass", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Dark blue-grey glass, reflections of sky; interior unresolved."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "wiperArms", "description": "Two black wiper arms parked on the lower windshield (component wiper, mirrored).", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.04, "microRoughness": 0.0, "bumpAmplitude": 0.0, "reflection": "environment reflection carries the glass read; no interior modelled", "evidence": ["front-3q-left"]}, "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "glassTint"}, "materialRegions": [{"regionId": "glass", "materialId": "glassTint", "profileId": "glass.clear", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/02-glass.png", "bbox": {"x": 200, "y": 300, "width": 200, "height": 70}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0137}}]};
  node_windshield_6.add(mesh_windshield_6);
  meshes["windshield"] = mesh_windshield_6;
  colliders["windshield"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_wiperCowl_7 = makeAttachmentEndpoint(null);
  const node_wiperCowl_7 = new THREE.Group();
  node_wiperCowl_7.name = "Black wiper cowl below the windshield__pivot";
  node_wiperCowl_7.scale.set(1, 1, 1);
  if (endpoint_wiperCowl_7) {
    node_wiperCowl_7.position.copy(endpoint_wiperCowl_7.start);
    node_wiperCowl_7.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_wiperCowl_7.position.set(0.0, 0.9, 1.21);
    node_wiperCowl_7.rotation.set(0.0, 0.0, 0.0);
  }
  node_wiperCowl_7.userData.sculptComponent = {"id": "wiperCowl", "name": "Black wiper cowl below the windshield", "level": "meso", "role": "trim", "importance": 0.55, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Black wiper cowl below the windshield", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, 0.9, 1.21], "localEnd": [0, 0.9, 1.21], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.3, "height": 0.14, "depth": 0.05, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, 0.9, 1.21], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "cowlVents", "description": "Two dark vent slots in the cowl band, read as part of the black band at web scale.", "confidence": 0.5, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_wiperCowl_7.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_wiperCowl_7);
  nodes["wiperCowl"] = node_wiperCowl_7;
  const mesh_wiperCowl_7Geometry = endpoint_wiperCowl_7
    ? new THREE.CylinderGeometry(endpoint_wiperCowl_7.endRadius, endpoint_wiperCowl_7.baseRadius, endpoint_wiperCowl_7.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_wiperCowl_7) {
    mesh_wiperCowl_7Geometry.scale(2.3, 0.14, 0.05);
  }
  const mesh_wiperCowl_7 = new THREE.Mesh(
    mesh_wiperCowl_7Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_wiperCowl_7.name = "Black wiper cowl below the windshield";
  if (endpoint_wiperCowl_7) {
    mesh_wiperCowl_7.position.copy(endpoint_wiperCowl_7.midpoint);
    mesh_wiperCowl_7.quaternion.copy(endpoint_wiperCowl_7.quaternion);
  }
  mesh_wiperCowl_7.castShadow = options.castShadow ?? true;
  mesh_wiperCowl_7.receiveShadow = options.receiveShadow ?? true;
  mesh_wiperCowl_7.userData.sculptComponent = {"id": "wiperCowl", "name": "Black wiper cowl below the windshield", "level": "meso", "role": "trim", "importance": 0.55, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Black wiper cowl below the windshield", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, 0.9, 1.21], "localEnd": [0, 0.9, 1.21], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.3, "height": 0.14, "depth": 0.05, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, 0.9, 1.21], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "cowlVents", "description": "Two dark vent slots in the cowl band, read as part of the black band at web scale.", "confidence": 0.5, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_wiperCowl_7.add(mesh_wiperCowl_7);
  meshes["wiperCowl"] = mesh_wiperCowl_7;
  colliders["wiperCowl"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_grilleMesh_8 = makeAttachmentEndpoint(null);
  const node_grilleMesh_8 = new THREE.Group();
  node_grilleMesh_8.name = "Grille mesh panel__pivot";
  node_grilleMesh_8.scale.set(1, 1, 1);
  if (endpoint_grilleMesh_8) {
    node_grilleMesh_8.position.copy(endpoint_grilleMesh_8.start);
    node_grilleMesh_8.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_grilleMesh_8.position.set(0.0, 0.14, 1.21);
    node_grilleMesh_8.rotation.set(0.0, 0.0, 0.0);
  }
  node_grilleMesh_8.userData.sculptComponent = {"id": "grilleMesh", "name": "Grille mesh panel", "level": "meso", "role": "grille", "importance": 0.8, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Grille mesh panel", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, 0.14, 1.21], "localEnd": [0, 0.14, 1.21], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.72, "height": 0.98, "depth": 0.05, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, 0.14, 1.21], "rotation": [0, 0, 0]}, "material": "grilleMeshDark", "materialLayers": ["grilleMeshDark"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(43, 45, 49, 1.0)", "secondaryAlbedo": "rgba(53, 56, 61, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Dark grey perforated mesh between the slats."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.45, "microRoughness": 0.2, "bumpAmplitude": 0.0, "perforation": "hex perforation read as a uniform dark panel behind the slats", "evidence": ["front-3q-left"]}, "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "grilleMeshDark"}, "materialRegions": [{"regionId": "mesh", "materialId": "grilleMeshDark", "profileId": "metal.aluminum", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/03-mesh.png", "bbox": {"x": 340, "y": 700, "width": 120, "height": 20}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0023}}]};
  node_grilleMesh_8.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_grilleMesh_8);
  nodes["grilleMesh"] = node_grilleMesh_8;
  const mesh_grilleMesh_8Geometry = endpoint_grilleMesh_8
    ? new THREE.CylinderGeometry(endpoint_grilleMesh_8.endRadius, endpoint_grilleMesh_8.baseRadius, endpoint_grilleMesh_8.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_grilleMesh_8) {
    mesh_grilleMesh_8Geometry.scale(1.72, 0.98, 0.05);
  }
  const mesh_grilleMesh_8 = new THREE.Mesh(
    mesh_grilleMesh_8Geometry,
    materialMap["grilleMeshDark"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_grilleMesh_8.name = "Grille mesh panel";
  if (endpoint_grilleMesh_8) {
    mesh_grilleMesh_8.position.copy(endpoint_grilleMesh_8.midpoint);
    mesh_grilleMesh_8.quaternion.copy(endpoint_grilleMesh_8.quaternion);
  }
  mesh_grilleMesh_8.castShadow = options.castShadow ?? true;
  mesh_grilleMesh_8.receiveShadow = options.receiveShadow ?? true;
  mesh_grilleMesh_8.userData.sculptComponent = {"id": "grilleMesh", "name": "Grille mesh panel", "level": "meso", "role": "grille", "importance": 0.8, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Grille mesh panel", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, 0.14, 1.21], "localEnd": [0, 0.14, 1.21], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.72, "height": 0.98, "depth": 0.05, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, 0.14, 1.21], "rotation": [0, 0, 0]}, "material": "grilleMeshDark", "materialLayers": ["grilleMeshDark"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(43, 45, 49, 1.0)", "secondaryAlbedo": "rgba(53, 56, 61, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Dark grey perforated mesh between the slats."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.45, "microRoughness": 0.2, "bumpAmplitude": 0.0, "perforation": "hex perforation read as a uniform dark panel behind the slats", "evidence": ["front-3q-left"]}, "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "grilleMeshDark"}, "materialRegions": [{"regionId": "mesh", "materialId": "grilleMeshDark", "profileId": "metal.aluminum", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/03-mesh.png", "bbox": {"x": 340, "y": 700, "width": 120, "height": 20}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0023}}]};
  node_grilleMesh_8.add(mesh_grilleMesh_8);
  meshes["grilleMesh"] = mesh_grilleMesh_8;
  colliders["grilleMesh"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_grilleSlat_9 = makeAttachmentEndpoint(null);
  const node_grilleSlat_9 = new THREE.Group();
  node_grilleSlat_9.name = "Grille slat (repetition template)__pivot";
  node_grilleSlat_9.scale.set(1, 1, 1);
  if (endpoint_grilleSlat_9) {
    node_grilleSlat_9.position.copy(endpoint_grilleSlat_9.start);
    node_grilleSlat_9.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_grilleSlat_9.position.set(0.0, -0.44, 0.04);
    node_grilleSlat_9.rotation.set(0.0, 0.0, 0.0);
  }
  node_grilleSlat_9.userData.sculptComponent = {"id": "grilleSlat", "name": "Grille slat (repetition template)", "level": "meso", "role": "grille", "importance": 0.8, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Grille slat (repetition template)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "grilleMesh", "attachment": {"parentId": "grilleMesh", "parentSocket": "grilleMeshSurface", "localStart": [0, -0.44, 0.04], "localEnd": [0, -0.44, 0.04], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.78, "height": 0.075, "depth": 0.07, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.44, 0.04], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "slatChromeEdge", "description": "Bright highlight along each slat's upper edge from the clearcoat.", "confidence": 0.65, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_grilleSlat_9.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["grilleMesh"] ?? root).add(node_grilleSlat_9);
  nodes["grilleSlat"] = node_grilleSlat_9;
  const mesh_grilleSlat_9Geometry = endpoint_grilleSlat_9
    ? new THREE.CylinderGeometry(endpoint_grilleSlat_9.endRadius, endpoint_grilleSlat_9.baseRadius, endpoint_grilleSlat_9.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_grilleSlat_9) {
    mesh_grilleSlat_9Geometry.scale(1.78, 0.075, 0.07);
  }
  const mesh_grilleSlat_9 = new THREE.Mesh(
    mesh_grilleSlat_9Geometry,
    materialMap["paintSilver"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_grilleSlat_9.name = "Grille slat (repetition template)";
  if (endpoint_grilleSlat_9) {
    mesh_grilleSlat_9.position.copy(endpoint_grilleSlat_9.midpoint);
    mesh_grilleSlat_9.quaternion.copy(endpoint_grilleSlat_9.quaternion);
  }
  mesh_grilleSlat_9.castShadow = options.castShadow ?? true;
  mesh_grilleSlat_9.receiveShadow = options.receiveShadow ?? true;
  mesh_grilleSlat_9.userData.sculptComponent = {"id": "grilleSlat", "name": "Grille slat (repetition template)", "level": "meso", "role": "grille", "importance": 0.8, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Grille slat (repetition template)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "grilleMesh", "attachment": {"parentId": "grilleMesh", "parentSocket": "grilleMeshSurface", "localStart": [0, -0.44, 0.04], "localEnd": [0, -0.44, 0.04], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.78, "height": 0.075, "depth": 0.07, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.44, 0.04], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "slatChromeEdge", "description": "Bright highlight along each slat's upper edge from the clearcoat.", "confidence": 0.65, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_grilleSlat_9.add(mesh_grilleSlat_9);
  meshes["grilleSlat"] = mesh_grilleSlat_9;
  colliders["grilleSlat"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_grilleSlat2_10 = makeAttachmentEndpoint(null);
  const node_grilleSlat2_10 = new THREE.Group();
  node_grilleSlat2_10.name = "Grille slat 2__pivot";
  node_grilleSlat2_10.scale.set(1, 1, 1);
  if (endpoint_grilleSlat2_10) {
    node_grilleSlat2_10.position.copy(endpoint_grilleSlat2_10.start);
    node_grilleSlat2_10.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_grilleSlat2_10.position.set(0.0, -0.225, 0.04);
    node_grilleSlat2_10.rotation.set(0.0, 0.0, 0.0);
  }
  node_grilleSlat2_10.userData.sculptComponent = {"id": "grilleSlat2", "name": "Grille slat 2", "level": "meso", "role": "grille", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Grille slat 2", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "grilleMesh", "attachment": {"parentId": "grilleMesh", "parentSocket": "grilleMeshSurface", "localStart": [0, -0.225, 0.04], "localEnd": [0, -0.225, 0.04], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.74, "height": 0.075, "depth": 0.07, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.225, 0.04], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_grilleSlat2_10.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["grilleMesh"] ?? root).add(node_grilleSlat2_10);
  nodes["grilleSlat2"] = node_grilleSlat2_10;
  const mesh_grilleSlat2_10Geometry = endpoint_grilleSlat2_10
    ? new THREE.CylinderGeometry(endpoint_grilleSlat2_10.endRadius, endpoint_grilleSlat2_10.baseRadius, endpoint_grilleSlat2_10.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_grilleSlat2_10) {
    mesh_grilleSlat2_10Geometry.scale(1.74, 0.075, 0.07);
  }
  const mesh_grilleSlat2_10 = new THREE.Mesh(
    mesh_grilleSlat2_10Geometry,
    materialMap["paintSilver"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_grilleSlat2_10.name = "Grille slat 2";
  if (endpoint_grilleSlat2_10) {
    mesh_grilleSlat2_10.position.copy(endpoint_grilleSlat2_10.midpoint);
    mesh_grilleSlat2_10.quaternion.copy(endpoint_grilleSlat2_10.quaternion);
  }
  mesh_grilleSlat2_10.castShadow = options.castShadow ?? true;
  mesh_grilleSlat2_10.receiveShadow = options.receiveShadow ?? true;
  mesh_grilleSlat2_10.userData.sculptComponent = {"id": "grilleSlat2", "name": "Grille slat 2", "level": "meso", "role": "grille", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Grille slat 2", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "grilleMesh", "attachment": {"parentId": "grilleMesh", "parentSocket": "grilleMeshSurface", "localStart": [0, -0.225, 0.04], "localEnd": [0, -0.225, 0.04], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.74, "height": 0.075, "depth": 0.07, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.225, 0.04], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_grilleSlat2_10.add(mesh_grilleSlat2_10);
  meshes["grilleSlat2"] = mesh_grilleSlat2_10;
  colliders["grilleSlat2"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_grilleSlat3_11 = makeAttachmentEndpoint(null);
  const node_grilleSlat3_11 = new THREE.Group();
  node_grilleSlat3_11.name = "Grille slat 3__pivot";
  node_grilleSlat3_11.scale.set(1, 1, 1);
  if (endpoint_grilleSlat3_11) {
    node_grilleSlat3_11.position.copy(endpoint_grilleSlat3_11.start);
    node_grilleSlat3_11.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_grilleSlat3_11.position.set(0.0, -0.01, 0.04);
    node_grilleSlat3_11.rotation.set(0.0, 0.0, 0.0);
  }
  node_grilleSlat3_11.userData.sculptComponent = {"id": "grilleSlat3", "name": "Grille slat 3", "level": "meso", "role": "grille", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Grille slat 3", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "grilleMesh", "attachment": {"parentId": "grilleMesh", "parentSocket": "grilleMeshSurface", "localStart": [0, -0.01, 0.04], "localEnd": [0, -0.01, 0.04], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.7, "height": 0.075, "depth": 0.07, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.01, 0.04], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_grilleSlat3_11.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["grilleMesh"] ?? root).add(node_grilleSlat3_11);
  nodes["grilleSlat3"] = node_grilleSlat3_11;
  const mesh_grilleSlat3_11Geometry = endpoint_grilleSlat3_11
    ? new THREE.CylinderGeometry(endpoint_grilleSlat3_11.endRadius, endpoint_grilleSlat3_11.baseRadius, endpoint_grilleSlat3_11.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_grilleSlat3_11) {
    mesh_grilleSlat3_11Geometry.scale(1.7, 0.075, 0.07);
  }
  const mesh_grilleSlat3_11 = new THREE.Mesh(
    mesh_grilleSlat3_11Geometry,
    materialMap["paintSilver"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_grilleSlat3_11.name = "Grille slat 3";
  if (endpoint_grilleSlat3_11) {
    mesh_grilleSlat3_11.position.copy(endpoint_grilleSlat3_11.midpoint);
    mesh_grilleSlat3_11.quaternion.copy(endpoint_grilleSlat3_11.quaternion);
  }
  mesh_grilleSlat3_11.castShadow = options.castShadow ?? true;
  mesh_grilleSlat3_11.receiveShadow = options.receiveShadow ?? true;
  mesh_grilleSlat3_11.userData.sculptComponent = {"id": "grilleSlat3", "name": "Grille slat 3", "level": "meso", "role": "grille", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Grille slat 3", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "grilleMesh", "attachment": {"parentId": "grilleMesh", "parentSocket": "grilleMeshSurface", "localStart": [0, -0.01, 0.04], "localEnd": [0, -0.01, 0.04], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.7, "height": 0.075, "depth": 0.07, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.01, 0.04], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_grilleSlat3_11.add(mesh_grilleSlat3_11);
  meshes["grilleSlat3"] = mesh_grilleSlat3_11;
  colliders["grilleSlat3"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_grilleSlat4_12 = makeAttachmentEndpoint(null);
  const node_grilleSlat4_12 = new THREE.Group();
  node_grilleSlat4_12.name = "Grille slat 4__pivot";
  node_grilleSlat4_12.scale.set(1, 1, 1);
  if (endpoint_grilleSlat4_12) {
    node_grilleSlat4_12.position.copy(endpoint_grilleSlat4_12.start);
    node_grilleSlat4_12.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_grilleSlat4_12.position.set(0.0, 0.205, 0.04);
    node_grilleSlat4_12.rotation.set(0.0, 0.0, 0.0);
  }
  node_grilleSlat4_12.userData.sculptComponent = {"id": "grilleSlat4", "name": "Grille slat 4", "level": "meso", "role": "grille", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Grille slat 4", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "grilleMesh", "attachment": {"parentId": "grilleMesh", "parentSocket": "grilleMeshSurface", "localStart": [0, 0.205, 0.04], "localEnd": [0, 0.205, 0.04], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.6600000000000001, "height": 0.075, "depth": 0.07, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, 0.205, 0.04], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_grilleSlat4_12.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["grilleMesh"] ?? root).add(node_grilleSlat4_12);
  nodes["grilleSlat4"] = node_grilleSlat4_12;
  const mesh_grilleSlat4_12Geometry = endpoint_grilleSlat4_12
    ? new THREE.CylinderGeometry(endpoint_grilleSlat4_12.endRadius, endpoint_grilleSlat4_12.baseRadius, endpoint_grilleSlat4_12.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_grilleSlat4_12) {
    mesh_grilleSlat4_12Geometry.scale(1.6600000000000001, 0.075, 0.07);
  }
  const mesh_grilleSlat4_12 = new THREE.Mesh(
    mesh_grilleSlat4_12Geometry,
    materialMap["paintSilver"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_grilleSlat4_12.name = "Grille slat 4";
  if (endpoint_grilleSlat4_12) {
    mesh_grilleSlat4_12.position.copy(endpoint_grilleSlat4_12.midpoint);
    mesh_grilleSlat4_12.quaternion.copy(endpoint_grilleSlat4_12.quaternion);
  }
  mesh_grilleSlat4_12.castShadow = options.castShadow ?? true;
  mesh_grilleSlat4_12.receiveShadow = options.receiveShadow ?? true;
  mesh_grilleSlat4_12.userData.sculptComponent = {"id": "grilleSlat4", "name": "Grille slat 4", "level": "meso", "role": "grille", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Grille slat 4", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "grilleMesh", "attachment": {"parentId": "grilleMesh", "parentSocket": "grilleMeshSurface", "localStart": [0, 0.205, 0.04], "localEnd": [0, 0.205, 0.04], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.6600000000000001, "height": 0.075, "depth": 0.07, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, 0.205, 0.04], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_grilleSlat4_12.add(mesh_grilleSlat4_12);
  meshes["grilleSlat4"] = mesh_grilleSlat4_12;
  colliders["grilleSlat4"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_grilleSlat5_13 = makeAttachmentEndpoint(null);
  const node_grilleSlat5_13 = new THREE.Group();
  node_grilleSlat5_13.name = "Grille slat 5__pivot";
  node_grilleSlat5_13.scale.set(1, 1, 1);
  if (endpoint_grilleSlat5_13) {
    node_grilleSlat5_13.position.copy(endpoint_grilleSlat5_13.start);
    node_grilleSlat5_13.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_grilleSlat5_13.position.set(0.0, 0.42, 0.04);
    node_grilleSlat5_13.rotation.set(0.0, 0.0, 0.0);
  }
  node_grilleSlat5_13.userData.sculptComponent = {"id": "grilleSlat5", "name": "Grille slat 5", "level": "meso", "role": "grille", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Grille slat 5", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "grilleMesh", "attachment": {"parentId": "grilleMesh", "parentSocket": "grilleMeshSurface", "localStart": [0, 0.42, 0.04], "localEnd": [0, 0.42, 0.04], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.62, "height": 0.075, "depth": 0.07, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, 0.42, 0.04], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_grilleSlat5_13.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["grilleMesh"] ?? root).add(node_grilleSlat5_13);
  nodes["grilleSlat5"] = node_grilleSlat5_13;
  const mesh_grilleSlat5_13Geometry = endpoint_grilleSlat5_13
    ? new THREE.CylinderGeometry(endpoint_grilleSlat5_13.endRadius, endpoint_grilleSlat5_13.baseRadius, endpoint_grilleSlat5_13.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_grilleSlat5_13) {
    mesh_grilleSlat5_13Geometry.scale(1.62, 0.075, 0.07);
  }
  const mesh_grilleSlat5_13 = new THREE.Mesh(
    mesh_grilleSlat5_13Geometry,
    materialMap["paintSilver"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_grilleSlat5_13.name = "Grille slat 5";
  if (endpoint_grilleSlat5_13) {
    mesh_grilleSlat5_13.position.copy(endpoint_grilleSlat5_13.midpoint);
    mesh_grilleSlat5_13.quaternion.copy(endpoint_grilleSlat5_13.quaternion);
  }
  mesh_grilleSlat5_13.castShadow = options.castShadow ?? true;
  mesh_grilleSlat5_13.receiveShadow = options.receiveShadow ?? true;
  mesh_grilleSlat5_13.userData.sculptComponent = {"id": "grilleSlat5", "name": "Grille slat 5", "level": "meso", "role": "grille", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Grille slat 5", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "grilleMesh", "attachment": {"parentId": "grilleMesh", "parentSocket": "grilleMeshSurface", "localStart": [0, 0.42, 0.04], "localEnd": [0, 0.42, 0.04], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.62, "height": 0.075, "depth": 0.07, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, 0.42, 0.04], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_grilleSlat5_13.add(mesh_grilleSlat5_13);
  meshes["grilleSlat5"] = mesh_grilleSlat5_13;
  colliders["grilleSlat5"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_starRing_14 = makeAttachmentEndpoint(null);
  const node_starRing_14 = new THREE.Group();
  node_starRing_14.name = "Star emblem ring__pivot";
  node_starRing_14.scale.set(1, 1, 1);
  if (endpoint_starRing_14) {
    node_starRing_14.position.copy(endpoint_starRing_14.start);
    node_starRing_14.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_starRing_14.position.set(0.0, 0.31, 0.08);
    node_starRing_14.rotation.set(0.0, 0.0, 0.0);
  }
  node_starRing_14.userData.sculptComponent = {"id": "starRing", "name": "Star emblem ring", "level": "meso", "role": "emblem", "importance": 0.85, "confidence": 0.8, "primitive": "torus", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Star emblem ring", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry", "torusTubeRatio": 0.09}, "parent": "grilleMesh", "attachment": {"parentId": "grilleMesh", "parentSocket": "grilleMeshSurface", "localStart": [0, 0.31, 0.08], "localEnd": [0, 0.31, 0.08], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.44, "height": 0.44, "depth": 0.06, "units": "relative", "confidence": 0.8}, "transform": {"position": [0, 0.31, 0.08], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "starRingBevel", "description": "Round chrome ring enclosing the three-pointed star.", "confidence": 0.8, "level": "meso", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "chromeBright"}, "materialRegions": [{"regionId": "chrome", "materialId": "chromeBright", "profileId": "metal.steel-polished", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/07-chrome.png", "bbox": {"x": 236, "y": 600, "width": 20, "height": 40}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0008}}]};
  node_starRing_14.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["grilleMesh"] ?? root).add(node_starRing_14);
  nodes["starRing"] = node_starRing_14;
  const mesh_starRing_14Geometry = endpoint_starRing_14
    ? new THREE.CylinderGeometry(endpoint_starRing_14.endRadius, endpoint_starRing_14.baseRadius, endpoint_starRing_14.length, 16, 6)
    : new THREE.TorusGeometry(0.45, 0.0405, 12, 48);
  if (!endpoint_starRing_14) {
    mesh_starRing_14Geometry.scale(0.44, 0.44, 0.06);
  }
  const mesh_starRing_14 = new THREE.Mesh(
    mesh_starRing_14Geometry,
    materialMap["chromeBright"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_starRing_14.name = "Star emblem ring";
  if (endpoint_starRing_14) {
    mesh_starRing_14.position.copy(endpoint_starRing_14.midpoint);
    mesh_starRing_14.quaternion.copy(endpoint_starRing_14.quaternion);
  }
  mesh_starRing_14.castShadow = options.castShadow ?? true;
  mesh_starRing_14.receiveShadow = options.receiveShadow ?? true;
  mesh_starRing_14.userData.sculptComponent = {"id": "starRing", "name": "Star emblem ring", "level": "meso", "role": "emblem", "importance": 0.85, "confidence": 0.8, "primitive": "torus", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Star emblem ring", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry", "torusTubeRatio": 0.09}, "parent": "grilleMesh", "attachment": {"parentId": "grilleMesh", "parentSocket": "grilleMeshSurface", "localStart": [0, 0.31, 0.08], "localEnd": [0, 0.31, 0.08], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.44, "height": 0.44, "depth": 0.06, "units": "relative", "confidence": 0.8}, "transform": {"position": [0, 0.31, 0.08], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "starRingBevel", "description": "Round chrome ring enclosing the three-pointed star.", "confidence": 0.8, "level": "meso", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "chromeBright"}, "materialRegions": [{"regionId": "chrome", "materialId": "chromeBright", "profileId": "metal.steel-polished", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/07-chrome.png", "bbox": {"x": 236, "y": 600, "width": 20, "height": 40}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0008}}]};
  node_starRing_14.add(mesh_starRing_14);
  meshes["starRing"] = mesh_starRing_14;
  colliders["starRing"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_starSpoke_15 = makeAttachmentEndpoint(null);
  const node_starSpoke_15 = new THREE.Group();
  node_starSpoke_15.name = "Star spoke 1__pivot";
  node_starSpoke_15.scale.set(1, 1, 1);
  if (endpoint_starSpoke_15) {
    node_starSpoke_15.position.copy(endpoint_starSpoke_15.start);
    node_starSpoke_15.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_starSpoke_15.position.set(0.0, 0.095, 0.0);
    node_starSpoke_15.rotation.set(0.0, 0.0, 0.0);
  }
  node_starSpoke_15.userData.sculptComponent = {"id": "starSpoke", "name": "Star spoke 1", "level": "micro", "role": "emblem", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Star spoke 1", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "starRing", "attachment": {"parentId": "starRing", "parentSocket": "starRingSurface", "localStart": [0.0, 0.095, 0.0], "localEnd": [0.0, 0.095, 0.0], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.045, "height": 0.19, "depth": 0.03, "units": "relative", "confidence": 0.7}, "transform": {"position": [0.0, 0.095, 0.0], "rotation": [0, 0, 0.0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_starSpoke_15.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["starRing"] ?? root).add(node_starSpoke_15);
  nodes["starSpoke"] = node_starSpoke_15;
  const mesh_starSpoke_15Geometry = endpoint_starSpoke_15
    ? new THREE.CylinderGeometry(endpoint_starSpoke_15.endRadius, endpoint_starSpoke_15.baseRadius, endpoint_starSpoke_15.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_starSpoke_15) {
    mesh_starSpoke_15Geometry.scale(0.045, 0.19, 0.03);
  }
  const mesh_starSpoke_15 = new THREE.Mesh(
    mesh_starSpoke_15Geometry,
    materialMap["chromeBright"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_starSpoke_15.name = "Star spoke 1";
  if (endpoint_starSpoke_15) {
    mesh_starSpoke_15.position.copy(endpoint_starSpoke_15.midpoint);
    mesh_starSpoke_15.quaternion.copy(endpoint_starSpoke_15.quaternion);
  }
  mesh_starSpoke_15.castShadow = options.castShadow ?? true;
  mesh_starSpoke_15.receiveShadow = options.receiveShadow ?? true;
  mesh_starSpoke_15.userData.sculptComponent = {"id": "starSpoke", "name": "Star spoke 1", "level": "micro", "role": "emblem", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Star spoke 1", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "starRing", "attachment": {"parentId": "starRing", "parentSocket": "starRingSurface", "localStart": [0.0, 0.095, 0.0], "localEnd": [0.0, 0.095, 0.0], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.045, "height": 0.19, "depth": 0.03, "units": "relative", "confidence": 0.7}, "transform": {"position": [0.0, 0.095, 0.0], "rotation": [0, 0, 0.0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_starSpoke_15.add(mesh_starSpoke_15);
  meshes["starSpoke"] = mesh_starSpoke_15;
  colliders["starSpoke"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_starSpoke2_16 = makeAttachmentEndpoint(null);
  const node_starSpoke2_16 = new THREE.Group();
  node_starSpoke2_16.name = "Star spoke 2__pivot";
  node_starSpoke2_16.scale.set(1, 1, 1);
  if (endpoint_starSpoke2_16) {
    node_starSpoke2_16.position.copy(endpoint_starSpoke2_16.start);
    node_starSpoke2_16.rotation.set(0.0, 0.0, 2.0944);
  } else {
    node_starSpoke2_16.position.set(-0.0823, -0.0475, 0.0);
    node_starSpoke2_16.rotation.set(0.0, 0.0, 2.0944);
  }
  node_starSpoke2_16.userData.sculptComponent = {"id": "starSpoke2", "name": "Star spoke 2", "level": "micro", "role": "emblem", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Star spoke 2", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "starRing", "attachment": {"parentId": "starRing", "parentSocket": "starRingSurface", "localStart": [-0.0823, -0.0475, 0.0], "localEnd": [-0.0823, -0.0475, 0.0], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.045, "height": 0.19, "depth": 0.03, "units": "relative", "confidence": 0.7}, "transform": {"position": [-0.0823, -0.0475, 0.0], "rotation": [0, 0, 2.0944]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_starSpoke2_16.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["starRing"] ?? root).add(node_starSpoke2_16);
  nodes["starSpoke2"] = node_starSpoke2_16;
  const mesh_starSpoke2_16Geometry = endpoint_starSpoke2_16
    ? new THREE.CylinderGeometry(endpoint_starSpoke2_16.endRadius, endpoint_starSpoke2_16.baseRadius, endpoint_starSpoke2_16.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_starSpoke2_16) {
    mesh_starSpoke2_16Geometry.scale(0.045, 0.19, 0.03);
  }
  const mesh_starSpoke2_16 = new THREE.Mesh(
    mesh_starSpoke2_16Geometry,
    materialMap["chromeBright"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_starSpoke2_16.name = "Star spoke 2";
  if (endpoint_starSpoke2_16) {
    mesh_starSpoke2_16.position.copy(endpoint_starSpoke2_16.midpoint);
    mesh_starSpoke2_16.quaternion.copy(endpoint_starSpoke2_16.quaternion);
  }
  mesh_starSpoke2_16.castShadow = options.castShadow ?? true;
  mesh_starSpoke2_16.receiveShadow = options.receiveShadow ?? true;
  mesh_starSpoke2_16.userData.sculptComponent = {"id": "starSpoke2", "name": "Star spoke 2", "level": "micro", "role": "emblem", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Star spoke 2", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "starRing", "attachment": {"parentId": "starRing", "parentSocket": "starRingSurface", "localStart": [-0.0823, -0.0475, 0.0], "localEnd": [-0.0823, -0.0475, 0.0], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.045, "height": 0.19, "depth": 0.03, "units": "relative", "confidence": 0.7}, "transform": {"position": [-0.0823, -0.0475, 0.0], "rotation": [0, 0, 2.0944]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_starSpoke2_16.add(mesh_starSpoke2_16);
  meshes["starSpoke2"] = mesh_starSpoke2_16;
  colliders["starSpoke2"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_starSpoke3_17 = makeAttachmentEndpoint(null);
  const node_starSpoke3_17 = new THREE.Group();
  node_starSpoke3_17.name = "Star spoke 3__pivot";
  node_starSpoke3_17.scale.set(1, 1, 1);
  if (endpoint_starSpoke3_17) {
    node_starSpoke3_17.position.copy(endpoint_starSpoke3_17.start);
    node_starSpoke3_17.rotation.set(0.0, 0.0, 4.1888);
  } else {
    node_starSpoke3_17.position.set(0.0823, -0.0475, 0.0);
    node_starSpoke3_17.rotation.set(0.0, 0.0, 4.1888);
  }
  node_starSpoke3_17.userData.sculptComponent = {"id": "starSpoke3", "name": "Star spoke 3", "level": "micro", "role": "emblem", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Star spoke 3", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "starRing", "attachment": {"parentId": "starRing", "parentSocket": "starRingSurface", "localStart": [0.0823, -0.0475, 0.0], "localEnd": [0.0823, -0.0475, 0.0], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.045, "height": 0.19, "depth": 0.03, "units": "relative", "confidence": 0.7}, "transform": {"position": [0.0823, -0.0475, 0.0], "rotation": [0, 0, 4.1888]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_starSpoke3_17.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["starRing"] ?? root).add(node_starSpoke3_17);
  nodes["starSpoke3"] = node_starSpoke3_17;
  const mesh_starSpoke3_17Geometry = endpoint_starSpoke3_17
    ? new THREE.CylinderGeometry(endpoint_starSpoke3_17.endRadius, endpoint_starSpoke3_17.baseRadius, endpoint_starSpoke3_17.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_starSpoke3_17) {
    mesh_starSpoke3_17Geometry.scale(0.045, 0.19, 0.03);
  }
  const mesh_starSpoke3_17 = new THREE.Mesh(
    mesh_starSpoke3_17Geometry,
    materialMap["chromeBright"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_starSpoke3_17.name = "Star spoke 3";
  if (endpoint_starSpoke3_17) {
    mesh_starSpoke3_17.position.copy(endpoint_starSpoke3_17.midpoint);
    mesh_starSpoke3_17.quaternion.copy(endpoint_starSpoke3_17.quaternion);
  }
  mesh_starSpoke3_17.castShadow = options.castShadow ?? true;
  mesh_starSpoke3_17.receiveShadow = options.receiveShadow ?? true;
  mesh_starSpoke3_17.userData.sculptComponent = {"id": "starSpoke3", "name": "Star spoke 3", "level": "micro", "role": "emblem", "importance": 0.7, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Star spoke 3", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "starRing", "attachment": {"parentId": "starRing", "parentSocket": "starRingSurface", "localStart": [0.0823, -0.0475, 0.0], "localEnd": [0.0823, -0.0475, 0.0], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.045, "height": 0.19, "depth": 0.03, "units": "relative", "confidence": 0.7}, "transform": {"position": [0.0823, -0.0475, 0.0], "rotation": [0, 0, 4.1888]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_starSpoke3_17.add(mesh_starSpoke3_17);
  meshes["starSpoke3"] = mesh_starSpoke3_17;
  colliders["starSpoke3"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_headlight_18 = makeAttachmentEndpoint(null);
  const node_headlight_18 = new THREE.Group();
  node_headlight_18.name = "Headlight cluster (left)__pivot";
  node_headlight_18.scale.set(1, 1, 1);
  if (endpoint_headlight_18) {
    node_headlight_18.position.copy(endpoint_headlight_18.start);
    node_headlight_18.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_headlight_18.position.set(0.98, -0.28, 1.23);
    node_headlight_18.rotation.set(0.0, 0.0, 0.0);
  }
  node_headlight_18.userData.sculptComponent = {"id": "headlight", "name": "Headlight cluster (left)", "level": "meso", "role": "lamp", "importance": 0.75, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Headlight cluster (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0.98, -0.28, 1.23], "localEnd": [0.98, -0.28, 1.23], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.42, "height": 0.24, "depth": 0.08, "units": "relative", "confidence": 0.7}, "transform": {"position": [0.98, -0.28, 1.23], "rotation": [0, 0, 0]}, "material": "lampLens", "materialLayers": ["lampLens"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(233, 238, 242, 1.0)", "secondaryAlbedo": "rgba(255, 255, 255, 1.0)", "materialClass": "glass", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Clear lens over chrome reflector; white daytime running light strip."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "drlStrip", "description": "White DRL strip along the lower lens edge (lampLens emissive override).", "confidence": 0.6, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "lampLens"}, "materialRegions": [{"regionId": "lens", "materialId": "lampLens", "profileId": "glass.clear", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/05-lens.png", "bbox": {"x": 520, "y": 822, "width": 55, "height": 35}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0019}}]};
  node_headlight_18.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_headlight_18);
  nodes["headlight"] = node_headlight_18;
  const mesh_headlight_18Geometry = endpoint_headlight_18
    ? new THREE.CylinderGeometry(endpoint_headlight_18.endRadius, endpoint_headlight_18.baseRadius, endpoint_headlight_18.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_headlight_18) {
    mesh_headlight_18Geometry.scale(0.42, 0.24, 0.08);
  }
  const mesh_headlight_18 = new THREE.Mesh(
    mesh_headlight_18Geometry,
    materialMap["lampLens"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_headlight_18.name = "Headlight cluster (left)";
  if (endpoint_headlight_18) {
    mesh_headlight_18.position.copy(endpoint_headlight_18.midpoint);
    mesh_headlight_18.quaternion.copy(endpoint_headlight_18.quaternion);
  }
  mesh_headlight_18.castShadow = options.castShadow ?? true;
  mesh_headlight_18.receiveShadow = options.receiveShadow ?? true;
  mesh_headlight_18.userData.sculptComponent = {"id": "headlight", "name": "Headlight cluster (left)", "level": "meso", "role": "lamp", "importance": 0.75, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Headlight cluster (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0.98, -0.28, 1.23], "localEnd": [0.98, -0.28, 1.23], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.42, "height": 0.24, "depth": 0.08, "units": "relative", "confidence": 0.7}, "transform": {"position": [0.98, -0.28, 1.23], "rotation": [0, 0, 0]}, "material": "lampLens", "materialLayers": ["lampLens"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(233, 238, 242, 1.0)", "secondaryAlbedo": "rgba(255, 255, 255, 1.0)", "materialClass": "glass", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Clear lens over chrome reflector; white daytime running light strip."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "drlStrip", "description": "White DRL strip along the lower lens edge (lampLens emissive override).", "confidence": 0.6, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "lampLens"}, "materialRegions": [{"regionId": "lens", "materialId": "lampLens", "profileId": "glass.clear", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/05-lens.png", "bbox": {"x": 520, "y": 822, "width": 55, "height": 35}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0019}}]};
  node_headlight_18.add(mesh_headlight_18);
  meshes["headlight"] = mesh_headlight_18;
  colliders["headlight"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_headlightDrl_19 = makeAttachmentEndpoint(null);
  const node_headlightDrl_19 = new THREE.Group();
  node_headlightDrl_19.name = "Headlight LED / chrome reflector strip (left)__pivot";
  node_headlightDrl_19.scale.set(1, 1, 1);
  if (endpoint_headlightDrl_19) {
    node_headlightDrl_19.position.copy(endpoint_headlightDrl_19.start);
    node_headlightDrl_19.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_headlightDrl_19.position.set(0.0, -0.06, 0.045);
    node_headlightDrl_19.rotation.set(0.0, 0.0, 0.0);
  }
  node_headlightDrl_19.userData.sculptComponent = {"id": "headlightDrl", "name": "Headlight LED / chrome reflector strip (left)", "level": "micro", "role": "lamp", "importance": 0.5, "confidence": 0.6, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Headlight LED / chrome reflector strip (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "headlight", "attachment": {"parentId": "headlight", "parentSocket": "headlightSurface", "localStart": [0.0, -0.06, 0.045], "localEnd": [0.0, -0.06, 0.045], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.36, "height": 0.04, "depth": 0.02, "units": "relative", "confidence": 0.6}, "transform": {"position": [0.0, -0.06, 0.045], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "drlLine", "description": "Bright LED daytime-running line along the lower lens edge.", "confidence": 0.6, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_headlightDrl_19.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["headlight"] ?? root).add(node_headlightDrl_19);
  nodes["headlightDrl"] = node_headlightDrl_19;
  const mesh_headlightDrl_19Geometry = endpoint_headlightDrl_19
    ? new THREE.CylinderGeometry(endpoint_headlightDrl_19.endRadius, endpoint_headlightDrl_19.baseRadius, endpoint_headlightDrl_19.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_headlightDrl_19) {
    mesh_headlightDrl_19Geometry.scale(0.36, 0.04, 0.02);
  }
  const mesh_headlightDrl_19 = new THREE.Mesh(
    mesh_headlightDrl_19Geometry,
    materialMap["chromeBright"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_headlightDrl_19.name = "Headlight LED / chrome reflector strip (left)";
  if (endpoint_headlightDrl_19) {
    mesh_headlightDrl_19.position.copy(endpoint_headlightDrl_19.midpoint);
    mesh_headlightDrl_19.quaternion.copy(endpoint_headlightDrl_19.quaternion);
  }
  mesh_headlightDrl_19.castShadow = options.castShadow ?? true;
  mesh_headlightDrl_19.receiveShadow = options.receiveShadow ?? true;
  mesh_headlightDrl_19.userData.sculptComponent = {"id": "headlightDrl", "name": "Headlight LED / chrome reflector strip (left)", "level": "micro", "role": "lamp", "importance": 0.5, "confidence": 0.6, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Headlight LED / chrome reflector strip (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "headlight", "attachment": {"parentId": "headlight", "parentSocket": "headlightSurface", "localStart": [0.0, -0.06, 0.045], "localEnd": [0.0, -0.06, 0.045], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.36, "height": 0.04, "depth": 0.02, "units": "relative", "confidence": 0.6}, "transform": {"position": [0.0, -0.06, 0.045], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "drlLine", "description": "Bright LED daytime-running line along the lower lens edge.", "confidence": 0.6, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_headlightDrl_19.add(mesh_headlightDrl_19);
  meshes["headlightDrl"] = mesh_headlightDrl_19;
  colliders["headlightDrl"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_bumperUpper_20 = makeAttachmentEndpoint(null);
  const node_bumperUpper_20 = new THREE.Group();
  node_bumperUpper_20.name = "Bumper frame (body colour)__pivot";
  node_bumperUpper_20.scale.set(1, 1, 1);
  if (endpoint_bumperUpper_20) {
    node_bumperUpper_20.position.copy(endpoint_bumperUpper_20.start);
    node_bumperUpper_20.rotation.set(-1.5707963267948966, 0.0, 0.0);
  } else {
    node_bumperUpper_20.position.set(0.0, -0.96, 1.2);
    node_bumperUpper_20.rotation.set(-1.5707963267948966, 0.0, 0.0);
  }
  node_bumperUpper_20.userData.sculptComponent = {"id": "bumperUpper", "name": "Bumper frame (body colour)", "level": "meso", "role": "bumper", "importance": 0.8, "confidence": 0.7, "primitive": "extrude", "topologyClass": "assembled-solid", "topologyRationale": "Wrap-around bumper: plan footprint with large front corner radii so the corners return into the wheel arch.", "geometryDescriptor": {"topologyIntent": "Bumper frame (body colour)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.07, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry", "profile2D": {"points": [[-1.25, 0.15], [-1.2391, 0.0672], [-1.2071, -0.01], [-1.1563, -0.0763], [-1.09, -0.1271], [-1.0128, -0.1591], [-0.93, -0.17], [0.93, -0.17], [1.0128, -0.1591], [1.09, -0.1271], [1.1563, -0.0763], [1.2071, -0.01], [1.2391, 0.0672], [1.25, 0.15], [1.25, 0.33], [-1.25, 0.33]], "depth": 0.56}, "extrudeAxis": "plan footprint, extruded +Y via rotation [-pi/2, 0, 0]"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, -0.96, 1.2], "localEnd": [0, -0.96, 1.2], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.5, "height": 0.56, "depth": 0.5, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.96, 1.2], "rotation": [-1.5707963267948966, 0, 0], "scale": [1, 1, 1]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_bumperUpper_20.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_bumperUpper_20);
  nodes["bumperUpper"] = node_bumperUpper_20;
  const mesh_bumperUpper_20Geometry = endpoint_bumperUpper_20
    ? new THREE.CylinderGeometry(endpoint_bumperUpper_20.endRadius, endpoint_bumperUpper_20.baseRadius, endpoint_bumperUpper_20.length, 16, 6)
    : buildExtrudeGeometry({"points": [[-1.25, 0.15], [-1.2391, 0.0672], [-1.2071, -0.01], [-1.1563, -0.0763], [-1.09, -0.1271], [-1.0128, -0.1591], [-0.93, -0.17], [0.93, -0.17], [1.0128, -0.1591], [1.09, -0.1271], [1.1563, -0.0763], [1.2071, -0.01], [1.2391, 0.0672], [1.25, 0.15], [1.25, 0.33], [-1.25, 0.33]], "depth": 0.56});
  if (!endpoint_bumperUpper_20) {
    mesh_bumperUpper_20Geometry.scale(1.0, 1.0, 1.0);
  }
  const mesh_bumperUpper_20 = new THREE.Mesh(
    mesh_bumperUpper_20Geometry,
    materialMap["paintSilver"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_bumperUpper_20.name = "Bumper frame (body colour)";
  if (endpoint_bumperUpper_20) {
    mesh_bumperUpper_20.position.copy(endpoint_bumperUpper_20.midpoint);
    mesh_bumperUpper_20.quaternion.copy(endpoint_bumperUpper_20.quaternion);
  }
  mesh_bumperUpper_20.castShadow = options.castShadow ?? true;
  mesh_bumperUpper_20.receiveShadow = options.receiveShadow ?? true;
  mesh_bumperUpper_20.userData.sculptComponent = {"id": "bumperUpper", "name": "Bumper frame (body colour)", "level": "meso", "role": "bumper", "importance": 0.8, "confidence": 0.7, "primitive": "extrude", "topologyClass": "assembled-solid", "topologyRationale": "Wrap-around bumper: plan footprint with large front corner radii so the corners return into the wheel arch.", "geometryDescriptor": {"topologyIntent": "Bumper frame (body colour)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.07, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry", "profile2D": {"points": [[-1.25, 0.15], [-1.2391, 0.0672], [-1.2071, -0.01], [-1.1563, -0.0763], [-1.09, -0.1271], [-1.0128, -0.1591], [-0.93, -0.17], [0.93, -0.17], [1.0128, -0.1591], [1.09, -0.1271], [1.1563, -0.0763], [1.2071, -0.01], [1.2391, 0.0672], [1.25, 0.15], [1.25, 0.33], [-1.25, 0.33]], "depth": 0.56}, "extrudeAxis": "plan footprint, extruded +Y via rotation [-pi/2, 0, 0]"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, -0.96, 1.2], "localEnd": [0, -0.96, 1.2], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 2.5, "height": 0.56, "depth": 0.5, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.96, 1.2], "rotation": [-1.5707963267948966, 0, 0], "scale": [1, 1, 1]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_bumperUpper_20.add(mesh_bumperUpper_20);
  meshes["bumperUpper"] = mesh_bumperUpper_20;
  colliders["bumperUpper"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_bumperLower_21 = makeAttachmentEndpoint(null);
  const node_bumperLower_21 = new THREE.Group();
  node_bumperLower_21.name = "Bumper air intake (black)__pivot";
  node_bumperLower_21.scale.set(1, 1, 1);
  if (endpoint_bumperLower_21) {
    node_bumperLower_21.position.copy(endpoint_bumperLower_21.start);
    node_bumperLower_21.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_bumperLower_21.position.set(0.0, -0.73, 1.22);
    node_bumperLower_21.rotation.set(0.0, 0.0, 0.0);
  }
  node_bumperLower_21.userData.sculptComponent = {"id": "bumperLower", "name": "Bumper air intake (black)", "level": "meso", "role": "bumper", "importance": 0.75, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Bumper air intake (black)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.04, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, -0.73, 1.22], "localEnd": [0, -0.73, 1.22], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.85, "height": 0.3, "depth": 0.42, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.73, 1.22], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "plateRecess", "description": "White EU number plate centred in the lower bumper (component numberPlate).", "confidence": 0.7, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.62, "microRoughness": 0.25, "bumpAmplitude": 0.0, "aoLocality": "intake recess darker than the surrounding frame", "evidence": ["front-3q-left"]}};
  node_bumperLower_21.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_bumperLower_21);
  nodes["bumperLower"] = node_bumperLower_21;
  const mesh_bumperLower_21Geometry = endpoint_bumperLower_21
    ? new THREE.CylinderGeometry(endpoint_bumperLower_21.endRadius, endpoint_bumperLower_21.baseRadius, endpoint_bumperLower_21.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_bumperLower_21) {
    mesh_bumperLower_21Geometry.scale(1.85, 0.3, 0.42);
  }
  const mesh_bumperLower_21 = new THREE.Mesh(
    mesh_bumperLower_21Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_bumperLower_21.name = "Bumper air intake (black)";
  if (endpoint_bumperLower_21) {
    mesh_bumperLower_21.position.copy(endpoint_bumperLower_21.midpoint);
    mesh_bumperLower_21.quaternion.copy(endpoint_bumperLower_21.quaternion);
  }
  mesh_bumperLower_21.castShadow = options.castShadow ?? true;
  mesh_bumperLower_21.receiveShadow = options.receiveShadow ?? true;
  mesh_bumperLower_21.userData.sculptComponent = {"id": "bumperLower", "name": "Bumper air intake (black)", "level": "meso", "role": "bumper", "importance": 0.75, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Bumper air intake (black)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.04, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [0, -0.73, 1.22], "localEnd": [0, -0.73, 1.22], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.85, "height": 0.3, "depth": 0.42, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.73, 1.22], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "plateRecess", "description": "White EU number plate centred in the lower bumper (component numberPlate).", "confidence": 0.7, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.62, "microRoughness": 0.25, "bumpAmplitude": 0.0, "aoLocality": "intake recess darker than the surrounding frame", "evidence": ["front-3q-left"]}};
  node_bumperLower_21.add(mesh_bumperLower_21);
  meshes["bumperLower"] = mesh_bumperLower_21;
  colliders["bumperLower"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_sideWindow_22 = makeAttachmentEndpoint(null);
  const node_sideWindow_22 = new THREE.Group();
  node_sideWindow_22.name = "Door window (left)__pivot";
  node_sideWindow_22.scale.set(1, 1, 1);
  if (endpoint_sideWindow_22) {
    node_sideWindow_22.position.copy(endpoint_sideWindow_22.start);
    node_sideWindow_22.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_sideWindow_22.position.set(1.255, 1.54, 0.48);
    node_sideWindow_22.rotation.set(0.0, 0.0, 0.0);
  }
  node_sideWindow_22.userData.sculptComponent = {"id": "sideWindow", "name": "Door window (left)", "level": "meso", "role": "glazing", "importance": 0.6, "confidence": 0.65, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Door window (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [1.255, 1.54, 0.48], "localEnd": [1.255, 1.54, 0.48], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.03, "height": 0.8, "depth": 0.95, "units": "relative", "confidence": 0.65}, "transform": {"position": [1.255, 1.54, 0.48], "rotation": [0, 0, 0]}, "material": "glassTint", "materialLayers": ["glassTint"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(29, 37, 44, 1.0)", "secondaryAlbedo": "rgba(43, 55, 64, 1.0)", "materialClass": "glass", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Dark blue-grey glass, reflections of sky; interior unresolved."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_sideWindow_22.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_sideWindow_22);
  nodes["sideWindow"] = node_sideWindow_22;
  const mesh_sideWindow_22Geometry = endpoint_sideWindow_22
    ? new THREE.CylinderGeometry(endpoint_sideWindow_22.endRadius, endpoint_sideWindow_22.baseRadius, endpoint_sideWindow_22.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_sideWindow_22) {
    mesh_sideWindow_22Geometry.scale(0.03, 0.8, 0.95);
  }
  const mesh_sideWindow_22 = new THREE.Mesh(
    mesh_sideWindow_22Geometry,
    materialMap["glassTint"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_sideWindow_22.name = "Door window (left)";
  if (endpoint_sideWindow_22) {
    mesh_sideWindow_22.position.copy(endpoint_sideWindow_22.midpoint);
    mesh_sideWindow_22.quaternion.copy(endpoint_sideWindow_22.quaternion);
  }
  mesh_sideWindow_22.castShadow = options.castShadow ?? true;
  mesh_sideWindow_22.receiveShadow = options.receiveShadow ?? true;
  mesh_sideWindow_22.userData.sculptComponent = {"id": "sideWindow", "name": "Door window (left)", "level": "meso", "role": "glazing", "importance": 0.6, "confidence": 0.65, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Door window (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [1.255, 1.54, 0.48], "localEnd": [1.255, 1.54, 0.48], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.03, "height": 0.8, "depth": 0.95, "units": "relative", "confidence": 0.65}, "transform": {"position": [1.255, 1.54, 0.48], "rotation": [0, 0, 0]}, "material": "glassTint", "materialLayers": ["glassTint"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(29, 37, 44, 1.0)", "secondaryAlbedo": "rgba(43, 55, 64, 1.0)", "materialClass": "glass", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Dark blue-grey glass, reflections of sky; interior unresolved."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_sideWindow_22.add(mesh_sideWindow_22);
  meshes["sideWindow"] = mesh_sideWindow_22;
  colliders["sideWindow"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_mirrorHead_23 = makeAttachmentEndpoint(null);
  const node_mirrorHead_23 = new THREE.Group();
  node_mirrorHead_23.name = "MirrorCam camera head (left)__pivot";
  node_mirrorHead_23.scale.set(1, 1, 1);
  if (endpoint_mirrorHead_23) {
    node_mirrorHead_23.position.copy(endpoint_mirrorHead_23.start);
    node_mirrorHead_23.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_mirrorHead_23.position.set(1.4, 1.99, 1.15);
    node_mirrorHead_23.rotation.set(0.0, 0.0, 0.0);
  }
  node_mirrorHead_23.userData.sculptComponent = {"id": "mirrorHead", "name": "MirrorCam camera head (left)", "level": "meso", "role": "mirror", "importance": 0.65, "confidence": 0.6, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "MirrorCam camera head (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [1.4, 1.99, 1.15], "localEnd": [1.4, 1.99, 1.15], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.16, "height": 0.1, "depth": 0.14, "units": "relative", "confidence": 0.6}, "transform": {"position": [1.4, 1.99, 1.15], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "mirrorArm", "description": "Camera head carried on a short arm from the roof edge above the door (component mirrorArm).", "confidence": 0.6, "level": "meso", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_mirrorHead_23.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_mirrorHead_23);
  nodes["mirrorHead"] = node_mirrorHead_23;
  const mesh_mirrorHead_23Geometry = endpoint_mirrorHead_23
    ? new THREE.CylinderGeometry(endpoint_mirrorHead_23.endRadius, endpoint_mirrorHead_23.baseRadius, endpoint_mirrorHead_23.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_mirrorHead_23) {
    mesh_mirrorHead_23Geometry.scale(0.16, 0.1, 0.14);
  }
  const mesh_mirrorHead_23 = new THREE.Mesh(
    mesh_mirrorHead_23Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_mirrorHead_23.name = "MirrorCam camera head (left)";
  if (endpoint_mirrorHead_23) {
    mesh_mirrorHead_23.position.copy(endpoint_mirrorHead_23.midpoint);
    mesh_mirrorHead_23.quaternion.copy(endpoint_mirrorHead_23.quaternion);
  }
  mesh_mirrorHead_23.castShadow = options.castShadow ?? true;
  mesh_mirrorHead_23.receiveShadow = options.receiveShadow ?? true;
  mesh_mirrorHead_23.userData.sculptComponent = {"id": "mirrorHead", "name": "MirrorCam camera head (left)", "level": "meso", "role": "mirror", "importance": 0.65, "confidence": 0.6, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "MirrorCam camera head (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [1.4, 1.99, 1.15], "localEnd": [1.4, 1.99, 1.15], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.16, "height": 0.1, "depth": 0.14, "units": "relative", "confidence": 0.6}, "transform": {"position": [1.4, 1.99, 1.15], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "mirrorArm", "description": "Camera head carried on a short arm from the roof edge above the door (component mirrorArm).", "confidence": 0.6, "level": "meso", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_mirrorHead_23.add(mesh_mirrorHead_23);
  meshes["mirrorHead"] = mesh_mirrorHead_23;
  colliders["mirrorHead"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_mirrorArm_24 = {"parentId": "cabShell", "parentSocket": "roofEdgeLeft", "localStart": [1.2, 2.17, 0.95], "localEnd": [1.36, 2.04, 1.13], "baseRadius": 0.03, "endRadius": 0.025, "contactType": "socket", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_mirrorArm_24 = makeAttachmentEndpoint(attachment_mirrorArm_24);
  const node_mirrorArm_24 = new THREE.Group();
  node_mirrorArm_24.name = "MirrorCam arm (left)__pivot";
  node_mirrorArm_24.scale.set(1, 1, 1);
  if (endpoint_mirrorArm_24) {
    node_mirrorArm_24.position.copy(endpoint_mirrorArm_24.start);
    node_mirrorArm_24.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_mirrorArm_24.position.set(1.22, 2.02, 0.95);
    node_mirrorArm_24.rotation.set(0.0, 0.0, 0.0);
  }
  node_mirrorArm_24.userData.sculptComponent = {"id": "mirrorArm", "name": "MirrorCam arm (left)", "level": "micro", "role": "mirror", "importance": 0.5, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "MirrorCam arm (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "roofEdgeLeft", "localStart": [1.2, 2.17, 0.95], "localEnd": [1.36, 2.04, 1.13], "baseRadius": 0.03, "endRadius": 0.025, "contactType": "socket", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.05, "height": 0.35, "depth": 0.05, "units": "relative", "confidence": 0.55}, "transform": {"position": [1.22, 2.02, 0.95], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_mirrorArm_24.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_mirrorArm_24);
  nodes["mirrorArm"] = node_mirrorArm_24;
  const mesh_mirrorArm_24Geometry = endpoint_mirrorArm_24
    ? new THREE.CylinderGeometry(endpoint_mirrorArm_24.endRadius, endpoint_mirrorArm_24.baseRadius, endpoint_mirrorArm_24.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_mirrorArm_24) {
    mesh_mirrorArm_24Geometry.scale(0.05, 0.35, 0.05);
  }
  const mesh_mirrorArm_24 = new THREE.Mesh(
    mesh_mirrorArm_24Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_mirrorArm_24.name = "MirrorCam arm (left)";
  if (endpoint_mirrorArm_24) {
    mesh_mirrorArm_24.position.copy(endpoint_mirrorArm_24.midpoint);
    mesh_mirrorArm_24.quaternion.copy(endpoint_mirrorArm_24.quaternion);
  }
  mesh_mirrorArm_24.castShadow = options.castShadow ?? true;
  mesh_mirrorArm_24.receiveShadow = options.receiveShadow ?? true;
  mesh_mirrorArm_24.userData.sculptComponent = {"id": "mirrorArm", "name": "MirrorCam arm (left)", "level": "micro", "role": "mirror", "importance": 0.5, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "MirrorCam arm (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "roofEdgeLeft", "localStart": [1.2, 2.17, 0.95], "localEnd": [1.36, 2.04, 1.13], "baseRadius": 0.03, "endRadius": 0.025, "contactType": "socket", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.05, "height": 0.35, "depth": 0.05, "units": "relative", "confidence": 0.55}, "transform": {"position": [1.22, 2.02, 0.95], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_mirrorArm_24.add(mesh_mirrorArm_24);
  meshes["mirrorArm"] = mesh_mirrorArm_24;
  colliders["mirrorArm"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_wheelFront_25 = {"parentId": "root", "parentSocket": "wheelFrontAxle", "localStart": [0.98, -0.27, 1.75], "localEnd": [1.3, -0.27, 1.75], "baseRadius": 0.53, "endRadius": 0.53, "contactType": "pivot-hinge", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_wheelFront_25 = makeAttachmentEndpoint(attachment_wheelFront_25);
  const node_wheelFront_25 = new THREE.Group();
  node_wheelFront_25.name = "Front wheel + tyre (left)__pivot";
  node_wheelFront_25.scale.set(1, 1, 1);
  if (endpoint_wheelFront_25) {
    node_wheelFront_25.position.copy(endpoint_wheelFront_25.start);
    node_wheelFront_25.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_wheelFront_25.position.set(1.06, -0.27, 1.75);
    node_wheelFront_25.rotation.set(0.0, 0.0, 0.0);
  }
  node_wheelFront_25.userData.sculptComponent = {"id": "wheelFront", "name": "Front wheel + tyre (left)", "level": "meso", "role": "wheel", "importance": 0.85, "confidence": 0.7, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front wheel + tyre (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "wheelFrontAxle", "localStart": [0.98, -0.27, 1.75], "localEnd": [1.3, -0.27, 1.75], "baseRadius": 0.53, "endRadius": 0.53, "contactType": "pivot-hinge", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.06, "height": 0.32, "depth": 1.06, "units": "relative", "confidence": 0.7}, "transform": {"position": [1.06, -0.27, 1.75], "rotation": [0, 0, 0]}, "material": "tyreRubber", "materialLayers": ["tyreRubber"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(24, 24, 26, 1.0)", "secondaryAlbedo": "rgba(32, 32, 34, 1.0)", "materialClass": "rubber", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Matte black rubber."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.9, "microRoughness": 0.3, "bumpAmplitude": 0.0, "tread": "tread blocks not visible at web distance", "aoLocality": "contact shadow under every tyre", "evidence": ["front-3q-left"]}, "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "tyreRubber"}, "materialRegions": [{"regionId": "tyre", "materialId": "tyreRubber", "profileId": "rubber.matte", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/04-tyre.png", "bbox": {"x": 700, "y": 985, "width": 50, "height": 50}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0024}}]};
  node_wheelFront_25.userData.actionProfile = {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_wheelFront_25);
  nodes["wheelFront"] = node_wheelFront_25;
  const mesh_wheelFront_25Geometry = endpoint_wheelFront_25
    ? new THREE.CylinderGeometry(endpoint_wheelFront_25.endRadius, endpoint_wheelFront_25.baseRadius, endpoint_wheelFront_25.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_wheelFront_25) {
    mesh_wheelFront_25Geometry.scale(1.06, 0.32, 1.06);
  }
  const mesh_wheelFront_25 = new THREE.Mesh(
    mesh_wheelFront_25Geometry,
    materialMap["tyreRubber"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_wheelFront_25.name = "Front wheel + tyre (left)";
  if (endpoint_wheelFront_25) {
    mesh_wheelFront_25.position.copy(endpoint_wheelFront_25.midpoint);
    mesh_wheelFront_25.quaternion.copy(endpoint_wheelFront_25.quaternion);
  }
  mesh_wheelFront_25.castShadow = options.castShadow ?? true;
  mesh_wheelFront_25.receiveShadow = options.receiveShadow ?? true;
  mesh_wheelFront_25.userData.sculptComponent = {"id": "wheelFront", "name": "Front wheel + tyre (left)", "level": "meso", "role": "wheel", "importance": 0.85, "confidence": 0.7, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front wheel + tyre (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "wheelFrontAxle", "localStart": [0.98, -0.27, 1.75], "localEnd": [1.3, -0.27, 1.75], "baseRadius": 0.53, "endRadius": 0.53, "contactType": "pivot-hinge", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.06, "height": 0.32, "depth": 1.06, "units": "relative", "confidence": 0.7}, "transform": {"position": [1.06, -0.27, 1.75], "rotation": [0, 0, 0]}, "material": "tyreRubber", "materialLayers": ["tyreRubber"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(24, 24, 26, 1.0)", "secondaryAlbedo": "rgba(32, 32, 34, 1.0)", "materialClass": "rubber", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Matte black rubber."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.9, "microRoughness": 0.3, "bumpAmplitude": 0.0, "tread": "tread blocks not visible at web distance", "aoLocality": "contact shadow under every tyre", "evidence": ["front-3q-left"]}, "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "tyreRubber"}, "materialRegions": [{"regionId": "tyre", "materialId": "tyreRubber", "profileId": "rubber.matte", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/04-tyre.png", "bbox": {"x": 700, "y": 985, "width": 50, "height": 50}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0024}}]};
  node_wheelFront_25.add(mesh_wheelFront_25);
  meshes["wheelFront"] = mesh_wheelFront_25;
  colliders["wheelFront"] = {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_wheelRear_26 = {"parentId": "root", "parentSocket": "wheelRearAxle", "localStart": [0.7, -0.27, -1.7], "localEnd": [1.3, -0.27, -1.7], "baseRadius": 0.53, "endRadius": 0.53, "contactType": "pivot-hinge", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_wheelRear_26 = makeAttachmentEndpoint(attachment_wheelRear_26);
  const node_wheelRear_26 = new THREE.Group();
  node_wheelRear_26.name = "Rear twin wheel (left)__pivot";
  node_wheelRear_26.scale.set(1, 1, 1);
  if (endpoint_wheelRear_26) {
    node_wheelRear_26.position.copy(endpoint_wheelRear_26.start);
    node_wheelRear_26.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_wheelRear_26.position.set(1.0, -0.27, -1.7);
    node_wheelRear_26.rotation.set(0.0, 0.0, 0.0);
  }
  node_wheelRear_26.userData.sculptComponent = {"id": "wheelRear", "name": "Rear twin wheel (left)", "level": "meso", "role": "wheel", "importance": 0.75, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear twin wheel (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "wheelRearAxle", "localStart": [0.7, -0.27, -1.7], "localEnd": [1.3, -0.27, -1.7], "baseRadius": 0.53, "endRadius": 0.53, "contactType": "pivot-hinge", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.06, "height": 0.6, "depth": 1.06, "units": "relative", "confidence": 0.55}, "transform": {"position": [1.0, -0.27, -1.7], "rotation": [0, 0, 0]}, "material": "tyreRubber", "materialLayers": ["tyreRubber"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(24, 24, 26, 1.0)", "secondaryAlbedo": "rgba(32, 32, 34, 1.0)", "materialClass": "rubber", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Matte black rubber."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.9, "microRoughness": 0.3, "bumpAmplitude": 0.0, "aoLocality": "contact shadow under every tyre", "evidence": ["front-3q-left"]}};
  node_wheelRear_26.userData.actionProfile = {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_wheelRear_26);
  nodes["wheelRear"] = node_wheelRear_26;
  const mesh_wheelRear_26Geometry = endpoint_wheelRear_26
    ? new THREE.CylinderGeometry(endpoint_wheelRear_26.endRadius, endpoint_wheelRear_26.baseRadius, endpoint_wheelRear_26.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_wheelRear_26) {
    mesh_wheelRear_26Geometry.scale(1.06, 0.6, 1.06);
  }
  const mesh_wheelRear_26 = new THREE.Mesh(
    mesh_wheelRear_26Geometry,
    materialMap["tyreRubber"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_wheelRear_26.name = "Rear twin wheel (left)";
  if (endpoint_wheelRear_26) {
    mesh_wheelRear_26.position.copy(endpoint_wheelRear_26.midpoint);
    mesh_wheelRear_26.quaternion.copy(endpoint_wheelRear_26.quaternion);
  }
  mesh_wheelRear_26.castShadow = options.castShadow ?? true;
  mesh_wheelRear_26.receiveShadow = options.receiveShadow ?? true;
  mesh_wheelRear_26.userData.sculptComponent = {"id": "wheelRear", "name": "Rear twin wheel (left)", "level": "meso", "role": "wheel", "importance": 0.75, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear twin wheel (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "wheelRearAxle", "localStart": [0.7, -0.27, -1.7], "localEnd": [1.3, -0.27, -1.7], "baseRadius": 0.53, "endRadius": 0.53, "contactType": "pivot-hinge", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.06, "height": 0.6, "depth": 1.06, "units": "relative", "confidence": 0.55}, "transform": {"position": [1.0, -0.27, -1.7], "rotation": [0, 0, 0]}, "material": "tyreRubber", "materialLayers": ["tyreRubber"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(24, 24, 26, 1.0)", "secondaryAlbedo": "rgba(32, 32, 34, 1.0)", "materialClass": "rubber", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Matte black rubber."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.9, "microRoughness": 0.3, "bumpAmplitude": 0.0, "aoLocality": "contact shadow under every tyre", "evidence": ["front-3q-left"]}};
  node_wheelRear_26.add(mesh_wheelRear_26);
  meshes["wheelRear"] = mesh_wheelRear_26;
  colliders["wheelRear"] = {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_fenderRear_27 = makeAttachmentEndpoint(null);
  const node_fenderRear_27 = new THREE.Group();
  node_fenderRear_27.name = "Rear mudguard (left)__pivot";
  node_fenderRear_27.scale.set(1, 1, 1);
  if (endpoint_fenderRear_27) {
    node_fenderRear_27.position.copy(endpoint_fenderRear_27.start);
    node_fenderRear_27.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_fenderRear_27.position.set(1.0, 0.35, -1.7);
    node_fenderRear_27.rotation.set(0.0, 0.0, 0.0);
  }
  node_fenderRear_27.userData.sculptComponent = {"id": "fenderRear", "name": "Rear mudguard (left)", "level": "meso", "role": "fender", "importance": 0.45, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear mudguard (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurface", "localStart": [1.0, 0.35, -1.7], "localEnd": [1.0, 0.35, -1.7], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.66, "height": 0.07, "depth": 1.35, "units": "relative", "confidence": 0.5}, "transform": {"position": [1.0, 0.35, -1.7], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_fenderRear_27.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_fenderRear_27);
  nodes["fenderRear"] = node_fenderRear_27;
  const mesh_fenderRear_27Geometry = endpoint_fenderRear_27
    ? new THREE.CylinderGeometry(endpoint_fenderRear_27.endRadius, endpoint_fenderRear_27.baseRadius, endpoint_fenderRear_27.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_fenderRear_27) {
    mesh_fenderRear_27Geometry.scale(0.66, 0.07, 1.35);
  }
  const mesh_fenderRear_27 = new THREE.Mesh(
    mesh_fenderRear_27Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_fenderRear_27.name = "Rear mudguard (left)";
  if (endpoint_fenderRear_27) {
    mesh_fenderRear_27.position.copy(endpoint_fenderRear_27.midpoint);
    mesh_fenderRear_27.quaternion.copy(endpoint_fenderRear_27.quaternion);
  }
  mesh_fenderRear_27.castShadow = options.castShadow ?? true;
  mesh_fenderRear_27.receiveShadow = options.receiveShadow ?? true;
  mesh_fenderRear_27.userData.sculptComponent = {"id": "fenderRear", "name": "Rear mudguard (left)", "level": "meso", "role": "fender", "importance": 0.45, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear mudguard (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurface", "localStart": [1.0, 0.35, -1.7], "localEnd": [1.0, 0.35, -1.7], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.66, "height": 0.07, "depth": 1.35, "units": "relative", "confidence": 0.5}, "transform": {"position": [1.0, 0.35, -1.7], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_fenderRear_27.add(mesh_fenderRear_27);
  meshes["fenderRear"] = mesh_fenderRear_27;
  colliders["fenderRear"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_fuelTank_28 = makeAttachmentEndpoint(null);
  const node_fuelTank_28 = new THREE.Group();
  node_fuelTank_28.name = "Fuel tank (left)__pivot";
  node_fuelTank_28.scale.set(1, 1, 1);
  if (endpoint_fuelTank_28) {
    node_fuelTank_28.position.copy(endpoint_fuelTank_28.start);
    node_fuelTank_28.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_fuelTank_28.position.set(0.8, -0.08, 0.15);
    node_fuelTank_28.rotation.set(0.0, 0.0, 0.0);
  }
  node_fuelTank_28.userData.sculptComponent = {"id": "fuelTank", "name": "Fuel tank (left)", "level": "meso", "role": "tank", "importance": 0.45, "confidence": 0.45, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Fuel tank (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.12, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurface", "localStart": [0.8, -0.08, 0.15], "localEnd": [0.8, -0.08, 0.15], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.55, "height": 0.55, "depth": 1.2, "units": "relative", "confidence": 0.45}, "transform": {"position": [0.8, -0.08, 0.15], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_fuelTank_28.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_fuelTank_28);
  nodes["fuelTank"] = node_fuelTank_28;
  const mesh_fuelTank_28Geometry = endpoint_fuelTank_28
    ? new THREE.CylinderGeometry(endpoint_fuelTank_28.endRadius, endpoint_fuelTank_28.baseRadius, endpoint_fuelTank_28.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_fuelTank_28) {
    mesh_fuelTank_28Geometry.scale(0.55, 0.55, 1.2);
  }
  const mesh_fuelTank_28 = new THREE.Mesh(
    mesh_fuelTank_28Geometry,
    materialMap["paintSilver"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_fuelTank_28.name = "Fuel tank (left)";
  if (endpoint_fuelTank_28) {
    mesh_fuelTank_28.position.copy(endpoint_fuelTank_28.midpoint);
    mesh_fuelTank_28.quaternion.copy(endpoint_fuelTank_28.quaternion);
  }
  mesh_fuelTank_28.castShadow = options.castShadow ?? true;
  mesh_fuelTank_28.receiveShadow = options.receiveShadow ?? true;
  mesh_fuelTank_28.userData.sculptComponent = {"id": "fuelTank", "name": "Fuel tank (left)", "level": "meso", "role": "tank", "importance": 0.45, "confidence": 0.45, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Fuel tank (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.12, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurface", "localStart": [0.8, -0.08, 0.15], "localEnd": [0.8, -0.08, 0.15], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.55, "height": 0.55, "depth": 1.2, "units": "relative", "confidence": 0.45}, "transform": {"position": [0.8, -0.08, 0.15], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_fuelTank_28.add(mesh_fuelTank_28);
  meshes["fuelTank"] = mesh_fuelTank_28;
  colliders["fuelTank"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_stepBox_29 = makeAttachmentEndpoint(null);
  const node_stepBox_29 = new THREE.Group();
  node_stepBox_29.name = "Entry step box behind the front wheel (left)__pivot";
  node_stepBox_29.scale.set(1, 1, 1);
  if (endpoint_stepBox_29) {
    node_stepBox_29.position.copy(endpoint_stepBox_29.start);
    node_stepBox_29.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_stepBox_29.position.set(1.05, -0.02, 0.98);
    node_stepBox_29.rotation.set(0.0, 0.0, 0.0);
  }
  node_stepBox_29.userData.sculptComponent = {"id": "stepBox", "name": "Entry step box behind the front wheel (left)", "level": "meso", "role": "step", "importance": 0.5, "confidence": 0.55, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Entry step box behind the front wheel (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurface", "localStart": [1.05, -0.02, 0.98], "localEnd": [1.05, -0.02, 0.98], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.4, "height": 0.72, "depth": 0.5, "units": "relative", "confidence": 0.55}, "transform": {"position": [1.05, -0.02, 0.98], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "stepOpenings", "description": "Two dark step openings stacked in the box (components stepTread, stepTread2).", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_stepBox_29.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_stepBox_29);
  nodes["stepBox"] = node_stepBox_29;
  const mesh_stepBox_29Geometry = endpoint_stepBox_29
    ? new THREE.CylinderGeometry(endpoint_stepBox_29.endRadius, endpoint_stepBox_29.baseRadius, endpoint_stepBox_29.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_stepBox_29) {
    mesh_stepBox_29Geometry.scale(0.4, 0.72, 0.5);
  }
  const mesh_stepBox_29 = new THREE.Mesh(
    mesh_stepBox_29Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_stepBox_29.name = "Entry step box behind the front wheel (left)";
  if (endpoint_stepBox_29) {
    mesh_stepBox_29.position.copy(endpoint_stepBox_29.midpoint);
    mesh_stepBox_29.quaternion.copy(endpoint_stepBox_29.quaternion);
  }
  mesh_stepBox_29.castShadow = options.castShadow ?? true;
  mesh_stepBox_29.receiveShadow = options.receiveShadow ?? true;
  mesh_stepBox_29.userData.sculptComponent = {"id": "stepBox", "name": "Entry step box behind the front wheel (left)", "level": "meso", "role": "step", "importance": 0.5, "confidence": 0.55, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Entry step box behind the front wheel (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurface", "localStart": [1.05, -0.02, 0.98], "localEnd": [1.05, -0.02, 0.98], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.4, "height": 0.72, "depth": 0.5, "units": "relative", "confidence": 0.55}, "transform": {"position": [1.05, -0.02, 0.98], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "stepOpenings", "description": "Two dark step openings stacked in the box (components stepTread, stepTread2).", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_stepBox_29.add(mesh_stepBox_29);
  meshes["stepBox"] = mesh_stepBox_29;
  colliders["stepBox"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_engineBlock_30 = makeAttachmentEndpoint(null);
  const node_engineBlock_30 = new THREE.Group();
  node_engineBlock_30.name = "Engine and cab mounts between the frame rails__pivot";
  node_engineBlock_30.scale.set(1, 1, 1);
  if (endpoint_engineBlock_30) {
    node_engineBlock_30.position.copy(endpoint_engineBlock_30.start);
    node_engineBlock_30.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_engineBlock_30.position.set(0.0, 0.18, 1.55);
    node_engineBlock_30.rotation.set(0.0, 0.0, 0.0);
  }
  node_engineBlock_30.userData.sculptComponent = {"id": "engineBlock", "name": "Engine and cab mounts between the frame rails", "level": "meso", "role": "drivetrain", "importance": 0.35, "confidence": 0.4, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Occluded drivetrain mass; only its dark side silhouette under the cab floor is visible, so one box carries it.", "geometryDescriptor": {"topologyIntent": "Engine and cab mounts between the frame rails", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.04, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurface", "localStart": [0, 0.18, 1.55], "localEnd": [0, 0.18, 1.55], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.9, "height": 0.42, "depth": 1.7, "units": "relative", "confidence": 0.4}, "transform": {"position": [0, 0.18, 1.55], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_engineBlock_30.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_engineBlock_30);
  nodes["engineBlock"] = node_engineBlock_30;
  const mesh_engineBlock_30Geometry = endpoint_engineBlock_30
    ? new THREE.CylinderGeometry(endpoint_engineBlock_30.endRadius, endpoint_engineBlock_30.baseRadius, endpoint_engineBlock_30.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_engineBlock_30) {
    mesh_engineBlock_30Geometry.scale(0.9, 0.42, 1.7);
  }
  const mesh_engineBlock_30 = new THREE.Mesh(
    mesh_engineBlock_30Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_engineBlock_30.name = "Engine and cab mounts between the frame rails";
  if (endpoint_engineBlock_30) {
    mesh_engineBlock_30.position.copy(endpoint_engineBlock_30.midpoint);
    mesh_engineBlock_30.quaternion.copy(endpoint_engineBlock_30.quaternion);
  }
  mesh_engineBlock_30.castShadow = options.castShadow ?? true;
  mesh_engineBlock_30.receiveShadow = options.receiveShadow ?? true;
  mesh_engineBlock_30.userData.sculptComponent = {"id": "engineBlock", "name": "Engine and cab mounts between the frame rails", "level": "meso", "role": "drivetrain", "importance": 0.35, "confidence": 0.4, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Occluded drivetrain mass; only its dark side silhouette under the cab floor is visible, so one box carries it.", "geometryDescriptor": {"topologyIntent": "Engine and cab mounts between the frame rails", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.04, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurface", "localStart": [0, 0.18, 1.55], "localEnd": [0, 0.18, 1.55], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.9, "height": 0.42, "depth": 1.7, "units": "relative", "confidence": 0.4}, "transform": {"position": [0, 0.18, 1.55], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_engineBlock_30.add(mesh_engineBlock_30);
  meshes["engineBlock"] = mesh_engineBlock_30;
  colliders["engineBlock"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_fifthWheel_31 = makeAttachmentEndpoint(null);
  const node_fifthWheel_31 = new THREE.Group();
  node_fifthWheel_31.name = "Fifth-wheel coupling plate__pivot";
  node_fifthWheel_31.scale.set(1, 1, 1);
  if (endpoint_fifthWheel_31) {
    node_fifthWheel_31.position.copy(endpoint_fifthWheel_31.start);
    node_fifthWheel_31.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_fifthWheel_31.position.set(0.0, 0.28, -1.45);
    node_fifthWheel_31.rotation.set(0.0, 0.0, 0.0);
  }
  node_fifthWheel_31.userData.sculptComponent = {"id": "fifthWheel", "name": "Fifth-wheel coupling plate", "level": "meso", "role": "coupling", "importance": 0.4, "confidence": 0.4, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Fifth-wheel coupling plate", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurface", "localStart": [0, 0.28, -1.45], "localEnd": [0, 0.28, -1.45], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.25, "height": 0.12, "depth": 1.05, "units": "relative", "confidence": 0.4}, "transform": {"position": [0, 0.28, -1.45], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_fifthWheel_31.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_fifthWheel_31);
  nodes["fifthWheel"] = node_fifthWheel_31;
  const mesh_fifthWheel_31Geometry = endpoint_fifthWheel_31
    ? new THREE.CylinderGeometry(endpoint_fifthWheel_31.endRadius, endpoint_fifthWheel_31.baseRadius, endpoint_fifthWheel_31.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_fifthWheel_31) {
    mesh_fifthWheel_31Geometry.scale(1.25, 0.12, 1.05);
  }
  const mesh_fifthWheel_31 = new THREE.Mesh(
    mesh_fifthWheel_31Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_fifthWheel_31.name = "Fifth-wheel coupling plate";
  if (endpoint_fifthWheel_31) {
    mesh_fifthWheel_31.position.copy(endpoint_fifthWheel_31.midpoint);
    mesh_fifthWheel_31.quaternion.copy(endpoint_fifthWheel_31.quaternion);
  }
  mesh_fifthWheel_31.castShadow = options.castShadow ?? true;
  mesh_fifthWheel_31.receiveShadow = options.receiveShadow ?? true;
  mesh_fifthWheel_31.userData.sculptComponent = {"id": "fifthWheel", "name": "Fifth-wheel coupling plate", "level": "meso", "role": "coupling", "importance": 0.4, "confidence": 0.4, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Fifth-wheel coupling plate", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurface", "localStart": [0, 0.28, -1.45], "localEnd": [0, 0.28, -1.45], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.25, "height": 0.12, "depth": 1.05, "units": "relative", "confidence": 0.4}, "transform": {"position": [0, 0.28, -1.45], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_fifthWheel_31.add(mesh_fifthWheel_31);
  meshes["fifthWheel"] = mesh_fifthWheel_31;
  colliders["fifthWheel"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_rimFront_32 = {"parentId": "wheelFront", "parentSocket": "wheelFrontHub", "localStart": [0.29, 0, 0], "localEnd": [0.335, 0, 0], "baseRadius": 0.31, "endRadius": 0.31, "contactType": "flush-mount", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_rimFront_32 = makeAttachmentEndpoint(attachment_rimFront_32);
  const node_rimFront_32 = new THREE.Group();
  node_rimFront_32.name = "Front rim face (left)__pivot";
  node_rimFront_32.scale.set(1, 1, 1);
  if (endpoint_rimFront_32) {
    node_rimFront_32.position.copy(endpoint_rimFront_32.start);
    node_rimFront_32.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_rimFront_32.position.set(0.28, 0.0, 0.0);
    node_rimFront_32.rotation.set(0.0, 0.0, 0.0);
  }
  node_rimFront_32.userData.sculptComponent = {"id": "rimFront", "name": "Front rim face (left)", "level": "micro", "role": "rim", "importance": 0.6, "confidence": 0.6, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front rim face (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelFront", "attachment": {"parentId": "wheelFront", "parentSocket": "wheelFrontHub", "localStart": [0.29, 0, 0], "localEnd": [0.335, 0, 0], "baseRadius": 0.31, "endRadius": 0.31, "contactType": "flush-mount", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.62, "height": 0.04, "depth": 0.62, "units": "relative", "confidence": 0.6}, "transform": {"position": [0.28, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "alloyRim", "materialLayers": ["alloyRim"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(46, 47, 52, 1.0)", "secondaryAlbedo": "rgba(69, 71, 77, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Black-grey steel wheel with bright wheel nuts; verified crop shows the dark rim face."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "alloyRim"}, "materialRegions": [{"regionId": "rim", "materialId": "alloyRim", "profileId": "metal.aluminum", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/08-rim.png", "bbox": {"x": 722, "y": 880, "width": 30, "height": 40}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0012}}]};
  node_rimFront_32.userData.actionProfile = {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["wheelFront"] ?? root).add(node_rimFront_32);
  nodes["rimFront"] = node_rimFront_32;
  const mesh_rimFront_32Geometry = endpoint_rimFront_32
    ? new THREE.CylinderGeometry(endpoint_rimFront_32.endRadius, endpoint_rimFront_32.baseRadius, endpoint_rimFront_32.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_rimFront_32) {
    mesh_rimFront_32Geometry.scale(0.62, 0.04, 0.62);
  }
  const mesh_rimFront_32 = new THREE.Mesh(
    mesh_rimFront_32Geometry,
    materialMap["alloyRim"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_rimFront_32.name = "Front rim face (left)";
  if (endpoint_rimFront_32) {
    mesh_rimFront_32.position.copy(endpoint_rimFront_32.midpoint);
    mesh_rimFront_32.quaternion.copy(endpoint_rimFront_32.quaternion);
  }
  mesh_rimFront_32.castShadow = options.castShadow ?? true;
  mesh_rimFront_32.receiveShadow = options.receiveShadow ?? true;
  mesh_rimFront_32.userData.sculptComponent = {"id": "rimFront", "name": "Front rim face (left)", "level": "micro", "role": "rim", "importance": 0.6, "confidence": 0.6, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front rim face (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelFront", "attachment": {"parentId": "wheelFront", "parentSocket": "wheelFrontHub", "localStart": [0.29, 0, 0], "localEnd": [0.335, 0, 0], "baseRadius": 0.31, "endRadius": 0.31, "contactType": "flush-mount", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.62, "height": 0.04, "depth": 0.62, "units": "relative", "confidence": 0.6}, "transform": {"position": [0.28, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "alloyRim", "materialLayers": ["alloyRim"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(46, 47, 52, 1.0)", "secondaryAlbedo": "rgba(69, 71, 77, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Black-grey steel wheel with bright wheel nuts; verified crop shows the dark rim face."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "alloyRim"}, "materialRegions": [{"regionId": "rim", "materialId": "alloyRim", "profileId": "metal.aluminum", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/08-rim.png", "bbox": {"x": 722, "y": 880, "width": 30, "height": 40}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0012}}]};
  node_rimFront_32.add(mesh_rimFront_32);
  meshes["rimFront"] = mesh_rimFront_32;
  colliders["rimFront"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_rimRear_33 = {"parentId": "wheelRear", "parentSocket": "wheelRearHub", "localStart": [0.57, 0, 0], "localEnd": [0.615, 0, 0], "baseRadius": 0.31, "endRadius": 0.31, "contactType": "flush-mount", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_rimRear_33 = makeAttachmentEndpoint(attachment_rimRear_33);
  const node_rimRear_33 = new THREE.Group();
  node_rimRear_33.name = "Rear rim face (left)__pivot";
  node_rimRear_33.scale.set(1, 1, 1);
  if (endpoint_rimRear_33) {
    node_rimRear_33.position.copy(endpoint_rimRear_33.start);
    node_rimRear_33.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_rimRear_33.position.set(0.32, 0.0, 0.0);
    node_rimRear_33.rotation.set(0.0, 0.0, 0.0);
  }
  node_rimRear_33.userData.sculptComponent = {"id": "rimRear", "name": "Rear rim face (left)", "level": "micro", "role": "rim", "importance": 0.5, "confidence": 0.5, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear rim face (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelRear", "attachment": {"parentId": "wheelRear", "parentSocket": "wheelRearHub", "localStart": [0.57, 0, 0], "localEnd": [0.615, 0, 0], "baseRadius": 0.31, "endRadius": 0.31, "contactType": "flush-mount", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.62, "height": 0.04, "depth": 0.62, "units": "relative", "confidence": 0.5}, "transform": {"position": [0.32, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "alloyRim", "materialLayers": ["alloyRim"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(46, 47, 52, 1.0)", "secondaryAlbedo": "rgba(69, 71, 77, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Black-grey steel wheel with bright wheel nuts; verified crop shows the dark rim face."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_rimRear_33.userData.actionProfile = {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["wheelRear"] ?? root).add(node_rimRear_33);
  nodes["rimRear"] = node_rimRear_33;
  const mesh_rimRear_33Geometry = endpoint_rimRear_33
    ? new THREE.CylinderGeometry(endpoint_rimRear_33.endRadius, endpoint_rimRear_33.baseRadius, endpoint_rimRear_33.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_rimRear_33) {
    mesh_rimRear_33Geometry.scale(0.62, 0.04, 0.62);
  }
  const mesh_rimRear_33 = new THREE.Mesh(
    mesh_rimRear_33Geometry,
    materialMap["alloyRim"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_rimRear_33.name = "Rear rim face (left)";
  if (endpoint_rimRear_33) {
    mesh_rimRear_33.position.copy(endpoint_rimRear_33.midpoint);
    mesh_rimRear_33.quaternion.copy(endpoint_rimRear_33.quaternion);
  }
  mesh_rimRear_33.castShadow = options.castShadow ?? true;
  mesh_rimRear_33.receiveShadow = options.receiveShadow ?? true;
  mesh_rimRear_33.userData.sculptComponent = {"id": "rimRear", "name": "Rear rim face (left)", "level": "micro", "role": "rim", "importance": 0.5, "confidence": 0.5, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear rim face (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelRear", "attachment": {"parentId": "wheelRear", "parentSocket": "wheelRearHub", "localStart": [0.57, 0, 0], "localEnd": [0.615, 0, 0], "baseRadius": 0.31, "endRadius": 0.31, "contactType": "flush-mount", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.62, "height": 0.04, "depth": 0.62, "units": "relative", "confidence": 0.5}, "transform": {"position": [0.32, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "alloyRim", "materialLayers": ["alloyRim"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(46, 47, 52, 1.0)", "secondaryAlbedo": "rgba(69, 71, 77, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Black-grey steel wheel with bright wheel nuts; verified crop shows the dark rim face."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_rimRear_33.add(mesh_rimRear_33);
  meshes["rimRear"] = mesh_rimRear_33;
  colliders["rimRear"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_hubFront_34 = {"parentId": "wheelFront", "parentSocket": "wheelFrontHub", "localStart": [0.335, 0, 0], "localEnd": [0.385, 0, 0], "baseRadius": 0.12, "endRadius": 0.1, "contactType": "flush-mount", "embedDepth": 0.01, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_hubFront_34 = makeAttachmentEndpoint(attachment_hubFront_34);
  const node_hubFront_34 = new THREE.Group();
  node_hubFront_34.name = "Front hub cap (left)__pivot";
  node_hubFront_34.scale.set(1, 1, 1);
  if (endpoint_hubFront_34) {
    node_hubFront_34.position.copy(endpoint_hubFront_34.start);
    node_hubFront_34.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_hubFront_34.position.set(0.255, 0.0, 0.0);
    node_hubFront_34.rotation.set(0.0, 0.0, 0.0);
  }
  node_hubFront_34.userData.sculptComponent = {"id": "hubFront", "name": "Front hub cap (left)", "level": "micro", "role": "hub", "importance": 0.5, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front hub cap (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelFront", "attachment": {"parentId": "wheelFront", "parentSocket": "wheelFrontHub", "localStart": [0.335, 0, 0], "localEnd": [0.385, 0, 0], "baseRadius": 0.12, "endRadius": 0.1, "contactType": "flush-mount", "embedDepth": 0.01, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.24, "height": 0.05, "depth": 0.24, "units": "relative", "confidence": 0.55}, "transform": {"position": [0.255, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "handHolesFront", "description": "Ring of ten dark hand-holes around the hub (repetition system), which makes wheel spin visible.", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_hubFront_34.userData.actionProfile = {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["wheelFront"] ?? root).add(node_hubFront_34);
  nodes["hubFront"] = node_hubFront_34;
  const mesh_hubFront_34Geometry = endpoint_hubFront_34
    ? new THREE.CylinderGeometry(endpoint_hubFront_34.endRadius, endpoint_hubFront_34.baseRadius, endpoint_hubFront_34.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_hubFront_34) {
    mesh_hubFront_34Geometry.scale(0.24, 0.05, 0.24);
  }
  const mesh_hubFront_34 = new THREE.Mesh(
    mesh_hubFront_34Geometry,
    materialMap["chromeBright"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_hubFront_34.name = "Front hub cap (left)";
  if (endpoint_hubFront_34) {
    mesh_hubFront_34.position.copy(endpoint_hubFront_34.midpoint);
    mesh_hubFront_34.quaternion.copy(endpoint_hubFront_34.quaternion);
  }
  mesh_hubFront_34.castShadow = options.castShadow ?? true;
  mesh_hubFront_34.receiveShadow = options.receiveShadow ?? true;
  mesh_hubFront_34.userData.sculptComponent = {"id": "hubFront", "name": "Front hub cap (left)", "level": "micro", "role": "hub", "importance": 0.5, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front hub cap (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelFront", "attachment": {"parentId": "wheelFront", "parentSocket": "wheelFrontHub", "localStart": [0.335, 0, 0], "localEnd": [0.385, 0, 0], "baseRadius": 0.12, "endRadius": 0.1, "contactType": "flush-mount", "embedDepth": 0.01, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.24, "height": 0.05, "depth": 0.24, "units": "relative", "confidence": 0.55}, "transform": {"position": [0.255, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "handHolesFront", "description": "Ring of ten dark hand-holes around the hub (repetition system), which makes wheel spin visible.", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_hubFront_34.add(mesh_hubFront_34);
  meshes["hubFront"] = mesh_hubFront_34;
  colliders["hubFront"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_hubRear_35 = {"parentId": "wheelRear", "parentSocket": "wheelRearHub", "localStart": [0.615, 0, 0], "localEnd": [0.665, 0, 0], "baseRadius": 0.12, "endRadius": 0.1, "contactType": "flush-mount", "embedDepth": 0.01, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_hubRear_35 = makeAttachmentEndpoint(attachment_hubRear_35);
  const node_hubRear_35 = new THREE.Group();
  node_hubRear_35.name = "Rear hub cap (left)__pivot";
  node_hubRear_35.scale.set(1, 1, 1);
  if (endpoint_hubRear_35) {
    node_hubRear_35.position.copy(endpoint_hubRear_35.start);
    node_hubRear_35.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_hubRear_35.position.set(0.295, 0.0, 0.0);
    node_hubRear_35.rotation.set(0.0, 0.0, 0.0);
  }
  node_hubRear_35.userData.sculptComponent = {"id": "hubRear", "name": "Rear hub cap (left)", "level": "micro", "role": "hub", "importance": 0.5, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear hub cap (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelRear", "attachment": {"parentId": "wheelRear", "parentSocket": "wheelRearHub", "localStart": [0.615, 0, 0], "localEnd": [0.665, 0, 0], "baseRadius": 0.12, "endRadius": 0.1, "contactType": "flush-mount", "embedDepth": 0.01, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.24, "height": 0.05, "depth": 0.24, "units": "relative", "confidence": 0.55}, "transform": {"position": [0.295, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "handHolesRear", "description": "Ring of ten dark hand-holes around the hub (repetition system), which makes wheel spin visible.", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_hubRear_35.userData.actionProfile = {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["wheelRear"] ?? root).add(node_hubRear_35);
  nodes["hubRear"] = node_hubRear_35;
  const mesh_hubRear_35Geometry = endpoint_hubRear_35
    ? new THREE.CylinderGeometry(endpoint_hubRear_35.endRadius, endpoint_hubRear_35.baseRadius, endpoint_hubRear_35.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_hubRear_35) {
    mesh_hubRear_35Geometry.scale(0.24, 0.05, 0.24);
  }
  const mesh_hubRear_35 = new THREE.Mesh(
    mesh_hubRear_35Geometry,
    materialMap["chromeBright"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_hubRear_35.name = "Rear hub cap (left)";
  if (endpoint_hubRear_35) {
    mesh_hubRear_35.position.copy(endpoint_hubRear_35.midpoint);
    mesh_hubRear_35.quaternion.copy(endpoint_hubRear_35.quaternion);
  }
  mesh_hubRear_35.castShadow = options.castShadow ?? true;
  mesh_hubRear_35.receiveShadow = options.receiveShadow ?? true;
  mesh_hubRear_35.userData.sculptComponent = {"id": "hubRear", "name": "Rear hub cap (left)", "level": "micro", "role": "hub", "importance": 0.5, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear hub cap (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelRear", "attachment": {"parentId": "wheelRear", "parentSocket": "wheelRearHub", "localStart": [0.615, 0, 0], "localEnd": [0.665, 0, 0], "baseRadius": 0.12, "endRadius": 0.1, "contactType": "flush-mount", "embedDepth": 0.01, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.24, "height": 0.05, "depth": 0.24, "units": "relative", "confidence": 0.55}, "transform": {"position": [0.295, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "handHolesRear", "description": "Ring of ten dark hand-holes around the hub (repetition system), which makes wheel spin visible.", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_hubRear_35.add(mesh_hubRear_35);
  meshes["hubRear"] = mesh_hubRear_35;
  colliders["hubRear"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_visorPlate_36 = makeAttachmentEndpoint(null);
  const node_visorPlate_36 = new THREE.Group();
  node_visorPlate_36.name = "GIGASPACE nameplate__pivot";
  node_visorPlate_36.scale.set(1, 1, 1);
  if (endpoint_visorPlate_36) {
    node_visorPlate_36.position.copy(endpoint_visorPlate_36.start);
    node_visorPlate_36.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_visorPlate_36.position.set(0.0, 0.02, 0.11);
    node_visorPlate_36.rotation.set(0.0, 0.0, 0.0);
  }
  node_visorPlate_36.userData.sculptComponent = {"id": "visorPlate", "name": "GIGASPACE nameplate", "level": "micro", "role": "badge", "importance": 0.55, "confidence": 0.65, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "GIGASPACE nameplate", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "sunVisor", "attachment": {"parentId": "sunVisor", "parentSocket": "sunVisorSurface", "localStart": [0, 0.02, 0.11], "localEnd": [0, 0.02, 0.11], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.0, "height": 0.07, "depth": 0.02, "units": "relative", "confidence": 0.65}, "transform": {"position": [0, 0.02, 0.11], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_visorPlate_36.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["sunVisor"] ?? root).add(node_visorPlate_36);
  nodes["visorPlate"] = node_visorPlate_36;
  const mesh_visorPlate_36Geometry = endpoint_visorPlate_36
    ? new THREE.CylinderGeometry(endpoint_visorPlate_36.endRadius, endpoint_visorPlate_36.baseRadius, endpoint_visorPlate_36.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_visorPlate_36) {
    mesh_visorPlate_36Geometry.scale(1.0, 0.07, 0.02);
  }
  const mesh_visorPlate_36 = new THREE.Mesh(
    mesh_visorPlate_36Geometry,
    materialMap["chromeBright"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_visorPlate_36.name = "GIGASPACE nameplate";
  if (endpoint_visorPlate_36) {
    mesh_visorPlate_36.position.copy(endpoint_visorPlate_36.midpoint);
    mesh_visorPlate_36.quaternion.copy(endpoint_visorPlate_36.quaternion);
  }
  mesh_visorPlate_36.castShadow = options.castShadow ?? true;
  mesh_visorPlate_36.receiveShadow = options.receiveShadow ?? true;
  mesh_visorPlate_36.userData.sculptComponent = {"id": "visorPlate", "name": "GIGASPACE nameplate", "level": "micro", "role": "badge", "importance": 0.55, "confidence": 0.65, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "GIGASPACE nameplate", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "sunVisor", "attachment": {"parentId": "sunVisor", "parentSocket": "sunVisorSurface", "localStart": [0, 0.02, 0.11], "localEnd": [0, 0.02, 0.11], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.0, "height": 0.07, "depth": 0.02, "units": "relative", "confidence": 0.65}, "transform": {"position": [0, 0.02, 0.11], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_visorPlate_36.add(mesh_visorPlate_36);
  meshes["visorPlate"] = mesh_visorPlate_36;
  colliders["visorPlate"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_numberPlate_37 = makeAttachmentEndpoint(null);
  const node_numberPlate_37 = new THREE.Group();
  node_numberPlate_37.name = "Front number plate__pivot";
  node_numberPlate_37.scale.set(1, 1, 1);
  if (endpoint_numberPlate_37) {
    node_numberPlate_37.position.copy(endpoint_numberPlate_37.start);
    node_numberPlate_37.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_numberPlate_37.position.set(0.0, -0.09, 0.22);
    node_numberPlate_37.rotation.set(0.0, 0.0, 0.0);
  }
  node_numberPlate_37.userData.sculptComponent = {"id": "numberPlate", "name": "Front number plate", "level": "micro", "role": "badge", "importance": 0.5, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front number plate", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "bumperLower", "attachment": {"parentId": "bumperLower", "parentSocket": "bumperLowerSurface", "localStart": [0, -0.09, 0.22], "localEnd": [0, -0.09, 0.22], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.52, "height": 0.11, "depth": 0.02, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.09, 0.22], "rotation": [0, 0, 0]}, "material": "plateWhite", "materialLayers": ["plateWhite"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(239, 239, 234, 1.0)", "secondaryAlbedo": "rgba(255, 255, 255, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "White plate with blue EU band; characters not reproduced."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "plateWhite"}, "materialRegions": [{"regionId": "plate", "materialId": "plateWhite", "profileId": "plastic.matte", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/06-plate.png", "bbox": {"x": 250, "y": 957, "width": 80, "height": 20}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0016}}]};
  node_numberPlate_37.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["bumperLower"] ?? root).add(node_numberPlate_37);
  nodes["numberPlate"] = node_numberPlate_37;
  const mesh_numberPlate_37Geometry = endpoint_numberPlate_37
    ? new THREE.CylinderGeometry(endpoint_numberPlate_37.endRadius, endpoint_numberPlate_37.baseRadius, endpoint_numberPlate_37.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_numberPlate_37) {
    mesh_numberPlate_37Geometry.scale(0.52, 0.11, 0.02);
  }
  const mesh_numberPlate_37 = new THREE.Mesh(
    mesh_numberPlate_37Geometry,
    materialMap["plateWhite"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_numberPlate_37.name = "Front number plate";
  if (endpoint_numberPlate_37) {
    mesh_numberPlate_37.position.copy(endpoint_numberPlate_37.midpoint);
    mesh_numberPlate_37.quaternion.copy(endpoint_numberPlate_37.quaternion);
  }
  mesh_numberPlate_37.castShadow = options.castShadow ?? true;
  mesh_numberPlate_37.receiveShadow = options.receiveShadow ?? true;
  mesh_numberPlate_37.userData.sculptComponent = {"id": "numberPlate", "name": "Front number plate", "level": "micro", "role": "badge", "importance": 0.5, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front number plate", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "bumperLower", "attachment": {"parentId": "bumperLower", "parentSocket": "bumperLowerSurface", "localStart": [0, -0.09, 0.22], "localEnd": [0, -0.09, 0.22], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.52, "height": 0.11, "depth": 0.02, "units": "relative", "confidence": 0.7}, "transform": {"position": [0, -0.09, 0.22], "rotation": [0, 0, 0]}, "material": "plateWhite", "materialLayers": ["plateWhite"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(239, 239, 234, 1.0)", "secondaryAlbedo": "rgba(255, 255, 255, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "White plate with blue EU band; characters not reproduced."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "uvContract": {"status": "unwrapped", "strategy": "generated procedural coordinates", "materialId": "plateWhite"}, "materialRegions": [{"regionId": "plate", "materialId": "plateWhite", "profileId": "plastic.matte", "crop": {"path": "/tmp/claude-0/-home-user-Website/adce280b-5622-58a5-a097-04079225cc91/scratchpad/truck3d/material-evidence/06-plate.png", "bbox": {"x": 250, "y": 957, "width": 80, "height": 20}, "sourceWidth": 952, "sourceHeight": 1074, "loaderWarnings": [], "coverage": 0.0016}}]};
  node_numberPlate_37.add(mesh_numberPlate_37);
  meshes["numberPlate"] = mesh_numberPlate_37;
  colliders["numberPlate"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_wiper_38 = makeAttachmentEndpoint(null);
  const node_wiper_38 = new THREE.Group();
  node_wiper_38.name = "Wiper arm (left of centre)__pivot";
  node_wiper_38.scale.set(1, 1, 1);
  if (endpoint_wiper_38) {
    node_wiper_38.position.copy(endpoint_wiper_38.start);
    node_wiper_38.rotation.set(0.0, 0.0, 0.12);
  } else {
    node_wiper_38.position.set(0.42, -0.4, 0.045);
    node_wiper_38.rotation.set(0.0, 0.0, 0.12);
  }
  node_wiper_38.userData.sculptComponent = {"id": "wiper", "name": "Wiper arm (left of centre)", "level": "micro", "role": "wiper", "importance": 0.4, "confidence": 0.55, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Wiper arm (left of centre)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "windshield", "attachment": {"parentId": "windshield", "parentSocket": "windshieldSurface", "localStart": [0.42, -0.4, 0.045], "localEnd": [0.42, -0.4, 0.045], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.85, "height": 0.03, "depth": 0.03, "units": "relative", "confidence": 0.55}, "transform": {"position": [0.42, -0.4, 0.045], "rotation": [0, 0, 0.12]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_wiper_38.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["windshield"] ?? root).add(node_wiper_38);
  nodes["wiper"] = node_wiper_38;
  const mesh_wiper_38Geometry = endpoint_wiper_38
    ? new THREE.CylinderGeometry(endpoint_wiper_38.endRadius, endpoint_wiper_38.baseRadius, endpoint_wiper_38.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_wiper_38) {
    mesh_wiper_38Geometry.scale(0.85, 0.03, 0.03);
  }
  const mesh_wiper_38 = new THREE.Mesh(
    mesh_wiper_38Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_wiper_38.name = "Wiper arm (left of centre)";
  if (endpoint_wiper_38) {
    mesh_wiper_38.position.copy(endpoint_wiper_38.midpoint);
    mesh_wiper_38.quaternion.copy(endpoint_wiper_38.quaternion);
  }
  mesh_wiper_38.castShadow = options.castShadow ?? true;
  mesh_wiper_38.receiveShadow = options.receiveShadow ?? true;
  mesh_wiper_38.userData.sculptComponent = {"id": "wiper", "name": "Wiper arm (left of centre)", "level": "micro", "role": "wiper", "importance": 0.4, "confidence": 0.55, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Wiper arm (left of centre)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "windshield", "attachment": {"parentId": "windshield", "parentSocket": "windshieldSurface", "localStart": [0.42, -0.4, 0.045], "localEnd": [0.42, -0.4, 0.045], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.85, "height": 0.03, "depth": 0.03, "units": "relative", "confidence": 0.55}, "transform": {"position": [0.42, -0.4, 0.045], "rotation": [0, 0, 0.12]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_wiper_38.add(mesh_wiper_38);
  meshes["wiper"] = mesh_wiper_38;
  colliders["wiper"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_roofAntenna_39 = {"parentId": "cabShell", "parentSocket": "roofTop", "localStart": [-0.35, 2.76, 0.7], "localEnd": [-0.35, 3.08, 0.68], "baseRadius": 0.012, "endRadius": 0.008, "contactType": "socket", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_roofAntenna_39 = makeAttachmentEndpoint(attachment_roofAntenna_39);
  const node_roofAntenna_39 = new THREE.Group();
  node_roofAntenna_39.name = "Roof antenna__pivot";
  node_roofAntenna_39.scale.set(1, 1, 1);
  if (endpoint_roofAntenna_39) {
    node_roofAntenna_39.position.copy(endpoint_roofAntenna_39.start);
    node_roofAntenna_39.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_roofAntenna_39.position.set(-0.35, 2.76, 0.7);
    node_roofAntenna_39.rotation.set(0.0, 0.0, 0.0);
  }
  node_roofAntenna_39.userData.sculptComponent = {"id": "roofAntenna", "name": "Roof antenna", "level": "micro", "role": "antenna", "importance": 0.3, "confidence": 0.5, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Roof antenna", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "roofTop", "localStart": [-0.35, 2.76, 0.7], "localEnd": [-0.35, 3.08, 0.68], "baseRadius": 0.012, "endRadius": 0.008, "contactType": "socket", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.02, "height": 0.32, "depth": 0.02, "units": "relative", "confidence": 0.5}, "transform": {"position": [-0.35, 2.76, 0.7], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_roofAntenna_39.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_roofAntenna_39);
  nodes["roofAntenna"] = node_roofAntenna_39;
  const mesh_roofAntenna_39Geometry = endpoint_roofAntenna_39
    ? new THREE.CylinderGeometry(endpoint_roofAntenna_39.endRadius, endpoint_roofAntenna_39.baseRadius, endpoint_roofAntenna_39.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_roofAntenna_39) {
    mesh_roofAntenna_39Geometry.scale(0.02, 0.32, 0.02);
  }
  const mesh_roofAntenna_39 = new THREE.Mesh(
    mesh_roofAntenna_39Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_roofAntenna_39.name = "Roof antenna";
  if (endpoint_roofAntenna_39) {
    mesh_roofAntenna_39.position.copy(endpoint_roofAntenna_39.midpoint);
    mesh_roofAntenna_39.quaternion.copy(endpoint_roofAntenna_39.quaternion);
  }
  mesh_roofAntenna_39.castShadow = options.castShadow ?? true;
  mesh_roofAntenna_39.receiveShadow = options.receiveShadow ?? true;
  mesh_roofAntenna_39.userData.sculptComponent = {"id": "roofAntenna", "name": "Roof antenna", "level": "micro", "role": "antenna", "importance": 0.3, "confidence": 0.5, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Roof antenna", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "roofTop", "localStart": [-0.35, 2.76, 0.7], "localEnd": [-0.35, 3.08, 0.68], "baseRadius": 0.012, "endRadius": 0.008, "contactType": "socket", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.02, "height": 0.32, "depth": 0.02, "units": "relative", "confidence": 0.5}, "transform": {"position": [-0.35, 2.76, 0.7], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_roofAntenna_39.add(mesh_roofAntenna_39);
  meshes["roofAntenna"] = mesh_roofAntenna_39;
  colliders["roofAntenna"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_stepTread_40 = makeAttachmentEndpoint(null);
  const node_stepTread_40 = new THREE.Group();
  node_stepTread_40.name = "Entry step tread (left, repetition template)__pivot";
  node_stepTread_40.scale.set(1, 1, 1);
  if (endpoint_stepTread_40) {
    node_stepTread_40.position.copy(endpoint_stepTread_40.start);
    node_stepTread_40.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_stepTread_40.position.set(1.12, -0.56, -0.75);
    node_stepTread_40.rotation.set(0.0, 0.0, 0.0);
  }
  node_stepTread_40.userData.sculptComponent = {"id": "stepTread", "name": "Entry step tread (left, repetition template)", "level": "micro", "role": "step", "importance": 0.35, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Entry step tread (left, repetition template)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [1.12, -0.56, -0.75], "localEnd": [1.12, -0.56, -0.75], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.3, "height": 0.05, "depth": 0.5, "units": "relative", "confidence": 0.5}, "transform": {"position": [1.12, -0.56, -0.75], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_stepTread_40.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_stepTread_40);
  nodes["stepTread"] = node_stepTread_40;
  const mesh_stepTread_40Geometry = endpoint_stepTread_40
    ? new THREE.CylinderGeometry(endpoint_stepTread_40.endRadius, endpoint_stepTread_40.baseRadius, endpoint_stepTread_40.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_stepTread_40) {
    mesh_stepTread_40Geometry.scale(0.3, 0.05, 0.5);
  }
  const mesh_stepTread_40 = new THREE.Mesh(
    mesh_stepTread_40Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_stepTread_40.name = "Entry step tread (left, repetition template)";
  if (endpoint_stepTread_40) {
    mesh_stepTread_40.position.copy(endpoint_stepTread_40.midpoint);
    mesh_stepTread_40.quaternion.copy(endpoint_stepTread_40.quaternion);
  }
  mesh_stepTread_40.castShadow = options.castShadow ?? true;
  mesh_stepTread_40.receiveShadow = options.receiveShadow ?? true;
  mesh_stepTread_40.userData.sculptComponent = {"id": "stepTread", "name": "Entry step tread (left, repetition template)", "level": "micro", "role": "step", "importance": 0.35, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Entry step tread (left, repetition template)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [1.12, -0.56, -0.75], "localEnd": [1.12, -0.56, -0.75], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.3, "height": 0.05, "depth": 0.5, "units": "relative", "confidence": 0.5}, "transform": {"position": [1.12, -0.56, -0.75], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_stepTread_40.add(mesh_stepTread_40);
  meshes["stepTread"] = mesh_stepTread_40;
  colliders["stepTread"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_stepTread2_41 = makeAttachmentEndpoint(null);
  const node_stepTread2_41 = new THREE.Group();
  node_stepTread2_41.name = "Entry step tread, upper (left)__pivot";
  node_stepTread2_41.scale.set(1, 1, 1);
  if (endpoint_stepTread2_41) {
    node_stepTread2_41.position.copy(endpoint_stepTread2_41.start);
    node_stepTread2_41.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_stepTread2_41.position.set(1.12, -0.18, -0.75);
    node_stepTread2_41.rotation.set(0.0, 0.0, 0.0);
  }
  node_stepTread2_41.userData.sculptComponent = {"id": "stepTread2", "name": "Entry step tread, upper (left)", "level": "micro", "role": "step", "importance": 0.3, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Entry step tread, upper (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [1.12, -0.18, -0.75], "localEnd": [1.12, -0.18, -0.75], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.3, "height": 0.05, "depth": 0.5, "units": "relative", "confidence": 0.5}, "transform": {"position": [1.12, -0.18, -0.75], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_stepTread2_41.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_stepTread2_41);
  nodes["stepTread2"] = node_stepTread2_41;
  const mesh_stepTread2_41Geometry = endpoint_stepTread2_41
    ? new THREE.CylinderGeometry(endpoint_stepTread2_41.endRadius, endpoint_stepTread2_41.baseRadius, endpoint_stepTread2_41.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_stepTread2_41) {
    mesh_stepTread2_41Geometry.scale(0.3, 0.05, 0.5);
  }
  const mesh_stepTread2_41 = new THREE.Mesh(
    mesh_stepTread2_41Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_stepTread2_41.name = "Entry step tread, upper (left)";
  if (endpoint_stepTread2_41) {
    mesh_stepTread2_41.position.copy(endpoint_stepTread2_41.midpoint);
    mesh_stepTread2_41.quaternion.copy(endpoint_stepTread2_41.quaternion);
  }
  mesh_stepTread2_41.castShadow = options.castShadow ?? true;
  mesh_stepTread2_41.receiveShadow = options.receiveShadow ?? true;
  mesh_stepTread2_41.userData.sculptComponent = {"id": "stepTread2", "name": "Entry step tread, upper (left)", "level": "micro", "role": "step", "importance": 0.3, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Entry step tread, upper (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurface", "localStart": [1.12, -0.18, -0.75], "localEnd": [1.12, -0.18, -0.75], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.3, "height": 0.05, "depth": 0.5, "units": "relative", "confidence": 0.5}, "transform": {"position": [1.12, -0.18, -0.75], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_stepTread2_41.add(mesh_stepTread2_41);
  meshes["stepTread2"] = mesh_stepTread2_41;
  colliders["stepTread2"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_headlightR_42 = makeAttachmentEndpoint(null);
  const node_headlightR_42 = new THREE.Group();
  node_headlightR_42.name = "Headlight cluster (right)__pivot";
  node_headlightR_42.scale.set(1, 1, 1);
  if (endpoint_headlightR_42) {
    node_headlightR_42.position.copy(endpoint_headlightR_42.start);
    node_headlightR_42.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_headlightR_42.position.set(-0.98, -0.28, 1.23);
    node_headlightR_42.rotation.set(0.0, 0.0, 0.0);
  }
  node_headlightR_42.userData.sculptComponent = {"id": "headlightR", "name": "Headlight cluster (right)", "level": "meso", "role": "lamp", "importance": 0.75, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Headlight cluster (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurfaceR", "localStart": [0.98, -0.28, 1.23], "localEnd": [0.98, -0.28, 1.23], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.42, "height": 0.24, "depth": 0.08, "units": "relative", "confidence": 0.7}, "transform": {"position": [-0.98, -0.28, 1.23], "rotation": [0, 0, 0]}, "material": "lampLens", "materialLayers": ["lampLens"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(233, 238, 242, 1.0)", "secondaryAlbedo": "rgba(255, 255, 255, 1.0)", "materialClass": "glass", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Clear lens over chrome reflector; white daytime running light strip."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "drlStripR", "description": "White DRL strip along the lower lens edge (lampLens emissive override).", "confidence": 0.6, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_headlightR_42.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_headlightR_42);
  nodes["headlightR"] = node_headlightR_42;
  const mesh_headlightR_42Geometry = endpoint_headlightR_42
    ? new THREE.CylinderGeometry(endpoint_headlightR_42.endRadius, endpoint_headlightR_42.baseRadius, endpoint_headlightR_42.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_headlightR_42) {
    mesh_headlightR_42Geometry.scale(0.42, 0.24, 0.08);
  }
  const mesh_headlightR_42 = new THREE.Mesh(
    mesh_headlightR_42Geometry,
    materialMap["lampLens"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_headlightR_42.name = "Headlight cluster (right)";
  if (endpoint_headlightR_42) {
    mesh_headlightR_42.position.copy(endpoint_headlightR_42.midpoint);
    mesh_headlightR_42.quaternion.copy(endpoint_headlightR_42.quaternion);
  }
  mesh_headlightR_42.castShadow = options.castShadow ?? true;
  mesh_headlightR_42.receiveShadow = options.receiveShadow ?? true;
  mesh_headlightR_42.userData.sculptComponent = {"id": "headlightR", "name": "Headlight cluster (right)", "level": "meso", "role": "lamp", "importance": 0.75, "confidence": 0.7, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Headlight cluster (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurfaceR", "localStart": [0.98, -0.28, 1.23], "localEnd": [0.98, -0.28, 1.23], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.42, "height": 0.24, "depth": 0.08, "units": "relative", "confidence": 0.7}, "transform": {"position": [-0.98, -0.28, 1.23], "rotation": [0, 0, 0]}, "material": "lampLens", "materialLayers": ["lampLens"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(233, 238, 242, 1.0)", "secondaryAlbedo": "rgba(255, 255, 255, 1.0)", "materialClass": "glass", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Clear lens over chrome reflector; white daytime running light strip."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "drlStripR", "description": "White DRL strip along the lower lens edge (lampLens emissive override).", "confidence": 0.6, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_headlightR_42.add(mesh_headlightR_42);
  meshes["headlightR"] = mesh_headlightR_42;
  colliders["headlightR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_headlightDrlR_43 = makeAttachmentEndpoint(null);
  const node_headlightDrlR_43 = new THREE.Group();
  node_headlightDrlR_43.name = "Headlight LED / chrome reflector strip (right)__pivot";
  node_headlightDrlR_43.scale.set(1, 1, 1);
  if (endpoint_headlightDrlR_43) {
    node_headlightDrlR_43.position.copy(endpoint_headlightDrlR_43.start);
    node_headlightDrlR_43.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_headlightDrlR_43.position.set(-0.0, -0.06, 0.045);
    node_headlightDrlR_43.rotation.set(0.0, 0.0, 0.0);
  }
  node_headlightDrlR_43.userData.sculptComponent = {"id": "headlightDrlR", "name": "Headlight LED / chrome reflector strip (right)", "level": "micro", "role": "lamp", "importance": 0.5, "confidence": 0.6, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Headlight LED / chrome reflector strip (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "headlightR", "attachment": {"parentId": "headlightR", "parentSocket": "headlightSurfaceR", "localStart": [0.0, -0.06, 0.045], "localEnd": [0.0, -0.06, 0.045], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.36, "height": 0.04, "depth": 0.02, "units": "relative", "confidence": 0.6}, "transform": {"position": [-0.0, -0.06, 0.045], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "drlLineR", "description": "Bright LED daytime-running line along the lower lens edge.", "confidence": 0.6, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_headlightDrlR_43.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["headlightR"] ?? root).add(node_headlightDrlR_43);
  nodes["headlightDrlR"] = node_headlightDrlR_43;
  const mesh_headlightDrlR_43Geometry = endpoint_headlightDrlR_43
    ? new THREE.CylinderGeometry(endpoint_headlightDrlR_43.endRadius, endpoint_headlightDrlR_43.baseRadius, endpoint_headlightDrlR_43.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_headlightDrlR_43) {
    mesh_headlightDrlR_43Geometry.scale(0.36, 0.04, 0.02);
  }
  const mesh_headlightDrlR_43 = new THREE.Mesh(
    mesh_headlightDrlR_43Geometry,
    materialMap["chromeBright"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_headlightDrlR_43.name = "Headlight LED / chrome reflector strip (right)";
  if (endpoint_headlightDrlR_43) {
    mesh_headlightDrlR_43.position.copy(endpoint_headlightDrlR_43.midpoint);
    mesh_headlightDrlR_43.quaternion.copy(endpoint_headlightDrlR_43.quaternion);
  }
  mesh_headlightDrlR_43.castShadow = options.castShadow ?? true;
  mesh_headlightDrlR_43.receiveShadow = options.receiveShadow ?? true;
  mesh_headlightDrlR_43.userData.sculptComponent = {"id": "headlightDrlR", "name": "Headlight LED / chrome reflector strip (right)", "level": "micro", "role": "lamp", "importance": 0.5, "confidence": 0.6, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Headlight LED / chrome reflector strip (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "headlightR", "attachment": {"parentId": "headlightR", "parentSocket": "headlightSurfaceR", "localStart": [0.0, -0.06, 0.045], "localEnd": [0.0, -0.06, 0.045], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.36, "height": 0.04, "depth": 0.02, "units": "relative", "confidence": 0.6}, "transform": {"position": [-0.0, -0.06, 0.045], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "drlLineR", "description": "Bright LED daytime-running line along the lower lens edge.", "confidence": 0.6, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_headlightDrlR_43.add(mesh_headlightDrlR_43);
  meshes["headlightDrlR"] = mesh_headlightDrlR_43;
  colliders["headlightDrlR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_sideWindowR_44 = makeAttachmentEndpoint(null);
  const node_sideWindowR_44 = new THREE.Group();
  node_sideWindowR_44.name = "Door window (right)__pivot";
  node_sideWindowR_44.scale.set(1, 1, 1);
  if (endpoint_sideWindowR_44) {
    node_sideWindowR_44.position.copy(endpoint_sideWindowR_44.start);
    node_sideWindowR_44.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_sideWindowR_44.position.set(-1.255, 1.54, 0.48);
    node_sideWindowR_44.rotation.set(0.0, 0.0, 0.0);
  }
  node_sideWindowR_44.userData.sculptComponent = {"id": "sideWindowR", "name": "Door window (right)", "level": "meso", "role": "glazing", "importance": 0.6, "confidence": 0.65, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Door window (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurfaceR", "localStart": [1.255, 1.54, 0.48], "localEnd": [1.255, 1.54, 0.48], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.03, "height": 0.8, "depth": 0.95, "units": "relative", "confidence": 0.65}, "transform": {"position": [-1.255, 1.54, 0.48], "rotation": [0, 0, 0]}, "material": "glassTint", "materialLayers": ["glassTint"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(29, 37, 44, 1.0)", "secondaryAlbedo": "rgba(43, 55, 64, 1.0)", "materialClass": "glass", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Dark blue-grey glass, reflections of sky; interior unresolved."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_sideWindowR_44.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_sideWindowR_44);
  nodes["sideWindowR"] = node_sideWindowR_44;
  const mesh_sideWindowR_44Geometry = endpoint_sideWindowR_44
    ? new THREE.CylinderGeometry(endpoint_sideWindowR_44.endRadius, endpoint_sideWindowR_44.baseRadius, endpoint_sideWindowR_44.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_sideWindowR_44) {
    mesh_sideWindowR_44Geometry.scale(0.03, 0.8, 0.95);
  }
  const mesh_sideWindowR_44 = new THREE.Mesh(
    mesh_sideWindowR_44Geometry,
    materialMap["glassTint"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_sideWindowR_44.name = "Door window (right)";
  if (endpoint_sideWindowR_44) {
    mesh_sideWindowR_44.position.copy(endpoint_sideWindowR_44.midpoint);
    mesh_sideWindowR_44.quaternion.copy(endpoint_sideWindowR_44.quaternion);
  }
  mesh_sideWindowR_44.castShadow = options.castShadow ?? true;
  mesh_sideWindowR_44.receiveShadow = options.receiveShadow ?? true;
  mesh_sideWindowR_44.userData.sculptComponent = {"id": "sideWindowR", "name": "Door window (right)", "level": "meso", "role": "glazing", "importance": 0.6, "confidence": 0.65, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Door window (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.02, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurfaceR", "localStart": [1.255, 1.54, 0.48], "localEnd": [1.255, 1.54, 0.48], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.03, "height": 0.8, "depth": 0.95, "units": "relative", "confidence": 0.65}, "transform": {"position": [-1.255, 1.54, 0.48], "rotation": [0, 0, 0]}, "material": "glassTint", "materialLayers": ["glassTint"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(29, 37, 44, 1.0)", "secondaryAlbedo": "rgba(43, 55, 64, 1.0)", "materialClass": "glass", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Dark blue-grey glass, reflections of sky; interior unresolved."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_sideWindowR_44.add(mesh_sideWindowR_44);
  meshes["sideWindowR"] = mesh_sideWindowR_44;
  colliders["sideWindowR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_mirrorHeadR_45 = makeAttachmentEndpoint(null);
  const node_mirrorHeadR_45 = new THREE.Group();
  node_mirrorHeadR_45.name = "MirrorCam camera head (right)__pivot";
  node_mirrorHeadR_45.scale.set(1, 1, 1);
  if (endpoint_mirrorHeadR_45) {
    node_mirrorHeadR_45.position.copy(endpoint_mirrorHeadR_45.start);
    node_mirrorHeadR_45.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_mirrorHeadR_45.position.set(-1.4, 1.99, 1.15);
    node_mirrorHeadR_45.rotation.set(0.0, 0.0, 0.0);
  }
  node_mirrorHeadR_45.userData.sculptComponent = {"id": "mirrorHeadR", "name": "MirrorCam camera head (right)", "level": "meso", "role": "mirror", "importance": 0.65, "confidence": 0.6, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "MirrorCam camera head (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurfaceR", "localStart": [1.4, 1.99, 1.15], "localEnd": [1.4, 1.99, 1.15], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.16, "height": 0.1, "depth": 0.14, "units": "relative", "confidence": 0.6}, "transform": {"position": [-1.4, 1.99, 1.15], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "mirrorArmR", "description": "Camera head carried on a short arm from the roof edge above the door (component mirrorArm).", "confidence": 0.6, "level": "meso", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_mirrorHeadR_45.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_mirrorHeadR_45);
  nodes["mirrorHeadR"] = node_mirrorHeadR_45;
  const mesh_mirrorHeadR_45Geometry = endpoint_mirrorHeadR_45
    ? new THREE.CylinderGeometry(endpoint_mirrorHeadR_45.endRadius, endpoint_mirrorHeadR_45.baseRadius, endpoint_mirrorHeadR_45.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_mirrorHeadR_45) {
    mesh_mirrorHeadR_45Geometry.scale(0.16, 0.1, 0.14);
  }
  const mesh_mirrorHeadR_45 = new THREE.Mesh(
    mesh_mirrorHeadR_45Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_mirrorHeadR_45.name = "MirrorCam camera head (right)";
  if (endpoint_mirrorHeadR_45) {
    mesh_mirrorHeadR_45.position.copy(endpoint_mirrorHeadR_45.midpoint);
    mesh_mirrorHeadR_45.quaternion.copy(endpoint_mirrorHeadR_45.quaternion);
  }
  mesh_mirrorHeadR_45.castShadow = options.castShadow ?? true;
  mesh_mirrorHeadR_45.receiveShadow = options.receiveShadow ?? true;
  mesh_mirrorHeadR_45.userData.sculptComponent = {"id": "mirrorHeadR", "name": "MirrorCam camera head (right)", "level": "meso", "role": "mirror", "importance": 0.65, "confidence": 0.6, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "MirrorCam camera head (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurfaceR", "localStart": [1.4, 1.99, 1.15], "localEnd": [1.4, 1.99, 1.15], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.16, "height": 0.1, "depth": 0.14, "units": "relative", "confidence": 0.6}, "transform": {"position": [-1.4, 1.99, 1.15], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "mirrorArmR", "description": "Camera head carried on a short arm from the roof edge above the door (component mirrorArm).", "confidence": 0.6, "level": "meso", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_mirrorHeadR_45.add(mesh_mirrorHeadR_45);
  meshes["mirrorHeadR"] = mesh_mirrorHeadR_45;
  colliders["mirrorHeadR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_mirrorArmR_46 = {"parentId": "cabShell", "parentSocket": "roofEdgeLeftR", "localStart": [-1.2, 2.17, 0.95], "localEnd": [-1.36, 2.04, 1.13], "baseRadius": 0.03, "endRadius": 0.025, "contactType": "socket", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_mirrorArmR_46 = makeAttachmentEndpoint(attachment_mirrorArmR_46);
  const node_mirrorArmR_46 = new THREE.Group();
  node_mirrorArmR_46.name = "MirrorCam arm (right)__pivot";
  node_mirrorArmR_46.scale.set(1, 1, 1);
  if (endpoint_mirrorArmR_46) {
    node_mirrorArmR_46.position.copy(endpoint_mirrorArmR_46.start);
    node_mirrorArmR_46.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_mirrorArmR_46.position.set(-1.22, 2.02, 0.95);
    node_mirrorArmR_46.rotation.set(0.0, 0.0, 0.0);
  }
  node_mirrorArmR_46.userData.sculptComponent = {"id": "mirrorArmR", "name": "MirrorCam arm (right)", "level": "micro", "role": "mirror", "importance": 0.5, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "MirrorCam arm (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "roofEdgeLeftR", "localStart": [-1.2, 2.17, 0.95], "localEnd": [-1.36, 2.04, 1.13], "baseRadius": 0.03, "endRadius": 0.025, "contactType": "socket", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.05, "height": 0.35, "depth": 0.05, "units": "relative", "confidence": 0.55}, "transform": {"position": [-1.22, 2.02, 0.95], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_mirrorArmR_46.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_mirrorArmR_46);
  nodes["mirrorArmR"] = node_mirrorArmR_46;
  const mesh_mirrorArmR_46Geometry = endpoint_mirrorArmR_46
    ? new THREE.CylinderGeometry(endpoint_mirrorArmR_46.endRadius, endpoint_mirrorArmR_46.baseRadius, endpoint_mirrorArmR_46.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_mirrorArmR_46) {
    mesh_mirrorArmR_46Geometry.scale(0.05, 0.35, 0.05);
  }
  const mesh_mirrorArmR_46 = new THREE.Mesh(
    mesh_mirrorArmR_46Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_mirrorArmR_46.name = "MirrorCam arm (right)";
  if (endpoint_mirrorArmR_46) {
    mesh_mirrorArmR_46.position.copy(endpoint_mirrorArmR_46.midpoint);
    mesh_mirrorArmR_46.quaternion.copy(endpoint_mirrorArmR_46.quaternion);
  }
  mesh_mirrorArmR_46.castShadow = options.castShadow ?? true;
  mesh_mirrorArmR_46.receiveShadow = options.receiveShadow ?? true;
  mesh_mirrorArmR_46.userData.sculptComponent = {"id": "mirrorArmR", "name": "MirrorCam arm (right)", "level": "micro", "role": "mirror", "importance": 0.5, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "MirrorCam arm (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "roofEdgeLeftR", "localStart": [-1.2, 2.17, 0.95], "localEnd": [-1.36, 2.04, 1.13], "baseRadius": 0.03, "endRadius": 0.025, "contactType": "socket", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.05, "height": 0.35, "depth": 0.05, "units": "relative", "confidence": 0.55}, "transform": {"position": [-1.22, 2.02, 0.95], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_mirrorArmR_46.add(mesh_mirrorArmR_46);
  meshes["mirrorArmR"] = mesh_mirrorArmR_46;
  colliders["mirrorArmR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_wheelFrontR_47 = {"parentId": "root", "parentSocket": "wheelFrontAxleR", "localStart": [-0.98, -0.27, 1.75], "localEnd": [-1.3, -0.27, 1.75], "baseRadius": 0.53, "endRadius": 0.53, "contactType": "pivot-hinge", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_wheelFrontR_47 = makeAttachmentEndpoint(attachment_wheelFrontR_47);
  const node_wheelFrontR_47 = new THREE.Group();
  node_wheelFrontR_47.name = "Front wheel + tyre (right)__pivot";
  node_wheelFrontR_47.scale.set(1, 1, 1);
  if (endpoint_wheelFrontR_47) {
    node_wheelFrontR_47.position.copy(endpoint_wheelFrontR_47.start);
    node_wheelFrontR_47.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_wheelFrontR_47.position.set(-1.06, -0.27, 1.75);
    node_wheelFrontR_47.rotation.set(0.0, 0.0, 0.0);
  }
  node_wheelFrontR_47.userData.sculptComponent = {"id": "wheelFrontR", "name": "Front wheel + tyre (right)", "level": "meso", "role": "wheel", "importance": 0.85, "confidence": 0.7, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front wheel + tyre (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "wheelFrontAxleR", "localStart": [-0.98, -0.27, 1.75], "localEnd": [-1.3, -0.27, 1.75], "baseRadius": 0.53, "endRadius": 0.53, "contactType": "pivot-hinge", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.06, "height": 0.32, "depth": 1.06, "units": "relative", "confidence": 0.7}, "transform": {"position": [-1.06, -0.27, 1.75], "rotation": [0, 0, 0]}, "material": "tyreRubber", "materialLayers": ["tyreRubber"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(24, 24, 26, 1.0)", "secondaryAlbedo": "rgba(32, 32, 34, 1.0)", "materialClass": "rubber", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Matte black rubber."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.9, "microRoughness": 0.3, "bumpAmplitude": 0.0, "tread": "tread blocks not visible at web distance", "aoLocality": "contact shadow under every tyre", "evidence": ["front-3q-left"]}};
  node_wheelFrontR_47.userData.actionProfile = {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_wheelFrontR_47);
  nodes["wheelFrontR"] = node_wheelFrontR_47;
  const mesh_wheelFrontR_47Geometry = endpoint_wheelFrontR_47
    ? new THREE.CylinderGeometry(endpoint_wheelFrontR_47.endRadius, endpoint_wheelFrontR_47.baseRadius, endpoint_wheelFrontR_47.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_wheelFrontR_47) {
    mesh_wheelFrontR_47Geometry.scale(1.06, 0.32, 1.06);
  }
  const mesh_wheelFrontR_47 = new THREE.Mesh(
    mesh_wheelFrontR_47Geometry,
    materialMap["tyreRubber"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_wheelFrontR_47.name = "Front wheel + tyre (right)";
  if (endpoint_wheelFrontR_47) {
    mesh_wheelFrontR_47.position.copy(endpoint_wheelFrontR_47.midpoint);
    mesh_wheelFrontR_47.quaternion.copy(endpoint_wheelFrontR_47.quaternion);
  }
  mesh_wheelFrontR_47.castShadow = options.castShadow ?? true;
  mesh_wheelFrontR_47.receiveShadow = options.receiveShadow ?? true;
  mesh_wheelFrontR_47.userData.sculptComponent = {"id": "wheelFrontR", "name": "Front wheel + tyre (right)", "level": "meso", "role": "wheel", "importance": 0.85, "confidence": 0.7, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front wheel + tyre (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "wheelFrontAxleR", "localStart": [-0.98, -0.27, 1.75], "localEnd": [-1.3, -0.27, 1.75], "baseRadius": 0.53, "endRadius": 0.53, "contactType": "pivot-hinge", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.06, "height": 0.32, "depth": 1.06, "units": "relative", "confidence": 0.7}, "transform": {"position": [-1.06, -0.27, 1.75], "rotation": [0, 0, 0]}, "material": "tyreRubber", "materialLayers": ["tyreRubber"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(24, 24, 26, 1.0)", "secondaryAlbedo": "rgba(32, 32, 34, 1.0)", "materialClass": "rubber", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Matte black rubber."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.9, "microRoughness": 0.3, "bumpAmplitude": 0.0, "tread": "tread blocks not visible at web distance", "aoLocality": "contact shadow under every tyre", "evidence": ["front-3q-left"]}};
  node_wheelFrontR_47.add(mesh_wheelFrontR_47);
  meshes["wheelFrontR"] = mesh_wheelFrontR_47;
  colliders["wheelFrontR"] = {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_wheelRearR_48 = {"parentId": "root", "parentSocket": "wheelRearAxleR", "localStart": [-0.7, -0.27, -1.7], "localEnd": [-1.3, -0.27, -1.7], "baseRadius": 0.53, "endRadius": 0.53, "contactType": "pivot-hinge", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_wheelRearR_48 = makeAttachmentEndpoint(attachment_wheelRearR_48);
  const node_wheelRearR_48 = new THREE.Group();
  node_wheelRearR_48.name = "Rear twin wheel (right)__pivot";
  node_wheelRearR_48.scale.set(1, 1, 1);
  if (endpoint_wheelRearR_48) {
    node_wheelRearR_48.position.copy(endpoint_wheelRearR_48.start);
    node_wheelRearR_48.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_wheelRearR_48.position.set(-1.0, -0.27, -1.7);
    node_wheelRearR_48.rotation.set(0.0, 0.0, 0.0);
  }
  node_wheelRearR_48.userData.sculptComponent = {"id": "wheelRearR", "name": "Rear twin wheel (right)", "level": "meso", "role": "wheel", "importance": 0.75, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear twin wheel (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "wheelRearAxleR", "localStart": [-0.7, -0.27, -1.7], "localEnd": [-1.3, -0.27, -1.7], "baseRadius": 0.53, "endRadius": 0.53, "contactType": "pivot-hinge", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.06, "height": 0.6, "depth": 1.06, "units": "relative", "confidence": 0.55}, "transform": {"position": [-1.0, -0.27, -1.7], "rotation": [0, 0, 0]}, "material": "tyreRubber", "materialLayers": ["tyreRubber"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(24, 24, 26, 1.0)", "secondaryAlbedo": "rgba(32, 32, 34, 1.0)", "materialClass": "rubber", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Matte black rubber."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.9, "microRoughness": 0.3, "bumpAmplitude": 0.0, "aoLocality": "contact shadow under every tyre", "evidence": ["front-3q-left"]}};
  node_wheelRearR_48.userData.actionProfile = {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_wheelRearR_48);
  nodes["wheelRearR"] = node_wheelRearR_48;
  const mesh_wheelRearR_48Geometry = endpoint_wheelRearR_48
    ? new THREE.CylinderGeometry(endpoint_wheelRearR_48.endRadius, endpoint_wheelRearR_48.baseRadius, endpoint_wheelRearR_48.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_wheelRearR_48) {
    mesh_wheelRearR_48Geometry.scale(1.06, 0.6, 1.06);
  }
  const mesh_wheelRearR_48 = new THREE.Mesh(
    mesh_wheelRearR_48Geometry,
    materialMap["tyreRubber"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_wheelRearR_48.name = "Rear twin wheel (right)";
  if (endpoint_wheelRearR_48) {
    mesh_wheelRearR_48.position.copy(endpoint_wheelRearR_48.midpoint);
    mesh_wheelRearR_48.quaternion.copy(endpoint_wheelRearR_48.quaternion);
  }
  mesh_wheelRearR_48.castShadow = options.castShadow ?? true;
  mesh_wheelRearR_48.receiveShadow = options.receiveShadow ?? true;
  mesh_wheelRearR_48.userData.sculptComponent = {"id": "wheelRearR", "name": "Rear twin wheel (right)", "level": "meso", "role": "wheel", "importance": 0.75, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear twin wheel (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "wheelRearAxleR", "localStart": [-0.7, -0.27, -1.7], "localEnd": [-1.3, -0.27, -1.7], "baseRadius": 0.53, "endRadius": 0.53, "contactType": "pivot-hinge", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 1.06, "height": 0.6, "depth": 1.06, "units": "relative", "confidence": 0.55}, "transform": {"position": [-1.0, -0.27, -1.7], "rotation": [0, 0, 0]}, "material": "tyreRubber", "materialLayers": ["tyreRubber"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(24, 24, 26, 1.0)", "secondaryAlbedo": "rgba(32, 32, 34, 1.0)", "materialClass": "rubber", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Matte black rubber."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"], "surfaceDetail": {"macroRoughness": 0.9, "microRoughness": 0.3, "bumpAmplitude": 0.0, "aoLocality": "contact shadow under every tyre", "evidence": ["front-3q-left"]}};
  node_wheelRearR_48.add(mesh_wheelRearR_48);
  meshes["wheelRearR"] = mesh_wheelRearR_48;
  colliders["wheelRearR"] = {"type": "cylinder", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_fenderRearR_49 = makeAttachmentEndpoint(null);
  const node_fenderRearR_49 = new THREE.Group();
  node_fenderRearR_49.name = "Rear mudguard (right)__pivot";
  node_fenderRearR_49.scale.set(1, 1, 1);
  if (endpoint_fenderRearR_49) {
    node_fenderRearR_49.position.copy(endpoint_fenderRearR_49.start);
    node_fenderRearR_49.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_fenderRearR_49.position.set(-1.0, 0.35, -1.7);
    node_fenderRearR_49.rotation.set(0.0, 0.0, 0.0);
  }
  node_fenderRearR_49.userData.sculptComponent = {"id": "fenderRearR", "name": "Rear mudguard (right)", "level": "meso", "role": "fender", "importance": 0.45, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear mudguard (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurfaceR", "localStart": [1.0, 0.35, -1.7], "localEnd": [1.0, 0.35, -1.7], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.66, "height": 0.07, "depth": 1.35, "units": "relative", "confidence": 0.5}, "transform": {"position": [-1.0, 0.35, -1.7], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_fenderRearR_49.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_fenderRearR_49);
  nodes["fenderRearR"] = node_fenderRearR_49;
  const mesh_fenderRearR_49Geometry = endpoint_fenderRearR_49
    ? new THREE.CylinderGeometry(endpoint_fenderRearR_49.endRadius, endpoint_fenderRearR_49.baseRadius, endpoint_fenderRearR_49.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_fenderRearR_49) {
    mesh_fenderRearR_49Geometry.scale(0.66, 0.07, 1.35);
  }
  const mesh_fenderRearR_49 = new THREE.Mesh(
    mesh_fenderRearR_49Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_fenderRearR_49.name = "Rear mudguard (right)";
  if (endpoint_fenderRearR_49) {
    mesh_fenderRearR_49.position.copy(endpoint_fenderRearR_49.midpoint);
    mesh_fenderRearR_49.quaternion.copy(endpoint_fenderRearR_49.quaternion);
  }
  mesh_fenderRearR_49.castShadow = options.castShadow ?? true;
  mesh_fenderRearR_49.receiveShadow = options.receiveShadow ?? true;
  mesh_fenderRearR_49.userData.sculptComponent = {"id": "fenderRearR", "name": "Rear mudguard (right)", "level": "meso", "role": "fender", "importance": 0.45, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear mudguard (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurfaceR", "localStart": [1.0, 0.35, -1.7], "localEnd": [1.0, 0.35, -1.7], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.66, "height": 0.07, "depth": 1.35, "units": "relative", "confidence": 0.5}, "transform": {"position": [-1.0, 0.35, -1.7], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_fenderRearR_49.add(mesh_fenderRearR_49);
  meshes["fenderRearR"] = mesh_fenderRearR_49;
  colliders["fenderRearR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_fuelTankR_50 = makeAttachmentEndpoint(null);
  const node_fuelTankR_50 = new THREE.Group();
  node_fuelTankR_50.name = "Battery / AdBlue box (right)__pivot";
  node_fuelTankR_50.scale.set(1, 1, 1);
  if (endpoint_fuelTankR_50) {
    node_fuelTankR_50.position.copy(endpoint_fuelTankR_50.start);
    node_fuelTankR_50.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_fuelTankR_50.position.set(-0.8, -0.08, 0.15);
    node_fuelTankR_50.rotation.set(0.0, 0.0, 0.0);
  }
  node_fuelTankR_50.userData.sculptComponent = {"id": "fuelTankR", "name": "Battery / AdBlue box (right)", "level": "meso", "role": "tank", "importance": 0.45, "confidence": 0.45, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Fuel tank (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.12, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurfaceR", "localStart": [0.8, -0.08, 0.15], "localEnd": [0.8, -0.08, 0.15], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.55, "height": 0.55, "depth": 1.2, "units": "relative", "confidence": 0.45}, "transform": {"position": [-0.8, -0.08, 0.15], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_fuelTankR_50.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_fuelTankR_50);
  nodes["fuelTankR"] = node_fuelTankR_50;
  const mesh_fuelTankR_50Geometry = endpoint_fuelTankR_50
    ? new THREE.CylinderGeometry(endpoint_fuelTankR_50.endRadius, endpoint_fuelTankR_50.baseRadius, endpoint_fuelTankR_50.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_fuelTankR_50) {
    mesh_fuelTankR_50Geometry.scale(0.55, 0.55, 1.2);
  }
  const mesh_fuelTankR_50 = new THREE.Mesh(
    mesh_fuelTankR_50Geometry,
    materialMap["paintSilver"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_fuelTankR_50.name = "Battery / AdBlue box (right)";
  if (endpoint_fuelTankR_50) {
    mesh_fuelTankR_50.position.copy(endpoint_fuelTankR_50.midpoint);
    mesh_fuelTankR_50.quaternion.copy(endpoint_fuelTankR_50.quaternion);
  }
  mesh_fuelTankR_50.castShadow = options.castShadow ?? true;
  mesh_fuelTankR_50.receiveShadow = options.receiveShadow ?? true;
  mesh_fuelTankR_50.userData.sculptComponent = {"id": "fuelTankR", "name": "Battery / AdBlue box (right)", "level": "meso", "role": "tank", "importance": 0.45, "confidence": 0.45, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Fuel tank (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.12, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurfaceR", "localStart": [0.8, -0.08, 0.15], "localEnd": [0.8, -0.08, 0.15], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.55, "height": 0.55, "depth": 1.2, "units": "relative", "confidence": 0.45}, "transform": {"position": [-0.8, -0.08, 0.15], "rotation": [0, 0, 0]}, "material": "paintSilver", "materialLayers": ["paintSilver"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(185, 189, 194, 1.0)", "secondaryAlbedo": "rgba(212, 215, 219, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Light cool grey metallic read from mid-tone cab front panel pixels, discounting sky reflection on the upper panels."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_fuelTankR_50.add(mesh_fuelTankR_50);
  meshes["fuelTankR"] = mesh_fuelTankR_50;
  colliders["fuelTankR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_stepBoxR_51 = makeAttachmentEndpoint(null);
  const node_stepBoxR_51 = new THREE.Group();
  node_stepBoxR_51.name = "Entry step box behind the front wheel (right)__pivot";
  node_stepBoxR_51.scale.set(1, 1, 1);
  if (endpoint_stepBoxR_51) {
    node_stepBoxR_51.position.copy(endpoint_stepBoxR_51.start);
    node_stepBoxR_51.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_stepBoxR_51.position.set(-1.05, -0.02, 0.98);
    node_stepBoxR_51.rotation.set(0.0, 0.0, 0.0);
  }
  node_stepBoxR_51.userData.sculptComponent = {"id": "stepBoxR", "name": "Entry step box behind the front wheel (right)", "level": "meso", "role": "step", "importance": 0.5, "confidence": 0.55, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Entry step box behind the front wheel (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurfaceR", "localStart": [1.05, -0.02, 0.98], "localEnd": [1.05, -0.02, 0.98], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.4, "height": 0.72, "depth": 0.5, "units": "relative", "confidence": 0.55}, "transform": {"position": [-1.05, -0.02, 0.98], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "stepOpeningsR", "description": "Two dark step openings stacked in the box (components stepTread, stepTread2).", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_stepBoxR_51.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["root"] ?? root).add(node_stepBoxR_51);
  nodes["stepBoxR"] = node_stepBoxR_51;
  const mesh_stepBoxR_51Geometry = endpoint_stepBoxR_51
    ? new THREE.CylinderGeometry(endpoint_stepBoxR_51.endRadius, endpoint_stepBoxR_51.baseRadius, endpoint_stepBoxR_51.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_stepBoxR_51) {
    mesh_stepBoxR_51Geometry.scale(0.4, 0.72, 0.5);
  }
  const mesh_stepBoxR_51 = new THREE.Mesh(
    mesh_stepBoxR_51Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_stepBoxR_51.name = "Entry step box behind the front wheel (right)";
  if (endpoint_stepBoxR_51) {
    mesh_stepBoxR_51.position.copy(endpoint_stepBoxR_51.midpoint);
    mesh_stepBoxR_51.quaternion.copy(endpoint_stepBoxR_51.quaternion);
  }
  mesh_stepBoxR_51.castShadow = options.castShadow ?? true;
  mesh_stepBoxR_51.receiveShadow = options.receiveShadow ?? true;
  mesh_stepBoxR_51.userData.sculptComponent = {"id": "stepBoxR", "name": "Entry step box behind the front wheel (right)", "level": "meso", "role": "step", "importance": 0.5, "confidence": 0.55, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Entry step box behind the front wheel (left)", "edgeTreatment": {"type": "rounded", "bevelRadius": 0.03, "segments": 3}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "root", "attachment": {"parentId": "root", "parentSocket": "rootSurfaceR", "localStart": [1.05, -0.02, 0.98], "localEnd": [1.05, -0.02, 0.98], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.4, "height": 0.72, "depth": 0.5, "units": "relative", "confidence": 0.55}, "transform": {"position": [-1.05, -0.02, 0.98], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "stepOpeningsR", "description": "Two dark step openings stacked in the box (components stepTread, stepTread2).", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_stepBoxR_51.add(mesh_stepBoxR_51);
  meshes["stepBoxR"] = mesh_stepBoxR_51;
  colliders["stepBoxR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_rimFrontR_52 = {"parentId": "wheelFrontR", "parentSocket": "wheelFrontHubR", "localStart": [-0.29, 0, 0], "localEnd": [-0.335, 0, 0], "baseRadius": 0.31, "endRadius": 0.31, "contactType": "flush-mount", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_rimFrontR_52 = makeAttachmentEndpoint(attachment_rimFrontR_52);
  const node_rimFrontR_52 = new THREE.Group();
  node_rimFrontR_52.name = "Front rim face (right)__pivot";
  node_rimFrontR_52.scale.set(1, 1, 1);
  if (endpoint_rimFrontR_52) {
    node_rimFrontR_52.position.copy(endpoint_rimFrontR_52.start);
    node_rimFrontR_52.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_rimFrontR_52.position.set(-0.28, 0.0, 0.0);
    node_rimFrontR_52.rotation.set(0.0, 0.0, 0.0);
  }
  node_rimFrontR_52.userData.sculptComponent = {"id": "rimFrontR", "name": "Front rim face (right)", "level": "micro", "role": "rim", "importance": 0.6, "confidence": 0.6, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front rim face (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelFrontR", "attachment": {"parentId": "wheelFrontR", "parentSocket": "wheelFrontHubR", "localStart": [-0.29, 0, 0], "localEnd": [-0.335, 0, 0], "baseRadius": 0.31, "endRadius": 0.31, "contactType": "flush-mount", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.62, "height": 0.04, "depth": 0.62, "units": "relative", "confidence": 0.6}, "transform": {"position": [-0.28, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "alloyRim", "materialLayers": ["alloyRim"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(46, 47, 52, 1.0)", "secondaryAlbedo": "rgba(69, 71, 77, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Black-grey steel wheel with bright wheel nuts; verified crop shows the dark rim face."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_rimFrontR_52.userData.actionProfile = {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["wheelFrontR"] ?? root).add(node_rimFrontR_52);
  nodes["rimFrontR"] = node_rimFrontR_52;
  const mesh_rimFrontR_52Geometry = endpoint_rimFrontR_52
    ? new THREE.CylinderGeometry(endpoint_rimFrontR_52.endRadius, endpoint_rimFrontR_52.baseRadius, endpoint_rimFrontR_52.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_rimFrontR_52) {
    mesh_rimFrontR_52Geometry.scale(0.62, 0.04, 0.62);
  }
  const mesh_rimFrontR_52 = new THREE.Mesh(
    mesh_rimFrontR_52Geometry,
    materialMap["alloyRim"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_rimFrontR_52.name = "Front rim face (right)";
  if (endpoint_rimFrontR_52) {
    mesh_rimFrontR_52.position.copy(endpoint_rimFrontR_52.midpoint);
    mesh_rimFrontR_52.quaternion.copy(endpoint_rimFrontR_52.quaternion);
  }
  mesh_rimFrontR_52.castShadow = options.castShadow ?? true;
  mesh_rimFrontR_52.receiveShadow = options.receiveShadow ?? true;
  mesh_rimFrontR_52.userData.sculptComponent = {"id": "rimFrontR", "name": "Front rim face (right)", "level": "micro", "role": "rim", "importance": 0.6, "confidence": 0.6, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front rim face (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelFrontR", "attachment": {"parentId": "wheelFrontR", "parentSocket": "wheelFrontHubR", "localStart": [-0.29, 0, 0], "localEnd": [-0.335, 0, 0], "baseRadius": 0.31, "endRadius": 0.31, "contactType": "flush-mount", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.62, "height": 0.04, "depth": 0.62, "units": "relative", "confidence": 0.6}, "transform": {"position": [-0.28, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "alloyRim", "materialLayers": ["alloyRim"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(46, 47, 52, 1.0)", "secondaryAlbedo": "rgba(69, 71, 77, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Black-grey steel wheel with bright wheel nuts; verified crop shows the dark rim face."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_rimFrontR_52.add(mesh_rimFrontR_52);
  meshes["rimFrontR"] = mesh_rimFrontR_52;
  colliders["rimFrontR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_rimRearR_53 = {"parentId": "wheelRearR", "parentSocket": "wheelRearHubR", "localStart": [-0.57, 0, 0], "localEnd": [-0.615, 0, 0], "baseRadius": 0.31, "endRadius": 0.31, "contactType": "flush-mount", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_rimRearR_53 = makeAttachmentEndpoint(attachment_rimRearR_53);
  const node_rimRearR_53 = new THREE.Group();
  node_rimRearR_53.name = "Rear rim face (right)__pivot";
  node_rimRearR_53.scale.set(1, 1, 1);
  if (endpoint_rimRearR_53) {
    node_rimRearR_53.position.copy(endpoint_rimRearR_53.start);
    node_rimRearR_53.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_rimRearR_53.position.set(-0.32, 0.0, 0.0);
    node_rimRearR_53.rotation.set(0.0, 0.0, 0.0);
  }
  node_rimRearR_53.userData.sculptComponent = {"id": "rimRearR", "name": "Rear rim face (right)", "level": "micro", "role": "rim", "importance": 0.5, "confidence": 0.5, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear rim face (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelRearR", "attachment": {"parentId": "wheelRearR", "parentSocket": "wheelRearHubR", "localStart": [-0.57, 0, 0], "localEnd": [-0.615, 0, 0], "baseRadius": 0.31, "endRadius": 0.31, "contactType": "flush-mount", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.62, "height": 0.04, "depth": 0.62, "units": "relative", "confidence": 0.5}, "transform": {"position": [-0.32, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "alloyRim", "materialLayers": ["alloyRim"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(46, 47, 52, 1.0)", "secondaryAlbedo": "rgba(69, 71, 77, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Black-grey steel wheel with bright wheel nuts; verified crop shows the dark rim face."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_rimRearR_53.userData.actionProfile = {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["wheelRearR"] ?? root).add(node_rimRearR_53);
  nodes["rimRearR"] = node_rimRearR_53;
  const mesh_rimRearR_53Geometry = endpoint_rimRearR_53
    ? new THREE.CylinderGeometry(endpoint_rimRearR_53.endRadius, endpoint_rimRearR_53.baseRadius, endpoint_rimRearR_53.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_rimRearR_53) {
    mesh_rimRearR_53Geometry.scale(0.62, 0.04, 0.62);
  }
  const mesh_rimRearR_53 = new THREE.Mesh(
    mesh_rimRearR_53Geometry,
    materialMap["alloyRim"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_rimRearR_53.name = "Rear rim face (right)";
  if (endpoint_rimRearR_53) {
    mesh_rimRearR_53.position.copy(endpoint_rimRearR_53.midpoint);
    mesh_rimRearR_53.quaternion.copy(endpoint_rimRearR_53.quaternion);
  }
  mesh_rimRearR_53.castShadow = options.castShadow ?? true;
  mesh_rimRearR_53.receiveShadow = options.receiveShadow ?? true;
  mesh_rimRearR_53.userData.sculptComponent = {"id": "rimRearR", "name": "Rear rim face (right)", "level": "micro", "role": "rim", "importance": 0.5, "confidence": 0.5, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear rim face (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelRearR", "attachment": {"parentId": "wheelRearR", "parentSocket": "wheelRearHubR", "localStart": [-0.57, 0, 0], "localEnd": [-0.615, 0, 0], "baseRadius": 0.31, "endRadius": 0.31, "contactType": "flush-mount", "embedDepth": 0.03, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.62, "height": 0.04, "depth": 0.62, "units": "relative", "confidence": 0.5}, "transform": {"position": [-0.32, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "alloyRim", "materialLayers": ["alloyRim"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(46, 47, 52, 1.0)", "secondaryAlbedo": "rgba(69, 71, 77, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Black-grey steel wheel with bright wheel nuts; verified crop shows the dark rim face."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_rimRearR_53.add(mesh_rimRearR_53);
  meshes["rimRearR"] = mesh_rimRearR_53;
  colliders["rimRearR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_hubFrontR_54 = {"parentId": "wheelFrontR", "parentSocket": "wheelFrontHubR", "localStart": [-0.335, 0, 0], "localEnd": [-0.385, 0, 0], "baseRadius": 0.12, "endRadius": 0.1, "contactType": "flush-mount", "embedDepth": 0.01, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_hubFrontR_54 = makeAttachmentEndpoint(attachment_hubFrontR_54);
  const node_hubFrontR_54 = new THREE.Group();
  node_hubFrontR_54.name = "Front hub cap (right)__pivot";
  node_hubFrontR_54.scale.set(1, 1, 1);
  if (endpoint_hubFrontR_54) {
    node_hubFrontR_54.position.copy(endpoint_hubFrontR_54.start);
    node_hubFrontR_54.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_hubFrontR_54.position.set(-0.255, 0.0, 0.0);
    node_hubFrontR_54.rotation.set(0.0, 0.0, 0.0);
  }
  node_hubFrontR_54.userData.sculptComponent = {"id": "hubFrontR", "name": "Front hub cap (right)", "level": "micro", "role": "hub", "importance": 0.5, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front hub cap (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelFrontR", "attachment": {"parentId": "wheelFrontR", "parentSocket": "wheelFrontHubR", "localStart": [-0.335, 0, 0], "localEnd": [-0.385, 0, 0], "baseRadius": 0.12, "endRadius": 0.1, "contactType": "flush-mount", "embedDepth": 0.01, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.24, "height": 0.05, "depth": 0.24, "units": "relative", "confidence": 0.55}, "transform": {"position": [-0.255, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "handHolesFrontR", "description": "Ring of ten dark hand-holes around the hub (repetition system), which makes wheel spin visible.", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_hubFrontR_54.userData.actionProfile = {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["wheelFrontR"] ?? root).add(node_hubFrontR_54);
  nodes["hubFrontR"] = node_hubFrontR_54;
  const mesh_hubFrontR_54Geometry = endpoint_hubFrontR_54
    ? new THREE.CylinderGeometry(endpoint_hubFrontR_54.endRadius, endpoint_hubFrontR_54.baseRadius, endpoint_hubFrontR_54.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_hubFrontR_54) {
    mesh_hubFrontR_54Geometry.scale(0.24, 0.05, 0.24);
  }
  const mesh_hubFrontR_54 = new THREE.Mesh(
    mesh_hubFrontR_54Geometry,
    materialMap["chromeBright"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_hubFrontR_54.name = "Front hub cap (right)";
  if (endpoint_hubFrontR_54) {
    mesh_hubFrontR_54.position.copy(endpoint_hubFrontR_54.midpoint);
    mesh_hubFrontR_54.quaternion.copy(endpoint_hubFrontR_54.quaternion);
  }
  mesh_hubFrontR_54.castShadow = options.castShadow ?? true;
  mesh_hubFrontR_54.receiveShadow = options.receiveShadow ?? true;
  mesh_hubFrontR_54.userData.sculptComponent = {"id": "hubFrontR", "name": "Front hub cap (right)", "level": "micro", "role": "hub", "importance": 0.5, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Front hub cap (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelFrontR", "attachment": {"parentId": "wheelFrontR", "parentSocket": "wheelFrontHubR", "localStart": [-0.335, 0, 0], "localEnd": [-0.385, 0, 0], "baseRadius": 0.12, "endRadius": 0.1, "contactType": "flush-mount", "embedDepth": 0.01, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.24, "height": 0.05, "depth": 0.24, "units": "relative", "confidence": 0.55}, "transform": {"position": [-0.255, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "handHolesFrontR", "description": "Ring of ten dark hand-holes around the hub (repetition system), which makes wheel spin visible.", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_hubFrontR_54.add(mesh_hubFrontR_54);
  meshes["hubFrontR"] = mesh_hubFrontR_54;
  colliders["hubFrontR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const attachment_hubRearR_55 = {"parentId": "wheelRearR", "parentSocket": "wheelRearHubR", "localStart": [-0.615, 0, 0], "localEnd": [-0.665, 0, 0], "baseRadius": 0.12, "endRadius": 0.1, "contactType": "flush-mount", "embedDepth": 0.01, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]};
  const endpoint_hubRearR_55 = makeAttachmentEndpoint(attachment_hubRearR_55);
  const node_hubRearR_55 = new THREE.Group();
  node_hubRearR_55.name = "Rear hub cap (right)__pivot";
  node_hubRearR_55.scale.set(1, 1, 1);
  if (endpoint_hubRearR_55) {
    node_hubRearR_55.position.copy(endpoint_hubRearR_55.start);
    node_hubRearR_55.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_hubRearR_55.position.set(-0.295, 0.0, 0.0);
    node_hubRearR_55.rotation.set(0.0, 0.0, 0.0);
  }
  node_hubRearR_55.userData.sculptComponent = {"id": "hubRearR", "name": "Rear hub cap (right)", "level": "micro", "role": "hub", "importance": 0.5, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear hub cap (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelRearR", "attachment": {"parentId": "wheelRearR", "parentSocket": "wheelRearHubR", "localStart": [-0.615, 0, 0], "localEnd": [-0.665, 0, 0], "baseRadius": 0.12, "endRadius": 0.1, "contactType": "flush-mount", "embedDepth": 0.01, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.24, "height": 0.05, "depth": 0.24, "units": "relative", "confidence": 0.55}, "transform": {"position": [-0.295, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "handHolesRearR", "description": "Ring of ten dark hand-holes around the hub (repetition system), which makes wheel spin visible.", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_hubRearR_55.userData.actionProfile = {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["wheelRearR"] ?? root).add(node_hubRearR_55);
  nodes["hubRearR"] = node_hubRearR_55;
  const mesh_hubRearR_55Geometry = endpoint_hubRearR_55
    ? new THREE.CylinderGeometry(endpoint_hubRearR_55.endRadius, endpoint_hubRearR_55.baseRadius, endpoint_hubRearR_55.length, 16, 6)
    : new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 8);
  if (!endpoint_hubRearR_55) {
    mesh_hubRearR_55Geometry.scale(0.24, 0.05, 0.24);
  }
  const mesh_hubRearR_55 = new THREE.Mesh(
    mesh_hubRearR_55Geometry,
    materialMap["chromeBright"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_hubRearR_55.name = "Rear hub cap (right)";
  if (endpoint_hubRearR_55) {
    mesh_hubRearR_55.position.copy(endpoint_hubRearR_55.midpoint);
    mesh_hubRearR_55.quaternion.copy(endpoint_hubRearR_55.quaternion);
  }
  mesh_hubRearR_55.castShadow = options.castShadow ?? true;
  mesh_hubRearR_55.receiveShadow = options.receiveShadow ?? true;
  mesh_hubRearR_55.userData.sculptComponent = {"id": "hubRearR", "name": "Rear hub cap (right)", "level": "micro", "role": "hub", "importance": 0.5, "confidence": 0.55, "primitive": "cylinder", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Rear hub cap (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "wheelRearR", "attachment": {"parentId": "wheelRearR", "parentSocket": "wheelRearHubR", "localStart": [-0.615, 0, 0], "localEnd": [-0.665, 0, 0], "baseRadius": 0.12, "endRadius": 0.1, "contactType": "flush-mount", "embedDepth": 0.01, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.24, "height": 0.05, "depth": 0.24, "units": "relative", "confidence": 0.55}, "transform": {"position": [-0.295, 0.0, 0.0], "rotation": [0, 0, 0]}, "material": "chromeBright", "materialLayers": ["chromeBright"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(216, 218, 222, 1.0)", "secondaryAlbedo": "rgba(242, 243, 245, 1.0)", "materialClass": "metal", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Mirror-bright chrome on the star and grille slat edges."}, "actionProfile": {"animationRole": "rotate-wheel", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [1, 0, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [{"id": "handHolesRearR", "description": "Ring of ten dark hand-holes around the hub (repetition system), which makes wheel spin visible.", "confidence": 0.55, "level": "micro", "evidence": ["front-3q-left"]}], "evidenceRefs": ["front-3q-left"]};
  node_hubRearR_55.add(mesh_hubRearR_55);
  meshes["hubRearR"] = mesh_hubRearR_55;
  colliders["hubRearR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_stepTreadR_56 = makeAttachmentEndpoint(null);
  const node_stepTreadR_56 = new THREE.Group();
  node_stepTreadR_56.name = "Entry step tread (right, repetition template)__pivot";
  node_stepTreadR_56.scale.set(1, 1, 1);
  if (endpoint_stepTreadR_56) {
    node_stepTreadR_56.position.copy(endpoint_stepTreadR_56.start);
    node_stepTreadR_56.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_stepTreadR_56.position.set(-1.12, -0.56, -0.75);
    node_stepTreadR_56.rotation.set(0.0, 0.0, 0.0);
  }
  node_stepTreadR_56.userData.sculptComponent = {"id": "stepTreadR", "name": "Entry step tread (right, repetition template)", "level": "micro", "role": "step", "importance": 0.35, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Entry step tread (left, repetition template)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurfaceR", "localStart": [1.12, -0.56, -0.75], "localEnd": [1.12, -0.56, -0.75], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.3, "height": 0.05, "depth": 0.5, "units": "relative", "confidence": 0.5}, "transform": {"position": [-1.12, -0.56, -0.75], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_stepTreadR_56.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_stepTreadR_56);
  nodes["stepTreadR"] = node_stepTreadR_56;
  const mesh_stepTreadR_56Geometry = endpoint_stepTreadR_56
    ? new THREE.CylinderGeometry(endpoint_stepTreadR_56.endRadius, endpoint_stepTreadR_56.baseRadius, endpoint_stepTreadR_56.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_stepTreadR_56) {
    mesh_stepTreadR_56Geometry.scale(0.3, 0.05, 0.5);
  }
  const mesh_stepTreadR_56 = new THREE.Mesh(
    mesh_stepTreadR_56Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_stepTreadR_56.name = "Entry step tread (right, repetition template)";
  if (endpoint_stepTreadR_56) {
    mesh_stepTreadR_56.position.copy(endpoint_stepTreadR_56.midpoint);
    mesh_stepTreadR_56.quaternion.copy(endpoint_stepTreadR_56.quaternion);
  }
  mesh_stepTreadR_56.castShadow = options.castShadow ?? true;
  mesh_stepTreadR_56.receiveShadow = options.receiveShadow ?? true;
  mesh_stepTreadR_56.userData.sculptComponent = {"id": "stepTreadR", "name": "Entry step tread (right, repetition template)", "level": "micro", "role": "step", "importance": 0.35, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Entry step tread (left, repetition template)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurfaceR", "localStart": [1.12, -0.56, -0.75], "localEnd": [1.12, -0.56, -0.75], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.3, "height": 0.05, "depth": 0.5, "units": "relative", "confidence": 0.5}, "transform": {"position": [-1.12, -0.56, -0.75], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_stepTreadR_56.add(mesh_stepTreadR_56);
  meshes["stepTreadR"] = mesh_stepTreadR_56;
  colliders["stepTreadR"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};

  const endpoint_stepTread2R_57 = makeAttachmentEndpoint(null);
  const node_stepTread2R_57 = new THREE.Group();
  node_stepTread2R_57.name = "Entry step tread, upper (right)__pivot";
  node_stepTread2R_57.scale.set(1, 1, 1);
  if (endpoint_stepTread2R_57) {
    node_stepTread2R_57.position.copy(endpoint_stepTread2R_57.start);
    node_stepTread2R_57.rotation.set(0.0, 0.0, 0.0);
  } else {
    node_stepTread2R_57.position.set(-1.12, -0.18, -0.75);
    node_stepTread2R_57.rotation.set(0.0, 0.0, 0.0);
  }
  node_stepTread2R_57.userData.sculptComponent = {"id": "stepTread2R", "name": "Entry step tread, upper (right)", "level": "micro", "role": "step", "importance": 0.3, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Entry step tread, upper (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurfaceR", "localStart": [1.12, -0.18, -0.75], "localEnd": [1.12, -0.18, -0.75], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.3, "height": 0.05, "depth": 0.5, "units": "relative", "confidence": 0.5}, "transform": {"position": [-1.12, -0.18, -0.75], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_stepTread2R_57.userData.actionProfile = {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}};
  (nodes["cabShell"] ?? root).add(node_stepTread2R_57);
  nodes["stepTread2R"] = node_stepTread2R_57;
  const mesh_stepTread2R_57Geometry = endpoint_stepTread2R_57
    ? new THREE.CylinderGeometry(endpoint_stepTread2R_57.endRadius, endpoint_stepTread2R_57.baseRadius, endpoint_stepTread2R_57.length, 16, 6)
    : new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
  if (!endpoint_stepTread2R_57) {
    mesh_stepTread2R_57Geometry.scale(0.3, 0.05, 0.5);
  }
  const mesh_stepTread2R_57 = new THREE.Mesh(
    mesh_stepTread2R_57Geometry,
    materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  mesh_stepTread2R_57.name = "Entry step tread, upper (right)";
  if (endpoint_stepTread2R_57) {
    mesh_stepTread2R_57.position.copy(endpoint_stepTread2R_57.midpoint);
    mesh_stepTread2R_57.quaternion.copy(endpoint_stepTread2R_57.quaternion);
  }
  mesh_stepTread2R_57.castShadow = options.castShadow ?? true;
  mesh_stepTread2R_57.receiveShadow = options.receiveShadow ?? true;
  mesh_stepTread2R_57.userData.sculptComponent = {"id": "stepTread2R", "name": "Entry step tread, upper (right)", "level": "micro", "role": "step", "importance": 0.3, "confidence": 0.5, "primitive": "box", "topologyClass": "assembled-solid", "topologyRationale": "Rigid manufactured part assembled onto the vehicle; hard-surface, not a continuous organic surface.", "geometryDescriptor": {"topologyIntent": "Entry step tread, upper (left)", "edgeTreatment": {"type": "hard", "bevelRadius": 0.0, "segments": 1}, "deformationStack": [], "uvStrategy": "generated procedural coordinates", "normalStrategy": "vertex normals from generated geometry"}, "parent": "cabShell", "attachment": {"parentId": "cabShell", "parentSocket": "cabShellSurfaceR", "localStart": [1.12, -0.18, -0.75], "localEnd": [1.12, -0.18, -0.75], "contactType": "flush-mount", "embedDepth": 0.02, "gapTolerance": 0.005, "evidenceRefs": ["front-3q-left"]}, "dimensions": {"width": 0.3, "height": 0.05, "depth": 0.5, "units": "relative", "confidence": 0.5}, "transform": {"position": [-1.12, -0.18, -0.75], "rotation": [0, 0, 0]}, "material": "trimBlack", "materialLayers": ["trimBlack"], "colorMaterialRecipe": {"dominantAlbedo": "rgba(23, 24, 26, 1.0)", "secondaryAlbedo": "rgba(34, 35, 38, 1.0)", "materialClass": "plastic", "materialClassConfidence": 0.6, "evidence": ["front-3q-left"], "samplingNotes": "Near-black satin plastic on sun visor and lower bumper; small specular sheen only."}, "actionProfile": {"animationRole": "static", "pivot": {"mode": "explicit", "localPosition": [0, 0, 0], "axis": [0, 1, 0], "confidence": 0.6}, "transformChannels": {"translate": true, "rotate": true, "scale": false, "bend": false, "twist": false, "detach": false, "visibility": true, "materialState": false}, "sockets": [], "collider": {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."}, "constraints": [], "destruction": {"breakable": false, "breakImpulse": 0.0, "fractureGroup": "", "debrisMaterial": "", "seamRefs": [], "detachableFragments": []}}, "localFeatures": [], "evidenceRefs": ["front-3q-left"]};
  node_stepTread2R_57.add(mesh_stepTread2R_57);
  meshes["stepTread2R"] = mesh_stepTread2R_57;
  colliders["stepTread2R"] = {"type": "box", "offset": [0, 0, 0], "scale": [1, 1, 1], "isTrigger": false, "notes": "Coarse proxy for scroll-scene layout; no physics."};
  // repetition system "grilleSlatArray" describes 5 parts that are already built individually; not instanced.
  // repetition system "starSpokeArray" describes 3 parts that are already built individually; not instanced.
  // repetition system "sideMirrorPair" describes 4 parts that are already built individually; not instanced.
  // repetition system "wheelPairs" describes 8 parts that are already built individually; not instanced.
  // repetition system "headlightPair" describes 4 parts that are already built individually; not instanced.
  // repetition system "stepTreadArray" describes 4 parts that are already built individually; not instanced.

  // repetition system: hubFrontHandHoles (InstancedMesh, radial, count=10, level=micro)
  {
    const parent = nodes["hubFront"] ?? root;
    const geo = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
    const mat = materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 });
    // Contract (PLAN_1.5 WS-E): instanceScale is ABSOLUTE, in the parent pivot's
    // local units -- it is never multiplied by the parent component's own declared
    // dimensional scale. This falls out of the same fix as componentTree: the pivot
    // Group this cluster is parented to always carries identity scale (dimensions are
    // baked into that component's OWN geometry, not exposed on the Group), so an
    // instanced fastener/tooth/spoke sized [0.05, 0.05, 0.05] renders at exactly that
    // size regardless of how non-uniformly its host component is shaped, and a
    // `radial` ring's placement stays circular instead of being squashed into an
    // ellipse by a non-uniform host.
    const scl = [0.06, 0.06, 0.06];
    const axis = new THREE.Vector3(1.0, 0.0, 0.0).normalize();
    const radius = 0.44;
    const seed = Math.abs(axis.z) < 0.9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0);
    const perp = new THREE.Vector3().crossVectors(axis, seed).normalize();
    // One InstancedMesh = one draw call for all repeated parts (teeth/fasteners/spokes),
    // replacing the former per-instance Mesh clone loop (real-time perf principle).
    const cluster = new THREE.InstancedMesh(geo, mat, 10);
    const _m = new THREE.Matrix4();
    const _p = new THREE.Vector3();
    const _q = new THREE.Quaternion();
    const _s = new THREE.Vector3(scl[0], scl[1], scl[2]);
    for (let i = 0; i < 10; i++) {
      const ang = ((0.0) + (i * 360) / 10) * Math.PI / 180;
      const dir = perp.clone().applyQuaternion(new THREE.Quaternion().setFromAxisAngle(axis, ang));
      _p.copy(radius > 0 ? dir.clone().multiplyScalar(radius * 0.5) : new THREE.Vector3());
      _q.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);
      _m.compose(_p, _q, _s);
      cluster.setMatrixAt(i, _m);
    }
    cluster.instanceMatrix.needsUpdate = true;
    cluster.castShadow = options.castShadow ?? true;
    cluster.receiveShadow = options.receiveShadow ?? true;
    cluster.name = "hubFrontHandHoles";
    parent.add(cluster);
  }

  // repetition system: hubFrontRHandHoles (InstancedMesh, radial, count=10, level=micro)
  {
    const parent = nodes["hubFrontR"] ?? root;
    const geo = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
    const mat = materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 });
    // Contract (PLAN_1.5 WS-E): instanceScale is ABSOLUTE, in the parent pivot's
    // local units -- it is never multiplied by the parent component's own declared
    // dimensional scale. This falls out of the same fix as componentTree: the pivot
    // Group this cluster is parented to always carries identity scale (dimensions are
    // baked into that component's OWN geometry, not exposed on the Group), so an
    // instanced fastener/tooth/spoke sized [0.05, 0.05, 0.05] renders at exactly that
    // size regardless of how non-uniformly its host component is shaped, and a
    // `radial` ring's placement stays circular instead of being squashed into an
    // ellipse by a non-uniform host.
    const scl = [0.06, 0.06, 0.06];
    const axis = new THREE.Vector3(1.0, 0.0, 0.0).normalize();
    const radius = 0.44;
    const seed = Math.abs(axis.z) < 0.9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0);
    const perp = new THREE.Vector3().crossVectors(axis, seed).normalize();
    // One InstancedMesh = one draw call for all repeated parts (teeth/fasteners/spokes),
    // replacing the former per-instance Mesh clone loop (real-time perf principle).
    const cluster = new THREE.InstancedMesh(geo, mat, 10);
    const _m = new THREE.Matrix4();
    const _p = new THREE.Vector3();
    const _q = new THREE.Quaternion();
    const _s = new THREE.Vector3(scl[0], scl[1], scl[2]);
    for (let i = 0; i < 10; i++) {
      const ang = ((0.0) + (i * 360) / 10) * Math.PI / 180;
      const dir = perp.clone().applyQuaternion(new THREE.Quaternion().setFromAxisAngle(axis, ang));
      _p.copy(radius > 0 ? dir.clone().multiplyScalar(radius * 0.5) : new THREE.Vector3());
      _q.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);
      _m.compose(_p, _q, _s);
      cluster.setMatrixAt(i, _m);
    }
    cluster.instanceMatrix.needsUpdate = true;
    cluster.castShadow = options.castShadow ?? true;
    cluster.receiveShadow = options.receiveShadow ?? true;
    cluster.name = "hubFrontRHandHoles";
    parent.add(cluster);
  }

  // repetition system: hubRearHandHoles (InstancedMesh, radial, count=10, level=micro)
  {
    const parent = nodes["hubRear"] ?? root;
    const geo = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
    const mat = materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 });
    // Contract (PLAN_1.5 WS-E): instanceScale is ABSOLUTE, in the parent pivot's
    // local units -- it is never multiplied by the parent component's own declared
    // dimensional scale. This falls out of the same fix as componentTree: the pivot
    // Group this cluster is parented to always carries identity scale (dimensions are
    // baked into that component's OWN geometry, not exposed on the Group), so an
    // instanced fastener/tooth/spoke sized [0.05, 0.05, 0.05] renders at exactly that
    // size regardless of how non-uniformly its host component is shaped, and a
    // `radial` ring's placement stays circular instead of being squashed into an
    // ellipse by a non-uniform host.
    const scl = [0.06, 0.06, 0.06];
    const axis = new THREE.Vector3(1.0, 0.0, 0.0).normalize();
    const radius = 0.44;
    const seed = Math.abs(axis.z) < 0.9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0);
    const perp = new THREE.Vector3().crossVectors(axis, seed).normalize();
    // One InstancedMesh = one draw call for all repeated parts (teeth/fasteners/spokes),
    // replacing the former per-instance Mesh clone loop (real-time perf principle).
    const cluster = new THREE.InstancedMesh(geo, mat, 10);
    const _m = new THREE.Matrix4();
    const _p = new THREE.Vector3();
    const _q = new THREE.Quaternion();
    const _s = new THREE.Vector3(scl[0], scl[1], scl[2]);
    for (let i = 0; i < 10; i++) {
      const ang = ((0.0) + (i * 360) / 10) * Math.PI / 180;
      const dir = perp.clone().applyQuaternion(new THREE.Quaternion().setFromAxisAngle(axis, ang));
      _p.copy(radius > 0 ? dir.clone().multiplyScalar(radius * 0.5) : new THREE.Vector3());
      _q.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);
      _m.compose(_p, _q, _s);
      cluster.setMatrixAt(i, _m);
    }
    cluster.instanceMatrix.needsUpdate = true;
    cluster.castShadow = options.castShadow ?? true;
    cluster.receiveShadow = options.receiveShadow ?? true;
    cluster.name = "hubRearHandHoles";
    parent.add(cluster);
  }

  // repetition system: hubRearRHandHoles (InstancedMesh, radial, count=10, level=micro)
  {
    const parent = nodes["hubRearR"] ?? root;
    const geo = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
    const mat = materialMap["trimBlack"] ?? new THREE.MeshStandardMaterial({ color: 0x888888 });
    // Contract (PLAN_1.5 WS-E): instanceScale is ABSOLUTE, in the parent pivot's
    // local units -- it is never multiplied by the parent component's own declared
    // dimensional scale. This falls out of the same fix as componentTree: the pivot
    // Group this cluster is parented to always carries identity scale (dimensions are
    // baked into that component's OWN geometry, not exposed on the Group), so an
    // instanced fastener/tooth/spoke sized [0.05, 0.05, 0.05] renders at exactly that
    // size regardless of how non-uniformly its host component is shaped, and a
    // `radial` ring's placement stays circular instead of being squashed into an
    // ellipse by a non-uniform host.
    const scl = [0.06, 0.06, 0.06];
    const axis = new THREE.Vector3(1.0, 0.0, 0.0).normalize();
    const radius = 0.44;
    const seed = Math.abs(axis.z) < 0.9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0);
    const perp = new THREE.Vector3().crossVectors(axis, seed).normalize();
    // One InstancedMesh = one draw call for all repeated parts (teeth/fasteners/spokes),
    // replacing the former per-instance Mesh clone loop (real-time perf principle).
    const cluster = new THREE.InstancedMesh(geo, mat, 10);
    const _m = new THREE.Matrix4();
    const _p = new THREE.Vector3();
    const _q = new THREE.Quaternion();
    const _s = new THREE.Vector3(scl[0], scl[1], scl[2]);
    for (let i = 0; i < 10; i++) {
      const ang = ((0.0) + (i * 360) / 10) * Math.PI / 180;
      const dir = perp.clone().applyQuaternion(new THREE.Quaternion().setFromAxisAngle(axis, ang));
      _p.copy(radius > 0 ? dir.clone().multiplyScalar(radius * 0.5) : new THREE.Vector3());
      _q.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);
      _m.compose(_p, _q, _s);
      cluster.setMatrixAt(i, _m);
    }
    cluster.instanceMatrix.needsUpdate = true;
    cluster.castShadow = options.castShadow ?? true;
    cluster.receiveShadow = options.receiveShadow ?? true;
    cluster.name = "hubRearRHandHoles";
    parent.add(cluster);
  }

  root.userData.sculptRuntime = { nodes, meshes, sockets, colliders, destructionGroups } satisfies ProceduralModelRuntime;
  root.userData.lookDevTargets = {"qualityPriority": "balanced", "materialPass": {"albedoPaletteRequired": true, "roughnessVariationRequired": true, "normalOrBumpRequired": true, "localOverridesRequired": true, "minimumTextureResolution": 1024, "preferredTextureResolution": 2048, "independentMapChannels": ["albedo", "roughness", "height", "normal", "ambient-occlusion"], "requiredSurfaceFrequencyBands": ["macro", "meso", "micro"], "geometryReliefRequiredWhenSilhouetteAffected": true, "referencePbrExtraction": {"requiredWhenSourceImagePresent": true, "targetThreshold": 0.7, "stopOnLowConfidence": true, "script": "forge/stage1_intake/extract_pbr_evidence.py", "acceptedLimitation": "single-image extraction is reference-derived inference, not exact photogrammetry"}, "mustAvoid": ["single flat albedo per material", "uniform roughness", "albedo texture reused as roughness/height/normal/AO", "single-frequency random noise", "plastic-looking smooth bark, stone, cloth, foliage, or aged material", "local color/detail described only in prose without material masks", "claiming exact PBR recovery when confidence is below the target threshold"]}, "lightingPass": {"requiredTerms": ["key light", "fill light", "rim or environment light", "exposure", "tone mapping", "background", "contact shadow"], "mustAvoid": ["ambient-only lighting", "flat value range", "missing contact shadow", "reference lighting copied without separating material readability"]}, "screenshotReview": ["Compare albedo palette and local color zones.", "Compare roughness/normal/bump response under light.", "Compare cavity dirt, edge wear, stains, moss, scratches, or other local masks.", "Compare key/fill/rim structure, exposure, tone mapping, background, and contact shadows.", "Capture a neutral-light render to verify material readability without reference lighting.", "Capture a grazing-light close-up to expose flat normals, uniform roughness, tiling, and plastic highlights.", "Capture a reference-matched render from the same camera framing as the source."], "qualityPriorityNote": "Website hero prop: flat finishes (paint, plastic, glass, chrome, rubber) render from tuned scalar PBR; reference crops stay as evidence, not as texture maps."};
  root.userData.actionReadiness = {
    note: 'Use root.userData.sculptRuntime.nodes for transforms, sockets for attachments, colliders for physics proxies, and destructionGroups for breakable sets.',
  };
  return root;
}

export function createSPNActrosLTractorUnitLookDevLights(
  mode: 'neutral' | 'grazing' | 'reference' = 'neutral',
): THREE.Group {
  const lights = new THREE.Group();
  lights.name = "SPN Actros L tractor unit look-dev lights";
  const hemi = new THREE.HemisphereLight(
    mode === 'reference' ? 0xfff0d6 : 0xf2f4ff,
    0x363b42,
    mode === 'grazing' ? 0.28 : mode === 'reference' ? 0.72 : 0.85,
  );
  lights.add(hemi);
  const key = new THREE.DirectionalLight(
    mode === 'reference' ? 0xffcf8a : 0xfff4e8,
    mode === 'grazing' ? 4.2 : mode === 'reference' ? 2.6 : 2.15,
  );
  if (mode === 'grazing') key.position.set(7.5, 1.1, 4.0);
  else if (mode === 'reference') key.position.set(-4.5, 7.5, 5.0);
  else key.position.set(-4.0, 6.0, 5.5);
  key.castShadow = true;
  key.shadow.mapSize.set(4096, 4096);
  key.shadow.bias = -0.00025;
  key.shadow.normalBias = 0.018;
  key.shadow.radius = 7;
  key.shadow.blurSamples = 24;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 30;
  key.shadow.camera.left = -2.6;
  key.shadow.camera.right = 2.6;
  key.shadow.camera.top = 2.6;
  key.shadow.camera.bottom = -2.6;
  key.shadow.camera.updateProjectionMatrix();
  lights.add(key);
  const fill = new THREE.DirectionalLight(0xa8c4ff, mode === 'grazing' ? 0.12 : 0.42);
  fill.position.set(4.0, 3.0, 3.5);
  lights.add(fill);
  const rim = new THREE.DirectionalLight(0xfff1c4, mode === 'grazing' ? 0.28 : 0.85);
  rim.position.set(0.5, 4.5, -6.0);
  lights.add(rim);
  lights.userData.reviewMode = mode;
  lights.userData.lightingFromPhoto = [{"role": "key", "direction": "overhead sky, slightly front-left, ~60deg elevation", "colorTemp": "neutral-cool daylight 6500K", "intensity": "moderate", "evidence": ["front-3q-left"]}, {"role": "fill", "direction": "ground bounce from below/front", "colorTemp": "neutral", "intensity": "low", "evidence": ["front-3q-left"]}, {"role": "environment", "direction": "overcast sky IBL (RoomEnvironment approximation)", "colorTemp": "neutral", "intensity": "moderate", "note": "ACES filmic tone mapping, exposure ~1.0; soft contact shadow under the wheels on a light ground plane.", "evidence": ["front-3q-left"]}];
  lights.userData.lookDevTargets = {"qualityPriority": "balanced", "materialPass": {"albedoPaletteRequired": true, "roughnessVariationRequired": true, "normalOrBumpRequired": true, "localOverridesRequired": true, "minimumTextureResolution": 1024, "preferredTextureResolution": 2048, "independentMapChannels": ["albedo", "roughness", "height", "normal", "ambient-occlusion"], "requiredSurfaceFrequencyBands": ["macro", "meso", "micro"], "geometryReliefRequiredWhenSilhouetteAffected": true, "referencePbrExtraction": {"requiredWhenSourceImagePresent": true, "targetThreshold": 0.7, "stopOnLowConfidence": true, "script": "forge/stage1_intake/extract_pbr_evidence.py", "acceptedLimitation": "single-image extraction is reference-derived inference, not exact photogrammetry"}, "mustAvoid": ["single flat albedo per material", "uniform roughness", "albedo texture reused as roughness/height/normal/AO", "single-frequency random noise", "plastic-looking smooth bark, stone, cloth, foliage, or aged material", "local color/detail described only in prose without material masks", "claiming exact PBR recovery when confidence is below the target threshold"]}, "lightingPass": {"requiredTerms": ["key light", "fill light", "rim or environment light", "exposure", "tone mapping", "background", "contact shadow"], "mustAvoid": ["ambient-only lighting", "flat value range", "missing contact shadow", "reference lighting copied without separating material readability"]}, "screenshotReview": ["Compare albedo palette and local color zones.", "Compare roughness/normal/bump response under light.", "Compare cavity dirt, edge wear, stains, moss, scratches, or other local masks.", "Compare key/fill/rim structure, exposure, tone mapping, background, and contact shadows.", "Capture a neutral-light render to verify material readability without reference lighting.", "Capture a grazing-light close-up to expose flat normals, uniform roughness, tiling, and plastic highlights.", "Capture a reference-matched render from the same camera framing as the source."], "qualityPriorityNote": "Website hero prop: flat finishes (paint, plastic, glass, chrome, rubber) render from tuned scalar PBR; reference crops stay as evidence, not as texture maps."};
  return lights;
}

// PBR materials (clearcoat/iridescence/transmission/anisotropy) need an environment
// map to visually behave as intended — call this once per renderer and assign the
// result to scene.environment before rendering. No external HDR asset required.
export function createSPNActrosLTractorUnitEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  return texture;
}

// Plan 1.3 §3.2 — auto-framing by bounding box. The Divine Eye can only compare a
// render to the reference if the object is FRAMED consistently (an object framed
// differently scores as wrong even when its shape is right). This positions the camera
// deterministically from the object's bounding box so it fills the frame at a stable
// margin, and sets near/far to the object scale. Call after adding the model to the
// scene, and again on resize (after updating camera.aspect).
export function frameSPNActrosLTractorUnitCamera(
  camera: THREE.PerspectiveCamera,
  object: THREE.Object3D,
  options: { margin?: number; azimuthDeg?: number; elevationDeg?: number } = {},
): void {
  const box = new THREE.Box3().setFromObject(object);
  if (box.isEmpty()) return;
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const margin = options.margin ?? 1.15;
  const maxDim = Math.max(size.x, size.y, size.z) * margin;
  const fov = (camera.fov * Math.PI) / 180;
  // distance so the largest object dimension fits vertically in the frame
  const distance = (maxDim / 2) / Math.tan(fov / 2);
  const az = ((options.azimuthDeg ?? 0) * Math.PI) / 180;
  const el = ((options.elevationDeg ?? 0) * Math.PI) / 180;
  const dir = new THREE.Vector3(
    Math.sin(az) * Math.cos(el),
    Math.sin(el),
    Math.cos(az) * Math.cos(el),
  );
  camera.position.copy(center).addScaledVector(dir, distance);
  camera.near = Math.max(0.01, distance - maxDim);
  camera.far = distance + maxDim * 2;
  camera.lookAt(center);
  camera.updateProjectionMatrix();
}

// Plan 1.3 §3.2c — PRESENTATION composer (DOF + bloom). CRITICAL (R-POSTFX): this is
// for the showcase/hero render ONLY. The Divine Eye's EVALUATION render MUST use a
// plain renderer with NO composer — bloom blows highlights and DOF blurs edges, which
// would corrupt the deterministic IoU/DCD/edge/blowout signals. Enable dof/bloom ONLY
// when the reference photo actually exhibits them (detect_reference_effects.py authorizes).
export function createSPNActrosLTractorUnitPresentationComposer(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  options: { dof?: boolean; bloom?: boolean; bloomStrength?: number; dofFocus?: number; dofAperture?: number } = {},
): EffectComposer {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  if (options.dof) {
    composer.addPass(new BokehPass(scene, camera, {
      focus: options.dofFocus ?? 10.0,
      aperture: options.dofAperture ?? 0.0002,
      maxblur: 0.01,
    }));
  }
  if (options.bloom) {
    const size = new THREE.Vector2();
    renderer.getSize(size);
    composer.addPass(new UnrealBloomPass(size, options.bloomStrength ?? 0.4, 0.4, 0.85));
  }
  return composer;
}

export function configureSPNActrosLTractorUnitRenderer(renderer: THREE.WebGLRenderer): void {
  // Load-bearing for view-dependent finishes (anodized / Doppler): without ACES + sRGB
  // the environment reflection reads flat/washed instead of a believable metal response.
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
}

export function createSPNActrosLTractorUnitInspectControls(
  camera: THREE.Camera,
  domElement: HTMLElement,
): OrbitControls {
  // View-dependent finishes only read correctly once the user orbits — their color
  // comes from the environment reflection, not albedo, so free rotation matters here.
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.minDistance = 1.0;
  controls.maxDistance = 8.0;
  controls.autoRotate = false;
  return controls;
}
