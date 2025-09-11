import React from "react";
import { Container } from "@/components/container";
import { HabitAnalytics } from "@/components/habits/HabitAnalytics";
import { useDashboardStore } from "@/lib/dashboard-store";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ArrowLeftIcon } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function HabitAnalyticsScreen() {
  const { habits } = useDashboardStore();

  return (
    <Container>
      <View className="flex-row items-center gap-4 p-4">
        <Button
          onPress={() => router.back()}
          size="sm"
          variant="outline"
        >
          <Icon as={ArrowLeftIcon} size={16} />
        </Button>
        <Text variant="h2">Habit Analytics</Text>
      </View>
      
      {habits.length > 0 ? (
        <View className="gap-4">
          {habits.map((habit) => (
            <HabitAnalytics key={habit.id} habitId={habit.id} />
          ))}
        </View>
      ) : (
        <View className="flex-1 items-center justify-center p-8">
          <Text className="text-center text-muted-foreground">
            No habits to analyze yet. Create some habits first!
          </Text>
        </View>
      )}
    </Container>
  );
}
