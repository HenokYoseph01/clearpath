import { Pressable, Text } from "react-native";
import { Link } from "expo-router";
import { CrisisSessionRecord } from "@/modules/db/queries";
import { distortionDefinitions } from "@/constants/distortions";

type JournalCardProps = {
  entry: CrisisSessionRecord;
};

export function JournalCard({ entry }: JournalCardProps) {
  const shifts = entry.emotions
    .filter((emotion) => typeof emotion.intensityAfter === "number")
    .map((emotion) => `${emotion.label} ${emotion.intensityBefore}% -> ${emotion.intensityAfter}%`);

  return (
    <Link href={`/journal/${entry.id}`} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open journal entry from ${new Date(entry.createdAt).toLocaleDateString()}`}
        className="mb-3 rounded-calm bg-bg-surface p-4"
      >
        <Text className="font-body text-xs text-text-tertiary">{new Date(entry.createdAt).toLocaleString()}</Text>
        <Text className="mt-2 font-display text-xl text-text-primary" numberOfLines={2}>
          {entry.situation || "Reflection"}
        </Text>
        {shifts.length > 0 ? <Text className="mt-2 font-bodyMed text-sm text-text-secondary">{shifts.join(", ")}</Text> : null}
        {entry.distortions.length > 0 ? (
          <Text className="mt-2 font-body text-sm text-text-secondary">
            {entry.distortions.map((key) => distortionDefinitions[key]?.title ?? key).join(", ")}
          </Text>
        ) : null}
        <Text className="mt-3 font-bodyMed text-sm text-accent">Open reflection</Text>
      </Pressable>
    </Link>
  );
}
