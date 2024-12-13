// app/(dashboard)/tips/TipDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HabitCategory, SuggestedHabit, Tip } from "@prisma/client";
// In TipDialog.tsx, update the interface and component:
interface TipDialogProps {
  category: (HabitCategory & { tips: Tip[] }) | null;
  suggestedHabits: SuggestedHabit[];
  onClose: () => void;
}

export function TipDialog({
  category,
  suggestedHabits,
  onClose,
}: TipDialogProps) {
  if (!category) return null;

  return (
    <Dialog open={!!category} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category.name} Tips</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {category.tips.map((tip) => (
            <div key={tip.id} className="p-4 border rounded-lg">
              <p>{tip.description}</p>
              {tip.equation && (
                <p className="mt-2 text-sm text-gray-500">{tip.equation}</p>
              )}
            </div>
          ))}
          {suggestedHabits.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Suggested Habits</h3>
              {suggestedHabits.map((habit) => (
                <div key={habit.id} className="p-4 border rounded-lg mb-2">
                  <p className="font-medium">{habit.name}</p>
                  {/* <p className="text-sm text-gray-600">{habit.description}</p> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
