/*
  Home hero 3D scene — a field of "building blocks" that ripple and rise
  around the cursor. On start, some blocks fly up and assemble the AMR logo
  (voxels) where the hero photo sits, hold, then fall back into the field.
  Vanilla three.js with a single InstancedMesh (one draw call).
  Loaded lazily by <HeroScene />, never on the critical path.
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
import { logoSvgMarkup } from "@/components/ui/logoPaths";

interface HeroSceneOptions {
  /** Fewer blocks, no antialiasing, 30fps — for phones and weaker CPUs */
  lite: boolean;
  /** Called once the first frame is drawn, so the canvas can fade in */
  onReady?: () => void;
  /** Assemble the logo over this element's box, then call onDone */
  logo?: {
    anchor: () => DOMRect | null;
    /** ms after the scene starts before building the logo */
    delay: number;
    /** Called as the blocks start flying into the logo */
    onStart?: () => void;
    /** Called as the logo starts to break apart */
    onDone?: () => void;
  };
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
const easeInOut = (v: number) =>
  v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;

// Logo voxel colours: hexagon and the raised "M"
const LOGO_FRAME = new Color("#89b4fa");
const LOGO_M = new Color("#e6ebff");

// Logo timeline (seconds after it starts)
const RISE = 1; // each block's flight up
const BUILD_STAGGER = 0.8; // bottom row → top row
const HOLD_UNTIL = 4.2;
const FALL = 0.9;
const FALL_STAGGER = 0.6;

interface Voxel {
  gx: number;
  gy: number;
  /** 0 = hexagon, 1 = the "M" (raised) */
  kind: 0 | 1;
}

