// src/components/SubnetCalculator.tsx
import React, { useState } from 'react';

interface SubnetResult {
  networkAddress: string;
  firstHost: string;
  lastHost: string;
  broadcastAddress: string;
  totalHosts: number;
  usableHosts: number;
  mask: string;
}

export default function SubnetCalculator() {
  const [ipAddress, setIpAddress] = useState<string>('');
  const [cidr, setCidr] = useState<string>('24');
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const calculateSubnet = () => {
    setError('');
    setResult(null);
    setIsCalculating(true);

    // Simulate a brief calculation time to showcase the loading state
    setTimeout(() => {
      const ipOctets = ipAddress.split('.').map(Number);
      const cidrNum = parseInt(cidr, 10);

      if (ipOctets.length !== 4 || ipOctets.some(octet => isNaN(octet) || octet < 0 || octet > 255) || cidrNum < 0 || cidrNum > 32) {
        setError('Invalid IP address or CIDR.');
        setIsCalculating(false);
        return;
      }

      // Calculate subnet mask
      const subnetMask = (0xFFFFFFFF << (32 - cidrNum)) >>> 0;
      const maskOctets = [
        (subnetMask >>> 24) & 0xFF,
        (subnetMask >>> 16) & 0xFF,
        (subnetMask >>> 8) & 0xFF,
        subnetMask & 0xFF,
      ];
      
      // Convert IP address to a 32-bit integer
      const ipInt =
        (ipOctets[0] << 24) |
        (ipOctets[1] << 16) |
        (ipOctets[2] << 8) |
        ipOctets[3];

      // Calculate network address
      const networkAddressInt = ipInt & subnetMask;
      const networkOctets = [
        (networkAddressInt >>> 24) & 0xFF,
        (networkAddressInt >>> 16) & 0xFF,
        (networkAddressInt >>> 8) & 0xFF,
        networkAddressInt & 0xFF,
      ];
      const networkAddress = networkOctets.join('.');

      // Calculate broadcast address
      const broadcastAddressInt = networkAddressInt | (~subnetMask >>> 0);
      const broadcastOctets = [
        (broadcastAddressInt >>> 24) & 0xFF,
        (broadcastAddressInt >>> 16) & 0xFF,
        (broadcastAddressInt >>> 8) & 0xFF,
        broadcastAddressInt & 0xFF,
      ];
      const broadcastAddress = broadcastOctets.join('.');

      // Calculate first and last host
      const firstHostInt = networkAddressInt + 1;
      const firstHostOctets = [
        (firstHostInt >>> 24) & 0xFF,
        (firstHostInt >>> 16) & 0xFF,
        (firstHostInt >>> 8) & 0xFF,
        firstHostInt & 0xFF,
      ];
      const firstHost = cidrNum === 31 || cidrNum === 32 ? 'N/A' : firstHostOctets.join('.');

      const lastHostInt = broadcastAddressInt - 1;
      const lastHostOctets = [
        (lastHostInt >>> 24) & 0xFF,
        (lastHostInt >>> 16) & 0xFF,
        (lastHostInt >>> 8) & 0xFF,
        lastHostInt & 0xFF,
      ];
      const lastHost = cidrNum === 31 || cidrNum === 32 ? 'N/A' : lastHostOctets.join('.');
      
      const totalHosts = 2**(32 - cidrNum);
      const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;

      setResult({
        networkAddress,
        firstHost,
        lastHost,
        broadcastAddress,
        totalHosts,
        usableHosts,
        mask: maskOctets.join('.'),
      });
      setIsCalculating(false);
    }, 500); // 500ms delay
  };

  return (
    <div className="bg-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6 transform transition-transform duration-300 hover:scale-105">
      <h1 className="text-3xl font-bold text-yellow-400 text-center uppercase tracking-wider font-cinzel">
        Subnet Calculator
      </h1>

      {/* Input Section */}
      <div className="space-y-4 font-cinzel">
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label htmlFor="ipAddress" className="w-full sm:w-1/3 text-sm font-semibold text-zinc-300 transition-colors duration-200 group-hover:text-yellow-400">
            IP Address
          </label>
          <input
            type="text"
            id="ipAddress"
            placeholder="Example: 192.168.1.1"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-700 border border-yellow-700/50 rounded-lg focus:outline-none focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(252,211,77,0.7)] transition-all duration-300"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label htmlFor="cidr" className="w-full sm:w-1/3 text-sm font-semibold text-zinc-300 transition-colors duration-200 group-hover:text-yellow-400">
            CIDR (/xx)
          </label>
          <input
            type="number"
            id="cidr"
            placeholder="Example: 24"
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-700 border border-yellow-700/50 rounded-lg focus:outline-none focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(252,211,77,0.7)] transition-all duration-300"
          />
        </div>
      </div>

      {/* Button Section */}
      <button
        onClick={calculateSubnet}
        disabled={isCalculating}
        className={`w-full px-6 py-3 rounded-lg border border-yellow-700 bg-gradient-to-tr from-yellow-900 via-yellow-700 to-yellow-500 text-black hover:from-yellow-600 hover:to-yellow-400 transition-all duration-200 shadow-md font-bold uppercase tracking-wider font-cinzel
          ${isCalculating ? 'opacity-70 cursor-not-allowed animate-pulse' : 'hover:shadow-yellow-300/30'}
        `}
      >
        {isCalculating ? 'Calculating...' : 'Calculate'}
      </button>

      {/* Result Section */}
      {error && (
        <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-lg font-cinzel">
          <p className="text-red-400 font-semibold">{error}</p>
        </div>
      )}
      {result && !error && (
        <div className="mt-6 p-4 bg-zinc-700 border border-yellow-700/50 rounded-lg space-y-2 animate-fade-in font-cinzel">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-zinc-400">Network Address:</span>
            <span className="font-medium text-yellow-300">{result.networkAddress}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-zinc-400">Subnet Mask:</span>
            <span className="font-medium text-yellow-300">{result.mask}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-zinc-400">Broadcast Address:</span>
            <span className="font-medium text-yellow-300">{result.broadcastAddress}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-zinc-400">Usable IP Range:</span>
            <span className="font-medium text-yellow-300">{result.firstHost} - {result.lastHost}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-zinc-400">Total Hosts:</span>
            <span className="font-medium text-yellow-300">{result.totalHosts}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-zinc-400">Usable Hosts:</span>
            <span className="font-medium text-yellow-300">{result.usableHosts}</span>
          </div>
        </div>
      )}
    </div>
  );
}
