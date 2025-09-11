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
        name="accounts"
        options={{
          title: "Accounts",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="transactions"
        options={{
          title: "Transactions",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="budgets"
        options={{
          title: "Budgets",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="add-transaction"
        options={{
          title: "Add Transaction",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
