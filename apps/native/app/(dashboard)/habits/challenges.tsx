import React from "react";
import { Container } from "@/components/container";
import { HabitChallenges } from "@/components/habits/HabitChallenges";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ArrowLeftIcon } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function HabitChallengesScreen() {
  const handleChallengeJoin = () => {
    // Handle challenge join logic
    console.log("Challenge joined!");
  };

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
        <Text variant="h2">Habit Challenges</Text>
      </View>
      
      <HabitChallenges onChallengeJoin={handleChallengeJoin} />
    </Container>
  );
}
