import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

// This standalone profile is independent of the retained al-folio installation.
const source = new URL("../site/", import.meta.url);
const output = new URL("../_site/", import.meta.url);
// The generated directory is always rebuilt to avoid deploying stale Jekyll pages.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
const data = await readFile(new URL("content.js", source), "utf8");
const renderer = await readFile(new URL("app.js", source), "utf8");

for (const [page, layout] of Object.entries({ index: "classic", classic: "classic", editorial: "editorial", studio: "studio" })) {
  const context = vm.createContext({ window: {} });
  vm.runInContext(data, context);
  context.window.ACADEMIC.layout = layout;
  context.window.ACADEMIC.previewMode = page !== "index";
  vm.runInContext(renderer, context);
  const template = await readFile(new URL(`${page}.html`, source), "utf8");
  const html = template.replace('<div id="app"></div>', () => `<div id="app">${context.window.academicMarkup}</div>`);
  await writeFile(new URL(`${page}.html`, output), html);
}

// Preserve links in the supplied résumé and the previous Jekyll site.
const redirects = {
  "current-projects": "/#research",
  projects: "/#research",
  publications: "/#publications",
  about: "/#about",
  news: "/#news",
  teaching: "/#about",
  cv: "/assets/Anshul-Nayak-CV.pdf",
};
for (const [route, target] of Object.entries(redirects)) {
  const directory = new URL(`${route}/`, output);
  await mkdir(directory, { recursive: true });
  await writeFile(
    new URL("index.html", directory),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page moved | Anshul Nayak</title><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="https://anshulnayak.com${target}"></head><body><p>This page has moved. <a href="${target}">Continue to Anshul Nayak’s website</a>.</p></body></html>\n`
  );
}
console.log(`Built Academic profile and design previews in ${fileURLToPath(output)}`);
