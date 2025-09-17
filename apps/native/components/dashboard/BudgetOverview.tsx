import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	TargetIcon,
	TrendingUpIcon,
	TrendingDownIcon,
	AlertTriangleIcon,
	CheckCircleIcon,
	PlusIcon
} from "lucide-react-native";

interface Budget {
	id: string;
	name: string;
	category: string;
	budgetAmount: number;
	spentAmount: number;
	period: "monthly" | "weekly" | "yearly";
	color: string;
	icon: string;
}

interface BudgetOverviewProps {
	budgets: Budget[];
	onAddBudget?: () => void;
	onEditBudget?: (budget: Budget) => void;
}

export function BudgetOverview({ budgets, onAddBudget, onEditBudget }: BudgetOverviewProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	const getBudgetStatus = (spent: number, budget: number) => {
		const percentage = (spent / budget) * 100;
		if (percentage >= 100) return { status: "over", color: "text-destructive", icon: AlertTriangleIcon };
		if (percentage >= 80) return { status: "warning", color: "text-chart-1", icon: AlertTriangleIcon };
		if (percentage >= 50) return { status: "good", color: "text-chart-2", icon: TrendingUpIcon };
		return { status: "excellent", color: "text-chart-3", icon: CheckCircleIcon };
	};

	const getTotalBudget = () => {
		return budgets.reduce((sum, budget) => sum + budget.budgetAmount, 0);
	};

	const getTotalSpent = () => {
		return budgets.reduce((sum, budget) => sum + budget.spentAmount, 0);
	};

	const getOverallProgress = () => {
		const totalBudget = getTotalBudget();
		const totalSpent = getTotalSpent();
		return totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
	};

	const getBudgetColor = (category: string) => {
		switch (category.toLowerCase()) {
			case "essential":
				return "text-chart-1";
			case "lifestyle":
				return "text-chart-2";
			case "food":
				return "text-chart-3";
			case "transportation":
				return "text-chart-4";
			case "entertainment":
				return "text-chart-5";
			default:
				return "text-primary";
		}
	};

	return (
		<View className="space-y-4">
			<View className="flex-row items-center justify-between">
				<Text className="text-foreground text-lg font-semibold">Budget Plan</Text>
				<Button variant="ghost" size="sm" onPress={onAddBudget}>
					<Text className="text-muted-foreground text-sm">+ Add New</Text>
				</Button>
			</View>

			{budgets.length === 0 ? (
				<View className="bg-card rounded-2xl p-6 items-center">
					<Icon as={TargetIcon} className="text-muted-foreground mb-4" size={48} />
					<Text className="text-card-foreground font-semibold mb-2">No Budgets Set</Text>
					<Text className="text-muted-foreground text-center mb-4">
						Create your first budget to start tracking your spending
					</Text>
					<Button onPress={onAddBudget}>
						<Icon as={TargetIcon} className="text-primary-foreground" size={16} />
						<Text className="text-primary-foreground font-semibold ml-2">Create Budget</Text>
					</Button>
				</View>
			) : (
				<ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
					<View className="flex-row gap-4 px-1">
						{budgets.map((budget) => {
							const progress = (budget.spentAmount / budget.budgetAmount) * 100;
							const remaining = budget.budgetAmount - budget.spentAmount;

							return (
								<View key={budget.id} className="bg-card rounded-2xl p-4 w-48 shadow-xl">
									<View className="items-center space-y-3">
										{/* Icon */}
										<View className={`w-16 h-16 rounded-2xl border-2 ${getBudgetColor(budget.category)} border-current items-center justify-center`}>
											<Text className="text-2xl">{budget.icon}</Text>
										</View>

										{/* Budget Name */}
										<Text className="text-card-foreground font-semibold text-center text-base">
											{budget.name}
										</Text>

										{/* Spent Amount */}
										<View className="items-center">
											<Text className="text-card-foreground font-bold text-lg">
												{formatCurrency(budget.spentAmount)}
											</Text>
											<Text className="text-muted-foreground text-sm">
												/ {formatCurrency(budget.budgetAmount)}
											</Text>
										</View>

										{/* Progress Bar */}
										<View className="w-full">
											<View className="h-2 bg-muted rounded-full overflow-hidden">
												<View
													className={`h-full ${getBudgetColor(budget.category).replace('text-', 'bg-')} rounded-full`}
													style={{ width: `${Math.min(progress, 100)}%` }}
												/>
											</View>
											<Text className="text-muted-foreground text-xs mt-1 text-center">
												{Math.round(progress)}% used
											</Text>
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
