import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ConnectionStatusIndicator, ConnectionStatusDot } from '@/components/connection-status-indicator';
import { Link } from 'expo-router';
import {
   TargetIcon,
   WalletIcon,
   CalendarIcon,
   ArrowRightIcon,
} from 'lucide-react-native';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { fontStyles } from '@/lib/fonts';

export default function LandingPage() {


   return (
      <>
         <View className="flex-[.4] justify-end bg-background px-6">
            <ConnectionStatusDot />

            <View className="flex-row items-center justify-between mb-4">
               <Text className="text-foreground text-4xl" style={fontStyles.black}>Welcome!</Text>
            </View>
         </View>
         <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="px-6 pt-2 pb-8">

               {/* Hero Section */}
               <View className="mb-8">
                  <Text className="text-foreground text-4xl mb-3" style={fontStyles.black}>
                     Transform Your Life
                  </Text>
                  <Text className="text-foreground text-4xl mb-4" style={fontStyles.black}>
                     One Habit at a Time
                  </Text>
                  <Text className="text-muted-foreground text-lg leading-relaxed mb-6" style={fontStyles.regular}>
                     Build better habits, manage your finances, and organize your schedule.
                     All in one powerful app designed to help you achieve your goals.
                  </Text>

                  <View className="gap-3">
                     <Link href="/register" asChild>
                        <Button className="w-full bg-primary">
                           <Text className="text-lg text-primary-foreground" style={fontStyles.bold}>Get Started</Text>
                           <Icon as={ArrowRightIcon} className="ml-2 text-primary-foreground" size={20} />
                        </Button>
                     </Link>
                  </View>
               </View>
            </View>

            {/* Features Section */}
            <View className="px-6 mb-8">
               <Text className="text-foreground text-2xl mb-6 text-center" style={fontStyles.black}>
                  Everything You Need to Succeed
               </Text>

               <View className="gap-4">
                  {/* Habit Tracking */}
                  <Card className="bg-muted-foreground">
                     <CardHeader>
                        <View className="flex-row items-center gap-3">
                           <View className="w-10 h-10 bg-chart-1 rounded-lg items-center justify-center">
                              <Icon as={TargetIcon} className="text-foreground" size={24} />
                           </View>
                           <View className="flex-1">
                              <CardTitle className="text-card-foreground text-xl" style={fontStyles.black}>
                                 Habit Tracking
                              </CardTitle>
                              <CardDescription className="text-foreground text-sm" style={fontStyles.regular}>
                                 Build and maintain positive habits
                              </CardDescription>
                           </View>
                        </View>
                     </CardHeader>
                     <CardContent>
                        <Text className="text-foreground text-sm leading-relaxed" style={fontStyles.regular}>
                           Track your daily habits with streak counters, analytics, and personalized insights.
                           Stay motivated with challenges and reminders.
                        </Text>
                     </CardContent>
                  </Card>

                  {/* Financial Management */}
                  <Card className="bg-muted-foreground">
                     <CardHeader>
                        <View className="flex-row items-center gap-3">
                           <View className="w-10 h-10 bg-chart-2 rounded-lg items-center justify-center">
                              <Icon as={WalletIcon} className="text-foreground" size={24} />
                           </View>
                           <View className="flex-1">
                              <CardTitle className="text-card-foreground text-xl" style={fontStyles.black}>
                                 Financial Management
                              </CardTitle>
                              <CardDescription className="text-foreground text-sm" style={fontStyles.regular}>
                                 Take control of your finances
                              </CardDescription>
                           </View>
                        </View>
                     </CardHeader>
                     <CardContent>
                        <Text className="text-foreground text-sm leading-relaxed" style={fontStyles.regular}>
                           Manage your accounts, track expenses, set budgets, and achieve your savings goals
                           with comprehensive financial tools.
                        </Text>
                     </CardContent>
                  </Card>

                  {/* Schedule Organization */}
                  <Card className="bg-muted-foreground">
                     <CardHeader>
                        <View className="flex-row items-center gap-3">
                           <View className="w-10 h-10 bg-chart-3 rounded-lg items-center justify-center">
                              <Icon as={CalendarIcon} className="text-foreground" size={24} />
                           </View>
                           <View className="flex-1">
                              <CardTitle className="text-card-foreground text-xl" style={fontStyles.black}>
                                 Schedule Organization
                              </CardTitle>
                              <CardDescription className="text-foreground text-sm" style={fontStyles.regular}>
                                 Organize your time effectively
                              </CardDescription>
                           </View>
                        </View>
                     </CardHeader>
                     <CardContent>
                        <Text className="text-foreground text-sm leading-relaxed" style={fontStyles.regular}>
                           Plan your day with meetings, tasks, and events. Stay organized and never miss
                           important appointments again.
                        </Text>
                     </CardContent>
                  </Card>
               </View>
            </View>

            {/* Stats Section */}
            <View className="px-6 mb-8">
               <View className="bg-muted p-6 rounded-xl">
                  <Text className="text-foreground text-xl mb-4 text-center" style={fontStyles.black}>
                     Join Thousands of Users
                  </Text>
                  <View className="flex-row justify-around">
                     <View className="items-center">
                        <Text className="text-foreground text-2xl mb-1" style={fontStyles.black}>
                           10K+
                        </Text>
                        <Text className="text-muted-foreground text-xs" style={fontStyles.regular}>
                           Active Users
                        </Text>
                     </View>
                     <View className="items-center">
                        <Text className="text-foreground text-2xl mb-1" style={fontStyles.black}>
                           1M+
                        </Text>
                        <Text className="text-muted-foreground text-xs" style={fontStyles.regular}>
                           Habits Tracked
                        </Text>
                     </View>
                     <View className="items-center">
                        <Text className="text-foreground text-2xl mb-1" style={fontStyles.black}>
                           95%
                        </Text>
                        <Text className="text-muted-foreground text-xs" style={fontStyles.regular}>
                           Success Rate
                        </Text>
                     </View>
                  </View>
               </View>
            </View>

            {/* CTA Section */}
            <View className="px-6 mb-8">
               <View className="bg-primary p-6 rounded-xl">
                  <Text className="text-primary-foreground text-2xl mb-3 text-center" style={fontStyles.black}>
                     Ready to Transform Your Life?
                  </Text>
                  <Text className="text-primary-foreground text-base mb-4 text-center opacity-90" style={fontStyles.regular}>
                     Start your journey towards better habits and financial freedom today.
                  </Text>
                  <Link href="/(dashboard)" asChild>
                     <Button variant="secondary" className="w-full bg-background">
                        <Text className="text-lg text-foreground" style={fontStyles.bold}>Start Your Journey</Text>
                        <Icon as={ArrowRightIcon} className="ml-2 text-foreground" size={20} />
                     </Button>
                  </Link>
               </View>
            </View>

            {/* Footer */}
            <View className="px-6 pb-8">
               <View className="border-t border-border pt-8">
                  <Text className="text-muted-foreground text-center text-sm" style={fontStyles.regular}>
                     © 2024 HackLife. All rights reserved.
                  </Text>
               </View>
            </View>
         </ScrollView>
      </>
   );
}

