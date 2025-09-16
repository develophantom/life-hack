import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { TrendingUpIcon, MoreHorizontalIcon } from 'lucide-react-native';
import { fontStyles } from '@/lib/fonts';

interface SavingsOverviewCardProps {
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

export function SavingsOverViewCard({
  title,
  statusMessage,
  percentage,
  trend,
  trendText,
  tags,
  amount,
  targetAmount,
  onPress,
}: SavingsOverviewCardProps) {
  // Create segmented progress bar (20 segments for 5% each)
  const totalSegments = 20;
  const filledSegments = Math.round((percentage / 100) * totalSegments);

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
      {/* Header with tags and menu */}
      <View className="flex-row flex-wrap gap-2 flex-1 mb-4">
        {tags.map((tag, index) => (
          <View
            key={index}
            className="bg-foreground px-3 py-1.5 rounded-full"
          >
            <Text className="text-background text-xs font-medium">{tag}</Text>
          </View>
        ))}
      </View>

      {/* Title */}
      <Text variant="h3" className="text-foreground mb-2">{title}</Text>

      {/* Separator line */}
      <View className="h-px bg-foreground mb-4" />

      {/* Status message */}
      <Text className="text-foreground text-base mb-4">{statusMessage}</Text>

      {/* Financial amounts */}
      {(amount || targetAmount) && (
        <View className="flex-row items-center gap-4 mb-4">
          {amount && (
            <View>
              <Text style={fontStyles.bold} className="text-foreground text-sm">Current</Text>
              <Text style={fontStyles.bold} className="text-foreground text-lg font-semibold">{amount}</Text>
            </View>
          )}
          {targetAmount && (
            <View>
              <Text style={fontStyles.bold} className="text-foreground text-sm">Target</Text>
              <Text style={fontStyles.bold} className="text-foreground text-lg ">{targetAmount}</Text>
            </View>
          )}
        </View>
      )}

      {/* Percentage and trend */}
      <View className="flex-row items-end justify-between mb-6">
        <Text style={fontStyles.bold} className="text-foreground text-4xl font-bold">{percentage}%</Text>

        <View className="items-end">
          <View className="flex-row items-center gap-1 mb-1">
            <Icon as={TrendingUpIcon} className="text-foreground" size={20} />
            <Text className="text-foreground text-sm font-semibold">{trend}%</Text>
          </View>
          <Text className="text-muted-foreground text-xs">{trendText}</Text>
        </View>
      </View>

      {/* Segmented progress bar */}
      <View className="flex-row gap-1">
        {Array.from({ length: totalSegments }).map((_, index) => (
          <View
            key={index}
            className={`flex-1 h-6 ${index < filledSegments
              ? 'bg-foreground/70'
              : 'bg-muted'
              }`}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
}
