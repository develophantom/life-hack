import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Dashboard Store with Mock Data System
 * 
 * This store currently uses mock data for development purposes.
 * When the real database is ready, simply replace the mock data initialization
 * with database calls. The store interface remains the same.
 * 
 * Mock Data Includes:
 * - 4 sample accounts (checking, credit card, cash, mobile)
 * - 7 sample transactions across different categories
 * - 4 sample budget categories with spending data
 * 
 * To replace with real data:
 * 1. Remove mock data arrays
 * 2. Add database initialization calls
 * 3. Update store initialization to fetch from database
 * 
 * Example database integration:
 * ```typescript
 * // Replace mock data initialization with:
 * accounts: await db.accounts.findMany(),
 * transactions: await db.transactions.findMany(),
 * budgetCategories: await db.budgetCategories.findMany(),
 * ```
 */

// Development flag - set to false when using real database
const USE_MOCK_DATA = true;

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export type Account = {
  id: string;
  name: string;
  type: "bank" | "cash" | "credit" | "mobile";
  balance: number;
  currency: string;
  lastUpdated: string;
};

export type Transaction = {
  id: string;
  accountId: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: "income" | "expense";
};

export type Habit = {
  id: string;
  name: string;
  description: string;
  category: string;
  frequency: string;
  currentStreak: number;
  targetStreak: number;
  completedToday: boolean;
  lastCompleted: string;
  weeklyProgress: number[];
  reminderTime?: string;
  difficulty: "easy" | "medium" | "hard";
  createdAt: string;
  completionHistory: string[]; // Array of completion dates
};

export type BudgetCategory = {
  id: string;
  name: string;
  budget: number;
  spent: number;
  period: "monthly" | "weekly";
};

export type AIInsight = {
  id: string;
  type: "suggestion" | "analysis" | "prediction";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  actionable: boolean;
  category: "financial" | "habit" | "general";
};

export type DashboardData = {
  totalBalance: number;
  currency: string;
  balanceTrend: {
    weekly: number;
    monthly: number;
  };
  habitSummary: {
    onTrack: number;
    struggling: number;
    total: number;
  };
  financialSummary: {
    overBudget: number;
    onTrack: number;
    totalCategories: number;
  };
  healthScore: "excellent" | "good" | "needs-attention";
  lastUpdated: string;
};

export type QuickAction = {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
  priority: "high" | "medium" | "low";
};

type DashboardStore = {
  // Data
  accounts: Account[];
  transactions: Transaction[];
  habits: Habit[];
  budgetCategories: BudgetCategory[];
  aiInsights: AIInsight[];
  dashboardData: DashboardData;
  
  // Actions
  addAccount: (account: Omit<Account, "id" | "lastUpdated">) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  
  addHabit: (habit: Omit<Habit, "id" | "currentStreak" | "completedToday" | "lastCompleted" | "weeklyProgress" | "createdAt" | "completionHistory">) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  completeHabit: (id: string) => void;
  uncompleteHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  getTodayHabits: () => Habit[];
  getHabitStreaks: () => Habit[];
  getHabitAnalytics: (habitId: string) => {
    totalCompletions: number;
    completionRate: number;
    currentStreak: number;
    longestStreak: number;
    averageStreak: number;
    weeklyProgress: number[];
  } | null;
  calculateStreak: (completionHistory: string[]) => number;
  calculateLongestStreak: (completionHistory: string[]) => number;
  calculateAverageStreak: (completionHistory: string[]) => number;
  
  addBudgetCategory: (category: Omit<BudgetCategory, "id">) => void;
  updateBudgetCategory: (id: string, updates: Partial<BudgetCategory>) => void;
  deleteBudgetCategory: (id: string) => void;
  
  addAIInsight: (insight: Omit<AIInsight, "id">) => void;
  markInsightRead: (id: string) => void;
  
  // Computed
  getTotalBalance: () => number;
  getRecentTransactions: (limit?: number) => Transaction[];
  getTodaysHabits: () => Habit[];
  getQuickActions: () => QuickAction[];
  updateDashboardData: () => void;
}

// Mock data for development - will be replaced with real database data
const mockAccounts: Account[] = [
  {
    id: "acc_1",
    name: "Chase Checking",
    type: "bank",
    balance: 2450.75,
    currency: "USD",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "acc_2", 
    name: "Chase Credit Card",
    type: "credit",
    balance: -1250.30,
    currency: "USD",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "acc_3",
    name: "Cash Wallet",
    type: "cash", 
    balance: 85.50,
    currency: "USD",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "acc_4",
    name: "Apple Pay",
    type: "mobile",
    balance: 0.00,
    currency: "USD", 
    lastUpdated: new Date().toISOString(),
  },
];

