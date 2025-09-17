import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export interface DebitCardProps {
  cardholderName: string;
  expiryDate: string;
  cardType?: "Debit Card" | "Credit Card" | "Prepaid Card";
  cardNumber?: string;
  bankName?: string;
  className?: string;
  variant?: "default" | "accent" | "blue" | "purple";
}

export function DebitCard({
  cardholderName,
  expiryDate,
  cardType = "Debit Card",
  cardNumber,
  bankName,
  className = "",
  variant = "default",
}: DebitCardProps) {
  // Format card number to show only last 4 digits with asterisks
  const formatCardNumber = (number?: string) => {
    if (!number) return "•••• •••• •••• ••••";
    const lastFour = number.slice(-4);
    return `•••• •••• •••• ${lastFour}`;
  };

  // Format expiry date to MM/YY format
  const formatExpiryDate = (date: string) => {
    if (date.includes("/")) return date;
    if (date.includes("-")) {
      const [year, month] = date.split("-");
      return `${month}/${year.slice(-2)}`;
    }
    if (date.includes("/") && date.split("/")[1].length === 4) {
      const [month, year] = date.split("/");
      return `${month}/${year.slice(-2)}`;
    }
    return date;
  };

  // Get solid color class based on variant
  const getColorClass = () => {
    switch (variant) {
      case "accent": return "bg-emerald-600";
      case "blue": return "bg-blue-600";
      case "purple": return "bg-purple-600";
      default: return "bg-slate-700";
    }
  };

  return (
    <View className={`w-96 h-60 ${getColorClass()} rounded-3xl p-6 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Background Pattern/Texture */}
      <View className="absolute inset-0 bg-black/10 rounded-3xl" />

      {/* Decorative Elements */}
      <View className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
      <View className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full" />

      {/* Top Row - Icons */}
      <View className="flex-row justify-between items-start mb-4 relative z-10">
        {/* Bank/Star Icon */}
        <View className="w-10 h-10 items-center justify-center">
          <View className="w-8 h-8 bg-white/20 rounded-full items-center justify-center">
            <Text className="text-white text-xl font-bold">★</Text>
          </View>
        </View>

        {/* Contactless Payment Icon */}
        <View className="w-10 h-10 items-center justify-center">
          <View className="w-8 h-8 bg-white/20 rounded-full items-center justify-center">
            <View className="w-6 h-6">
              <View className="absolute top-0 left-1 w-1 h-1 bg-white rounded-full" />
              <View className="absolute top-1 left-0.5 w-2 h-1 bg-white rounded-full" />
              <View className="absolute top-2 left-0 w-3 h-1 bg-white rounded-full" />
              <View className="absolute top-3 left-0 w-4 h-1 bg-white rounded-full" />
            </View>
          </View>
        </View>
      </View>

      {/* Card Number */}
      {cardNumber && (
        <View className="mb-4 relative z-10">
          <Text className="text-white text-xl font-mono tracking-widest">
            {formatCardNumber(cardNumber)}
          </Text>
        </View>
      )}

      {/* Expiry Date */}
      <View className="mb-4 relative z-10">
        <Text className="text-white/90 text-sm font-semibold">
          {formatExpiryDate(expiryDate)}
        </Text>
      </View>

      {/* Cardholder Name */}
      <View className="mb-4 relative z-10">
        <Text className="text-white text-lg font-bold leading-tight">
          {cardholderName.toUpperCase()}
        </Text>
      </View>

      {/* Bottom Row - Card Type and Payment Network */}
      <View className="flex-row justify-between items-end relative z-10">
        {/* Card Type */}
        <View>
          <Text className="text-white/90 text-sm font-semibold">
            {cardType}
          </Text>
          {bankName && (
            <Text className="text-white/70 text-xs font-medium">
              {bankName}
            </Text>
          )}
        </View>

        {/* Mastercard Logo */}
        <View className="flex-row items-center">
          <View className="w-10 h-10 relative">
            {/* Red Circle */}
            <View className="absolute left-0 w-5 h-5 bg-red-500 rounded-full shadow-lg" />
            {/* Orange Circle */}
            <View className="absolute right-0 w-5 h-5 bg-orange-500 rounded-full shadow-lg" />
            {/* Overlap effect */}
            <View className="absolute left-2.5 w-5 h-5 bg-red-500 rounded-full" />
          </View>
        </View>
      </View>
    </View>
  );
}
