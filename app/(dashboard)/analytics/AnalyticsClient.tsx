// AnalyticsClient.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import AnalyticsChart from "@/components/AnalyticsChart/AnalyticsChart";
import { Button } from "@/components/ui/button";
import { getTodayLogsCount } from "@/utils/actions";

type TimePeriod = "TODAY" | "WEEK" | "MONTH";

interface AnalyticsClientProps {
  analyticsData: {
    categoryData: Record<string, number>;
    weeklyData: Array<{ date: string; count: number }>;
  };
  initialConsistencyScore: number;
}

const AnalyticsClient = ({
  analyticsData,
  initialConsistencyScore,
}: AnalyticsClientProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("TODAY");
  const [growthValue, setGrowthValue] = useState(0);

  const { RiveComponent, rive } = useRive({
    src: "/assets/tree_demo.riv",
    stateMachines: "Grow",
    autoplay: true,
  });

  const growthInput = useStateMachineInput(rive, "Grow", "input");

  useEffect(() => {
    const updateGrowthValue = async () => {
      let newValue = 0;

      switch (selectedPeriod) {
        case "TODAY":
          newValue = await getTodayLogsCount();
          break;
        case "WEEK":
        case "MONTH":
          newValue = initialConsistencyScore;
          break;
      }

      setGrowthValue(newValue);
    };

    updateGrowthValue();
  }, [selectedPeriod, initialConsistencyScore]);

  useEffect(() => {
    if (growthInput) {
      growthInput.value = growthValue;
    }
  }, [growthValue, growthInput]);

  return (
    <div>
      {/* Time Period Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <Button
          variant={selectedPeriod === "TODAY" ? "default" : "outline"}
          onClick={() => setSelectedPeriod("TODAY")}
        >
          Today
        </Button>
        <Button
          variant={selectedPeriod === "WEEK" ? "default" : "outline"}
          onClick={() => setSelectedPeriod("WEEK")}
        >
          Week
        </Button>
        <Button
          variant={selectedPeriod === "MONTH" ? "default" : "outline"}
          onClick={() => setSelectedPeriod("MONTH")}
        >
          Month
        </Button>
      </div>

      {/* Tree Animator Area */}
      <div className="my-8">
        <div
          className="w-full max-w-lg mx-auto bg-gray-100 p-4 rounded-lg shadow-lg"
          style={{ border: "2px solid #ccc" }}
        >
          <RiveComponent className="w-full h-80" />
          <div className="mt-4">
            <div className="text-center mt-2">Growth Value: {growthValue}</div>
          </div>
        </div>
      </div>

      {/* Analytics Chart */}
      <AnalyticsChart analyticsData={analyticsData} />
    </div>
  );
};

export default AnalyticsClient;
