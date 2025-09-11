import { LinkIcon, PlusIcon, TargetIcon, TrashIcon } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

type HabitChain = {
  id: string;
  name: string;
  description: string;
  habits: string[]; // Array of habit IDs
  triggerHabit?: string; // The habit that triggers the chain
  order: "sequential" | "parallel"; // How habits are executed
  createdAt: string;
};

type HabitChainsProps = {
  onChainCreate?: (chain: HabitChain) => void;
  onChainDelete?: (chainId: string) => void;
};

export function HabitChains({ onChainCreate, onChainDelete }: HabitChainsProps) {
  const { habits } = useDashboardStore();
  const [chains, setChains] = useState<HabitChain[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChain, setNewChain] = useState({
    name: "",
    description: "",
    triggerHabit: "",
    order: "sequential" as "sequential" | "parallel",
    selectedHabits: [] as string[],
  });

  const handleCreateChain = () => {
    if (newChain.name.trim() && newChain.selectedHabits.length > 0) {
      const chain: HabitChain = {
        id: `chain_${Date.now()}`,
        name: newChain.name.trim(),
        description: newChain.description.trim(),
        habits: newChain.selectedHabits,
        triggerHabit: newChain.triggerHabit || undefined,
        order: newChain.order,
        createdAt: new Date().toISOString(),
      };

      setChains(prev => [...prev, chain]);
      onChainCreate?.(chain);
      
      // Reset form
      setNewChain({
        name: "",
        description: "",
        triggerHabit: "",
        order: "sequential",
        selectedHabits: [],
      });
      setShowCreateForm(false);
    }
  };

  const handleDeleteChain = (chainId: string) => {
    setChains(prev => prev.filter(chain => chain.id !== chainId));
    onChainDelete?.(chainId);
  };

  const toggleHabitSelection = (habitId: string) => {
    setNewChain(prev => ({
      ...prev,
      selectedHabits: prev.selectedHabits.includes(habitId)
        ? prev.selectedHabits.filter(id => id !== habitId)
        : [...prev.selectedHabits, habitId]
    }));
  };

  const getHabitById = (habitId: string) => {
    return habits.find(h => h.id === habitId);
  };

  const getChainProgress = (chain: HabitChain) => {
    const chainHabits = chain.habits.map(id => getHabitById(id)).filter(Boolean);
    const completedToday = chainHabits.filter(habit => habit?.completedToday).length;
    return {
      total: chainHabits.length,
      completed: completedToday,
      percentage: chainHabits.length > 0 ? (completedToday / chainHabits.length) * 100 : 0,
    };
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
      <View className="gap-4">
        <View className="gap-2">
          <Text variant="h2">Habit Chains</Text>
          <Text variant="muted">
            Create chains of related habits to build powerful routines
          </Text>
        </View>

        {/* Create Chain Button */}
        <Button
          className="w-full"
          onPress={() => setShowCreateForm(true)}
        >
          <Icon as={PlusIcon} size={16} />
          <Text>Create Habit Chain</Text>
        </Button>

        {/* Create Chain Form */}
        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Habit Chain</CardTitle>
            </CardHeader>
            <CardContent>
              <View className="gap-4">
                {/* Chain Name */}
                <View className="gap-2">
                  <Text className="font-medium">Chain Name</Text>
                  <Text className="text-muted-foreground" variant="small">
                    Give your habit chain a descriptive name
                  </Text>
                  <View className="relative">
                    <Text className="text-muted-foreground" variant="small">
                      {newChain.name || "Enter chain name..."}
                    </Text>
                  </View>
                </View>

                {/* Chain Description */}
                <View className="gap-2">
                  <Text className="font-medium">Description</Text>
                  <Text className="text-muted-foreground" variant="small">
                    {newChain.description || "Enter chain description..."}
                  </Text>
                </View>

                {/* Trigger Habit */}
                <View className="gap-2">
                  <Text className="font-medium">Trigger Habit (Optional)</Text>
                  <Text className="text-muted-foreground" variant="small">
                    Select a habit that triggers this chain
                  </Text>
                  <Select
                    onValueChange={(value) =>
                      setNewChain(prev => ({ ...prev, triggerHabit: value }))
                    }
                    value={newChain.triggerHabit}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger habit" />
                    </SelectTrigger>
                    <SelectContent>
                      {habits.map((habit) => (
                        <SelectItem
                          key={habit.id}
                          label={habit.name}
                          value={habit.id}
                        >
                          {habit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </View>

                {/* Execution Order */}
                <View className="gap-2">
                  <Text className="font-medium">Execution Order</Text>
                  <Select
                    onValueChange={(value) =>
                      setNewChain(prev => ({ 
                        ...prev, 
                        order: value as "sequential" | "parallel" 
                      }))
                    }
                    value={newChain.order}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select execution order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem label="Sequential" value="sequential">
                        Sequential (one after another)
                      </SelectItem>
                      <SelectItem label="Parallel" value="parallel">
                        Parallel (all at once)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </View>

                {/* Habit Selection */}
                <View className="gap-2">
                  <Text className="font-medium">Select Habits</Text>
                  <Text className="text-muted-foreground" variant="small">
                    Choose habits to include in this chain
                  </Text>
                  <View className="gap-2">
                    {habits.map((habit) => (
                      <View
                        key={habit.id}
                        className={`flex-row items-center gap-3 rounded-lg p-3 ${
                          newChain.selectedHabits.includes(habit.id)
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-muted/50"
                        }`}
                      >
                        <Button
                          onPress={() => toggleHabitSelection(habit.id)}
                          size="sm"
                          variant={
                            newChain.selectedHabits.includes(habit.id)
                              ? "default"
                              : "outline"
                          }
                        >
                          <Icon
                            as={TargetIcon}
                            size={16}
                          />
                        </Button>
                        <View className="flex-1">
                          <Text className="font-medium">{habit.name}</Text>
                          <Text className="text-muted-foreground" variant="small">
                            {habit.category} • {habit.frequency}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row gap-3">
                  <Button
                    className="flex-1"
                    onPress={handleCreateChain}
                    disabled={!newChain.name.trim() || newChain.selectedHabits.length === 0}
                  >
                    <Text>Create Chain</Text>
                  </Button>
                  <Button
                    className="flex-1"
                    onPress={() => setShowCreateForm(false)}
                    variant="outline"
                  >
                    <Text>Cancel</Text>
                  </Button>
                </View>
              </View>
            </CardContent>
          </Card>
        )}

        {/* Existing Chains */}
        {chains.length > 0 && (
          <View className="gap-3">
            <Text variant="h3">Your Habit Chains</Text>
            {chains.map((chain) => {
              const progress = getChainProgress(chain);
              const triggerHabit = chain.triggerHabit ? getHabitById(chain.triggerHabit) : null;
              
              return (
                <Card key={chain.id}>
                  <CardContent className="p-4">
                    <View className="gap-3">
                      {/* Header */}
                      <View className="flex-row items-start justify-between">
                        <View className="flex-1">
                          <Text className="font-semibold">{chain.name}</Text>
                          <Text className="text-muted-foreground" variant="small">
                            {chain.description}
                          </Text>
                        </View>
                        <Button
                          onPress={() => handleDeleteChain(chain.id)}
                          size="sm"
                          variant="outline"
                        >
                          <Icon as={TrashIcon} size={16} />
                        </Button>
                      </View>

                      {/* Progress */}
                      <View className="gap-2">
                        <View className="flex-row items-center justify-between">
                          <Text className="font-medium">Progress</Text>
                          <Text className="font-semibold text-blue-600">
                            {progress.completed}/{progress.total} ({progress.percentage.toFixed(0)}%)
                          </Text>
                        </View>
                        <View className="h-2 rounded-full bg-muted">
                          <View
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </View>
                      </View>

                      {/* Trigger Habit */}
                      {triggerHabit && (
                        <View className="flex-row items-center gap-2">
                          <Icon
                            as={LinkIcon}
                            className="text-orange-500"
                            size={16}
                          />
                          <Text className="text-muted-foreground" variant="small">
                            Triggered by: {triggerHabit.name}
                          </Text>
                        </View>
                      )}

                      {/* Execution Order */}
                      <View className="flex-row items-center gap-2">
                        <Icon
                          as={TargetIcon}
                          className="text-green-500"
                          size={16}
                        />
                        <Text className="text-muted-foreground" variant="small">
                          {chain.order === "sequential" ? "Sequential execution" : "Parallel execution"}
                        </Text>
                      </View>

                      {/* Habits in Chain */}
                      <View className="gap-2">
                        <Text className="font-medium" variant="small">
                          Habits in this chain:
                        </Text>
                        <View className="flex-row flex-wrap gap-2">
                          {chain.habits.map((habitId) => {
                            const habit = getHabitById(habitId);
                            if (!habit) return null;
                            
                            return (
                              <View
                                key={habitId}
                                className={`rounded-full px-2 py-1 ${
                                  habit.completedToday
                                    ? "bg-green-100 dark:bg-green-900/20"
                                    : "bg-muted"
                                }`}
                              >
                                <Text
                                  className={`text-xs ${
                                    habit.completedToday
                                      ? "text-green-700 dark:text-green-300"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {habit.name}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  </CardContent>
                </Card>
              );
            })}
          </View>
        )}

        {/* Empty State */}
        {chains.length === 0 && !showCreateForm && (
          <Card>
            <CardContent className="p-8">
              <View className="items-center gap-4">
                <Icon
                  as={LinkIcon}
                  className="text-muted-foreground"
                  size={48}
                />
                <View className="items-center gap-2">
                  <Text className="font-semibold">No habit chains yet</Text>
                  <Text className="text-center" variant="muted">
                    Create your first habit chain to build powerful routines
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <View className="gap-2">
              <Text className="font-medium">About Habit Chains</Text>
              <Text className="text-muted-foreground" variant="small">
                • Chain related habits together to create powerful routines
              </Text>
              <Text className="text-muted-foreground" variant="small">
                • Sequential chains execute habits one after another
              </Text>
              <Text className="text-muted-foreground" variant="small">
                • Parallel chains execute all habits simultaneously
              </Text>
              <Text className="text-muted-foreground" variant="small">
                • Use trigger habits to automatically start chains
              </Text>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
