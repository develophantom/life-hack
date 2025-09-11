import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function DashboardLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} />
  )
}
