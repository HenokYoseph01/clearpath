import * as SecureStore from "expo-secure-store";

export const ANTHROPIC_KEY_STORAGE_KEY = "clearpath.anthropicApiKey";
export const ANTHROPIC_MODEL = "claude-3-5-haiku-20241022";

export async function getAnthropicApiKey(): Promise<string | null> {
  return SecureStore.getItemAsync(ANTHROPIC_KEY_STORAGE_KEY);
}

export async function setAnthropicApiKey(apiKey: string): Promise<void> {
  const trimmed = apiKey.trim();
  if (!trimmed) {
    await SecureStore.deleteItemAsync(ANTHROPIC_KEY_STORAGE_KEY);
    return;
  }
  await SecureStore.setItemAsync(ANTHROPIC_KEY_STORAGE_KEY, trimmed);
}

export async function callAnthropicJson<T>(apiKey: string, system: string, content: string, maxTokens = 500): Promise<T> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic request failed: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.content?.[0]?.text;
  if (typeof text !== "string") {
    throw new Error("Anthropic response was missing text content");
  }
  return JSON.parse(text) as T;
}
