// app/(dashboard)/analytics/page.tsx
import { getAnalyticsData, calculateConsistencyScore } from "@/utils/actions";
import AnalyticsClient from "./AnalyticsClient";
export default async function AnalyticsPage() {
  const rawData = await getAnalyticsData();
  const analyticsData = {
    categoryData: rawData.categoryLogs,
    weeklyData: rawData.weeklyLogs.map((log) => ({
      date: log.week,
      count: log.count,
    })),
  };
  const consistencyScore = await calculateConsistencyScore();
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      <AnalyticsClient
        analyticsData={analyticsData}
        initialConsistencyScore={consistencyScore}
      />
    </div>
  );
}
