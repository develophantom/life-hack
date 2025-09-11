import { router } from "expo-router";
import {
  BarChart3Icon,
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

export default function DashboardScreen() {
  const handleAddHabit = () => {
    // TODO: Navigate to add habit screen
    console.log("Add habit");
  };

  const handleLogExpense = () => {
    // TODO: Navigate to log expense screen
    console.log("Log expense");
  };

  const handleViewReports = () => {
    // TODO: Navigate to reports screen
    console.log("View reports");
  };

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text variant="h1">Welcome back!</Text>
            <Text variant="muted">Here's your personal dashboard</Text>
          </View>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="gap-3">
              <Button
                className="w-full justify-start"
                onPress={handleAddHabit}
                variant="outline"
              >
                <Icon as={TargetIcon} size={20} />
                <View className="flex-1 items-start">
                  <Text className="font-semibold">Add Habit</Text>
                  <Text className="text-muted-foreground" variant="small">
                    Track a new habit
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
                  <Text className="font-semibold">Log Expense</Text>
                  <Text className="text-muted-foreground" variant="small">
                    Record a transaction
                  </Text>
                </View>
                <Icon as={PlusIcon} size={16} />
              </Button>

              <Button
                className="w-full justify-start"
                onPress={handleViewReports}
                variant="outline"
              >
                <Icon as={BarChart3Icon} size={20} />
                <View className="flex-1 items-start">
                  <Text className="font-semibold">View Reports</Text>
                  <Text className="text-muted-foreground" variant="small">
                    See your progress
                  </Text>
                </View>
                <Icon as={TrendingUpIcon} size={16} />
              </Button>
            </CardContent>
          </Card>

          {/* Habit Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Habits</CardTitle>
              <Text variant="muted">Your habit tracking</Text>
            </CardHeader>
            <CardContent>
              <View className="items-center gap-4 py-8">
                <Icon
                  as={TargetIcon}
                  className="text-muted-foreground"
                  size={48}
                />
                <View className="items-center gap-2">
                  <Text className="font-semibold">No habits yet</Text>
                  <Text className="text-center" variant="muted">
                    Add your first habit to start tracking your progress
                  </Text>
                </View>
                <Button onPress={handleAddHabit}>
                  <Text>Add First Habit</Text>
                </Button>
              </View>
            </CardContent>
          </Card>

          {/* Financial Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Finances</CardTitle>
              <Text variant="muted">Your financial overview</Text>
            </CardHeader>
            <CardContent>
              <View className="items-center gap-4 py-8">
                <Icon
                  as={WalletIcon}
                  className="text-muted-foreground"
                  size={48}
                />
                <View className="items-center gap-2">
                  <Text className="font-semibold">No accounts yet</Text>
                  <Text className="text-center" variant="muted">
                    Add your first account to start tracking expenses
                  </Text>
                </View>
                <Button onPress={handleLogExpense}>
                  <Text>Add First Account</Text>
                </Button>
              </View>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <Text variant="muted">Personalized recommendations</Text>
            </CardHeader>
            <CardContent>
              <View className="items-center gap-4 py-8">
                <Icon
                  as={TrendingUpIcon}
                  className="text-muted-foreground"
                  size={48}
                />
                <View className="items-center gap-2">
                  <Text className="font-semibold">No insights yet</Text>
                  <Text className="text-center" variant="muted">
                    Start using the app to get personalized insights
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </Container>
  );
}
