import React, { useState, useRef, useEffect } from "react";

export default function CollisionSimulator() {
  const [m1, setM1] = useState(2);
  const [u1, setU1] = useState(5);
  const [m2, setM2] = useState(3);
  const [u2, setU2] = useState(3);
  const [running, setRunning] = useState(false);
  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(90); // Assume 100% width scale
  const [v1, setV1] = useState(u1);
  const [v2, setV2] = useState(-u2);
  const [collided, setCollided] = useState(false);

  const intervalRef = useRef(null);

  const handleStart = () => {
    setX1(0);
    setX2(90);
    setV1(u1);
    setV2(-u2);
    setCollided(false);
    setRunning(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setX1(prev => prev + v1 * 0.5);
      setX2(prev => prev + v2 * 0.5);
    }, 100);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  useEffect(() => {
    if (!collided && x2 - x1 <= 5) {
      // Collision detected
      setCollided(true);

      const newV1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
      const newV2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);
      setV1(newV1);
      setV2(-newV2); // maintain direction

      // Slight offset to avoid overlap
      setX1(prev => prev - 1);
      setX2(prev => prev + 1);
    }
  }, [x1, x2, collided, m1, m2, u1, u2]);

  const remainingDistance = Math.max(0, x2 - x1 - 5);

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-center">💥 Collision Simulator</h1>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <h2 className="font-bold mb-1">Object 1</h2>
          <input type="number" placeholder="Mass (kg)" value={m1} onChange={e => setM1(+e.target.value)} className="border p-1 rounded w-full" />
          <input type="number" placeholder="Velocity (m/s)" value={u1} onChange={e => setU1(+e.target.value)} className="border p-1 rounded w-full mt-2" />
        </div>

        <div>
          <h2 className="font-bold mb-1">Object 2</h2>
          <input type="number" placeholder="Mass (kg)" value={m2} onChange={e => setM2(+e.target.value)} className="border p-1 rounded w-full" />
          <input type="number" placeholder="Velocity (m/s)" value={u2} onChange={e => setU2(+e.target.value)} className="border p-1 rounded w-full mt-2" />
        </div>
      </div>

      <div className="flex space-x-2">
        <button onClick={handleStart} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Start
        </button>
        <button onClick={handleStop} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
          Stop
        </button>
      </div>

      <div className="relative h-24 bg-gray-100 border rounded overflow-hidden">
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full"
          style={{ left: `${x1}%`, transition: "left 0.1s linear" }}
        />
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full"
          style={{ left: `${x2}%`, transition: "left 0.1s linear" }}
        />
      </div>

      <div className="text-sm text-gray-700">
        <p><strong>Remaining Distance:</strong> {remainingDistance.toFixed(2)}%</p>
        <p><strong>Velocity After Collision:</strong></p>
        {collided ? (
          <>
            <p>Object 1: {v1.toFixed(2)} m/s</p>
            <p>Object 2: {Math.abs(v2).toFixed(2)} m/s</p>
          </>
        ) : (
          <p>Waiting for collision...</p>
        )}
      </div>
    </div>
  );
}
