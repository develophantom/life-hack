import { router } from "expo-router";
import {
  CalendarIcon,
  CheckCircleIcon,
  TargetIcon,
  ActivityIcon,
  MoonIcon,
  PlusIcon,
  WalletIcon,
} from "lucide-react-native";
import React from "react";
import { ScrollView, View } from "react-native";
import { Container } from "@/components/container";
import { MotivationalQuote } from "@/components/motivational-quote";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

export default function DashboardScreen() {
  const { dashboardData, updateDashboardData, getTodayHabits } = useDashboardStore();

  // Update dashboard data when component mounts
  React.useEffect(() => {
    updateDashboardData();
  }, [updateDashboardData]);

  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const year = today.getFullYear();

  const todayHabits = getTodayHabits();
  const completedHabits = todayHabits.filter(habit => habit.completedToday).length;
  const totalHabits = todayHabits.length;

  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getEventColor = (color?: string) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Container>
      <ScrollView className="flex-1 bg-background">
        <View className="flex-1">
          {/* Header Section - Dark Background */}
          <View className="bg-black px-6 pt-12 pb-8">
            {/* Day and Date */}
            <View className="flex-row items-center justify-between mb-6">
              <View>
                <Text className="text-white text-4xl font-bold">{dayOfWeek}</Text>
                <View className="w-3 h-3 bg-red-500 rounded-full mt-1" />
              </View>
              <View className="items-end">
                <Text className="text-white text-lg">{monthDay}</Text>
                <Text className="text-white text-sm opacity-70">{year}</Text>
              </View>
            </View>

            {/* Personalized Greeting */}
            <Text className="text-white text-xl mb-4">
              {getGreeting()}, {dashboardData.userName}.
            </Text>

            {/* Daily Summary */}
            <View className="mb-6">
              <Text className="text-white text-base mb-2">
                You have{" "}
                <Icon as={CalendarIcon} className="text-white inline" size={16} />
                {" "}{dashboardData.totalMeetings} meetings,{" "}
                <Icon as={CheckCircleIcon} className="text-white inline" size={16} />
                {" "}{dashboardData.totalTasks} tasks and{" "}
                <Icon as={TargetIcon} className="text-white inline" size={16} />
                {" "}{totalHabits} habit{totalHabits !== 1 ? 's' : ''} today.
              </Text>
              <Text className="text-white text-sm opacity-80">
                {dashboardData.availabilityStatus}
              </Text>
            </View>

            {/* Activity Metrics */}
            <View className="flex-row gap-6">
              <View className="flex-row items-center gap-2">
                <Icon as={ActivityIcon} className="text-white" size={20} />
                <Text className="text-white font-semibold">
                  {Math.floor(dashboardData.dailyMetrics.steps / 1000)}.{(dashboardData.dailyMetrics.steps % 1000) / 100}K steps
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Icon as={MoonIcon} className="text-white" size={20} />
                <Text className="text-white font-semibold">
                  {dashboardData.dailyMetrics.sleepHours} hours
                </Text>
              </View>
            </View>
          </View>

          {/* Calendar and Events Section - Light Background Card */}
          <Card className="mx-4 -mt-4 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              {/* Calendar Header */}
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-semibold">Today's Schedule</Text>
                <Button variant="outline" size="sm">
                  <Text>View All</Text>
                </Button>
              </View>

              {/* Weekly Calendar */}
              <View className="flex-row justify-between mb-4">
                {['9', '10', '11', '12', '13', '14', '15'].map((day, index) => {
                  const isToday = index === 0;
                  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
                  return (
                    <View key={day} className={`items-center p-2 rounded-lg ${isToday ? 'bg-gray-100' : ''}`}>
                      <Text className={`text-lg font-bold ${isToday ? 'text-black' : 'text-gray-400'}`}>
                        {day}
                      </Text>
                      <Text className={`text-xs ${isToday ? 'text-red-500' : 'text-gray-400'}`}>
                        {dayNames[index]}
                      </Text>
                    </View>
                  );
                })}
              </View>

              {/* Events List */}
              <View className="space-y-3">
                {dashboardData.todayEvents.map((event) => (
                  <View key={event.id} className="flex-row items-center gap-3">
                    <View className={`w-2 h-2 rounded-full ${getEventColor(event.color)}`} />
                    <Text className="flex-1 font-medium">{event.title}</Text>
                    {event.time && (
                      <Text className="text-gray-500 text-sm">{event.time}</Text>
                    )}
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>

          {/* Motivational Quote */}
          <MotivationalQuote />

          {/* Quick Actions Section */}
          <View className="px-6 mb-6">
            <View className="flex-row gap-3">
              <Button
                className="flex-1"
                onPress={() => router.push("/habits/add-habit")}
              >
                <Icon as={TargetIcon} size={20} />
                <Text className="ml-2">Add Habit</Text>
              </Button>
              
              <Button
                className="flex-1"
                variant="outline"
                onPress={() => router.push("/finance/add-transaction")}
              >
                <Icon as={WalletIcon} size={20} />
                <Text className="ml-2">Add Transaction</Text>
              </Button>
            </View>
          </View>

          {/* Today's Habits Summary */}
          {totalHabits > 0 && (
            <View className="px-6 mb-6">
              <Card>
                <CardContent className="p-4">
                  <View className="flex-row items-center justify-between mb-3">
                    <Text className="font-semibold">Today's Habits</Text>
                    <Text className="text-sm text-gray-500">
                      {completedHabits}/{totalHabits} completed
                    </Text>
                  </View>
                  
                  <View className="space-y-2">
                    {todayHabits.slice(0, 3).map((habit) => (
                      <View key={habit.id} className="flex-row items-center gap-3">
                        <View className={`w-4 h-4 rounded border-2 ${habit.completedToday ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                          {habit.completedToday && (
                            <Icon as={CheckCircleIcon} className="text-white" size={12} />
                          )}
                        </View>
                        <Text className="flex-1">{habit.name}</Text>
                        <Text className="text-sm text-gray-500">
                          {habit.currentStreak} day streak
                        </Text>
                      </View>
                    ))}
                  </View>
                  
                  {totalHabits > 3 && (
                    <Button
                      variant="outline"
                      className="mt-3"
                      onPress={() => router.push("/habits")}
                    >
                      <Text>View All Habits</Text>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </View>
          )}

          {/* Financial Summary */}
          <View className="px-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="font-semibold">Financial Overview</Text>
                  <Text className="text-sm text-gray-500">
                    Total: ${dashboardData.totalBalance.toFixed(2)}
                  </Text>
                </View>
                
                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500">This Week</Text>
                    <Text className={`font-semibold ${dashboardData.balanceTrend.weekly >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {dashboardData.balanceTrend.weekly >= 0 ? '+' : ''}{dashboardData.balanceTrend.weekly.toFixed(1)}%
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500">This Month</Text>
                    <Text className={`font-semibold ${dashboardData.balanceTrend.monthly >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {dashboardData.balanceTrend.monthly >= 0 ? '+' : ''}{dashboardData.balanceTrend.monthly.toFixed(1)}%
                    </Text>
                  </View>
                </View>
                
                <Button
                  variant="outline"
                  className="mt-3"
                  onPress={() => router.push("/finance")}
                >
                  <Text>View Finance Details</Text>
                </Button>
              </CardContent>
            </Card>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
