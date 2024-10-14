"use client";

import React, { useState } from "react";

export default function TransportCalculator() {
  const [weight, setWeight] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [cost, setCost] = useState<number | null>(null);

  const calculateCost = () => {
    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0) {
      alert("Please enter a valid weight");
      return;
    }

    // Simple cost calculation: $2 per kg
    const calculatedCost = weightValue * 2;
    setCost(Number(calculatedCost.toFixed(2)));
  };

  const clear = () => {
    setWeight("");
    setWidth("");
    setHeight("");
    setLength("");
    setCost(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-light mb-6 text-center text-gray-800">Transport Cost</h1>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Weight (kg)*</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
            placeholder="Enter weight in kg"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Width (cm)", value: width, setter: setWidth },
            { label: "Height (cm)", value: height, setter: setHeight },
            { label: "Length (cm)", value: length, setter: setLength },
          ].map((dim) => (
            <div key={dim.label}>
              <label className="block text-sm font-medium text-gray-600 mb-2">{dim.label}</label>
              <input
                type="number"
                value={dim.value}
                onChange={(e) => dim.setter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                placeholder="Optional"
              />
            </div>
          ))}
        </div>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={calculateCost}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Clear
          </button>
        </div>
        {cost !== null && (
          <div className="text-center p-4 bg-gray-100 rounded-md">
            <p className="text-xl font-light text-gray-800">
              Estimated Cost: <span className="font-medium">${cost}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
