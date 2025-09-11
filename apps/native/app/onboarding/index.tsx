import { router } from "expo-router";
import { HeartIcon, TrendingUpIcon, ZapIcon } from "lucide-react-native";
import { View } from "react-native";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push("/onboarding/profile");
  };

  return (
    <Container>
      <View className="flex-1 items-center justify-center gap-8 p-6">
        {/* Logo/Icon */}
        <View className="items-center gap-4">
          <View className="rounded-full bg-primary p-6">
            <Icon
              as={HeartIcon}
              className="text-primary-foreground"
              size={32}
            />
          </View>
          <Text className="text-center" variant="h1">
            Hack-Life
          </Text>
        </View>

        {/* Tagline */}
        <View className="items-center gap-2">
          <Text className="text-center" variant="h2">
            Track your habits, master your money
          </Text>
          <Text className="text-center" variant="lead">
            Your personal life tracker with AI-powered insights
          </Text>
        </View>

        {/* Benefits */}
        <Card className="w-full">
          <CardContent className="gap-4">
            <View className="flex-row items-center gap-3">
              <Icon as={TrendingUpIcon} className="text-primary" size={20} />
              <View className="flex-1">
                <Text className="font-semibold">Build lasting habits</Text>
                <Text variant="muted">Track progress and stay motivated</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <Icon as={ZapIcon} className="text-primary" size={20} />
              <View className="flex-1">
                <Text className="font-semibold">Achieve financial goals</Text>
                <Text variant="muted">
                  Smart budgeting and expense tracking
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <Icon as={HeartIcon} className="text-primary" size={20} />
              <View className="flex-1">
                <Text className="font-semibold">Get personalized insights</Text>
                <Text variant="muted">AI learns from your patterns</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* CTA */}
        <View className="w-full gap-3">
          <Button className="w-full" onPress={handleGetStarted}>
            <Text>Let's set up your dashboard</Text>
          </Button>

          <Button onPress={() => router.push("/dashboard")} variant="ghost">
            <Text>Skip setup for now</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
