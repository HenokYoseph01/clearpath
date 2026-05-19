# AI Prompt Guidelines

Use Anthropic API model `claude-3-5-haiku-20241022` for short in-app CBT support. The older prompt value `claude-haiku-4-5` is not a valid Anthropic model identifier in the current official model list.

- API key is read from `expo-secure-store`.
- Never hardcode user API keys.
- Always fall back to rule-based CBT helpers when AI fails, is unavailable, or returns malformed data.
- AI output must be editable by the user.
- Prompts must use warm, non-judgmental wording.
- JSON-returning calls must request only JSON with no markdown fences.
