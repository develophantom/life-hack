import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { TrendingUpIcon, MoreHorizontalIcon } from 'lucide-react-native';

interface ProgressCardProps {
  title: string;
  statusMessage: string;
  percentage: number;
  trend: number;
  trendText: string;
  tags: string[];
  amount?: string;
  targetAmount?: string;
  onPress?: () => void;
}

export function ProgressCard({
  title,
  statusMessage,
  percentage,
  trend,
  trendText,
  tags,
  amount,
  targetAmount,
  onPress,
}: ProgressCardProps) {
	// Create segmented progress bar (20 segments for 5% each)
	const totalSegments = 20;
	const filledSegments = Math.round((percentage / 100) * totalSegments);

	return (
		<TouchableOpacity
			onPress={onPress}
			className="bg-white rounded-2xl p-6 mx-6 mb-6"
			style={{
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.1,
				shadowRadius: 12,
				elevation: 8,
			}}
		>
			{/* Header with tags and menu */}
			<View className="flex-row items-start justify-between mb-4">
				<View className="flex-row flex-wrap gap-2 flex-1">
					{tags.map((tag, index) => (
						<View
							key={index}
							className="bg-gray-900 px-3 py-1.5 rounded-full"
						>
							<Text className="text-white text-xs font-medium">{tag}</Text>
						</View>
					))}
				</View>

				<TouchableOpacity className="p-1 -m-1">
					<Icon as={MoreHorizontalIcon} className="text-gray-400" size={16} />
				</TouchableOpacity>
			</View>

			{/* Title */}
			<Text className="text-gray-900 text-2xl font-bold mb-2">{title}</Text>

			{/* Separator line */}
			<View className="h-px bg-gray-200 mb-4" />

      {/* Status message */}
      <Text className="text-gray-600 text-base mb-4">{statusMessage}</Text>

      {/* Financial amounts */}
      {(amount || targetAmount) && (
        <View className="flex-row items-center gap-4 mb-4">
          {amount && (
            <View>
              <Text className="text-gray-500 text-sm">Current</Text>
              <Text className="text-gray-900 text-lg font-semibold">{amount}</Text>
            </View>
          )}
          {targetAmount && (
            <View>
              <Text className="text-gray-500 text-sm">Target</Text>
              <Text className="text-gray-600 text-lg font-medium">{targetAmount}</Text>
            </View>
          )}
        </View>
      )}

      {/* Percentage and trend */}
      <View className="flex-row items-end justify-between mb-6">
        <Text className="text-gray-900 text-4xl font-bold">{percentage}%</Text>
        
        <View className="items-end">
          <View className="flex-row items-center gap-1 mb-1">
            <Icon as={TrendingUpIcon} className="text-green-500" size={16} />
            <Text className="text-green-500 text-sm font-semibold">{trend}%</Text>
          </View>
          <Text className="text-gray-500 text-xs">{trendText}</Text>
        </View>
      </View>

			{/* Segmented progress bar */}
			<View className="flex-row gap-1">
				{Array.from({ length: totalSegments }).map((_, index) => (
					<View
						key={index}
						className={`flex-1 h-2 rounded-full ${index < filledSegments ? 'bg-gray-300' : 'bg-gray-200'
							}`}
					/>
				))}
			</View>
		</TouchableOpacity>
	);
}
