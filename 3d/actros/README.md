# SPN Actros L (DT E 1005), procedural 3D model

Built with the img2threejs skill (`.claude/skills/img2threejs`) as code, not as a downloaded or
scanned mesh. Reference: the owner's daylight photo of the Actros L GigaSpace DT E 1005
(`assets/img/actros-frei-950.webp`, cut-out, provenance in its `.webp.json`).

- `object-sculpt-spec.json` is the spec: 58 components in metres (Y up, vehicle forward +Z), 9 flat
  PBR materials, repetition systems, and the review record of all eight passes (blockout,
  structural, form refinement, material, surface, lighting, interaction, optimization). Every pass
  closed with `continue`, with no correction loop used. Silhouette IoU against the photo, after
  aligning the camera, was 0.89 to 0.93.
- `createObjectModel.ts` is the generated Three.js factory for the optimization pass, unedited.
- `../build.mjs` removes the review metadata from the factory, keeping its geometry, materials and
  hierarchy unchanged. It then bundles the factory with three.js 0.170.0 and `../src/site3d.js` into
  `assets/js/truck3d.js`.

Rebuild: `cd 3d && npm ci && npm run build`.

What it is and is not:

- A stylised, web-weight reconstruction: about 19,800 triangles and no texture files. The cab, roof,
  fascia and bumper are rounded extrusions, and the other parts are boxes and cylinders.
- No lettering, logos or registration characters are reproduced. The plate is blank, and the star is
  plain chrome geometry.
- Flat scalar materials by design. The photo's 16 to 60 px material crops smeared when stretched
  across panels (review evidence in the spec), so paint flake, panel gaps and grille perforation are
  not textured.
- The hidden sides (rear wall, right side) are inferred by mirroring; one photo cannot show them.
- The wheels roll about their axles (`wheel` pivots), and ten hand-holes per hub make the spin
  visible.
