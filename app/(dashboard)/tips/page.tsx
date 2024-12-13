// app/(dashboard)/tips/page.tsx
import {
  fetchCategories,
  recommendWeightedSuggestedHabits,
} from "@/utils/actions";
import TipsClient from "./client";

export default async function TipsPage() {
  const [categories, weightedSuggestions] = await Promise.all([
    fetchCategories(),
    recommendWeightedSuggestedHabits(),
  ]);

  return (
    <TipsClient
      initialCategories={categories}
      initialSuggestedHabits={weightedSuggestions.mostEngaged.habits}
    />
  );
}
