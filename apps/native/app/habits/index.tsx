import { router } from "expo-router";
import {
  CalendarIcon,
  CheckCircleIcon,
  FlameIcon,
  PlusIcon,
  TargetIcon,
  TrendingUpIcon,
  BarChart3Icon,
  BellIcon,
  LinkIcon,
  DownloadIcon,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";
import { HabitAnalytics } from "@/components/habits/HabitAnalytics";
import { HabitTemplates } from "@/components/habits/HabitTemplates";
import { HabitChallenges } from "@/components/habits/HabitChallenges";
import MotivationalQuote from "@/components/motivational-quote";
import { getRandomQuote } from "@/lib/motivational-quotes";

export default function HabitsScreen() {
  const { habits, getTodayHabits, getHabitStreaks, completeHabit, uncompleteHabit } = useDashboardStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());

  const todayHabits = getTodayHabits();
  const habitStreaks = getHabitStreaks();

  const getHabitIcon = (category: string) => {
    switch (category) {
      case "health":
        return TrendingUpIcon;
      case "productivity":
        return TargetIcon;
      case "learning":
        return CalendarIcon;
      default:
        return CheckCircleIcon;
    }
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-purple-600 dark:text-purple-400";
    if (streak >= 7) return "text-orange-600 dark:text-orange-400";
    return "text-green-600 dark:text-green-400";
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 30) return FlameIcon;
    if (streak >= 7) return TrendingUpIcon;
    return CheckCircleIcon;
  };

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View>
              <Text variant="h1">Habits</Text>
              <Text variant="muted">
                Build better habits, track your progress
              </Text>
            </View>
            <Button onPress={() => router.push("/habits/add-habit")} size="sm">
              <Icon as={PlusIcon} size={16} />
              <Text>Add</Text>
            </Button>
          </View>

          {/* Habits Tabs */}
          <Tabs
            className="flex-1"
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="streaks">Streaks</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
            </TabsList>
            
            {/* Advanced Features Tabs */}
            <TabsList className="grid w-full grid-cols-4 mt-2">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>

            <TabsContent className="flex-1" value="overview">
              <View className="gap-4">
                {/* Motivational Quote */}
                <MotivationalQuote
                  quote={currentQuote.quote}
                  author={currentQuote.author}
                  onRefresh={() => setCurrentQuote(getRandomQuote())}
                />

                {/* Quick Stats */}
                <View className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <View className="items-center gap-2">
                        <Icon
                          as={CheckCircleIcon}
                          className="text-green-500"
                          size={24}
                        />
                        <Text className="font-semibold">Active Habits</Text>
                        <Text className="font-bold text-green-600 text-lg">
                          {habits.length}
                        </Text>
                      </View>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <View className="items-center gap-2">
                        <Icon
                          as={FlameIcon}
                          className="text-orange-500"
                          size={24}
                        />
                        <Text className="font-semibold">Best Streak</Text>
                        <Text className="font-bold text-lg text-orange-600">
                          {Math.max(...habits.map((h) => h.currentStreak), 0)}
                        </Text>
                      </View>
                    </CardContent>
                  </Card>
                </View>

                {/* Today's Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {todayHabits.length > 0 ? (
                      <View className="gap-3">
                        {todayHabits.slice(0, 3).map((habit) => (
                          <View
                            className="flex-row items-center justify-between rounded-lg bg-background/50 p-3"
                            key={habit.id}
                          >
                            <View className="flex-row items-center gap-3">
                              <Icon
                                as={getHabitIcon(habit.category)}
                                className="text-primary"
                                size={20}
                              />
                              <View>
                                <Text className="font-medium">
                                  {habit.name}
                                </Text>
                                <Text
                                  className="text-muted-foreground"
                                  variant="small"
                                >
                                  {habit.frequency}
                                </Text>
                              </View>
                            </View>
                            <View className="items-end">
                              <Text
                                className={`font-semibold ${
                                  habit.completedToday
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {habit.completedToday ? "✓" : "○"}
                              </Text>
                              <Text
                                className="text-muted-foreground"
                                variant="small"
                              >
                                {habit.currentStreak} day streak
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    ) : (
                      <View className="items-center gap-4 py-8">
                        <Icon
                          as={TargetIcon}
                          className="text-muted-foreground"
                          size={48}
                        />
                        <View className="items-center gap-2">
                          <Text className="font-semibold">No habits yet</Text>
                          <Text className="text-center" variant="muted">
                            Create your first habit to get started
                          </Text>
                        </View>
                        <Button
                          onPress={() => router.push("/habits/add-habit")}
                        >
                          <Icon as={PlusIcon} size={16} />
                          <Text>Add Habit</Text>
                        </Button>
                      </View>
                    )}
                  </CardContent>
                </Card>
              </View>
            </TabsContent>

            <TabsContent className="flex-1" value="today">
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <Text variant="h3">Today's Habits</Text>
                  <Button
                    onPress={() => router.push("/habits/add-habit")}
                    size="sm"
                  >
                    <Icon as={PlusIcon} size={16} />
                    <Text>Add</Text>
                  </Button>
                </View>

                {todayHabits.length > 0 ? (
                  <View className="gap-3">
                    {todayHabits.map((habit) => (
                      <Card key={habit.id}>
                        <CardContent className="p-4">
                          <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-3">
                              <Icon
                                as={getHabitIcon(habit.category)}
                                className="text-primary"
                                size={24}
                              />
                              <View className="flex-1">
                                <Text className="font-semibold">
                                  {habit.name}
                                </Text>
                                <Text
                                  className="text-muted-foreground"
                                  variant="small"
                                >
                                  {habit.description}
                                </Text>
                              </View>
                            </View>
                            <Button
                              onPress={() => {
                                if (habit.completedToday) {
                                  uncompleteHabit(habit.id);
                                } else {
                                  completeHabit(habit.id);
                                }
                              }}
                              size="sm"
                              variant={
                                habit.completedToday ? "default" : "outline"
                              }
                            >
                              <Icon
                                as={CheckCircleIcon}
                                size={16}
                              />
                              <Text>
                                {habit.completedToday ? "Done" : "Mark Done"}
                              </Text>
                            </Button>
                          </View>
                        </CardContent>
                      </Card>
                    ))}
                  </View>
                ) : (
                  <Card>
                    <CardContent>
                      <View className="items-center gap-4 py-8">
                        <Icon
                          as={CalendarIcon}
                          className="text-muted-foreground"
                          size={48}
                        />
                        <View className="items-center gap-2">
                          <Text className="font-semibold">
                            No habits for today
                          </Text>
                          <Text className="text-center" variant="muted">
                            Create habits to track your daily progress
                          </Text>
                        </View>
                        <Button
                          onPress={() => router.push("/habits/add-habit")}
                        >
                          <Icon as={PlusIcon} size={16} />
                          <Text>Add Habit</Text>
                        </Button>
                      </View>
                    </CardContent>
                  </Card>
                )}
              </View>
            </TabsContent>

            <TabsContent className="flex-1" value="streaks">
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <Text variant="h3">Streak Leaders</Text>
                  <Button
                    onPress={() => router.push("/habits/add-habit")}
                    size="sm"
                  >
                    <Icon as={PlusIcon} size={16} />
                    <Text>Add</Text>
                  </Button>
                </View>

                {habitStreaks.length > 0 ? (
                  <View className="gap-3">
                    {habitStreaks
                      .sort((a, b) => b.currentStreak - a.currentStreak)
                      .map((habit) => (
                        <Card key={habit.id}>
                          <CardContent className="p-4">
                            <View className="flex-row items-center justify-between">
                              <View className="flex-row items-center gap-3">
                                <Icon
                                  as={getStreakIcon(habit.currentStreak)}
                                  className={getStreakColor(
                                    habit.currentStreak
                                  )}
                                  size={24}
                                />
                                <View className="flex-1">
                                  <Text className="font-semibold">
                                    {habit.name}
                                  </Text>
                                  <Text
                                    className="text-muted-foreground"
                                    variant="small"
                                  >
                                    {habit.category} • {habit.frequency}
                                  </Text>
                                </View>
                              </View>
                              <View className="items-end">
                                <Text
                                  className={`font-bold text-lg ${getStreakColor(
                                    habit.currentStreak
                                  )}`}
                                >
                                  {habit.currentStreak}
                                </Text>
                                <Text
                                  className="text-muted-foreground"
                                  variant="small"
                                >
                                  day streak
                                </Text>
                              </View>
                            </View>
                          </CardContent>
                        </Card>
                      ))}
                  </View>
                ) : (
                  <Card>
                    <CardContent>
                      <View className="items-center gap-4 py-8">
                        <Icon
                          as={FlameIcon}
                          className="text-muted-foreground"
                          size={48}
                        />
                        <View className="items-center gap-2">
                          <Text className="font-semibold">No streaks yet</Text>
                          <Text className="text-center" variant="muted">
                            Start building habits to create streaks
                          </Text>
                        </View>
                        <Button
                          onPress={() => router.push("/habits/add-habit")}
                        >
                          <Icon as={PlusIcon} size={16} />
                          <Text>Add Habit</Text>
                        </Button>
                      </View>
                    </CardContent>
                  </Card>
                )}
              </View>
            </TabsContent>

            <TabsContent className="flex-1" value="goals">
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <Text variant="h3">Habit Goals</Text>
                  <Button
                    onPress={() => router.push("/habits/add-habit")}
                    size="sm"
                  >
                    <Icon as={PlusIcon} size={16} />
                    <Text>Add</Text>
                  </Button>
                </View>

                {habits.length > 0 ? (
                  <View className="gap-3">
                    {habits.map((habit) => {
                      const progress =
                        (habit.currentStreak / habit.targetStreak) * 100;
                      const isCompleted =
                        habit.currentStreak >= habit.targetStreak;

                      return (
                        <Card key={habit.id}>
                          <CardContent className="p-4">
                            <View className="gap-3">
                              <View className="flex-row items-center justify-between">
                                <Text className="font-semibold">
                                  {habit.name}
                                </Text>
                                <Text
                                  className={`font-semibold ${
                                    isCompleted
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-blue-600 dark:text-blue-400"
                                  }`}
                                >
                                  {habit.currentStreak} / {habit.targetStreak}
                                </Text>
                              </View>

                              <View className="gap-2">
                                <View className="flex-row items-center justify-between">
                                  <Text
                                    className="text-muted-foreground"
                                    variant="small"
                                  >
                                    {progress.toFixed(0)}% complete
                                  </Text>
                                  <Text
                                    className="text-muted-foreground"
                                    variant="small"
                                  >
                                    {habit.frequency}
                                  </Text>
                                </View>

                                <View className="h-2 rounded-full bg-muted">
                                  <View
                                    className={`h-2 rounded-full ${
                                      isCompleted
                                        ? "bg-green-500"
                                        : progress > 80
                                          ? "bg-orange-500"
                                          : "bg-blue-500"
                                    }`}
                                    style={{
                                      width: `${Math.min(progress, 100)}%`,
                                    }}
                                  />
                                </View>
                              </View>
                            </View>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </View>
                ) : (
                  <Card>
                    <CardContent>
                      <View className="items-center gap-4 py-8">
                        <Icon
                          as={TargetIcon}
                          className="text-muted-foreground"
                          size={48}
                        />
                        <View className="items-center gap-2">
                          <Text className="font-semibold">No goals set</Text>
                          <Text className="text-center" variant="muted">
                            Create habits with goals to track progress
                          </Text>
                        </View>
                        <Button
                          onPress={() => router.push("/habits/add-habit")}
                        >
                          <Icon as={PlusIcon} size={16} />
                          <Text>Add Habit</Text>
                        </Button>
                      </View>
                    </CardContent>
                  </Card>
                )}
              </View>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent className="flex-1" value="analytics">
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <Text variant="h3">Habit Analytics</Text>
                  <Button
                    onPress={() => router.push("/habits/analytics")}
                    size="sm"
                  >
                    <Text>View All</Text>
                  </Button>
                </View>
                
                {habits.length > 0 ? (
                  <View className="gap-3">
                    {habits.slice(0, 2).map((habit) => (
                      <Card key={habit.id}>
                        <CardContent className="p-4">
                          <View className="gap-3">
                            <View className="flex-row items-center gap-3">
                              <Icon
                                as={getHabitIcon(habit.category)}
                                className="text-primary"
                                size={20}
                              />
                              <View className="flex-1">
                                <Text className="font-semibold">{habit.name}</Text>
                                <Text className="text-muted-foreground" variant="small">
                                  {habit.category} • {habit.frequency}
                                </Text>
                              </View>
                            </View>
                            <HabitAnalytics habitId={habit.id} />
                          </View>
                        </CardContent>
                      </Card>
                    ))}
                  </View>
                ) : (
                  <Card>
                    <CardContent className="p-8">
                      <View className="items-center gap-4">
                        <Icon
                          as={BarChart3Icon}
                          className="text-muted-foreground"
                          size={48}
                        />
                        <View className="items-center gap-2">
                          <Text className="font-semibold">No analytics yet</Text>
                          <Text className="text-center" variant="muted">
                            Create habits to see detailed analytics
                          </Text>
                        </View>
                        <Button
                          onPress={() => router.push("/habits/add-habit")}
                        >
                          <Text>Create Habit</Text>
                        </Button>
                      </View>
                    </CardContent>
                  </Card>
                )}
              </View>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent className="flex-1" value="templates">
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <Text variant="h3">Habit Templates</Text>
                  <Button
                    onPress={() => router.push("/habits/templates")}
                    size="sm"
                  >
                    <Text>View All</Text>
                  </Button>
                </View>
                <HabitTemplates />
              </View>
            </TabsContent>

            {/* Challenges Tab */}
            <TabsContent className="flex-1" value="challenges">
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <Text variant="h3">Habit Challenges</Text>
                  <Button
                    onPress={() => router.push("/habits/challenges")}
                    size="sm"
                  >
                    <Text>View All</Text>
                  </Button>
                </View>
                <HabitChallenges />
              </View>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent className="flex-1" value="tools">
              <View className="gap-4">
                <View className="gap-2">
                  <Text variant="h3">Habit Tools</Text>
                  <Text variant="muted">
                    Advanced tools to enhance your habit tracking experience
                  </Text>
                </View>

                {/* Tools Grid */}
                <View className="grid grid-cols-2 gap-4">
                  <Card onPress={() => router.push("/habits/reminders")}>
                    <CardContent className="p-4">
                      <View className="items-center gap-3">
                        <Icon
                          as={BellIcon}
                          className="text-blue-500"
                          size={32}
                        />
                        <View className="items-center gap-1">
                          <Text className="font-semibold">Reminders</Text>
                          <Text className="text-center" variant="small">
                            Set up notifications
                          </Text>
                        </View>
                      </View>
                    </CardContent>
                  </Card>

                  <Card onPress={() => router.push("/habits/calendar")}>
                    <CardContent className="p-4">
                      <View className="items-center gap-3">
                        <Icon
                          as={CalendarIcon}
                          className="text-green-500"
                          size={32}
                        />
                        <View className="items-center gap-1">
                          <Text className="font-semibold">Calendar</Text>
                          <Text className="text-center" variant="small">
                            Visual progress tracking
                          </Text>
                        </View>
                      </View>
                    </CardContent>
                  </Card>

                  <Card onPress={() => router.push("/habits/chains")}>
                    <CardContent className="p-4">
                      <View className="items-center gap-3">
                        <Icon
                          as={LinkIcon}
                          className="text-purple-500"
                          size={32}
                        />
                        <View className="items-center gap-1">
                          <Text className="font-semibold">Chains</Text>
                          <Text className="text-center" variant="small">
                            Link related habits
                          </Text>
                        </View>
                      </View>
                    </CardContent>
                  </Card>

                  <Card onPress={() => router.push("/habits/export")}>
                    <CardContent className="p-4">
                      <View className="items-center gap-3">
                        <Icon
                          as={DownloadIcon}
                          className="text-orange-500"
                          size={32}
                        />
                        <View className="items-center gap-1">
                          <Text className="font-semibold">Export</Text>
                          <Text className="text-center" variant="small">
                            Backup your data
                          </Text>
                        </View>
                      </View>
                    </CardContent>
                  </Card>
                </View>
              </View>
            </TabsContent>

          </Tabs>
        </View>
      </ScrollView>
    </Container>
  );
}
