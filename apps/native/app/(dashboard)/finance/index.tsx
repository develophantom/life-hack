import { router } from "expo-router";
import {
  BarChart3Icon,
  CreditCardIcon,
  EditIcon,
  MoreHorizontalIcon,
  PlusIcon,
  TrashIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Container } from "@/components/container";
import { WeeklyFinanceSummary } from "@/components/dashboard/WeeklyFinanceSummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

export default function FinanceScreen() {
  const {
    accounts,
    transactions,
    budgetCategories,
    getRecentTransactions,
    deleteAccount,
    deleteBudgetCategory,
    deleteTransaction,
  } = useDashboardStore();
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "bank":
        return WalletIcon;
      case "credit":
        return CreditCardIcon;
      case "mobile":
        return TrendingUpIcon;
      default:
        return WalletIcon;
    }
  };

  const recentTransactions = getRecentTransactions(5);

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View>
              <Text variant="h1">Finance</Text>
              <Text variant="muted">Manage your money and track expenses</Text>
            </View>
            <Button
              onPress={() => router.push("/finance/add-transaction")}
              size="sm"
            >
              <Icon as={PlusIcon} size={16} />
              <Text>Add</Text>
            </Button>
          </View>

          {/* Finance Tabs */}
          <Tabs
            className="flex-1"
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="budgets">Budgets</TabsTrigger>
            </TabsList>

            <TabsContent className="flex-1" value="overview">
              <View className="gap-4">
                {/* Quick Stats */}
                <View className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <View className="items-center gap-2">
                        <Icon
                          as={WalletIcon}
                          className="text-green-500"
                          size={24}
                        />
                        <Text className="font-semibold">Total Balance</Text>
                        <Text className="font-bold text-green-600 text-lg">
                          {formatCurrency(
                            accounts.reduce((sum, acc) => sum + acc.balance, 0)
                          )}
                        </Text>
                      </View>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <View className="items-center gap-2">
                        <Icon
                          as={BarChart3Icon}
                          className="text-blue-500"
                          size={24}
                        />
                        <Text className="font-semibold">This Month</Text>
                        <Text className="font-bold text-blue-600 text-lg">
                          {formatCurrency(
                            transactions
                              .filter((tx) => tx.type === "expense")
                              .reduce((sum, tx) => sum + tx.amount, 0)
                          )}
                        </Text>
                      </View>
                    </CardContent>
                  </Card>
                </View>

                {/* Weekly Finance Summary */}
                <WeeklyFinanceSummary />

                {/* Recent Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentTransactions.length > 0 ? (
                      <View className="gap-3">
                        {recentTransactions.map((transaction) => (
                          <View
                            className="flex-row items-center justify-between rounded-lg bg-background/50 p-3"
                            key={transaction.id}
                          >
                            <View className="flex-row items-center gap-3">
                              <View
                                className={`rounded-full p-2 ${
                                  transaction.type === "income"
                                    ? "bg-green-100 dark:bg-green-900/20"
                                    : "bg-red-100 dark:bg-red-900/20"
                                }`}
                              >
                                <Icon
                                  as={
                                    transaction.type === "income"
                                      ? TrendingUpIcon
                                      : TrendingUpIcon
                                  }
                                  className={
                                    transaction.type === "income"
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                  }
                                  size={16}
                                />
                              </View>
                              <View>
                                <Text className="font-medium">
                                  {transaction.description}
                                </Text>
                                <Text
                                  className="text-muted-foreground"
                                  variant="small"
                                >
                                  {transaction.category}
                                </Text>
                              </View>
                            </View>
                            <Text
                              className={`font-semibold ${
                                transaction.type === "income"
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {transaction.type === "income" ? "+" : "-"}
                              {formatCurrency(transaction.amount)}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ) : (
                      <View className="items-center gap-4 py-8">
                        <Icon
                          as={WalletIcon}
                          className="text-muted-foreground"
                          size={48}
                        />
                        <View className="items-center gap-2">
                          <Text className="font-semibold">
                            No transactions yet
                          </Text>
                          <Text className="text-center" variant="muted">
                            Add your first transaction to get started
                          </Text>
                        </View>
                        <Button
                          onPress={() =>
                            router.push("/finance/add-transaction")
                          }
                        >
                          <Icon as={PlusIcon} size={16} />
                          <Text>Add Transaction</Text>
                        </Button>
                      </View>
                    )}
                  </CardContent>
                </Card>
              </View>
            </TabsContent>

            <TabsContent className="flex-1" value="accounts">
              <View className="gap-4">
                {accounts.length > 0 ? (
                  accounts.map((account) => (
                    <Card key={account.id}>
                      <CardContent className="p-4">
                        <View className="flex-row items-center justify-between">
                          <View className="flex-1 flex-row items-center gap-3">
                            <Icon
                              as={getAccountIcon(account.type)}
                              className="text-primary"
                              size={24}
                            />
                            <View className="flex-1">
                              <Text className="font-semibold">
                                {account.name}
                              </Text>
                              <Text
                                className="text-muted-foreground"
                                variant="small"
                              >
                                {account.type.charAt(0).toUpperCase() +
                                  account.type.slice(1)}{" "}
                                Account
                              </Text>
                            </View>
                          </View>
                          <View className="items-end gap-2">
                            <View className="items-end">
                              <Text className="font-bold text-lg">
                                {formatCurrency(
                                  account.balance,
                                  account.currency
                                )}
                              </Text>
                              <Text
                                className="text-muted-foreground"
                                variant="small"
                              >
                                {account.currency}
                              </Text>
                            </View>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <Icon as={MoreHorizontalIcon} size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onPress={() => {
                                    router.push(
                                      `/finance/edit-account?accountId=${account.id}`
                                    );
                                  }}
                                >
                                  <Icon as={EditIcon} size={16} />
                                  <Text>Edit</Text>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600 dark:text-red-400"
                                  onPress={() => {
                                    deleteAccount(account.id);
                                  }}
                                >
                                  <Icon as={TrashIcon} size={16} />
                                  <Text>Delete</Text>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </View>
                        </View>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent>
                      <View className="items-center gap-4 py-8">
                        <Icon
                          as={WalletIcon}
                          className="text-muted-foreground"
                          size={48}
                        />
                        <View className="items-center gap-2">
                          <Text className="font-semibold">No accounts yet</Text>
                          <Text className="text-center" variant="muted">
                            Add your first account to start tracking finances
                          </Text>
                        </View>
                        <Button
                          onPress={() => router.push("/finance/add-account")}
                        >
                          <Icon as={PlusIcon} size={16} />
                          <Text>Add Account</Text>
                        </Button>
                      </View>
                    </CardContent>
                  </Card>
                )}
              </View>
            </TabsContent>

            <TabsContent className="flex-1" value="transactions">
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <Text variant="h3">All Transactions</Text>
                  <Button
                    onPress={() => router.push("/finance/add-transaction")}
                    size="sm"
                  >
                    <Icon as={PlusIcon} size={16} />
                    <Text>Add</Text>
                  </Button>
                </View>

                {transactions.length > 0 ? (
                  <View className="gap-3">
                    {transactions.map((transaction) => (
                      <Card key={transaction.id}>
                        <CardContent className="p-4">
                          <View className="flex-row items-center justify-between">
                            <View className="flex-1 flex-row items-center gap-3">
                              <View
                                className={`rounded-full p-2 ${
                                  transaction.type === "income"
                                    ? "bg-green-100 dark:bg-green-900/20"
                                    : "bg-red-100 dark:bg-red-900/20"
                                }`}
                              >
                                <Icon
                                  as={
                                    transaction.type === "income"
                                      ? TrendingUpIcon
                                      : TrendingUpIcon
                                  }
                                  className={
                                    transaction.type === "income"
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                  }
                                  size={16}
                                />
                              </View>
                              <View className="flex-1">
                                <Text className="font-medium">
                                  {transaction.description}
                                </Text>
                                <Text
                                  className="text-muted-foreground"
                                  variant="small"
                                >
                                  {transaction.category} •{" "}
                                  {new Date(
                                    transaction.date
                                  ).toLocaleDateString()}
                                </Text>
                              </View>
                            </View>
                            <View className="items-end gap-2">
                              <Text
                                className={`font-semibold ${
                                  transaction.type === "income"
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {transaction.type === "income" ? "+" : "-"}
                                {formatCurrency(transaction.amount)}
                              </Text>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost">
                                    <Icon as={MoreHorizontalIcon} size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onPress={() => {
                                      router.push(
                                        `/finance/edit-transaction?transactionId=${transaction.id}`
                                      );
                                    }}
                                  >
                                    <Icon as={EditIcon} size={16} />
                                    <Text>Edit</Text>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600 dark:text-red-400"
                                    onPress={() => {
                                      deleteTransaction(transaction.id);
                                    }}
                                  >
                                    <Icon as={TrashIcon} size={16} />
                                    <Text>Delete</Text>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </View>
                          </View>
                        </CardContent>
                      </Card>
                    ))}
                  </View>
                ) : (
                  <Card>
                    <CardContent>
                      <View className="items-center gap-4 py-8">
                        <Icon
                          as={BarChart3Icon}
                          className="text-muted-foreground"
                          size={48}
                        />
                        <View className="items-center gap-2">
                          <Text className="font-semibold">
                            No transactions yet
                          </Text>
                          <Text className="text-center" variant="muted">
                            Start tracking your income and expenses
                          </Text>
                        </View>
                        <Button
                          onPress={() =>
                            router.push("/finance/add-transaction")
                          }
                        >
                          <Icon as={PlusIcon} size={16} />
                          <Text>Add Transaction</Text>
                        </Button>
                      </View>
                    </CardContent>
                  </Card>
                )}
              </View>
            </TabsContent>

            <TabsContent className="flex-1" value="budgets">
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <Text variant="h3">Budget Categories</Text>
                  <Button
                    onPress={() => router.push("/finance/add-budget")}
                    size="sm"
                  >
                    <Icon as={PlusIcon} size={16} />
                    <Text>Add</Text>
                  </Button>
                </View>

                {budgetCategories.length > 0 ? (
                  <View className="gap-3">
                    {budgetCategories.map((category) => {
                      const percentage =
                        (category.spent / category.budget) * 100;
                      const isOverBudget = category.spent > category.budget;

                      return (
                        <Card key={category.id}>
                          <CardContent className="p-4">
                            <View className="gap-3">
                              <View className="flex-row items-center justify-between">
                                <Text className="flex-1 font-semibold">
                                  {category.name}
                                </Text>
                                <View className="items-end gap-2">
                                  <Text
                                    className={`font-semibold ${isOverBudget ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
                                  >
                                    {formatCurrency(category.spent)} /{" "}
                                    {formatCurrency(category.budget)}
                                  </Text>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button size="sm" variant="ghost">
                                        <Icon
                                          as={MoreHorizontalIcon}
                                          size={16}
                                        />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem
                                        onPress={() => {
                                          router.push(
                                            `/finance/edit-budget?budgetId=${category.id}`
                                          );
                                        }}
                                      >
                                        <Icon as={EditIcon} size={16} />
                                        <Text>Edit</Text>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-red-600 dark:text-red-400"
                                        onPress={() => {
                                          deleteBudgetCategory(category.id);
                                        }}
                                      >
                                        <Icon as={TrashIcon} size={16} />
                                        <Text>Delete</Text>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </View>
                              </View>

                              <View className="gap-2">
                                <View className="flex-row items-center justify-between">
                                  <Text
                                    className="text-muted-foreground"
                                    variant="small"
                                  >
                                    {percentage.toFixed(0)}% used
                                  </Text>
                                  <Text
                                    className="text-muted-foreground"
                                    variant="small"
                                  >
                                    {category.period}
                                  </Text>
                                </View>

                                <View className="h-2 rounded-full bg-muted">
                                  <View
                                    className={`h-2 rounded-full ${
                                      isOverBudget
                                        ? "bg-red-500"
                                        : percentage > 80
                                          ? "bg-orange-500"
                                          : "bg-green-500"
                                    }`}
                                    style={{
                                      width: `${Math.min(percentage, 100)}%`,
                                    }}
                                  />
                                </View>
                              </View>
                            </View>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </View>
                ) : (
                  <Card>
                    <CardContent>
                      <View className="items-center gap-4 py-8">
                        <Icon
                          as={BarChart3Icon}
                          className="text-muted-foreground"
                          size={48}
                        />
                        <View className="items-center gap-2">
                          <Text className="font-semibold">No budgets set</Text>
                          <Text className="text-center" variant="muted">
                            Create budget categories to track your spending
                          </Text>
                        </View>
                        <Button>
                          <Icon as={PlusIcon} size={16} />
                          <Text>Create Budget</Text>
                        </Button>
                      </View>
                    </CardContent>
                  </Card>
                )}
              </View>
            </TabsContent>
          </Tabs>
        </View>
      </ScrollView>
    </Container>
  );
}
