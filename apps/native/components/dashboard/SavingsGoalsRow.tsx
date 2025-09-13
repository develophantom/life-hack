import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { TargetIcon, PlusIcon } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface SavingsGoal {
	id: string;
	name: string;
	targetAmount: number;
	currentAmount: number;
	deadline: string;
	category: string;
	icon: string;
}

interface SavingsGoalsRowProps {
	goals: SavingsGoal[];
	onAddGoal?: () => void;
	onEditGoal?: (goal: SavingsGoal) => void;
}

export function SavingsGoalsRow({ goals, onAddGoal, onEditGoal }: SavingsGoalsRowProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(amount);
	};

	const handleAddGoal = () => {
		if (onAddGoal) {
			onAddGoal();
		} else {
			router.push('/finance/add-budget');
		}
	};

	return (
		<View className="space-y-4">
			<View className="flex-row items-center justify-between">
				<View className="flex-row items-center gap-2">
					<View className="w-8 h-8 rounded-xl bg-chart-1/20 items-center justify-center">
						<Icon as={TargetIcon} className="text-chart-1" size={18} />
					</View>
					<Text className="text-foreground font-semibold text-lg">Savings Goals</Text>
				</View>
				<Button variant="ghost" size="sm" onPress={handleAddGoal}>
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
					<Button onPress={handleAddGoal}>
						<Icon as={TargetIcon} className="text-primary-foreground" size={16} />
						<Text className="text-primary-foreground font-semibold ml-2">Create Goal</Text>
					</Button>
				</View>
			) : (
				<ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
					<View className="flex-row gap-4 px-1">
						{goals.map((goal) => {
							const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

							return (
								<TouchableOpacity
									key={goal.id}
									className="bg-card rounded-2xl p-4 w-48 shadow-xl"
									onPress={() => onEditGoal?.(goal)}
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
										<View className="w-16 h-16 rounded-2xl border-2 border-chart-1 items-center justify-center">
											<Text className="text-2xl">{goal.icon}</Text>
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

										{/* Progress Bar */}
										<View className="w-full">
											<View className="h-2 bg-muted rounded-full overflow-hidden">
												<View
													className="h-full bg-chart-1 rounded-full"
													style={{ width: `${progress}%` }}
												/>
											</View>
											<Text className="text-muted-foreground text-xs mt-1 text-center">
												{Math.round(progress)}% complete
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
