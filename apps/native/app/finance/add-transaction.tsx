import React from "react";
import { Container } from "@/components/container";
import { AddTransactionForm } from "@/components/dashboard/AddTransactionForm";

export default function AddTransactionScreen() {
  const handleClose = () => {
    // Navigate back to finance screen
    const { router } = require("expo-router");
    router.back();
  };

  return (
    <Container>
      <AddTransactionForm onClose={handleClose} />
    </Container>
  );
}
