import { useTimer } from "@/contextStore/timer";
import { set } from "mongoose";
import React from "react";

export default function Clock() {
  const { time, setTime, isRunning, setIsRunning } = useTimer();

  React.useEffect(() => {
    if (isRunning && time > 0) {
      const interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time, isRunning]);

  React.useEffect(() => {
    if (time === 0) {
      setIsRunning(false);
    }
  }, [time]);

  // convert seconds to minutes and seconds
  const clockify = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  return (
    <div className="flex flex-col items-center gap-8 mt-4">
      <h1 className="text-6xl">{clockify(time)}</h1>
      <button
        className="text-xl cursor-pointer text-white bg-gray-500 py-1 px-4 rounded-md hover:bg-gray-300 ease-in-out transition-all  hover:text-slate-700 duration-150 shadow-2xl"
        onClick={() => setIsRunning((prev) => !prev)}
      >
        {isRunning ? "PAUSE" : "START"}
      </button>
    </div>
  );
}
