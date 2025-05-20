import path from "path";
import fs from "fs-extra";
import { globby } from "globby";
import { buildTemplateVars, TemplateVars } from "./utils.js";
import { renderTemplate } from "./templateEngine.js";
import handlebars from "handlebars";

const resolvePathTemplate = (templatePath: string, context: any): string => {
  const parts = templatePath.split("/");
  console.log(`[PATH] Raw path: ${templatePath}`);
  const renderedParts = parts.map((part) => {
    const compiled = handlebars.compile(part);
    const rendered = compiled(context);
    console.log(`[PATH] Segment: "${part}" -> "${rendered}"`);
    return rendered;
  });
  const full = path.join(...renderedParts);
  console.log(`[PATH] Final rendered path: ${full}`);
  return full;
};

interface Options {
  template: string;
  name: string;
  targetDir: string;
  templatesRoot: string;
}

export const runGenerator = async ({
  template,
  name,
  targetDir,
  templatesRoot,
}: Options) => {
  console.log(`[GENERATOR] Starting generator with parameters:`);
  console.log(`[GENERATOR] Template: ${template}`);
  console.log(`[GENERATOR] Entity name: ${name}`);
  console.log(`[GENERATOR] Target directory: ${targetDir}`);
  console.log(`[GENERATOR] Templates root: ${templatesRoot}`);

  const srcDir = path.join(templatesRoot, template);
  console.log(`[GENERATOR] Source directory: ${srcDir}`);

  const files = await globby("**/*", { cwd: srcDir, dot: true });
  console.log(`[GENERATOR] Found ${files.length} files to process`);

  const vars: TemplateVars = buildTemplateVars(name);
  console.log(`[GENERATOR] Template variables prepared:`);
  console.log(`[GENERATOR] - Original name: ${vars.name}`);
  console.log(`[GENERATOR] - Pascal case: ${vars.pascalCase}`);
  console.log(`[GENERATOR] - Camel case: ${vars.camelCase}`);
  console.log(`[GENERATOR] - Kebab case: ${vars.kebabCase}`);

  for (const file of files) {
    if (file === "meta.json") {
      console.log(`[GENERATOR] Skipping meta.json file`);
      continue;
    }

    const srcPath = path.join(srcDir, file);
    const isTemplate = file.endsWith(".hbs");
    const rawTargetPath = isTemplate ? file.slice(0, -4) : file;

    console.log(`[GENERATOR] Processing file: ${file}`);
    console.log(`[GENERATOR] Is template: ${isTemplate}`);
    console.log(`[GENERATOR] Raw target path: ${rawTargetPath}`);

    const destRel = resolvePathTemplate(rawTargetPath, vars);
    const destPath = path.join(targetDir, destRel);
    console.log(`[GENERATOR] Destination path: ${destPath}`);

    const rendered = await renderTemplate(srcPath, vars);
    console.log(`[GENERATOR] Content rendered, size: ${rendered.length} bytes`);

    await fs.ensureDir(path.dirname(destPath));
    await fs.writeFile(destPath, rendered);
    console.log(`[GENERATOR] File written: ${destPath}`);
  }

  console.log(
    `[GENERATOR] Generation completed for '${name}' in '${targetDir}'`
  );
};
