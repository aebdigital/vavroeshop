import { promises as fs } from "node:fs";
import path from "node:path";

const ORIGIN = "https://www.vavrostav.sk";
const ROOT = process.cwd();
const SNAPSHOT_PAGES_DIR = path.join(ROOT, "_snapshot", "pages");
const MIRROR_PAGES_DIR = path.join(ROOT, "mirror", "pages");
const PUBLIC_DIR = path.join(ROOT, "public");

const ALLOWED_HOSTS = new Set(["www.vavrostav.sk", "vavrostav.sk"]);
const ASSET_EXTENSIONS = new Set([
  ".avif",
  ".css",
  ".eot",
  ".gif",
  ".ico",
  ".jpg",
  ".jpeg",
  ".js",
  ".json",
  ".map",
  ".mp4",
  ".otf",
  ".pdf",
  ".png",
  ".svg",
  ".ttf",
  ".webm",
  ".webp",
  ".woff",
  ".woff2",
  ".xml",
]);

function decodeHtmlEntities(value) {
  return value.replaceAll("&#038;", "&").replaceAll("&amp;", "&");
}

function cleanUrlToken(value) {
  return decodeHtmlEntities(value.trim().replace(/^['"]+|['"]+$/g, ""))
    .replace(/[),;]+$/g, "")
    .trim();
}

function extractCandidatesFromHtml(html) {
  const matches = new Set();

  const absoluteUrlPattern = /https?:\/\/[^"'`\s<>()\\]+/gi;
  for (const match of html.matchAll(absoluteUrlPattern)) {
    matches.add(match[0]);
  }

  const protocolRelativePattern = /\/\/www\.vavrostav\.sk[^"'`\s<>()\\]+/gi;
  for (const match of html.matchAll(protocolRelativePattern)) {
    matches.add(`https:${match[0]}`);
  }

  const rootAssetPattern = /\/(?:wp-content|wp-includes|wp-admin)\/[^"'`\s<>()\\]+/gi;
  for (const match of html.matchAll(rootAssetPattern)) {
    matches.add(match[0]);
  }

  return Array.from(matches);
}

function extractCandidatesFromCss(css) {
  const matches = new Set();

  const urlPattern = /url\(([^)]+)\)/gi;
  for (const match of css.matchAll(urlPattern)) {
    matches.add(match[1]);
  }

  const importPattern = /@import\s+(?:url\()?['"]?([^'")\s]+)['"]?\)?/gi;
  for (const match of css.matchAll(importPattern)) {
    matches.add(match[1]);
  }

  return Array.from(matches);
}

function normalizeToAbsoluteUrl(candidate, baseUrl) {
  const cleaned = cleanUrlToken(candidate);
  if (
    !cleaned ||
    cleaned.startsWith("#") ||
    cleaned.startsWith("data:") ||
    cleaned.startsWith("mailto:") ||
    cleaned.startsWith("tel:") ||
    cleaned.startsWith("javascript:")
  ) {
    return null;
  }

  const maybeProtocolRelative = cleaned.startsWith("//")
    ? `https:${cleaned}`
    : cleaned;
  const maybeRootRelative = maybeProtocolRelative.startsWith("/")
    ? `${ORIGIN}${maybeProtocolRelative}`
    : maybeProtocolRelative;

  try {
    const url = new URL(maybeRootRelative, baseUrl ?? ORIGIN);
    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

function shouldDownloadAsset(absoluteUrl) {
  const url = new URL(absoluteUrl);
  if (!ALLOWED_HOSTS.has(url.hostname)) {
    return false;
  }

  const pathname = decodeURIComponent(url.pathname);
  if (!pathname || pathname.endsWith("/")) {
    return false;
  }
  if (pathname.startsWith("/wp-json")) {
    return false;
  }
  if (pathname.endsWith(".php")) {
    return false;
  }

  const lowerPath = pathname.toLowerCase();
  const extension = path.posix.extname(lowerPath);

  if (ASSET_EXTENSIONS.has(extension)) {
    return true;
  }

  if (
    lowerPath.includes("/wp-content/") ||
    lowerPath.includes("/wp-includes/")
  ) {
    return true;
  }

  return false;
}

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(fullPath);
      }
      return [fullPath];
    }),
  );

  return files.flat();
}

function pageFileToRoute(filePath) {
  const relative = path.relative(SNAPSHOT_PAGES_DIR, filePath).replaceAll("\\", "/");
  if (relative === "index.html") {
    return "/";
  }

  return `/${relative.replace(/\.html$/, "")}/`;
}

function pageRouteToBaseUrl(route) {
  return new URL(route, ORIGIN).toString();
}

function rewritePageHtml(html) {
  return html
    .replaceAll("https://www.vavrostav.sk", "")
    .replaceAll("http://www.vavrostav.sk", "")
    .replaceAll("https://vavrostav.sk", "")
    .replaceAll("http://vavrostav.sk", "")
    .replaceAll("https:\\/\\/www.vavrostav.sk", "\\/")
    .replaceAll("http:\\/\\/www.vavrostav.sk", "\\/")
    .replaceAll("https:\\/\\/vavrostav.sk", "\\/")
    .replaceAll("http:\\/\\/vavrostav.sk", "\\/");
}

function publicPathFromUrl(absoluteUrl) {
  const url = new URL(absoluteUrl);
  let decodedPathname;
  try {
    decodedPathname = decodeURIComponent(url.pathname);
  } catch {
    decodedPathname = url.pathname;
  }
  const relativePath = decodedPathname.replace(/^\/+/, "");
  if (!relativePath) {
    return null;
  }

  const destination = path.join(PUBLIC_DIR, relativePath);
  const rootWithSep = `${PUBLIC_DIR}${path.sep}`;
  if (!(destination === PUBLIC_DIR || destination.startsWith(rootWithSep))) {
    return null;
  }

  return destination;
}

async function ensureDirForFile(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function downloadAsset(absoluteUrl) {
  const destination = publicPathFromUrl(absoluteUrl);
  if (!destination) {
    return null;
  }

  if (!(await fileExists(destination))) {
    await ensureDirForFile(destination);

    const response = await fetch(absoluteUrl, {
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) CodexMirrorBot/1.0",
      },
    });

    if (!response.ok) {
      console.warn(`Skip ${absoluteUrl} (${response.status})`);
      return null;
    }

    const data = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(destination, data);
    console.log(`Downloaded ${absoluteUrl}`);
  }

  return destination;
}

