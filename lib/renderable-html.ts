export type MirrorScript = {
  attributes: Record<string, string>;
  content: string;
};

const LINK_TAG_REGEX = /<link\b[^>]*>\s*/gi;
const SCRIPT_TAG_REGEX = /<script\b([^>]*)>([\s\S]*?)<\/script>\s*/gi;
const META_TAG_REGEX = /<meta\b[^>]*>\s*/gi;
const TITLE_TAG_REGEX = /<title\b[^>]*>[\s\S]*?<\/title>\s*/gi;
const ATTRIBUTE_REGEX = /([^\s=/>]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

function parseAttributes(raw: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  let match = ATTRIBUTE_REGEX.exec(raw);

  while (match) {
    const [, name, dqValue, sqValue, bareValue] = match;
    const value = dqValue ?? sqValue ?? bareValue ?? "";
    attributes[name] = value;
    match = ATTRIBUTE_REGEX.exec(raw);
  }

  ATTRIBUTE_REGEX.lastIndex = 0;

  return attributes;
}

export function splitRenderableHtml(html: string): {
  html: string;
  scripts: MirrorScript[];
} {
  const scripts: MirrorScript[] = [];
  const withoutLinks = html.replace(LINK_TAG_REGEX, "");
  const withoutScripts = withoutLinks.replace(SCRIPT_TAG_REGEX, (_fullTag, attrs, content) => {
    scripts.push({
      attributes: parseAttributes(String(attrs ?? "")),
      content: String(content ?? ""),
    });

    return "";
  });

  const cleaned = withoutScripts
    .replace(META_TAG_REGEX, "")
    .replace(TITLE_TAG_REGEX, "");

  return {
    html: cleaned.trim(),
    scripts,
  };
}
