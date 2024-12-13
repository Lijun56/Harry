// app/(dashboard)/tips/client.tsx
"use client";
import { recommendWeightedSuggestedHabits } from "@/utils/actions";
import { HabitCategory, SuggestedHabit, Tip } from "@prisma/client";
import { useState } from "react";
import { TipDialog } from "./TipDialog";
import { SuggestedHabitCard } from "./SuggestedHabitCard";

interface TipsClientProps {
  initialCategories: (HabitCategory & { tips: Tip[] })[];
  initialSuggestedHabits: SuggestedHabit[];
}

export default function TipsClient({
  initialCategories,
  initialSuggestedHabits,
}: TipsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    (HabitCategory & { tips: Tip[] }) | null
  >(null);

  const [suggestedHabits, setSuggestedHabits] = useState<{
    mostEngaged: SuggestedHabit[];
    categorySuggestions: { categoryName: string; habits: SuggestedHabit[] }[];
  }>({
    mostEngaged: initialSuggestedHabits,
    categorySuggestions: [],
  });
  const refetchSuggestedHabits = async () => {
    const weightedSuggestions = await recommendWeightedSuggestedHabits();
    setSuggestedHabits({
      mostEngaged: weightedSuggestions.mostEngaged.habits,
      categorySuggestions: weightedSuggestions.categorySuggestions,
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Centered Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight">
          Tips and Suggestions
        </h1>
      </div>

      {/* Categories Section - Vertical Stack on Mobile */}
      <div className="space-y-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto ">
          {initialCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className="relative p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white"
            >
              {/* Notification Badge */}
              {category.tips.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-medium">
                  {category.tips.length}
                </span>
              )}

              {/* Category Name - Centered */}
              <h3 className="text-center text-lg font-medium">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Suggested Habits Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Suggested Habits
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-4">
              <SuggestedHabitCard
                habits={suggestedHabits}
                onRefetch={refetchSuggestedHabits}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tips Dialog */}
      <TipDialog
        category={selectedCategory}
        suggestedHabits={
          suggestedHabits.categorySuggestions.find(
            (cat) => cat.categoryName === selectedCategory?.name
          )?.habits || []
        }
        onClose={() => setSelectedCategory(null)}
      />
    </div>
  );
}
