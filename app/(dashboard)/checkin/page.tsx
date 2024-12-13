// page.tsx
import { FetchTodoHabits, deleteHabit, updateHabitLog } from "@/utils/actions";
import ClientPage from "./client";

export default async function CheckInView() {
  const initialHabits = await FetchTodoHabits();

  return (
    <ClientPage
      initialHabits={initialHabits}
      onDelete={deleteHabit}
      onFetch={FetchTodoHabits}
      onCheckIn={updateHabitLog}
    />
  );
}
