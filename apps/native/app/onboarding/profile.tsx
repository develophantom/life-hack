import React from "react";
import { router } from "expo-router";
import { UserIcon } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { useOnboardingStore } from "@/lib/onboarding-store";

const CURRENCIES = [
  { label: "US Dollar ($)", value: "USD" },
  { label: "Euro (€)", value: "EUR" },
  { label: "British Pound (£)", value: "GBP" },
  { label: "Japanese Yen (¥)", value: "JPY" },
  { label: "Canadian Dollar (C$)", value: "CAD" },
  { label: "Australian Dollar (A$)", value: "AUD" },
  { label: "Swiss Franc (CHF)", value: "CHF" },
  { label: "Chinese Yuan (¥)", value: "CNY" },
  { label: "Ghana Cedi (GH₵)", value: "GHS" },
];

const TIMEZONES = [
  { label: "UTC-12:00 (Baker Island)", value: "UTC-12" },
  { label: "UTC-11:00 (American Samoa)", value: "UTC-11" },
  { label: "UTC-10:00 (Hawaii)", value: "UTC-10" },
  { label: "UTC-09:00 (Alaska)", value: "UTC-9" },
  { label: "UTC-08:00 (Pacific Time)", value: "UTC-8" },
  { label: "UTC-07:00 (Mountain Time)", value: "UTC-7" },
  { label: "UTC-06:00 (Central Time)", value: "UTC-6" },
  { label: "UTC-05:00 (Eastern Time)", value: "UTC-5" },
  { label: "UTC-04:00 (Atlantic Time)", value: "UTC-4" },
  { label: "UTC-03:00 (Brazil)", value: "UTC-3" },
  { label: "UTC-02:00 (Mid-Atlantic)", value: "UTC-2" },
  { label: "UTC-01:00 (Azores)", value: "UTC-1" },
  { label: "UTC+00:00 (GMT)", value: "UTC+0" },
  { label: "UTC+01:00 (Central European)", value: "UTC+1" },
  { label: "UTC+02:00 (Eastern European)", value: "UTC+2" },
  { label: "UTC+03:00 (Moscow)", value: "UTC+3" },
  { label: "UTC+04:00 (Gulf)", value: "UTC+4" },
  { label: "UTC+05:00 (Pakistan)", value: "UTC+5" },
  { label: "UTC+06:00 (Bangladesh)", value: "UTC+6" },
  { label: "UTC+07:00 (Thailand)", value: "UTC+7" },
  { label: "UTC+08:00 (China)", value: "UTC+8" },
  { label: "UTC+09:00 (Japan)", value: "UTC+9" },
  { label: "UTC+10:00 (Australia East)", value: "UTC+10" },
  { label: "UTC+11:00 (Solomon Islands)", value: "UTC+11" },
  { label: "UTC+12:00 (New Zealand)", value: "UTC+12" },
];

export default function ProfileSetupScreen() {
  const { data, updateProfile } = useOnboardingStore();
  const [name, setName] = useState(data.name);
  const [currency, setCurrency] = useState(data.currency);
  const [timezone, setTimezone] = useState(data.timezone);

  const handleContinue = () => {
    updateProfile({ name, currency, timezone });
    router.push("/onboarding/financial");
  };

  const handleSkip = () => {
    router.push("/onboarding/financial");
  };

  return (
    <Container>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <View className="gap-8">
          {/* Header */}
          <View className="items-center gap-4">
            <View className="rounded-full bg-primary p-4">
              <Icon
                as={UserIcon}
                className="text-primary-foreground"
                size={24}
              />
            </View>
            <View className="items-center gap-2">
              <Text variant="h2">Quick Profile Setup</Text>
              <Text className="text-center" variant="muted">
                Tell us a bit about yourself
              </Text>
            </View>
          </View>

          {/* Progress Indicator */}
          <View className="flex-row items-center justify-center gap-2">
            <View className="h-2 w-8 rounded-full bg-primary" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
            <View className="h-2 w-2 rounded-full bg-muted" />
          </View>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="gap-2">
                <Text className="font-medium">Name</Text>
                <Input
                  onChangeText={setName}
                  placeholder="Enter your name"
                  value={name}
                />
              </View>

              <View className="gap-2">
                <Text className="font-medium">Currency</Text>
                <Select
                  onValueChange={(option) => option && setCurrency(option.value)}
                  value={CURRENCIES.find(curr => curr.value === currency)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((curr) => (
                      <SelectItem
                        key={curr.value}
                        label={curr.label}
                        value={curr.value}
                      >
                        {curr.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </View>

              <View className="gap-2">
                <Text className="font-medium">Time Zone</Text>
                <Select
                  onValueChange={(option) => option && setTimezone(option.value)}
                  value={TIMEZONES.find(tz => tz.value === timezone)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem
                        key={tz.value}
                        label={tz.label}
                        value={tz.value}
                      >
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </View>
            </CardContent>
          </Card>

          {/* Actions */}
          <View className="gap-3">
            <Button className="w-full" onPress={handleContinue}>
              <Text>Continue</Text>
            </Button>

            <Button onPress={handleSkip} variant="ghost">
              <Text>Skip for now</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
