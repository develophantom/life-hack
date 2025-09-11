import { router } from "expo-router";
import {
  BanknoteIcon,
  CreditCardIcon,
  SmartphoneIcon,
  WalletIcon,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

const ACCOUNT_TYPES = [
  {
    id: "bank",
    name: "Bank Account",
    icon: BanknoteIcon,
    description: "Checking, savings, or investment accounts",
  },
  {
    id: "cash",
    name: "Cash",
    icon: WalletIcon,
    description: "Physical cash and loose change",
  },
  {
    id: "credit",
    name: "Credit Card",
    icon: CreditCardIcon,
    description: "Credit cards and lines of credit",
  },
  {
    id: "mobile",
    name: "Mobile Money",
    icon: SmartphoneIcon,
    description: "M-Pesa, PayPal, Venmo, etc.",
  },
];

export default function FinancialSetupScreen() {
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [balances, setBalances] = useState<Record<string, string>>({});

  const handleAccountToggle = (accountId: string) => {
    setSelectedAccounts((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleBalanceChange = (accountId: string, value: string) => {
    setBalances((prev) => ({
      ...prev,
      [accountId]: value,
    }));
  };

  const handleContinue = () => {
    // TODO: Save financial data
    router.push("/onboarding/habits");
  };

  const handleSkip = () => {
    router.push("/onboarding/habits");
  };

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <View className="gap-8">
          {/* Header */}
          <View className="items-center gap-4">
            <View className="rounded-full bg-primary p-4">
              <Icon
                as={BanknoteIcon}
                className="text-primary-foreground"
                size={24}
              />
            </View>
            <View className="items-center gap-2">
              <Text variant="h2">Financial Setup</Text>
              <Text className="text-center" variant="muted">
                Add the accounts you use
              </Text>
            </View>
          </View>

          {/* Progress Indicator */}
          <View className="flex-row items-center justify-center gap-2">
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-8 rounded-full bg-primary" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
          </View>

          {/* Account Types */}
          <Card>
            <CardHeader>
              <CardTitle>Account Types</CardTitle>
            </CardHeader>
            <CardContent className="gap-4">
              {ACCOUNT_TYPES.map((account) => (
                <View className="gap-3" key={account.id}>
                  <Button
                    className="w-full justify-start"
                    onPress={() => handleAccountToggle(account.id)}
                    variant={
                      selectedAccounts.includes(account.id)
                        ? "default"
                        : "outline"
                    }
                  >
                    <Icon as={account.icon} size={20} />
                    <View className="flex-1 items-start">
                      <Text className="font-semibold">{account.name}</Text>
                      <Text className="text-muted-foreground" variant="small">
                        {account.description}
                      </Text>
                    </View>
                  </Button>

                  {selectedAccounts.includes(account.id) && (
                    <View className="gap-2 pl-8">
                      <Text className="font-medium">Starting Balance</Text>
                      <Input
                        keyboardType="numeric"
                        onChangeText={(value) =>
                          handleBalanceChange(account.id, value)
                        }
                        placeholder="0.00"
                        value={balances[account.id] || ""}
                      />
                    </View>
                  )}
                </View>
              ))}
            </CardContent>
          </Card>

          {/* Quick Presets */}
          {selectedAccounts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Quick Presets</CardTitle>
              </CardHeader>
              <CardContent>
                <View className="flex-row gap-2">
                  <Button
                    onPress={() => {
                      selectedAccounts.forEach((accountId) => {
                        handleBalanceChange(accountId, "0");
                      });
                    }}
                    size="sm"
                    variant="outline"
                  >
                    <Text>Set to $0</Text>
                  </Button>
                  <Button
                    onPress={() => {
                      selectedAccounts.forEach((accountId) => {
                        handleBalanceChange(accountId, "1000");
                      });
                    }}
                    size="sm"
                    variant="outline"
                  >
                    <Text>Set to $1000</Text>
                  </Button>
                </View>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <View className="gap-3">
            <Button className="w-full" onPress={handleContinue}>
              <Text>Continue</Text>
            </Button>

            <Button onPress={handleSkip} variant="ghost">
              <Text>I'll add accounts later</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
