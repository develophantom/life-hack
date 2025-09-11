import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export function SlackIcon() {
	return (
		<View className="w-12 h-12 rounded-2xl items-center justify-center bg-purple-600">
			{/* Slack "S" Icon */}
			<Text className="text-white font-bold text-lg">S</Text>
		</View>
	);
}