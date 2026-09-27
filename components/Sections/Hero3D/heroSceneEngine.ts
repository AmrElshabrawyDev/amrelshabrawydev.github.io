/*
  Home hero 3D scene — a field of "building blocks" that ripple and rise
  around the cursor. Vanilla three.js with a single InstancedMesh (one draw
  call). Loaded lazily by <HeroScene />, never on the critical path.
*/
import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  DynamicDrawUsage,
  Fog,
  InstancedMesh,
  MeshLambertMaterial,
  Object3D,
  PerspectiveCamera,
  Plane,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

interface HeroSceneOptions {
  /** Fewer blocks, no antialiasing, 30fps — for phones and weaker CPUs */
  lite: boolean;
  /** Called once the first frame is drawn, so the canvas can fade in */
  onReady?: () => void;
}

// Site palette (app/globals.css)
const BG = 0x11111b;
const LOW = new Color("#2c2c44");
const MID = new Color("#89b4fa"); // primary
const HIGH = new Color("#94e2d5"); // secondary
const PEAK = new Color("#cba6f7"); // info

const BASE_Y = 12;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);

export async function createHeroScene(
  container: HTMLElement,
  { lite, onReady }: HeroSceneOptions,
) {
  const renderer = new WebGLRenderer({
    antialias: !lite,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lite ? 1 : 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.fog = new Fog(BG, 28, lite ? 52 : 62);

  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const lookTarget = new Vector3(0, 2, -8);

  scene.add(new AmbientLight(0xcdd6f4, 0.6));
  const key = new DirectionalLight(0x89b4fa, 1.6);
  key.position.set(-10, 16, 12);
  const rim = new DirectionalLight(0xcba6f7, 0.9);
  rim.position.set(12, 8, -14);
  scene.add(key, rim);

  // Grid of blocks, pivot at the base so scale.y grows them upwards
  const cols = lite ? 48 : 72;
  const rows = lite ? 32 : 46;
  const count = cols * rows;
  const geometry = new BoxGeometry(0.8, 1, 0.8);
  geometry.translate(0, 0.5, 0);
  const material = new MeshLambertMaterial();
  const mesh = new InstancedMesh(geometry, material, count);
  mesh.instanceMatrix.setUsage(DynamicDrawUsage);
  scene.add(mesh);

  const xs = new Float32Array(count);
  const zs = new Float32Array(count);
  const delays = new Float32Array(count);
  for (let r = 0, i = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++, i++) {
      xs[i] = c - cols / 2;
      zs[i] = 18 - r;
      delays[i] = Math.hypot(xs[i] - 10, zs[i] - 4) * 0.03; // intro ripples out from a point
    }
  }

  // Pointer → point on the ground plane
  const raycaster = new Raycaster();
  const ground = new Plane(new Vector3(0, 1, 0), 0);
  const ndc = new Vector2();
  const hit = new Vector3();
  const focus = new Vector3(10, 0, 4); // smoothed bump position
  const parallax = new Vector2();
  let pointerActive = false;
  let strength = 0;

  const onPointerMove = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    if (event.clientY < rect.top || event.clientY > rect.bottom) {
      pointerActive = false;
      return;
    }
    ndc.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    pointerActive = true;
  };
  const onPointerLeave = () => (pointerActive = false);
  if (!lite) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
  }

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Portrait screens: step back so the field still fills the width
    camera.position.set(0, BASE_Y, 36);
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  const dummy = new Object3D();
  const target = new Vector3();
  const center = new Vector2();
  const color = new Color();

  const draw = (time: number) => {
    const t = time / 1000;

    // Idle: the bump drifts on its own; with a mouse it follows the pointer
    target.set(10 + Math.sin(t * 0.35) * 9, 0, 2 + Math.cos(t * 0.27) * 6);
    if (pointerActive) {
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(ground, hit)) target.copy(hit);
    }
    focus.lerp(target, 0.08);
    strength += ((pointerActive ? 1 : 0.55) - strength) * 0.05;

    for (let i = 0; i < count; i++) {
      const x = xs[i];
      const z = zs[i];
      const wave =
        (Math.sin(x * 0.24 + t * 0.9) + Math.sin(z * 0.32 - t * 0.7)) * 0.25 +
        0.5;
      const dx = x - focus.x;
      const dz = z - focus.z;
      const bump = Math.exp(-(dx * dx + dz * dz) / 18) * strength;
      const intro = easeOut(clamp01((t - 0.2 - delays[i]) / 1.2));
      const height = (0.15 + wave * wave * 2 + bump * 4.2) * intro + 0.02;

      dummy.position.set(x, 0, z);
      dummy.scale.set(1, height, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const level = clamp01((height - 0.3) / 3.6);
      if (level < 0.45) color.copy(LOW).lerp(MID, level / 0.45);
      else if (level < 0.8) color.copy(MID).lerp(HIGH, (level - 0.45) / 0.35);
      else color.copy(HIGH).lerp(PEAK, (level - 0.8) / 0.2);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // Gentle camera parallax
    parallax.lerp(pointerActive ? ndc : center, 0.04);
    camera.position.x = parallax.x * 1.6;
    camera.position.y = BASE_Y + parallax.y * 0.8;
    camera.lookAt(lookTarget);

    renderer.render(scene, camera);
  };

  // Compile shaders without blocking the main thread before the first frame
  let disposed = false;
  await renderer.compileAsync(scene, camera);

  // Render loop — only while the hero is on screen and the tab is visible
  let frame = 0;
  let last = 0;
  let visible = true;
  let readySent = false;
  const minDelta = lite ? 1000 / 30 : 0;

  const loop = (time: number) => {
    frame = requestAnimationFrame(loop);
    if (time - last < minDelta) return;
    last = time;
    draw(time);
    if (!readySent) {
      readySent = true;
      onReady?.();
    }
  };
  const start = () => {
    if (!frame && visible && !document.hidden)
      frame = requestAnimationFrame(loop);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });
  intersection.observe(container);
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVisibility);
  if (!disposed) start();

  return () => {
    disposed = true;
    stop();
    intersection.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerleave", onPointerLeave);
    geometry.dispose();
    material.dispose();
    mesh.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
