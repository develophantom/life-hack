import { router } from "expo-router";
import {
  ArrowLeftIcon,
  BellIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  TrendingUpIcon,
  SendIcon,
  CreditCardIcon,
  ArrowUpDownIcon,
  TargetIcon,
  BarChart3Icon,
  FilterIcon,
  DownloadIcon,
} from "lucide-react-native";
import React from "react";
import { ScrollView, View, StatusBar } from "react-native";
import { Button } from "@/components/ui/button";
import { CardStack } from "@/components/card-stack";
import { Icon } from "@/components/ui/icon";
import { SlackIcon } from "@/components/slack-icon";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";
import { Container } from "@/components/container";

export default function FinanceScreen() {
  const { accounts, transactions, getRecentTransactions } = useDashboardStore();

  const formatCurrency = (amount: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  const recentTransactions = getRecentTransactions(6);
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const monthlySpent = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const monthlyLimit = 10000;
  const availableBalance = totalBalance - monthlySpent;
  const spentPercentage = (monthlySpent / monthlyLimit) * 100;

  // Generate cards from accounts
  const generateCardsFromAccounts = () => {
    return accounts.map((account, index) => {
      // Generate a mock card number for display
      const cardNumber = `1234 5678 9012 ${String(1000 + index).slice(-4)}`;

      // Generate expiry date (2 years from now)
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 2);
      const month = String(expiryDate.getMonth() + 1).padStart(2, '0');
      const year = String(expiryDate.getFullYear()).slice(-2);

      // Determine card type based on account type
      let cardType = "Debit Card";
      if (account.type === "credit") cardType = "Credit Card";
      if (account.type === "mobile") cardType = "Prepaid Card";

      return {
        cardholderName: account.name.split(' ').map(word => word.toUpperCase()).join(' '),
        expiryDate: `${month}/${year}`,
        cardType: cardType as "Debit Card" | "Credit Card" | "Prepaid Card",
        cardNumber: cardNumber,
        bankName: account.name,
      };
    });
  };

  const accountCards = generateCardsFromAccounts();

  // Mock transaction data with icons and colors using design system
  const mockTransactions = [
    {
      id: "1",
      name: "Figma",
      amount: 375.00,
      time: "2:31 PM",
      icon: "F",
      color: "bg-chart-4",
    },
    {
      id: "2",
      name: "Crunchbase",
      amount: 49.00,
      time: "Yesterday, 10:55 AM",
      icon: "cb",
      color: "bg-chart-2",
    },
    {
      id: "3",
      name: "Jason Green",
      amount: 1240.21,
      time: "Jun 20, 4:42 PM",
      icon: "JG",
      color: "bg-chart-1",
    },
    {
      id: "4",
      name: "Framer",
      amount: 23.00,
      time: "Jun 20, 2:15 PM",
      icon: "F",
      color: "bg-primary",
    },
    {
      id: "5",
      name: "Zoom",
      amount: 289.90,
      time: "Jun 19, 11:30 AM",
      icon: "Z",
      color: "bg-chart-2",
    },
    {
      id: "6",
      name: "Slack",
      amount: 11.75,
      time: "Jun 19, 9:15 AM",
      icon: "S",
      color: "bg-chart-4",
    },
  ];

  return (
    <Container>
      {/* Header Section */}
      <View className="px-6 pb-6">

        {/* Balance Section */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-foreground text-lg font-semibold">Your Balance</Text>
            <Text className="text-muted-foreground text-sm">Fri 30 December</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-foreground text-4xl font-bold text-shadow mb-2">
                {formatCurrency(availableBalance)}
              </Text>
              <View className="flex-row items-center gap-2">
                <Icon as={TrendingUpIcon} className="text-chart-1" size={16} />
                <Text className="text-chart-1 text-sm font-semibold">
                  +528.32 (12.3%)
                </Text>
              </View>
            </View>

            {/* Mini Chart Placeholder */}
            <View className="w-16 h-8 items-center justify-center">
              <View className="w-full h-full bg-muted rounded-full items-center justify-center">
                <View className="flex-row items-end gap-0.5">
                  <View className="w-1 h-2 bg-muted-foreground/60 rounded-full" />
                  <View className="w-1 h-3 bg-muted-foreground/80 rounded-full" />
                  <View className="w-1 h-1 bg-muted-foreground/40 rounded-full" />
                  <View className="w-1 h-4 bg-muted-foreground rounded-full" />
                  <View className="w-1 h-2 bg-muted-foreground/60 rounded-full" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6">
          {/* Card Stack Section */}
          <CardStack cards={accountCards} maxVisible={3} />

          {/* Quick Actions */}
          <View className="mb-8">
            <Text className="text-foreground text-lg font-semibold mb-4">Quick Actions</Text>
            <View className="flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 py-4"
                onPress={() => router.push("/finance/add-transaction")}
              >
                <Icon as={SendIcon} className="text-primary" size={20} />
                <Text className="text-primary font-semibold ml-2">Send Money</Text>
              </Button>
              <Button
                variant="outline"
                className="flex-1 py-4"
                onPress={() => router.push("/finance/add-account")}
              >
                <Icon as={CreditCardIcon} className="text-primary" size={20} />
                <Text className="text-primary font-semibold ml-2">Add Account</Text>
              </Button>
              <Button
                variant="outline"
                className="flex-1 py-4"
                onPress={() => router.push("/finance/add-budget")}
              >
                <Icon as={TargetIcon} className="text-primary" size={20} />
                <Text className="text-primary font-semibold ml-2">Set Budget</Text>
              </Button>
            </View>
          </View>

          {/* Financial Summary */}
          <View className="mb-8">
            <View className="bg-card rounded-3xl p-6 shadow-2xl">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-card-foreground text-lg font-semibold">Monthly Spending</Text>
                <Text className="text-muted-foreground text-sm">
                  {formatCurrency(monthlySpent)} of {formatCurrency(monthlyLimit)}
                </Text>
              </View>

              {/* Progress Bar */}
              <View className="mb-4">
                <View className="h-3 bg-muted rounded-full overflow-hidden">
                  <View
                    className="h-full bg-chart-1 rounded-full"
                    style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                  />
                </View>
                <View className="flex-row justify-between mt-2">
                  <Text className="text-muted-foreground text-xs">Spent</Text>
                  <Text className="text-muted-foreground text-xs">
                    {Math.round(spentPercentage)}%
                  </Text>
                </View>
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-muted-foreground text-sm">Available</Text>
                  <Text className="text-card-foreground text-lg font-semibold">
                    {formatCurrency(monthlyLimit - monthlySpent)}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-muted-foreground text-sm">This Month</Text>
                  <Text className="text-card-foreground text-lg font-semibold">
                    {formatCurrency(monthlySpent)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Spending Categories */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-foreground text-lg font-semibold">Spending by Category</Text>
              <Button variant="ghost" size="sm">
                <Icon as={BarChart3Icon} className="text-muted-foreground" size={16} />
              </Button>
            </View>
            <View className="bg-card rounded-2xl p-4 shadow-xl">
              {[
                { name: "Food & Dining", amount: 1240.50, percentage: 35, color: "bg-chart-1" },
                { name: "Transportation", amount: 680.25, percentage: 19, color: "bg-chart-2" },
                { name: "Shopping", amount: 520.75, percentage: 15, color: "bg-chart-3" },
                { name: "Entertainment", amount: 340.00, percentage: 10, color: "bg-chart-4" },
                { name: "Bills & Utilities", amount: 280.50, percentage: 8, color: "bg-chart-5" },
                { name: "Other", amount: 438.00, percentage: 13, color: "bg-muted" },
              ].map((category, index) => (
                <View key={index} className="flex-row items-center justify-between py-3 border-b border-border/50 last:border-b-0">
                  <View className="flex-row items-center gap-3 flex-1">
                    <View className={`w-3 h-3 rounded-full ${category.color}`} />
                    <Text className="text-card-foreground font-medium flex-1">{category.name}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-card-foreground font-semibold">
                      {formatCurrency(category.amount)}
                    </Text>
                    <Text className="text-muted-foreground text-xs">
                      {category.percentage}%
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Transactions Section */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-foreground text-xl font-bold">Recent Transactions</Text>
              <View className="flex-row gap-2">
                <Button variant="ghost" size="sm">
                  <Icon as={FilterIcon} className="text-muted-foreground" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon as={DownloadIcon} className="text-muted-foreground" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Text className="text-muted-foreground text-sm">View All</Text>
                </Button>
              </View>
            </View>

            <View className="space-y-3">
              {mockTransactions.map((transaction) => (
                <View key={transaction.id} className="flex-row items-center justify-between py-4 px-4 bg-card rounded-2xl shadow-xl">
                  <View className="flex-row items-center gap-4">
                    {/* Transaction Icon */}
                    {transaction.name === "Slack" ? (
                      <SlackIcon />
                    ) : (
                      <View className={`w-12 h-12 rounded-2xl ${transaction.color} items-center justify-center`}>
                        <Text className="text-card-foreground font-bold text-lg">
                          {transaction.icon}
                        </Text>
                      </View>
                    )}

                    {/* Transaction Details */}
                    <View className="flex-1">
                      <Text className="text-card-foreground font-semibold text-base">
                        {transaction.name}
                      </Text>
                      <Text className="text-muted-foreground text-sm">
                        {transaction.time}
                      </Text>
                    </View>
                  </View>

                  {/* Amount */}
                  <Text className="text-card-foreground font-bold text-lg">
                    {formatCurrency(transaction.amount)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Financial Insights */}
          <View className="mb-8">
            <Text className="text-foreground text-lg font-semibold mb-4">Financial Insights</Text>
            <View className="space-y-3">
              <View className="bg-card rounded-2xl p-4 shadow-xl border-l-4 border-chart-1">
                <View className="flex-row items-start gap-3">
                  <Icon as={TrendingUpIcon} className="text-chart-1 mt-1" size={20} />
                  <View className="flex-1">
                    <Text className="text-card-foreground font-semibold mb-1">Spending Alert</Text>
                    <Text className="text-muted-foreground text-sm">
                      You've spent 85% of your monthly budget. Consider reducing dining expenses.
                    </Text>
                  </View>
                </View>
              </View>

              <View className="bg-card rounded-2xl p-4 shadow-xl border-l-4 border-chart-2">
                <View className="flex-row items-start gap-3">
                  <Icon as={TargetIcon} className="text-chart-2 mt-1" size={20} />
                  <View className="flex-1">
                    <Text className="text-card-foreground font-semibold mb-1">Savings Goal</Text>
                    <Text className="text-muted-foreground text-sm">
                      You're on track to save $2,400 this month. Keep it up!
                    </Text>
                  </View>
                </View>
              </View>

              <View className="bg-card rounded-2xl p-4 shadow-xl border-l-4 border-chart-3">
                <View className="flex-row items-start gap-3">
                  <Icon as={BarChart3Icon} className="text-chart-3 mt-1" size={20} />
                  <View className="flex-1">
                    <Text className="text-card-foreground font-semibold mb-1">Spending Trend</Text>
                    <Text className="text-muted-foreground text-sm">
                      Your spending decreased by 12% compared to last month.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Add Transaction Button */}
          <View className="pb-8">
            <Button
              className="w-full"
              onPress={() => router.push("/finance/add-transaction")}
            >
              <Icon as={PlusIcon} className="text-primary-foreground" size={20} />
              <Text className="font-bold ml-2 ">Add Transaction</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}