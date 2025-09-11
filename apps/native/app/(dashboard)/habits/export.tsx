import React from "react";
import { Container } from "@/components/container";
import { HabitExport } from "@/components/habits/HabitExport";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ArrowLeftIcon } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function HabitExportScreen() {
  const handleExport = (format: "json" | "csv" | "pdf") => {
    // Handle export logic
    console.log(`Exporting as ${format}`);
  };

  const handleImport = (data: string) => {
    // Handle import logic
    console.log("Importing data:", data);
  };

  return (
    <Container>
      <View className="flex-row items-center gap-4 p-4">
        <Button
          onPress={() => router.back()}
          size="sm"
          variant="outline"
        >
          <Icon as={ArrowLeftIcon} size={16} />
        </Button>
        <Text variant="h2">Export & Backup</Text>
      </View>
      
      <HabitExport 
        onExport={handleExport}
        onImport={handleImport}
      />
    </Container>
  );
}