const mockTransactions: Transaction[] = [
  {
    id: "tx_1",
    accountId: "acc_1",
    amount: 120.50,
    description: "Grocery shopping at Whole Foods",
    category: "food",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
  },
  {
    id: "tx_2",
    accountId: "acc_1", 
    amount: 2500.00,
    description: "Salary deposit",
    category: "income",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
  },
  {
    id: "tx_3",
    accountId: "acc_2",
    amount: 45.99,
    description: "Netflix subscription",
    category: "entertainment", 
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
  },
  {
    id: "tx_4",
    accountId: "acc_1",
    amount: 89.99,
    description: "Gas station fill-up",
    category: "transportation",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
  },
  {
    id: "tx_5",
    accountId: "acc_1",
    amount: 15.50,
    description: "Coffee shop",
    category: "food",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
  },
  {
    id: "tx_6",
    accountId: "acc_1",
    amount: 200.00,
    description: "Freelance project payment",
    category: "income",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "income",
  },
  {
    id: "tx_7",
    accountId: "acc_2",
    amount: 125.00,
    description: "Online shopping - Amazon",
    category: "shopping",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    type: "expense",
  },
];

const mockBudgetCategories: BudgetCategory[] = [
  {
    id: "budget_1",
    name: "Food & Dining",
    budget: 500.00,
    spent: 136.00,
    period: "monthly",
  },
  {
    id: "budget_2", 
    name: "Transportation",
    budget: 300.00,
    spent: 89.99,
    period: "monthly",
  },
  {
    id: "budget_3",
    name: "Entertainment", 
    budget: 100.00,
    spent: 45.99,
    period: "monthly",
  },
  {
    id: "budget_4",
    name: "Shopping",
    budget: 200.00,
    spent: 125.00,
    period: "monthly",
  },
];

