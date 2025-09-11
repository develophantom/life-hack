import { BarChart3Icon, CalendarIcon, FlameIcon, TrendingUpIcon } from "lucide-react-native";
import React from "react";
import { ScrollView, View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

type HabitAnalyticsProps = {
  habitId: string;
};

export function HabitAnalytics({ habitId }: HabitAnalyticsProps) {
  const { getHabitAnalytics } = useDashboardStore();
  const analytics = getHabitAnalytics(habitId);

  if (!analytics) {
    return (
      <Card>
        <CardContent className="p-4">
          <Text className="text-center text-muted-foreground">
            No analytics data available
          </Text>
        </CardContent>
      </Card>
    );
  }

  const getCompletionRateColor = (rate: number) => {
    if (rate >= 80) return "text-green-600 dark:text-green-400";
    if (rate >= 60) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getCompletionRateMessage = (rate: number) => {
    if (rate >= 80) return "Excellent consistency!";
    if (rate >= 60) return "Good progress!";
    if (rate >= 40) return "Room for improvement";
    return "Let's get back on track!";
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
      <View className="gap-4">
        {/* Overview Stats */}
        <View className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <View className="items-center gap-2">
                <Icon
                  as={CheckCircleIcon}
                  className="text-green-500"
                  size={24}
                />
                <Text className="font-semibold">Total Completions</Text>
                <Text className="font-bold text-green-600 text-lg">
                  {analytics.totalCompletions}
                </Text>
              </View>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <View className="items-center gap-2">
                <Icon
                  as={BarChart3Icon}
                  className="text-blue-500"
                  size={24}
                />
                <Text className="font-semibold">Completion Rate</Text>
                <Text className={`font-bold text-lg ${getCompletionRateColor(analytics.completionRate)}`}>
                  {analytics.completionRate.toFixed(1)}%
                </Text>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Streak Stats */}
        <View className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <View className="items-center gap-2">
                <Icon
                  as={FlameIcon}
                  className="text-orange-500"
                  size={24}
                />
                <Text className="font-semibold">Current Streak</Text>
                <Text className="font-bold text-orange-600 text-lg">
                  {analytics.currentStreak}
                </Text>
              </View>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <View className="items-center gap-2">
                <Icon
                  as={TrendingUpIcon}
                  className="text-purple-500"
                  size={24}
                />
                <Text className="font-semibold">Longest Streak</Text>
                <Text className="font-bold text-purple-600 text-lg">
                  {analytics.longestStreak}
                </Text>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="gap-3">
              {analytics.weeklyProgress.map((day, index) => {
                const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                return (
                  <View key={index} className="flex-row items-center gap-3">
                    <Text className="w-8 text-muted-foreground" variant="small">
                      {dayNames[index]}
                    </Text>
                    <View className="flex-1 h-2 rounded-full bg-muted">
                      <View
                        className={`h-2 rounded-full ${
                          day ? "bg-green-500" : "bg-muted"
                        }`}
                        style={{ width: `${day * 100}%` }}
                      />
                    </View>
                    <Text className="text-muted-foreground" variant="small">
                      {day ? "✓" : "○"}
                    </Text>
                  </View>
                );
              })}
            </View>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="gap-3">
              <View className="flex-row items-start gap-3">
                <Icon
                  as={CalendarIcon}
                  className="text-blue-500 mt-1"
                  size={16}
                />
                <View className="flex-1">
                  <Text className="font-medium">Completion Rate</Text>
                  <Text className="text-muted-foreground" variant="small">
                    {getCompletionRateMessage(analytics.completionRate)}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start gap-3">
                <Icon
                  as={TrendingUpIcon}
                  className="text-green-500 mt-1"
                  size={16}
                />
                <View className="flex-1">
                  <Text className="font-medium">Average Streak</Text>
                  <Text className="text-muted-foreground" variant="small">
                    {analytics.averageStreak.toFixed(1)} days on average
                  </Text>
                </View>
              </View>

              {analytics.currentStreak > 0 && (
                <View className="flex-row items-start gap-3">
                  <Icon
                    as={FlameIcon}
                    className="text-orange-500 mt-1"
                    size={16}
                  />
                  <View className="flex-1">
                    <Text className="font-medium">Current Momentum</Text>
                    <Text className="text-muted-foreground" variant="small">
                      Keep going! You're on a {analytics.currentStreak}-day streak
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
