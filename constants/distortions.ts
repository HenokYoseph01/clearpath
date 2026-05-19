export type DistortionKey =
  | "catastrophising"
  | "blackAndWhite"
  | "mindReading"
  | "fortuneTelling"
  | "personalisation"
  | "shouldStatements"
  | "emotionalReasoning"
  | "labelling"
  | "mentalFilter"
  | "discountingPositive";

export const distortionDefinitions: Record<DistortionKey, { title: string; short: string; example: string }> = {
  catastrophising: {
    title: "Catastrophising",
    short: "Your mind jumps to the worst possible outcome.",
    example: "One mistake means everything is ruined.",
  },
  blackAndWhite: {
    title: "Black-and-white thinking",
    short: "Something feels all good or all bad, with no middle ground.",
    example: "If this is not perfect, it is a failure.",
  },
  mindReading: {
    title: "Mind reading",
    short: "Your mind guesses what someone else thinks.",
    example: "They did not reply, so they must be upset with me.",
  },
  fortuneTelling: {
    title: "Fortune telling",
    short: "Your mind treats a feared future as already decided.",
    example: "This will go badly.",
  },
  personalisation: {
    title: "Personalisation",
    short: "You take too much responsibility for what happened.",
    example: "This is all my fault.",
  },
  shouldStatements: {
    title: "Should statements",
    short: "Rigid rules turn into pressure.",
    example: "I should be handling this better.",
  },
  emotionalReasoning: {
    title: "Emotional reasoning",
    short: "A feeling gets treated like proof.",
    example: "I feel afraid, so this must be unsafe.",
  },
  labelling: {
    title: "Labelling",
    short: "A whole person gets reduced to one harsh word.",
    example: "I am useless.",
  },
  mentalFilter: {
    title: "Mental filter",
    short: "One hard detail blocks the wider picture.",
    example: "All I can see is the one thing I got wrong.",
  },
  discountingPositive: {
    title: "Discounting the positive",
    short: "Helpful evidence gets brushed away.",
    example: "That compliment does not count.",
  },
};
