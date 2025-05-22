import React, { useEffect, useState } from "react";

const routine = {
  Sunday: [
    { time: "5:30 – 7:30", task: "Prayer + MERN Development" },
    { time: "7:30 – 9:30", task: "Teaching" },
    { time: "9:30 – 12:00", task: "Job Preparation" },
    { time: "12:00 – 14:30", task: "Daily Work" },
    { time: "14:30 – 16:00", task: "Teaching" },
    { time: "16:00 – 20:30", task: "Teaching" },
    { time: "20:30 – 22:00", task: "Coding + GitHub Push" },
    { time: "22:00 – 5:30", task: "Sleeping" },
  ],
  Monday: [
    { time: "5:30 – 7:30", task: "Prayer + MERN Development" },
    { time: "7:30 – 9:30", task: "Teaching" },
    { time: "9:30 – 12:00", task: "Job Preparation" },
    { time: "12:00 – 14:30", task: "Daily Work" },
    {
      time: "14:30 – 20:30",
      task: "MERN + TypeScript/Redux/Sheet (OFF from Teaching)",
    },
    { time: "20:30 – 22:00", task: "Coding + GitHub Push" },
    { time: "22:00 – 5:30", task: "Sleeping" },
  ],
  Tuesday: [
    { time: "5:30 – 7:30", task: "Prayer + MERN Development" },
    { time: "7:30 – 9:30", task: "MERN or Interview Prep (Teaching OFF)" },
    { time: "9:30 – 12:00", task: "Job Preparation" },
    { time: "12:00 – 14:30", task: "Daily Work" },
    { time: "14:30 – 16:00", task: "Teaching" },
    { time: "16:00 – 20:30", task: "Teaching" },
    { time: "20:30 – 22:00", task: "Coding + GitHub Push" },
    { time: "22:00 – 5:30", task: "Sleeping" },
  ],
  Wednesday: [
    { time: "5:30 – 7:30", task: "Prayer + MERN Development" },
    { time: "7:30 – 9:30", task: "Teaching" },
    { time: "9:30 – 12:00", task: "Job Preparation" },
    { time: "12:00 – 14:30", task: "Daily Work" },
    { time: "14:30 – 16:00", task: "Teaching" },
    { time: "16:00 – 20:30", task: "Teaching" },
    { time: "20:30 – 22:00", task: "Coding + GitHub Push" },
    { time: "22:00 – 5:30", task: "Sleeping" },
  ],
  Thursday: [
    { time: "5:30 – 7:30", task: "Prayer + MERN Development" },
    { time: "7:30 – 9:30", task: "Teaching" },
    { time: "9:30 – 12:00", task: "Job Preparation" },
    { time: "12:00 – 14:30", task: "Daily Work" },
    { time: "14:30 – 20:30", task: "Deep MERN + Projects (Teaching OFF)" },
    { time: "20:30 – 22:00", task: "Coding + GitHub Push" },
    { time: "22:00 – 5:30", task: "Sleeping" },
  ],
  Friday: [
    { time: "5:30 – 7:30", task: "Prayer + MERN Development" },
    { time: "7:30 – 9:30", task: "Teaching" },
    { time: "9:30 – 12:00", task: "Job Preparation" },
    { time: "12:00 – 14:30", task: "Daily Work" },
    { time: "14:30 – 16:00", task: "Teaching" },
    { time: "16:00 – 20:30", task: "Teaching" },
    { time: "20:30 – 22:00", task: "Weekly GitHub Review + Planning" },
    { time: "22:00 – 5:30", task: "Sleeping" },
  ],
  Saturday: [
    { time: "5:30 – 7:30", task: "Prayer + MERN Development" },
    { time: "7:30 – 9:30", task: "Teaching" },
    { time: "9:30 – 12:00", task: "Mock Interview / CV Update" },
    { time: "12:00 – 14:30", task: "Daily Work" },
    { time: "14:30 – 16:00", task: "Teaching" },
    { time: "16:00 – 20:30", task: "Teaching" },
    { time: "20:30 – 22:00", task: "Skill Improvement (Redux/TS)" },
    { time: "22:00 – 5:30", task: "Sleeping" },
  ],
};

const days = Object.keys(routine);

const RoutineCard = ({ time, task }) => (
  <div className="bg-white border border-gray-200 shadow-md rounded-xl p-4 mb-3">
    <div className="text-xs text-gray-500 mb-1">{time}</div>
    <div className="text-sm font-semibold text-gray-800">{task}</div>
  </div>
);

export default function WeeklyRoutine() {
  const [activeDay, setActiveDay] = useState("");
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    if (days.includes(today)) {
      setActiveDay(today);
    } else {
      setActiveDay("Monday");
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-4">
        {days?.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`text-xs sm:text-sm px-3 py-1 rounded-full border transition duration-200 ${
              activeDay === day
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="h-[600px] overflow-y-auto bg-gray-50 p-4 rounded-xl border border-gray-200">
        {routine[activeDay]?.map((entry, idx) => (
          <RoutineCard key={idx} time={entry.time} task={entry.task} />
        ))}
      </div>
    </div>
  );
}
