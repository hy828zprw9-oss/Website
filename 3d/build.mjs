// Builds ../assets/js/truck3d.js: three.js, the procedural SPN Actros (src/actros.js), the studio
// lighting (src/studio.js) and the page scenes (src/site3d.js), bundled into one self-hosted module.
//
// actros/ keeps the img2threejs reconstruction the model's measurements come from (cab size,
// heights, wheel stations, camera solve); the page no longer ships that factory itself.
import { statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
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
