import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

const motivationalQuotes = [
  "Every small step counts towards your bigger goals.",
  "Progress, not perfection, is the key to success.",
  "Your habits shape your future, one day at a time.",
  "Financial freedom starts with mindful spending.",
  "Consistency is the mother of mastery.",
  "Small changes today lead to big results tomorrow.",
  "Your future self will thank you for today's choices.",
  "Success is the sum of small efforts repeated daily.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Your only limit is your mind.",
];

export function MotivationalQuote() {
  const [currentQuote, setCurrentQuote] = React.useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(
        motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
      );
    }, 30000); // Change quote every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg mx-4 mb-4">
      <Text className="text-center text-gray-700 dark:text-gray-300 italic">
        "{currentQuote}"
      </Text>
    </View>
  );
}