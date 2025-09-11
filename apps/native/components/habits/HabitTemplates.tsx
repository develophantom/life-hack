import { CheckCircleIcon, HeartIcon, BookOpenIcon, TargetIcon, BrainIcon, UsersIcon, PaletteIcon } from "lucide-react-native";
import React from "react";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

type HabitTemplate = {
  id: string;
  name: string;
  description: string;
  category: string;
  frequency: string;
  targetStreak: number;
  difficulty: "easy" | "medium" | "hard";
  icon: any;
  benefits: string[];
};

const HABIT_TEMPLATES: HabitTemplate[] = [
  {
    id: "water_intake",
    name: "Drink 8 Glasses of Water",
    description: "Stay hydrated by drinking 8 glasses of water daily",
    category: "health",
    frequency: "daily",
    targetStreak: 30,
    difficulty: "easy",
    icon: CheckCircleIcon,
    benefits: ["Better hydration", "Improved skin health", "Better digestion"],
  },
  {
    id: "morning_exercise",
    name: "Morning Exercise",
    description: "Start your day with 30 minutes of physical activity",
    category: "health",
    frequency: "daily",
    targetStreak: 21,
    difficulty: "medium",
    icon: HeartIcon,
    benefits: ["Increased energy", "Better mood", "Improved fitness"],
  },
  {
    id: "reading",
    name: "Daily Reading",
    description: "Read for at least 20 minutes every day",
    category: "learning",
    frequency: "daily",
    targetStreak: 30,
    difficulty: "easy",
    icon: BookOpenIcon,
    benefits: ["Knowledge expansion", "Improved focus", "Better vocabulary"],
  },
  {
    id: "meditation",
    name: "Daily Meditation",
    description: "Practice mindfulness for 10 minutes daily",
    category: "mindfulness",
    frequency: "daily",
    targetStreak: 21,
    difficulty: "medium",
    icon: BrainIcon,
    benefits: ["Reduced stress", "Better focus", "Emotional balance"],
  },
  {
    id: "goal_tracking",
    name: "Goal Review",
    description: "Review and update your daily goals",
    category: "productivity",
    frequency: "daily",
    targetStreak: 14,
    difficulty: "easy",
    icon: TargetIcon,
    benefits: ["Better planning", "Increased productivity", "Goal achievement"],
  },
  {
    id: "social_connection",
    name: "Social Connection",
    description: "Reach out to a friend or family member daily",
    category: "social",
    frequency: "daily",
    targetStreak: 21,
    difficulty: "medium",
    icon: UsersIcon,
    benefits: ["Stronger relationships", "Better mental health", "Social support"],
  },
  {
    id: "creative_time",
    name: "Creative Time",
    description: "Spend 15 minutes on a creative activity",
    category: "creative",
    frequency: "daily",
    targetStreak: 30,
    difficulty: "easy",
    icon: PaletteIcon,
    benefits: ["Enhanced creativity", "Stress relief", "Personal expression"],
  },
];

type HabitTemplatesProps = {
  onTemplateSelect?: (template: HabitTemplate) => void;
};

export function HabitTemplates({ onTemplateSelect }: HabitTemplatesProps) {
  const { addHabit } = useDashboardStore();

  const handleTemplateSelect = (template: HabitTemplate) => {
    addHabit({
      name: template.name,
      description: template.description,
      category: template.category,
      frequency: template.frequency,
      targetStreak: template.targetStreak,
      difficulty: template.difficulty,
      reminderTime: "09:00",
    });
    
    onTemplateSelect?.(template);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 dark:text-green-400";
      case "medium":
        return "text-orange-600 dark:text-orange-400";
      case "hard":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "health":
        return "text-green-500";
      case "productivity":
        return "text-blue-500";
      case "learning":
        return "text-purple-500";
      case "mindfulness":
        return "text-indigo-500";
      case "social":
        return "text-pink-500";
      case "creative":
        return "text-orange-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
      <View className="gap-4">
        <View className="gap-2">
          <Text variant="h2">Habit Templates</Text>
          <Text variant="muted">
            Choose from popular habits to get started quickly
          </Text>
        </View>

        {HABIT_TEMPLATES.map((template) => (
          <Card key={template.id}>
            <CardContent className="p-4">
              <View className="gap-3">
                {/* Header */}
                <View className="flex-row items-start gap-3">
                  <Icon
                    as={template.icon}
                    className={getCategoryColor(template.category)}
                    size={24}
                  />
                  <View className="flex-1">
                    <Text className="font-semibold">{template.name}</Text>
                    <Text className="text-muted-foreground" variant="small">
                      {template.description}
                    </Text>
                  </View>
                </View>

                {/* Meta Info */}
                <View className="flex-row items-center gap-4">
                  <View className="flex-row items-center gap-1">
                    <Text className="text-muted-foreground" variant="small">
                      Difficulty:
                    </Text>
                    <Text className={`font-medium ${getDifficultyColor(template.difficulty)}`} variant="small">
                      {template.difficulty.charAt(0).toUpperCase() + template.difficulty.slice(1)}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-muted-foreground" variant="small">
                      Target:
                    </Text>
                    <Text className="font-medium" variant="small">
                      {template.targetStreak} days
                    </Text>
                  </View>
                </View>

                {/* Benefits */}
                <View className="gap-2">
                  <Text className="font-medium" variant="small">
                    Benefits:
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {template.benefits.map((benefit, index) => (
                      <View
                        key={index}
                        className="rounded-full bg-primary/10 px-2 py-1"
                      >
                        <Text className="text-primary" variant="small">
                          {benefit}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Action Button */}
                <Button
                  className="w-full"
                  onPress={() => handleTemplateSelect(template)}
                  size="sm"
                >
                  <Text>Add This Habit</Text>
                </Button>
              </View>
            </CardContent>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}
