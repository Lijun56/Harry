"use client";

import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Habit } from "@prisma/client";
import { CreateHabitDialog } from "./createHabit";
import { useLongPress } from "use-long-press";
import Bubble, { BubbleOptions } from "@/components/Bubble/Bubble";
import styles from "./sample.module.css";

interface ClientPageProps {
  initialHabits: Habit[];
  onDelete: (id: string) => Promise<void>;
  onFetch: (userId: string) => Promise<Habit[]>;
  onCheckIn: (habitId: string) => Promise<void>;
}

export default function ClientPage({
  initialHabits,
  onDelete,
  onFetch,
  onCheckIn,
}: ClientPageProps) {
  const { user } = useUser();
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [showDeleteDialog, setShowDelete] = useState(false);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const [habitColors, setHabitColors] = useState<Record<string, string>>({});
  const options: BubbleOptions = {
    size: 120,
    minSize: 20,
    gutter: 8,
    provideProps: false,
    numCols: 5,
    fringeWidth: 100,
    yRadius: 200,
    xRadius: 200,
    cornerRadius: 50,
    showGuides: false,
    compact: true,
    gravitation: 5,
    shape: "ellipse",
  };

  // const handleClose = () => setShowDelete(false);
  // const handleShow = () => setShowDelete(true);

  const fetchHabits = async () => {
    if (user) {
      const updatedHabits = await onFetch(user.id);
      setHabits(updatedHabits);
    }
  };
  const CATEGORY_COLORS = {
    "Physical Health": [
      "#ff7675", // pink
      "#ff6b6b", // red
      "#fab1a0", // salmon
    ],
    "Mental Health": [
      "#74b9ff", // blue
      "#6c5ce7", // purple
      "#a29bfe", // lavender
    ],
    "Professional Growth": [
      "#55efc4", // mint
      "#00b894", // green
      "#00cec9", // teal
    ],
    "Personal Development": [
      "#ffeaa7", // yellow
      "#fdcb6e", // orange
      "#e17055", // coral
    ],
  };
  useEffect(() => {
    fetchHabits();
  }, [user]);

  const handleDelete = async (habitId: string) => {
    await onDelete(habitId);
    fetchHabits();
  };

  const handleCheckIn = async (habitId: string) => {
    await onCheckIn(habitId);
    fetchHabits();
  };

  const handleLongPress = useLongPress((event, { context }) => {
    setShowDelete(true);
    if (typeof context === "string") {
      handleDelete(context);
    }
    setShowDelete(false);
  });
  useEffect(() => {
    const newHabitColors: Record<string, string> = {};
    habits.forEach((habit) => {
      if (!habitColors[habit.id]) {
        const categoryColors =
          CATEGORY_COLORS[habit.categoryName as keyof typeof CATEGORY_COLORS] ||
          CATEGORY_COLORS["Personal Development"];
        newHabitColors[habit.id] =
          categoryColors[Math.floor(Math.random() * categoryColors.length)];
      }
    });
    setHabitColors((prev) => ({ ...prev, ...newHabitColors }));
  }, [habits]);

  const children = habits.map((habit) => {
    const backgroundColor = habitColors[habit.id];
    // const textColor = backgroundColor === "#ffeaa7" ? "#2d3436" : "#ffffff";

    return (
      <div
        key={habit.id}
        className={`${styles.child} flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition-all duration-300`}
        style={{ backgroundColor }}
        onClick={() => {
          if (!showDeleteDialog) {
            handleCheckIn(habit.id);
          }
        }}
        {...handleLongPress(habit.id)}
      >
        <div className="text-center p-4">
          <h3 className="font-semibold">{habit.name}</h3>
          <span className="text-sm">{habit.categoryName}</span>
        </div>
      </div>
    );
  });
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Check-In</h1>
        <CreateHabitDialog onHabitCreated={fetchHabits} />
      </div>

      {habits.length === 0 ? (
        <p>All habits are up to date!</p>
      ) : (
        <div className={styles.container}>
          <Bubble
            ref={bubblesRef}
            options={options}
            className={styles.bubbleUI}
          >
            {children}
          </Bubble>
        </div>
      )}
    </div>
  );
}
