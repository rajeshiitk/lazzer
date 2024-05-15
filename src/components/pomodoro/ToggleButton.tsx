"use client";
import { useTimer } from "@/contextStore/timer";
import React from "react";

function ToggleButton() {
  const buttons = [
    { tag: "FOCUS", isActive: true },
    { tag: "SHORT BREAK", isActive: false },
    { tag: "LONG BREAK", isActive: false },
  ];

  const { isActive, setIsActive } = useTimer();
  return (
    <div className="flex justify-between gap-2 rounded-ful p-1">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => setIsActive(index)}
          type="button"
          className={`py-2 px-2.5  text-sm font-medium ${
            isActive === index ? `bg-gray-100 dark:bg-gray-800 ` : ``
          } text-gray-900 focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-blue-700 dark:hover:bg-gray-700`}
        >
          {button.tag}
        </button>
      ))}
    </div>
  );
}

export default ToggleButton;
