import React from "react";
import { View } from "react-native";
import { DebitCard, DebitCardProps } from "@/components/debit-card";
import { Text } from "@/components/ui/text";

export interface CardStackProps {
  cards: DebitCardProps[];
  maxVisible?: number;
  className?: string;
}

export function CardStack({
  cards,
  maxVisible = 3,
  className = ""
}: CardStackProps) {
  // Only show the maximum number of visible cards
  const visibleCards = cards.slice(0, maxVisible);

  // Card variants for different colors
  const variants = ["accent", "blue", "purple", "default"] as const;

  // If no cards, show a placeholder
  if (visibleCards.length === 0) {
    return (
      <View className={`relative mb-4 ${className}`}>
        <View className="w-96 h-60 bg-slate-700 rounded-3xl items-center justify-center shadow-2xl">
          <Text className="text-white/70 text-lg font-medium">
            No cards available
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className={`relative mb-10 items-center ${className}`} style={{ height: 240 + (visibleCards.length - 1) * 6 }}>
      {visibleCards.map((card, index) => {
        const isLast = index === visibleCards.length - 1;
        const offset = index * 6; // 6px offset for each card
        const zIndex = visibleCards.length - index; // Higher z-index for cards on top
        const variant = variants[index % variants.length]; // Cycle through variants

        return (
          <View
            key={`${card.cardholderName}-${index}`}
            className="absolute"
            style={{
              top: offset,
              zIndex: zIndex,
            }}
          >
            <DebitCard
              {...card}
              variant={variant}
              className={isLast ? "card-shadow-lg" : "card-shadow"}
            />
          </View>
        );
      })}
    </View>
  );
}
