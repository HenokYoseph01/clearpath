export type ReminderScheduleResult = {
  ok: boolean;
  message: string;
};

export async function scheduleDailyReminder(hour: number, minute: number): Promise<ReminderScheduleResult> {
  try {
    const Notifications = await import("expo-notifications");

    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "ClearPath",
        body: "A short check-in is ready when you are.",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });

    return {
      ok: true,
      message: `A daily check-in reminder is set for ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}.`,
    };
  } catch {
    return {
      ok: false,
      message:
        "Reminders need a development build on Android. The rest of ClearPath works in Expo Go.",
    };
  }
}
