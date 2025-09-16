import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { fontStyles } from '@/lib/fonts';

interface HabitHeatMapProps {
	onPress?: () => void;
}

export function HabitHeatMap({ onPress }: HabitHeatMapProps) {
	// Mock data for habit completion - matching reference image 2
	const habitData = {
		// February completed dates
		'2024-02-10': true, '2024-02-17': true, '2024-02-18': true, '2024-02-19': true,
		'2024-02-20': true, '2024-02-21': true, '2024-02-22': true, '2024-02-23': true,
		'2024-02-24': true, '2024-02-25': true, '2024-02-26': true, '2024-02-27': true,
		'2024-02-28': true, '2024-02-29': true,
		// March completed dates
		'2024-03-02': true, '2024-03-03': true, '2024-03-04': true, '2024-03-05': true,
		'2024-03-06': true, '2024-03-07': true, '2024-03-08': true, '2024-03-09': true,
		'2024-03-10': true, '2024-03-11': true, '2024-03-12': true, '2024-03-13': true,
		'2024-03-14': true, '2024-03-15': true, '2024-03-16': true, '2024-03-17': true,
		'2024-03-18': true, '2024-03-19': true, '2024-03-20': true, '2024-03-21': true,
		'2024-03-22': true, '2024-03-23': true, '2024-03-24': true, '2024-03-25': true,
		'2024-03-26': true, '2024-03-27': true, '2024-03-28': true, '2024-03-29': true,
		// April completed dates
		'2024-04-05': true, '2024-04-06': true, '2024-04-07': true, '2024-04-08': true,
		'2024-04-09': true, '2024-04-10': true, '2024-04-11': true, '2024-04-12': true,
		'2024-04-13': true, '2024-04-14': true, '2024-04-15': true, '2024-04-16': true,
		'2024-04-17': true, '2024-04-18': true, '2024-04-19': true, '2024-04-20': true,
		'2024-04-21': true, // Current day
	};

	const months = ['Feb', 'Mar', 'Apr'];
	const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	// Calendar data for each month - matching reference image 2
	const calendarData = {
		'Feb': [
			[10, 11, 12, 13, 14, 15, 16],
			[17, 18, 19, 20, 21, 22, 23],
			[24, 25, 26, 27, 28, 29, 1],
		],
		'Mar': [
			[1, 2, 3, 4, 5, 6, 7],
			[8, 9, 10, 11, 12, 13, 14],
			[15, 16, 17, 18, 19, 20, 21],
			[22, 23, 24, 25, 26, 27, 28],
			[29, 30, 31, 1, 2, 3, 4],
		],
		'Apr': [
			[1, 2, 3, 4, 5, 6, 7],
			[8, 9, 10, 11, 12, 13, 14],
			[15, 16, 17, 18, 19, 20, 21],
			[22, 23, 24, 25, 26, 27, 28],
		],
	};

	const isDateCompleted = (month: string, day: number) => {
		const monthNum = month === 'Feb' ? '02' : month === 'Mar' ? '03' : '04';
		const dateKey = `2024-${monthNum}-${day.toString().padStart(2, '0')}`;
		return habitData[dateKey as keyof typeof habitData] || false;
	};

	const isCurrentDay = (month: string, day: number) => {
		return month === 'Apr' && day === 21;
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			className="bg-muted-foreground rounded-sm py-4 px-3 mx-2 mb-6"
			style={{
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.1,
				shadowRadius: 12,
				elevation: 8,
			}}
		>
			{/* Header */}
			<View className="flex-row items-center justify-between mb-4">
				<Text style={fontStyles.bold} className="text-foreground text-xl">History</Text>
				<Text className="text-foreground text-sm">Drag to see more</Text>
			</View>

			{/* Calendar Grid - Multiple Months View */}
			<ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
				<View className="flex-row">
					{/* Days of week column */}
					<View className="mr-4">
						<View className="h-6 mb-2" />
						{daysOfWeek.map((day) => (
							<View key={day} className="h-8 items-center justify-center mb-1">
								<Text className="text-foreground text-xs">{day}</Text>
							</View>
						))}
					</View>

					{/* Calendar months */}
					{months.map((month) => (
						<View key={month} className="mr-6">
							{/* Month name */}
							<View className="h-6 items-center justify-center mb-2">
								<Text className="text-foreground text-sm font-medium">{month}</Text>
							</View>

							{/* Calendar grid */}
							{calendarData[month as keyof typeof calendarData].map((week, weekIndex) => (
								<View key={weekIndex} className="flex-row mb-1">
									{week.map((day, dayIndex) => {
										const completed = isDateCompleted(month, day);
										const currentDay = isCurrentDay(month, day);
										const isFromOtherMonth = day < 10 && month !== 'Feb' && dayIndex < 2;

										return (
											<View
												key={`${month}-${day}`}
												className={`w-8 h-8 items-center justify-center mx-0.5 ${completed
													? 'bg-chart-1 border border-background'
													: isFromOtherMonth
														? 'opacity-30'
														: ''
													} ${currentDay ? 'border-2 border-background' : ''}`}
												style={{
													borderRadius: completed ? 5 : 0,
												}}
											>
												<Text
													className={`text-xs font-medium ${completed
														? 'text-background'
														: 'text-foreground'
														}`}
												>
													{day}
												</Text>
											</View>
										);
									})}
								</View>
							))}
						</View>
					))}
				</View>
			</ScrollView>
		</TouchableOpacity>
	);
}