import { FlameIcon, TrendingUpIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

type StreakCounterProps = {
  streak: number;
  habitName: string;
  isActive?: boolean;
};

export function StreakCounter({
  streak,
  habitName,
  isActive = true,
}: StreakCounterProps) {
  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-purple-600 dark:text-purple-400";
    if (streak >= 7) return "text-orange-600 dark:text-orange-400";
    return "text-green-600 dark:text-green-400";
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 30) return FlameIcon;
    return TrendingUpIcon;
  };

  const getStreakMessage = (streak: number) => {
    if (streak >= 30) return "🔥 On fire!";
    if (streak >= 7) return "📈 Great momentum!";
    if (streak >= 3) return "💪 Keep it up!";
    return "🌱 Getting started";
  };

  return (
    <Card
      className={isActive ? "border-primary/20 bg-primary/5" : "opacity-60"}
    >
      <CardContent className="p-4">
        <View className="items-center gap-3">
          <Icon
            as={getStreakIcon(streak)}
            className={getStreakColor(streak)}
            size={32}
          />
          <View className="items-center gap-1">
            <Text className={`font-bold text-2xl ${getStreakColor(streak)}`}>
              {streak}
            </Text>
            <Text className="text-muted-foreground" variant="small">
              day streak
            </Text>
          </View>
          <View className="items-center gap-1">
            <Text className="text-center font-medium">{habitName}</Text>
            <Text className="text-muted-foreground" variant="small">
              {getStreakMessage(streak)}
            </Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
