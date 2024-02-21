"use client";
import React, { useState, createContext, useEffect } from "react";

export type timerContextType = {
  isActive: number;
  setIsActive: React.Dispatch<React.SetStateAction<number>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  focus: number;
  setFocus: React.Dispatch<React.SetStateAction<number>>;
  shortBreak: number;
  setShortBreak: React.Dispatch<React.SetStateAction<number>>;
  longBreak: number;
  setLongBreak: React.Dispatch<React.SetStateAction<number>>;
  currentTimer: number;
  setCurrentTimer: React.Dispatch<React.SetStateAction<number>>;
};

const TimerContext = createContext<timerContextType | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState<number>(0);
  const [progress, setProgress] = useState<number>(25 * 60);
  const [time, setTime] = useState<number>(100);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [focus, setFocus] = useState<number>(25 * 60);
  const [shortBreak, setShortBreak] = useState<number>(5 * 60);
  const [longBreak, setLongBreak] = useState<number>(15 * 60);
  const [currentTimer, setCurrentTimer] = useState<number>(focus);
  useEffect(() => {
    switch (isActive) {
      case 0:
        setTime(focus);
        setCurrentTimer(focus);
        setIsRunning(false);
        break;
      case 1:
        setTime(shortBreak);
        setCurrentTimer(shortBreak);
        setIsRunning(false);
        break;
      case 2:
        setTime(longBreak);
        setCurrentTimer(longBreak);
        setIsRunning(false);
        break;
      default:
        setTime(focus);
        setCurrentTimer(focus);
        break;
    }
  }, [isActive, focus, shortBreak, longBreak, setTime, setCurrentTimer]);

  const value = {
    isActive,
    setIsActive,
    progress,
    setProgress,
    time,
    setTime,
    isRunning,
    setIsRunning,
    currentTimer,
    setCurrentTimer,
    focus,
    setFocus,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
  };
  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}
export function useTimer() {
  const context = React.useContext(TimerContext);
  if (context === null) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
