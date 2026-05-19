# ClearPath — CBT Training App: Full MVP Build Prompt

---

## 1. Product Vision

**ClearPath** is a self-contained mobile CBT (Cognitive Behavioural Therapy) companion for the general public. It serves two modes simultaneously:

- **Daily Training Mode** — short, structured CBT exercises that build mental resilience over time through consistent practice (thought journals, cognitive distortion identification, behavioural activation).
- **Crisis Mode** — an in-the-moment guided flow that helps users separate a triggering situation from their emotional reaction, challenge distorted thinking, and arrive at a calmer, more balanced perspective.

The app is not a substitute for professional therapy and must communicate this clearly. It is a wellness tool — think Duolingo for your mind, with a crisis lifeline built in. No clinician is in the loop. No data leaves the device without explicit user action.

---

## 2. CBT Framework (What the App Actually Teaches)

All features are grounded in evidence-based CBT principles. Developers and designers must understand these before building:

### The CBT Triangle
Thoughts → Feelings → Behaviours are interconnected. Changing one changes the others. The app targets **Thoughts** as the primary lever.

### Core Techniques Implemented in MVP

| Technique | Description | Where Used |
|---|---|---|
| **Thought Record** | Separate situation → automatic thought → emotion → evidence → balanced thought | Crisis Mode + Daily Journal |
| **Cognitive Distortion ID** | Labelling thinking errors (catastrophising, black-and-white, mind reading, etc.) | Crisis Mode Step 3 |
| **Behavioural Activation** | Schedule small, meaningful activities to counter avoidance/low mood | Daily Training |
| **Socratic Questioning** | Guided questions that challenge the validity of automatic thoughts | Crisis Mode AI layer |
| **Grounding (5-4-3-2-1)** | Sensory grounding exercise to interrupt acute distress | Crisis Mode Entry Point |
| **Thought Defusion** | Creating distance from thoughts ("I notice I'm having the thought that...") | Daily Training |
| **Mood Tracking** | Daily mood check-in to identify patterns over time | Home Screen |

---

## 3. Core User Flows (MVP)

### Flow A — Crisis Mode ("I need help right now")

Triggered by a prominent button on the home screen. Designed to be completable in 5–10 minutes.

**Step 0 — Triage Check**
> "Before we start — on a scale of 1–10, how distressed are you right now?"
- Score 1–4: Skip grounding, go straight to Step 1.
- Score 5–7: Offer optional 60-second grounding exercise first.
- Score 8–10: Lead with grounding (mandatory), then continue. Always show crisis resources banner at 9–10.

**Step 1 — Situation (What happened?)**
> "Describe the situation — just the facts, as if a camera recorded it."
- Free-text input, no judgment prompts.
- Helper text: "e.g. My boss didn't reply to my email. My friend cancelled plans."
- Character-limited to keep it factual and brief (300 chars).

**Step 2 — Feelings (What are you feeling?)**
> "What emotions are you noticing? How intense is each one?"
- Emotion picker: grid of ~24 emotion labels (anger, shame, fear, sadness, anxiety, etc.)
- Each selected emotion gets an intensity slider (0–100%).
- User selects 1–5 emotions.

**Step 3 — Automatic Thoughts (What went through your mind?)**
> "What thoughts came up immediately? Don't filter — write exactly what your mind said."
- Free-text, multi-line.
- After submission, AI (if key present) or a rule-based system identifies likely cognitive distortions and surfaces them as selectable tags: "This looks like **catastrophising** — does that fit?"

**Step 4 — Challenge (Is this thought accurate?)**
Socratic questioning sequence — 3 guided prompts, one at a time:
1. "What's the evidence **for** this thought?"
2. "What's the evidence **against** it?"
3. "If your best friend had this thought, what would you tell them?"
- Free-text responses to each.

