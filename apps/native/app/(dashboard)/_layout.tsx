import React from 'react'
import { Tabs } from 'expo-router'
import { HomeIcon, WalletIcon, TargetIcon, CalendarIcon, ChartArea } from 'lucide-react-native'

export default function DashboardLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <HomeIcon size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: 'Finance',
          tabBarIcon: ({ color, size }) => <WalletIcon size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: 'Habits',
          tabBarIcon: ({ color, size }) => <TargetIcon size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => <CalendarIcon size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="staticstics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ color, size }) => <ChartArea size={size} color={color} />
        }}
      />
    </Tabs>
  )
}
