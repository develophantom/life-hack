import {
  AlertTriangleIcon,
  CheckCircleIcon,
  TargetIcon,
  TrendingUpIcon,
} from "lucide-react-native";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

export function QuickSummaryCard() {
  const { dashboardData, getQuickActions } = useDashboardStore();
  const { habitSummary, financialSummary, healthScore } = dashboardData;
  const quickActions = getQuickActions();

  const getHealthScoreColor = () => {
    switch (healthScore) {
      case "excellent":
        return "text-green-500";
      case "good":
        return "text-blue-500";
      case "needs-attention":
        return "text-orange-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getHealthScoreIcon = () => {
    switch (healthScore) {
      case "excellent":
        return CheckCircleIcon;
      case "good":
        return TrendingUpIcon;
      case "needs-attention":
        return AlertTriangleIcon;
      default:
        return TargetIcon;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Summary</CardTitle>
      </CardHeader>
      <CardContent className="gap-4">
        {/* Health Score */}
        <View className="flex-row items-center justify-between rounded-lg bg-background/50 p-3">
          <View className="flex-row items-center gap-3">
            <Icon
              as={getHealthScoreIcon()}
              className={getHealthScoreColor()}
              size={20}
            />
            <View>
              <Text className="font-semibold capitalize">
                {healthScore.replace("-", " ")}
              </Text>
              <Text className="text-muted-foreground" variant="small">
                Overall health score
              </Text>
            </View>
          </View>
        </View>

        {/* Habit Status */}
        <View className="flex-row items-center gap-3">
          <Icon as={TargetIcon} className="text-primary" size={20} />
          <View className="flex-1">
            <Text className="font-semibold">
              {habitSummary.onTrack} habits on track
            </Text>
            <Text className="text-muted-foreground" variant="small">
              {habitSummary.struggling > 0 &&
                `${habitSummary.struggling} need attention`}
              {habitSummary.struggling === 0 && "All habits going well!"}
            </Text>
          </View>
          {habitSummary.struggling > 0 && (
            <View className="rounded-full bg-orange-100 px-2 py-1 dark:bg-orange-900/20">
              <Text className="font-medium text-orange-600 text-xs dark:text-orange-400">
                {habitSummary.struggling}
              </Text>
            </View>
          )}
        </View>

        {/* Financial Status */}
        <View className="flex-row items-center gap-3">
          <Icon as={TrendingUpIcon} className="text-primary" size={20} />
          <View className="flex-1">
            <Text className="font-semibold">
              {financialSummary.overBudget > 0
                ? `${financialSummary.overBudget} over budget`
                : "All budgets on track"}
            </Text>
            <Text className="text-muted-foreground" variant="small">
              {financialSummary.totalCategories} categories tracked
            </Text>
          </View>
          {financialSummary.overBudget > 0 && (
            <View className="rounded-full bg-red-100 px-2 py-1 dark:bg-red-900/20">
              <Text className="font-medium text-red-600 text-xs dark:text-red-400">
                {financialSummary.overBudget}
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        {quickActions.length > 0 && (
          <View className="gap-2">
            <Text className="font-medium">Quick Actions</Text>
            {quickActions.slice(0, 2).map((action) => (
              <Button
                className="w-full justify-start"
                key={action.id}
                onPress={action.action}
                variant="outline"
              >
                <Icon as={TargetIcon} size={16} />
                <View className="flex-1 items-start">
                  <Text className="font-medium">{action.title}</Text>
                  <Text className="text-muted-foreground" variant="small">
                    {action.description}
                  </Text>
                </View>
              </Button>
            ))}
          </View>
        )}
      </CardContent>
    </Card>
  );
}