**Step 5 — Balanced Thought (What's a more balanced view?)**
> "Based on the evidence, write a more realistic, compassionate version of the thought."
- Free-text.
- AI (if key): offers a suggested balanced thought the user can edit and adopt.
- Always user-editable — never AI-only.

**Step 6 — Re-rate**
> "How intense are those feelings now?"
- Re-show the same emotions from Step 2 with sliders.
- Display a before/after comparison: "Anxiety: 80% → 45%"
- Affirming close message: "You did the work. That shift matters."

**Step 7 — Save & Exit**
- Session saved to journal automatically.
- Optional: add a note or coping action ("Go for a walk", "Call someone").

---

### Flow B — Daily Training Mode

A structured, progressive curriculum. Think of it as a 30-day CBT course with daily micro-sessions (5–8 minutes each).

**Daily Check-In (Every day, always first)**
- Mood dial: visual emotion wheel, user taps their current state.
- Energy level: 3-option quick select (Low / Medium / High).
- One optional free-text reflection: "Anything on your mind today?"

**Daily Exercise (Rotates through technique library)**

Week 1–2 (Foundation):
- Day 1: Introduction to the CBT triangle (interactive explainer)
- Day 2: Identifying your most common automatic thoughts
- Day 3: Introduction to cognitive distortions (illustrated guide + quiz)
- Day 4: First guided thought record (simplified, 4 steps)
- Day 5: Behavioural activation — schedule one meaningful activity
- Day 6: Thought defusion practice
- Day 7: Weekly reflection — what patterns did you notice?

Week 3–4 (Practice):
- Deeper thought records with full 7-column format
- Distortion identification challenges (presented with example scenarios)
- Behavioural activation scheduling with follow-through tracking
- Core belief exploration ("What does this thought say about me?")
- Gratitude + values clarification exercises

**Streak & Progress Tracking**
- Daily streak counter (Duolingo-style, but subtle — no shame on missed days)
- Weekly mood chart (line graph of daily mood ratings)
- Distortion frequency breakdown ("You most often experience: Catastrophising, Mind Reading")
- Journal entry count

---

### Flow C — Thought Journal (Ongoing)

A searchable, filterable log of all completed thought records and crisis sessions.

- Each entry shows: date, situation summary, emotions (before/after), distortions identified, balanced thought.
- Filter by: emotion type, distortion type, date range.
- Insights panel: "Over the past 2 weeks, your anxiety has trended down after sessions."
- All entries stored locally — private by default.

---

### Flow D — Learn Library

A static but well-designed resource library covering:
- All 10 common cognitive distortions (illustrated, with examples)
- CBT Triangle explainer
- Breathing and grounding techniques (audio-guided if possible)
- FAQ: "Is this a replacement for therapy?" (Always: No.)

---

## 4. Tech Stack

### Platform
| Decision | Choice | Rationale |
|---|---|---|
| Framework | **React Native (Expo SDK 51+)** | Single iOS + Android codebase, strong animation support |
| Language | **TypeScript** | Required for safety in a mental health context |
| Navigation | **Expo Router** (file-based) | Clean stack + tab navigation, deep linking support |
| State Management | **Zustand** | Simple, minimal boilerplate, persists across sessions |
| Local DB | **expo-sqlite + Drizzle ORM** | Offline-first, all data on-device, fast queries |
| Styling | **NativeWind (Tailwind for RN)** | Consistent design tokens, fast iteration |
| Animations | **react-native-reanimated + Moti** | Smooth, native-thread transitions for emotional UI |

### AI Layer
| Feature | Without AI Key | With AI Key |
|---|---|---|
| Distortion identification | Rule-based keyword matching | Claude Haiku — nuanced, contextual analysis |
| Balanced thought suggestion | Template strings | AI-generated, personalised to the user's words |
| Socratic question follow-ups | Fixed question bank | Adaptive follow-up questions based on responses |
| Daily exercise personalisation | Fixed 30-day curriculum | Adapts based on journal patterns |

AI key stored in **expo-secure-store** (device keychain). Never transmitted except to the AI provider directly. Model recommended: **Claude Haiku** (fast, cheap, appropriate for short conversational turns).

### Notifications
- **expo-notifications** — local only, no push server needed.
- Daily check-in reminder (user sets preferred time).
- Gentle re-engagement after 2 missed days ("Your journal is waiting for you.").
- Never guilt-based language in notifications.

### Analytics
- **No third-party analytics in MVP.** Privacy is a core value for a mental health app.
- All usage data (streaks, session counts) computed locally from SQLite.

---

## 5. Kiro Integration (Token-Efficient Development)

Use **Kiro by AWS** throughout this project to handle repetitive, boilerplate-heavy, and consistency-critical tasks. Kiro's spec-driven workflow, agent hooks, and steering files are a natural fit for a structured build like this — they keep the AI focused on high-value reasoning (CBT logic, UX decisions, AI prompts) rather than burning tokens on mechanical work.

### 5.1 — Set Up Steering Files First

Before writing any code, create Kiro steering files to give the agent persistent project context. This prevents you from re-explaining conventions in every chat session.

```markdown
<!-- .kiro/steering/project.md -->
# ClearPath — CBT Wellness App

## Stack
React Native (Expo SDK 51+), TypeScript, Expo Router, NativeWind, Zustand, expo-sqlite + Drizzle ORM, react-native-reanimated.

## Conventions
- All components are functional, typed, no `any`
- NativeWind classes only — no StyleSheet.create
- All DB access goes through modules/db/queries.ts — never query directly from components
- Zustand stores live in store/ — one file per domain
- All user-facing copy must follow tone guidelines: warm, non-clinical, grade 8 reading level, gender-neutral
- Never use the word "disorder", "diagnosis", or "symptom" in UI copy
- Tap targets minimum 44×44pt (mental health users may have impaired fine motor under distress)

## File Naming
- Screens: PascalCase in app/ directory
- Components: PascalCase in components/
- Modules/hooks/stores: camelCase

## Safety Rule
Crisis resources banner must always render when distressScore >= 8. This is non-negotiable and must never be removed or conditioned away.
```

```markdown
<!-- .kiro/steering/db.md -->
# Database Conventions

ORM: Drizzle ORM with expo-sqlite
Schema file: modules/db/schema.ts
All queries: modules/db/queries.ts (never inline in components)
Migrations: auto-generated via `npx drizzle-kit generate`

## Schema Rules
- Timestamps stored as Unix integers (mode: 'timestamp')
- JSON arrays stored as TEXT (stringify on write, parse on read)
- Boolean stored as integer (mode: 'boolean')
- All tables have auto-increment integer primary key
```

```markdown
<!-- .kiro/steering/ai-prompts.md -->
# AI Prompt Guidelines

Model: claude-haiku-4-5 for all in-app calls (fast, cheap, short context)
API key: retrieved from expo-secure-store, never hardcoded
Fallback: always fall back to rule-based logic if AI fails or key is absent — never break the user flow

## Prompt Rules
- System prompts must instruct the model to return ONLY JSON (no preamble, no markdown fences)
- All AI output is user-editable — never present AI suggestions as final
- Warm, non-judgmental language always — instruct model explicitly in system prompt
- max_tokens: 200–500 depending on task (see modules/ai/ for per-function limits)
```

---

### 5.2 — Use Specs for Feature Planning

Before building each major feature, generate a Kiro spec. This converts the requirements in this document into structured user stories, a technical design, and a task list — replacing the need to prompt the AI repeatedly for the same planning context.

**How to generate a spec in Kiro:**
Open the Kiro spec panel → paste the relevant section of this document → Kiro outputs:
- User stories with acceptance criteria (EARS notation)
- Data flow diagram
- Sequence of implementation tasks

**Recommended specs to generate before coding:**

| Spec Name | Source Section | Generates |
|---|---|---|
| `crisis-flow` | Section 3, Flow A | 7-step wizard screens, state machine, DB writes |
| `distortion-detector` | Section 7.2 + 7.3 | Rule-based + AI analysis module |
| `daily-training` | Section 3, Flow B | Curriculum engine, check-in, streak logic |
| `thought-journal` | Section 3, Flow C | Journal list, filters, insights panel |
| `mood-dial` | Section 7.6 | SVG emotion wheel component |
| `notifications` | Section 4, Notifications | Local scheduler, re-engagement logic |

> **Token efficiency tip:** Generating a spec once costs far fewer tokens than repeatedly re-explaining the feature in chat sessions. Reference the spec in subsequent chats instead of re-describing requirements.

---

### 5.3 — Agent Hooks to Automate Repetitive Tasks

Set up these Kiro hooks once. They fire automatically on file events and handle tasks that would otherwise require manual prompting or be forgotten entirely.

#### Hook 1 — Unit Test Generator
**Trigger:** On save of any file in `modules/`
**Action:** Check if a corresponding `.test.ts` file exists in `__tests__/`. If not, generate one with basic unit tests for all exported functions.

```
When a file is saved in modules/, check if a matching test file exists in __tests__/.
If not, create it with TypeScript unit tests for all exported functions.
Use Jest + React Native Testing Library conventions.
Focus on: happy path, empty/null input, edge cases specific to CBT data (empty thought string, max distress score, malformed JSON from AI response).
```

#### Hook 2 — Copy Tone Validator
**Trigger:** On save of any `.tsx` file in `app/` or `components/`
**Action:** Scan all string literals and template strings for tone violations. Flag any that contain: clinical terms (disorder, diagnosis, symptom, pathology), guilt language (should have, failed, missed), urgency language (must, now, immediately), or any of the banned words from the steering file.

```
When a .tsx file is saved in app/ or components/, scan all string literals for tone violations.
Flag (as inline comments) any strings containing: clinical terms (disorder, diagnosis, symptom),
guilt-inducing language (you failed, you missed, you should have), or urgency framing.
Do not auto-fix — highlight only so the developer can rewrite with intention.
```

#### Hook 3 — Accessibility Checker
**Trigger:** On save of any component file
**Action:** Check that all interactive elements have `accessibilityLabel`, `accessibilityRole`, and `accessibilityHint` props. Flag missing ones as TODO comments.

```
When a component file is saved, check all Pressable, TouchableOpacity, and TextInput elements
for accessibilityLabel, accessibilityRole, and accessibilityHint props.
Insert // TODO: accessibility — add accessibilityLabel comment above any that are missing.
```

#### Hook 4 — DB Query Isolation Enforcer
**Trigger:** On save of any file in `app/` or `components/`
**Action:** Check for any direct `db.` calls or `drizzle` imports. If found, flag with a comment directing the developer to use `modules/db/queries.ts` instead.

```
When a file in app/ or components/ is saved, check for any import of drizzle or direct db. calls.
If found, add an inline comment: // ARCHITECTURE VIOLATION: move this query to modules/db/queries.ts
```

#### Hook 5 — Drizzle Migration Runner
**Trigger:** On save of `modules/db/schema.ts`
**Action:** Automatically run `npx drizzle-kit generate` to produce the migration file for any schema changes.

```
When modules/db/schema.ts is saved, run: npx drizzle-kit generate
Log the output. If it fails, surface the error clearly.
```

#### Hook 6 — README Sync
**Trigger:** Manual trigger (before each PR / end of each build week)
**Action:** Update `README.md` with current screen list, module list, and any new environment variables or setup steps detected in the codebase.

```
Read the current project structure from the file system.
Update README.md with: current screen list from app/, module list from modules/,
any .env.example variables, and setup instructions.
Preserve any manually written sections (Project Vision, Safety Notes).
```

---

### 5.4 — What NOT to Use Kiro For

Kiro handles structure and repetition well. Keep these tasks as human decisions or deliberate AI prompts — not automated:

| Task | Why Not Kiro Hook |
|---|---|
| CBT copy / UI text | Tone requires human judgment — automated generation risks clinical or guilt-inducing language |
| Crisis resources content | Safety-critical — must be manually verified and kept current |
| Distortion detection logic | Core product logic — needs careful prompt engineering, not automation |
| Onboarding flow copy | First impression — requires intentional craft, not boilerplate |
| AI system prompts | Prompt quality directly affects user mental health outcomes — never auto-generate |

---

### 5.5 — Kiro Workflow Per Build Week

Each week in the build order (Section 12) maps to a Kiro workflow:

| Week | Kiro Action |
|---|---|
| Week 1 | Create steering files. Generate `crisis-flow` and `daily-training` specs. Set up all hooks. |
| Week 2 | Run crisis-flow spec task list. Hook 1 (tests) and Hook 4 (DB isolation) active from day 1. |
| Week 3 | Generate `distortion-detector` spec. Use agentic chat for AI prompt tuning (not hooks). |
| Week 4 | Run daily-training spec task list. Hook 2 (copy tone) catches any copy written at speed. |
| Week 5 | Generate `thought-journal` and `mood-dial` specs. Hook 3 (accessibility) critical this week. |
| Week 6 | Hook 6 (README sync) before each PR. Manual accessibility audit supplements Hook 3. |
| Week 7 | Full spec review — use Kiro to diff current implementation against original specs and list any gaps. |

---

## 6. Project Structure

```
clearpath/
├── .kiro/
│   └── steering/
│       ├── project.md             # Stack, conventions, file naming, safety rules
│       ├── db.md                  # ORM conventions, schema rules
│       └── ai-prompts.md          # Prompt guidelines, fallback rules
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx              # Home — mood check-in + entry points
│   │   ├── train.tsx              # Daily Training curriculum
│   │   ├── journal.tsx            # Thought Journal log
│   │   ├── learn.tsx              # CBT Library
│   │   └── settings.tsx           # API key, notifications, data
│   ├── crisis/
│   │   ├── _layout.tsx            # Crisis mode stack navigator
│   │   ├── triage.tsx             # Step 0 — distress rating
│   │   ├── grounding.tsx          # Optional grounding exercise
│   │   ├── situation.tsx          # Step 1
│   │   ├── feelings.tsx           # Step 2
│   │   ├── thoughts.tsx           # Step 3
│   │   ├── challenge.tsx          # Step 4
│   │   ├── balanced.tsx           # Step 5
│   │   └── rerate.tsx             # Step 6 + close
│   ├── train/
│   │   └── [day].tsx              # Individual daily exercise screen
│   └── journal/
│       └── [id].tsx               # Single journal entry detail
├── modules/
│   ├── cbt/
│   │   ├── distortions.ts         # Distortion definitions + rule-based detector
│   │   ├── curriculum.ts          # 30-day exercise schedule
│   │   └── socratic.ts            # Question bank for challenge step
│   ├── ai/
│   │   ├── distortionAnalysis.ts  # AI distortion identification
│   │   ├── balancedThought.ts     # AI balanced thought suggestion
│   │   └── client.ts              # Anthropic API client wrapper
│   ├── db/
│   │   ├── schema.ts              # Drizzle schema
│   │   ├── migrations/
│   │   └── queries.ts             # All read/write functions
│   ├── notifications/
│   │   └── scheduler.ts           # Local notification scheduling
│   └── insights/
│       └── analytics.ts           # Local mood/distortion trend computation
├── components/
│   ├── crisis/
│   │   ├── EmotionPicker.tsx      # Emotion grid + intensity sliders
│   │   ├── DistortionTag.tsx      # Selectable distortion label
│   │   ├── SocraticPrompt.tsx     # Animated question card
│   │   └── MoodShift.tsx          # Before/after emotion comparison
│   ├── shared/
│   │   ├── ProgressBar.tsx
│   │   ├── MoodDial.tsx           # Visual emotion wheel
│   │   ├── JournalCard.tsx
│   │   └── CrisisResourcesBanner.tsx
│   └── learn/
│       └── DistortionCard.tsx     # Illustrated distortion explainer
├── hooks/
│   ├── useCrisisSession.ts        # Crisis flow state machine
│   ├── useDailyTraining.ts        # Curriculum progress
│   └── useMoodHistory.ts          # Mood chart data
├── store/
│   ├── crisisStore.ts             # In-progress crisis session state
│   └── userStore.ts               # Streak, preferences, onboarding
├── constants/
│   ├── emotions.ts                # Emotion labels + colour mappings
│   ├── distortions.ts             # All 10 distortions with descriptions
│   └── crisisResources.ts         # Crisis helpline data by region
└── app.json
```

---

## 7. Data Model (SQLite Schema)

```typescript
// schema.ts

// One row per completed crisis session
export const crisisSessions = sqliteTable('crisis_sessions', {
  id:              integer('id').primaryKey({ autoIncrement: true }),
  createdAt:       integer('created_at', { mode: 'timestamp' }).notNull(),
  situation:       text('situation').notNull(),
  emotions:        text('emotions').notNull(),         // JSON: [{label, intensityBefore, intensityAfter}]
  automaticThoughts: text('automatic_thoughts').notNull(),
  distortions:     text('distortions'),                // JSON: string[] of distortion keys
  evidenceFor:     text('evidence_for'),
  evidenceAgainst: text('evidence_against'),
  friendPerspective: text('friend_perspective'),
  balancedThought: text('balanced_thought'),
  distressStart:   integer('distress_start').notNull(), // 1–10
  distressEnd:     integer('distress_end'),
  completed:       integer('completed', { mode: 'boolean' }).default(false),
});

// One row per day
export const dailyCheckIns = sqliteTable('daily_check_ins', {
  id:          integer('id').primaryKey({ autoIncrement: true }),
  date:        text('date').notNull().unique(),         // ISO date YYYY-MM-DD
  moodLabel:   text('mood_label').notNull(),
  moodScore:   integer('mood_score').notNull(),         // 1–10 mapped from wheel
  energy:      text('energy').notNull(),                // low | medium | high
  note:        text('note'),
});

// Daily training progress
export const trainingProgress = sqliteTable('training_progress', {
  id:          integer('id').primaryKey({ autoIncrement: true }),
  day:         integer('day').notNull().unique(),        // 1–30
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  exerciseKey: text('exercise_key').notNull(),
  reflection:  text('reflection'),
});

// User meta: streak, onboarding, preferences
export const userMeta = sqliteTable('user_meta', {
  id:                integer('id').primaryKey(),
  currentStreak:     integer('current_streak').default(0),
  longestStreak:     integer('longest_streak').default(0),
  lastActiveDate:    text('last_active_date'),
  onboardingDone:    integer('onboarding_done', { mode: 'boolean' }).default(false),
  reminderTime:      text('reminder_time'),              // "08:30"
  aiProvider:        text('ai_provider'),                // 'anthropic' | 'openai' | null
  notificationsOn:   integer('notifications_on', { mode: 'boolean' }).default(true),
});
```

---

## 8. Key Implementation Details

### 8.1 Crisis Flow State Machine

The crisis flow is a multi-step wizard. Use a Zustand store (not navigation state) to hold the in-progress session, so if the user accidentally navigates away, they can resume.

```typescript
// store/crisisStore.ts
interface CrisisSession {
  distressStart: number;
  situation: string;
  emotions: { label: string; intensityBefore: number; intensityAfter?: number }[];
  automaticThoughts: string;
  distortions: string[];
  evidenceFor: string;
  evidenceAgainst: string;
  friendPerspective: string;
  balancedThought: string;
  distressEnd?: number;
  step: number; // 0–7
}

// On app launch: if session.step > 0 && !completed → show "Resume your session" prompt
```

### 8.2 Cognitive Distortion Detector (Rule-Based Fallback)

When no AI key is present, use keyword/phrase matching to suggest distortions:

```typescript
// modules/cbt/distortions.ts

export const distortionRules: Record<string, RegExp[]> = {
  catastrophising: [
    /everything is ruined/i, /it's all over/i, /worst.*ever/i,
    /never recover/i, /disaster/i, /can't handle/i
  ],
  blackAndWhite: [
    /always/i, /never/i, /everyone/i, /no one/i,
    /completely/i, /totally/i, /perfect/i, /failure/i
  ],
  mindReading: [
    /they think/i, /she thinks/i, /he must think/i,
    /they hate/i, /everyone knows/i, /they're judging/i
  ],
  fortuneTelling: [
    /i know it will/i, /it's going to/i, /i'll definitely/i,
    /this will end/i, /i won't be able/i
  ],
  personalisation: [
    /my fault/i, /because of me/i, /i caused/i,
    /i'm to blame/i, /i ruined/i
  ],
  shouldStatements: [
    /i should/i, /i must/i, /i have to/i,
    /they should/i, /i ought to/i
  ],
  emotionalReasoning: [
    /i feel.*therefore/i, /feel like.*must be/i,
    /feel stupid.*so i am/i
  ],
  labelling: [
    /i'm a failure/i, /i'm an idiot/i, /i'm worthless/i,
    /i'm pathetic/i, /i'm broken/i, /i'm useless/i
  ],
  mentalFilter: [
    /the one bad/i, /only thing that matters/i,
    /can only focus on/i, /all I can think/i
  ],
  discountingPositive: [
    /doesn't count/i, /doesn't matter/i, /just got lucky/i,
    /anyone could/i, /not a big deal/i
  ],
};

export function detectDistortions(thought: string): string[] {
  return Object.entries(distortionRules)
    .filter(([_, patterns]) => patterns.some(p => p.test(thought)))
    .map(([key]) => key);
}
```

### 8.3 AI Layer — Distortion Analysis

```typescript
// modules/ai/distortionAnalysis.ts

export async function analyseDistortions(
  thought: string,
  apiKey: string
): Promise<{ distortion: string; explanation: string; confidence: 'high' | 'medium' }[]> {

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 500,
      system: `You are a CBT-trained assistant. Analyse the user's automatic thought and identify 
               cognitive distortions present. Return ONLY a JSON array (no preamble) of objects with:
               { distortion: string, explanation: string (1 sentence, warm and non-judgmental), 
               confidence: "high" | "medium" }
               Use only these distortion keys: catastrophising, blackAndWhite, mindReading, 
               fortuneTelling, personalisation, shouldStatements, emotionalReasoning, labelling, 
               mentalFilter, discountingPositive. Return empty array [] if none detected.`,
      messages: [{ role: 'user', content: thought }]
    })
  });

  const data = await response.json();
  const text = data.content[0].text;
  return JSON.parse(text);
}
```

### 8.4 AI Layer — Balanced Thought Suggestion

```typescript
// modules/ai/balancedThought.ts

export async function suggestBalancedThought(
  situation: string,
  automaticThought: string,
  evidenceFor: string,
  evidenceAgainst: string,
  apiKey: string
): Promise<string> {

  const prompt = `
Situation: ${situation}
Automatic thought: ${automaticThought}
Evidence for: ${evidenceFor}
Evidence against: ${evidenceAgainst}

Write ONE balanced, compassionate, realistic alternative thought in first person. 
2–3 sentences max. Warm but not falsely positive. Do not start with "I" — 
vary the sentence structure. Return only the thought, no preamble.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  return data.content[0].text.trim();
}
```

### 8.5 Crisis Resources — Always Available

**Never gate crisis resources behind any flow or paywall.** Display a persistent, tappable banner whenever distress score ≥ 8.

```typescript
// constants/crisisResources.ts
export const crisisLines = [
  { name: 'International Association for Suicide Prevention', url: 'https://www.iasp.info/resources/Crisis_Centres/' },
  { name: 'Crisis Text Line (US)', number: 'Text HOME to 741741' },
  { name: 'Samaritans (UK/IE)', number: '116 123' },
  { name: 'Lifeline (AU)', number: '13 11 14' },
];

