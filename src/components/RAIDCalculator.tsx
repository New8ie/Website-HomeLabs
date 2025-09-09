import { useState } from "react";

// Defines the interface for RAID calculation results
interface RaidResult {
  totalCapacity: string;
  usableCapacity: string;
  disksUsed: number;
  faultTolerance: string;
}

/**
 * @description Component to calculate RAID and ZFS capacity, with additional RAID types.
 * Calculates total capacity, usable capacity, number of disks used, and fault tolerance
 * for various RAID levels (RAID 0, 1, 5, 6, 10, 0+1, 50, 60) and ZFS (RAID-Z1, RAID-Z2, RAID-Z3).
 */
export default function RAIDCalculator() {
  const [numberOfDisks, setNumberOfDisks] = useState<string>("");
  const [diskSize, setDiskSize] = useState<string>("");
  const [raidType, setRaidType] = useState<string>("raid0");
  const [result, setResult] = useState<RaidResult | null>(null);
  const [error, setError] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Function to handle the calculation
  const handleCalculate = () => {
    setError("");
    setResult(null);
    setIsCalculating(true);

    const numDisks = parseInt(numberOfDisks, 10);
    const sizePerDisk = parseFloat(diskSize);

    // Input validation
    if (
      isNaN(numDisks) ||
      numDisks < 1 ||
      isNaN(sizePerDisk) ||
      sizePerDisk <= 0
    ) {
      setError(
        "Please enter a valid number of disks and a positive disk size.",
      );
      setIsCalculating(false);
      return;
    }

    let usableCapacity: number;
    let faultTolerance: string;
    let disksUsed: number;

    // Calculation logic based on RAID type
    switch (raidType) {
      case "raid0":
        if (numDisks < 2) {
          setError("RAID 0 requires a minimum of 2 disks.");
          setIsCalculating(false);
          return;
        }
        usableCapacity = numDisks * sizePerDisk;
        disksUsed = 0;
        faultTolerance = "None";
        break;
      case "raid1":
        if (numDisks < 2) {
          setError("RAID 1 requires a minimum of 2 disks.");
          setIsCalculating(false);
          return;
        }
        usableCapacity = sizePerDisk;
        disksUsed = numDisks - 1;
        faultTolerance = "1 disk";
        break;
      case "raid5":
        if (numDisks < 3) {
          setError("RAID 5 requires a minimum of 3 disks.");
          setIsCalculating(false);
          return;
        }
        usableCapacity = (numDisks - 1) * sizePerDisk;
        disksUsed = 1;
        faultTolerance = "1 disk";
        break;
      case "raid6":
        if (numDisks < 4) {
          setError("RAID 6 requires a minimum of 4 disks.");
          setIsCalculating(false);
          return;
        }
        usableCapacity = (numDisks - 2) * sizePerDisk;
        disksUsed = 2;
        faultTolerance = "2 disks";
        break;
      case "raid10":
        if (numDisks < 4 || numDisks % 2 !== 0) {
          setError(
            "RAID 10 requires a minimum of 4 disks and must be an even number.",
          );
          setIsCalculating(false);
          return;
        }
        usableCapacity = (numDisks / 2) * sizePerDisk;
        disksUsed = numDisks / 2;
        faultTolerance = "Depends on mirror configuration";
        break;
      case "raid01":
        if (numDisks < 4 || numDisks % 2 !== 0) {
          setError(
            "RAID 0+1 requires a minimum of 4 disks and must be an even number.",
          );
          setIsCalculating(false);
          return;
        }
        usableCapacity = (numDisks / 2) * sizePerDisk;
        disksUsed = numDisks / 2;
        faultTolerance = "1 disk from each stripe";
        break;
      case "raid50":
        if (numDisks < 6 || numDisks % 3 !== 0) {
          setError(
            "RAID 50 requires a minimum of 6 disks and must be a multiple of 3.",
          );
          setIsCalculating(false);
          return;
        }
        // Assuming 3-disk groups, one parity. numGroups = numDisks / 3. disksUsed = numGroups.
        const numGroups50 = numDisks / 3;
        usableCapacity = (numDisks - numGroups50) * sizePerDisk;
        disksUsed = numGroups50;
        faultTolerance = `${numGroups50} disk, one in each sub-array`;
        break;
      case "raid60":
        if (numDisks < 8 || numDisks % 4 !== 0) {
          setError(
            "RAID 60 requires a minimum of 8 disks and must be a multiple of 4.",
          );
          setIsCalculating(false);
          return;
        }
        // Assuming 4-disk groups, two parity. numGroups = numDisks / 4. disksUsed = 2 * numGroups.
        const numGroups60 = numDisks / 4;
        usableCapacity = (numDisks - 2 * numGroups60) * sizePerDisk;
        disksUsed = 2 * numGroups60;
        faultTolerance = `${2 * numGroups60} disks, two in each sub-array`;
        break;
      case "zfs-raidz1":
        if (numDisks < 2) {
          setError("ZFS RAID-Z1 requires a minimum of 2 disks.");
          setIsCalculating(false);
          return;
        }
        usableCapacity = (numDisks - 1) * sizePerDisk;
        disksUsed = 1;
        faultTolerance = "1 disk";
        break;
      case "zfs-raidz2":
        if (numDisks < 3) {
          setError("ZFS RAID-Z2 requires a minimum of 3 disks.");
          setIsCalculating(false);
          return;
        }
        usableCapacity = (numDisks - 2) * sizePerDisk;
        disksUsed = 2;
        faultTolerance = "2 disks";
        break;
      case "zfs-raidz3":
        if (numDisks < 4) {
          setError("ZFS RAID-Z3 requires a minimum of 4 disks.");
          setIsCalculating(false);
          return;
        }
        usableCapacity = (numDisks - 3) * sizePerDisk;
        disksUsed = 3;
        faultTolerance = "3 disks";
        break;
      default:
        setError("Invalid RAID type.");
        setIsCalculating(false);
        return;
    }

    // Simulate calculation time
    setTimeout(() => {
      setResult({
        totalCapacity: (numDisks * sizePerDisk).toFixed(2) + " TB",
        usableCapacity: usableCapacity.toFixed(2) + " TB",
        disksUsed,
        faultTolerance,
      });
      setIsCalculating(false);
    }, 500);
  };

  return (
    <div className="p-4 rounded-2xl w-full max-w-lg space-y-6">
      <div className="space-y-4 font-cinzel">
        {/* Number of Disks Input */}
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label
            htmlFor="numDisks"
            className="w-full sm:w-1/3 text-sm font-semibold transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            Number of Disks
          </label>
          <input
            type="number"
            id="numDisks"
            value={numberOfDisks}
            onChange={(e) => setNumberOfDisks(e.target.value)}
            placeholder="Example: 4"
            className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300"
            style={{
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)",
            }}
          />
        </div>

        {/* Disk Size Input */}
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label
            htmlFor="diskSize"
            className="w-full sm:w-1/3 text-sm font-semibold transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            Disk Size (TB)
          </label>
          <input
            type="number"
            id="diskSize"
            value={diskSize}
            onChange={(e) => setDiskSize(e.target.value)}
            placeholder="Example: 8"
            step="0.1"
            className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300"
            style={{
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)",
            }}
          />
        </div>

        {/* RAID/ZFS Type Selection */}
        <div className="flex flex-col sm:flex-row gap-4 items-center group">
          <label
            htmlFor="raidType"
            className="w-full sm:w-1/3 text-sm font-semibold transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            RAID/ZFS Type
          </label>
          <select
            id="raidType"
            value={raidType}
            onChange={(e) => setRaidType(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300 appearance-none"
            style={{
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)",
            }}
          >
            <option value="raid0">RAID 0 (Striping)</option>
            <option value="raid1">RAID 1 (Mirroring)</option>
            <option value="raid5">RAID 5 (Parity)</option>
            <option value="raid6">RAID 6 (Dual Parity)</option>
            <option value="raid10">RAID 10 (Striping of Mirrors)</option>
            <option value="raid01">RAID 0+1 (Mirroring of Stripes)</option>
            <option value="raid50">RAID 50 (Striping of RAID 5 Arrays)</option>
            <option value="raid60">RAID 60 (Striping of RAID 6 Arrays)</option>
            <option value="zfs-raidz1">ZFS RAID-Z1</option>
            <option value="zfs-raidz2">ZFS RAID-Z2</option>
            <option value="zfs-raidz3">ZFS RAID-Z3</option>
          </select>
        </div>
      </div>

      {/* Calculation Button */}
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
        {isCalculating ? "Calculating..." : "Calculate Capacity"}
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
            className="font-semibold font-cinzel transition-colors duration-500"
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
              RAID Type:
            </span>
            <span
              className="font-medium font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {raidType.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Total Capacity:
            </span>
            <span
              className="font-medium font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.totalCapacity}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Usable Capacity:
            </span>
            <span
              className="font-medium font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.usableCapacity}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Disks for Redundancy:
            </span>
            <span
              className="font-medium font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.disksUsed}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span
              className="font-semibold font-cinzel transition-colors duration-500"
              style={{ color: "var(--text-color)" }}
            >
              Fault Tolerance:
            </span>
            <span
              className="font-medium font-cinzel transition-colors duration-500"
              style={{ color: "var(--title-color)" }}
            >
              {result.faultTolerance}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
