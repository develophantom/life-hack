import { router } from "expo-router";
import {
  CheckCircleIcon,
  PlusIcon,
  TargetIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

export default function DashboardReadyScreen() {
  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  const handleAddHabit = () => {
    // TODO: Navigate to add habit screen
    router.push("/dashboard");
  };

  const handleLogExpense = () => {
    // TODO: Navigate to log expense screen
    router.push("/dashboard");
  };

  const handleSetGoal = () => {
    // TODO: Navigate to set goal screen
    router.push("/dashboard");
  };

  return (
    <Container>
      <ScrollView contentContainerClassName="flex-1 items-center justify-center gap-8 p-6">
        {/* Celebration */}
        <View className="items-center gap-4">
          <View className="rounded-full bg-green-500 p-6">
            <Icon as={CheckCircleIcon} className="text-white" size={32} />
          </View>
          <View className="items-center gap-2">
            <Text className="text-center" variant="h1">
              🎉 Welcome!
            </Text>
            <Text className="text-center" variant="h2">
              Your dashboard is ready
            </Text>
            <Text className="text-center" variant="lead">
              Let's start your journey to better habits and financial wellness
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <Text variant="muted">Get started with these actions</Text>
          </CardHeader>
          <CardContent className="gap-3">
            <Button
              className="w-full justify-start"
              onPress={handleAddHabit}
              variant="outline"
            >
              <Icon as={TargetIcon} size={20} />
              <View className="flex-1 items-start">
                <Text className="font-semibold">Add your first habit</Text>
                <Text className="text-muted-foreground" variant="small">
                  Start tracking a new habit
                </Text>
              </View>
              <Icon as={PlusIcon} size={16} />
            </Button>

            <Button
              className="w-full justify-start"
              onPress={handleLogExpense}
              variant="outline"
            >
              <Icon as={WalletIcon} size={20} />
              <View className="flex-1 items-start">
                <Text className="font-semibold">Log your first expense</Text>
                <Text className="text-muted-foreground" variant="small">
                  Track your spending
                </Text>
              </View>
              <Icon as={PlusIcon} size={16} />
            </Button>

            <Button
              className="w-full justify-start"
              onPress={handleSetGoal}
              variant="outline"
            >
              <Icon as={TrendingUpIcon} size={20} />
              <View className="flex-1 items-start">
                <Text className="font-semibold">Set a financial goal</Text>
                <Text className="text-muted-foreground" variant="small">
                  Define what you want to achieve
                </Text>
              </View>
              <Icon as={PlusIcon} size={16} />
            </Button>
          </CardContent>
        </Card>

        {/* Dashboard Preview */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Your Dashboard</CardTitle>
            <Text variant="muted">Everything in one place</Text>
          </CardHeader>
          <CardContent className="gap-4">
            <View className="flex-row items-center gap-3">
              <View className="h-3 w-3 rounded-full bg-primary" />
              <Text>Habit tracking with streak counters</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="h-3 w-3 rounded-full bg-primary" />
              <Text>Financial overview and spending trends</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="h-3 w-3 rounded-full bg-primary" />
              <Text>AI insights and recommendations</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="h-3 w-3 rounded-full bg-primary" />
              <Text>Goal progress and achievements</Text>
            </View>
          </CardContent>
        </Card>

        {/* Actions */}
        <View className="w-full gap-3">
          <Button className="w-full" onPress={handleGoToDashboard}>
            <Text>Take me to the dashboard</Text>
          </Button>

          <Button onPress={() => router.push("/dashboard")} variant="ghost">
            <Text>Skip tour and go to dashboard</Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
}
