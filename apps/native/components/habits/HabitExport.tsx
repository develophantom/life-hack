import { DownloadIcon, FileTextIcon, ShareIcon, UploadIcon } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useDashboardStore } from "@/lib/dashboard-store";

type ExportFormat = "json" | "csv" | "pdf";

type HabitExportProps = {
  onExport?: (format: ExportFormat) => void;
  onImport?: (data: string) => void;
};

export function HabitExport({ onExport, onImport }: HabitExportProps) {
  const { habits } = useDashboardStore();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = async (format: ExportFormat) => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const exportData = habits.map(habit => ({
        name: habit.name,
        description: habit.description,
        category: habit.category,
        frequency: habit.frequency,
        targetStreak: habit.targetStreak,
        difficulty: habit.difficulty,
        reminderTime: habit.reminderTime,
        createdAt: habit.createdAt,
        completionHistory: habit.completionHistory,
        currentStreak: habit.currentStreak,
      }));

      let exportContent: string;
      let filename: string;

      switch (format) {
        case "json":
          exportContent = JSON.stringify(exportData, null, 2);
          filename = `habits-export-${new Date().toISOString().split('T')[0]}.json`;
          break;
        case "csv":
          const csvHeaders = "Name,Description,Category,Frequency,Target Streak,Difficulty,Reminder Time,Created At,Current Streak,Total Completions\n";
          const csvRows = exportData.map(habit => 
            `"${habit.name}","${habit.description}","${habit.category}","${habit.frequency}",${habit.targetStreak},"${habit.difficulty}","${habit.reminderTime || ''}","${habit.createdAt}",${habit.currentStreak},${habit.completionHistory.length}`
          ).join('\n');
          exportContent = csvHeaders + csvRows;
          filename = `habits-export-${new Date().toISOString().split('T')[0]}.csv`;
          break;
        case "pdf":
          // For PDF, we'd typically use a library like react-native-pdf
          exportContent = "PDF export would be implemented here";
          filename = `habits-export-${new Date().toISOString().split('T')[0]}.pdf`;
          break;
      }

      onExport?.(format);
      
      // In a real app, you would save the file or share it
      console.log(`Exporting ${filename}:`, exportContent);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = () => {
    setIsImporting(true);
    // In a real app, you would open a file picker
    // For now, we'll simulate the import process
    setTimeout(() => {
      setIsImporting(false);
      // onImport?.(importedData);
    }, 1000);
  };

  const getExportStats = () => {
    const totalHabits = habits.length;
    const activeHabits = habits.filter(h => h.currentStreak > 0).length;
    const completedHabits = habits.filter(h => h.currentStreak >= h.targetStreak).length;
    const totalCompletions = habits.reduce((sum, h) => sum + h.completionHistory.length, 0);

    return {
      totalHabits,
      activeHabits,
      completedHabits,
      totalCompletions,
    };
  };

  const stats = getExportStats();

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
      <View className="gap-4">
        <View className="gap-2">
          <Text variant="h2">Export & Backup</Text>
          <Text variant="muted">
            Export your habits data or import from a backup
          </Text>
        </View>

        {/* Stats Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Your Data Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="font-medium">Total Habits</Text>
                <Text className="font-bold text-blue-600">
                  {stats.totalHabits}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="font-medium">Active Habits</Text>
                <Text className="font-bold text-green-600">
                  {stats.activeHabits}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="font-medium">Completed Habits</Text>
                <Text className="font-bold text-purple-600">
                  {stats.completedHabits}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="font-medium">Total Completions</Text>
                <Text className="font-bold text-orange-600">
                  {stats.totalCompletions}
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="gap-3">
              <Text className="text-muted-foreground" variant="small">
                Choose a format to export your habits data:
              </Text>
              
              <View className="gap-2">
                <Button
                  className="w-full"
                  disabled={isExporting || habits.length === 0}
                  onPress={() => handleExport("json")}
                  variant="outline"
                >
                  <Icon as={FileTextIcon} size={16} />
                  <Text>Export as JSON</Text>
                </Button>
                
                <Button
                  className="w-full"
                  disabled={isExporting || habits.length === 0}
                  onPress={() => handleExport("csv")}
                  variant="outline"
                >
                  <Icon as={FileTextIcon} size={16} />
                  <Text>Export as CSV</Text>
                </Button>
                
                <Button
                  className="w-full"
                  disabled={isExporting || habits.length === 0}
                  onPress={() => handleExport("pdf")}
                  variant="outline"
                >
                  <Icon as={FileTextIcon} size={16} />
                  <Text>Export as PDF</Text>
                </Button>
              </View>

              {habits.length === 0 && (
                <Text className="text-center text-muted-foreground" variant="small">
                  No habits to export
                </Text>
              )}
            </View>
          </CardContent>
        </Card>

        {/* Import Options */}
        <Card>
          <CardHeader>
            <CardTitle>Import Data</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="gap-3">
              <Text className="text-muted-foreground" variant="small">
                Import habits from a backup file:
              </Text>
              
              <Button
                className="w-full"
                disabled={isImporting}
                onPress={handleImport}
                variant="outline"
              >
                <Icon as={UploadIcon} size={16} />
                <Text>Import from File</Text>
              </Button>

              <Text className="text-center text-muted-foreground" variant="small">
                Supported formats: JSON, CSV
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Share Options */}
        <Card>
          <CardHeader>
            <CardTitle>Share Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="gap-3">
              <Text className="text-muted-foreground" variant="small">
                Share your habit progress with friends:
              </Text>
              
              <Button
                className="w-full"
                disabled={habits.length === 0}
                onPress={() => {
                  // In a real app, you would share the data
                  console.log('Sharing habit progress');
                }}
                variant="outline"
              >
                <Icon as={ShareIcon} size={16} />
                <Text>Share Progress</Text>
              </Button>

              {habits.length === 0 && (
                <Text className="text-center text-muted-foreground" variant="small">
                  No progress to share
                </Text>
              )}
            </View>
          </CardContent>
        </Card>

        {/* Backup Info */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <View className="gap-2">
              <Text className="font-medium">Backup Information</Text>
              <Text className="text-muted-foreground" variant="small">
                • Your data is automatically backed up locally
              </Text>
              <Text className="text-muted-foreground" variant="small">
                • Export your data regularly for additional safety
              </Text>
              <Text className="text-muted-foreground" variant="small">
                • Import functionality allows you to restore from backups
              </Text>
              <Text className="text-muted-foreground" variant="small">
                • Sharing is optional and respects your privacy
              </Text>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
