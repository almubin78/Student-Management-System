import React, { useState, useRef } from "react";

export default function MotionSimulator() {
  const [distance, setDistance] = useState(1000);
  const [numObjects, setNumObjects] = useState(2);
  const [direction, setDirection] = useState("same");

  const [objectParams, setObjectParams] = useState([
    { v0: 5, a: 2 },
    { v0: 8, a: 3 }
  ]);

  const [positions, setPositions] = useState([0, 0]);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  const handleParamChange = (index, field, value) => {
    const updated = [...objectParams];
    updated[index][field] = +value;
    setObjectParams(updated);
  };

  const handleStart = () => {
    setRunning(true);
    setPositions([0, 0]);
    setTime(0);
    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const t = (timestamp - startTimeRef.current) / 1000;
      setTime(t);

      let newPositions = [];

      if (numObjects === 1) {
        const { v0, a } = objectParams[0];
        newPositions = [v0 * t + 0.5 * a * t * t];
      } else {
        const pos1 = objectParams[0].v0 * t + 0.5 * objectParams[0].a * t * t;
        const pos2 = objectParams[1].v0 * t + 0.5 * objectParams[1].a * t * t;
        newPositions = direction === "same" ? [pos1, pos2] : [pos1, pos2];
      }

      setPositions(newPositions);

      const shouldStop =
        numObjects === 1
          ? newPositions[0] >= distance
          : direction === "same"
          ? Math.max(...newPositions) >= distance
          : newPositions[0] + newPositions[1] >= distance;

      if (shouldStop) {
        setRunning(false);
        cancelAnimationFrame(requestRef.current);
      } else {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  const handleStop = () => {
    setRunning(false);
    cancelAnimationFrame(requestRef.current);
  };

  // Calculate remaining distance
  const remainingDistance =
    numObjects === 2
      ? direction === "same"
        ? Math.abs(positions[0] - positions[1]).toFixed(2)
        : Math.max(0, distance - (positions[0] + positions[1])).toFixed(2)
      : (distance - positions[0]).toFixed(2);

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-center">Motion Simulator</h1>

      <div className="grid grid-cols-1 gap-3">
        <label>দূরত্ব (মিটার):</label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(+e.target.value)}
          className="border p-2 rounded"
        />

        <label>অবজেক্ট সংখ্যা:</label>
        <select
          value={numObjects}
          onChange={(e) => setNumObjects(+e.target.value)}
          className="border p-2 rounded"
        >
          <option value={1}>১টি অবজেক্ট</option>
          <option value={2}>২টি অবজেক্ট</option>
        </select>

        {numObjects === 2 && (
          <>
            <label>দিক নির্দেশনা:</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="same">একই দিকে</option>
              <option value="opposite">বিপরীত দিকে</option>
            </select>
          </>
        )}

        {[...Array(numObjects)].map((_, index) => (
          <div key={index} className="border p-2 rounded bg-gray-50">
            <h2 className="font-semibold">অবজেক্ট {index + 1}:</h2>
            <label>আদিবেগ (m/s):</label>
            <input
              type="number"
              value={objectParams[index].v0}
              onChange={(e) =>
                handleParamChange(index, "v0", e.target.value)
              }
              className="border p-2 rounded w-full"
            />

            <label>ত্বরণ (m/s²):</label>
            <input
              type="number"
              value={objectParams[index].a}
              onChange={(e) =>
                handleParamChange(index, "a", e.target.value)
              }
              className="border p-2 rounded w-full"
            />
          </div>
        ))}

        <div className="flex gap-4">
          <button
            onClick={handleStart}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Start
          </button>
          <button
            onClick={handleStop}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Stop
          </button>
        </div>
      </div>

      <div className="relative h-24 bg-gray-100 border rounded overflow-hidden mt-6">
        {/* Object 1: always from left */}
        {numObjects >= 1 && (
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full"
            style={{
              left: `${Math.min((positions[0] / distance) * 100, 100)}%`
            }}
          />
        )}

        {/* Object 2: left or right side based on direction */}
        {numObjects === 2 && (
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full"
            style={{
              left:
                direction === "same"
                  ? `${Math.min((positions[1] / distance) * 100, 100)}%`
                  : `${Math.max(100 - (positions[1] / distance) * 100, 0)}%`
            }}
          />
        )}
      </div>

      <div className="text-sm text-gray-600 mt-2">
        <p><strong>সময়:</strong> {time.toFixed(2)} সেকেন্ড</p>
        {[...Array(numObjects)].map((_, index) => (
          <p key={index}>
            <strong>অবজেক্ট {index + 1}:</strong> অবস্থান: {positions[index].toFixed(2)} মিটার,
            গতি: {(objectParams[index].v0 + objectParams[index].a * time).toFixed(2)} m/s
          </p>
        ))}
        <p><strong>অবশিষ্ট দূরত্ব:</strong> {remainingDistance} মিটার</p>
      </div>
    </div>
  );
}
