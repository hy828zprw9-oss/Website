// A black photo studio as the environment map: one long softbox overhead, two tall strip boxes at
// the sides and a weak front fill. On silver paint this gives the soft highlight bands of a car
// shoot; nothing is downloaded, the room is built and prefiltered (PMREM) on the client.
import * as THREE from "three";

export function studioEnvironment(renderer, { strength = 1 } = {}) {
  const room = new THREE.Scene();
  room.background = new THREE.Color("#000");
  const panel = (w, h, intensity, at, rot) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1).multiplyScalar(intensity * strength), side: THREE.DoubleSide }),
    );
    m.position.set(...at);
    m.rotation.set(...rot);
    room.add(m);
  };
  panel(14, 4, 3.2, [0, 9, -2], [Math.PI / 2, 0, 0]);
  panel(3, 7, 1.6, [10, 3.5, -2], [0, -Math.PI / 2, 0]);
  panel(3, 7, 1.6, [-10, 3.5, -2], [0, Math.PI / 2, 0]);
  // Front: a dim lower band and a brighter one above it, so vertical faces get a soft gradient.
  panel(14, 1.6, 0.25, [0, 0.9, 12], [0, Math.PI, 0]);
  panel(14, 2.6, 0.75, [0, 3.0, 12], [0, Math.PI, 0]);
  panel(6, 1.2, 0.4, [0, 2, -16], [0, 0, 0]);
  // A broad, sloped softbox high in front: the raked windscreen and the hood catch it as a sheen.
  panel(16, 5, 0.9, [0, 6.5, 10], [0.9, 0, 0]);
  // A dark grey floor so lower panels pick up a little bounce, not pure black.
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.035, 0.035, 0.04) }));
  floor.rotation.x = -Math.PI / 2;
  room.add(floor);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(room, 0.03).texture;
  pmrem.dispose();
  return env;
}
