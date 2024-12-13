// SuggestedHabitCard.tsx
import { Button } from "@/components/ui/button";
import { createHabit, deleteSuggestedHabit } from "@/utils/actions";
import { SuggestedHabit } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Plus, ChevronRight, ChevronLeft } from "lucide-react";
// SuggestedHabitCard.tsx
interface SuggestedHabitCardProps {
  habits: {
    mostEngaged: SuggestedHabit[];
    categorySuggestions: { categoryName: string; habits: SuggestedHabit[] }[];
  };
  onRefetch: () => Promise<void>;
}

export function SuggestedHabitCard({
  habits,
  onRefetch,
}: SuggestedHabitCardProps) {
  const { user } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get all habits in a flat array
  const allHabits = [...habits.mostEngaged];

  if (allHabits.length === 0) {
    return (
      <div className="p-6 border rounded-xl shadow-sm bg-white text-center text-gray-500">
        No suggested habits available
      </div>
    );
  }

  const handleAddHabit = async () => {
    if (!user || allHabits.length === 0) return;

    setIsAdding(true);
    try {
      await createHabit(user.id, {
        name: allHabits[currentIndex].name,
        category: allHabits[currentIndex].categoryName,
        frequency: allHabits[currentIndex].frequency,
      });

      await deleteSuggestedHabit(allHabits[currentIndex].id);
      await onRefetch();

      if (currentIndex >= allHabits.length - 1) {
        setCurrentIndex(Math.max(0, allHabits.length - 2));
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allHabits.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allHabits.length) % allHabits.length);
  };

  return (
    <div className="relative p-6 border rounded-xl shadow-sm bg-white min-h-[150px]">
      <Button
        variant="outline"
        size="icon"
        disabled={isAdding}
        onClick={handleAddHabit}
        className="absolute top-2 right-2 rounded-full h-10 w-10 hover:bg-blue-50"
      >
        <Plus className="h-5 w-5" />
      </Button>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrev}
          className="rounded-full h-10 w-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold">
            {allHabits[currentIndex].name}
          </h3>
          <p className="text-sm text-gray-500 capitalize">
            {allHabits[currentIndex].frequency.toLowerCase()}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="rounded-full h-10 w-10"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
