import {
  CalendarIcon,
  CheckCircleIcon,
  FileTextIcon,
} from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { useDashboardStore } from "@/lib/dashboard-store";

type HabitFormData = {
  name: string;
  description: string;
  category: string;
  frequency: string;
  targetStreak: string;
  reminderTime: string;
  difficulty: "easy" | "medium" | "hard";
};

const HABIT_CATEGORIES = [
  { label: "Health & Fitness", value: "health" },
  { label: "Productivity", value: "productivity" },
  { label: "Learning", value: "learning" },
  { label: "Mindfulness", value: "mindfulness" },
  { label: "Social", value: "social" },
  { label: "Creative", value: "creative" },
  { label: "Other", value: "other" },
];

const FREQUENCY_OPTIONS = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const TARGET_STREAK_OPTIONS = [
  { label: "7 days", value: "7" },
  { label: "14 days", value: "14" },
  { label: "21 days", value: "21" },
  { label: "30 days", value: "30" },
  { label: "60 days", value: "60" },
  { label: "90 days", value: "90" },
];

const DIFFICULTY_OPTIONS = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

export function AddHabitForm({ onClose }: { onClose: () => void }) {
  const { addHabit } = useDashboardStore();
  const [formData, setFormData] = useState<HabitFormData>({
    name: "",
    description: "",
    category: "",
    frequency: "daily",
    targetStreak: "30",
    reminderTime: "09:00",
    difficulty: "medium",
  });

  const [errors, setErrors] = useState<Partial<HabitFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<HabitFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter a habit name";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Please enter a description";
    }
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    addHabit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      frequency: formData.frequency,
      targetStreak: Number(formData.targetStreak),
      reminderTime: formData.reminderTime,
      difficulty: formData.difficulty,
    });

    onClose();
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
      <View className="gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Habit</CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            {/* Habit Name */}
            <View className="gap-2">
              <Label>Habit Name</Label>
              <View className="relative">
                <Input
                  className="pl-8"
                  onChangeText={(value) =>
                    setFormData({ ...formData, name: value })
                  }
                  placeholder="e.g., Drink 8 glasses of water"
                  value={formData.name}
                />
                <Icon
                  as={CheckCircleIcon}
                  className="absolute top-3 left-3 text-muted-foreground"
                  size={16}
                />
              </View>
              {errors.name && (
                <Text className="text-red-500" variant="small">
                  {errors.name}
                </Text>
              )}
            </View>

            {/* Description */}
            <View className="gap-2">
              <Label>Description</Label>
              <View className="relative">
                <Textarea
                  className="pl-8"
                  onChangeText={(value) =>
                    setFormData({ ...formData, description: value })
                  }
                  placeholder="Describe your habit and why it's important"
                  value={formData.description}
                />
                <Icon
                  as={FileTextIcon}
                  className="absolute top-3 left-3 text-muted-foreground"
                  size={16}
                />
              </View>
              {errors.description && (
                <Text className="text-red-500" variant="small">
                  {errors.description}
                </Text>
              )}
            </View>

            {/* Category */}
            <View className="gap-2">
              <Label>Category</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                value={formData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {HABIT_CATEGORIES.map((category) => (
                    <SelectItem
                      key={category.value}
                      label={category.label}
                      value={category.value}
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <Text className="text-red-500" variant="small">
                  {errors.category}
                </Text>
              )}
            </View>

            {/* Frequency */}
            <View className="gap-2">
              <Label>Frequency</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, frequency: value })
                }
                value={formData.frequency}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {FREQUENCY_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </View>

            {/* Target Streak */}
            <View className="gap-2">
              <Label>Target Streak</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, targetStreak: value })
                }
                value={formData.targetStreak}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target streak" />
                </SelectTrigger>
                <SelectContent>
                  {TARGET_STREAK_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </View>

            {/* Difficulty */}
            <View className="gap-2">
              <Label>Difficulty</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, difficulty: value as "easy" | "medium" | "hard" })
                }
                value={formData.difficulty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTY_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </View>

            {/* Reminder Time */}
            <View className="gap-2">
              <Label>Reminder Time</Label>
              <View className="relative">
                <Input
                  className="pl-8"
                  onChangeText={(value) =>
                    setFormData({ ...formData, reminderTime: value })
                  }
                  placeholder="HH:MM (24-hour format)"
                  value={formData.reminderTime}
                />
                <Icon
                  as={CalendarIcon}
                  className="absolute top-3 left-3 text-muted-foreground"
                  size={16}
                />
              </View>
            </View>

            {/* Preview */}
            <Card className="bg-muted/50">
              <CardContent className="p-3">
                <View className="gap-2">
                  <Text className="font-medium">Habit Preview</Text>
                  <Text className="font-semibold">
                    {formData.name || "Habit Name"}
                  </Text>
                  <Text className="text-muted-foreground" variant="small">
                    {formData.description || "Description will appear here"}
                  </Text>
                  <View className="flex-row gap-4">
                    <Text className="text-muted-foreground" variant="small">
                      Category: {formData.category || "Not selected"}
                    </Text>
                    <Text className="text-muted-foreground" variant="small">
                      Frequency: {formData.frequency}
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <View className="gap-3">
          <Button className="w-full" onPress={handleSubmit}>
            <Text>Create Habit</Text>
          </Button>
          <Button className="w-full" onPress={onClose} variant="outline">
            <Text>Cancel</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
