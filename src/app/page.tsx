"use client";
import Pomodoro from "@/components/pomodoro/Pomodoro";
import AddTask from "@/components/tasklist/AddTask";
import TaskList from "@/components/tasklist/TaskList";

export default function Home() {
  return (
    <main className="h-[calc(100svh)] grid place-items-center">
      <Pomodoro />
    </main>
  );
}
