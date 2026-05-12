import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";

const defaultModel = "gpt-4.1-mini";
const defaultMaxOutputTokens = 1200;
const maxPromptCharacters = 12000;
const maxOutputTokenCeiling = 3000;

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

export function loadOpenAIEnv() {
  loadEnvFile(path.join(process.cwd(), ".env.local"));
}

export function createOpenAIClient() {
  loadOpenAIEnv();

  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is missing. Add it to .env.local or your shell environment.",
    );
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

function parsePositiveInteger(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(
      `OPENAI_MAX_OUTPUT_TOKENS must be a positive integer. Received: ${value}`,
    );
  }

  return parsed;
}

export function estimateTokenCount(text: string) {
  return Math.ceil(text.length / 4);
}

export function getOpenAIGenerationSettings() {
  loadOpenAIEnv();

  const model = process.env.OPENAI_MODEL ?? defaultModel;
  const maxOutputTokens = parsePositiveInteger(
    process.env.OPENAI_MAX_OUTPUT_TOKENS,
    defaultMaxOutputTokens,
  );

  if (maxOutputTokens > maxOutputTokenCeiling) {
    throw new Error(
      `OPENAI_MAX_OUTPUT_TOKENS is set to ${maxOutputTokens}, which is above the safety limit of ${maxOutputTokenCeiling}. Lower it before generating content.`,
    );
  }

  return {
    model,
    maxOutputTokens,
    maxPromptCharacters,
    estimatedOutputTokenLimit: maxOutputTokens,
  };
}

function validatePromptLength(prompt: string, promptCharacterLimit: number) {
  if (prompt.length > promptCharacterLimit) {
    throw new Error(
      `OpenAI prompt is ${prompt.length} characters, which exceeds the safety limit of ${promptCharacterLimit}. Shorten the prompt before generating content.`,
    );
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateOpenAIText({
  prompt,
  retries = 2,
}: {
  prompt: string;
  retries?: number;
}) {
  const client = createOpenAIClient();
  const { model, maxOutputTokens, maxPromptCharacters } =
    getOpenAIGenerationSettings();

  validatePromptLength(prompt, maxPromptCharacters);

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await client.responses.create({
        model,
        input: prompt,
        max_output_tokens: maxOutputTokens,
      });

      const text = response.output_text.trim();

      if (!text) {
        throw new Error("OpenAI returned an empty response.");
      }

      return text;
    } catch (error) {
      lastError = error;

      if (attempt === retries) {
        break;
      }

      await wait(1000 * 2 ** attempt);
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("OpenAI generation failed.");
}
