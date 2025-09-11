import { BellIcon, ClockIcon, SettingsIcon } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
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
import { useDashboardStore } from "@/lib/dashboard-store";

type ReminderSettings = {
  enabled: boolean;
  time: string;
  frequency: "daily" | "weekly" | "custom";
  customDays?: number[];
  message: string;
};

type HabitRemindersProps = {
  habitId: string;
};

export function HabitReminders({ habitId }: HabitRemindersProps) {
  const { habits, updateHabit } = useDashboardStore();
  const habit = habits.find(h => h.id === habitId);
  
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
    enabled: !!habit?.reminderTime,
    time: habit?.reminderTime || "09:00",
    frequency: "daily",
    message: `Time to work on ${habit?.name || "your habit"}!`,
  });

  const handleSaveReminders = () => {
    if (habit) {
      updateHabit(habitId, {
        reminderTime: reminderSettings.enabled ? reminderSettings.time : undefined,
      });
    }
  };

  const FREQUENCY_OPTIONS = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Custom", value: "custom" },
  ];

  const DAYS_OF_WEEK = [
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
    { label: "Sunday", value: 0 },
  ];

  if (!habit) {
    return (
      <Card>
        <CardContent className="p-4">
          <Text className="text-center text-muted-foreground">
            Habit not found
          </Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
      <View className="gap-4">
        <View className="gap-2">
          <Text variant="h2">Reminder Settings</Text>
          <Text variant="muted">
            Set up notifications to help you stay consistent with {habit.name}
          </Text>
        </View>

        {/* Enable/Disable */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Icon
                  as={BellIcon}
                  className={reminderSettings.enabled ? "text-green-500" : "text-muted-foreground"}
                  size={20}
                />
                <View>
                  <Text className="font-medium">
                    {reminderSettings.enabled ? "Notifications Enabled" : "Notifications Disabled"}
                  </Text>
                  <Text className="text-muted-foreground" variant="small">
                    {reminderSettings.enabled 
                      ? "You'll receive reminders for this habit"
                      : "No reminders will be sent"
                    }
                  </Text>
                </View>
              </View>
              <Button
                onPress={() => setReminderSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
                size="sm"
                variant={reminderSettings.enabled ? "default" : "outline"}
              >
                <Text>{reminderSettings.enabled ? "Disable" : "Enable"}</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        {reminderSettings.enabled && (
          <>
            {/* Time Setting */}
            <Card>
              <CardHeader>
                <CardTitle>Reminder Time</CardTitle>
              </CardHeader>
              <CardContent>
                <View className="gap-3">
                  <View className="gap-2">
                    <Label>Time</Label>
                    <View className="relative">
                      <Input
                        className="pl-8"
                        onChangeText={(value) =>
                          setReminderSettings(prev => ({ ...prev, time: value }))
                        }
                        placeholder="HH:MM (24-hour format)"
                        value={reminderSettings.time}
                      />
                      <Icon
                        as={ClockIcon}
                        className="absolute top-3 left-3 text-muted-foreground"
                        size={16}
                      />
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>

            {/* Frequency Setting */}
            <Card>
              <CardHeader>
                <CardTitle>Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <View className="gap-3">
                  <View className="gap-2">
                    <Label>How often?</Label>
                    <Select
                      onValueChange={(value) =>
                        setReminderSettings(prev => ({ 
                          ...prev, 
                          frequency: value as "daily" | "weekly" | "custom" 
                        }))
                      }
                      value={reminderSettings.frequency}
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
                </View>
              </CardContent>
            </Card>

            {/* Custom Message */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Message</CardTitle>
              </CardHeader>
              <CardContent>
                <View className="gap-2">
                  <Label>Reminder message</Label>
                  <Input
                    onChangeText={(value) =>
                      setReminderSettings(prev => ({ ...prev, message: value }))
                    }
                    placeholder="Enter your custom reminder message"
                    value={reminderSettings.message}
                  />
                </View>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <View className="gap-3">
                  <View className="flex-row items-center gap-3">
                    <Icon
                      as={BellIcon}
                      className="text-blue-500"
                      size={20}
                    />
                    <View className="flex-1">
                      <Text className="font-medium">Reminder Preview</Text>
                      <Text className="text-muted-foreground" variant="small">
                        {reminderSettings.message}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-3">
                    <Icon
                      as={ClockIcon}
                      className="text-green-500"
                      size={20}
                    />
                    <View className="flex-1">
                      <Text className="font-medium">Schedule</Text>
                      <Text className="text-muted-foreground" variant="small">
                        {reminderSettings.frequency} at {reminderSettings.time}
                      </Text>
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          </>
        )}

        {/* Save Button */}
        <Button className="w-full" onPress={handleSaveReminders}>
          <Icon as={SettingsIcon} size={16} />
          <Text>Save Reminder Settings</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
