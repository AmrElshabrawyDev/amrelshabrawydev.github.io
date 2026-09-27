/*
  Cinematic logo intro — rendered offline to a video (see render.mjs).

  Storyboard (seconds):
    0.0–0.9  light streaks race in from the dark toward the centre
    0.8–1.4  flash; the logo outline is traced in light
    1.1–1.8  the 3D logo extrudes out of its outline
    1.6–2.6  it turns from a three-quarter view to the front,
             a light sweeps across it and the camera pushes in
    2.6–3.0  settles on the front view with a glow pulse (last frame = the logo)

  Everything is a pure function of time, so frames are deterministic:
  window.renderAt(seconds) draws exactly that moment.
*/
import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const SIZE = window.RENDER_SIZE ?? 1080;
const LOGO = window.LOGO; // { viewBox, paths: [{ d, fill }] } injected by render.mjs

// ---------- helpers ----------
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const range = (t, a, b) => clamp01((t - a) / (b - a));
const easeInOut = (v) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);
const easeOut = (v) => 1 - Math.pow(1 - v, 3);
const easeIn = (v) => v * v * v;
const lerp = (a, b, v) => a + (b - a) * v;
// Seeded random so every render is identical
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

// ---------- renderer / scene ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(SIZE, SIZE);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.9;
renderer.setClearColor(0x000000, 1); // pure black → transparent with mix-blend-mode: screen
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// Dark "photo studio" environment with a few light strips: glossy highlights
// like a product ad, without washing out the logo's colours
const studio = new THREE.Scene();
studio.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ color: 0x06070d, side: THREE.BackSide })));
const strip = (w, h, pos, rotY, intensity, color = 0xffffff) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide }));
  m.position.set(...pos);
  m.rotation.y = rotY;
  studio.add(m);
};
strip(14, 1.2, [0, 9, 4], 0, 4); // top strip
strip(1.4, 12, [-10, 1, 6], Math.PI / 3, 3, 0xbcd4ff); // left
strip(1.4, 12, [10, 0, 5], -Math.PI / 3, 2.2, 0xd8c8ff); // right, faint violet
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(studio, 0.02).texture;

const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

// Lights: soft key + a moving "sweep" light for the glint
scene.add(new THREE.AmbientLight(0xcdd6f4, 0.25));
const key = new THREE.DirectionalLight(0xdbe6ff, 1.9);
key.position.set(-4, 5, 8);
scene.add(key);
const sweep = new THREE.PointLight(0xffffff, 0, 12, 1.5);
scene.add(sweep);

// ---------- logo geometry from the real SVG ----------
const S = 4.2 / LOGO.viewBox; // SVG units → world units
const logo = new THREE.Group();
scene.add(logo);
const fillGroup = new THREE.Group();
const lineGroup = new THREE.Group();
logo.add(fillGroup, lineGroup);

