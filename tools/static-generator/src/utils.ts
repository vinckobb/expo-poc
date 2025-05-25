import {
  paramCase,
  pascalCase,
  camelCase,
  constantCase,
  capitalCase,
} from "change-case";

export interface TemplateVars extends Record<string, string> {
  name: string;
  camelCase: string;
  pascalCase: string;
  kebabCase: string;
  capitalCase: string;
  constantCase: string;
}

export const buildTemplateVars = (name: string): TemplateVars => ({
  name,
  camelCase: camelCase(name),
  pascalCase: pascalCase(name),
  kebabCase: paramCase(name),
  capitalCase: capitalCase(name),
  constantCase: constantCase(name),
});
