export type QuotePeriod = "morning" | "afternoon" | "evening" | "quiet";

export type ClearPathQuote = {
  text: string;
  tone: "grounding" | "self-compassion" | "patience" | "agency" | "acceptance";
};

export type SelectedQuote = ClearPathQuote & {
  period: QuotePeriod;
  label: string;
};

const quotesByPeriod: Record<QuotePeriod, ClearPathQuote[]> = {
  morning: [
    { text: "Begin with the next breath, not the whole day.", tone: "grounding" },
    { text: "You can arrive slowly and still arrive.", tone: "patience" },
    { text: "Let the morning be a place to start, not a test to pass.", tone: "self-compassion" },
    { text: "A steady day can begin with one steady choice.", tone: "agency" },
    { text: "Before you solve anything, notice that you are here.", tone: "grounding" },
    { text: "The first step can be small enough to fit in your hand.", tone: "agency" },
    { text: "You do not have to earn gentleness before receiving it.", tone: "self-compassion" },
    { text: "Let today unfold one honest moment at a time.", tone: "acceptance" },
    { text: "A clear path can begin as a quiet pause.", tone: "grounding" },
    { text: "Your pace is allowed to match your nervous system.", tone: "self-compassion" },
    { text: "There is room to begin again without making a speech about it.", tone: "acceptance" },
    { text: "Start with what is true, then choose what is next.", tone: "agency" },
    { text: "Morning does not need your certainty. It only asks for your presence.", tone: "grounding" },
    { text: "One kind thought can soften the edge of the day.", tone: "self-compassion" },
    { text: "Let your attention land before your expectations do.", tone: "patience" },
    { text: "You can move gently and still move meaningfully.", tone: "agency" },
    { text: "Name the feeling. Let the day stay wider than it.", tone: "grounding" },
    { text: "A slow start is still a start.", tone: "patience" },
    { text: "You are allowed to check in before you push forward.", tone: "self-compassion" },
    { text: "Today can be handled in pieces.", tone: "agency" },
  ],
  afternoon: [
    { text: "Pause long enough to hear what your body has been carrying.", tone: "grounding" },
    { text: "The middle of the day is allowed to be a reset.", tone: "acceptance" },
    { text: "You can lower the pressure without lowering your care.", tone: "self-compassion" },
    { text: "A thought can be loud without being final.", tone: "grounding" },
    { text: "Choose the next workable step, not the perfect one.", tone: "agency" },
    { text: "If the day has become crowded, return to one breath.", tone: "grounding" },
    { text: "You can be tired and still be worthy of patience.", tone: "self-compassion" },
    { text: "Let one small action count.", tone: "agency" },
    { text: "Noticing a pattern is already a shift.", tone: "acceptance" },
    { text: "You do not need to finish every thought you started.", tone: "patience" },
    { text: "Take the day out of all-or-nothing and place it back on a scale.", tone: "grounding" },
    { text: "A brief pause can change the shape of the next hour.", tone: "agency" },
    { text: "You can respond to the moment without arguing with the whole day.", tone: "acceptance" },
    { text: "There may be more options than the stressed mind can see at first.", tone: "grounding" },
    { text: "Let your next choice be kind and specific.", tone: "agency" },
    { text: "The mind can forecast. You can still check the weather.", tone: "grounding" },
    { text: "A softer sentence can make space for a better step.", tone: "self-compassion" },
    { text: "You can return to yourself without starting over completely.", tone: "patience" },
    { text: "The useful question is not 'What is wrong with me?' It is 'What would help now?'", tone: "self-compassion" },
    { text: "Let the next ten minutes be small enough to enter.", tone: "grounding" },
  ],
  evening: [
    { text: "The day can end without being fully solved.", tone: "acceptance" },
    { text: "Set down what does not need to be carried into the night.", tone: "grounding" },
    { text: "You can review the day without putting yourself on trial.", tone: "self-compassion" },
    { text: "Let one true thing be enough for reflection.", tone: "patience" },
    { text: "Rest is not a reward for perfect coping.", tone: "self-compassion" },
    { text: "The evening can hold both what hurt and what helped.", tone: "acceptance" },
    { text: "A hard moment is part of the day, not the whole day.", tone: "grounding" },
    { text: "You can close the loop with care, not criticism.", tone: "self-compassion" },
    { text: "There is nothing to prove to the dark.", tone: "acceptance" },
    { text: "Let the body learn that the day is over.", tone: "grounding" },
    { text: "A quiet ending can still be a good ending.", tone: "patience" },
    { text: "You are allowed to need less noise now.", tone: "self-compassion" },
    { text: "What remains unfinished can wait beside you, not inside you.", tone: "acceptance" },
    { text: "One breath can be the bridge from doing to resting.", tone: "grounding" },
    { text: "Notice one thing you handled, even imperfectly.", tone: "self-compassion" },
    { text: "The mind may replay. You can gently lower the volume.", tone: "grounding" },
    { text: "Tomorrow does not need to be solved tonight.", tone: "acceptance" },
    { text: "Let yourself leave the day in smaller pieces.", tone: "patience" },
    { text: "A balanced thought can be simple: this was hard, and I am here.", tone: "self-compassion" },
    { text: "Give the last word to steadiness, not pressure.", tone: "agency" },
  ],
  quiet: [
    { text: "If the night feels wide, come back to the room you are in.", tone: "grounding" },
    { text: "You do not have to trust every thought that arrives late.", tone: "grounding" },
    { text: "This is a moment to soften, not a moment to solve everything.", tone: "self-compassion" },
    { text: "Let the next breath be the only task.", tone: "grounding" },
    { text: "A feeling can be present without becoming an instruction.", tone: "acceptance" },
    { text: "You can be awake and still be resting in small ways.", tone: "self-compassion" },
    { text: "The mind may search for certainty. The body may need safety first.", tone: "grounding" },
    { text: "Nothing needs to be decided before your feet feel the floor.", tone: "grounding" },
    { text: "Let the thought pass through without asking it to explain itself.", tone: "acceptance" },
    { text: "Small calm still counts.", tone: "patience" },
  ],
};

const periodLabels: Record<QuotePeriod, string> = {
  morning: "Morning note",
  afternoon: "Afternoon reset",
  evening: "Evening note",
  quiet: "Quiet-hours note",
};

export function getQuotePeriod(date = new Date()): QuotePeriod {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    return "morning";
  }
  if (hour >= 12 && hour < 17) {
    return "afternoon";
  }
  if (hour >= 17 && hour < 24) {
    return "evening";
  }
  return "quiet";
}

function hashString(value: string): number {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }
  return Math.abs(hash);
}

export function selectQuote(seed: string, date = new Date()): SelectedQuote {
  const period = getQuotePeriod(date);
  const isoDate = date.toISOString().slice(0, 10);
  const quotes = quotesByPeriod[period];
  const index = hashString(`${seed || "clearpath"}:${isoDate}:${period}`) % quotes.length;
  return {
    ...quotes[index],
    period,
    label: periodLabels[period],
  };
}

export function getQuoteCount(): number {
  return Object.values(quotesByPeriod).reduce((total, quotes) => total + quotes.length, 0);
}
