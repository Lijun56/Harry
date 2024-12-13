'use server';
import { $Enums, PrismaClient,SuggestedHabit } from '@prisma/client';
import {  currentUser } from '@clerk/nextjs/server';


const prisma = new PrismaClient();

const now = new Date();

// Start of today
const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

// Start of the week (assuming week starts on Sunday)
const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
const startOfWeek = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - dayOfWeek
);
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('You must be logged in to access this route');
  }
  return user;
};
// Start of the month
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

// Fetch habits that need to be checked in based on the log date and frequency
export async function FetchTodoHabits() {
  const user = await getAuthUser();
  const habitsToCheckIn = await prisma.habit.findMany({
    where: {
      clerkUserId: user.id,
      OR: [
        {
          // Check if the habit is daily and the log date is not today
          frequency: 'DAILY',
          NOT: {
            logs: {
              some: {
                logDate: {
                  gte: startOfDay, // Logs from today
                },
              },
            },
          },
        },
        {
          // Check if the habit is weekly and the log date is not from this week
          frequency: 'WEEKLY',
          NOT: {
            logs: {
              some: {
                logDate: {
                  gte: startOfWeek, // Logs from this week
                },
              },
            },
          },
        },
        {
          // Check if the habit is monthly and the log date is not from this month
          frequency: 'MONTHLY',
          NOT: {
            logs: {
              some: {
                logDate: {
                  gte: startOfMonth, // Logs from this month
                },
              },
            },
          },
        },
      ],
    },
  });

  return habitsToCheckIn;
}

export async function updateHabitLog(habitId: string) {
  const now = new Date();

  // Create a new log entry
  await prisma.log.create({
    data: {
      id: crypto.randomUUID(),
      habitId: habitId,
      logDate: now,
      completed: true,
    },
  });
}

export async function createHabit(
  clerkUserId: string,
  habitData: { name: string; category: string; frequency: $Enums.Frequency }
) {
  const { name, category, frequency } = habitData;

  // Find or create the category
  let categoryRecord = await prisma.habitCategory.findUnique({
    where: { name: category },
  });

  if (!categoryRecord) {
    categoryRecord = await prisma.habitCategory.create({
      data: {
        id: crypto.randomUUID(),
        name: category,
      },
    });
  }

  // Create the new habit
 const newHabit = await prisma.habit.create({
    data: {
      id: crypto.randomUUID(),
      clerkUserId,
      name,
      categoryName: category,
      frequency,
    },
  });

  return newHabit;
}


// delete habit based on habit id
export async function deleteHabit(habitId: string) {
  await prisma.habit.delete({
    where: {
      id: habitId,
    },
  });
}


//tips page
// actions.ts
export async function fetchTipsByCategory(categoryName: string) {
  const tips = await prisma.tip.findMany({
    where: { categoryName },
    include: { category: true }
  });
  return tips;
}

export async function fetchSuggestedHabits() {
  const suggestions = await prisma.suggestedHabit.findMany({
    include: { category: true }
  });
  return suggestions;
}

export async function fetchCategories() {
  const categories = await prisma.habitCategory.findMany({
    include: {
      tips: true,
    }
  });
  return categories;
}

export async function deleteSuggestedHabit(id: string) {
  await prisma.suggestedHabit.delete({
    where: { id },
  });
}


// analytics action
 // actions.ts
// Add these imports at the top
import { endOfWeek, eachWeekOfInterval, format } from "date-fns";

