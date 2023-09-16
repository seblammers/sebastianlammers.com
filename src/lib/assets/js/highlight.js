// modified from: https://github.com/gitpod-io/website/pull/2322/files
import Prism from "prismjs";
import "prismjs/components/prism-docker.min.js";
import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-yaml.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-json.min.js";
import "prismjs/components/prism-markdown.min.js";
import "prismjs/components/prism-sql.min.js";
import "prismjs/components/prism-toml.min.js";
import "prismjs/components/prism-promql.min.js";
import "prismjs/components/prism-r.min.js";
import "prismjs/components/prism-python.min.js";
import { escapeSvelte } from "mdsvex";

const langMap = {
  sh: "bash",
  r: "r",
  Python: "python",
  Dockerfile: "dockerfile",
  YAML: "yaml",
  svelte: "html", // throws error if svelte is used for highlighting
};


export function highlightCode(code, lang, meta) {
  let title = null;
  const _lang = langMap[lang] || lang || "";

  if (meta) {
    title = meta.match(/title="?(.*?)"/)?.[1];
  }

  const highlighted = _lang
    ? Prism.highlight(code, Prism.languages[_lang], _lang)
    : escapeSvelte(code);

  return `<CodeFence code={\`${escapeSvelte(highlighted)}\`} 
  rawCode={${JSON.stringify(code)}} 
  ${lang ? `lang={"${lang}"}` : ""}
  ${title ? `title={"${title}"}` : ""}
  />`;
}