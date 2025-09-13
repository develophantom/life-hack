import React from 'react';
import { Stack } from "expo-router";

export default function FinanceLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Finance",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-account"
        options={{
          title: "Accounts",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="edit-account"
        options={{
          title: "Accounts",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="add-transaction"
        options={{
          title: "Transactions",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="add-budget"
        options={{
          title: "Budgets",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="edit-transaction"
        options={{
          title: "Add Transaction",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="add-saving"
        options={{
          title: "Savings",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