async function main() {
  await fs.mkdir(MIRROR_PAGES_DIR, { recursive: true });

  const pageFiles = (await walkFiles(SNAPSHOT_PAGES_DIR)).filter((file) =>
    file.endsWith(".html"),
  );
  const assetQueue = [];
  const queued = new Set();

  for (const filePath of pageFiles) {
    const route = pageFileToRoute(filePath);
    const baseUrl = pageRouteToBaseUrl(route);
    const html = await fs.readFile(filePath, "utf8");

    for (const rawCandidate of extractCandidatesFromHtml(html)) {
      const absoluteUrl = normalizeToAbsoluteUrl(rawCandidate, baseUrl);
      if (!absoluteUrl || !shouldDownloadAsset(absoluteUrl) || queued.has(absoluteUrl)) {
        continue;
      }

      queued.add(absoluteUrl);
      assetQueue.push(absoluteUrl);
    }

    const relativePage = path.relative(SNAPSHOT_PAGES_DIR, filePath);
    const mirrorPagePath = path.join(MIRROR_PAGES_DIR, relativePage);
    await ensureDirForFile(mirrorPagePath);
    await fs.writeFile(mirrorPagePath, rewritePageHtml(html), "utf8");
  }

  const downloaded = new Set();

  for (let i = 0; i < assetQueue.length; i += 1) {
    const assetUrl = assetQueue[i];
    if (downloaded.has(assetUrl)) {
      continue;
    }

    downloaded.add(assetUrl);
    const localPath = await downloadAsset(assetUrl);
    if (!localPath) {
      continue;
    }

    if (!localPath.toLowerCase().endsWith(".css")) {
      continue;
    }

    const cssContent = await fs.readFile(localPath, "utf8");
    for (const rawCandidate of extractCandidatesFromCss(cssContent)) {
      const absoluteUrl = normalizeToAbsoluteUrl(rawCandidate, assetUrl);
      if (!absoluteUrl || !shouldDownloadAsset(absoluteUrl) || queued.has(absoluteUrl)) {
        continue;
      }

      queued.add(absoluteUrl);
      assetQueue.push(absoluteUrl);
    }
  }

  console.log(`Mirrored pages: ${pageFiles.length}`);
  console.log(`Downloaded assets: ${downloaded.size}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
