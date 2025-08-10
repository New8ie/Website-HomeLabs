// src/components/BandwidthConverter.tsx
import React, { useState } from 'react';

export default function BandwidthConverter() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('Mbps');
  const [toUnit, setToUnit] = useState<string>('MBps');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const units = [
    { value: 'bps', label: 'b/s' },
    { value: 'Kbps', label: 'Kbps' },
    { value: 'Mbps', label: 'Mbps' },
    { value: 'Gbps', label: 'Gbps' },
    { value: 'Bps', label: 'B/s' },
    { value: 'KBps', label: 'KB/s' },
    { value: 'MBps', label: 'MB/s' },
    { value: 'GBps', label: 'GB/s' },
  ];

  const calculateConversion = () => {
    setError('');
    setResult(null);
    setIsCalculating(true);

    const value = parseFloat(inputValue);

    if (isNaN(value) || value <= 0) {
      setError('Masukkan angka positif yang valid.');
      setIsCalculating(false);
      return;
    }
    
    // Simulate a brief calculation time to showcase the loading state
    setTimeout(() => {
      let baseBitsPerSecond: number;
      
      // Konversi dari 'fromUnit' ke base unit: bits per second (b/s)
      switch (fromUnit) {
        case 'bps':
          baseBitsPerSecond = value;
          break;
        case 'Kbps':
          baseBitsPerSecond = value * 1000;
          break;
        case 'Mbps':
          baseBitsPerSecond = value * 1000 * 1000;
          break;
        case 'Gbps':
          baseBitsPerSecond = value * 1000 * 1000 * 1000;
          break;
        case 'Bps':
          baseBitsPerSecond = value * 8;
          break;
        case 'KBps':
          baseBitsPerSecond = value * 1024 * 8;
          break;
        case 'MBps':
          baseBitsPerSecond = value * 1024 * 1024 * 8;
          break;
        case 'GBps':
          baseBitsPerSecond = value * 1024 * 1024 * 1024 * 8;
          break;
        default:
          baseBitsPerSecond = 0;
          break;
      }

      let convertedValue: number;

      // Konversi dari base unit ke 'toUnit'
      switch (toUnit) {
        case 'bps':
          convertedValue = baseBitsPerSecond;
          break;
        case 'Kbps':
          convertedValue = baseBitsPerSecond / 1000;
          break;
        case 'Mbps':
          convertedValue = baseBitsPerSecond / (1000 * 1000);
          break;
        case 'Gbps':
          convertedValue = baseBitsPerSecond / (1000 * 1000 * 1000);
          break;
        case 'Bps':
          convertedValue = baseBitsPerSecond / 8;
          break;
        case 'KBps':
          convertedValue = baseBitsPerSecond / (1024 * 8);
          break;
        case 'MBps':
          convertedValue = baseBitsPerSecond / (1024 * 1024 * 8);
          break;
        case 'GBps':
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

  const formatNumber = (num: number): string => {
    return num.toFixed(2).replace(/\.?0*$/, '');
  };

  return (
    <div className="bg-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6 transform transition-transform duration-300 hover:scale-105">
      <h1 className="text-3xl font-bold text-yellow-400 text-center uppercase tracking-wider">
        Bandwidth Converter
      </h1>

      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label htmlFor="inputValue" className="w-full sm:w-1/3 text-sm font-semibold text-zinc-300 transition-colors duration-200 group-hover:text-yellow-400">
            Nilai
          </label>
          <input
            type="number"
            id="inputValue"
            placeholder="Contoh: 100"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-700 border border-yellow-700/50 rounded-lg focus:outline-none focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(252,211,77,0.7)] transition-all duration-300"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label htmlFor="fromUnit" className="w-full sm:w-1/3 text-sm font-semibold text-zinc-300 transition-colors duration-200 group-hover:text-yellow-400">
            Dari
          </label>
          <select
            id="fromUnit"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-700 border border-yellow-700/50 rounded-lg focus:outline-none focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(252,211,77,0.7)] transition-all duration-300 appearance-none"
          >
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>{unit.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label htmlFor="toUnit" className="w-full sm:w-1/3 text-sm font-semibold text-zinc-300 transition-colors duration-200 group-hover:text-yellow-400">
            Ke
          </label>
          <select
            id="toUnit"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-700 border border-yellow-700/50 rounded-lg focus:outline-none focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(252,211,77,0.7)] transition-all duration-300 appearance-none"
          >
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>{unit.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Button Section */}
      <button
        onClick={calculateConversion}
        disabled={isCalculating}
        className={`w-full px-6 py-3 rounded-lg border border-yellow-700 bg-gradient-to-tr from-yellow-900 via-yellow-700 to-yellow-500 text-black hover:from-yellow-600 hover:to-yellow-400 transition-all duration-200 shadow-md font-bold uppercase tracking-wider
          ${isCalculating ? 'opacity-70 cursor-not-allowed animate-pulse' : 'hover:shadow-yellow-300/30'}
        `}
      >
        {isCalculating ? 'Equals...' : 'Equals'}
      </button>

      {/* Result Section */}
      {error && (
        <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
          <p className="text-red-400 font-semibold">{error}</p>
        </div>
      )}
      {result !== null && !error && (
        <div className="mt-6 p-4 bg-zinc-700 border border-yellow-700/50 rounded-lg space-y-2 text-center animate-fade-in">
            <p className="text-zinc-200 text-lg">
                <span className="font-semibold text-yellow-400">{formatNumber(parseFloat(inputValue))} {fromUnit}</span> Equals
            </p>
            <p className="text-xl font-bold text-yellow-300">
                {formatNumber(result)} {toUnit}
            </p>
        </div>
      )}
    </div>
  );
}
