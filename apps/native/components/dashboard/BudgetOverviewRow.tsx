import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { BarChart3Icon, TargetIcon } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface Budget {
	id: string;
	name: string;
	category: string;
	budgetAmount: number;
	spentAmount: number;
	period: 'monthly' | 'weekly' | 'yearly';
	color: string;
	icon: string;
}

interface BudgetOverviewRowProps {
	budgets: Budget[];
	onAddBudget?: () => void;
	onEditBudget?: (budget: Budget) => void;
}

export function BudgetOverviewRow({ budgets, onAddBudget, onEditBudget }: BudgetOverviewRowProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(amount);
	};

	const handleAddBudget = () => {
		if (onAddBudget) {
			onAddBudget();
		} else {
			router.push('/finance/add-budget');
		}
	};

	return (
		<View className="space-y-4">
			<View className="flex-row items-center justify-between">
				<View className="flex-row items-center gap-2">
					<View className="w-8 h-8 rounded-xl bg-chart-3/20 items-center justify-center">
						<Icon as={BarChart3Icon} className="text-chart-3" size={18} />
					</View>
					<Text className="text-foreground font-semibold text-lg">Budget Plan</Text>
				</View>
				<Button variant="ghost" size="sm" onPress={handleAddBudget}>
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
					<Button onPress={handleAddBudget}>
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
								<TouchableOpacity
									key={budget.id}
									className="bg-card rounded-2xl p-4 w-48 shadow-xl"
									onPress={() => onEditBudget?.(budget)}
									style={{
										shadowColor: '#000',
										shadowOffset: { width: 0, height: 2 },
										shadowOpacity: 0.1,
										shadowRadius: 8,
										elevation: 3,
									}}
								>
									<View className="items-center space-y-3">
										{/* Icon */}
										<View className="w-16 h-16 rounded-2xl border-2 border-chart-3 items-center justify-center">
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
													className="h-full bg-chart-3 rounded-full"
													style={{ width: `${Math.min(progress, 100)}%` }}
												/>
											</View>
											<Text className="text-muted-foreground text-xs mt-1 text-center">
												{Math.round(progress)}% used
											</Text>
										</View>
									</View>
								</TouchableOpacity>
							);
						})}
					</View>
				</ScrollView>
			)}
		</View>
	);
}