/** Rasterize the logo into a res×res grid; the dark A and R become holes */
async function rasterizeLogo(res: number): Promise<Voxel[]> {
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(logoSvgMarkup())}`;
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = res;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, res, res);
  const { data } = ctx.getImageData(0, 0, res, res);
  const voxels: Voxel[] = [];
  for (let y = 0; y < res; y++) {
    for (let x = 0; x < res; x++) {
      const o = (y * res + x) * 4;
      if (data[o + 3] < 128) continue;
      const [r, g, b] = [data[o], data[o + 1], data[o + 2]];
      if (r + g + b < 200) continue; // letters A and R
      voxels.push({ gx: x, gy: res - 1 - y, kind: r > 170 ? 1 : 0 });
    }
  }
  return voxels;
}

export async function createHeroScene(
  container: HTMLElement,
  { lite, onReady, logo }: HeroSceneOptions,
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
  // Soft fill from the viewer's side, so the logo's front faces read clearly
  const fill = new DirectionalLight(0xcdd6f4, 0.55);
  fill.position.set(0, 6, 30);
  scene.add(key, rim, fill);

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

  // ---- Logo assembly -------------------------------------------------------
  const LOGO_RES = lite ? 30 : 40;
  const voxels = logo ? await rasterizeLogo(LOGO_RES).catch(() => []) : [];
  const logoOf = new Int32Array(count).fill(-1); // instance → voxel index
  const vx = new Float32Array(voxels.length);
  const vy = new Float32Array(voxels.length);
  const vz = new Float32Array(voxels.length);
  const vDelay = new Float32Array(voxels.length);
  const vFall = new Float32Array(voxels.length);
  let voxelSize = 0;
  const logoCenter = new Vector3();
  let logoStart = -1; // seconds (scene clock); -1 = not placed yet
  let logoDoneSent = false;

  /** Place the logo over the anchor element and pick blocks to fly there */
  const placeLogo = () => {
    const box = logo?.anchor();
    const rect = container.getBoundingClientRect();
    if (!box || !voxels.length || !rect.width) return false;

    // Vertical plane (z = 10) the logo stands on — close enough to stay out of the fog
    const plane = new Plane(new Vector3(0, 0, 1), -10);
    const toWorld = (px: number, py: number, out: Vector3) => {
      raycaster.setFromCamera(
        new Vector2(
          ((px - rect.left) / rect.width) * 2 - 1,
          -((py - rect.top) / rect.height) * 2 + 1,
        ),
        camera,
      );
      return raycaster.ray.intersectPlane(plane, out);
    };
    const top = new Vector3();
    const bottom = new Vector3();
    const cx = box.left + box.width / 2;
    if (
      !toWorld(cx, box.top + box.height * 0.5, logoCenter) ||
      !toWorld(cx, box.top, top) ||
      !toWorld(cx, box.bottom, bottom)
    ) {
      return false;
    }
    voxelSize = ((top.y - bottom.y) * 0.8) / LOGO_RES;

    // Nearest floor blocks (to the logo's foot) become the voxels, matched left→right
    const foot = new Vector2(logoCenter.x, logoCenter.z);
    const nearest = Array.from({ length: count }, (_, i) => i)
      .sort(
        (a, b) =>
          Math.hypot(xs[a] - foot.x, zs[a] - foot.y) -
          Math.hypot(xs[b] - foot.x, zs[b] - foot.y),
      )
      .slice(0, voxels.length)
      .sort((a, b) => xs[a] - xs[b] || zs[a] - zs[b]);
    const order = voxels
      .map((_, k) => k)
      .sort(
        (a, b) => voxels[a].gx - voxels[b].gx || voxels[a].gy - voxels[b].gy,
      );

    order.forEach((k, n) => {
      const v = voxels[k];
      logoOf[nearest[n]] = k;
      vx[k] = logoCenter.x + (v.gx - LOGO_RES / 2 + 0.5) * voxelSize;
      vy[k] = logoCenter.y + (v.gy - LOGO_RES / 2 + 0.5) * voxelSize;
      vz[k] = logoCenter.z + (v.kind ? voxelSize * 0.6 : 0);
      const row = v.gy / LOGO_RES;
      vDelay[k] = row * BUILD_STAGGER + Math.random() * 0.15;
      vFall[k] = (1 - row) * FALL_STAGGER + Math.random() * 0.15;
    });
    return true;
  };

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

  let t0 = -1;
  const draw = (time: number) => {
    if (t0 < 0) t0 = time;
    const t = (time - t0) / 1000; // scene clock

    if (logo && logoStart < 0 && voxels.length && t * 1000 >= logo.delay) {
      logoStart = placeLogo() ? t : Infinity;
      if (logoStart !== Infinity) logo.onStart?.();
      else if (!logoDoneSent) {
        logoDoneSent = true;
        logo.onDone?.();
      }
    }
    const lt = logoStart >= 0 && logoStart !== Infinity ? t - logoStart : -1;
    if (lt >= HOLD_UNTIL && !logoDoneSent) {
      logoDoneSent = true;
      logo?.onDone?.();
    }
    const logoActive = lt >= 0 && lt < HOLD_UNTIL + FALL_STAGGER + FALL + 0.2;
    // Slight turn toward the pointer while the logo stands
    const turn = parallax.x * 0.35 + Math.sin(t * 0.8) * 0.06;
    const cosT = Math.cos(turn);
    const sinT = Math.sin(turn);

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

      const level = clamp01((height - 0.3) / 3.6);
      if (level < 0.45) color.copy(LOW).lerp(MID, level / 0.45);
      else if (level < 0.8) color.copy(MID).lerp(HIGH, (level - 0.45) / 0.35);
      else color.copy(HIGH).lerp(PEAK, (level - 0.8) / 0.2);

      const k = logoActive ? logoOf[i] : -1;
      if (k >= 0) {
        // 0 = in the field, 1 = in the logo
        const p =
          lt < HOLD_UNTIL
            ? easeInOut(clamp01((lt - vDelay[k]) / RISE))
            : 1 - easeInOut(clamp01((lt - HOLD_UNTIL - vFall[k]) / FALL));
        const dx0 = vx[k] - logoCenter.x;
        const dz0 = vz[k] - logoCenter.z;
        const lx = logoCenter.x + dx0 * cosT + dz0 * sinT;
        const lz = logoCenter.z - dx0 * sinT + dz0 * cosT;
        const s = voxelSize * 0.92;
        const depth = voxels[k].kind ? 2.2 : 1.2;
        dummy.position.set(
          x + (lx - x) * p,
          (vy[k] - s / 2) * p + Math.sin(p * Math.PI) * 1.5,
          z + (lz - z) * p,
        );
        dummy.rotation.set(0, turn * p, 0);
        dummy.scale.set(
          1 + (s / 0.8 - 1) * p,
          height + (s - height) * p,
          1 + ((s * depth) / 0.8 - 1) * p,
        );
        color.lerp(voxels[k].kind ? LOGO_M : LOGO_FRAME, p);
      } else {
        dummy.position.set(x, 0, z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, height, 1);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
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
