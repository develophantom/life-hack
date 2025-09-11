import {
  BarChart3Icon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

export function WeeklyFinanceSummary() {
  const { transactions } = useDashboardStore();

  // Get transactions from the last 7 days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();

  // Calculate daily totals
  const dailyData = last7Days.map((date) => {
    const dayTransactions = transactions.filter((tx) => tx.date === date);
    const income = dayTransactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);
    const expenses = dayTransactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      date,
      income,
      expenses,
      net: income - expenses,
    };
  });

  // Calculate totals
  const totalIncome = dailyData.reduce((sum, day) => sum + day.income, 0);
  const totalExpenses = dailyData.reduce((sum, day) => sum + day.expenses, 0);
  const netFlow = totalIncome - totalExpenses;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const getMaxAmount = () => {
    const maxIncome = Math.max(...dailyData.map((d) => d.income));
    const maxExpenses = Math.max(...dailyData.map((d) => d.expenses));
    return Math.max(maxIncome, maxExpenses);
  };

  const maxAmount = getMaxAmount();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex-row items-center gap-2">
          <Icon as={BarChart3Icon} className="text-primary" size={20} />
          <Text>Weekly Finance Summary</Text>
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-4">
        {/* Summary Stats */}
        <View className="grid grid-cols-3 gap-4">
          <View className="items-center gap-2">
            <Icon as={TrendingUpIcon} className="text-green-500" size={20} />
            <Text className="font-semibold text-green-600">
              {formatCurrency(totalIncome)}
            </Text>
            <Text className="text-muted-foreground" variant="small">
              Total Income
            </Text>
          </View>

          <View className="items-center gap-2">
            <Icon as={TrendingDownIcon} className="text-red-500" size={20} />
            <Text className="font-semibold text-red-600">
              {formatCurrency(totalExpenses)}
            </Text>
            <Text className="text-muted-foreground" variant="small">
              Total Expenses
            </Text>
          </View>

          <View className="items-center gap-2">
            <Icon
              as={netFlow >= 0 ? TrendingUpIcon : TrendingDownIcon}
              className={netFlow >= 0 ? "text-green-500" : "text-red-500"}
              size={20}
            />
            <Text
              className={`font-semibold ${
                netFlow >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(Math.abs(netFlow))}
            </Text>
            <Text className="text-muted-foreground" variant="small">
              Net Flow
            </Text>
          </View>
        </View>

        {/* Daily Chart */}
        <View className="gap-3">
          <Text className="font-medium">Daily Breakdown</Text>
          <View className="gap-2">
            {dailyData.map((day, index) => {
              const incomeHeight =
                maxAmount > 0 ? (day.income / maxAmount) * 100 : 0;
              const expenseHeight =
                maxAmount > 0 ? (day.expenses / maxAmount) * 100 : 0;

              return (
                <View className="gap-2" key={day.date}>
                  <View className="flex-row items-center justify-between">
                    <Text className="font-medium" variant="small">
                      {formatDate(day.date)}
                    </Text>
                    <Text className="font-semibold" variant="small">
                      {formatCurrency(day.net)}
                    </Text>
                  </View>

                  <View className="h-8 flex-row items-end gap-1">
                    {/* Income Bar */}
                    <View className="flex-1 flex-row items-end gap-1">
                      <View
                        className="rounded-t bg-green-500"
                        style={{
                          height: `${incomeHeight}%`,
                          minHeight: incomeHeight > 0 ? 4 : 0,
                        }}
                      />
                    </View>

                    {/* Expense Bar */}
                    <View className="flex-1 flex-row items-end gap-1">
                      <View
                        className="rounded-t bg-red-500"
                        style={{
                          height: `${expenseHeight}%`,
                          minHeight: expenseHeight > 0 ? 4 : 0,
                        }}
                      />
                    </View>
                  </View>

                  <View className="flex-row justify-between">
                    <Text className="text-green-600" variant="small">
                      +{formatCurrency(day.income)}
                    </Text>
                    <Text className="text-red-600" variant="small">
                      -{formatCurrency(day.expenses)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Legend */}
        <View className="flex-row items-center justify-center gap-4 border-border border-t pt-2">
          <View className="flex-row items-center gap-2">
            <View className="h-3 w-3 rounded bg-green-500" />
            <Text className="text-muted-foreground" variant="small">
              Income
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="h-3 w-3 rounded bg-red-500" />
            <Text className="text-muted-foreground" variant="small">
              Expenses
            </Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
