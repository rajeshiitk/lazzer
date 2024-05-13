"use client";
import Navbar from "@/components/Navbar.";
import Pomodoro from "@/components/pomodoro/Pomodoro";
import AddTask from "@/components/tasklist/AddTask";
import TaskList from "@/components/tasklist/TaskList";

export default function Home() {
  return (
    <main className="h-screen grid-cols-2 items-center">
      <Navbar />

      <div className="h-full w-full grid  items-center justify-center">
        <Pomodoro />
      </div>
      {/* <div className="fixed hidden overflow-auto h-screen md:block right-0 top-0">
        <AddTask />
        <TaskList />
      </div> */}
      <div className=" block ">
        <AddTask />
        <TaskList />
      </div>
    </main>
  );
}
