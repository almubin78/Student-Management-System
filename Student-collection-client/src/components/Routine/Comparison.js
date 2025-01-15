import React from "react";

const Comparison = () => {
  const comparisons = [
    {
      feature: "Variable Declaration",
      js: "let x = 5;",
      py: "x = 5",
    },
    {
      feature: "Function Definition",
      js: `function greet(name) {\n  return "Hello " + name;\n}`,
      py: `def greet(name):\n  return "Hello " + name`,
    },
    {
      feature: "Loop",
      js: `for (let i = 0; i < 5; i++) {\n  console.log(i);\n}`,
      py: `for i in range(5):\n  print(i)`,
    },
    {
      feature: "Conditional Statement",
      js: `if (x > 10) {\n  console.log("Big");\n} else {\n  console.log("Small");\n}`,
      py: `if x > 10:\n  print("Big")\nelse:\n  print("Small")`,
    },
    {
      feature: "Array/List",
      js: `const arr = [1, 2, 3];`,
      py: `arr = [1, 2, 3]`,
    },
    {
      feature: "String Methods",
      js: `"hello".toUpperCase(); // "HELLO"`,
      py: `"hello".upper()  # "HELLO"`,
    },
    {
      feature: "Find Length",
      js: `const len = arr.length;`,
      py: `length = len(arr)`,
    },
    {
      feature: "Math Operations",
      js: `Math.sqrt(16); // 4`,
      py: `import math\nmath.sqrt(16)  # 4`,
    },
    {
      feature: "Generate Random Number",
      js: `Math.random(); // 0 to 1`,
      py: `import random\nrandom.random()  # 0 to 1`,
    },
    {
      feature: "Get Current Date",
      js: `const date = new Date();`,
      py: `from datetime import datetime\ndate = datetime.now()`,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        JavaScript vs Python Syntax Comparison
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisons.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">{item.feature}</h2>
            <div className="flex">
              <div className="w-1/2 border-r pr-2">
                <h3 className="text-sm font-bold text-blue-600 mb-1">
                  JavaScript
                </h3>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                  {item.js}
                </pre>
              </div>
              <div className="w-1/2 pl-2">
                <h3 className="text-sm font-bold text-green-600 mb-1">Python</h3>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                  {item.py}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comparison;
