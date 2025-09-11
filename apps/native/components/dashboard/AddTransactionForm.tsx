import {
  CalendarIcon,
  CreditCardIcon,
  DollarSignIcon,
  FileTextIcon,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
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
import { Textarea } from "@/components/ui/textarea";
import { useDashboardStore } from "@/lib/dashboard-store";

type TransactionFormData = {
  accountId: string;
  amount: string;
  description: string;
  category: string;
  type: "income" | "expense";
  date: string;
};

const TRANSACTION_CATEGORIES = [
  { label: "Food & Dining", value: "food" },
  { label: "Transportation", value: "transportation" },
  { label: "Shopping", value: "shopping" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Bills & Utilities", value: "bills" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Education", value: "education" },
  { label: "Travel", value: "travel" },
  { label: "Income", value: "income" },
  { label: "Other", value: "other" },
];

export function AddTransactionForm({ onClose }: { onClose: () => void }) {
  const { accounts, addTransaction } = useDashboardStore();
  const [formData, setFormData] = useState<TransactionFormData>({
    accountId: "",
    amount: "",
    description: "",
    category: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<Partial<TransactionFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<TransactionFormData> = {};

    if (!formData.accountId) {
      newErrors.accountId = "Please select an account";
    }
    if (
      !formData.amount ||
      isNaN(Number(formData.amount)) ||
      Number(formData.amount) <= 0
    ) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Please enter a description";
    }
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    addTransaction({
      accountId: formData.accountId,
      amount: Number(formData.amount),
      description: formData.description.trim(),
      category: formData.category,
      type: formData.type,
      date: formData.date,
    });

    onClose();
  };

  const selectedAccount = accounts.find((acc) => acc.id === formData.accountId);

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
      <View className="gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
          </CardHeader>
          <CardContent className="gap-4">
            {/* Transaction Type */}
            <View className="gap-2">
              <Label>Transaction Type</Label>
              <View className="flex-row gap-2">
                <Button
                  className="flex-1"
                  onPress={() => setFormData({ ...formData, type: "expense" })}
                  variant={formData.type === "expense" ? "default" : "outline"}
                >
                  <Icon as={CreditCardIcon} size={16} />
                  <Text>Expense</Text>
                </Button>
                <Button
                  className="flex-1"
                  onPress={() => setFormData({ ...formData, type: "income" })}
                  variant={formData.type === "income" ? "default" : "outline"}
                >
                  <Icon as={DollarSignIcon} size={16} />
                  <Text>Income</Text>
                </Button>
              </View>
            </View>

            {/* Account Selection */}
            <View className="gap-2">
              <Label>Account</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, accountId: value })
                }
                value={formData.accountId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem
                      key={account.id}
                      label={account.name}
                      value={account.id}
                    >
                      <View className="flex-row items-center gap-2">
                        <Text>{account.name}</Text>
                        <Text className="text-muted-foreground" variant="small">
                          ({account.type})
                        </Text>
                      </View>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.accountId && (
                <Text className="text-red-500" variant="small">
                  {errors.accountId}
                </Text>
              )}
            </View>

            {/* Amount */}
            <View className="gap-2">
              <Label>Amount</Label>
              <View className="relative">
                <Input
                  className="pl-8"
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    setFormData({ ...formData, amount: value })
                  }
                  placeholder="0.00"
                  value={formData.amount}
                />
                <Icon
                  as={DollarSignIcon}
                  className="absolute top-3 left-3 text-muted-foreground"
                  size={16}
                />
              </View>
              {errors.amount && (
                <Text className="text-red-500" variant="small">
                  {errors.amount}
                </Text>
              )}
            </View>

            {/* Description */}
            <View className="gap-2">
              <Label>Description</Label>
              <View className="relative">
                <Textarea
                  className="pl-8"
                  onChangeText={(value) =>
                    setFormData({ ...formData, description: value })
                  }
                  placeholder="Enter transaction description"
                  value={formData.description}
                />
                <Icon
                  as={FileTextIcon}
                  className="absolute top-3 left-3 text-muted-foreground"
                  size={16}
                />
              </View>
              {errors.description && (
                <Text className="text-red-500" variant="small">
                  {errors.description}
                </Text>
              )}
            </View>

            {/* Category */}
            <View className="gap-2">
              <Label>Category</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                value={formData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {TRANSACTION_CATEGORIES.map((category) => (
                    <SelectItem
                      key={category.value}
                      label={category.label}
                      value={category.value}
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <Text className="text-red-500" variant="small">
                  {errors.category}
                </Text>
              )}
            </View>

            {/* Date */}
            <View className="gap-2">
              <Label>Date</Label>
              <View className="relative">
                <Input
                  className="pl-8"
                  onChangeText={(value) =>
                    setFormData({ ...formData, date: value })
                  }
                  placeholder="YYYY-MM-DD"
                  value={formData.date}
                />
                <Icon
                  as={CalendarIcon}
                  className="absolute top-3 left-3 text-muted-foreground"
                  size={16}
                />
              </View>
            </View>

            {/* Account Balance Preview */}
            {selectedAccount && (
              <Card className="bg-muted/50">
                <CardContent className="p-3">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-medium">Account Balance</Text>
                    <Text className="font-semibold">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: selectedAccount.currency,
                      }).format(selectedAccount.balance)}
                    </Text>
                  </View>
                  <Text className="text-muted-foreground" variant="small">
                    {selectedAccount.name} ({selectedAccount.type})
                  </Text>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <View className="gap-3">
          <Button className="w-full" onPress={handleSubmit}>
            <Text>Add Transaction</Text>
          </Button>
          <Button className="w-full" onPress={onClose} variant="outline">
            <Text>Cancel</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
