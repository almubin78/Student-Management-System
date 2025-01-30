import React, { useState } from 'react';

const MotionCalculator = () => {
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

    const initialVelocity = parseFloat(u);
    const finalVelocity = parseFloat(v);
    const acceleration = parseFloat(a);
    const time = parseFloat(t);
    const displacement = parseFloat(s);

    switch (method) {
      case 's1':
        if (!isNaN(v) && !isNaN(t)) {
          setResult((v * t).toFixed(2));
        } else {
          setError('Provide valid inputs for v and t.');
        }
        break;
      case 's2':
        if (!isNaN(u) && !isNaN(a) && !isNaN(t)) {
          setResult((u * t + 0.5 * a * t * t).toFixed(2));
        } else {
          setError('Provide valid inputs for u, a, and t.');
        }
        break;
      case 's3':
        if (!isNaN(v) && !isNaN(u) && !isNaN(a) && a !== 0) {
          setResult(((v * v - u * u) / (2 * a)).toFixed(2));
        } else {
          setError('Provide valid inputs for v, u, and a (a ≠ 0).');
        }
        break;
      case 'v1':
        if (!isNaN(s) && !isNaN(t)) {
          setResult((s / t).toFixed(2));
        } else {
          setError('Provide valid inputs for s and t.');
        }
        break;
      case 'v2':
        if (!isNaN(u) && !isNaN(a) && !isNaN(t)) {
          setResult((u + a * t).toFixed(2));
        } else {
          setError('Provide valid inputs for u, a, and t.');
        }
        break;
      case 'v3':
        if (!isNaN(u) && !isNaN(a) && !isNaN(s)) {
          setResult(Math.sqrt(u * u + 2 * a * s).toFixed(2));
        } else {
          setError('Provide valid inputs for u, a, and s.');
        }
        break;
      default:
        setError('Please select a valid method.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Motion Calculator</h2>
      <div className="mb-4">
        <label className="block mb-1">What do you want to calculate?</label>
        <select
          value={calculationType}
          onChange={(e) => { setCalculationType(e.target.value); setMethod(''); }}
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
                <option value="s1">s = vt (a = 0)</option>
                <option value="s2">s = ut + 0.5at²</option>
                <option value="s3">s = (v² - u²) / (2a)</option>
              </>
            )}
            {calculationType === 'v' && (
              <>
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
          {(method === 's1' || method === 's1') && <input type="number" value={t} onChange={(e) => setT(e.target.value)} placeholder="Time (t)" />}
          {(method === 's1') && <input type="number" value={v} onChange={(e) => setV(e.target.value)} placeholder="Final Velocity (v)" />}
          {(method === 's2' || method === 'v2') && <input type="number" value={u} onChange={(e) => setU(e.target.value)} placeholder="Initial Velocity (u)" />}
          {(method === 's2' || method === 'v2') && <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="Acceleration (a)" />}
          {(method === 's2') && <input type="number" value={t} onChange={(e) => setT(e.target.value)} placeholder="Time (t)" />}
          {(method === 's3' || method === 'v3') && <input type="number" value={s} onChange={(e) => setS(e.target.value)} placeholder="Displacement (s)" />}
          <button type="submit">Calculate</button>
        </form>
      )}
      {result && <div>Result: {result}</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default MotionCalculator;
