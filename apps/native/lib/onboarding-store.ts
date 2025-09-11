import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OnboardingData = {
  // Profile
  name: string;
  currency: string;
  timezone: string;

  // Financial
  accounts: {
    id: string;
    type: string;
    name: string;
    balance: number;
  }[];

  // Habits
  selectedCategories: string[];
  quickHabits: string[];

  // AI Preferences
  aiInsights: boolean;
  dailyReminders: boolean;
  weeklyReports: boolean;
  goalAlerts: boolean;

  // Completion
  isCompleted: boolean;
};

type OnboardingStore = {
  data: OnboardingData;
  updateProfile: (
    profile: Partial<Pick<OnboardingData, "name" | "currency" | "timezone">>
  ) => void;
  addAccount: (account: OnboardingData["accounts"][0]) => void;
  updateAccounts: (accounts: OnboardingData["accounts"]) => void;
  updateHabits: (categories: string[], habits: string[]) => void;
  updateAIPreferences: (
    preferences: Partial<
      Pick<
        OnboardingData,
        "aiInsights" | "dailyReminders" | "weeklyReports" | "goalAlerts"
      >
    >
  ) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

const initialData: OnboardingData = {
  name: "",
  currency: "USD",
  timezone: "UTC+0",
  accounts: [],
  selectedCategories: [],
  quickHabits: [],
  aiInsights: true,
  dailyReminders: true,
  weeklyReports: true,
  goalAlerts: true,
  isCompleted: false,
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      data: initialData,

      updateProfile: (profile) =>
        set((state) => ({
          data: { ...state.data, ...profile },
        })),

      addAccount: (account) =>
        set((state) => ({
          data: {
            ...state.data,
            accounts: [...state.data.accounts, account],
          },
        })),

      updateAccounts: (accounts) =>
        set((state) => ({
          data: { ...state.data, accounts },
        })),

      updateHabits: (categories, habits) =>
        set((state) => ({
          data: {
            ...state.data,
            selectedCategories: categories,
            quickHabits: habits,
          },
        })),

      updateAIPreferences: (preferences) =>
        set((state) => ({
          data: { ...state.data, ...preferences },
        })),

      completeOnboarding: () =>
        set((state) => ({
          data: { ...state.data, isCompleted: true },
        })),

      resetOnboarding: () => set({ data: initialData }),
    }),
    {
      name: "onboarding-storage",
      // Only persist essential data, not sensitive information
      partialize: (state) => ({
        data: {
          name: state.data.name,
          currency: state.data.currency,
          timezone: state.data.timezone,
          selectedCategories: state.data.selectedCategories,
          aiInsights: state.data.aiInsights,
          dailyReminders: state.data.dailyReminders,
          weeklyReports: state.data.weeklyReports,
          goalAlerts: state.data.goalAlerts,
          isCompleted: state.data.isCompleted,
        },
      }),
    }
  )
);
