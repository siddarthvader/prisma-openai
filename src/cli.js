import arg from "arg";
import { DefaultTemplate, TemplateGeneratorMap } from "./Constants";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--yes": Boolean,
      "--save": Boolean,
      "-s": "--save",
      "-y": "--yes",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    skipPrompts: args["--yes"] || false,
    save: args["--save"] || false,
    prisma: args["--prisma"] || false,
    template: TemplateGeneratorMap[DefaultTemplate],
    prompt: args["_"].join(" "),
  };
}

export function cli(args) {
  let options = parseArgumentsIntoOptions(args);

  options.template(options.prompt);
}
