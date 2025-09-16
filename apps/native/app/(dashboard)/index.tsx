import { router } from "expo-router";
import {
   CalendarIcon,
   CheckCircleIcon,
   TargetIcon,
   ActivityIcon,
   MoonIcon,
   WalletIcon,
} from "lucide-react-native";
import React, { useRef } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { BottomSheet, BottomSheetRef } from "@/components/bottom-sheet";
import { SavingsOverViewCard } from "@/components/dashboard/SavingOverViewCard";
import { HabitHeatMap } from "@/components/dashboard/HabitHeatMap";
import { Fab } from "@/components/ui/fab";
import { Modal } from "@/components/ui/modal";
import { useDashboardStore } from "@/lib/dashboard-store";
import { fontStyles } from "@/lib/fonts";

export default function DashboardScreen() {
   const { dashboardData, updateDashboardData, getTodayHabits } = useDashboardStore();
   const [showModal, setShowModal] = React.useState(false);


   // Update dashboard data when component mounts
   React.useEffect(() => {
      updateDashboardData();
   }, [updateDashboardData]);
   const today = new Date();
   const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'short' });
   const monthDay = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
   const year = today.getFullYear();

   // Generate proper week dates starting from Monday
   const getWeekDates = () => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust to get Monday

      const weekDates = [];
      for (let i = 0; i < 7; i++) {
         const date = new Date(today);
         date.setDate(today.getDate() + mondayOffset + i);
         weekDates.push(date);
      }
      return weekDates;
   };

   const weekDates = getWeekDates();
   const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

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
      <View className="flex-1 bg-foreground">
         {/* Header Section - Dark Background */}
         <View className="px-6 pt-12 pb-8">
            {/* Day and Date */}
            <View className="flex-row items-center justify-between mb-6">
               <View className="flex-row items-baseline gap-2">
                  <Text style={fontStyles.black} className="text-background text-4xl">{dayOfWeek}</Text>
                  <View className="w-5 h-5 bg-red-500 rounded-full mt-1" />
               </View>
               <View className="items-end" >
                  <Text style={fontStyles.black} className="text-white text-lg">{monthDay}</Text>
                  <Text style={fontStyles.black} className="text-white text-sm opacity-70">{year}</Text>
               </View>
            </View>

            {/* Personalized Greeting */}
            <Text className="text-muted-foreground text-5xl mb-6" style={fontStyles.black}>
               {getGreeting()}, {dashboardData.userName}.
            </Text>

            {/* Daily Summary */}
            <View className="mb-6">
               <Text className="text-white text-2xl mb-2" style={fontStyles.bold} >
                  You have{" "}
                  <Icon as={CalendarIcon} className="text-white inline" size={16} />
                  {" "}{dashboardData.totalMeetings} meetings,{" "}
                  <Icon as={CheckCircleIcon} className="text-white inline" size={16} />
                  {" "}{dashboardData.totalTasks} tasks and{" "}
                  <Icon as={TargetIcon} className="text-white inline" size={16} />
                  {" "}{totalHabits} habit{totalHabits !== 1 ? 's' : ''} today.
               </Text>
               <Text className="text-muted-foreground text-lg opacity-80" style={fontStyles.regular} >
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

         {/* Scrollable Content */}
         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

            {/* Quick Actions Section */}
            <View className="px-6 mb-6">
               <View className="flex-row gap-3">
                  <Button
                     className="flex-1 bg-muted-foreground"
                     onPress={() => router.push("/habits/add-habit")}
                  >
                     <Icon as={TargetIcon} size={20} className="text-background" />
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

            {/* Habit Heat Map */}
            <HabitHeatMap onPress={() => router.push("/habits")} />

            {/* Financial Progress Card */}
            <SavingsOverViewCard
               title="Savings Goal"
               statusMessage="You are on track to reach your emergency fund goal in 3 months."
               percentage={71}
               trend={8.5}
               trendText="this month"
               tags={['Savings', 'Emergency Fund', 'Financial Security']}
               amount="$7,100"
               targetAmount="$10,000"
               onPress={() => router.push("/finance")}
            />
         </ScrollView>

         {/* Modal for Calendar and Events */}
         <Modal
            visible={showModal}
            onClose={() => setShowModal(false)}
            title="Today's Schedule"
            description=""
            actionText="Done"
            onAction={() => setShowModal(false)}
         >
            <View className="px-2">
               <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-lg font-semibold text-black">Today's Schedule</Text>
                  <Button
                     variant="outline"
                     size="sm"
                     onPress={() => setShowModal(false)}
                     className="bg-gray-100 border-gray-200"
                  >
                     <Text className="text-black text-sm">View All</Text>
                  </Button>
               </View>

               <View className="flex-row justify-between mb-4">
                  {weekDates.map((date, index) => {
                     const isToday = date.toDateString() === today.toDateString();
                     const dayNumber = date.getDate();
                     const dayName = dayNames[index];

                     return (
                        <View key={`${date.getFullYear()}-${date.getMonth()}-${dayNumber}`} className={`items-center p-2 rounded-lg ${isToday ? 'bg-gray-100 border border-gray-300' : ''}`}>
                           <Text className={`text-lg font-bold ${isToday ? 'text-black' : 'text-gray-400'}`}>
                              {dayNumber}
                           </Text>
                           <Text className={`text-xs ${isToday ? 'text-red-500' : 'text-gray-400'}`}>
                              {dayName}
                           </Text>
                        </View>
                     );
                  })}
               </View>

               <View className="space-y-3 pb-4">
                  {dashboardData.todayEvents.map((event) => (
                     <View key={event.id} className="flex-row items-center gap-3">
                        <View className={`w-2 h-2 rounded-full ${getEventColor(event.color)}`} />
                        <Text className="flex-1 font-medium text-black">{event.title}</Text>
                        {event.time && (
                           <Text className="text-gray-500 text-sm">{event.time}</Text>
                        )}
                     </View>
                  ))}
               </View>
            </View>
         </Modal>

         {/* Floating Action Button */}
         <Fab
            onPress={() => setShowModal(true)}
            icon={TargetIcon}
            variant="primary"
            size="lg"
            position="bottom-right"
         />
      </View >
   );
}


