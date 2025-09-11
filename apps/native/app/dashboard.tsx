import { router } from "expo-router";
import {
  BarChart3Icon,
  PlusIcon,
  TargetIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react-native";
import React from "react";
import { ScrollView, View } from "react-native";
import { Container } from "@/components/container";
import { QuickSummaryCard } from "@/components/dashboard/QuickSummaryCard";
import { TotalBalanceCard } from "@/components/dashboard/TotalBalanceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

export default function DashboardScreen() {
  const { updateDashboardData } = useDashboardStore();

  // Update dashboard data when component mounts
  React.useEffect(() => {
    updateDashboardData();
  }, [updateDashboardData]);

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

          {/* Top Section */}
          <TotalBalanceCard />
          <QuickSummaryCard />

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

          {/* Habits Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex-row items-center gap-2">
                <Icon as={TargetIcon} className="text-primary" size={20} />
                <Text>Habits</Text>
              </CardTitle>
              <Text variant="muted">
                Build better habits, track your progress
              </Text>
            </CardHeader>
            <CardContent>
              <View className="gap-4">
                <View className="grid grid-cols-2 gap-4">
                  <Button
                    className="h-20"
                    onPress={() => router.push("/habits")}
                    variant="outline"
                  >
                    <View className="items-center gap-2">
                      <Icon
                        as={TargetIcon}
                        className="text-primary"
                        size={24}
                      />
                      <Text className="font-medium">View Habits</Text>
                    </View>
                  </Button>
                  <Button
                    className="h-20"
                    onPress={() => router.push("/habits/add-habit")}
                    variant="outline"
                  >
                    <View className="items-center gap-2">
                      <Icon as={PlusIcon} className="text-primary" size={24} />
                      <Text className="font-medium">Add Habit</Text>
                    </View>
                  </Button>
                </View>
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

          {/* Finance Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex-row items-center gap-2">
                <Icon as={WalletIcon} className="text-primary" size={20} />
                <Text>Finance</Text>
              </CardTitle>
              <Text variant="muted">Manage your money and track expenses</Text>
            </CardHeader>
            <CardContent>
              <View className="gap-4">
                <View className="grid grid-cols-2 gap-4">
                  <Button
                    className="h-20"
                    onPress={() => router.push("/finance")}
                    variant="outline"
                  >
                    <View className="items-center gap-2">
                      <Icon
                        as={WalletIcon}
                        className="text-primary"
                        size={24}
                      />
                      <Text className="font-medium">View Finance</Text>
                    </View>
                  </Button>
                  <Button
                    className="h-20"
                    onPress={() => router.push("/finance/add-transaction")}
                    variant="outline"
                  >
                    <View className="items-center gap-2">
                      <Icon as={PlusIcon} className="text-primary" size={24} />
                      <Text className="font-medium">Add Transaction</Text>
                    </View>
                  </Button>
                </View>
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
