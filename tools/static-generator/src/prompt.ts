import { input } from "@inquirer/prompts";

export const askTemplateName = async () => {
  const template = await input({
    message: "Template type (e.g. feature):",
  });
  return template;
};

export const askEntityName = async () => {
  const name = await input({
    message: "Entity name:",
  });
  return name;
};

export const askOutputDir = async (suggestedPath?: string): Promise<string> => {
  const message = suggestedPath
    ? `Enter output directory (press Enter to use "${suggestedPath}"):`
    : "Enter output directory (relative to project root):";

  const outputDir = await input({
    message,
  });

  if (!outputDir.trim() && suggestedPath) {
    return suggestedPath;
  }

  return outputDir;
};
