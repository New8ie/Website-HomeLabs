// src/components/SubnetCalculator.tsx
import React, { useState } from "react";

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
  const [ipAddress, setIpAddress] = useState<string>("");
  const [cidr, setCidr] = useState<string>("24");
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const calculateSubnet = () => {
    setError("");
    setResult(null);
    setIsCalculating(true);

    // Simulate a brief calculation time to showcase the loading state
    setTimeout(() => {
      const ipOctets = ipAddress.split(".").map(Number);
      const cidrNum = parseInt(cidr, 10);

      if (
        ipOctets.length !== 4 ||
        ipOctets.some((octet) => isNaN(octet) || octet < 0 || octet > 255) ||
        cidrNum < 0 ||
        cidrNum > 32
      ) {
        setError("Invalid IP address or CIDR.");
        setIsCalculating(false);
        return;
      }

      // Calculate subnet mask
      const subnetMask = (0xffffffff << (32 - cidrNum)) >>> 0;
      const maskOctets = [
        (subnetMask >>> 24) & 0xff,
        (subnetMask >>> 16) & 0xff,
        (subnetMask >>> 8) & 0xff,
        subnetMask & 0xff,
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
        (networkAddressInt >>> 24) & 0xff,
        (networkAddressInt >>> 16) & 0xff,
        (networkAddressInt >>> 8) & 0xff,
        networkAddressInt & 0xff,
      ];
      const networkAddress = networkOctets.join(".");

      // Calculate broadcast address
      const broadcastAddressInt = networkAddressInt | (~subnetMask >>> 0);
      const broadcastOctets = [
        (broadcastAddressInt >>> 24) & 0xff,
        (broadcastAddressInt >>> 16) & 0xff,
        (broadcastAddressInt >>> 8) & 0xff,
        broadcastAddressInt & 0xff,
      ];
      const broadcastAddress = broadcastOctets.join(".");

      // Calculate first and last host
      const firstHostInt = networkAddressInt + 1;
      const firstHostOctets = [
        (firstHostInt >>> 24) & 0xff,
        (firstHostInt >>> 16) & 0xff,
        (firstHostInt >>> 8) & 0xff,
        firstHostInt & 0xff,
      ];
      const firstHost =
        cidrNum === 31 || cidrNum === 32 ? "N/A" : firstHostOctets.join(".");

      const lastHostInt = broadcastAddressInt - 1;
      const lastHostOctets = [
        (lastHostInt >>> 24) & 0xff,
        (lastHostInt >>> 16) & 0xff,
        (lastHostInt >>> 8) & 0xff,
        lastHostInt & 0xff,
      ];
      const lastHost =
        cidrNum === 31 || cidrNum === 32 ? "N/A" : lastHostOctets.join(".");

      const totalHosts = 2 ** (32 - cidrNum);
      const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;

      setResult({
        networkAddress,
        firstHost,
        lastHost,
        broadcastAddress,
        totalHosts,
        usableHosts,
        mask: maskOctets.join("."),
      });
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
        Subnet Calculator
      </h1>

      {/* Input Section */}
      <div className="space-y-4 font-cinzel">
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label
            htmlFor="ipAddress"
            className="w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            IP Address
          </label>
          <input
            type="text"
            id="ipAddress"
            placeholder="Example: 192.168.1.1"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
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
            htmlFor="cidr"
            className="w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            CIDR (/xx)
          </label>
          <input
            type="number"
            id="cidr"
            placeholder="Example: 24"
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
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
        onClick={calculateSubnet}
        disabled={isCalculating}
        className={`w-full px-6 py-3 rounded-lg border font-bold uppercase tracking-wider font-cinzel transition-all duration-200 shadow-md
          ${isCalculating ? "opacity-70 cursor-not-allowed animate-pulse" : "hover:shadow-[0_0_15px_var(--title-color)]"}
        `}
        style={{
          backgroundImage:
            "linear-gradient(to top right, var(--nav-link-from), var(--nav-link-via), var(--nav-link-to))",
          borderColor: "var(--nav-link-border)",
          borderWidth: "1px",
          color: "var(--nav-link-text)",
        }}
      >
        {isCalculating ? "Calculating..." : "Calculate"}
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
            backgroundColor: "var(--background-color)",
            borderColor: "var(--border-bg)",
            borderWidth: "1px",
          }}
        >
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Network Address:
            </span>
            <span
              className="font-medium  font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.networkAddress}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Subnet Mask:
            </span>
            <span
              className="font-medium transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.mask}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Broadcast Address:
            </span>
            <span
              className="font-medium font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.broadcastAddress}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Usable IP Range:
            </span>
            <span
              className="font-medium font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.firstHost} - {result.lastHost}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Total Hosts:
            </span>
            <span
              className="font-medium font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.totalHosts}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Usable Hosts:
            </span>
            <span
              className="font-medium font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.usableHosts}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
