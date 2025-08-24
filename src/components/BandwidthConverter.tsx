// src/components/BandwidthConverter.tsx
import React, { useState } from "react";

export default function BandwidthConverter() {
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("Mbps");
  const [toUnit, setToUnit] = useState<string>("MBps");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Array of available units with their labels
  const units = [
    { value: "bps", label: "b/s" },
    { value: "Kbps", label: "Kbps" },
    { value: "Mbps", label: "Mbps" },
    { value: "Gbps", label: "Gbps" },
    { value: "Bps", label: "B/s" },
    { value: "KBps", label: "KB/s" },
    { value: "MBps", label: "MB/s" },
    { value: "GBps", label: "GB/s" },
  ];

  // Function to perform the conversion calculation
  const calculateConversion = () => {
    setError("");
    setResult(null);
    setIsCalculating(true);

    const value = parseFloat(inputValue);

    if (isNaN(value) || value <= 0) {
      setError("Please enter a valid positive number.");
      setIsCalculating(false);
      return;
    }

    // Simulate a brief calculation time to showcase the loading state
    setTimeout(() => {
      let baseBitsPerSecond: number;

      // Convert from 'fromUnit' to the base unit: bits per second (b/s)
      switch (fromUnit) {
        case "bps":
          baseBitsPerSecond = value;
          break;
        case "Kbps":
          baseBitsPerSecond = value * 1000;
          break;
        case "Mbps":
          baseBitsPerSecond = value * 1000 * 1000;
          break;
        case "Gbps":
          baseBitsPerSecond = value * 1000 * 1000 * 1000;
          break;
        case "Bps":
          baseBitsPerSecond = value * 8;
          break;
        case "KBps":
          baseBitsPerSecond = value * 1024 * 8;
          break;
        case "MBps":
          baseBitsPerSecond = value * 1024 * 1024 * 8;
          break;
        case "GBps":
          baseBitsPerSecond = value * 1024 * 1024 * 1024 * 8;
          break;
        default:
          baseBitsPerSecond = 0;
          break;
      }

      let convertedValue: number;

      // Convert from the base unit to 'toUnit'
      switch (toUnit) {
        case "bps":
          convertedValue = baseBitsPerSecond;
          break;
        case "Kbps":
          convertedValue = baseBitsPerSecond / 1000;
          break;
        case "Mbps":
          convertedValue = baseBitsPerSecond / (1000 * 1000);
          break;
        case "Gbps":
          convertedValue = baseBitsPerSecond / (1000 * 1000 * 1000);
          break;
        case "Bps":
          convertedValue = baseBitsPerSecond / 8;
          break;
        case "KBps":
          convertedValue = baseBitsPerSecond / (1024 * 8);
          break;
        case "MBps":
          convertedValue = baseBitsPerSecond / (1024 * 1024 * 8);
          break;
        case "GBps":
          convertedValue = baseBitsPerSecond / (1024 * 1024 * 1024 * 8);
          break;
        default:
          convertedValue = 0;
          break;
      }

      setResult(convertedValue);
      setIsCalculating(false);
    }, 500); // 500ms delay
  };

  // Helper function to format the number for display
  const formatNumber = (num: number): string => {
    return num.toFixed(2).replace(/\.?0*$/, "");
  };

  return (
    <div className="p-4 rounded-2xl w-full max-w-lg space-y-6">
      {/* Input Section */}
      <div className="space-y-4 font-cinzel">
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label
            htmlFor="inputValue"
            className="w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            Value
          </label>
          <input
            type="number"
            id="inputValue"
            placeholder="Example: 100"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300"
            style={{
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)",
            }}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label
            htmlFor="fromUnit"
            className="w-full sm:w-1/3 text-sm font-semibold transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            From
          </label>
          <select
            id="fromUnit"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300 appearance-none"
            style={{
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)",
            }}
          >
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label
            htmlFor="toUnit"
            className="w-full sm:w-1/3 text-sm font-semibold transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            To
          </label>
          <select
            id="toUnit"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300 appearance-none"
            style={{
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)",
            }}
          >
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Button Section */}
      <button
        onClick={calculateConversion}
        disabled={isCalculating}
        className="w-full p-3 rounded-lg font-bold font-cinzel text-center transition-all duration-300"
        style={{
          backgroundColor: "var(--primary-button-bg)",
          color: "var(--primary-button-text)",
          boxShadow: isCalculating
            ? "none"
            : "0 4px 6px -1px var(--shadow-color)",
          transform: isCalculating ? "translateY(2px)" : "none",
        }}
      >
        {isCalculating ? "Calculating..." : "Convert"}
      </button>

      {/* Result Section */}
      {error && (
        <div
          className="mt-6 p-4 rounded-lg font-cinzel transition-colors duration-500"
          style={{
            backgroundColor: "var(--error-bg)",
            borderColor: "var(--error-border)",
            borderWidth: "1px",
          }}
        >
          <p
            className="font-semibold transition-colors duration-500"
            style={{ color: "var(--error-text)" }}
          >
            {error}
          </p>
        </div>
      )}
      {result !== null && !error && (
        <div
          className="mt-6 p-4 rounded-lg space-y-2 text-center animate-fade-in font-cinzel transition-colors duration-500"
          style={{
            backgroundColor: "var(--background-color)",
            borderColor: "var(--border-bg)",
            borderWidth: "1px",
          }}
        >
          <p
            className="text-lg transition-colors duration-500"
            style={{ color: "var(--text-color)" }}
          >
            <span
              className="font-semibold transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {formatNumber(parseFloat(inputValue))} {fromUnit}
            </span>{" "}
            equals
          </p>
          <p
            className="text-xl font-bold transition-colors duration-500"
            style={{ color: "var(--title-color)" }}
          >
            {formatNumber(result)} {toUnit}
          </p>
        </div>
      )}
    </div>
  );
}
