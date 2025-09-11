import { Stack } from "expo-router";

export default function HabitsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Habits",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-habit"
        options={{
          title: "Add Habit",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="analytics"
        options={{
          title: "Habit Analytics",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="templates"
        options={{
          title: "Habit Templates",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="challenges"
        options={{
          title: "Habit Challenges",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="reminders"
        options={{
          title: "Habit Reminders",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="calendar"
        options={{
          title: "Habit Calendar",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="chains"
        options={{
          title: "Habit Chains",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="export"
        options={{
          title: "Export & Backup",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