const initialDashboardData: DashboardData = {
  totalBalance: 0,
  currency: "USD",
  balanceTrend: { weekly: 0, monthly: 0 },
  habitSummary: { onTrack: 0, struggling: 0, total: 0 },
  financialSummary: { overBudget: 0, onTrack: 0, totalCategories: 0 },
  healthScore: "needs-attention",
  lastUpdated: new Date().toISOString(),
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      // Initialize with mock data or empty arrays based on development flag
      accounts: USE_MOCK_DATA ? mockAccounts : [],
      transactions: USE_MOCK_DATA ? mockTransactions : [],
      habits: [],
      budgetCategories: USE_MOCK_DATA ? mockBudgetCategories : [],
      aiInsights: [],
      dashboardData: initialDashboardData,
      
      addAccount: (account) =>
        set((state) => ({
          accounts: [
            ...state.accounts,
            {
              ...account,
              id: `acc_${Date.now()}`,
              lastUpdated: new Date().toISOString(),
            },
          ],
        })),
      
      updateAccount: (id, updates) =>
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === id
              ? { ...acc, ...updates, lastUpdated: new Date().toISOString() }
              : acc
          ),
        })),
      
      deleteAccount: (id) =>
        set((state) => ({
          accounts: state.accounts.filter((acc) => acc.id !== id),
          transactions: state.transactions.filter((tx) => tx.accountId !== id),
        })),
      
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: `tx_${Date.now()}`,
            },
            ...state.transactions,
          ],
        })),
      
      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...updates } : tx
          ),
        })),
      
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),
      
      addHabit: (habit) =>
        set((state) => ({
          habits: [
            ...state.habits,
            {
              ...habit,
              id: `habit_${Date.now()}`,
              currentStreak: 0,
              completedToday: false,
              lastCompleted: "",
              weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
              createdAt: new Date().toISOString(),
              completionHistory: [],
            },
          ],
        })),
      
      updateHabit: (id, updates) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, ...updates } : habit
          ),
        })),
      
      completeHabit: (id) =>
        set((state) => {
          const today = new Date().toISOString().split("T")[0];
          return {
            habits: state.habits.map((habit) => {
              if (habit.id === id) {
                const wasCompletedToday = habit.completedToday;
                if (wasCompletedToday) return habit; // Already completed today
                
                const newCompletionHistory = [...habit.completionHistory, today];
                const newStreak = get().calculateStreak(newCompletionHistory);
                
                return {
                  ...habit,
                  completedToday: true,
                  currentStreak: newStreak,
                  lastCompleted: today,
                  completionHistory: newCompletionHistory,
                  weeklyProgress: [
                    ...habit.weeklyProgress.slice(1),
                    1,
                  ],
                };
              }
              return habit;
            }),
          };
        }),
      
      uncompleteHabit: (id) =>
        set((state) => {
          const today = new Date().toISOString().split("T")[0];
          return {
            habits: state.habits.map((habit) => {
              if (habit.id === id && habit.completedToday) {
                const newCompletionHistory = habit.completionHistory.filter(date => date !== today);
                const newStreak = get().calculateStreak(newCompletionHistory);
                
                return {
                  ...habit,
                  completedToday: false,
                  currentStreak: newStreak,
                  completionHistory: newCompletionHistory,
                  weeklyProgress: [
                    ...habit.weeklyProgress.slice(1),
                    0,
                  ],
                };
              }
              return habit;
            }),
          };
        }),
      
      deleteHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),
      
      addBudgetCategory: (category) =>
        set((state) => ({
          budgetCategories: [
            ...state.budgetCategories,
            {
              ...category,
              id: `budget_${Date.now()}`,
            },
          ],
        })),
      
      updateBudgetCategory: (id, updates) =>
        set((state) => ({
          budgetCategories: state.budgetCategories.map((cat) =>
            cat.id === id ? { ...cat, ...updates } : cat
          ),
        })),
      
      deleteBudgetCategory: (id) =>
        set((state) => ({
          budgetCategories: state.budgetCategories.filter((cat) => cat.id !== id),
        })),
      
      addAIInsight: (insight) =>
        set((state) => ({
          aiInsights: [
            {
              ...insight,
              id: `insight_${Date.now()}`,
            },
            ...state.aiInsights,
          ],
        })),
      
      markInsightRead: (id) =>
        set((state) => ({
          aiInsights: state.aiInsights.filter((insight) => insight.id !== id),
        })),
      
      getTotalBalance: () => {
        const { accounts } = get();
        return accounts.reduce((total, acc) => total + acc.balance, 0);
      },
      
      getRecentTransactions: (limit = 10) => {
        const { transactions } = get();
        return transactions
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit);
      },
      
      getTodaysHabits: () => {
        const { habits } = get();
        return habits.filter((habit) => !habit.completedToday);
      },
      
      getTodayHabits: () => {
        const { habits } = get();
        return habits;
      },
      
      getHabitStreaks: () => {
        const { habits } = get();
        return habits.sort((a, b) => b.currentStreak - a.currentStreak);
      },
      
      getHabitAnalytics: (habitId) => {
        const { habits } = get();
        const habit = habits.find(h => h.id === habitId);
        if (!habit) return null;
        
        const totalCompletions = habit.completionHistory.length;
        const MILLISECONDS_PER_DAY = MILLISECONDS_PER_DAY;
        const daysSinceCreation = Math.ceil((Date.now() - new Date(habit.createdAt).getTime()) / MILLISECONDS_PER_DAY);
        const completionRate = habit.completionHistory.length > 0 
          ? (habit.completionHistory.length / daysSinceCreation) * 100
          : 0;
        
        return {
          totalCompletions,
          completionRate: Math.min(completionRate, 100),
          currentStreak: habit.currentStreak,
          longestStreak: get().calculateLongestStreak(habit.completionHistory),
          averageStreak: get().calculateAverageStreak(habit.completionHistory),
          weeklyProgress: habit.weeklyProgress,
        };
      },
      
      calculateStreak: (completionHistory) => {
        if (completionHistory.length === 0) return 0;
        
        const sortedDates = completionHistory
          .map(date => new Date(date))
          .sort((a, b) => b.getTime() - a.getTime());
        
        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < sortedDates.length; i++) {
          const date = new Date(sortedDates[i]);
          date.setHours(0, 0, 0, 0);
          
          const expectedDate = new Date(today);
          expectedDate.setDate(today.getDate() - i);
          
          if (date.getTime() === expectedDate.getTime()) {
            streak++;
          } else {
            break;
          }
        }
        
        return streak;
      },
      
      calculateLongestStreak: (completionHistory) => {
        if (completionHistory.length === 0) return 0;
        
        const sortedDates = completionHistory
          .map(date => new Date(date))
          .sort((a, b) => a.getTime() - b.getTime());
        
        let longestStreak = 0;
        let currentStreak = 1;
        
        for (let i = 1; i < sortedDates.length; i++) {
          const prevDate = new Date(sortedDates[i - 1]);
          const currDate = new Date(sortedDates[i]);
          
          const diffTime = currDate.getTime() - prevDate.getTime();
          const diffDays = Math.ceil(diffTime / (MILLISECONDS_PER_DAY));
          
          if (diffDays === 1) {
            currentStreak++;
          } else {
            longestStreak = Math.max(longestStreak, currentStreak);
            currentStreak = 1;
          }
        }
        
        return Math.max(longestStreak, currentStreak);
      },
      
      calculateAverageStreak: (completionHistory) => {
        if (completionHistory.length === 0) return 0;
        
        const sortedDates = completionHistory
          .map(date => new Date(date))
          .sort((a, b) => a.getTime() - b.getTime());
        
        const streaks = [];
        let currentStreak = 1;
        
        for (let i = 1; i < sortedDates.length; i++) {
          const prevDate = new Date(sortedDates[i - 1]);
          const currDate = new Date(sortedDates[i]);
          
          const diffTime = currDate.getTime() - prevDate.getTime();
          const diffDays = Math.ceil(diffTime / (MILLISECONDS_PER_DAY));
          
          if (diffDays === 1) {
            currentStreak++;
          } else {
            streaks.push(currentStreak);
            currentStreak = 1;
          }
        }
        streaks.push(currentStreak);
        
        return streaks.length > 0 ? streaks.reduce((sum, streak) => sum + streak, 0) / streaks.length : 0;
      },
      
      getQuickActions: () => {
        const { accounts, habits, budgetCategories } = get();
        const actions: QuickAction[] = [];
        
        if (accounts.length === 0) {
          actions.push({
            id: "add_account",
            title: "Add Account",
            description: "Set up your first account",
            icon: "WalletIcon",
            action: () => {
              // Add account action
            },
            priority: "high",
          });
        }
        
        if (habits.length === 0) {
          actions.push({
            id: "add_habit",
            title: "Add Habit",
            description: "Start tracking your first habit",
            icon: "TargetIcon",
            action: () => {
              // Add habit action
            },
            priority: "high",
          });
        }
        
        const overBudget = budgetCategories.filter(
          (cat) => cat.spent > cat.budget
        ).length;
        
        if (overBudget > 0) {
          actions.push({
            id: "review_budget",
            title: "Review Budget",
            description: `${overBudget} categories over budget`,
            icon: "AlertTriangleIcon",
            action: () => {
              // Review budget action
            },
            priority: "high",
          });
        }
        
        return actions;
      },
      
      updateDashboardData: () => {
        const { accounts, habits, budgetCategories } = get();
        const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
        
        const onTrackHabits = habits.filter((h) => h.currentStreak >= 3).length;
        const strugglingHabits = habits.filter((h) => h.currentStreak < 3).length;
        
        const overBudget = budgetCategories.filter(
          (cat) => cat.spent > cat.budget
        ).length;
        const onTrackBudget = budgetCategories.filter(
          (cat) => cat.spent <= cat.budget
        ).length;
        
        let healthScore: "excellent" | "good" | "needs-attention" = "needs-attention";
        if (onTrackHabits >= habits.length * 0.8 && overBudget === 0) {
          healthScore = "excellent";
        } else if (onTrackHabits >= habits.length * 0.5 && overBudget <= 1) {
          healthScore = "good";
        }
        
        set({
          dashboardData: {
            totalBalance,
            currency: accounts[0]?.currency || "USD",
            balanceTrend: { weekly: 0, monthly: 0 }, // TODO: Calculate trends
            habitSummary: {
              onTrack: onTrackHabits,
              struggling: strugglingHabits,
              total: habits.length,
            },
            financialSummary: {
              overBudget,
              onTrack: onTrackBudget,
              totalCategories: budgetCategories.length,
            },
            healthScore,
            lastUpdated: new Date().toISOString(),
          },
        });
      },
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({
        accounts: state.accounts,
        transactions: state.transactions.slice(0, 50), // Keep only recent transactions
        habits: state.habits,
        budgetCategories: state.budgetCategories,
        aiInsights: state.aiInsights.slice(0, 20), // Keep only recent insights
      }),
    }
  )
);
