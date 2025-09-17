import React, { useState } from 'react';
import { View, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import {
	ArrowLeftIcon,
	TargetIcon,
	CalendarIcon,
	DollarSignIcon,
	TagIcon,
	SaveIcon,
	TrendingUpIcon,
	PiggyBankIcon,
	CarIcon,
	HomeIcon,
	PlaneIcon,
	GraduationCapIcon,
	HeartIcon,
	BriefcaseIcon
} from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/container';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';

const SAVINGS_CATEGORIES = [
	{ id: 'emergency', name: 'Emergency Fund', icon: '🛡️', color: 'bg-chart-1' },
	{ id: 'vacation', name: 'Vacation', icon: '✈️', color: 'bg-chart-2' },
	{ id: 'home', name: 'Home Purchase', icon: '🏠', color: 'bg-chart-3' },
	{ id: 'car', name: 'Car Purchase', icon: '🚗', color: 'bg-chart-4' },
	{ id: 'education', name: 'Education', icon: '🎓', color: 'bg-chart-5' },
	{ id: 'wedding', name: 'Wedding', icon: '💒', color: 'bg-chart-6' },
	{ id: 'retirement', name: 'Retirement', icon: '💰', color: 'bg-chart-1' },
	{ id: 'investment', name: 'Investment', icon: '📈', color: 'bg-chart-2' },
	{ id: 'other', name: 'Other', icon: '🎯', color: 'bg-muted' },
];

const FREQUENCY_OPTIONS = [
	{ value: 'weekly', label: 'Weekly' },
	{ value: 'monthly', label: 'Monthly' },
	{ value: 'quarterly', label: 'Quarterly' },
	{ value: 'yearly', label: 'Yearly' },
];

export default function AddSavingScreen() {
	const [goalName, setGoalName] = useState('');
	const [targetAmount, setTargetAmount] = useState('');
	const [currentAmount, setCurrentAmount] = useState('');
	const [deadline, setDeadline] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [contributionFrequency, setContributionFrequency] = useState('monthly');
	const [contributionAmount, setContributionAmount] = useState('');
	const [notes, setNotes] = useState('');

	const formatCurrency = (amount: string) => {
		const num = parseFloat(amount.replace(/[^0-9.-]+/g, ''));
		return isNaN(num) ? '' : new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(num);
	};

	const handleSave = () => {
		// TODO: Implement save logic
		console.log('Saving goal:', {
			goalName,
			targetAmount,
			currentAmount,
			deadline,
			selectedCategory,
			contributionFrequency,
			contributionAmount,
			notes,
		});

		// Navigate back to finance screen
		router.back();
	};

	const calculateTimeToGoal = () => {
		const target = parseFloat(targetAmount.replace(/[^0-9.-]+/g, ''));
		const current = parseFloat(currentAmount.replace(/[^0-9.-]+/g, ''));
		const contribution = parseFloat(contributionAmount.replace(/[^0-9.-]+/g, ''));

		if (target && current && contribution && contribution > 0) {
			const remaining = target - current;
			const months = Math.ceil(remaining / contribution);
			return months;
		}
		return null;
	};

	const monthsToGoal = calculateTimeToGoal();

	return (
		<Container>
			<StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

			{/* Header */}
			<View className="px-6 pt-4 pb-6 bg-background">
				<View className="flex-row items-center justify-between mb-6">
					<TouchableOpacity
						onPress={() => router.back()}
						className="w-10 h-10 rounded-full bg-muted items-center justify-center"
					>
						<Icon as={ArrowLeftIcon} className="text-foreground" size={20} />
					</TouchableOpacity>

					<View className="items-center">
						<Text className="text-foreground text-xl font-bold">New Savings Goal</Text>
						<Text className="text-muted-foreground text-sm">Plan your financial future</Text>
					</View>

					<View className="w-10" />
				</View>
			</View>

			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				<View className="px-6 space-y-6">
					{/* Goal Overview Card */}
					<Card className="p-6 bg-gradient-to-br from-chart-1/5 to-chart-2/5 border-chart-1/20">
						<View className="flex-row items-center gap-3 mb-4">
							<View className="w-12 h-12 rounded-2xl bg-chart-1/20 items-center justify-center">
								<Icon as={TargetIcon} className="text-chart-1" size={24} />
							</View>
							<View className="flex-1">
								<Text className="text-foreground font-bold text-lg">Goal Overview</Text>
								<Text className="text-muted-foreground text-sm">Set your savings target and timeline</Text>
							</View>
						</View>

						<View className="space-y-4">
							{/* Goal Name */}
							<View>
								<Text className="text-foreground font-medium mb-2">Goal Name</Text>
								<Input
									value={goalName}
									onChangeText={setGoalName}
									placeholder="e.g., Emergency Fund, Vacation to Europe"
									className="bg-background"
								/>
							</View>

							{/* Target Amount */}
							<View>
								<Text className="text-foreground font-medium mb-2">Target Amount</Text>
								<View className="relative">
									<Input
										value={targetAmount}
										onChangeText={setTargetAmount}
										placeholder="$10,000"
										keyboardType="numeric"
										className="bg-background pl-10"
									/>
									<View className="absolute left-3 top-3">
										<Icon as={DollarSignIcon} className="text-muted-foreground" size={20} />
									</View>
								</View>
							</View>

							{/* Current Amount */}
							<View>
								<Text className="text-foreground font-medium mb-2">Current Amount</Text>
								<View className="relative">
									<Input
										value={currentAmount}
										onChangeText={setCurrentAmount}
										placeholder="$500"
										keyboardType="numeric"
										className="bg-background pl-10"
									/>
									<View className="absolute left-3 top-3">
										<Icon as={PiggyBankIcon} className="text-muted-foreground" size={20} />
									</View>
								</View>
							</View>

							{/* Deadline */}
							<View>
								<Text className="text-foreground font-medium mb-2">Target Date</Text>
								<View className="relative">
									<Input
										value={deadline}
										onChangeText={setDeadline}
										placeholder="2025-12-31"
										className="bg-background pl-10"
									/>
									<View className="absolute left-3 top-3">
										<Icon as={CalendarIcon} className="text-muted-foreground" size={20} />
									</View>
								</View>
							</View>
						</View>
					</Card>

					{/* Category Selection */}
					<Card className="p-6">
						<View className="flex-row items-center gap-3 mb-4">
							<View className="w-12 h-12 rounded-2xl bg-chart-3/20 items-center justify-center">
								<Icon as={TagIcon} className="text-chart-3" size={24} />
							</View>
							<View className="flex-1">
								<Text className="text-foreground font-bold text-lg">Category</Text>
								<Text className="text-muted-foreground text-sm">Choose a category for your goal</Text>
							</View>
						</View>

						<View className="flex-row flex-wrap gap-3">
							{SAVINGS_CATEGORIES.map((category) => (
								<TouchableOpacity
									key={category.id}
									onPress={() => setSelectedCategory(category.id)}
									className={`p-4 rounded-2xl border-2 ${selectedCategory === category.id
										? 'border-chart-1 bg-chart-1/10'
										: 'border-border bg-card'
										}`}
								>
									<View className="items-center space-y-2">
										<Text className="text-2xl">{category.icon}</Text>
										<Text className={`text-sm font-medium text-center ${selectedCategory === category.id ? 'text-chart-1' : 'text-card-foreground'
											}`}>
											{category.name}
										</Text>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</Card>

					{/* Contribution Plan */}
					<Card className="p-6 bg-gradient-to-br from-chart-4/5 to-chart-5/5 border-chart-4/20">
						<View className="flex-row items-center gap-3 mb-4">
							<View className="w-12 h-12 rounded-2xl bg-chart-4/20 items-center justify-center">
								<Icon as={TrendingUpIcon} className="text-chart-4" size={24} />
							</View>
							<View className="flex-1">
								<Text className="text-foreground font-bold text-lg">Contribution Plan</Text>
								<Text className="text-muted-foreground text-sm">Set your savings schedule</Text>
							</View>
						</View>

						<View className="space-y-4">
							{/* Contribution Amount */}
							<View>
								<Text className="text-foreground font-medium mb-2">Contribution Amount</Text>
								<View className="relative">
									<Input
										value={contributionAmount}
										onChangeText={setContributionAmount}
										placeholder="$200"
										keyboardType="numeric"
										className="bg-background pl-10"
									/>
									<View className="absolute left-3 top-3">
										<Icon as={DollarSignIcon} className="text-muted-foreground" size={20} />
									</View>
								</View>
							</View>

							{/* Frequency */}
							<View>
								<Text className="text-foreground font-medium mb-2">Frequency</Text>
								<View className="flex-row gap-2">
									{FREQUENCY_OPTIONS.map((option) => (
										<TouchableOpacity
											key={option.value}
											onPress={() => setContributionFrequency(option.value)}
											className={`flex-1 p-3 rounded-xl border-2 ${contributionFrequency === option.value
												? 'border-chart-4 bg-chart-4/10'
												: 'border-border bg-background'
												}`}
										>
											<Text className={`text-center font-medium ${contributionFrequency === option.value ? 'text-chart-4' : 'text-foreground'
												}`}>
												{option.label}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>

							{/* Time to Goal Calculation */}
							{monthsToGoal && (
								<View className="bg-background/50 rounded-2xl p-4">
									<View className="flex-row items-center justify-between">
										<Text className="text-card-foreground font-semibold">Time to Goal</Text>
										<Text className="text-chart-4 font-bold text-lg">
											{monthsToGoal} months
										</Text>
									</View>
									<Text className="text-muted-foreground text-sm mt-1">
										At ${contributionAmount} {contributionFrequency}
									</Text>
								</View>
							)}
						</View>
					</Card>

					{/* Notes */}
					<Card className="p-6">
						<View className="flex-row items-center gap-3 mb-4">
							<View className="w-12 h-12 rounded-2xl bg-muted/50 items-center justify-center">
								<Icon as={SaveIcon} className="text-muted-foreground" size={24} />
							</View>
							<View className="flex-1">
								<Text className="text-foreground font-bold text-lg">Additional Notes</Text>
								<Text className="text-muted-foreground text-sm">Add any extra details (optional)</Text>
							</View>
						</View>

						<Input
							value={notes}
							onChangeText={setNotes}
							placeholder="Any additional notes about your savings goal..."
							multiline
							numberOfLines={3}
							className="bg-background min-h-[80px]"
						/>
					</Card>

					{/* Action Buttons */}
					<View className="flex-row gap-4 pb-8">
						<Button
							variant="outline"
							className="flex-1"
							onPress={() => router.back()}
						>
							<Text className="text-foreground font-semibold">Cancel</Text>
						</Button>
						<Button
							className="flex-1 bg-chart-1"
							onPress={handleSave}
						>
							<Icon as={SaveIcon} className="text-white" size={16} />
							<Text className="text-white font-semibold ml-2">Create Goal</Text>
						</Button>
					</View>
				</View>
			</ScrollView>
		</Container>
	);
}
