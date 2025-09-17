import { router } from "expo-router";
import {
   CalendarIcon,
   CheckCircleIcon,
   TargetIcon,
   ActivityIcon,
   MoonIcon,
   WalletIcon,
   TrendingUpIcon,
   TrendingDownIcon,
} from "lucide-react-native";
import React, { useRef } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
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
   const { dashboardData, updateDashboardData, getTodayHabits, getTotalBalance, getRecentTransactions, budgetCategories } = useDashboardStore();
   const [showModal, setShowModal] = React.useState(false);
   const [showFinancialData, setShowFinancialData] = React.useState(true);


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
      <View className="flex-1 bg-background">
         {/* Header Section - Dark Background */}
         <View className="px-6 pt-12 pb-8">
            {/* Day and Date */}
            <View className="flex-row items-center justify-between mb-6">
               <View className="flex-row items-baseline gap-2">
                  <Text style={fontStyles.black} className="text-foreground text-4xl">{dayOfWeek}</Text>
                  <View className="w-5 h-5 bg-destructive rounded-full mt-1" />
               </View>
               <View className="items-end" >
                  <Text style={fontStyles.black} className="text-foreground text-lg">{monthDay}</Text>
                  <Text style={fontStyles.black} className="text-foreground text-sm opacity-70">{year}</Text>
               </View>
            </View>

            {/* Personalized Greeting */}
            <Text className="text-muted-foreground text-5xl mb-6" style={fontStyles.black}>
               {getGreeting()}, {dashboardData.userName}.
            </Text>

            {/* Daily Summary */}
            <View className="mb-6">
               <View className="flex-row flex-wrap items-center mb-2">
                  <Text className="text-foreground text-2xl" style={fontStyles.bold}>
                     Today you have{" "}
                  </Text>
                  <View className="flex-row items-center mx-1">
                     <Icon as={CalendarIcon} className="text-foreground" size={16} />
                     <Text className="text-foreground text-2xl ml-1" style={fontStyles.bold}>
                        {dashboardData.totalMeetings}
                     </Text>
                  </View>
                  <Text className="text-foreground text-2xl" style={fontStyles.bold}>
                     {" "}meetings,{" "}
                  </Text>
                  <View className="flex-row items-center mx-1">
                     <Icon as={CheckCircleIcon} className="text-foreground" size={16} />
                     <Text className="text-foreground text-2xl ml-1" style={fontStyles.bold}>
                        {dashboardData.totalTasks}
                     </Text>
                  </View>
                  <Text className="text-foreground text-2xl" style={fontStyles.bold}>
                     {" "}tasks,{" "}
                  </Text>
                  <View className="flex-row items-center mx-1">
                     <Icon as={TargetIcon} className="text-foreground" size={16} />
                     <Text className="text-foreground text-2xl ml-1" style={fontStyles.bold}>
                        {totalHabits}
                     </Text>
                  </View>
                  <Text className="text-foreground text-2xl" style={fontStyles.bold}>
                     {" "}habit{totalHabits !== 1 ? 's' : ''}
                  </Text>
                  <Text className="text-foreground text-2xl" style={fontStyles.bold}>
                     {" "}and{" "}
                  </Text>
                  <View className="flex-row items-center mx-1">
                     <Icon as={WalletIcon} className="text-foreground" size={16} />
                     <TouchableOpacity
                        onPress={() => setShowFinancialData(!showFinancialData)}
                        className="ml-1"
                        activeOpacity={1}
                        style={{ opacity: 1 }}
                     >
                        <Text className="text-foreground text-2xl underline" style={fontStyles.bold}>
                           {showFinancialData ? `$${getTotalBalance().toFixed(2)}` : '$••••••'}
                        </Text>
                     </TouchableOpacity>
                  </View>
                  <Text className="text-foreground text-2xl" style={fontStyles.bold}>
                     {" "}available.
                  </Text>
               </View>
               <Text className="text-muted-foreground text-lg opacity-80" style={fontStyles.regular} >
                  {dashboardData.availabilityStatus}
               </Text>
            </View>


            {/* Activity Metrics */}
            <View className="flex-row gap-6 mb-4">
               <View className="flex-row items-center gap-2">
                  <Icon as={ActivityIcon} className="text-foreground" size={20} />
                  <Text className="text-foreground" style={fontStyles.bold}>
                     {Math.floor(dashboardData.dailyMetrics.steps / 1000)}.{(dashboardData.dailyMetrics.steps % 1000) / 100}K steps
                  </Text>
               </View>
               <View className="flex-row items-center gap-2">
                  <Icon as={MoonIcon} className="text-orange-500" size={20} />
                  <Text className="text-foreground" style={fontStyles.bold}>
                     {dashboardData.dailyMetrics.sleepHours} hours
                  </Text>
               </View>
            </View>

            {/* Financial Metrics */}
            {showFinancialData && (
               <View className="flex-row gap-6">
                  <View className="flex-row items-center gap-2">
                     <Icon as={TrendingUpIcon} className="text-green-500" size={20} />
                     <Text className="text-foreground" style={fontStyles.bold}>
                        {budgetCategories.filter(cat => cat.spent <= cat.budget).length}/{budgetCategories.length} budgets on track
                     </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                     <Icon as={WalletIcon} className="text-blue-500" size={20} />
                     <Text className="text-foreground" style={fontStyles.bold}>
                        {getRecentTransactions(5).filter(tx => tx.type === 'income').length} recent transactions
                     </Text>
                  </View>
               </View>
            )}
         </View>

         {/* Scrollable Content */}
         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

            {/* Quick Actions Section */}
            <View className="px-6 mb-6">
               <View className="flex-row gap-3">
                  <Button
                     className="flex-1 bg-primary"
                     onPress={() => router.push("/habits/add-habit")}
                  >
                     <Icon as={TargetIcon} size={20} className="text-primary-foreground" />
                     <Text className="ml-2 text-primary-foreground" style={fontStyles.bold}>Add Habit</Text>
                  </Button>

                  <Button
                     className="flex-1"
                     variant="outline"
                     onPress={() => router.push("/finance/add-transaction")}
                  >
                     <Icon as={WalletIcon} size={20} className="text-foreground" />
                     <Text className="ml-2 text-foreground" style={fontStyles.bold}>Add Transaction</Text>
                  </Button>
               </View>
            </View>

            {/* Today's Habits Summary */}
            {totalHabits > 0 && (
               <View className="px-6 mb-6">
                  <Card className="bg-card">
                     <CardContent className="p-4">
                        <View className="flex-row items-center justify-between mb-3">
                           <Text className="font-semibold text-card-foreground" style={fontStyles.bold}>Today's Habits</Text>
                           <Text className="text-sm text-muted-foreground" style={fontStyles.regular}>
                              {completedHabits}/{totalHabits} completed
                           </Text>
                        </View>

                        <View className="space-y-2">
                           {todayHabits.slice(0, 3).map((habit) => (
                              <View key={habit.id} className="flex-row items-center gap-3">
                                 <View className={`w-4 h-4 rounded border-2 ${habit.completedToday ? 'bg-green-500 border-green-500' : 'border-muted-foreground'}`}>
                                    {habit.completedToday && (
                                       <Icon as={CheckCircleIcon} className="text-white" size={12} />
                                    )}
                                 </View>
                                 <Text className="flex-1 text-card-foreground" style={fontStyles.regular}>{habit.name}</Text>
                                 <Text className="text-sm text-muted-foreground" style={fontStyles.regular}>
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
                              <Text className="text-foreground" style={fontStyles.bold}>View All Habits</Text>
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
            description="Your weekly schedule reflects your habits and events."
            actionText="Done"
            onAction={() => setShowModal(false)}
         >
            <View>
               <View className="flex-row items-center justify-end mb-4">
                  <Button
                     variant="outline"
                     size="sm"
                     onPress={() => setShowModal(false)}
                     className="bg-muted border-border"
                  >
                     <Text className="text-sm text-foreground" style={fontStyles.bold}>View All</Text>
                  </Button>
               </View>

               <View className="flex-row justify-between mb-4">
                  {weekDates.map((date, index) => {
                     const isToday = date.toDateString() === today.toDateString();
                     const dayNumber = date.getDate();
                     const dayName = dayNames[index];

                     return (
                        <View key={`${date.getFullYear()}-${date.getMonth()}-${dayNumber}`} className={`items-center p-2 rounded-lg ${isToday ? 'bg-muted border border-border' : ''}`}>
                           <Text className={`text-lg ${isToday ? 'text-foreground' : 'text-muted-foreground'}`} style={fontStyles.bold}>
                              {dayNumber}
                           </Text>
                           <Text className={`text-xs ${isToday ? 'text-destructive' : 'text-muted-foreground'}`} style={fontStyles.regular}>
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
                        <Text style={fontStyles.bold} className="flex-1 text-foreground">{event.title}</Text>
                        {event.time && (
                           <Text style={fontStyles.regular} className="text-muted-foreground text-sm">{event.time}</Text>
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
            size="sm"
            position="bottom-right"
         />
      </View >
   );
}


