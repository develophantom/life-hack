import { router, useLocalSearchParams } from "expo-router";
import { CalendarIcon, DollarSignIcon, TargetIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

type BudgetFormData = {
  name: string;
  budget: string;
  period: "monthly" | "weekly";
};

const PERIODS = [
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
];

export default function EditBudgetScreen() {
  const { budgetId } = useLocalSearchParams<{ budgetId: string }>();
  const { budgetCategories, updateBudgetCategory } = useDashboardStore();

  const budget = budgetCategories.find((cat) => cat.id === budgetId);

  const [formData, setFormData] = useState<BudgetFormData>({
    name: "",
    budget: "",
    period: "monthly",
  });

  const [errors, setErrors] = useState<Partial<BudgetFormData>>({});

  useEffect(() => {
    if (budget) {
      setFormData({
        name: budget.name,
        budget: budget.budget.toString(),
        period: budget.period,
      });
    }
  }, [budget]);

  const validateForm = () => {
    const newErrors: Partial<BudgetFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter a budget name";
    }
    if (
      !formData.budget ||
      isNaN(Number(formData.budget)) ||
      Number(formData.budget) <= 0
    ) {
      newErrors.budget = "Please enter a valid budget amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!(validateForm() && budgetId)) return;

    updateBudgetCategory(budgetId, {
      name: formData.name.trim(),
      budget: Number(formData.budget),
      period: formData.period,
    });

    router.back();
  };

  if (!budget) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-center">Budget not found</Text>
          <Button className="mt-4" onPress={() => router.back()}>
            <Text>Go Back</Text>
          </Button>
        </View>
      </Container>
    );
  }

  const percentage = (budget.spent / budget.budget) * 100;
  const isOverBudget = budget.spent > budget.budget;

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Budget</CardTitle>
            </CardHeader>
            <CardContent className="gap-4">
              {/* Budget Name */}
              <View className="gap-2">
                <Label>Budget Name</Label>
                <View className="relative">
                  <Input
                    className="pl-8"
                    onChangeText={(value) =>
                      setFormData({ ...formData, name: value })
                    }
                    placeholder="e.g., Groceries, Entertainment"
                    value={formData.name}
                  />
                  <Icon
                    as={TargetIcon}
                    className="absolute top-3 left-3 text-muted-foreground"
                    size={16}
                  />
                </View>
                {errors.name && (
                  <Text className="text-red-500" variant="small">
                    {errors.name}
                  </Text>
                )}
              </View>

              {/* Budget Amount */}
              <View className="gap-2">
                <Label>Budget Amount</Label>
                <View className="relative">
                  <Input
                    className="pl-8"
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      setFormData({ ...formData, budget: value })
                    }
                    placeholder="0.00"
                    value={formData.budget}
                  />
                  <Icon
                    as={DollarSignIcon}
                    className="absolute top-3 left-3 text-muted-foreground"
                    size={16}
                  />
                </View>
                {errors.budget && (
                  <Text className="text-red-500" variant="small">
                    {errors.budget}
                  </Text>
                )}
              </View>

              {/* Budget Period */}
              <View className="gap-2">
                <Label>Budget Period</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      period: value as BudgetFormData["period"],
                    })
                  }
                  value={formData.period}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget period" />
                  </SelectTrigger>
                  <SelectContent>
                    {PERIODS.map((period) => (
                      <SelectItem
                        key={period.value}
                        label={period.label}
                        value={period.value}
                      >
                        <View className="flex-row items-center gap-2">
                          <Icon as={CalendarIcon} size={16} />
                          <Text>{period.label}</Text>
                        </View>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </View>

              {/* Current Status */}
              <Card className="bg-muted/50">
                <CardContent className="p-3">
                  <View className="gap-2">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-medium">Current Status</Text>
                      <Text
                        className={`font-semibold ${isOverBudget ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
                      >
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(budget.spent)}{" "}
                        /{" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(budget.budget)}
                      </Text>
                    </View>
                    <Text className="text-muted-foreground" variant="small">
                      {percentage.toFixed(0)}% used ({budget.period})
                    </Text>
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
                </CardContent>
              </Card>

              {/* Budget Preview */}
              <Card className="bg-muted/50">
                <CardContent className="p-3">
                  <View className="gap-2">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-medium">
                        {formData.name || "Budget Name"}
                      </Text>
                      <Text className="font-semibold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(formData.budget) || 0)}
                      </Text>
                    </View>
                    <Text className="text-muted-foreground" variant="small">
                      {formData.period === "monthly"
                        ? "Monthly Budget"
                        : "Weekly Budget"}
                    </Text>
                    <View className="h-2 rounded-full bg-muted">
                      <View
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: "0%" }}
                      />
                    </View>
                    <Text className="text-muted-foreground" variant="small">
                      0% used ($0.00 spent)
                    </Text>
                  </View>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <View className="gap-3">
            <Button className="w-full" onPress={handleSubmit}>
              <Text>Update Budget</Text>
            </Button>
            <Button
              className="w-full"
              onPress={() => router.back()}
              variant="outline"
            >
              <Text>Cancel</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
