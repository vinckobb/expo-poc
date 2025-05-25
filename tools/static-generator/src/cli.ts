#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import { runGenerator } from "./generator.js";
import { askTemplateName, askEntityName, askOutputDir } from "./prompt.js";
import fs from "fs-extra";
import os from "os";
import handlebars from "handlebars";
import { buildTemplateVars } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "../../../");
console.log(`[CLI] Project root directory: ${projectRoot}`);

const logsDir = path.resolve(__dirname, "../logs/static-generator");
fs.ensureDirSync(logsDir);

const now = new Date();
const timestamp = now
  .toLocaleString("sv-SE", { hour12: false })
  .replace(/:/g, ".");

const logPath = path.join(logsDir, `${timestamp}.log`);
const logStream = fs.createWriteStream(logPath, { flags: "a" });

const originalLog = console.log;
const originalError = console.error;

console.log = (...args) => {
  const message = args.map(String).join(" ");
  logStream.write(message + os.EOL);
  originalLog(...args);
};
console.error = (...args) => {
  const message = args.map(String).join(" ");
  logStream.write(message + os.EOL);
  originalError(...args);
};

const DEFAULT_GENERATION_PATH = "tools/static-generator/generated";

(async () => {
  console.log(`[CLI] Generator started at ${now.toISOString()}`);
  console.log(`[CLI] Process arguments: ${process.argv.join(", ")}`);
  console.log(`[CLI] Current working directory: ${process.cwd()}`);

  const template = process.argv[2] || (await askTemplateName());
  console.log(`[CLI] Selected template: ${template}`);

  const name = await askEntityName();
  console.log(`[CLI] Entity name: ${name}`);

  const templatesRoot = path.resolve(__dirname, "templates");
  console.log(`[CLI] Templates root directory: ${templatesRoot}`);

  const templateVars = buildTemplateVars(name);

  let suggestedOutputDir: string | undefined = undefined;
  const metaPath = path.join(templatesRoot, template, "meta.json");
  console.log(`[CLI] Looking for meta.json at: ${metaPath}`);

  if (fs.existsSync(metaPath)) {
    console.log(`[CLI] Meta file found for template '${template}'`);
    const meta = JSON.parse(await fs.readFile(metaPath, "utf8"));
    console.log(`[CLI] Meta content: ${JSON.stringify(meta)}`);

    if (meta.baseDir) {
      console.log(`[CLI] Raw baseDir template: ${meta.baseDir}`);
      const compiled = handlebars.compile(meta.baseDir);
      suggestedOutputDir = compiled(templateVars);
      console.log(`[CLI] Compiled baseDir (suggested): ${suggestedOutputDir}`);
    } else {
      console.log(`[CLI] No baseDir found in meta.json`);
      suggestedOutputDir = path.join(DEFAULT_GENERATION_PATH, template);
      console.log(`[CLI] Using default path: ${suggestedOutputDir}`);
    }
  } else {
    console.log(`[CLI] No meta.json found for template '${template}'`);
    suggestedOutputDir = path.join(DEFAULT_GENERATION_PATH, template);
    console.log(`[CLI] Using default path: ${suggestedOutputDir}`);
  }

  const baseDir = await askOutputDir(suggestedOutputDir);
  console.log(`[CLI] Selected output directory: ${baseDir}`);

  const outputDir =
    baseDir.includes(templateVars.kebabCase) ||
    baseDir.includes(templateVars.pascalCase) ||
    baseDir.includes(templateVars.name)
      ? baseDir
      : path.join(baseDir, templateVars.name);

  const targetDir = path.resolve(projectRoot, outputDir);
  console.log(`[CLI] Full target directory: ${targetDir}`);

  console.log(`[CLI] Starting generation process...`);
  await runGenerator({
    template,
    name,
    templatesRoot,
    targetDir,
  });

  console.log(`[CLI] Generator completed successfully`);
  console.info(`[CLI] Log saved to ${logPath}`);
})();
