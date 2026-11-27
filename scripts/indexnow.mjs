// ====================================
// 📣 IndexNow: tell Bing (and other IndexNow engines) the site changed
// ====================================
// Runs after `deploy` (see "postdeploy" in package.json). Reads every URL from
// the built sitemap and submits them in one request.
//
// The key is not a secret: IndexNow verifies ownership by fetching
// /<key>.txt from the site, so it lives in public/ and ships with each deploy.
//
// Usage: node scripts/indexnow.mjs [--dry-run]

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "out";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const dryRun = process.argv.includes("--dry-run");

// A publish must never fail because of a notification, so every problem is a warning
const warn = (message) => {
  console.warn(`⚠️  IndexNow skipped: ${message}`);
  process.exit(0);
};

let keyFile;
let sitemap;
try {
  // The key file is the one named <32 hex chars>.txt whose content is its own name
  keyFile = readdirSync(OUT_DIR).find((name) => {
    const match = name.match(/^([a-f0-9]{32})\.txt$/);
    return match && readFileSync(join(OUT_DIR, name), "utf8").trim() === match[1];
  });
  sitemap = readFileSync(join(OUT_DIR, "sitemap.xml"), "utf8");
} catch (error) {
  warn(`could not read the build in ${OUT_DIR}/ (${error.message})`);
}
if (!keyFile) warn(`no key file found in ${OUT_DIR}/`);

const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (urlList.length === 0) warn("the sitemap has no URLs");

const { origin, host } = new URL(urlList[0]);
const key = keyFile.replace(/\.txt$/, "");
const payload = { host, key, keyLocation: `${origin}/${keyFile}`, urlList };

// The build ID folder (next to chunks/ and media/) changes on every build
const buildId = readdirSync(join(OUT_DIR, "_next", "static")).find(
  (name) => !["chunks", "media"].includes(name),
);

if (dryRun) {
  console.log(`IndexNow dry run: would submit ${urlList.length} URLs (build ${buildId})`);
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

// GitHub Pages takes a minute or two to go live after gh-pages pushes. Submitting
// before then makes Bing fetch the key file too early and reject the key (HTTP 403),
// and crawl the old pages. So wait until both this build and the key file are online.
const WAIT_MS = 5 * 60 * 1000;
const POLL_MS = 15 * 1000;
const isLive = async (path) => {
  try {
    // The query string skips the CDN's cached 404
    const response = await fetch(`${origin}${path}?t=${Date.now()}`, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

const deadline = Date.now() + WAIT_MS;
console.log("IndexNow: waiting for GitHub Pages to publish this build...");
while (
  !(await isLive(`/_next/static/${buildId}/_buildManifest.js`)) ||
  !(await isLive(`/${keyFile}`))
) {
  if (Date.now() > deadline) {
    warn("the new build was not online after 5 minutes. Run `pnpm run indexnow` once it is");
  }
  await new Promise((resolve) => setTimeout(resolve, POLL_MS));
}

try {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  // 200 = accepted, 202 = accepted while the key is still being verified
  if (response.status === 200 || response.status === 202) {
    console.log(`✅ IndexNow: submitted ${urlList.length} URLs (HTTP ${response.status})`);
  } else {
    warn(`HTTP ${response.status} ${await response.text()}`);
  }
} catch (error) {
  warn(error.message);
}
