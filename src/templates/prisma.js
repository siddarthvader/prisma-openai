import {
  GenerateLocation,
  OpenAIConfig,
  PrismaPromptPostfix,
} from "../Constants";
import { postRequest } from "../helpers/api";
const readline = require("readline");
const fs = require("fs");

export default function generatePrismaTemplate(prompt) {
  const headers = generateHeaders(OpenAIConfig.OPEN_API_KEY);
  const body = generateBody(genratePrompts(prompt, PrismaPromptPostfix));
  const URL = getURL();

  //   console.log(JSON.stringify(body, null, 2));

  postRequest(URL, headers, body).then((data) => {
    console.log(JSON.stringify(data, null, 2));

    const match = data.choices[0].message.content;
    if (match) {
      console.log(JSON.stringify(match, null, 2));
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question("Enter name of .prisma file: ", (schemaName) => {
        console.log(`Generating schema for ${schemaName}`);
        const fileName = `${GenerateLocation.folder}/${schemaName}.prisma`;

        fs.writeFile(fileName, match, (err) => {
          if (err) throw err;
          console.log(`Schema saved to ${fileName}`);
        });
        // Call the function to generate the schema with the given name
        // ...
        rl.close();
      });
    } else {
      console.error("No .schema file found in response");
      return null;
    }
  });
}

function generateHeaders(apiKey) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  return headers;
}

function getURL() {
  const url = `${OpenAIConfig.OPENAI_API_ENDPOINT}`;
  return url;
}

function genratePrompts(prompt, postfix) {
  return `${prompt} ${postfix}`;
}

function generateBody(prompt) {
  return {
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
    max_tokens: 1024,
    n: 1,
    model: "gpt-3.5-turbo",
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  };
}
