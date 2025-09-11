import {
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react-native";
import { View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

export function TotalBalanceCard() {
  const { dashboardData } = useDashboardStore();
  const { totalBalance, currency, balanceTrend } = dashboardData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  const getTrendIcon = () => {
    if (balanceTrend.weekly > 0) return TrendingUpIcon;
    if (balanceTrend.weekly < 0) return TrendingDownIcon;
    return WalletIcon;
  };

  const getTrendColor = () => {
    if (balanceTrend.weekly > 0) return "text-green-500";
    if (balanceTrend.weekly < 0) return "text-red-500";
    return "text-muted-foreground";
  };

  const formatTrend = (trend: number) => {
    const sign = trend > 0 ? "+" : "";
    return `${sign}${trend.toFixed(1)}%`;
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
      <CardHeader>
        <CardTitle className="flex-row items-center gap-2">
          <Icon as={WalletIcon} className="text-primary" size={20} />
          <Text>Total Balance</Text>
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <Text className="font-bold text-primary" variant="h1">
            {formatCurrency(totalBalance)}
          </Text>
          <View className="flex-row items-center gap-2">
            <Icon as={getTrendIcon()} className={getTrendColor()} size={16} />
            <Text className={getTrendColor()} variant="small">
              {formatTrend(balanceTrend.weekly)} this week
            </Text>
          </View>
        </View>

        <View className="flex-row gap-2">
          <View className="flex-1 rounded-lg bg-background/50 p-3">
            <Text className="text-muted-foreground" variant="small">
              This Week
            </Text>
            <Text className="font-semibold">
              {formatTrend(balanceTrend.weekly)}
            </Text>
          </View>
          <View className="flex-1 rounded-lg bg-background/50 p-3">
            <Text className="text-muted-foreground" variant="small">
              This Month
            </Text>
            <Text className="font-semibold">
              {formatTrend(balanceTrend.monthly)}
            </Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
