/*
  Renders scene.js frame by frame and encodes public/intro/logo-intro.{webm,mp4}.

  Needs (dev machine only, not the site): Playwright + a Chromium, and ffmpeg
  with libvpx-vp9 and libx264.

    FFMPEG=/path/to/ffmpeg node scripts/logo-intro/render.mjs

  Env: FPS (60), SIZE render px (1080), OUT_SIZE video px (720), CHROMIUM path.
*/
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const FPS = Number(process.env.FPS ?? 60);
const SIZE = Number(process.env.SIZE ?? 1080);
const OUT_SIZE = Number(process.env.OUT_SIZE ?? 720);
const FFMPEG = process.env.FFMPEG ?? "ffmpeg";

// Logo paths straight from the site's source of truth
const src = fs.readFileSync(path.join(root, "components/ui/logoPaths.ts"), "utf8");
const viewBox = Number(src.match(/LOGO_VIEWBOX = (\d+)/)[1]);
const paths = [...src.matchAll(/fill: "([^"]+)",[\s\S]*?d: "([^"]+)"/g)].map(([, fill, d]) => ({ fill, d }));
if (paths.length !== 4) throw new Error(`Expected 4 logo paths, found ${paths.length}`);

const page = `<!doctype html><html><head><style>html,body{margin:0;background:#000}</style>
<script type="importmap">{"imports":{"three":"/node_modules/three/build/three.module.js","three/addons/":"/node_modules/three/examples/jsm/"}}</script>
<script>window.LOGO=${JSON.stringify({ viewBox, paths })};window.RENDER_SIZE=${SIZE};</script>
</head><body><script type="module" src="/scripts/logo-intro/scene.js"></script></body></html>`;

const server = http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    if (url === "/") return res.end(page);
    const file = path.join(root, url);
    if (!file.startsWith(root) || !fs.existsSync(file)) return res.writeHead(404).end();
    res.writeHead(200, { "Content-Type": file.endsWith(".js") ? "text/javascript" : "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(0);
const port = server.address().port;

const frames = fs.mkdtempSync(path.join(os.tmpdir(), "logo-intro-"));
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const tab = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });
tab.on("pageerror", (e) => console.error("page error:", e.message));
await tab.goto(`http://localhost:${port}/`);
await tab.waitForFunction(() => window.sceneReady, null, { timeout: 60000 });

const duration = await tab.evaluate(() => window.DURATION);
const total = Math.round(duration * FPS) + 1;
const canvas = tab.locator("canvas");
for (let i = 0; i < total; i++) {
  await tab.evaluate((t) => window.renderAt(t), i / FPS);
  await canvas.screenshot({ path: path.join(frames, `f${String(i).padStart(4, "0")}.png`) });
  if (i % 30 === 0) console.log(`frame ${i + 1}/${total}`);
}
const box = await tab.evaluate(() => window.logoBox());
await browser.close();
server.close();

const outDir = path.join(root, "public/intro");
fs.mkdirSync(outDir, { recursive: true });
// Frames are rendered on pure black; "lighten" them onto the site's background
// colour so the film sits on exactly the page's #11111b (no dark box)
const BG = process.env.BG ?? "0x11111b";
const input = [
  "-y", "-hide_banner", "-loglevel", "error",
  "-framerate", String(FPS), "-i", path.join(frames, "f%04d.png"),
  "-f", "lavfi", "-i", `color=c=${BG}:s=${OUT_SIZE}x${OUT_SIZE}:r=${FPS}`,
  "-filter_complex", `[0:v]scale=${OUT_SIZE}:${OUT_SIZE}:flags=lanczos,format=gbrp[f];[1:v]format=gbrp[bg];[f][bg]blend=all_mode=lighten:shortest=1,format=yuv420p`,
  "-an",
];
execFileSync(FFMPEG, [...input, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", "-deadline", "good", path.join(outDir, "logo-intro.webm")], { stdio: "inherit" });
execFileSync(FFMPEG, [...input, "-c:v", "libx264", "-preset", "slow", "-crf", "22", "-profile:v", "high", "-movflags", "+faststart", path.join(outDir, "logo-intro.mp4")], { stdio: "inherit" });
fs.writeFileSync(path.join(outDir, "logo-box.json"), JSON.stringify(box, null, 2) + "\n");

for (const f of ["logo-intro.webm", "logo-intro.mp4"]) {
  console.log(f, Math.round(fs.statSync(path.join(outDir, f)).size / 1024) + "KB");
}
console.log("logo box (fraction of frame):", box, "frames in", frames);
