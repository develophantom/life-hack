import { router } from "expo-router";
import {
  BookOpenIcon,
  BrainIcon,
  DumbbellIcon,
  HeartIcon,
  HomeIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

const HABIT_CATEGORIES = [
  {
    id: "health",
    name: "Health & Fitness",
    icon: DumbbellIcon,
    description: "Exercise, nutrition, sleep, and wellness",
    suggestions: [
      "Daily workout",
      "Drink 8 glasses of water",
      "Get 8 hours of sleep",
    ],
  },
  {
    id: "productivity",
    name: "Productivity & Work",
    icon: TargetIcon,
    description: "Work habits, time management, and focus",
    suggestions: ["Morning routine", "Deep work sessions", "Email management"],
  },
  {
    id: "learning",
    name: "Learning & Education",
    icon: BookOpenIcon,
    description: "Reading, courses, and skill development",
    suggestions: [
      "Read 30 minutes daily",
      "Learn a new skill",
      "Practice coding",
    ],
  },
  {
    id: "financial",
    name: "Financial Habits",
    icon: HeartIcon,
    description: "Saving, budgeting, and money management",
    suggestions: [
      "Track daily expenses",
      "Save 20% of income",
      "Review budget weekly",
    ],
  },
  {
    id: "mindfulness",
    name: "Mindfulness & Wellness",
    icon: BrainIcon,
    description: "Meditation, reflection, and mental health",
    suggestions: ["Daily meditation", "Gratitude journaling", "Digital detox"],
  },
  {
    id: "social",
    name: "Social & Relationships",
    icon: UsersIcon,
    description: "Family time, friendships, and social connections",
    suggestions: ["Call family weekly", "Meet friends monthly", "Date night"],
  },
  {
    id: "home",
    name: "Home & Organization",
    icon: HomeIcon,
    description: "Cleaning, organizing, and home maintenance",
    suggestions: ["Make bed daily", "Weekly cleaning", "Declutter monthly"],
  },
];

export default function HabitFocusAreasScreen() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleContinue = () => {
    // TODO: Save habit preferences
    router.push("/onboarding/ai");
  };

  const handleSkip = () => {
    router.push("/onboarding/ai");
  };

  const getSelectedSuggestions = () => {
    return selectedCategories
      .map((categoryId) =>
        HABIT_CATEGORIES.find((cat) => cat.id === categoryId)
      )
      .filter(Boolean)
      .flatMap((category) => category!.suggestions)
      .slice(0, 3); // Show max 3 suggestions
  };

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <View className="gap-8">
          {/* Header */}
          <View className="items-center gap-4">
            <View className="rounded-full bg-primary p-4">
              <Icon
                as={TargetIcon}
                className="text-primary-foreground"
                size={24}
              />
            </View>
            <View className="items-center gap-2">
              <Text variant="h2">Habit Focus Areas</Text>
              <Text className="text-center" variant="muted">
                Select what matters to you
              </Text>
            </View>
          </View>

          {/* Progress Indicator */}
          <View className="flex-row items-center justify-center gap-2">
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-8 rounded-full bg-primary" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
          </View>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Your Interests</CardTitle>
              <Text variant="muted">Select 3-5 areas that matter to you</Text>
            </CardHeader>
            <CardContent className="gap-3">
              {HABIT_CATEGORIES.map((category) => (
                <Button
                  className="w-full justify-start"
                  key={category.id}
                  onPress={() => handleCategoryToggle(category.id)}
                  variant={
                    selectedCategories.includes(category.id)
                      ? "default"
                      : "outline"
                  }
                >
                  <Icon as={category.icon} size={20} />
                  <View className="flex-1 items-start">
                    <Text className="font-semibold">{category.name}</Text>
                    <Text className="text-muted-foreground" variant="small">
                      {category.description}
                    </Text>
                  </View>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Quick Habits Suggestions */}
          {selectedCategories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Quick Habits</CardTitle>
                <Text variant="muted">Based on your selections</Text>
              </CardHeader>
              <CardContent className="gap-3">
                {getSelectedSuggestions().map((suggestion, index) => (
                  <View className="flex-row items-center gap-3" key={index}>
                    <View className="h-2 w-2 rounded-full bg-primary" />
                    <Text>{suggestion}</Text>
                  </View>
                ))}
                <Button className="w-full" variant="ghost">
                  <Text>Add your first habit</Text>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <View className="gap-3">
            <Button className="w-full" onPress={handleContinue}>
              <Text>Continue</Text>
            </Button>

            <Button onPress={handleSkip} variant="ghost">
              <Text>I'll add habits later</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
