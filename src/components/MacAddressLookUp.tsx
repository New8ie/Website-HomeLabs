// src/components/MacAddressLookup.tsx
import { useState, useEffect } from "react";

// Defines the interface for the CircleNotch component props.
interface CircleNotchProps {
  size: number;
  className: string;
}

// Uses an inline SVG as a substitute for an icon that cannot be resolved
// from an external package.
const CircleNotch = ({ size, className }: CircleNotchProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    viewBox="0 0 256 256"
  >
    <path d="M168,40.1a8,8,0,0,1,8-8,96,96,0,1,1-97.1,97.1,8,8,0,0,1,7.1-13.1,80,80,0,1,0,80-80ZM231.1,56.9a8,8,0,0,0-8-8,96.1,96.1,0,0,0-137.2,0,8,8,0,0,0,11.3,11.3A80,80,0,0,1,215.1,65a8,8,0,0,0,8.8-8.1Z"></path>
  </svg>
);

// Defines the interface for the organization data
interface Organization {
  name: string;
  address: string;
}

/**
 * @description A React component to look up a device's manufacturer based on its MAC address.
 * The MAC address data is fetched from a provided CSV file.
 */
export default function MacAddressLookup() {
  const [macAddress, setMacAddress] = useState<string>("");
  const [result, setResult] = useState<Organization | null>(null);
  const [error, setError] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [macDb, setMacDb] = useState<Map<string, Organization> | null>(null);

  // Fetches and processes the CSV file when the component mounts
  useEffect(() => {
    const fetchMacDatabase = async () => {
      try {
        // Updated file path as requested
        const response = await fetch("/assets/mac_address_db.csv");
        if (!response.ok) {
          throw new Error("Failed to fetch the MAC address database file.");
        }
        const text = await response.text();
        const data = parseCsv(text);
        setMacDb(data);
      } catch (err) {
        setError("Failed to load MAC address database.");
        console.error(err);
      }
    };

    fetchMacDatabase();
  }, []); // [] ensures the effect runs only once

  // Function to parse the CSV data
  const parseCsv = (text: string): Map<string, Organization> => {
    const lines = text.split("\r\n");
    const dataMap = new Map<string, Organization>();
    // Skip the header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === "") continue;
      const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      if (parts.length >= 3) {
        // Get the first 3 octets (second column, OUI)
        const oui = parts[1].replace(/"/g, "").trim();
        const orgName = parts[2].replace(/"/g, "").trim();
        const orgAddress = parts[3].replace(/"/g, "").trim();
        dataMap.set(oui, { name: orgName, address: orgAddress });
      }
    }
    return dataMap;
  };

  /**
   * @description Handles the lookup logic. Cleans the MAC address input,
   * extracts the OUI, and searches the database.
   */
  const handleLookup = () => {
    setError("");
    setResult(null);
    setIsCalculating(true);

    if (!macDb) {
      setError("Database is not loaded yet. Please try again.");
      setIsCalculating(false);
      return;
    }

    // Clean the input and get the first 6 characters for the OUI
    const cleanedMac = macAddress.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    const oui = cleanedMac.substring(0, 6);

    if (oui.length !== 6) {
      setError("Invalid MAC address. Please enter at least 6 characters.");
      setIsCalculating(false);
      return;
    }

    setTimeout(() => {
      const foundOrg = macDb.get(oui);
      if (foundOrg) {
        setResult(foundOrg);
      } else {
        setError(`Manufacturer for OUI '${oui}' not found in the database.`);
      }
      setIsCalculating(false);
    }, 500); // 500ms delay
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full">
          <label
            htmlFor="macAddress"
            className="block mb-2 text-sm font-medium transition-colors duration-500 font-cinzel"
            style={{ color: "var(--text-color)" }}
          >
            Enter MAC Address
          </label>
          <input
            type="text"
            id="macAddress"
            placeholder="Example: 00-1A-2B-3C-4D-5E"
            value={macAddress}
            onChange={(e) => setMacAddress(e.target.value)}
            className="w-full p-3 rounded-lg border-2 font-cinzel transition-colors duration-500"
            style={{
              backgroundColor: "var(--background-color)",
              color: "var(--text-color)",
              borderColor: "var(--border-bg)",
            }}
          />
        </div>
      </div>

      <button
        onClick={handleLookup}
        disabled={isCalculating || !macDb}
        className="w-full p-3 rounded-lg font-bold font-cinzel text-center transition-all duration-300"
        style={{
          backgroundColor:
            isCalculating || !macDb
              ? "var(--primary-button-bg)"
              : "var(--primary-button-bg)",
          color: "var(--primary-button-text)",
          boxShadow:
            isCalculating || !macDb
              ? "none"
              : "0 4px 6px -1px var(--shadow-color)",
          transform: isCalculating || !macDb ? "translateY(2px)" : "none",
        }}
      >
        {isCalculating ? (
          <span className="flex items-center justify-center space-x-2">
            <CircleNotch size={20} className="animate-spin" />
            <span>Searching...</span>
          </span>
        ) : (
          "Lookup Manufacturer"
        )}
      </button>

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
          className="mt-6 p-4 rounded-lg space-y-4 text-sm animate-fade-in font-cinzel transition-colors duration-500"
          style={{
            backgroundColor: "var(--pages-bg)",
            borderColor: "var(--border-bg)",
            borderWidth: "1px",
          }}
        >
          <h3
            className="font-bold text-lg mb-2 text-center transition-colors font-cinzel duration-500"
            style={{ color: "var(--title-color)" }}
          >
            Lookup Result
          </h3>
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Organization:
            </span>
            <span
              className="font-medium text-right font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.name}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Address:
            </span>
            <span
              className="font-medium text-right font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.address}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
