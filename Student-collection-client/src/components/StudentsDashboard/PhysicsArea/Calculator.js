import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const calculateResult = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const handleSquareRoot = () => {
    try {
      setResult(Math.sqrt(eval(input)).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const handleExponentiation = () => {
    try {
      setResult(Math.pow(eval(input), 2).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const handleTrigFunction = (func) => {
    try {
      const radians = eval(input) * (Math.PI / 180);
      setResult(Math[func](radians).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <input
            type="text"
            value={input}
            readOnly
            className="w-full p-2 text-right text-2xl border rounded-lg"
          />
          <div className="text-right text-xl text-gray-600">{result}</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '/'].map((value) => (
            <button
              key={value}
              onClick={() => handleClick(value)}
              className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              {value}
            </button>
          ))}
          {['4', '5', '6', '*'].map((value) => (
            <button
              key={value}
              onClick={() => handleClick(value)}
              className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              {value}
            </button>
          ))}
          {['1', '2', '3', '-'].map((value) => (
            <button
              key={value}
              onClick={() => handleClick(value)}
              className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              {value}
            </button>
          ))}
          {['0', '.', '=', '+'].map((value) => (
            <button
              key={value}
              onClick={value === '=' ? calculateResult : () => handleClick(value)}
              className={`p-4 text-xl ${
                value === '=' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              } rounded-lg hover:bg-gray-300`}
            >
              {value}
            </button>
          ))}
          <button
            onClick={clearInput}
            className="p-4 text-xl bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            C
          </button>
          <button
            onClick={handleSquareRoot}
            className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            √
          </button>
          <button
            onClick={handleExponentiation}
            className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            x²
          </button>
          <button
            onClick={() => handleTrigFunction('sin')}
            className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            sin
          </button>
          <button
            onClick={() => handleTrigFunction('cos')}
            className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            cos
          </button>
          <button
            onClick={() => handleTrigFunction('tan')}
            className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            tan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;