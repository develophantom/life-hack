import React from "react";
import { Container } from "@/components/container";
import { HabitTemplates } from "@/components/habits/HabitTemplates";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ArrowLeftIcon } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function HabitTemplatesScreen() {
  const handleTemplateSelect = () => {
    // Navigate back to habits screen after selecting a template
    router.back();
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
        <Text variant="h2">Habit Templates</Text>
      </View>
      
      <HabitTemplates onTemplateSelect={handleTemplateSelect} />
    </Container>
  );
}
