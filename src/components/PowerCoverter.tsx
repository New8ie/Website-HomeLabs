import React, { useState } from "react";

// Interface for the conversion result
interface ConversionResult {
  value: number;
  unit: string;
}

// Interface for the optional battery calculation result
interface BatteryResult {
  requiredAh: number;
}

/**
 * @description Component to convert Watts (W) to kVA and vice versa, with optional battery sizing.
 * It uses the same style and structure as the SubnetCalculator.
 */
export default function PowerConverter() {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputUnit, setInputUnit] = useState<"W" | "kVA">("W");
  const [powerFactor, setPowerFactor] = useState<string>("0.8");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [batteryResult, setBatteryResult] = useState<BatteryResult | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Optional battery calculation inputs
  const [runtimeMinutes, setRuntimeMinutes] = useState<string>("");
  const [batteryVoltage, setBatteryVoltage] = useState<string>("");

  // Function to handle the conversion calculation
  const handleCalculate = () => {
    setError("");
    setResult(null);
    setBatteryResult(null);
    setIsCalculating(true);

    // Convert input strings to numbers
    const valueNum = parseFloat(inputValue);
    const powerFactorNum = parseFloat(powerFactor);
    const runtimeNum = parseFloat(runtimeMinutes);
    const voltageNum = parseFloat(batteryVoltage);
    const batteryEfficiency = 0.9; // Standard battery efficiency

    // Validate main inputs
    if (
      isNaN(valueNum) ||
      valueNum < 0 ||
      isNaN(powerFactorNum) ||
      powerFactorNum < 0 ||
      powerFactorNum > 1
    ) {
      setError(
        "Invalid input. Please enter a valid number and Power Factor (0-1)."
      );
      setIsCalculating(false);
      return;
    }

    // Simulate a brief calculation time
    setTimeout(() => {
      let convertedValue: number;
      let convertedUnit: string;
      let wattage: number;

      if (inputUnit === "W") {
        // Convert from Watts to kVA: kVA = W / (1000 * PF)
        convertedValue = valueNum / (1000 * powerFactorNum);
        convertedUnit = "kVA";
        wattage = valueNum;
      } else {
        // Convert from kVA to Watts: W = kVA * 1000 * PF
        convertedValue = valueNum * 1000 * powerFactorNum;
        convertedUnit = "W";
        wattage = convertedValue;
      }

      setResult({
        value: parseFloat(convertedValue.toFixed(2)),
        unit: convertedUnit,
      });

      // Optional Battery Sizing Calculation
      if (
        !isNaN(runtimeNum) &&
        !isNaN(voltageNum) &&
        runtimeNum > 0 &&
        voltageNum > 0
      ) {
        // Formula: Required Ah = (Wattage * Runtime in Hours) / (Battery Voltage * Battery Efficiency)
        const runtimeHours = runtimeNum / 60;
        const requiredAh =
          (wattage * runtimeHours) / (voltageNum * batteryEfficiency);
        setBatteryResult({ requiredAh: parseFloat(requiredAh.toFixed(2)) });
      }

      setIsCalculating(false);
    }, 500); // 500ms delay
  };

  return (
    <div
      className="p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6 transform transition-transform duration-300 hover:scale-10"
      style={{
        boxShadow: "0 0 0px var(--shadow-color)",
      }}
    >
      <h1
        className="text-3xl font-bold text-center uppercase tracking-wider font-cinzel transition-colors duration-500"
        style={{ color: "var(--title-color)" }}
      >
        W / kVA Converter
      </h1>

      {/* Input Section */}
      <div className="space-y-4 font-cinzel">
        {/* Input Value */}
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
            placeholder={`Enter value in ${inputUnit}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:outline-none font-cinzel transition-all duration-300"
            style={{
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)",
            }}
          />
        </div>

        {/* Unit Selection */}
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label
            htmlFor="inputUnit"
            className="w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            Convert From
          </label>
          <select
            id="inputUnit"
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value as "W" | "kVA")}
            className="w-full px-4 py-2 rounded-lg focus:outline-none font-cinzel transition-all duration-300"
            style={{
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)",
            }}
          >
            <option value="W">Watt (W) to kVA</option>
            <option value="kVA">kVA to Watt (W)</option>
          </select>
        </div>

        {/* Power Factor Input */}
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label
            htmlFor="powerFactor"
            className="w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            Power Factor (PF)
          </label>
          <input
            type="number"
            id="powerFactor"
            placeholder="Typically 0.8 - 0.95"
            value={powerFactor}
            onChange={(e) => setPowerFactor(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:outline-none font-cinzel transition-all duration-300"
            style={{
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)",
            }}
          />
        </div>
      </div>

      {/* Optional Battery Sizing Section */}
      <div
        className="space-y-4 font-cinzel border-t pt-4"
        style={{ borderColor: "var(--border-bg)" }}
      >
        <h2
          className="text-xl font-bold text-center uppercase tracking-wider font-cinzel transition-colors duration-500"
          style={{ color: "var(--title-color)" }}
        >
          Optional Battery Sizing
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label
            htmlFor="runtimeMinutes"
            className="w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            Runtime (minutes)
          </label>
          <input
            type="number"
            id="runtimeMinutes"
            placeholder="e.g., 30"
            value={runtimeMinutes}
            onChange={(e) => setRuntimeMinutes(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:outline-none font-cinzel transition-all duration-300"
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
            htmlFor="batteryVoltage"
            className="w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            Battery Voltage (V)
          </label>
          <input
            type="number"
            id="batteryVoltage"
            placeholder="e.g., 12"
            value={batteryVoltage}
            onChange={(e) => setBatteryVoltage(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:outline-none font-cinzel transition-all duration-300"
            style={{
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)",
            }}
          />
        </div>
      </div>

      {/* Button Section */}
      <button
        onClick={handleCalculate}
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
        {isCalculating ? "Calculating..." : "Calculate"}
      </button>

      {/* Result & Error Section */}
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
            className="font-semibold transition-colors font-cinzel duration-500"
            style={{ color: "var(--error-text)" }}
          >
            {error}
          </p>
        </div>
      )}
      {result && !error && (
        <div
          className="mt-6 p-4 rounded-lg space-y-2 animate-fade-in font-cinzel transition-colors duration-500"
          style={{
            backgroundColor: "var(--pages-bg)",
            borderColor: "var(--border-bg)",
            borderWidth: "1px",
          }}
        >
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Conversion Result:
            </span>
            <span
              className="font-medium font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.value} {result.unit}
            </span>
          </div>

          {/* Battery Calculation Result */}
          {batteryResult && (
            <div
              className="flex justify-between items-center text-sm pt-2"
              style={{ borderTop: "1px solid var(--border-bg)" }}
            >
              <span
                className="font-semibold font-cinzel transition-colors duration-500"
                style={{ color: "var(--text-color)" }}
              >
                Required Battery Capacity:
              </span>
              <span
                className="font-medium font-cinzel transition-colors duration-500"
                style={{ color: "var(--title-color)" }}
              >
                {batteryResult.requiredAh} Ah
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
