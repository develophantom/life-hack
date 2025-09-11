import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { Container } from "@/components/container";

export default function Screen() {
  useEffect(() => {
    // Start onboarding flow
    router.push("/onboarding/welcome");
  }, []);

  return (
    <Container>
      <View className="flex-1 items-center justify-center">
        {/* Loading state while redirecting */}
      </View>
    </Container>
  );
}
