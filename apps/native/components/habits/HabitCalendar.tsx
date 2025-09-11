import { CalendarIcon, CheckCircleIcon, ClockIcon, XIcon } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

type CalendarView = "month" | "week" | "day";

type HabitCalendarProps = {
  habitId?: string; // If provided, show only this habit
};

export function HabitCalendar({ habitId }: HabitCalendarProps) {
  const { habits } = useDashboardStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>("month");

  const filteredHabits = habitId 
    ? habits.filter(h => h.id === habitId)
    : habits;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return {
      daysInMonth,
      startingDayOfWeek,
      firstDay,
      lastDay,
    };
  };

  const getHabitCompletionForDate = (habit: any, date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return habit.completionHistory.includes(dateString);
  };

  const getCompletionStatsForMonth = () => {
    const { daysInMonth, firstDay } = getDaysInMonth(currentDate);
    const stats = {
      totalPossible: filteredHabits.length * daysInMonth,
      totalCompleted: 0,
      completionRate: 0,
    };

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(firstDay.getFullYear(), firstDay.getMonth(), day);
      const completedToday = filteredHabits.filter(habit => 
        getHabitCompletionForDate(habit, date)
      ).length;
      stats.totalCompleted += completedToday;
    }

    stats.completionRate = stats.totalPossible > 0 
      ? (stats.totalCompleted / stats.totalPossible) * 100 
      : 0;

    return stats;
  };

  const renderMonthView = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <View key={`empty-${i}`} className="h-10 w-10" />
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const completedHabits = filteredHabits.filter(habit => 
        getHabitCompletionForDate(habit, date)
      );
      const completionRate = filteredHabits.length > 0 
        ? completedHabits.length / filteredHabits.length 
        : 0;

      days.push(
        <View
          key={day}
          className={`h-10 w-10 items-center justify-center rounded-lg ${
            completionRate === 1 
              ? "bg-green-500" 
              : completionRate > 0.5 
                ? "bg-orange-500" 
                : completionRate > 0 
                  ? "bg-red-500" 
                  : "bg-muted"
          }`}
        >
          <Text className={`text-xs font-medium ${
            completionRate > 0 ? "text-white" : "text-muted-foreground"
          }`}>
            {day}
          </Text>
        </View>
      );
    }

    return (
      <View className="gap-2">
        {/* Day headers */}
        <View className="flex-row justify-between">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <View key={index} className="h-8 w-10 items-center justify-center">
              <Text className="text-muted-foreground" variant="small">
                {day}
              </Text>
            </View>
          ))}
        </View>
        
        {/* Calendar grid */}
        <View className="flex-row flex-wrap gap-1">
          {days}
        </View>
      </View>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      const completedHabits = filteredHabits.filter(habit => 
        getHabitCompletionForDate(habit, date)
      );
      const completionRate = filteredHabits.length > 0 
        ? completedHabits.length / filteredHabits.length 
        : 0;

      weekDays.push(
        <View key={i} className="flex-1 items-center gap-2">
          <Text className="text-muted-foreground" variant="small">
            {date.toLocaleDateString('en-US', { weekday: 'short' })}
          </Text>
          <View className={`h-12 w-12 items-center justify-center rounded-lg ${
            completionRate === 1 
              ? "bg-green-500" 
              : completionRate > 0.5 
                ? "bg-orange-500" 
                : completionRate > 0 
                  ? "bg-red-500" 
                  : "bg-muted"
          }`}>
            <Text className={`font-medium ${
              completionRate > 0 ? "text-white" : "text-muted-foreground"
            }`}>
              {date.getDate()}
            </Text>
          </View>
          <Text className="text-center" variant="small">
            {completedHabits.length}/{filteredHabits.length}
          </Text>
        </View>
      );
    }

    return (
      <View className="flex-row justify-between">
        {weekDays}
      </View>
    );
  };

  const renderDayView = () => {
    const completedHabits = filteredHabits.filter(habit => 
      getHabitCompletionForDate(habit, currentDate)
    );

    return (
      <View className="gap-3">
        <View className="items-center gap-2">
          <Text className="font-semibold">
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
          <Text className="text-muted-foreground">
            {completedHabits.length} of {filteredHabits.length} habits completed
          </Text>
        </View>

        <View className="gap-2">
          {filteredHabits.map(habit => {
            const isCompleted = getHabitCompletionForDate(habit, currentDate);
            return (
              <View
                key={habit.id}
                className={`flex-row items-center gap-3 rounded-lg p-3 ${
                  isCompleted ? "bg-green-50 dark:bg-green-900/20" : "bg-muted/50"
                }`}
              >
                <Icon
                  as={isCompleted ? CheckCircleIcon : XIcon}
                  className={isCompleted ? "text-green-500" : "text-muted-foreground"}
                  size={20}
                />
                <View className="flex-1">
                  <Text className="font-medium">{habit.name}</Text>
                  <Text className="text-muted-foreground" variant="small">
                    {habit.category} • {habit.frequency}
                  </Text>
                </View>
                <Text className={`font-semibold ${
                  isCompleted ? "text-green-600" : "text-muted-foreground"
                }`}>
                  {isCompleted ? "✓" : "○"}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const stats = getCompletionStatsForMonth();

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
      <View className="gap-4">
        <View className="gap-2">
          <Text variant="h2">Habit Calendar</Text>
          <Text variant="muted">
            Track your habit completion over time
          </Text>
        </View>

        {/* View Controls */}
        <Card>
          <CardContent className="p-4">
            <View className="flex-row gap-2">
              <Button
                onPress={() => setView("month")}
                size="sm"
                variant={view === "month" ? "default" : "outline"}
              >
                <Text>Month</Text>
              </Button>
              <Button
                onPress={() => setView("week")}
                size="sm"
                variant={view === "week" ? "default" : "outline"}
              >
                <Text>Week</Text>
              </Button>
              <Button
                onPress={() => setView("day")}
                size="sm"
                variant={view === "day" ? "default" : "outline"}
              >
                <Text>Day</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="font-medium">Completion Rate</Text>
                <Text className="font-bold text-blue-600">
                  {stats.completionRate.toFixed(1)}%
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="font-medium">Total Completions</Text>
                <Text className="font-bold text-green-600">
                  {stats.totalCompleted}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="font-medium">Possible Completions</Text>
                <Text className="font-bold text-muted-foreground">
                  {stats.totalPossible}
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>
              {view === "month" && "Monthly View"}
              {view === "week" && "Weekly View"}
              {view === "day" && "Daily View"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {view === "month" && renderMonthView()}
            {view === "week" && renderWeekView()}
            {view === "day" && renderDayView()}
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <View className="gap-2">
              <Text className="font-medium">Legend</Text>
              <View className="flex-row items-center gap-2">
                <View className="h-4 w-4 rounded bg-green-500" />
                <Text className="text-muted-foreground" variant="small">
                  All habits completed
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="h-4 w-4 rounded bg-orange-500" />
                <Text className="text-muted-foreground" variant="small">
                  Some habits completed
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="h-4 w-4 rounded bg-red-500" />
                <Text className="text-muted-foreground" variant="small">
                  Few habits completed
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="h-4 w-4 rounded bg-muted" />
                <Text className="text-muted-foreground" variant="small">
                  No habits completed
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
