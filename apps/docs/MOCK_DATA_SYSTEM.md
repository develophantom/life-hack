# Mock Data System for Finance Features

## Overview

The finance system currently uses mock data to demonstrate all functionality while the real database is being set up. This provides a seamless development experience and allows you to see the full finance system in action.

## Mock Data Included

### Accounts (4 sample accounts)
- **Chase Checking**: $2,450.75 (bank account)
- **Chase Credit Card**: -$1,250.30 (credit card with debt)
- **Cash Wallet**: $85.50 (cash account)
- **Apple Pay**: $0.00 (mobile payment account)

### Transactions (7 sample transactions)
- Grocery shopping at Whole Foods ($120.50)
- Salary deposit ($2,500.00)
- Netflix subscription ($45.99)
- Gas station fill-up ($89.99)
- Coffee shop ($15.50)
- Freelance project payment ($200.00)
- Online shopping - Amazon ($125.00)

### Budget Categories (4 sample budgets)
- **Food & Dining**: $500 budget, $136 spent (27% used)
- **Transportation**: $300 budget, $89.99 spent (30% used)
- **Entertainment**: $100 budget, $45.99 spent (46% used)
- **Shopping**: $200 budget, $125 spent (63% used)

## How It Works

The mock data is initialized in `apps/native/lib/dashboard-store.ts` with a simple flag system:

```typescript
// Development flag - set to false when using real database
const USE_MOCK_DATA = true;

// Store initialization
accounts: USE_MOCK_DATA ? mockAccounts : [],
transactions: USE_MOCK_DATA ? mockTransactions : [],
budgetCategories: USE_MOCK_DATA ? mockBudgetCategories : [],
```

## Drop-in Replacement for Real Database

When the real database is ready, simply:

1. **Set the flag to false**:
   ```typescript
   const USE_MOCK_DATA = false;
   ```

2. **Replace mock data with database calls**:
   ```typescript
   // Instead of mock data arrays, use:
   accounts: await db.accounts.findMany(),
   transactions: await db.transactions.findMany(),
   budgetCategories: await db.budgetCategories.findMany(),
   ```

3. **Remove mock data arrays** (optional cleanup)

## Benefits

✅ **Full Feature Testing**: See all finance features working with realistic data
✅ **No Database Dependency**: Develop and test without database setup
✅ **Easy Transition**: Simple flag change to switch to real data
✅ **Realistic Scenarios**: Mock data covers various use cases
✅ **Immediate Demo**: Show stakeholders the complete system

## What You Can Test

With the mock data, you can test:

- ✅ **Overview Tab**: See total balance ($1,286.95), monthly spending, recent transactions
- ✅ **Accounts Tab**: View all 4 accounts with balances and types
- ✅ **Transactions Tab**: Browse all 7 transactions with categories and dates
- ✅ **Budgets Tab**: See budget progress with visual indicators
- ✅ **Add/Edit/Delete**: All CRUD operations work with mock data
- ✅ **WeeklyFinanceSummary**: Chart shows income vs expenses over 7 days
- ✅ **Navigation**: All screens and routing work perfectly

## Next Steps

1. **Test the system** with the mock data
2. **Set up real database** when ready
3. **Change flag** to `USE_MOCK_DATA = false`
4. **Add database integration** calls
5. **Remove mock data** arrays (optional)

The finance system is now fully functional with realistic data! 🎉
