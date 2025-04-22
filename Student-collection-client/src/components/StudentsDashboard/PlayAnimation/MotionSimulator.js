import React, { useState, useRef, useEffect } from "react";

export default function MotionSimulator() {
  const [distance, setDistance] = useState(1000); // in meters
  const [initialVelocity, setInitialVelocity] = useState(5); // m/s
  const [acceleration, setAcceleration] = useState(2); // m/s²
  const [running, setRunning] = useState(false);
  const [position, setPosition] = useState(0);
  const [time, setTime] = useState(0);

  const intervalRef = useRef(null);

  const handleStart = () => {
    setRunning(true);
    setTime(0);
    setPosition(0);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime(prev => {
        const t = prev + 0.1;
        const newPosition = initialVelocity * t + 0.5 * acceleration * t * t;
        if (newPosition >= distance) {
          clearInterval(intervalRef.current);
          setRunning(false);
          return prev;
        }
        setPosition(newPosition);
        return t;
      });
    }, 100);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-center">Motion Simulator</h1>
      
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="">দুরত্ব:</label>
        <input type="number" placeholder="Distance (m)" value={distance}
          onChange={e => setDistance(+e.target.value)}
          className="border p-2 rounded" />
        <label htmlFor="">আদিবেগঃ</label>
        <input type="number" placeholder="Initial Velocity (m/s)" value={initialVelocity}
          onChange={e => setInitialVelocity(+e.target.value)}
          className="border p-2 rounded" />
        <label htmlFor="">ত্বরণ</label>
        <input type="number" placeholder="Acceleration (m/s²)" value={acceleration}
          onChange={e => setAcceleration(+e.target.value)}
          className="border p-2 rounded" />

        <button
          onClick={handleStart}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Start
        </button>
      </div>

      {/* Visual motion field */}
      <div className="relative h-24 bg-gray-100 border rounded overflow-hidden">
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full"
          style={{ left: `${(position / distance) * 100}%`, transition: "left 0.1s" }}
        />
      </div>

      {/* Info Display */}
      <div className="text-sm text-gray-600">
        <p><strong>Time:</strong> {time.toFixed(2)} s</p>
        <p><strong>Position:</strong> {position.toFixed(2)} m</p>
        <p><strong>Velocity:</strong> {(initialVelocity + acceleration * time).toFixed(2)} m/s</p>
      </div>
    </div>
  );
}
