import { router } from "expo-router";
import {
  CreditCardIcon,
  DollarSignIcon,
  SmartphoneIcon,
  WalletIcon,
} from "lucide-react-native";
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

type AccountFormData = {
  name: string;
  type: "bank" | "cash" | "credit" | "mobile";
  balance: string;
  currency: string;
};

const ACCOUNT_TYPES = [
  { label: "Bank Account", value: "bank", icon: WalletIcon },
  { label: "Credit Card", value: "credit", icon: CreditCardIcon },
  { label: "Cash", value: "cash", icon: DollarSignIcon },
  { label: "Mobile Payment", value: "mobile", icon: SmartphoneIcon },
];

const CURRENCIES = [
  { label: "USD ($)", value: "USD" },
  { label: "EUR (€)", value: "EUR" },
  { label: "GBP (£)", value: "GBP" },
  { label: "JPY (¥)", value: "JPY" },
  { label: "CAD (C$)", value: "CAD" },
];

export default function AddAccountScreen() {
  const { addAccount } = useDashboardStore();
  const [formData, setFormData] = useState<AccountFormData>({
    name: "",
    type: "bank",
    balance: "0",
    currency: "USD",
  });

  const [errors, setErrors] = useState<Partial<AccountFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<AccountFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter an account name";
    }
    if (!formData.balance || isNaN(Number(formData.balance))) {
      newErrors.balance = "Please enter a valid balance";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    addAccount({
      name: formData.name.trim(),
      type: formData.type,
      balance: Number(formData.balance),
      currency: formData.currency,
    });

    router.back();
  };

  const selectedAccountType = ACCOUNT_TYPES.find(
    (type) => type.value === formData.type
  );

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Account</CardTitle>
            </CardHeader>
            <CardContent className="gap-4">
              {/* Account Name */}
              <View className="gap-2">
                <Label>Account Name</Label>
                <Input
                  onChangeText={(value) =>
                    setFormData({ ...formData, name: value })
                  }
                  placeholder="e.g., Chase Checking, Cash Wallet"
                  value={formData.name}
                />
                {errors.name && (
                  <Text className="text-red-500" variant="small">
                    {errors.name}
                  </Text>
                )}
              </View>

              {/* Account Type */}
              <View className="gap-2">
                <Label>Account Type</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      type: value as AccountFormData["type"],
                    })
                  }
                  value={formData.type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCOUNT_TYPES.map((type) => (
                      <SelectItem
                        key={type.value}
                        label={type.label}
                        value={type.value}
                      >
                        <View className="flex-row items-center gap-2">
                          <Icon as={type.icon} size={16} />
                          <Text>{type.label}</Text>
                        </View>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </View>

              {/* Currency */}
              <View className="gap-2">
                <Label>Currency</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, currency: value })
                  }
                  value={formData.currency}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((currency) => (
                      <SelectItem
                        key={currency.value}
                        label={currency.label}
                        value={currency.value}
                      >
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </View>

              {/* Initial Balance */}
              <View className="gap-2">
                <Label>Initial Balance</Label>
                <View className="relative">
                  <Input
                    className="pl-8"
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      setFormData({ ...formData, balance: value })
                    }
                    placeholder="0.00"
                    value={formData.balance}
                  />
                  <Icon
                    as={DollarSignIcon}
                    className="absolute top-3 left-3 text-muted-foreground"
                    size={16}
                  />
                </View>
                {errors.balance && (
                  <Text className="text-red-500" variant="small">
                    {errors.balance}
                  </Text>
                )}
              </View>

              {/* Account Preview */}
              <Card className="bg-muted/50">
                <CardContent className="p-3">
                  <View className="flex-row items-center gap-3">
                    <Icon
                      as={selectedAccountType?.icon || WalletIcon}
                      className="text-primary"
                      size={24}
                    />
                    <View className="flex-1">
                      <Text className="font-medium">
                        {formData.name || "Account Name"}
                      </Text>
                      <Text className="text-muted-foreground" variant="small">
                        {selectedAccountType?.label || "Account Type"}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="font-bold text-lg">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: formData.currency,
                        }).format(Number(formData.balance) || 0)}
                      </Text>
                      <Text className="text-muted-foreground" variant="small">
                        {formData.currency}
                      </Text>
                    </View>
                  </View>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <View className="gap-3">
            <Button className="w-full" onPress={handleSubmit}>
              <Text>Add Account</Text>
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
