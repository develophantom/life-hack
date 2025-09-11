import { router } from "expo-router";
import { CalendarIcon, DollarSignIcon, TargetIcon } from "lucide-react-native";
import React, { useState } from "react";
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

const BUDGET_CATEGORIES = [
  { label: "Food & Dining", value: "food" },
  { label: "Transportation", value: "transportation" },
  { label: "Shopping", value: "shopping" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Bills & Utilities", value: "bills" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Education", value: "education" },
  { label: "Travel", value: "travel" },
  { label: "Other", value: "other" },
];

const PERIODS = [
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
];

export default function AddBudgetScreen() {
  const { addBudgetCategory } = useDashboardStore();
  const [formData, setFormData] = useState<BudgetFormData>({
    name: "",
    budget: "",
    period: "monthly",
  });

  const [errors, setErrors] = useState<Partial<BudgetFormData>>({});

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
    if (!validateForm()) return;

    addBudgetCategory({
      name: formData.name.trim(),
      budget: Number(formData.budget),
      spent: 0,
      period: formData.period,
    });

    router.back();
  };

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Budget Category</CardTitle>
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
              <Text>Add Budget</Text>
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
