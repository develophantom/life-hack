import React from "react";
import { Container } from "@/components/container";
import { AddHabitForm } from "@/components/habits/AddHabitForm";

export default function AddHabitScreen() {
  const handleClose = () => {
    // Navigate back to habits screen
    const { router } = require("expo-router");
    router.back();
  };

  return (
    <Container>
      <AddHabitForm onClose={handleClose} />
    </Container>
  );
}
