"use client";
import Pomodoro from "@/components/pomodoro/Pomodoro";

import { TaskManagement } from "@/components/ui/task-management-dialog-drawer";

export default function Home() {
  return (
    <main className="h-[calc(100svh)] grid place-items-center">
      <Pomodoro />
      <TaskManagement />
    </main>
  );
}
