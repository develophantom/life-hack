import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

interface Transaction {
	id: string;
	name: string;
	description: string;
	amount: number;
	date: string;
	icon: string;
	color: string;
}

interface TransactionListProps {
	transactions: Transaction[];
	onViewAll?: () => void;
	className?: string;
}

export function TransactionList({
	transactions,
	onViewAll,
	className = ""
}: TransactionListProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	return (
		<View className={`space-y-4 ${className}`}>
			{/* Header */}
			<View className="flex-row items-center justify-between mb-4">
				<Text className="text-foreground text-xl font-bold">Transaction</Text>
				<Button variant="ghost" size="sm" onPress={onViewAll}>
					<Text className="text-muted-foreground text-sm">View all</Text>
				</Button>
			</View>

			{/* Transaction List */}
			<View className="space-y-3">
				{transactions.map((transaction) => (
					<View key={transaction.id} className="flex-row items-center justify-between py-4 px-4 bg-card rounded-2xl shadow-xl">
						<View className="flex-row items-center gap-4 flex-1">
							{/* Transaction Icon */}
							<View className={`w-12 h-12 rounded-full ${transaction.color} items-center justify-center`}>
								<Text className="text-white font-bold text-lg">
									{transaction.icon}
								</Text>
							</View>

							{/* Transaction Details */}
							<View className="flex-1">
								<Text className="text-card-foreground font-semibold text-base">
									{transaction.name}
								</Text>
								<Text className="text-muted-foreground text-sm">
									{transaction.description}
								</Text>
							</View>
						</View>

						{/* Amount and Date */}
						<View className="items-end">
							<Text className={`font-bold text-lg ${transaction.amount < 0 ? 'text-destructive' : 'text-chart-1'}`}>
								{transaction.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(transaction.amount))}
							</Text>
							<Text className="text-muted-foreground text-sm">
								{transaction.date}
							</Text>
						</View>
					</View>
				))}
			</View>
		</View>
	);
}
