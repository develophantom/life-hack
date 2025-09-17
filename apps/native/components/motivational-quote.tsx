import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { RefreshCwIcon } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";

interface MotivationalQuoteProps {
  quote: string;
  author: string;
  onRefresh?: () => void;
}

export default function MotivationalQuote({ quote, author, onRefresh }: MotivationalQuoteProps) {
  return (
    <TouchableOpacity
      onPress={onRefresh}
      disabled={!onRefresh}
      className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg mx-4 mb-4"
    >
      <View className="items-center gap-2">
        <Text className="text-center text-gray-700 dark:text-gray-300 italic text-base">
          "{quote}"
        </Text>
        <Text className="text-center text-gray-600 dark:text-gray-400 text-sm font-medium">
          — {author}
        </Text>
        {onRefresh && (
          <View className="absolute top-2 right-2">
            <Icon as={RefreshCwIcon} size={16} className="text-gray-500" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}