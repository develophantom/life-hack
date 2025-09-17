import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
	label: string;
	value: number;
	color: string;
	percentage: number;
}

interface SpendingChartProps {
	title: string;
	data: ChartData[];
	type?: "bar" | "pie" | "line";
	className?: string;
}

export function SpendingChart({
	title,
	data,
	type = "bar",
	className = ""
}: SpendingChartProps) {
	const maxValue = Math.max(...data.map(d => d.value));

	const renderBarChart = () => (
		<View className="space-y-3">
			{data.map((item, index) => (
				<View key={index} className="space-y-2">
					<View className="flex-row justify-between items-center">
						<Text className="text-card-foreground font-medium">{item.label}</Text>
						<Text className="text-card-foreground font-semibold">
							${item.value.toLocaleString()}
						</Text>
					</View>
					<View className="h-2 bg-muted rounded-full overflow-hidden">
						<View
							className={`h-full ${item.color} rounded-full`}
							style={{ width: `${(item.value / maxValue) * 100}%` }}
						/>
					</View>
					<Text className="text-muted-foreground text-xs text-right">
						{item.percentage}%
					</Text>
				</View>
			))}
		</View>
	);

	const renderPieChart = () => (
		<View className="items-center space-y-4">
			{/* Simple pie chart representation */}
			<View className="w-32 h-32 relative">
				{data.map((item, index) => {
					const startAngle = data.slice(0, index).reduce((acc, d) => acc + (d.percentage / 100) * 360, 0);
					const endAngle = startAngle + (item.percentage / 100) * 360;

					return (
						<View
							key={index}
							className="absolute w-full h-full"
							style={{
								transform: [{ rotate: `${startAngle}deg` }],
							}}
						>
							<View
								className={`w-16 h-16 rounded-full ${item.color} opacity-80`}
								style={{
									transform: [{ rotate: `${endAngle - startAngle}deg` }],
								}}
							/>
						</View>
					);
				})}
			</View>

			{/* Legend */}
			<View className="space-y-2 w-full">
				{data.map((item, index) => (
					<View key={index} className="flex-row items-center gap-3">
						<View className={`w-3 h-3 rounded-full ${item.color}`} />
						<Text className="text-card-foreground font-medium flex-1">{item.label}</Text>
						<Text className="text-card-foreground font-semibold">
							{item.percentage}%
						</Text>
					</View>
				))}
			</View>
		</View>
	);

	const renderLineChart = () => (
		<View className="space-y-4">
			{/* Simple line chart representation */}
			<View className="h-24 bg-muted/20 rounded-lg p-4">
				<View className="flex-row items-end justify-between h-full">
					{data.map((item, index) => (
						<View key={index} className="flex-1 items-center">
							<View
								className={`w-2 ${item.color} rounded-t`}
								style={{ height: `${(item.value / maxValue) * 60}px` }}
							/>
						</View>
					))}
				</View>
			</View>

			{/* Labels */}
			<View className="flex-row justify-between">
				{data.map((item, index) => (
					<Text key={index} className="text-muted-foreground text-xs text-center flex-1">
						{item.label}
					</Text>
				))}
			</View>
		</View>
	);

	const renderChart = () => {
		switch (type) {
			case "pie":
				return renderPieChart();
			case "line":
				return renderLineChart();
			default:
				return renderBarChart();
		}
	};

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle className="text-card-foreground">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				{renderChart()}
			</CardContent>
		</Card>
	);
}
