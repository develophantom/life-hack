import React from "react";
import { router, Link } from "expo-router";
import { HeartIcon, TrendingUpIcon, ZapIcon, ArrowRightIcon } from "lucide-react-native";
import { View, ScrollView } from "react-native";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { fontStyles } from "@/lib/fonts";

export default function WelcomeScreen() {
  return (
    <Container>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-between px-8 py-12">
          {/* Top Section */}
          <View className="flex-1 justify-center">
            {/* Main Message */}
            <View className="mb-20">
              <Text
                className="text-4xl leading-tight mb-4 text-start"
                style={fontStyles.black}
              >
                Build Better Habits
              </Text>
              <Text
                className="text-lg text-muted-foreground text-center leading-relaxed px-4"
                style={fontStyles.regular}
              >
                Track your progress, optimize your finances, and achieve your goals with intelligent insights.
              </Text>
            </View>

            {/* Simple Feature List */}
            <View className="gap-6 mb-8">
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 rounded-xl bg-primary/10 items-center justify-center">
                  <Icon as={TrendingUpIcon} className="text-primary" size={24} />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-lg mb-1"
                    style={fontStyles.bold}
                  >
                    Habit Tracking
                  </Text>
                  <Text
                    className="text-muted-foreground"
                    style={fontStyles.regular}
                  >
                    Build consistent routines
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 rounded-xl bg-primary/10 items-center justify-center">
                  <Icon as={ZapIcon} className="text-primary" size={24} />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-lg mb-1"
                    style={fontStyles.bold}
                  >
                    Smart Finance
                  </Text>
                  <Text
                    className="text-muted-foreground"
                    style={fontStyles.regular}
                  >
                    Control your money flow
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 rounded-xl bg-primary/10 items-center justify-center">
                  <Icon as={HeartIcon} className="text-primary" size={24} />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-lg mb-1"
                    style={fontStyles.bold}
                  >
                    AI Insights
                  </Text>
                  <Text
                    className="text-muted-foreground"
                    style={fontStyles.regular}
                  >
                    Personalized recommendations
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Actions */}
          <View className="gap-4">
            <Link href="/onboarding/profile" asChild>
              <Button className="w-full h-14">
                <View className="flex-row items-center gap-3">
                  <Text
                    className="text-primary-foreground text-lg"
                    style={fontStyles.bold}
                  >
                    Get Started
                  </Text>
                  <Icon as={ArrowRightIcon} className="text-primary-foreground" size={20} />
                </View>
              </Button>
            </Link>

            <Link href="/(dashboard)" asChild>
              <Button variant="ghost" className="h-12">
                <Text
                  className="text-muted-foreground"
                  style={fontStyles.regular}
                >
                  Skip for now
                </Text>
              </Button>
            </Link>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
