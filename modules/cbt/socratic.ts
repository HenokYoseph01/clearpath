export const socraticPrompts = [
  {
    key: "evidenceFor",
    title: "What points toward this thought?",
    helper: "Name the facts that seem to support it. Keep this gentle and specific.",
  },
  {
    key: "evidenceAgainst",
    title: "What points another way?",
    helper: "Look for facts your mind might be leaving out.",
  },
  {
    key: "friendPerspective",
    title: "What would you tell someone you care about?",
    helper: "Use the same kindness you would offer them.",
  },
] as const;
