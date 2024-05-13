"use client";
import React from "react";
import ToggleButton from "./ToggleButton";
import Timer from "./timer/Timer";

function Pomodoro() {
  return (
    <div className="max-w-6xl flex flex-col items-center gap-6  px-8 py-4 rounded-xl ">
      <ToggleButton />
      <Timer />
    </div>
  );
}

export default Pomodoro;
