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

export type DistortionDefinition = {
  title: string;
  short: string;
  example: string;
  deeper: string;
  signs: string[];
  questions: string[];
  tryThis: string[];
  balancedStarter: string;
};

export const distortionDefinitions: Record<DistortionKey, DistortionDefinition> = {
  catastrophising: {
    title: "Catastrophising",
    short: "Your mind jumps to the worst possible outcome.",
    example: "One mistake means everything is ruined.",
    deeper: "Catastrophising is the mind trying to prepare you for danger by making the feared outcome feel certain and huge. The goal is not to pretend everything is fine. The goal is to bring the threat back to a realistic size.",
    signs: ["You move quickly from a problem to a disaster.", "The future feels decided before it happens.", "Your body reacts as if the worst case is already here."],
    questions: ["What is the most likely outcome, not just the scariest one?", "If the hard thing happened, what could I do next?", "What evidence says this is possible, and what evidence says it is certain?"],
    tryThis: ["Name the feared outcome in one sentence.", "Write a likely outcome and a manageable next step.", "Lower the problem from 'disaster' language to specific facts."],
    balancedStarter: "This could be difficult, and I can handle the next small step.",
  },
  blackAndWhite: {
    title: "Black-and-white thinking",
    short: "Something feels all good or all bad, with no middle ground.",
    example: "If this is not perfect, it is a failure.",
    deeper: "Black-and-white thinking removes the middle of the scale. It can make ordinary mistakes feel like total failure and ordinary progress feel invisible.",
    signs: ["You use words like always, never, ruined, perfect, or failure.", "One flaw makes the whole thing feel worthless.", "You struggle to give partial credit."],
    questions: ["What would a 60 percent version look like?", "What part went okay, even if it was not perfect?", "Would I judge someone else this harshly for the same result?"],
    tryThis: ["Replace either-or language with a 0 to 100 scale.", "List one thing that worked and one thing to adjust.", "Use 'both' language: both hard and workable, both imperfect and useful."],
    balancedStarter: "This was not perfect, and there is still something here I can use or learn from.",
  },
  mindReading: {
    title: "Mind reading",
    short: "Your mind guesses what someone else thinks.",
    example: "They did not reply, so they must be upset with me.",
    deeper: "Mind reading fills in missing social information, usually with the explanation that hurts most. It often feels convincing because uncertainty is uncomfortable.",
    signs: ["You treat silence, tone, or delay as proof.", "You feel sure what someone thinks without asking.", "You prepare for rejection before anything clear has happened."],
    questions: ["What are three other explanations?", "What did the person actually say or do?", "Could I check this gently instead of guessing?"],
    tryThis: ["Separate facts from guesses.", "Write at least two neutral explanations.", "If appropriate, ask a simple clarifying question."],
    balancedStarter: "I do not know what they think yet. There are other possible explanations.",
  },
  fortuneTelling: {
    title: "Fortune telling",
    short: "Your mind treats a feared future as already decided.",
    example: "This will go badly.",
    deeper: "Fortune telling turns prediction into certainty. It can shrink your choices because the mind acts as if the outcome has already happened.",
    signs: ["You feel certain about a future result.", "You avoid something because it 'will not work anyway.'", "You stop planning because the ending feels fixed."],
    questions: ["What would I say if this were only a prediction?", "What has happened in similar situations before?", "What action would improve the odds by even 5 percent?"],
    tryThis: ["Change 'will' to 'might.'", "Make a small experiment instead of a final verdict.", "Choose one action that keeps the door open."],
    balancedStarter: "I cannot know the outcome yet, but I can influence the next step.",
  },
  personalisation: {
    title: "Personalisation",
    short: "You take too much responsibility for what happened.",
    example: "This is all my fault.",
    deeper: "Personalisation makes you the center of cause and blame, even when many factors were involved. Responsibility becomes heavier than it needs to be.",
    signs: ["You blame yourself before checking other factors.", "You ignore timing, context, other people, or chance.", "You feel responsible for other people's emotions."],
    questions: ["What other factors contributed?", "What part is actually mine to own?", "What would fair responsibility look like here?"],
    tryThis: ["Draw a responsibility pie with every factor included.", "Own only your real part.", "Turn blame into one repair step if repair is needed."],
    balancedStarter: "I may have a part in this, but I am not the whole story.",
  },
  shouldStatements: {
    title: "Should statements",
    short: "Rigid rules turn into pressure.",
    example: "I should be handling this better.",
    deeper: "Should statements often sound like motivation, but they usually create shame and pressure. A flexible value works better than a rigid rule.",
    signs: ["Your self-talk sounds like scolding.", "You feel guilty for having normal limits.", "The rule leaves no room for context."],
    questions: ["Who made this rule?", "What value is underneath the should?", "What would a kinder instruction sound like?"],
    tryThis: ["Change 'I should' to 'I would like to' or 'It matters to me that.'", "Add context: 'given what I am carrying.'", "Choose one realistic next action."],
    balancedStarter: "I would like to handle this well, and I can start with one realistic step.",
  },
  emotionalReasoning: {
    title: "Emotional reasoning",
    short: "A feeling gets treated like proof.",
    example: "I feel afraid, so this must be unsafe.",
    deeper: "Emotional reasoning happens when a real feeling is mistaken for a full fact. Feelings matter, but they are signals to check, not final verdicts.",
    signs: ["A feeling becomes evidence by itself.", "You say 'it feels true' as if that settles it.", "The intensity of the emotion makes the thought feel certain."],
    questions: ["What is the feeling telling me to check?", "What facts support or do not support the feeling?", "Have I felt this before and later seen it differently?"],
    tryThis: ["Name the feeling and thank it for trying to protect you.", "Check two facts before acting.", "Let the feeling be present while choosing a grounded step."],
    balancedStarter: "This feeling is real, and I can still check the facts before deciding.",
  },
  labelling: {
    title: "Labelling",
    short: "A whole person gets reduced to one harsh word.",
    example: "I am useless.",
    deeper: "Labelling turns a behavior, mistake, or painful moment into an identity. It is usually too broad to be fair or useful.",
    signs: ["You use harsh identity words about yourself or someone else.", "One moment becomes a whole-person judgment.", "The label blocks curiosity or repair."],
    questions: ["What specific behavior happened?", "Would this label describe every part of this person?", "What wording would help me respond better?"],
    tryThis: ["Replace the label with a specific sentence about what happened.", "Name one quality or effort the label ignores.", "Choose repair, rest, or learning instead of self-attack."],
    balancedStarter: "I made a mistake or had a hard moment. That is not my whole identity.",
  },
  mentalFilter: {
    title: "Mental filter",
    short: "One hard detail blocks the wider picture.",
    example: "All I can see is the one thing I got wrong.",
    deeper: "A mental filter zooms in on painful evidence and crops out everything else. The hard detail may be real, but it is not the entire picture.",
    signs: ["One negative detail dominates your memory.", "Neutral or positive details feel irrelevant.", "You replay the same mistake repeatedly."],
    questions: ["What else was also true?", "What would a camera have recorded besides this one detail?", "What am I leaving out because I am upset?"],
    tryThis: ["Write the hard detail, then write three other true details.", "Ask what a fair observer would notice.", "Let the negative detail be one part, not the whole frame."],
    balancedStarter: "This hard detail matters, and it is not the only thing that happened.",
  },
  discountingPositive: {
    title: "Discounting the positive",
    short: "Helpful evidence gets brushed away.",
    example: "That compliment does not count.",
    deeper: "Discounting the positive rejects evidence that could soften a painful belief. The mind protects the old story by saying good evidence does not count.",
    signs: ["You explain away compliments, effort, or progress.", "Success feels like luck, timing, or 'not enough.'", "Only negative feedback feels believable."],
    questions: ["If this positive detail happened to a friend, would I count it?", "What does this evidence suggest, even a little?", "Why does my mind want to reject this?"],
    tryThis: ["Record the positive detail without arguing with it.", "Practice saying 'this counts, even if it feels small.'", "Let positive evidence sit beside the hard evidence."],
    balancedStarter: "This positive detail counts, even if my mind wants to dismiss it.",
  },
};
