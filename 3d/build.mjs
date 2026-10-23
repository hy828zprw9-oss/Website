// Builds ../assets/js/truck3d.js from src/site3d.js and the img2threejs factory.
//
// actros/createObjectModel.ts is the generated artifact of record (img2threejs, all eight passes
// reviewed; see actros/object-sculpt-spec.json reviewHistory). It carries the whole spec as
// userData on every node, which is review evidence, not something a visitor should download.
// This step strips that metadata mechanically and changes no geometry, material scalar or
// hierarchy, then bundles three.js and the page scenes into one self-hosted module.
import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, "actros/createObjectModel.ts"), "utf8");

// Material keys createSculptMaterial never reads (evidence, palettes, analysis records).
const MATERIAL_EVIDENCE_KEYS = [
  "name", "shaderModel", "albedo", "colorVariation", "surfaceFrequencyBands", "ambientOcclusion", "wear", "dirt",
  "localOverrides", "shaderNotes", "materialReference", "materialEvidence", "textureAnalysis", "materialFamily",
  "materialSubtype", "materialFinish", "referenceMaterialId", "needsEnvironment",
];

const lines = source.split("\n");
const out = [];
let dropBlock = false;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Review/inspection helpers the page never calls (postprocessing composer, orbit controls).
  if (/^import \{ (EffectComposer|RenderPass|BokehPass|UnrealBloomPass|OrbitControls) \}/.test(line)) continue;
  if (/^export function create\w+(PresentationComposer|InspectControls)\(/.test(line)) { dropBlock = true; continue; }
  if (dropBlock) { if (line === "}") dropBlock = false; continue; }
  // Spec metadata attached to nodes, meshes, colliders and the root (keep sculptRuntime).
  if (/^\s*(node|mesh)_\w+\.userData\.(sculptComponent|actionProfile) = /.test(line)) continue;
  if (/^\s*colliders\[/.test(line)) continue;
  if (/^\s*root\.userData\.(?!sculptRuntime)\w+ = .*;$/.test(line)) continue;
  if (/^\s*lights\.userData\.\w+ = /.test(line)) continue;
  // Material literal passed to createSculptMaterial: keep the scalars it reads.
  if (/^\s*materialMap\["\w+"\] = createSculptMaterial\($/.test(lines[i - 2] ?? "") && /^\s*\{"id": /.test(line)) {
    const indent = line.match(/^\s*/)[0];
    const spec = JSON.parse(line.trim().replace(/,$/, ""));
    for (const key of MATERIAL_EVIDENCE_KEYS) delete spec[key];
    if (spec.textureless) delete spec.textureless.evidence;
    out.push(`${indent}${JSON.stringify(spec)},`);
    continue;
  }
  out.push(line);
}

const buildDir = join(here, "build");
mkdirSync(buildDir, { recursive: true });
writeFileSync(join(buildDir, "actros.web.ts"), out.join("\n"));

const outfile = join(here, "../assets/js/truck3d.js");
await build({
  entryPoints: [join(here, "src/site3d.js")],
  bundle: true,
  format: "esm",
  minify: true,
  target: ["es2020"],
  outfile,
  legalComments: "eof",
  logLevel: "warning",
});
console.log(`truck3d.js ${(statSync(outfile).size / 1024).toFixed(0)} KiB`);
