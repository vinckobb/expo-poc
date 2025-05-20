import { paramCase, pascalCase, camelCase } from "change-case";

export interface TemplateVars extends Record<string, string> {
  name: string;
  camelCase: string;
  pascalCase: string;
  kebabCase: string;
  spacedName: string;
  spacedCapitalisedName: string;
}

export const buildTemplateVars = (name: string): TemplateVars => ({
  name,
  camelCase: camelCase(name),
  pascalCase: pascalCase(name),
  kebabCase: paramCase(name),
  spacedName: paramCase(name).replace(/-/g, " "),
  spacedCapitalisedName: paramCase(name)
    .replace(/-/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
});
