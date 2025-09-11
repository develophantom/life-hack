import { router } from "expo-router";
import {
  BrainIcon,
  HeartIcon,
  ShieldIcon,
  SparklesIcon,
  TargetIcon,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";

export default function AIPreferencesScreen() {
  const [aiInsights, setAiInsights] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [goalAlerts, setGoalAlerts] = useState(true);

  const handleContinue = () => {
    // TODO: Save AI preferences
    router.push("/onboarding/dashboard-ready");
  };

  const handleSkip = () => {
    router.push("/onboarding/dashboard-ready");
  };

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <View className="gap-8">
          {/* Header */}
          <View className="items-center gap-4">
            <View className="rounded-full bg-primary p-4">
              <Icon
                as={BrainIcon}
                className="text-primary-foreground"
                size={24}
              />
            </View>
            <View className="items-center gap-2">
              <Text variant="h2">AI Preferences</Text>
              <Text className="text-center" variant="muted">
                Configure your AI assistant
              </Text>
            </View>
          </View>

          {/* Progress Indicator */}
          <View className="flex-row items-center justify-center gap-2">
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-8 rounded-full bg-primary" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
          </View>

          {/* AI Features Overview */}
          <Card>
            <CardHeader>
              <CardTitle>AI Features</CardTitle>
              <Text variant="muted">What AI can do for you</Text>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="flex-row items-center gap-3">
                <Icon as={SparklesIcon} className="text-primary" size={20} />
                <View className="flex-1">
                  <Text className="font-semibold">
                    Weekly insights and reports
                  </Text>
                  <Text variant="muted">
                    Personalized analysis of your progress
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3">
                <Icon as={TargetIcon} className="text-primary" size={20} />
                <View className="flex-1">
                  <Text className="font-semibold">
                    Personalized habit suggestions
                  </Text>
                  <Text variant="muted">AI learns from your patterns</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3">
                <Icon as={HeartIcon} className="text-primary" size={20} />
                <View className="flex-1">
                  <Text className="font-semibold">
                    Smart spending recommendations
                  </Text>
                  <Text variant="muted">Optimize your financial decisions</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3">
                <Icon as={SparklesIcon} className="text-primary" size={20} />
                <View className="flex-1">
                  <Text className="font-semibold">
                    Goal achievement predictions
                  </Text>
                  <Text variant="muted">Forecast your success probability</Text>
                </View>
              </View>
            </CardContent>
          </Card>

          {/* Privacy Assurance */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="gap-3">
              <View className="flex-row items-center gap-3">
                <Icon as={ShieldIcon} className="text-green-500" size={20} />
                <View className="flex-1">
                  <Text className="font-semibold">
                    Your data stays private and secure
                  </Text>
                  <Text variant="muted">
                    All processing happens locally on your device
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3">
                <Icon as={BrainIcon} className="text-green-500" size={20} />
                <View className="flex-1">
                  <Text className="font-semibold">
                    AI learns from your patterns, not your personal details
                  </Text>
                  <Text variant="muted">
                    No sensitive information is shared
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-semibold">Enable AI insights</Text>
                  <Text variant="muted">Get personalized recommendations</Text>
                </View>
                <Switch checked={aiInsights} onCheckedChange={setAiInsights} />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-semibold">Daily reminders</Text>
                  <Text variant="muted">Gentle habit reminders</Text>
                </View>
                <Switch
                  checked={dailyReminders}
                  onCheckedChange={setDailyReminders}
                />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-semibold">Weekly reports</Text>
                  <Text variant="muted">Progress summaries via email</Text>
                </View>
                <Switch
                  checked={weeklyReports}
                  onCheckedChange={setWeeklyReports}
                />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-semibold">Goal alerts</Text>
                  <Text variant="muted">Important milestone notifications</Text>
                </View>
                <Switch checked={goalAlerts} onCheckedChange={setGoalAlerts} />
              </View>
            </CardContent>
          </Card>

          {/* Actions */}
          <View className="gap-3">
            <Button className="w-full" onPress={handleContinue}>
              <Text>Continue</Text>
            </Button>

            <Button onPress={handleSkip} variant="ghost">
              <Text>I'll configure this later</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
