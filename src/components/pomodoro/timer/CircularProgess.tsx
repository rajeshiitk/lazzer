"use client";
import React from "react";
import { useTimer } from "@/contextStore/timer";
import Clock from "./Clock";

function CircularProgess() {
  const { progress, currentTimer, time, setProgress } = useTimer();

  React.useEffect(() => {
    setProgress(time / (currentTimer / 100));
  }, [time, setProgress]);

  return (
    <div
      className="w-60 aspect-square rounded-full grid place-items-center shadow-xl"
      style={{
        background: `conic-gradient(#6b7280 ${progress}%, transparent ${progress}%)`,
      }}
    >
      <div className="w-56 aspect-square rounded-full bg-white dark:bg-slate-950 grid place-items-center">
        <Clock />
      </div>
    </div>
  );
}

export default CircularProgess;
