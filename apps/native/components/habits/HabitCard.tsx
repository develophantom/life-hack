import { CheckCircleIcon, FlameIcon, TargetIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

type HabitCardProps = {
  habit: {
    id: string;
    name: string;
    description: string;
    category: string;
    frequency: string;
    currentStreak: number;
    targetStreak: number;
    completedToday: boolean;
  };
  onToggleComplete?: () => void;
  onPress?: () => void;
};

export function HabitCard({
  habit,
  onToggleComplete,
  onPress,
}: HabitCardProps) {
  const getHabitIcon = (category: string) => {
    switch (category) {
      case "health":
        return TargetIcon;
      case "productivity":
        return CheckCircleIcon;
      case "learning":
        return TargetIcon;
      default:
        return CheckCircleIcon;
    }
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-purple-600 dark:text-purple-400";
    if (streak >= 7) return "text-orange-600 dark:text-orange-400";
    return "text-green-600 dark:text-green-400";
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 30) return FlameIcon;
    return CheckCircleIcon;
  };

  const progress = (habit.currentStreak / habit.targetStreak) * 100;
  const isCompleted = habit.currentStreak >= habit.targetStreak;

  return (
    <Card onPress={onPress}>
      <CardContent className="p-4">
        <View className="gap-3">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Icon
                as={getHabitIcon(habit.category)}
                className="text-primary"
                size={20}
              />
              <View className="flex-1">
                <Text className="font-semibold">{habit.name}</Text>
                <Text className="text-muted-foreground" variant="small">
                  {habit.description}
                </Text>
              </View>
            </View>
            <Button
              onPress={onToggleComplete}
              size="sm"
              variant={habit.completedToday ? "default" : "outline"}
            >
              <Icon
                as={CheckCircleIcon}
                className={
                  habit.completedToday ? "text-white" : "text-muted-foreground"
                }
                size={16}
              />
            </Button>
          </View>

          {/* Streak Info */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Icon
                as={getStreakIcon(habit.currentStreak)}
                className={getStreakColor(habit.currentStreak)}
                size={16}
              />
              <Text
                className={`font-semibold ${getStreakColor(
                  habit.currentStreak
                )}`}
                variant="small"
              >
                {habit.currentStreak} day streak
              </Text>
            </View>
            <Text className="text-muted-foreground" variant="small">
              {habit.frequency}
            </Text>
          </View>

          {/* Progress Bar */}
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-muted-foreground" variant="small">
                Progress to goal
              </Text>
              <Text
                className={`font-semibold ${
                  isCompleted
                    ? "text-green-600 dark:text-green-400"
                    : "text-blue-600 dark:text-blue-400"
                }`}
                variant="small"
              >
                {habit.currentStreak} / {habit.targetStreak}
              </Text>
            </View>
            <View className="h-2 rounded-full bg-muted">
              <View
                className={`h-2 rounded-full ${
                  isCompleted
                    ? "bg-green-500"
                    : progress > 80
                      ? "bg-orange-500"
                      : "bg-blue-500"
                }`}
                style={{
                  width: `${Math.min(progress, 100)}%`,
                }}
              />
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
