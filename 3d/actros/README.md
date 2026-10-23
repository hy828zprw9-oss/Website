# SPN Actros L (DT E 1005), procedural 3D model

The truck on the page is code, not a downloaded or scanned mesh. It is built in two layers.

## 1. Measurements: the img2threejs reconstruction (this folder)

Built with the img2threejs skill (`.claude/skills/img2threejs`) from the owner's daylight photo of
the Actros L GigaSpace DT E 1005 (`assets/img/actros-frei-950.webp`, cut-out, provenance in its
`.webp.json`).

- `object-sculpt-spec.json` is the spec: 58 components in metres (Y up, vehicle forward +Z), 9 flat
  PBR materials, repetition systems, and the review record of all eight passes (blockout,
  structural, form refinement, material, surface, lighting, interaction, optimization). Every pass
  closed with `continue`, with no correction loop used. Silhouette IoU against the photo, after
  aligning the camera, was 0.89 to 0.93.
- `createObjectModel.ts` is the generated Three.js factory for the optimization pass, unedited.

That factory only knows boxes, cylinders and straight extrusions, so on the page it read as a toy.
It is kept here as the record the page model's dimensions come from (cab 2.5 x 2.3 m, roof at
3.97 m, wheel stations, lamp and grille heights); the page no longer ships it.

## 2. The page model: `../src/actros.js`

Written by hand in Three.js on those measurements, and checked view by view against
`assets/img/actros-e-900.webp` (grille louvre heights, star, headlights, windscreen and visor
heights were read off that photo at about 223 px/m on the front plane).

- Cab: plan-view sections lofted from floor to roof (rounded corners, windscreen raked about 9°,
  GigaSpace roof roll-over), with the windscreen opening cut out of the skin so the glass shows a
  dark cockpit (dashboard with a lit cluster, steering wheel, two seats).
- Panels such as the windscreen frame, windows, headlamp lenses and grille inserts are 2D outlines
  pressed onto the curved body along its normal.
- Grille: four silver louvres and a chevron, each with a perforated insert, over a black cavity;
  the star in its ring across the top two.
- Tyres are lathed with a tread bump, steel disc wheels have ten hand-holes and nuts; the chassis
  shows the rails, tank, battery box, AdBlue tank, silencer, fifth wheel, mudguards and the red and
  yellow coils behind the cab.
- Physical materials (clear-coated silver paint, tinted glass, chrome, satin alu, rubber). Small
  canvas textures carry the plate, the SPN-TRANSPORTE and ACTROS L lettering, the GIGASPACE strip,
  the grille perforation and the tread; no image files.
- `../src/studio.js` builds the black studio environment the paint reflects (prefiltered on the
  client, nothing downloaded).
- About 82,000 triangles and 39 draw calls at full quality (hero); trucks that stay small on screen
  are built at quality 0.6 (about 52,000 triangles). Meshes are merged per material, the four
  wheel stations are separate `wheel` pivots that roll about X.

Rebuild: `cd 3d && npm ci && npm run build` (bundles three.js 0.170.0 and `src/` into
`assets/js/truck3d.js`).

What it is and is not:

- A web-weight model, not a factory CAD model: proportions and the visible details follow the
  photos, small parts are simplified.
- The hidden sides (rear wall, right side, chassis) are inferred from the photos of the other
  trucks and mirrored; one photo cannot show them.
