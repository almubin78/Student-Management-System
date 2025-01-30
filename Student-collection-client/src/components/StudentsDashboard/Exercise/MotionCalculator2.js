import React, { useState } from 'react';

const MotionCalculator2 = () => {
  const [calculationType, setCalculationType] = useState('');
  const [method, setMethod] = useState('');
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

    // Clear previous results
    setU('');
    setV('');
    setA('');
    setT('');
    setS('');

    // Input validation
    if (calculationType === 's') {
      switch (method) {
        case 's1': // s = vt (where a = 0)
          if (v && t) {
            const calculatedS = v * t;
            setResult(`Calculated Displacement (s): ${calculatedS.toFixed(2)}`);
          } else {
            setError('Please provide valid inputs for v and t.');
          }
          break;

        case 's2': // s = ut + 0.5 * a * t^2
          if (u && a && t) {
            const calculatedS = u * t + 0.5 * a * t * t;
            setResult(`Calculated Displacement (s): ${calculatedS.toFixed(2)}`);
          } else {
            setError('Please provide valid inputs for u, a, and t.');
          }
          break;

        case 's3': // s = (v^2 - u^2) / (2 * a)
          if (u && v && a) {
            if (a === '0') {
              setError('Acceleration cannot be zero for this calculation.');
              return;
            }
            const calculatedS = (v * v - u * u) / (2 * a);
            setResult(`Calculated Displacement (s): ${calculatedS.toFixed(2)}`);
          } else {
            setError('Please provide valid inputs for u, v, and a.');
          }
          break;

        default:
          setError('Please select a method to calculate s.');
      }
    } else if (calculationType === 'v') {
      switch (method) {
        case 'v1': // v = s / t (where a = 0)
          if (s && t) {
            const calculatedV = s / t;
            setResult(`Calculated Final Velocity (v): ${calculatedV.toFixed(2)}`);
          } else {
            setError('Please provide valid inputs for s and t.');
          }
          break;

        case 'v2': // v = u + a * t
          if (u && a && t) {
            const calculatedV = parseFloat(u) + parseFloat(a) * parseFloat(t);
            setResult(`Calculated Final Velocity (v): ${calculatedV.toFixed(2)}`);
          } else {
            setError('Please provide valid inputs for u, a, and t.');
          }
          break;

        case 'v3': // v = sqrt(u^2 + 2 * a * s)
          if (u && a && s) {
            const calculatedV = Math.sqrt(u * u + 2 * a * s);
            setResult(`Calculated Final Velocity (v): ${calculatedV.toFixed(2)}`);
          } else {
            setError('Please provide valid inputs for u, a, and s.');
          }
          break;

        default:
          setError('Please select a method to calculate v.');
      }
    }
  };

  const handleReset = () => {
    setCalculationType('');
    setMethod('');
    setU('');
    setV('');
    setA('');
    setT('');
    setS('');
    setResult('');
    setError('');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Motion Calculator</h2>
      <div className="mb-4">
        <label className="block mb-1">What do you want to calculate?</label>
        <select
          value={calculationType}
          onChange={(e) => {
            setCalculationType(e.target.value);
            setMethod(''); // Reset method when changing calculation type
          }}
          className="border rounded p-2 w-full"
        >
          <option value="">Select...</option>
          <option value="s">Displacement (s)</option>
          <option value="v">Final Velocity (v)</option>
        </select>
      </div>
      {calculationType && (
        <div className="mb-4">
          <label className="block mb-1">Select method:</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border rounded p-2 w-full"
          >
            {calculationType === 's' && (
              <>
                <option value="">Select...</option>
                <option value="s1">s = vt (a = 0)</option>
                <option value="s2">s = ut + 0.5at²</option>
                <option value="s3">s = (v² - u²) / (2a)</option>
              </>
            )}
            {calculationType === 'v' && (
              <>
                <option value="">Select...</option>
                <option value="v1">v = s / t (a = 0)</option>
                <option value="v2">v = u + at</option>
                <option value="v3">v = √(u² + 2as)</option>
              </>
            )}
          </select>
        </div>
      )}
      {method && (
        <form onSubmit={handleCalculate}>
          {calculationType === 's' && (
            <>
              <div className="mb-4">
                <label className="block mb-1">Initial Velocity (u):</label>
                <input
                  type="number"
                  value={u}
                  onChange={(e) => setU(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Enter initial velocity"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Final Velocity (v):</label>
                <input
                  type="number"
                  value={v}
                  onChange={(e) => setV(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Enter final velocity"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Acceleration (a):</label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Enter acceleration"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Time (t):</label>
                <input
                  type="number"
                  value={t}
                  onChange={(e) => setT(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Enter time"
                />
              </div>
            </>
          )}
          {calculationType === 'v' && (
            <>
              <div className="mb-4">
                <label className="block mb-1">Initial Velocity (u):</label>
                <input
                  type="number"
                  value={u}
                  onChange={(e) => setU(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Enter initial velocity"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Acceleration (a):</label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Enter acceleration"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Displacement (s):</label>
                <input
                  type="number"
                  value={s}
                  onChange={(e) => setS(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Enter displacement"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Time (t):</label>
                <input
                  type="number"
                  value={t}
                  onChange={(e) => setT(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Enter time"
                />
              </div>
            </>
          )}
          <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">
            Calculate
          </button>
        </form>
      )}
      {result && <div className="mt-4 text-green-600">{result}</div>}
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
};

export default MotionCalculator2;
