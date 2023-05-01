import generatePrismaTemplate from "./templates/prisma";

export const TemplateList = {
  prisma: "prisma",
};

export const DefaultTemplate = "prisma";

export const TemplateGeneratorMap = {
  prisma: generatePrismaTemplate,
};

export const PrismaPromptPostfix =
  "Generate a valid .prisma file strictly containing datasource, generator, and models are defined earlier.";

export const OpenAIConfig = {
  OPENAI_API_ENDPOINT: "https://api.openai.com/v1/chat/completions",
};

export const GenerateLocation = {
  folder: "generated",
};
