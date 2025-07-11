import fs from "fs-extra";
import handlebars from "handlebars";
import {
  pascalCase,
  camelCase,
  paramCase,
  constantCase,
  capitalCase,
} from "change-case";

handlebars.registerHelper("pascalCase", pascalCase);
handlebars.registerHelper("camelCase", camelCase);
handlebars.registerHelper("kebabCase", paramCase);
handlebars.registerHelper("constantCase", constantCase);
handlebars.registerHelper("capitalCase", capitalCase);
handlebars.registerHelper(
  "raw",
  function (this: object, options: handlebars.HelperOptions) {
    return options.fn(this);
  }
);

export const renderTemplate = async (
  templatePath: string,
  context: Record<string, string>
) => {
  const raw = await fs.readFile(templatePath, "utf-8");
  const compiled = handlebars.compile(raw);
  return compiled(context);
};