// Add these analytics actions
export async function getAnalyticsData() {
  const user = await getAuthUser();

  // Get all logs with their categories
  const logs = await prisma.log.findMany({
    where: {
      habit: {
        clerkUserId: user.id,
      },
    },
    include: {
      habit: {
        include: {
          category: true,
        },
      },
    },
  });

  // Calculate category distribution
  const categoryLogs = logs.reduce((acc, log) => {
    const categoryName = log.habit.category.name;
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get date range
  const firstLog = logs.reduce(
    (earliest, log) =>
      log.logDate < earliest ? log.logDate : earliest,
    new Date()
  );

  // Generate weekly intervals
  const weekIntervals = eachWeekOfInterval({
    start: firstLog,
    end: new Date(),
  });

  // Count logs per week
  const weeklyLogs = weekIntervals.map((weekStart) => {
    const weekEnd = endOfWeek(weekStart);
    const count = logs.filter(
      (log) => log.logDate >= weekStart && log.logDate <= weekEnd
    ).length;

    return {
      week: format(weekStart, 'yyyy-MM-dd'),
      count,
    };
  });

  return {
    categoryLogs,
    weeklyLogs,
  };
}
export async function getTodayLogsCount() {
  const user = await getAuthUser();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const count = await prisma.log.count({
    where: {
      habit: {
        clerkUserId: user.id,
      },
      logDate: {
        gte: startOfToday,
      },
    },
  });

  return Math.min(60, count * 20); // Scale count to max 60
}
// utils/actions.ts

import { differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns';

export async function calculateConsistencyScore(): Promise<number> {
  const user = await getAuthUser();
  const userId = user.id;
  const now = new Date();
  
  // Get all habits and their logs
  const habits = await prisma.habit.findMany({
    where: {
      clerkUserId: userId,
    },
    include: {
      logs: {
        orderBy: {
          logDate: 'desc',
        },
      },
    },
  });

  if (habits.length === 0) return 0;

  const habitScores = habits.map(habit => {
    const { frequency, logs } = habit;
    
    // Calculate expected log count based on frequency
    let expectedLogs = 0;
    const actualLogs = logs.length;
    
    switch (frequency) {
      case 'DAILY': {
        const daysTracked = differenceInDays(now, habit.logs[0]?.logDate || now);
        expectedLogs = daysTracked;
        break;
      }
      case 'WEEKLY': {
        const weeksTracked = differenceInWeeks(now, habit.logs[0]?.logDate || now);
        expectedLogs = weeksTracked;
        break;
      }
      case 'MONTHLY': {
        const monthsTracked = differenceInMonths(now, habit.logs[0]?.logDate || now);
        expectedLogs = monthsTracked;
        break;
      }
    }

    // Calculate recency weight (more recent logs count more)
    const recentLogs = logs.filter(log => {
      const daysSinceLog = differenceInDays(now, log.logDate);
      return daysSinceLog <= 30; // Consider last 30 days
    }).length;

    // Calculate base consistency
    const baseConsistency = expectedLogs > 0 ? (actualLogs / expectedLogs) : 0;
    
    // Apply recency bonus
    const recentWeight = 0.3; // 30% weight to recent activity
    const recentConsistency = recentLogs / 30; // Normalize to 0-1
    
    return (baseConsistency * (1 - recentWeight)) + (recentConsistency * recentWeight);
  });

  // Calculate final score (0-60)
  const averageScore = habitScores.reduce((sum, score) => sum + score, 0) / habitScores.length;
  const finalScore = Math.round(averageScore * 60);

  return Math.min(60, Math.max(0, finalScore));
}


// tips
// actions.ts

interface WeightedSuggestionsResult {
  mostEngaged: {
    categoryName: string;
    habits: SuggestedHabit[];
  };
  categorySuggestions: Array<{
    categoryName: string;
    habits: SuggestedHabit[];
  }>;
}
export async function recommendWeightedSuggestedHabits(): Promise<WeightedSuggestionsResult> {
  const user = await getAuthUser();

  // Get user's habits and logs
  const habits = await prisma.habit.findMany({
    where: { clerkUserId: user.id },
    include: {
      logs: true,
    },
  });

  // Calculate engagement per category
  const categoryEngagement: Record<string, number> = {};
  habits.forEach(habit => {
    categoryEngagement[habit.categoryName] = (categoryEngagement[habit.categoryName] || 0) + habit.logs.length;
  });

  // Find most engaged category
  const mostEngagedCategory = Object.entries(categoryEngagement)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'Well-being'; // Default if no logs

  // Get current habits per category
  const habitsPerCategory = habits.reduce((acc, habit) => {
    acc[habit.categoryName] = (acc[habit.categoryName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Fetch suggestions for all categories
  const allCategories = await prisma.habitCategory.findMany();
  
  // Get suggestions for most engaged category
  const mostEngagedHabits = await prisma.suggestedHabit.findMany({
    where: { 
      categoryName: mostEngagedCategory,
      // Exclude if user already has this habit
      AND: {
        name: {
          notIn: habits.map(h => h.name)
        }
      }
    },
    take: 3, // Limit to 3 suggestions
  });

  // Get suggestions for each category
  const categorySuggestions = await Promise.all(
    allCategories
      .filter(cat => cat.name !== mostEngagedCategory) // Exclude most engaged category
      .map(async (category) => {
        const existingHabitsCount = habitsPerCategory[category.name] || 0;

        // Skip if category has many habits already
        if (existingHabitsCount >= 5) {
          return {
            categoryName: category.name,
            habits: [],
          };
        }

        const suggestedHabits = await prisma.suggestedHabit.findMany({
          where: { 
            categoryName: category.name,
            AND: {
              name: {
                notIn: habits.map(h => h.name)
              }
            }
          },
          take: 2, // Limit to 2 suggestions per category
        });

        return {
          categoryName: category.name,
          habits: suggestedHabits,
        };
      })
  );

  return {
    mostEngaged: {
      categoryName: mostEngagedCategory,
      habits: mostEngagedHabits,
    },
    categorySuggestions: categorySuggestions.filter(cat => cat.habits.length > 0),
  };
}