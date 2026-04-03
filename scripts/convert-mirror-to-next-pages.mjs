import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MIRROR_PAGES_DIR = path.join(ROOT, "mirror", "pages");
const PUBLIC_DIR = path.join(ROOT, "public");
const ASSETS_DIR = path.join(PUBLIC_DIR, "assets");
const DATA_DIR = path.join(ROOT, "data");
const OUTPUT_JSON = path.join(DATA_DIR, "site-pages.json");

const URL_REPLACEMENTS = [
  [/https?:\/\/www\.aebdigital\.com\/wp-content\/uploads\//g, "/assets/uploads/"],
  [/https?:\/\/www\.aebdigital\.com\/assets\/uploads\//g, "/assets/uploads/"],
  [/\/wp-content\/uploads\//g, "/assets/uploads/"],
  [/\/wp-content\/themes\/bricks\/assets\//g, "/assets/vendor/"],
  [/\/wp-content\/plugins\/cookie-law-info\/lite\/frontend\//g, "/assets/vendor/cookie/"],
  [/\/wp-includes\/css\/classic-themes\.min\.css/g, "/assets/vendor/css/classic-themes.min.css"],
  [/\/wp-includes\/js\/wp-emoji-release\.min\.js/g, "/assets/vendor/js/wp-emoji-release.min.js"],
  [/\/wp-includes\/js\/wp-emoji-loader\.min\.js/g, "/assets/vendor/js/wp-emoji-loader.min.js"],
  [/\/wp-content\/themes\/bricks\/\*/g, "/assets/vendor/*"],
  [/\/wp-content\/uploads\/\*/g, "/assets/uploads/*"],
  [/\/wp-content\/plugins\/\*/g, "/assets/vendor/*"],
  [/\/wp-content\/\*/g, "/assets/*"],
];

const COPY_MAP = [
  {
    src: path.join(PUBLIC_DIR, "wp-content", "uploads"),
    dest: path.join(ASSETS_DIR, "uploads"),
  },
  {
    src: path.join(PUBLIC_DIR, "wp-content", "themes", "bricks", "assets", "css"),
    dest: path.join(ASSETS_DIR, "vendor", "css"),
  },
  {
    src: path.join(PUBLIC_DIR, "wp-content", "themes", "bricks", "assets", "fonts"),
    dest: path.join(ASSETS_DIR, "vendor", "fonts"),
  },
  {
    src: path.join(PUBLIC_DIR, "wp-content", "themes", "bricks", "assets", "js"),
    dest: path.join(ASSETS_DIR, "vendor", "js"),
  },
  {
    src: path.join(PUBLIC_DIR, "wp-content", "themes", "bricks", "assets", "svg"),
    dest: path.join(ASSETS_DIR, "vendor", "svg"),
  },
  {
    src: path.join(PUBLIC_DIR, "wp-content", "plugins", "cookie-law-info", "lite", "frontend", "images"),
    dest: path.join(ASSETS_DIR, "vendor", "cookie", "images"),
  },
  {
    src: path.join(PUBLIC_DIR, "wp-content", "plugins", "cookie-law-info", "lite", "frontend", "js"),
    dest: path.join(ASSETS_DIR, "vendor", "cookie", "js"),
  },
  {
    src: path.join(PUBLIC_DIR, "wp-includes", "css", "classic-themes.min.css"),
    dest: path.join(ASSETS_DIR, "vendor", "css", "classic-themes.min.css"),
  },
  {
    src: path.join(PUBLIC_DIR, "wp-includes", "js", "wp-emoji-release.min.js"),
    dest: path.join(ASSETS_DIR, "vendor", "js", "wp-emoji-release.min.js"),
  },
  {
    src: path.join(PUBLIC_DIR, "wp-includes", "js", "wp-emoji-loader.min.js"),
    dest: path.join(ASSETS_DIR, "vendor", "js", "wp-emoji-loader.min.js"),
  },
];

const LINK_RELS_TO_KEEP = [
  "stylesheet",
  "icon",
  "apple-touch-icon",
  "mask-icon",
  "preconnect",
  "dns-prefetch",
];

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function copyIfExists(src, dest) {
  if (!(await pathExists(src))) {
    return;
  }

  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.cp(src, dest, { recursive: true, force: true });
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return [fullPath];
    }),
  );

  return files.flat();
}

function decodeBasicEntities(value) {
  return value
    .replaceAll("&#038;", "&")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'");
}

function normalizePathFromFile(filePath) {
  const relative = path.relative(MIRROR_PAGES_DIR, filePath).replaceAll("\\", "/");
  if (relative === "index.html") {
    return "/";
  }

  const withoutExt = relative.replace(/\.html$/, "");
  return `/${withoutExt}/`;
}

function parsePageDocument(html) {
  const htmlTagMatch = html.match(/<html[^>]*>/i);
  const langMatch = htmlTagMatch?.[0]?.match(/\blang=["']([^"']+)["']/i);
  const lang = langMatch?.[1] ?? "sk";

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = decodeBasicEntities((titleMatch?.[1] ?? "").trim());

  const descriptionMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["'][^>]*>/i,
  );
  const description = descriptionMatch
    ? decodeBasicEntities(descriptionMatch[1].trim())
    : null;

  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  const head = headMatch?.[1] ?? "";
  const body = bodyMatch?.[1] ?? "";

  const linkTags = (head.match(/<link\b[^>]*>/gi) ?? []).filter((tag) => {
    const relMatch = tag.match(/\brel=["']([^"']+)["']/i);
    if (!relMatch) {
      return false;
    }

    const rel = relMatch[1].toLowerCase();
    return LINK_RELS_TO_KEEP.some((allowedRel) => rel.includes(allowedRel));
  });

  const styleTags = head.match(/<style\b[\s\S]*?<\/style>/gi) ?? [];
  const headScripts = head.match(/<script\b[\s\S]*?<\/script>/gi) ?? [];

  return {
    lang,
    title,
    description,
    html: `${linkTags.join("\n")}\n${styleTags.join("\n")}\n${headScripts.join(
      "\n",
    )}\n${body}`,
  };
}

function rewriteAssetUrls(html) {
  let output = html;
  for (const [pattern, replacement] of URL_REPLACEMENTS) {
    output = output.replace(pattern, replacement);
  }

  output = output
    .replace(/\/assets\/uploads\/2025\/05\/IMG_8514\.jpgg/g, "/assets/uploads/2025/05/IMG_8513.jpg")
    .replace(/href=""/g, 'href="/"')
    .replace(/<!DOCTYPE html>/gi, "")
    .replace(/<\/?(?:html|head|body)\b[^>]*>/gi, "");

  return output.trim();
}

async function migrateAssets() {
  const hasLegacyWordPressTree =
    (await pathExists(path.join(PUBLIC_DIR, "wp-content"))) ||
    (await pathExists(path.join(PUBLIC_DIR, "wp-includes")));

  if (!hasLegacyWordPressTree) {
    await fs.mkdir(ASSETS_DIR, { recursive: true });
    return;
  }

  await fs.rm(ASSETS_DIR, { recursive: true, force: true });
  await fs.mkdir(ASSETS_DIR, { recursive: true });

  for (const { src, dest } of COPY_MAP) {
    await copyIfExists(src, dest);
  }

  await fs.rm(path.join(PUBLIC_DIR, "wp-content"), { recursive: true, force: true });
  await fs.rm(path.join(PUBLIC_DIR, "wp-includes"), { recursive: true, force: true });
}

async function generatePageData() {
  const files = (await walk(MIRROR_PAGES_DIR)).filter((file) => file.endsWith(".html"));
  const pages = {};

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = parsePageDocument(raw);
    const routePath = normalizePathFromFile(filePath);

    pages[routePath] = {
      lang: parsed.lang,
      title: parsed.title || "Vavrostav",
      description: parsed.description,
      html: rewriteAssetUrls(parsed.html),
    };
  }

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(OUTPUT_JSON, JSON.stringify(pages, null, 2), "utf8");
}

async function main() {
  await migrateAssets();
  await generatePageData();
  console.log("Converted mirror to Next page dataset.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
