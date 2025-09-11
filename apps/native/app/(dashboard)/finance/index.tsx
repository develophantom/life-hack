import { router } from "expo-router";
import {
  ArrowLeftIcon,
  BellIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  TrendingUpIcon,
} from "lucide-react-native";
import React from "react";
import { ScrollView, View, StatusBar } from "react-native";
import { Button } from "@/components/ui/button";
import { CardStack } from "@/components/card-stack";
import { Icon } from "@/components/ui/icon";
import { SlackIcon } from "@/components/slack-icon";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

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

  // Mock transaction data with icons and colors matching reference
  const mockTransactions = [
    {
      id: "1",
      name: "Figma",
      amount: 375.00,
      time: "2:31 PM",
      icon: "F",
      color: "bg-purple-500",
    },
    {
      id: "2",
      name: "Crunchbase",
      amount: 49.00,
      time: "Yesterday, 10:55 AM",
      icon: "cb",
      color: "bg-blue-500",
    },
    {
      id: "3",
      name: "Jason Green",
      amount: 1240.21,
      time: "Jun 20, 4:42 PM",
      icon: "JG",
      color: "bg-green-500",
    },
    {
      id: "4",
      name: "Framer",
      amount: 23.00,
      time: "Jun 20, 2:15 PM",
      icon: "F",
      color: "bg-black",
    },
    {
      id: "5",
      name: "Zoom",
      amount: 289.90,
      time: "Jun 19, 11:30 AM",
      icon: "Z",
      color: "bg-blue-500",
    },
    {
      id: "6",
      name: "Slack",
      amount: 11.75,
      time: "Jun 19, 9:15 AM",
      icon: "S",
      color: "bg-purple-600",
    },
  ];

  return (
    <View className="flex-1 bg-slate-900">
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Status Bar */}
      <View className="flex-row justify-between items-center px-6 pt-12 pb-4">
        <Text className="text-white text-sm font-medium">9:41</Text>
        <View className="flex-row items-center gap-1">
          <View className="w-1 h-1 bg-white rounded-full" />
          <View className="w-1 h-1 bg-white rounded-full" />
          <View className="w-1 h-1 bg-white rounded-full" />
          <View className="w-1 h-1 bg-white rounded-full" />
        </View>
      </View>

      {/* Header Section */}
      <View className="px-6 pb-6">
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onPress={() => router.back()}
              className="p-2"
            >
              <Icon as={MenuIcon} className="text-white" size={24} />
            </Button>
            <View>
              <Text className="text-white text-lg font-semibold">Welcome home</Text>
              <Text className="text-white/80 text-sm">Pebrian Teguh</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <Button variant="ghost" size="sm" className="p-2">
              <Icon as={SearchIcon} className="text-white" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Icon as={BellIcon} className="text-white" size={20} />
            </Button>
          </View>
        </View>

        {/* Balance Section */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-lg font-semibold">Your Balance</Text>
            <Text className="text-white/70 text-sm">Fri 30 December</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white text-4xl font-bold text-shadow mb-2">
                {formatCurrency(availableBalance)}
              </Text>
              <View className="flex-row items-center gap-2">
                <Icon as={TrendingUpIcon} className="text-green-400" size={16} />
                <Text className="text-green-400 text-sm font-semibold">
                  +528.32 (12.3%)
                </Text>
              </View>
            </View>

            {/* Mini Chart Placeholder */}
            <View className="w-16 h-8 items-center justify-center">
              <View className="w-full h-full bg-white/10 rounded-full items-center justify-center">
                <View className="flex-row items-end gap-0.5">
                  <View className="w-1 h-2 bg-white/60 rounded-full" />
                  <View className="w-1 h-3 bg-white/80 rounded-full" />
                  <View className="w-1 h-1 bg-white/40 rounded-full" />
                  <View className="w-1 h-4 bg-white rounded-full" />
                  <View className="w-1 h-2 bg-white/60 rounded-full" />
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

          {/* Financial Summary */}
          <View className="mb-8">
            <View className="bg-slate-800 rounded-3xl p-6 shadow-2xl">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-white text-lg font-semibold">Monthly Spending</Text>
                <Text className="text-white/70 text-sm">
                  {formatCurrency(monthlySpent)} of {formatCurrency(monthlyLimit)}
                </Text>
              </View>

              {/* Progress Bar */}
              <View className="mb-4">
                <View className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                  />
                </View>
                <View className="flex-row justify-between mt-2">
                  <Text className="text-white/70 text-xs">Spent</Text>
                  <Text className="text-white/70 text-xs">
                    {Math.round(spentPercentage)}%
                  </Text>
                </View>
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-white/70 text-sm">Available</Text>
                  <Text className="text-white text-lg font-semibold">
                    {formatCurrency(monthlyLimit - monthlySpent)}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white/70 text-sm">This Month</Text>
                  <Text className="text-white text-lg font-semibold">
                    {formatCurrency(monthlySpent)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Transactions Section */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-white text-xl font-bold">Recent Transactions</Text>
              <Button variant="ghost" size="sm">
                <Text className="text-white/70 text-sm">View All</Text>
              </Button>
            </View>

            <View className="space-y-3">
              {mockTransactions.map((transaction) => (
                <View key={transaction.id} className="flex-row items-center justify-between py-4 px-4 bg-slate-800 rounded-2xl shadow-xl">
                  <View className="flex-row items-center gap-4">
                    {/* Transaction Icon */}
                    {transaction.name === "Slack" ? (
                      <SlackIcon />
                    ) : (
                      <View className={`w-12 h-12 rounded-2xl ${transaction.color} items-center justify-center`}>
                        <Text className="text-white font-bold text-lg">
                          {transaction.icon}
                        </Text>
                      </View>
                    )}

                    {/* Transaction Details */}
                    <View className="flex-1">
                      <Text className="text-white font-semibold text-base">
                        {transaction.name}
                      </Text>
                      <Text className="text-white/70 text-sm">
                        {transaction.time}
                      </Text>
                    </View>
                  </View>

                  {/* Amount */}
                  <Text className="text-white font-bold text-lg">
                    {formatCurrency(transaction.amount)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Add Transaction Button */}
          <View className="pb-8">
            <Button
              className="w-full bg-emerald-600 rounded-2xl py-4 shadow-2xl"
              onPress={() => router.push("/finance/add-transaction")}
            >
              <Icon as={PlusIcon} className="text-white" size={20} />
              <Text className="text-white font-bold ml-2 text-lg">Add Transaction</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}