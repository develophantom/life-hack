import { AwardIcon, CalendarIcon, FlameIcon, TargetIcon, TrophyIcon, UsersIcon } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

type Challenge = {
  id: string;
  name: string;
  description: string;
  duration: number; // in days
  difficulty: "easy" | "medium" | "hard";
  category: string;
  participants: number;
  rewards: string[];
  requirements: string[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  progress?: number;
};

const AVAILABLE_CHALLENGES: Challenge[] = [
  {
    id: "30_day_fitness",
    name: "30-Day Fitness Challenge",
    description: "Complete 30 days of consistent exercise",
    duration: 30,
    difficulty: "medium",
    category: "health",
    participants: 1247,
    rewards: ["Fitness Badge", "Health Achievement"],
    requirements: ["Daily exercise habit", "Minimum 20 minutes"],
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    isActive: true,
  },
  {
    id: "mindfulness_master",
    name: "Mindfulness Master",
    description: "Practice meditation for 21 consecutive days",
    duration: 21,
    difficulty: "easy",
    category: "mindfulness",
    participants: 892,
    rewards: ["Zen Master Badge", "Calm Achievement"],
    requirements: ["Daily meditation", "Minimum 10 minutes"],
    startDate: "2024-01-15",
    endDate: "2024-02-05",
    isActive: true,
  },
  {
    id: "reading_marathon",
    name: "Reading Marathon",
    description: "Read for 30 minutes daily for 30 days",
    duration: 30,
    difficulty: "easy",
    category: "learning",
    participants: 2156,
    rewards: ["Bookworm Badge", "Knowledge Achievement"],
    requirements: ["Daily reading habit", "Minimum 30 minutes"],
    startDate: "2024-02-01",
    endDate: "2024-03-02",
    isActive: true,
  },
  {
    id: "productivity_pro",
    name: "Productivity Pro",
    description: "Complete daily goals for 14 consecutive days",
    duration: 14,
    difficulty: "medium",
    category: "productivity",
    participants: 743,
    rewards: ["Productivity Badge", "Goal Crusher Achievement"],
    requirements: ["Daily goal setting", "Task completion tracking"],
    startDate: "2024-01-20",
    endDate: "2024-02-03",
    isActive: true,
  },
];

type HabitChallengesProps = {
  onChallengeJoin?: (challenge: Challenge) => void;
};

export function HabitChallenges({ onChallengeJoin }: HabitChallengesProps) {
  const { habits } = useDashboardStore();
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);

  const handleJoinChallenge = (challenge: Challenge) => {
    setJoinedChallenges(prev => [...prev, challenge.id]);
    onChallengeJoin?.(challenge);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 dark:text-green-400";
      case "medium":
        return "text-orange-600 dark:text-orange-400";
      case "hard":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "health":
        return TargetIcon;
      case "mindfulness":
        return AwardIcon;
      case "learning":
        return CalendarIcon;
      case "productivity":
        return TrophyIcon;
      default:
        return TargetIcon;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "health":
        return "text-green-500";
      case "mindfulness":
        return "text-indigo-500";
      case "learning":
        return "text-purple-500";
      case "productivity":
        return "text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  const isChallengeJoined = (challengeId: string) => {
    return joinedChallenges.includes(challengeId);
  };

  const canJoinChallenge = (challenge: Challenge) => {
    // Check if user has relevant habits
    const relevantHabits = habits.filter(habit => 
      habit.category === challenge.category
    );
    return relevantHabits.length > 0;
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
      <View className="gap-4">
        <View className="gap-2">
          <Text variant="h2">Habit Challenges</Text>
          <Text variant="muted">
            Join community challenges to stay motivated and earn rewards
          </Text>
        </View>

        {/* Active Challenges */}
        <View className="gap-3">
          <Text variant="h3">Active Challenges</Text>
          {AVAILABLE_CHALLENGES.filter(c => c.isActive).map((challenge) => (
            <Card key={challenge.id}>
              <CardContent className="p-4">
                <View className="gap-3">
                  {/* Header */}
                  <View className="flex-row items-start gap-3">
                    <Icon
                      as={getCategoryIcon(challenge.category)}
                      className={getCategoryColor(challenge.category)}
                      size={24}
                    />
                    <View className="flex-1">
                      <Text className="font-semibold">{challenge.name}</Text>
                      <Text className="text-muted-foreground" variant="small">
                        {challenge.description}
                      </Text>
                    </View>
                    {isChallengeJoined(challenge.id) && (
                      <View className="rounded-full bg-green-100 px-2 py-1">
                        <Text className="text-green-700" variant="small">
                          Joined
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Meta Info */}
                  <View className="flex-row items-center gap-4">
                    <View className="flex-row items-center gap-1">
                      <Text className="text-muted-foreground" variant="small">
                        Duration:
                      </Text>
                      <Text className="font-medium" variant="small">
                        {challenge.duration} days
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Text className="text-muted-foreground" variant="small">
                        Difficulty:
                      </Text>
                      <Text className={`font-medium ${getDifficultyColor(challenge.difficulty)}`} variant="small">
                        {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                      </Text>
                    </View>
                  </View>

                  {/* Participants */}
                  <View className="flex-row items-center gap-2">
                    <Icon
                      as={UsersIcon}
                      className="text-muted-foreground"
                      size={16}
                    />
                    <Text className="text-muted-foreground" variant="small">
                      {challenge.participants.toLocaleString()} participants
                    </Text>
                  </View>

                  {/* Requirements */}
                  <View className="gap-2">
                    <Text className="font-medium" variant="small">
                      Requirements:
                    </Text>
                    {challenge.requirements.map((req, index) => (
                      <View key={index} className="flex-row items-center gap-2">
                        <Icon
                          as={TargetIcon}
                          className="text-green-500"
                          size={12}
                        />
                        <Text className="text-muted-foreground" variant="small">
                          {req}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Rewards */}
                  <View className="gap-2">
                    <Text className="font-medium" variant="small">
                      Rewards:
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                      {challenge.rewards.map((reward, index) => (
                        <View
                          key={index}
                          className="rounded-full bg-yellow-100 px-2 py-1"
                        >
                          <Text className="text-yellow-700" variant="small">
                            {reward}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Action Button */}
                  {!isChallengeJoined(challenge.id) && (
                    <Button
                      className="w-full"
                      disabled={!canJoinChallenge(challenge)}
                      onPress={() => handleJoinChallenge(challenge)}
                      size="sm"
                    >
                      <Icon as={TrophyIcon} size={16} />
                      <Text>
                        {canJoinChallenge(challenge) ? "Join Challenge" : "Need Relevant Habits"}
                      </Text>
                    </Button>
                  )}

                  {isChallengeJoined(challenge.id) && (
                    <View className="flex-row items-center gap-2">
                      <Icon
                        as={FlameIcon}
                        className="text-orange-500"
                        size={16}
                      />
                      <Text className="text-orange-600 font-medium">
                        Challenge in progress!
                      </Text>
                    </View>
                  )}
                </View>
              </CardContent>
            </Card>
          ))}
        </View>

        {/* Challenge Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Your Challenge Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="gap-4">
              <View className="flex-row items-center justify-between">
                <Text className="font-medium">Challenges Joined</Text>
                <Text className="font-bold text-blue-600">
                  {joinedChallenges.length}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="font-medium">Badges Earned</Text>
                <Text className="font-bold text-yellow-600">
                  {joinedChallenges.length * 2}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="font-medium">Achievements</Text>
                <Text className="font-bold text-green-600">
                  {joinedChallenges.length}
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
