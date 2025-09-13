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
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { SavingsGoals } from "@/components/dashboard/SavingsGoals";
import { BudgetOverview } from "@/components/dashboard/BudgetOverview";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { Progress } from "@/components/ui/progress";

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

  // Mock savings goals data
  const savingsGoals = [
    {
      id: "1",
      name: "Buy Macbook",
      targetAmount: 100000,
      currentAmount: 80000,
      deadline: "2024-12-31",
      category: "Macbook",
      icon: "💻",
    },
    {
      id: "2",
      name: "Investment",
      targetAmount: 0,
      currentAmount: 200000,
      deadline: "2024-06-15",
      category: "Investment",
      icon: "📈",
    },
    {
      id: "3",
      name: "New Home",
      targetAmount: 0,
      currentAmount: 400000,
      deadline: "2024-08-30",
      category: "House",
      icon: "🏠",
    },
  ];

  // Mock budget data
  const budgets = [
    {
      id: "1",
      name: "Food & Dining",
      category: "Essential",
      budgetAmount: 1500,
      spentAmount: 1240,
      period: "monthly" as const,
      color: "bg-chart-1",
      icon: "🍽️",
    },
    {
      id: "2",
      name: "Transportation",
      category: "Essential",
      budgetAmount: 800,
      spentAmount: 680,
      period: "monthly" as const,
      color: "bg-chart-2",
      icon: "🚗",
    },
    {
      id: "3",
      name: "Entertainment",
      category: "Lifestyle",
      budgetAmount: 400,
      spentAmount: 340,
      period: "monthly" as const,
      color: "bg-chart-3",
      icon: "🎬",
    },
    {
      id: "4",
      name: "Shopping",
      category: "Lifestyle",
      budgetAmount: 600,
      spentAmount: 520,
      period: "monthly" as const,
      color: "bg-chart-4",
      icon: "🛍️",
    },
  ];

  // Mock transaction data with icons and colors using design system
  const mockTransactions = [
    {
      id: "1",
      name: "Spotify Subscription",
      description: "Transfer to bank",
      amount: -77.00,
      date: "30 December",
      icon: "🎵",
      color: "bg-chart-1",
    },
    {
      id: "2",
      name: "Paypal Transaction",
      description: "Transfer to bank",
      amount: 140.00,
      date: "29 December",
      icon: "P",
      color: "bg-chart-2",
    },
    {
      id: "3",
      name: "Stripe Transaction",
      description: "Transfer to bank",
      amount: 2320.00,
      date: "29 December",
      icon: "S",
      color: "bg-chart-2",
    },
    {
      id: "4",
      name: "Dribbble Pro Subscription",
      description: "Transfer to bank",
      amount: -324.00,
      date: "28 December",
      icon: "D",
      color: "bg-chart-3",
    },
    {
      id: "5",
      name: "Figma Subscription",
      description: "Transfer to bank",
      amount: -375.00,
      date: "27 December",
      icon: "F",
      color: "bg-chart-4",
    },
    {
      id: "6",
      name: "Zoom Meeting",
      description: "Transfer to bank",
      amount: -289.90,
      date: "26 December",
      icon: "Z",
      color: "bg-chart-5",
    },
  ];

  return (
    <Container>
      {/* Header Section */}
      <View className="px-4">
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
          <View className="mb-4">
            <Text className="text-foreground text-lg font-semibold mb-4">Quick Actions</Text>
            <View className=" flex-row flex-wrap flex-grow gap-4">
              <Button
                variant="secondary"
                onPress={() => router.push("/finance/add-transaction")}
              >
                <Icon as={SendIcon} className="text-secondary-foreground" size={20} />
                <Text className="text-secondary-foreground font-semibold ml-2">Send Money</Text>
              </Button>
              <Button
                variant="secondary"
                onPress={() => router.push("/finance/add-account")}
              >
                <Icon as={CreditCardIcon} className="text-secondary-foreground" size={20} />
                <Text className="text-secondary-foreground font-semibold ml-2">Add Account</Text>
              </Button>
              <Button
                variant="secondary"
                onPress={() => router.push("/finance/add-budget")}
              >
                <Icon as={TargetIcon} className="text-secondary-foreground" size={20} />
                <Text className="text-secondary-foreground font-semibold ml-2">Set Budget</Text>
              </Button>
              <Button
                variant="secondary"
                onPress={() => router.push("/finance/add-budget")}
              >
                <Icon as={TargetIcon} className="text-secondary-foreground" size={20} />
                <Text className="text-secondary-foreground font-semibold ml-2">Set Budget</Text>
              </Button>

            </View>
          </View>

          {/* Financial Summary */}
          <View className="mt-6">
            <View className="p-4 rounded-3xl shadow-2xl">
              <View className="flex-col justify-between mb-4">
                <Text className="text-card-foreground text-lg font-semibold">Monthly Spending</Text>
                <View className="flex-col">
                  <View className="flex-row items-center gap-2">
                    <Icon as={TrendingUpIcon} className="text-chart-1" size={16} />
                    <Text className="text-sm font-semibold">
                      +528.32 (12.3%)
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2 font-bold">
                    <Text className="text-sm">
                      {formatCurrency(monthlySpent)} of {formatCurrency(monthlyLimit)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Progress Bar */}
              <View className="mb-4">
                <Progress
                  value={spentPercentage}
                  className="h-3 bg-chart-1 rounded-full"
                />
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


          {/* Savings Goals */}
          <View className="mb-8">
            <SavingsGoals
              goals={savingsGoals}
              onAddGoal={() => router.push("/finance/add-budget")}
              onEditGoal={(goal) => router.push("/finance/edit-budget")}
            />
          </View>

          {/* Budget Overview */}
          <View className="mb-8">
            <BudgetOverview
              budgets={budgets}
              onAddBudget={() => router.push("/finance/add-budget")}
              onEditBudget={(budget) => router.push("/finance/edit-budget")}
            />
          </View>

          {/* Transactions Section */}
          <View className="mb-8">
            <TransactionList
              transactions={mockTransactions}
              onViewAll={() => router.push("/finance/add-transaction")}
            />
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
    </Container >
  );
}