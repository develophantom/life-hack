import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TargetIcon, TrendingUpIcon, CalendarIcon, DollarSignIcon } from "lucide-react-native";

interface SavingsGoal {
	id: string;
	name: string;
	targetAmount: number;
	currentAmount: number;
	deadline: string;
	category: string;
	icon: string;
}

interface SavingsGoalsProps {
	goals: SavingsGoal[];
	onAddGoal?: () => void;
	onEditGoal?: (goal: SavingsGoal) => void;
}

export function SavingsGoals({ goals, onAddGoal, onEditGoal }: SavingsGoalsProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	const getProgressPercentage = (current: number, target: number) => {
		return Math.min((current / target) * 100, 100);
	};

	const getGoalIcon = (category: string) => {
		switch (category.toLowerCase()) {
			case "vacation":
				return "✈️";
			case "emergency":
				return "🚨";
			case "house":
				return "🏠";
			case "car":
				return "🚗";
			case "education":
				return "🎓";
			case "macbook":
				return "💻";
			case "investment":
				return "📈";
			default:
				return "💰";
		}
	};

	const getGoalColor = (category: string) => {
		switch (category.toLowerCase()) {
			case "vacation":
				return "text-chart-1";
			case "emergency":
				return "text-chart-2";
			case "house":
				return "text-chart-3";
			case "car":
				return "text-chart-4";
			case "education":
				return "text-chart-5";
			case "macbook":
				return "text-chart-4";
			case "investment":
				return "text-chart-1";
			default:
				return "text-primary";
		}
	};

	return (
		<View className="space-y-4">
			<View className="flex-row items-center justify-between">
				<Text className="text-foreground text-lg font-semibold">Saving Plan</Text>
				<Button variant="ghost" size="sm" onPress={onAddGoal}>
					<Text className="text-muted-foreground text-sm">+ Add New</Text>
				</Button>
			</View>

			{goals.length === 0 ? (
				<View className="bg-card rounded-2xl p-6 items-center">
					<Icon as={TargetIcon} className="text-muted-foreground mb-4" size={48} />
					<Text className="text-card-foreground font-semibold mb-2">No Savings Goals Yet</Text>
					<Text className="text-muted-foreground text-center mb-4">
						Set your first savings goal to start building your financial future
					</Text>
					<Button onPress={onAddGoal}>
						<Icon as={TargetIcon} className="text-primary-foreground" size={16} />
						<Text className="text-primary-foreground font-semibold ml-2">Create Goal</Text>
					</Button>
				</View>
			) : (
				<ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
					<View className="flex-row gap-4 px-1">
						{goals.map((goal) => {
							const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);

							return (
								<View key={goal.id} className="bg-card rounded-2xl p-4 w-48 shadow-xl">
									<View className="items-center space-y-3">
										{/* Icon */}
										<View className={`w-16 h-16 rounded-2xl border-2 ${getGoalColor(goal.category)} border-current items-center justify-center`}>
											<Text className="text-2xl">{getGoalIcon(goal.category)}</Text>
										</View>

										{/* Goal Name */}
										<Text className="text-card-foreground font-semibold text-center text-base">
											{goal.name}
										</Text>

										{/* Progress Amount */}
										<View className="items-center">
											<Text className="text-card-foreground font-bold text-lg">
												{formatCurrency(goal.currentAmount)}
											</Text>
											{goal.targetAmount > 0 && (
												<Text className="text-muted-foreground text-sm">
													/ {formatCurrency(goal.targetAmount)}
												</Text>
											)}
										</View>
									</View>
								</View>
							);
						})}
					</View>
				</ScrollView>
			)}
		</View>
	);
}
