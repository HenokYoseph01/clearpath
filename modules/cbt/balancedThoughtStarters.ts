export type BalancedThoughtStarter = {
  key: string;
  title: string;
  thought: string;
};

function clean(value: string): string {
  return value.trim();
}

export function getBalancedThoughtStarters(args: {
  situation: string;
  automaticThought: string;
  evidenceFor: string;
  evidenceAgainst: string;
  friendPerspective: string;
}): BalancedThoughtStarter[] {
  const situation = clean(args.situation);
  const automaticThought = clean(args.automaticThought);
  const evidenceFor = clean(args.evidenceFor);
  const evidenceAgainst = clean(args.evidenceAgainst);
  const friendPerspective = clean(args.friendPerspective);
  const thoughtText = automaticThought ? `"${automaticThought}"` : "this thought";

  return [
    {
      key: "evidence-balanced",
      title: "Evidence-based",
      thought: [
        situation ? `The situation is: ${situation}.` : "This moment is hard and worth looking at carefully.",
        evidenceFor ? `Some evidence points toward ${thoughtText}: ${evidenceFor}.` : `Some part of me believes ${thoughtText}.`,
        evidenceAgainst ? `There is also evidence that points another way: ${evidenceAgainst}.` : "There may also be details I cannot see clearly right now.",
        "A more balanced view can hold both sides without treating the hardest thought as the whole truth.",
      ].join(" "),
    },
    {
      key: "friend-perspective",
      title: "Kind friend",
      thought: friendPerspective
        ? `If someone I cared about had this thought, I might tell them: ${friendPerspective}. I can offer myself a little of that same steadiness here.`
        : `If someone I cared about had this thought, I would probably slow down, ask what else could be true, and remind them they do not have to solve everything at once.`,
    },
    {
      key: "alternative-explanation",
      title: "Other explanations",
      thought: `One possible story is ${thoughtText}, but it is not the only possible story. There may be other explanations, missing information, or context I do not have yet.`,
    },
    {
      key: "coping-oriented",
      title: "Next small step",
      thought: `Even if ${thoughtText} feels loud right now, I can choose one small next step: pause, check the facts, ask for clarity, or do something grounding before I respond.`,
    },
  ];
}
