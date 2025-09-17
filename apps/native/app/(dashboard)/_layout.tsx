import React from 'react'
import { Stack } from 'expo-router'
import { HomeIcon, WalletIcon, TargetIcon, CalendarIcon, ChartArea } from 'lucide-react-native'

export default function DashboardLayout() {
   return (
      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen
            name="index"
            options={{
               title: 'Dashboard',
            }}
         />
         <Stack.Screen
            name="finance"
            options={{
               title: 'Finance',
            }}
         />
         <Stack.Screen
            name="habits"
            options={{
               title: 'Habits',
            }}
         />
         <Stack.Screen
            name="schedule"
            options={{
               title: 'Schedule',
            }}
         />
         <Stack.Screen
            name="staticstics"
            options={{
               title: 'Statistics',
            }}
         />
      </Stack>
   )
}
