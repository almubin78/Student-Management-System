import React, { useState } from "react";

const PhysicsCalculator = () => {
  // State variables
  const [variableToSolve, setVariableToSolve] = useState(""); // Variable to solve (e.g., 's')
  const [selectedLaw, setSelectedLaw] = useState(""); // Selected law (e.g., 's = ut + 0.5 * a * t^2')
  const [inputValues, setInputValues] = useState({}); // Input values for the selected law
  const [result, setResult] = useState(null); // Calculated result

  // Available variables and their corresponding laws
  const variables = ["u", "v", "t", "a", "s"];
  const laws = {
    s: [
      {
        formula: "s = ut + 0.5 * a * t^2",
        inputs: ["u", "t", "a"],
        resultInfo: "Final Result for S is:",
        unit: "m",
      },
      {
        formula: "s = 0.5 * a * t^2 (if u = 0)",
        inputs: ["a", "t"],
        resultInfo: "Final Result for S is:",
        unit: "m",
      },
      {
        formula: "s = (v^2 - u^2) / (2a)",
        inputs: ["u", "v", "a"],
        resultInfo: "Final Result for S is:",
        unit: "m",
      },
      {
        formula: `s = (v + u)t / 2`,
        inputs: ["u", "t", "v"],
        resultInfo: "Final Result for S is:",
        unit: "m",
      },
      {
        formula: "s = vt (if no acceleration)",
        inputs: ["v", "t"],
        resultInfo: "Final Result for S is:",
        unit: "m",
      },
    ],
    v: [
      {
        formula: "v = u + at",
        inputs: ["u", "t", "a"],
        resultInfo: "Final Result for V is:",
        unit: "m/s",
      },
      {
        formula: "v = s / t (if no acceleration)",
        inputs: ["s", "t"],
        resultInfo: "Final Result for V is:",
        unit: "m/s",
      },
    ],
    a: [
      {
        formula: "a = (v - u) / t",
        inputs: ["u", "t", "v"],
        resultInfo: "Final Result for a is:",
        unit: "m/s^2",
      },
      {
        formula: "a = (v^2 - u^2) / (2s)",
        inputs: ["u", "s", "v"],
        resultInfo: "Final Result for a is:",
        unit: "m/s^2",
      },
    ],
    t: [
      {
        formula: "t = (v - u) / a",
        inputs: ["u", "v", "a"],
        resultInfo: "Final Result for t is:",
        unit: "second",
      },
      {
        formula: "t = s / v (if no acceleration)",
        inputs: ["s", "v"],
        resultInfo: "Final Result for t is:",
        unit: "second",
      },
      {
        formula: "t = sqrt((2s) / a) (if u = 0)",
        inputs: ["s", "a"],
        resultInfo: "Final Result for t is:",
        unit: "second",
      },
    ],
    u: [
      {
        formula: "u = v - at",
        inputs: ["v", "t", "a"],
        resultInfo: "Final Result for u is:",
        unit: "m/s",
      },
      {
        formula: "u = (s - 0.5 * a * t^2) / t",
        inputs: ["s", "t", "a"],
        resultInfo: "Final Result for u is:",
        unit: "m/s",
      },
      {
        formula: "u = sqrt(v^2 - 2as)",
        inputs: ["v", "a", "s"],
        resultInfo: "Final Result for u is:",
        unit: "m/s",
      },
    ],
  };

  // Handle variable selection
  const handleVariableSelection = (variable) => {
    setVariableToSolve(variable);
    setSelectedLaw(""); // Reset selected law when variable changes
    setInputValues({}); // Reset input values
    setResult(null); // Reset result
  };

  // Handle law selection
  const handleLawSelection = (law) => {
    setSelectedLaw(law);
    setInputValues({}); // Reset input values when law changes
    setResult(null); // Reset result
  };

  // Handle input changes
  const handleInputChange = (inputName, value) => {
    setInputValues({
      ...inputValues,
      [inputName]: parseFloat(value),
    });
  };

  // Calculate the result based on the selected law
  const calculateResult = () => {
    const selectedLawData = laws[variableToSolve].find(
      (law) => law.formula === selectedLaw
    );

    if (!selectedLawData) {
      setResult("Invalid law selection");
      return;
    }

    const { formula, inputs } = selectedLawData;
    const values = inputs.map((input) => inputValues[input]);

    // Check if all required inputs are provided
    if (values.includes(undefined)) {
      // If 'a' is missing but 'u', 'v', and 't' are provided, calculate 'a'
      if (
        inputs.includes("a") &&
        !inputValues.a &&
        inputValues.u !== undefined &&
        inputValues.v !== undefined &&
        inputValues.t !== undefined
      ) {
        inputValues.a = (inputValues.v - inputValues.u) / inputValues.t;
      } else {
        setResult("Please fill all required fields");
        return;
      }
    }

    let calculatedResult;
    switch (formula) {
      // Existing cases for 's'
      case "s = ut + 0.5 * a * t^2":
        calculatedResult =
          inputValues.u * inputValues.t +
          0.5 * inputValues.a * inputValues.t ** 2;
        break;
      case "s = 0.5 * a * t^2 (if u = 0)":
        calculatedResult = 0.5 * inputValues.a * inputValues.t ** 2;
        break;
      case "s = (v^2 - u^2) / (2a)":
        calculatedResult =
          (inputValues.v ** 2 - inputValues.u ** 2) / (2 * inputValues.a);
        break;
      case "s = (v + u)t / 2":
        calculatedResult =
          ((inputValues.v + inputValues.u) * inputValues.t) / 2;
        break;
      case "s = vt (if no acceleration)":
        calculatedResult = inputValues.v * inputValues.t;
        break;

      // Existing cases for 'v'
      case "v = u + at":
        calculatedResult = (
          inputValues.u +
          inputValues.a * inputValues.t
        ).toFixed(2);
        break;
      case "v = s / t (if no acceleration)":
        calculatedResult = (inputValues.s / inputValues.t).toFixed(2);
        break;

      // Existing cases for 'a'
      case "a = (v - u) / t":
        calculatedResult = (
          (inputValues.v - inputValues.u) /
          inputValues.t
        ).toFixed(2);
        break;
      case "a = (v^2 - u^2) / (2s)":
        calculatedResult = (
          (inputValues.v ** 2 - inputValues.u ** 2) /
          (2 * inputValues.s)
        ).toFixed(2);
        break;

      // New cases for 't'
      case "t = (v - u) / a":
        calculatedResult = (
          (inputValues.v - inputValues.u) /
          inputValues.a
        ).toFixed(2);
        break;
      case "t = s / v (if no acceleration)":
        calculatedResult = (inputValues.s / inputValues.v).toFixed(2);
        break;
      case "t = sqrt((2s) / a) (if u = 0)":
        calculatedResult = Math.sqrt(
          (2 * inputValues.s) / inputValues.a
        ).toFixed(2);
        break;

      // New cases for 'u'
      case "u = v - at":
        calculatedResult = (
          inputValues.v -
          inputValues.a * inputValues.t
        ).toFixed(2);
        break;
      case "u = (s - 0.5 * a * t^2) / t":
        calculatedResult = (
          (inputValues.s - 0.5 * inputValues.a * inputValues.t ** 2) /
          inputValues.t
        ).toFixed(2);
        break;
      case "u = sqrt(v^2 - 2as)":
        calculatedResult = Math.sqrt(
          (inputValues.v ** 2 - 2 * inputValues.a * inputValues.s).toFixed(2)
        );
        break;

      default:
        calculatedResult = "Invalid formula";
    }

    setResult(calculatedResult);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Physics Problem Solver</h1>

      {/* Step 1: Select variable to solve */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Select Variable to Solve:</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {variables?.map((variable) => (
            <button
              key={variable}
              onClick={() => handleVariableSelection(variable)}
              className={`px-4 py-2 rounded ${
                variableToSolve === variable
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {variable}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Display laws for the selected variable */}
      {variableToSolve && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Select Law:</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {laws[variableToSolve]?.map((law) => (
              <button
                key={law.formula}
                onClick={() => handleLawSelection(law.formula)}
                className={`px-4 py-2 rounded ${
                  selectedLaw === law.formula
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {law.formula}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Display input fields for the selected law */}
      {selectedLaw && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Enter Values:</h2>
          <div className="mt-2">
            {laws[variableToSolve]
              .find((law) => law.formula === selectedLaw)
              .inputs?.map((input) => (
                <div key={input} className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {input}:
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => handleInputChange(input, e.target.value)}
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Step 4: Calculate and display result */}
      {selectedLaw && (
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={calculateResult}
        >
          Calculate
        </button>
      )}

      {result !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Result:</h2>
          <p className="text-lg">
            {
              laws[variableToSolve].find((law) => law.formula === selectedLaw)
                .resultInfo
            }{" "}
            <span className="font-bold">{result}</span>{" "}
            {
              laws[variableToSolve].find((law) => law.formula === selectedLaw)
                .unit
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default PhysicsCalculator;
