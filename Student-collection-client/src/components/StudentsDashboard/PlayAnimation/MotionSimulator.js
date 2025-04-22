import React, { useState, useRef, useEffect } from "react";

export default function MotionSimulator() {
  const [distance, setDistance] = useState(1000); // meters
  const [initialVelocity, setInitialVelocity] = useState(5); // m/s
  const [acceleration, setAcceleration] = useState(2); // m/s²
  const [numObjects, setNumObjects] = useState(1);

  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [positions, setPositions] = useState([0, 0]);

  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  const handleStart = () => {
    setRunning(true);
    setTime(0);
    setPositions([0, 0]);
    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const t = (timestamp - startTimeRef.current) / 1000;

      setTime(t);

      const newPositions = [
        initialVelocity * t + 0.5 * acceleration * t * t,
        numObjects === 2 ? (initialVelocity + 3) * t + 0.5 * (acceleration + 1) * t * t : 0,
      ];

      setPositions(newPositions);

      if (Math.max(...newPositions) < distance) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setRunning(false);
        cancelAnimationFrame(requestRef.current);
      }
    };

    cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-center">Motion Simulator</h1>

      <div className="grid grid-cols-1 gap-3">
        <label>দূরত্ব:</label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(+e.target.value)}
          className="border p-2 rounded"
        />

        <label>আদিবেগঃ</label>
        <input
          type="number"
          value={initialVelocity}
          onChange={(e) => setInitialVelocity(+e.target.value)}
          className="border p-2 rounded"
        />

        <label>ত্বরণ:</label>
        <input
          type="number"
          value={acceleration}
          onChange={(e) => setAcceleration(+e.target.value)}
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

        <button
          onClick={handleStart}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Start
        </button>
      </div>

      <div className="relative h-24 bg-gray-100 border rounded overflow-hidden mt-6">
        {[...Array(numObjects)].map((_, index) => (
          <div
            key={index}
            className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full`}
            style={{
              left: `${Math.min(positions[index] / distance, 1) * 100}%`,
              backgroundColor: index === 0 ? "red" : "green",
              transition: "none",
            }}
          />
        ))}
      </div>

      <div className="text-sm text-gray-600 mt-2">
        <p><strong>সময়:</strong> {time.toFixed(2)} সেকেন্ড</p>
        {[...Array(numObjects)].map((_, index) => (
          <div key={index}>
            <p>
              <strong>অবজেক্ট {index + 1}:</strong> অবস্থান: {positions[index].toFixed(2)} মিটার,
              গতি: {(initialVelocity + (index * 3) + (acceleration + index) * time).toFixed(2)} m/s
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