// Component: always rendered, never dismissible during a session
// Tap opens native phone dialer or URL
```

### 8.6 Mood Dial Component

The home screen mood check-in uses a circular emotion wheel — not a plain slider. This is important for engagement and accuracy (people locate emotions spatially more naturally than linearly).

Use a `react-native-svg` custom component with 8 primary emotion zones (Joy, Trust, Fear, Surprise, Sadness, Disgust, Anger, Anticipation — Plutchik's Wheel). Tap a zone → it expands to show 3 sub-emotions. User selects one. Map to a 1–10 numeric score for charting.

### 8.7 Thought Defusion Exercise (Daily Training)

One of the most impactful CBT techniques — and the most interactive to build:

```
User types their negative thought.
App wraps it in defusion language, displayed one at a time:
  → "I am having the thought that [their thought]"
  → "I notice my mind is telling me that [their thought]"
  → "My mind has produced the story that [their thought]"
Each displayed with a slow fade animation and pause (2 seconds between).
Closes with: "The thought is just a thought. It is not a fact. It is not you."
```

---

## 9. Screen-by-Screen Spec

### Home Screen (`/`)
- Greeting: "Good morning, [first name if set, else nothing]"
- Today's mood dial (if not yet checked in today) — prominent, always visible
- Two primary CTAs:
  - **"I need help right now"** — large, high-contrast, leads to Crisis Flow
  - **"Today's Exercise"** — leads to current day in curriculum
- Streak badge + days completed counter
- Recent journal entry preview (last crisis session or check-in)
- Quick-access: Learn Library

### Crisis Mode (multi-screen stack `/crisis/*`)
- Progress bar always visible at top (Step X of 6)
- Back navigation available (with "Are you sure? Your progress is saved" confirm)
- Soft, calming colour palette — no harsh reds except crisis banner
- Each step has a gentle transition animation (slide + fade)
- Large tap targets — fine motor control can decrease under distress
- No timers, no pressure — let the user move at their own pace

### Daily Training (`/train/[day]`)
- Exercise title + estimated time ("~6 minutes")
- Content varies by exercise type: interactive, reading, reflection, quiz
- Progress saves on each interaction — no "submit at the end" risk
- Completion animation: subtle, affirming (not childish)

### Thought Journal (`/journal`)
- Chronological list of all sessions
- Each card: date, situation summary, emotion shift (e.g. "Anxiety 80% → 40%"), distortions found
- Tap to expand full session
- Filter bar: by emotion, by distortion, by date
- Insights panel at top: mood trend graph (last 14 days), most common distortion

### Learn Library (`/learn`)
- Grid of cards: one per cognitive distortion + foundational concepts
- Each card: illustrated icon, name, 1-line description
- Detail screen: full explanation, 3 relatable examples, "spot it in your thoughts" tips
- Breathing/grounding exercises with animated visual guides (box breathing SVG animation, 5-4-3-2-1 sensory walkthrough)

### Settings (`/settings`)
- Display name (stored locally, used in greetings only)
- Daily reminder time picker
- AI Provider toggle + API key input (masked)
- Notification preferences
- Export journal (plain text or JSON)
- Clear all data (requires typing "DELETE" to confirm)
- About + Disclaimer ("This app is not a substitute for professional mental health care")

---

## 10. Onboarding Flow (First Launch Only)

Keep it short — 4 screens max. Do not gate the app behind sign-up.

1. **Welcome** — App name, tagline, illustration. "Let's take care of your mind."
2. **What is CBT?** — 3 bullet points, friendly language. CBT triangle illustration.
3. **Two modes** — explain Daily Training vs. Crisis Mode with simple icons.
4. **Important disclaimer** — "ClearPath is a self-help wellness tool and is not a substitute for professional therapy. If you are in crisis, please contact a mental health professional or emergency services." User must tap "I understand" to proceed.
5. **Name + reminder** — Optional name, optional daily reminder time.

---

## 11. Tone & Language Guidelines

These govern every piece of copy in the app — UI labels, prompts, empty states, notifications.

- **Never clinical.** Say "feelings" not "affect." Say "unhelpful thought patterns" not "cognitive distortions" in early flows (introduce the term gradually in the Learn section).
- **Never prescriptive.** Say "One way to look at this might be..." not "The correct interpretation is..."
- **Never guilt-inducing.** Missed 3 days? "Welcome back — no catching up needed. Today's exercise is ready."
- **Always validating first.** Before challenging a thought, acknowledge it: "That sounds really hard."
- **Warm but not saccharine.** Avoid excessive affirmations. "You did the work" > "Amazing job superstar! 🌟"
- **Gender-neutral** throughout.
- **Plain language** — Grade 8 reading level maximum.

---

## 12. Build Order (MVP Milestones)

> Kiro actions are called out explicitly each week. See Section 5 for full hook and spec setup details.

### Week 1 — Foundation + Kiro Setup
- [ ] Init Expo project, TypeScript, Expo Router, NativeWind
- [ ] **Kiro:** Create all three steering files (project.md, db.md, ai-prompts.md) in `.kiro/steering/`
- [ ] **Kiro:** Set up all 6 agent hooks (test generator, tone validator, accessibility checker, DB isolation enforcer, migration runner, README sync)
- [ ] **Kiro:** Generate `crisis-flow` and `daily-training` specs from Sections 3A and 3B
- [ ] Drizzle schema + first migration (Hook 5 fires automatically on schema save)
- [ ] Onboarding flow (4 screens)
- [ ] Home screen layout with mock mood dial + placeholder CTAs

### Week 2 — Crisis Flow (Core)
- [ ] **Kiro:** Run crisis-flow spec task list step by step
- [ ] Build all 7 crisis screens (Steps 0–6) with navigation
- [ ] Emotion picker component (grid + intensity sliders)
- [ ] CrisisStore Zustand state machine
- [ ] Rule-based distortion detector wired to Step 3 (Hook 1 generates tests on save)
- [ ] Save completed session to SQLite (Hook 4 flags any direct DB calls in components)

### Week 3 — Crisis Flow (AI + Polish)
- [ ] **Kiro:** Generate `distortion-detector` spec; use agentic chat (not hooks) for AI prompt tuning
- [ ] Settings screen + secure API key storage
- [ ] AI distortion analysis (replaces rule-based when key present)
- [ ] AI balanced thought suggestion in Step 5
- [ ] Crisis resources banner (distress ≥ 8)
- [ ] Resume interrupted session on app relaunch
- [ ] Re-rate before/after comparison (Step 6)

### Week 4 — Daily Training
- [ ] **Kiro:** Run daily-training spec task list
- [ ] Curriculum content for Days 1–14 (text + interactions) — **do not use Kiro to write CBT copy; write manually per tone guidelines**
- [ ] Daily check-in (mood dial + energy + note)
- [ ] Training progress tracking in SQLite
- [ ] Streak calculation logic
- [ ] Thought defusion exercise with animation (Hook 2 tone-checks all string literals on save)

### Week 5 — Journal + Learn
- [ ] **Kiro:** Generate `thought-journal` and `mood-dial` specs
- [ ] Thought Journal list screen with filter bar
- [ ] Journal entry detail screen
- [ ] Mood trend line chart (last 14 days) using `react-native-gifted-charts` or `victory-native`
- [ ] Learn Library grid + all 10 distortion detail screens (Hook 3 accessibility checks every component)
- [ ] Box breathing animated SVG component
- [ ] 5-4-3-2-1 grounding walkthrough screen

### Week 6 — Notifications + Polish
- [ ] Local notification scheduling (daily reminder)
- [ ] Re-engagement notifications (2-day lapse)
- [ ] All empty states designed and implemented
- [ ] All loading states + error states
- [ ] Haptic feedback on key interactions (emotion selection, card completion, session close)
- [ ] **Kiro:** Trigger Hook 6 (README sync) before each PR this week
- [ ] Accessibility audit: minimum tap targets 44×44pt, sufficient contrast, screen reader labels

### Week 7 — QA + Launch Prep
- [ ] **Kiro:** Diff current implementation against all original specs — list any gaps or unimplemented acceptance criteria
- [ ] Full end-to-end test: crisis flow, daily training, journal, learn
- [ ] Edge cases (see Section 13)
- [ ] Disclaimer + privacy policy screen (required for App Store health category)
- [ ] App Store / Play Store metadata, screenshots, content rating
- [ ] TestFlight + Play internal testing release

---

## 13. Edge Cases to Handle

| Scenario | Handling |
|---|---|
| User exits mid-crisis session | Resume prompt on next open — "You started a session earlier. Continue?" |
| Distress score 9–10 at triage | Mandatory grounding first + persistent crisis resources banner for entire session |
| AI returns malformed JSON | Fall back silently to rule-based distortion detector — never show raw error to user |
| AI key invalid | Catch 401, show inline Settings error, continue with rule-based fallback — never break the flow |
| No internet connection | AI features gracefully degraded — all core flows work fully offline |
| User skips steps | Allow skipping (except grounding at high distress) — partial sessions still saved |
| User completes Day 30 of curriculum | Loop back to "Advanced Practice" exercises or show completion celebration |
| User checks in multiple times per day | Allow it — store all, use latest for daily chart |
| Journal has 0 entries | Warm empty state: "Your journal is empty — start a session and it'll appear here" |
| Very long automatic thought (>1000 chars) | Accept it, but gently note: "Sometimes shorter thoughts are easier to challenge — but take all the space you need." |

---

## 14. Safety & Ethics Considerations

This section is non-negotiable. Build these in from day one.

**Crisis Resources are always one tap away** — accessible from the home screen, from every crisis step, and from settings. Never buried.

**The app never diagnoses.** It identifies patterns, not disorders. Distortion labels are framed as "this thinking pattern" not "you have X."

**The app never discourages professional help.** Every settings screen and onboarding screen includes: "This app works best alongside, not instead of, professional support."

**Incomplete sessions are still valuable.** Never show a "you didn't finish" message. If a user exits after Step 2, that's still two steps of reflection that mattered.

**No dark patterns.** No streak shame. No "you'll lose your progress" pressure. No notifications framed as urgency. The app exists to reduce anxiety — it must not create it.

**Mood data is sensitive.** Make it trivially easy to export or delete all data. Never collect it without making local-only storage the default and obvious choice.

---

## 15. Future Scope (Post-MVP)

- **Voice input** — speak your automatic thought instead of typing (especially useful in high distress)
- **Audio-guided sessions** — therapist-voiced grounding and thought record walkthroughs
- **Patterns & insights** — "You tend to catastrophise on Sunday evenings" (local ML on journal data)
- **Partner mode** — share anonymised progress summary with a trusted person (not a therapist)
- **Custom distortion nicknames** — users name their own patterns ("the Sunday spiral")
- **Expanded curriculum** — Weeks 5–8 covering ACT, DBT-lite, mindfulness integration
- **Apple Watch companion** — heart rate spike → gentle prompt to open the app
- **Offline AI** — on-device model (Phi-3 mini or similar) so AI features work without internet or API key

---

## 16. UI/UX Design System — Calm-First

This section governs every visual and interactive decision in ClearPath. The design goal is comfort before clarity, and pleasure before utility. A user arriving in distress should feel the interface slow them down in a good way — not stimulate, not impress, not perform.

The aesthetic direction is: **still water**. Unhurried. Soft depth. Quiet confidence.

---

### 16.1 — Design Philosophy

**The app is not a product. It is a room.** Every screen should feel like entering a space that has been prepared for you — uncluttered, gently lit, unhurried. The interface should never feel like software.

Four principles govern every decision:

**Comfort over efficiency.** A user in distress does not need the fastest path — they need the safest one. Allow generous padding, unhurried animations, and breathing room between elements. Never compress.

**Warmth without brightness.** Colour conveys emotion directly. Saturated colours raise arousal. Desaturated, cool-hued tones lower it. Every colour decision must serve nervous system regulation first, branding second.

**Pleasure through detail.** The app should be a joy to use — not because it has animations for their own sake, but because every tap, every transition, every piece of feedback has been considered. Micro-interactions signal care. They make the app feel alive without feeling loud.

**Nothing should shout.** No high contrast borders. No heavy drop shadows. No sharp corners that read as tension. No red in the UI except crisis resources (where urgency is intentional). No bold used decoratively — only for semantic emphasis.

---

### 16.2 — Colour System

All colours use HSL. Saturation is kept intentionally low throughout — hues should read as _a suggestion of colour_, not a statement. The palette is built around soft blue as the anchor, with supporting tones that share its emotional register.

#### Design Rules for HSL in This App

- **Lightness floor for light mode: 88%.** No surface goes below L88 except text and intentional accent strokes.
- **Lightness ceiling for dark mode: 80%.** Dark mode is _soft_, not dark. Backgrounds sit around L20–28, surfaces at L26–34. No pure blacks.
- **Saturation cap: 22% for surfaces, 30% for interactive elements, 40% maximum for accent.** Nothing in the UI should visually compete with the user's thoughts.
- **Hue range: 190–230** (blue-teal to blue-violet). This is the calming corridor. No warm hues (reds, oranges, yellows) except the crisis banner.
- **Dark mode multiplication rule:** Take the light mode colour. Multiply lightness by 0.22–0.28 for backgrounds. Multiply saturation by 0.6 for surfaces. This produces muted, grey-tinted versions of each hue that feel cohesive without feeling cold.

#### Token Definitions

```typescript
// tokens/colors.ts
// All values in HSL — hsl(H, S%, L%)

export const colors = {

  // ── Light Mode ───────────────────────────────────────────────────────────
  light: {
    // Backgrounds
    bgBase:        'hsl(210, 18%, 97%)',   // near-white with blue breath
    bgSurface:     'hsl(208, 16%, 93%)',   // card / panel base
    bgSubtle:      'hsl(207, 14%, 89%)',   // inset wells, input fields
    bgMuted:       'hsl(206, 12%, 85%)',   // dividers, skeleton loaders

    // Text
    textPrimary:   'hsl(214, 20%, 22%)',   // near-dark, not pure black
    textSecondary: 'hsl(213, 14%, 42%)',   // secondary labels
    textTertiary:  'hsl(212, 10%, 60%)',   // placeholders, metadata
    textInverse:   'hsl(210, 18%, 97%)',   // text on dark surfaces

    // Interactive / Accent
    accent:        'hsl(207, 30%, 58%)',   // primary CTA — soft blue
    accentHover:   'hsl(207, 30%, 52%)',   // slightly deeper on hover
    accentSubtle:  'hsl(207, 22%, 88%)',   // accent background tint
    accentText:    'hsl(207, 35%, 30%)',   // accent-coloured text

    // Semantic
    calm:          'hsl(190, 20%, 70%)',   // teal-blue — grounding, breathing exercises
    warmNeutral:   'hsl(220, 10%, 75%)',   // blue-grey — journal, reflective surfaces
    gentleGreen:   'hsl(152, 18%, 68%)',   // desaturated sage — positive reinforcement
    softAmber:     'hsl(38,  22%, 72%)',   // warm neutral — streak, progress (never alarm)

    // Crisis (intentionally higher contrast — urgency is appropriate here)
    crisisBg:      'hsl(5,   35%, 93%)',   // very pale rose — non-alarming but distinct
    crisisText:    'hsl(5,   40%, 35%)',   // muted red text
    crisisBorder:  'hsl(5,   30%, 75%)',   // soft red border

    // Shadows (solid, no blur — per design brief)
    shadow:        'hsl(210, 18%, 78%)',   // used as solid offset shadow colour
  },

  // ── Dark Mode ────────────────────────────────────────────────────────────
  // Dark mode is "soft twilight" — light enough to read comfortably in a dim
  // room without strain. NOT a dark theme. NOT inverted light mode.
  // Think: warm reading lamp on a cloudy evening.
  dark: {
    // Backgrounds — higher lightness than typical dark mode (L20–34 range)
    bgBase:        'hsl(214, 16%, 20%)',   // deep blue-grey (not black)
    bgSurface:     'hsl(213, 15%, 26%)',   // card surfaces — noticeably lighter than base
    bgSubtle:      'hsl(212, 13%, 30%)',   // inset wells
    bgMuted:       'hsl(211, 11%, 35%)',   // dividers

    // Text — high lightness, low saturation (never pure white)
    textPrimary:   'hsl(210, 14%, 88%)',   // soft near-white
    textSecondary: 'hsl(210, 10%, 68%)',   // secondary labels
    textTertiary:  'hsl(210,  8%, 50%)',   // placeholders
    textInverse:   'hsl(214, 16%, 20%)',   // text on light surfaces

    // Interactive — brightened vs light mode, still desaturated
    accent:        'hsl(207, 28%, 68%)',   // lighter blue in dark mode
    accentHover:   'hsl(207, 28%, 74%)',
    accentSubtle:  'hsl(207, 18%, 30%)',   // tinted background
    accentText:    'hsl(207, 30%, 76%)',

    // Semantic
    calm:          'hsl(190, 18%, 55%)',
    warmNeutral:   'hsl(220,  9%, 50%)',
    gentleGreen:   'hsl(152, 15%, 52%)',
    softAmber:     'hsl(38,  18%, 55%)',

    // Crisis
    crisisBg:      'hsl(5,   20%, 28%)',
    crisisText:    'hsl(5,   30%, 72%)',
    crisisBorder:  'hsl(5,   25%, 45%)',

    // Shadows
    shadow:        'hsl(214, 20%, 12%)',   // darker than surface for solid shadow
  },
} as const;
```

#### NativeWind Extension

Map all tokens to Tailwind custom colours in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg-base':       'var(--color-bg-base)',
        'bg-surface':    'var(--color-bg-surface)',
        'bg-subtle':     'var(--color-bg-subtle)',
        'text-primary':  'var(--color-text-primary)',
        'text-secondary':'var(--color-text-secondary)',
        'accent':        'var(--color-accent)',
        'accent-subtle': 'var(--color-accent-subtle)',
        'calm':          'var(--color-calm)',
        'gentle-green':  'var(--color-gentle-green)',
        'soft-amber':    'var(--color-soft-amber)',
        'crisis-bg':     'var(--color-crisis-bg)',
        'crisis-text':   'var(--color-crisis-text)',
      }
    }
  }
}
```

---

### 16.3 — Typography

Typography carries as much emotional weight as colour. The wrong typeface makes a calming palette feel clinical.

**Display / Headings:** `DM Serif Display` — a humanist serif with warmth and editorial calm. Its gentle ink-trap details and wide apertures feel considered, not sterile. Used for screen titles, the app name, and key emotional moments (e.g. "You did the work.").

**Body / UI:** `Lato` — specifically the Light (300) and Regular (400) weights only. Never Bold in body copy. The slightly rounded terminals feel approachable. Never use Inter, Roboto, or system fonts — they read as software, not a space.

**Monospace (for user's own typed thoughts):** `iA Writer Quattro` or `Courier Prime` — using the user's raw thoughts in a slightly different face creates subtle visual separation between "the situation" and "my interpretation," reinforcing the CBT concept of externalising thoughts.

```typescript
// tokens/typography.ts
export const typography = {
  fontDisplay:  'DMSerifDisplay_400Regular',
  fontBody:     'Lato_300Light',      // default body weight
  fontBodyMed:  'Lato_400Regular',    // labels, buttons
  fontMono:     'CourierPrime_400Regular', // user thought input fields

  // Scale — based on 4pt grid
  size: {
    xs:    12,   // metadata, timestamps
    sm:    14,   // secondary labels
    base:  16,   // body text
    md:    18,   // card titles, prominent labels
    lg:    22,   // section headings
    xl:    28,   // screen titles
    '2xl': 36,   // hero moments ("You did the work.")
    '3xl': 48,   // distress dial number, mood score
  },

  lineHeight: {
    tight:   1.2,   // headings
    normal:  1.5,   // body
    relaxed: 1.75,  // long-form text, thought records
    loose:   2.0,   // grounding exercise text (breathe into the space)
  },

  letterSpacing: {
    tight:   -0.3,
    normal:   0,
    wide:     0.6,  // used for all-caps labels only
    wider:    1.2,
  },
} as const;
```

**Rules:**
- Never use font weight above 500 in UI copy (only the display font can use its natural weight).
- Heading hierarchy must be visually obvious from size alone — never rely on bold to distinguish levels.
- User-input text fields always use the mono font. This is both aesthetic and functional: it reinforces that what the user types is _their_ raw thought, not processed information.
- Line height for all thought-record fields: `relaxed` (1.75). Give the user's words room.

---

### 16.4 — Spacing & Layout

All spacing is on a **4pt base grid**. Spacing tokens:

```
4   — hairline gap, icon padding
8   — tight inline spacing
12  — between related elements
16  — standard component padding
20  — card internal padding
24  — between card groups
32  — section spacing
40  — between major sections
48  — screen top padding (breathing room from header)
64  — generous section break
```

**Card anatomy:** All cards have `border-radius: 16px`. No card has a border — separation is achieved through background colour alone (`bgSurface` on `bgBase`). This removes the sense of compartmentalisation that borders create.

**Tap targets:** Minimum 52×52pt for all interactive elements (larger than the 44pt WCAG minimum — users under distress have reduced precision). Emotion picker cells: minimum 56×56pt.

**Max content width:** 390pt (standard iPhone width). On tablets, content is center-aligned in a 390pt column with generous outer margins — never stretches to fill.

**No horizontal scrolling** anywhere in the MVP. All content stacks vertically. Scrolling is always vertical and always decelerates smoothly (no hard stops).

---

### 16.5 — Shadows

Per the design brief: **solid shadows only. No blur. No spread.**

Solid shadows create a sense of gentle depth without the visual noise of blurred drop shadows, which can read as anxious or unfocused.

```typescript
// tokens/shadows.ts
// Format: {offsetX, offsetY, color} — no blur, no spread

export const shadows = {
  // Used on cards — lifted slightly from the base
  card: {
    shadowColor:   'var(--color-shadow)',
    shadowOffset:  { width: 2, height: 3 },
    shadowOpacity: 1,      // full opacity — it's a solid shadow
    shadowRadius:  0,      // no blur
    elevation:     3,      // Android equivalent
  },

  // Used on the primary CTA button
  button: {
    shadowColor:   'var(--color-shadow)',
    shadowOffset:  { width: 3, height: 4 },
    shadowOpacity: 1,
    shadowRadius:  0,
    elevation:     4,
  },

  // Used on modal / bottom sheet
  modal: {
    shadowColor:   'var(--color-shadow)',
    shadowOffset:  { width: 0, height: -3 },  // upward — sheet rises from below
    shadowOpacity: 1,
    shadowRadius:  0,
    elevation:     6,
  },

  // Used on emotion picker selected state
  selected: {
    shadowColor:   'var(--color-accent)',
    shadowOffset:  { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius:  0,
    elevation:     2,
  },
} as const;
```

**Never use `shadowRadius > 0` in production code.** The Kiro hook (Hook 2) should also flag any `shadowRadius` value above 0 as a design violation.

---

### 16.6 — Micro-Interactions & Animation

Animations in ClearPath serve one purpose: **to make the user feel accompanied, not alone.** Every transition should feel like someone gently guiding them to the next step — not a system performing.

All animations use `react-native-reanimated` (spring physics for feel, timing for precision). Never `Animated` from core — springs are more organic.

#### Animation Token Definitions

```typescript
// tokens/animation.ts
import { withSpring, withTiming, Easing } from 'react-native-reanimated';

export const spring = {
  // Gentle — used for most UI state changes
  gentle: { damping: 20, stiffness: 120, mass: 0.8 },

  // Soft — used for screen entry transitions, card reveals
  soft:   { damping: 24, stiffness: 90,  mass: 1.0 },

  // Bounce-free — used for elements that shouldn't overshoot (crisis UI)
  steady: { damping: 30, stiffness: 160, mass: 0.7 },
} as const;

export const timing = {
  instant:  80,    // state feedback (checkbox, toggle)
  fast:     160,   // button press response
  normal:   260,   // standard transitions
  slow:     420,   // screen transitions, reveals
  breath:   800,   // breathing exercises, slow reveals
  drift:   1200,   // very slow fades for closing/exiting moments
} as const;
```

#### Micro-Interaction Catalogue

Every interaction below must be implemented. These are not optional polish — they are the difference between an app that feels cared for and one that feels like a form.

**1. Tap / Press Response**
All `Pressable` and `TouchableOpacity` elements scale down on press to `0.97` with a `steady` spring. Color shifts to `accentHover`. No opacity flicker — scale only.

```typescript
// Reusable hook for all pressable elements
function usePressAnimation() {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const onPressIn  = () => { scale.value = withSpring(0.97, spring.steady); };
  const onPressOut = () => { scale.value = withSpring(1.0,  spring.steady); };
  return { animatedStyle, onPressIn, onPressOut };
}
```

**2. Emotion Picker Selection**
When an emotion cell is tapped:
- Cell scales up to `1.06` (spring.gentle) → settles back to `1.02` (selected state)
- Solid shadow appears (shadows.selected) with a `fast` timing transition
- Background transitions from `bgSubtle` to `accentSubtle`
- A small checkmark fades in at `1.0` scale (previously at `0.6`) using `spring.soft`
- Haptic: `Haptics.impactAsync(ImpactFeedbackStyle.Light)`

**3. Intensity Slider**
Custom slider (not the system slider, which feels mechanical):
- Thumb is a filled circle, 28pt diameter
- On drag start: thumb scales to `1.15` (spring.gentle), track brightens slightly
- As value changes: a subtle "breath" — the track fills with a smooth animated width
- On release: thumb settles back to `1.0`, haptic: `ImpactFeedbackStyle.Light` at each 10% increment
- The label beside it (e.g. "75%") counts up/down with each value change using a number-rolling animation

**4. Screen Transitions (Crisis Flow)**
Between each crisis step:
- Current screen: slides left and fades to `opacity: 0` over `slow` (420ms)
- Next screen: enters from right at `translateX: 40` → `0`, `opacity: 0 → 1`
- Progress bar segment fills with a `normal` (260ms) timing animation, easing: `Easing.out(Easing.cubic)`
- Never use the default React Navigation slide — implement custom shared element transition

**5. Balanced Thought Appearance (Step 5)**
When AI (or template) suggestion appears:
- Text renders character by character — not a typewriter (which reads as a performance), but a _word-by-word_ soft fade-in, each word at `opacity: 0 → 1` with a 40ms stagger between words
- This reads as the thought "arriving" rather than being generated
- The containing card breathes in from `scaleY: 0.94` to `1.0` (spring.soft)

**6. Before/After Emotion Shift (Step 6)**
The re-rate comparison is the emotional climax of the crisis flow:
- Bars animate from 0 to their value simultaneously (spring.soft, 600ms delay after screen arrives)
- If a value decreased: the bar colour transitions from `accent` → `gentleGreen` over 800ms
- If a value increased: no colour change — only show the number difference neutrally, never shame
- The closing message ("You did the work. That shift matters.") fades in 1200ms after bars settle — do not rush it

**7. Daily Streak Counter**
On first view each day after check-in:
- The number increments with a rolling digit animation (each digit scrolls to its new value, old one exits upward, new one enters from below)
- A ring around the streak badge fills from previous arc position to new arc position (spring.soft)
- Haptic: `NotificationFeedbackType.Success` — the only "success" haptic in the app; used sparingly

**8. Journal Card Expansion**
Tapping a journal card:
- Card scales up slightly (`1.01`) and its solid shadow deepens (`+1pt offset`) — feels like lifting it
- Content below folds out using `LayoutAnimation.easeInEaseOut` — never a fixed-height animation (content length varies)

**9. Thought Defusion Exercise**
Each defusion phrase:
- Enters at `translateY: 8` → `0`, `opacity: 0 → 1` (spring.soft)
- Stays visible for 2200ms then gently fades to `opacity: 0.3` as the next phrase arrives
- The user's own words, embedded in the phrase, render in the mono font and in `textPrimary` — their thought stands out within the reframing sentence

**10. Empty State Illustrations**
All empty states have a small, hand-drawn-style SVG illustration (inline, not image files) that gently pulses: `scale: 1.0 → 1.03 → 1.0` on a 3-second loop (timing: breath). This creates the feeling that something is alive and waiting, without demanding attention.

**11. Bottom Sheet (Grounding, Learn Library details)**
- Sheet rises with `translateY: fullHeight → 0` (spring.soft)
- Background dims to `rgba(bgBase, 0.6)` with `normal` timing — not black, never black
- The drag handle at top pulses once on arrival to signal it's draggable: `scaleX: 1.0 → 1.3 → 1.0`
- Drag-to-dismiss: velocity-based — if the user releases above 600 px/s, sheet dismisses; below that threshold, it snaps back. No jarring stops.

**12. Keyboard Avoidance**
All text inputs use a custom `KeyboardAwareScrollView` that:
- Slides the content up with a `spring.gentle` animation (not a rigid jump)
- Adds extra padding below the active input so context (the prompt question) remains visible above the keyboard
- On keyboard dismiss: content slides back down with the same spring

---

### 16.7 — Screen-Level Design Decisions

#### Home Screen
- The mood dial is the centrepiece — 60% of the screen's visual weight is devoted to it
- The two CTAs ("I need help right now" / "Today's Exercise") are side by side, not stacked — equal presence, neither dominates
- "I need help right now" uses `accent` colour, not red. Red would create anticipatory anxiety every time the home screen is viewed
- Streak badge sits quietly in the top right — small, never the focus

#### Crisis Flow Screens
- Maximum one question per screen. One. Never two.
- The question text uses `DM Serif Display` at `xl` size — it should feel like someone asking you, not a form field
- The progress bar is at the top but uses `accentSubtle` fill — barely visible, tracking quietly without pressure
- All input fields have `lineHeight: relaxed` and `padding: 20` — generous. The user's words deserve space.
- No "Next" button that greys out waiting for input. The button is always visible and tappable. Let the user decide when they're ready.

#### Thought Journal
- Cards use `bgSurface` with no border — the stack reads as a pile of notes, not a data table
- The emotion shift indicator (e.g. "Anxiety 80% → 40%") uses a small arrow icon in `gentleGreen` for decreases, neutral `textTertiary` for increases — never red for increases
- The insights panel at the top uses the mood chart as a background texture (very low opacity, `0.08`) behind the prose insight — data as atmosphere, not dashboard

#### Learn Library
- Cards are larger than standard — almost full-width, generous height. Each one feels like a book cover, not a list item.
- The distortion name uses `DM Serif Display`. The description uses `Lato Light`. The contrast between the two typefaces does the visual work.

#### Settings
- Grouped as "Your experience", "Your data", "About" — not labelled as "Notifications", "Privacy", "Legal"
- The API key field shows a subtle animated underline (not a full border) that glows `accent` on focus
- "Clear all data" is the last item, in `textTertiary` colour — findable, but never accidentally tapped

---

### 16.8 — Kiro Hook Addition: Design System Enforcement

Add a seventh Kiro hook for design system compliance:

#### Hook 7 — Design Token Enforcer
**Trigger:** On save of any `.tsx` or `.ts` file in `components/` or `app/`
**Action:** Scan for hardcoded colour values (hex, rgb, rgba, hsl literals directly in styles), hardcoded `fontSize` numbers not from `typography.size`, `shadowRadius` values above 0, and any `fontFamily` not in the approved token list. Flag each with an inline comment.

```
When any component or screen file is saved, scan style objects and NativeWind classes for:
1. Any hardcoded color value (hex #, rgb(), rgba(), hsl()) not using a CSS variable or token
2. Any fontSize not referencing typography.size tokens
3. Any shadowRadius > 0
4. Any fontFamily string not in ['DMSerifDisplay_400Regular', 'Lato_300Light', 'Lato_400Regular', 'CourierPrime_400Regular']
5. Any borderWidth > 0 on card or surface elements (borders are prohibited on surfaces)

Flag each violation with: // DESIGN VIOLATION: use token from tokens/colors.ts or tokens/typography.ts
Do not auto-fix. The developer must make the intentional choice.
```

---

### 16.9 — What the App Must Never Look Like

This is as important as what it should look like. Show this list to every designer and developer.

- **No gradients.** Flat colour surfaces only. Gradients add visual noise and can feel performative.
- **No blurred shadows.** Solid offset only (see Section 16.5).
- **No high-saturation colours** outside the crisis banner. Nothing above S40.
- **No pure black (`#000`) or pure white (`#fff`)** anywhere. Ever.
- **No card borders.** Surface separation is achieved through background colour difference alone.
- **No loading spinners.** Use skeleton loaders (bgMuted animated pulse) for any async content.
- **No banner notifications inside the app** (except crisis resources). No toasts that slide in announcing success. A subtle state change on the element itself is sufficient.
- **No confetti or particle effects** on completion. A calm, warm closing message is the reward.
- **No icon labels in the tab bar.** Icons only — labels add clutter and reduce the calm. Ensure icons are sufficiently distinct and include `accessibilityLabel` for screen readers.
- **No full-bleed photography or illustration.** Visual weight from imagery would compete with the emotional content the user is processing.
- **No dark backgrounds in light mode** (except crisis resources banner, which uses `crisisBg`).
- **No font weights above 500** in body copy or UI labels.