const svg = new SVGLoader().parse(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOGO.viewBox} ${LOGO.viewBox}">${LOGO.paths
    .map((p) => `<path d="${p.d}" fill="${p.fill}"/>`)
    .join("")}</svg>`,
);

// hexagon, A, M, R — depth/bevel in SVG units
const parts = [
  { depth: 46, bevel: 18, bevelThickness: 10, z: -56, material: { color: 0x89b4fa, metalness: 0.05, roughness: 0.34 } },
  { depth: 10, bevel: 3, bevelThickness: 3, z: 0, material: { color: 0x14141f, metalness: 0.7, roughness: 0.22 } },
  { depth: 34, bevel: 6, bevelThickness: 6, z: 0, material: { color: 0xcdd6f4, metalness: 0.05, roughness: 0.3 } },
  { depth: 10, bevel: 3, bevelThickness: 3, z: 0, material: { color: 0x14141f, metalness: 0.7, roughness: 0.22 } },
];

const fills = [];
const outlines = [];
svg.paths.forEach((path, i) => {
  const part = parts[i];
  const shapes = SVGLoader.createShapes(path);
  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth: part.depth,
    bevelEnabled: true,
    bevelSize: part.bevel,
    bevelThickness: part.bevelThickness,
    bevelSegments: 8,
    curveSegments: 24,
  });
  // SVG y points down: flip, centre on the viewBox, scale to world units
  geometry.translate(-LOGO.viewBox / 2, -LOGO.viewBox / 2, part.z);
  geometry.scale(S, -S, S);
  geometry.computeVertexNormals();

  const material = new THREE.MeshPhysicalMaterial({
    ...part.material,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    envMapIntensity: 1,
    transparent: true,
    side: THREE.FrontSide,
  });
  if (i === 2) material.emissive = new THREE.Color(0x5a6aa0);
  const mesh = new THREE.Mesh(geometry, material);
  fillGroup.add(mesh);
  fills.push(mesh);

  // Outline traced in light (front contour of every shape and its holes)
  shapes.forEach((shape) => {
    [shape, ...shape.holes].forEach((contour) => {
      const pts = contour.getPoints(48).map(
        (p) => new THREE.Vector3((p.x - LOGO.viewBox / 2) * S, -(p.y - LOGO.viewBox / 2) * S, (part.z + part.depth + part.bevelThickness) * S + 0.01),
      );
      pts.push(pts[0].clone());
      const geom = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(
        geom,
        new THREE.LineBasicMaterial({ color: i === 2 ? 0xffffff : 0xa8c8ff, transparent: true, toneMapped: false }),
      );
      line.userData.count = pts.length;
      lineGroup.add(line);
      outlines.push(line);
    });
  });
});

// ---------- light streaks ----------
const STREAKS = 70;
const streakColors = [0x89b4fa, 0x94e2d5, 0xcba6f7, 0xffffff];
const streakGeo = new THREE.BoxGeometry(1, 1, 1);
const streaks = [];
for (let i = 0; i < STREAKS; i++) {
  // circuit-like: most come in along the axes, some on diagonals
  const axis = rand() < 0.75;
  const angle = axis ? (Math.floor(rand() * 4) * Math.PI) / 2 + (rand() - 0.5) * 0.12 : rand() * Math.PI * 2;
  const mesh = new THREE.Mesh(
    streakGeo,
    new THREE.MeshBasicMaterial({
      color: streakColors[Math.floor(rand() * streakColors.length)],
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  scene.add(mesh);
  streaks.push({
    mesh,
    angle,
    offset: (rand() - 0.5) * 3.2, // lateral lane
    start: 0.05 + rand() * 0.45,
    speed: 0.35 + rand() * 0.25, // seconds to arrive
    dist: 9 + rand() * 5,
    z: (rand() - 0.5) * 1.5,
    thick: 0.012 + rand() * 0.02,
  });
}

// Flash at the moment the streaks meet
const flash = new THREE.Mesh(
  new THREE.CircleGeometry(1, 64),
  new THREE.ShaderMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    uniforms: { uAlpha: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `varying vec2 vUv; uniform float uAlpha;
      void main(){ float d = distance(vUv, vec2(0.5)) * 2.0; float g = pow(max(0.0, 1.0 - d), 3.0);
      gl_FragColor = vec4(vec3(0.62, 0.76, 1.0) * g * uAlpha, 1.0); }`,
  }),
);
flash.position.z = 0.5;
scene.add(flash);

// ---------- post-processing ----------
const composer = new EffectComposer(renderer);
composer.setPixelRatio(1);
composer.setSize(SIZE, SIZE);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(SIZE, SIZE), 0.35, 0.35, 0.95);
composer.addPass(bloom);
composer.addPass(new OutputPass());

// ---------- timeline ----------
window.DURATION = 3.0;

window.renderAt = (t) => {
  // Streaks: race toward the centre, stretching, then vanish on arrival
  streaks.forEach((s) => {
    const p = range(t, s.start, s.start + s.speed);
    const visible = p > 0 && p < 1;
    s.mesh.visible = visible;
    if (!visible) return;
    const e = easeIn(p);
    const r = lerp(s.dist, 0.3, e);
    const len = 0.4 + e * 2.4;
    const dx = Math.cos(s.angle);
    const dy = Math.sin(s.angle);
    // lateral lane offset perpendicular to the direction
    s.mesh.position.set(dx * r - dy * s.offset * (1 - e), dy * r + dx * s.offset * (1 - e), s.z * (1 - e));
    s.mesh.rotation.set(0, 0, s.angle);
    s.mesh.scale.set(len, s.thick, s.thick);
    s.mesh.material.opacity = Math.min(1, p * 4) * (1 - range(p, 0.85, 1));
  });

  // Flash as they meet
  const f = range(t, 0.72, 0.9) * (1 - range(t, 0.9, 1.35));
  flash.material.uniforms.uAlpha.value = f * 1.2;
  flash.scale.setScalar(1.5 + range(t, 0.72, 1.35) * 3);

  // Outline traced in light
  const draw = easeInOut(range(t, 0.82, 1.4));
  const lineFade = 1 - range(t, 1.6, 2.1);
  outlines.forEach((line) => {
    line.geometry.setDrawRange(0, Math.max(0, Math.floor(line.userData.count * draw)));
    line.material.opacity = (t < 0.82 ? 0 : 1) * lineFade;
  });

  // Extrude out of the outline
  const grow = easeOut(range(t, 1.1, 1.8));
  fillGroup.scale.set(1, 1, Math.max(0.001, grow));
  fills.forEach((m) => {
    m.material.opacity = range(t, 1.1, 1.45);
    m.material.transparent = m.material.opacity < 1;
    m.visible = m.material.opacity > 0;
  });

  // Turn to the front
  const turn = easeInOut(range(t, 1.55, 2.65));
  logo.rotation.y = lerp(lerp(-0.72, -0.62, range(t, 0.8, 1.55)), 0, turn);
  logo.rotation.x = lerp(0.14, 0, turn);

  // Camera: slow push-in, settling exactly on the final framing
  const push = easeInOut(range(t, 0, 2.8));
  camera.position.set(lerp(0.6, 0, push), lerp(0.25, 0, push), lerp(14, 11.2, push));
  camera.lookAt(0, 0, 0);

  // Light sweep across the face
  const sw = range(t, 1.75, 2.7);
  sweep.intensity = Math.sin(sw * Math.PI) * 9;
  sweep.position.set(lerp(-5, 5, easeInOut(sw)), lerp(2.2, -1.2, sw), 3);

  // Glow pulse at the end, back to calm on the last frame
  const pulse = Math.sin(range(t, 2.55, 3.0) * Math.PI);
  bloom.strength = 0.25 + f * 1.1 + pulse * 0.3;
  fills[2].material.emissiveIntensity = 0.35 + pulse * 0.5;

  composer.render();
};

// Where the logo sits in the final frame (for the fly-to-header animation)
window.logoBox = () => {
  window.renderAt(window.DURATION);
  const box = new THREE.Box3().setFromObject(fillGroup);
  const corners = [
    new THREE.Vector3(box.min.x, box.min.y, box.max.z),
    new THREE.Vector3(box.max.x, box.max.y, box.max.z),
  ].map((v) => v.project(camera));
  return {
    // fraction of the video frame, centred
    width: (corners[1].x - corners[0].x) / 2,
    height: (corners[1].y - corners[0].y) / 2,
  };
};

window.sceneReady = true;
