import React, { useState } from 'react';

const MotionCalculator = () => {
  const [calculationType, setCalculationType] = useState('');
  const [u, setU] = useState('');
  const [v, setV] = useState('');
  const [a, setA] = useState('');
  const [t, setT] = useState('');
  const [s, setS] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');
    setResult('');

    const initialVelocity = parseFloat(u);
    const finalVelocity = parseFloat(v);
    const acceleration = parseFloat(a);
    const time = parseFloat(t);
    const displacement = parseFloat(s);

    switch (calculationType) {
      case 's':
        if (!isNaN(initialVelocity) && !isNaN(acceleration) && !isNaN(time)) {
          setResult((initialVelocity * time + 0.5 * acceleration * time * time).toFixed(2));
        } else {
          setError('Provide valid inputs for s calculation.');
        }
        break;
      case 't':
        if (!isNaN(initialVelocity) && !isNaN(acceleration) && !isNaN(displacement)) {
          const discriminant = initialVelocity * initialVelocity + 2 * acceleration * displacement;
          if (discriminant < 0) {
            setError('No real solution for time.');
          } else {
            const t1 = (-initialVelocity + Math.sqrt(discriminant)) / acceleration;
            const t2 = (-initialVelocity - Math.sqrt(discriminant)) / acceleration;
            setResult(`t1: ${t1.toFixed(2)}, t2: ${t2.toFixed(2)}`);
          }
        } else {
          setError('Provide valid inputs for t calculation.');
        }
        break;
      case 'a':
        if (!isNaN(initialVelocity) && !isNaN(finalVelocity) && !isNaN(displacement)) {
          setResult(((finalVelocity * finalVelocity - initialVelocity * initialVelocity) / (2 * displacement)).toFixed(2));
        } else {
          setError('Provide valid inputs for a calculation.');
        }
        break;
      case 'v':
        if (!isNaN(initialVelocity) && !isNaN(acceleration) && !isNaN(time)) {
          setResult((initialVelocity + acceleration * time).toFixed(2));
        } else {
          setError('Provide valid inputs for v calculation.');
        }
        break;
      default:
        setError('Please select a valid calculation type.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Motion Calculator</h2>
      <div className="mb-4">
        <label className="block mb-1">Select what to calculate:</label>
        <select 
          value={calculationType} 
          onChange={(e) => setCalculationType(e.target.value)} 
          className="border rounded p-2 w-full"
        >
          <option value="">Select...</option>
          <option value="s">Displacement (s)</option>
          <option value="t">Time (t)</option>
          <option value="a">Acceleration (a)</option>
          <option value="v">Final Velocity (v)</option>
        </select>
      </div>
      <form onSubmit={handleCalculate} className="space-y-4">
        {(calculationType !== 'v') && (
          <div>
            <label className="block mb-1">Initial Velocity (u):</label>
            <input type="number" value={u} onChange={(e) => setU(e.target.value)} className="border rounded p-2 w-full" placeholder="Enter u" />
          </div>
        )}
        {(calculationType === 'v' || calculationType === 'a') && (
          <div>
            <label className="block mb-1">Final Velocity (v):</label>
            <input type="number" value={v} onChange={(e) => setV(e.target.value)} className="border rounded p-2 w-full" placeholder="Enter v" />
          </div>
        )}
        {(calculationType !== 'a') && (
          <div>
            <label className="block mb-1">Acceleration (a):</label>
            <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="border rounded p-2 w-full" placeholder="Enter a" />
          </div>
        )}
        {(calculationType !== 't') && (
          <div>
            <label className="block mb-1">Time (t):</label>
            <input type="number" value={t} onChange={(e) => setT(e.target.value)} className="border rounded p-2 w-full" placeholder="Enter t" />
          </div>
        )}
        {(calculationType === 's' || calculationType === 't') && (
          <div>
            <label className="block mb-1">Displacement (s):</label>
            <input type="number" value={s} onChange={(e) => setS(e.target.value)} className="border rounded p-2 w-full" placeholder="Enter s" />
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">
          Calculate
        </button>
      </form>
      {result && <div className="mt-4">Result: {result}</div>}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default MotionCalculator;