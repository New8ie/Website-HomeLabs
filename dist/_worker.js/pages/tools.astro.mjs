globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_BbIlNa7L.mjs';
/* empty css                                  */
import { $ as $$Default } from '../chunks/Default_C-LqwSQP.mjs';
import { H as HeaderSection, F as FooterSection } from '../chunks/Footer_aeJBNuTl.mjs';
import { j as jsxRuntimeExports } from '../chunks/x_DBBlyqt9.mjs';
import { a as reactExports } from '../chunks/_@astro-renderers_B1w336LU.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_B1w336LU.mjs';
/* empty css                                 */

function SubnetCalculator() {
  const [ipAddress, setIpAddress] = reactExports.useState("");
  const [cidr, setCidr] = reactExports.useState("24");
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const [isCalculating, setIsCalculating] = reactExports.useState(false);
  const calculateSubnet = () => {
    setError("");
    setResult(null);
    setIsCalculating(true);
    setTimeout(() => {
      const ipOctets = ipAddress.split(".").map(Number);
      const cidrNum = parseInt(cidr, 10);
      if (ipOctets.length !== 4 || ipOctets.some((octet) => isNaN(octet) || octet < 0 || octet > 255) || cidrNum < 0 || cidrNum > 32) {
        setError("Invalid IP address or CIDR.");
        setIsCalculating(false);
        return;
      }
      const subnetMask = 4294967295 << 32 - cidrNum >>> 0;
      const maskOctets = [
        subnetMask >>> 24 & 255,
        subnetMask >>> 16 & 255,
        subnetMask >>> 8 & 255,
        subnetMask & 255
      ];
      const ipInt = ipOctets[0] << 24 | ipOctets[1] << 16 | ipOctets[2] << 8 | ipOctets[3];
      const networkAddressInt = ipInt & subnetMask;
      const networkOctets = [
        networkAddressInt >>> 24 & 255,
        networkAddressInt >>> 16 & 255,
        networkAddressInt >>> 8 & 255,
        networkAddressInt & 255
      ];
      const networkAddress = networkOctets.join(".");
      const broadcastAddressInt = networkAddressInt | ~subnetMask >>> 0;
      const broadcastOctets = [
        broadcastAddressInt >>> 24 & 255,
        broadcastAddressInt >>> 16 & 255,
        broadcastAddressInt >>> 8 & 255,
        broadcastAddressInt & 255
      ];
      const broadcastAddress = broadcastOctets.join(".");
      const firstHostInt = networkAddressInt + 1;
      const firstHostOctets = [
        firstHostInt >>> 24 & 255,
        firstHostInt >>> 16 & 255,
        firstHostInt >>> 8 & 255,
        firstHostInt & 255
      ];
      const firstHost = cidrNum === 31 || cidrNum === 32 ? "N/A" : firstHostOctets.join(".");
      const lastHostInt = broadcastAddressInt - 1;
      const lastHostOctets = [
        lastHostInt >>> 24 & 255,
        lastHostInt >>> 16 & 255,
        lastHostInt >>> 8 & 255,
        lastHostInt & 255
      ];
      const lastHost = cidrNum === 31 || cidrNum === 32 ? "N/A" : lastHostOctets.join(".");
      const totalHosts = 2 ** (32 - cidrNum);
      const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;
      setResult({
        networkAddress,
        firstHost,
        lastHost,
        broadcastAddress,
        totalHosts,
        usableHosts,
        mask: maskOctets.join(".")
      });
      setIsCalculating(false);
    }, 500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl w-full max-w-lg space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 font-cinzel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "ipAddress",
            className: "w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200",
            style: { color: "var(--text-color)" },
            children: "IP Address"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            id: "ipAddress",
            placeholder: "Example: 192.168.1.1",
            value: ipAddress,
            onChange: (e) => setIpAddress(e.target.value),
            className: "w-full px-4 py-2 rounded-lg focus:outline-none font-cinzel transition-all duration-300",
            style: {
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "cidr",
            className: "w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200",
            style: { color: "var(--text-color)" },
            children: "CIDR (/xx)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            id: "cidr",
            placeholder: "Example: 24",
            value: cidr,
            onChange: (e) => setCidr(e.target.value),
            className: "w-full px-4 py-2 rounded-lg focus:outline-none font-cinzel transition-all duration-300",
            style: {
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)"
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: calculateSubnet,
        disabled: isCalculating,
        className: "w-full p-3 rounded-lg font-bold font-cinzel text-center transition-all duration-300",
        style: {
          backgroundColor: "var(--primary-button-bg)",
          color: "var(--primary-button-text)",
          boxShadow: isCalculating ? "none" : "0 4px 6px -1px var(--shadow-color)",
          transform: isCalculating ? "translateY(2px)" : "none"
        },
        children: isCalculating ? "Calculating..." : "Calculate"
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mt-6 p-4 rounded-lg font-cinzel transition-colors duration-500",
        style: {
          backgroundColor: "var(--error-bg)",
          borderColor: "var(--error-border)",
          borderWidth: "1px"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-semibold transition-colors font-cinzel duration-500",
            style: { color: "var(--error-text)" },
            children: error
          }
        )
      }
    ),
    result && !error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mt-6 p-4 rounded-lg space-y-2 animate-fade-in font-cinzel transition-colors duration-500",
        style: {
          backgroundColor: "var(--pages-bg)",
          borderColor: "var(--border-bg)",
          borderWidth: "1px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "Network Address:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-medium  font-cinzel transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: result.networkAddress
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "Subnet Mask:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-medium transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: result.mask
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "Broadcast Address:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-medium font-cinzel transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: result.broadcastAddress
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "Usable IP Range:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "font-medium font-cinzel transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: [
                  result.firstHost,
                  " - ",
                  result.lastHost
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "Total Hosts:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-medium font-cinzel transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: result.totalHosts
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "Usable Hosts:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-medium font-cinzel transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: result.usableHosts
              }
            )
          ] })
        ]
      }
    )
  ] });
}

function BandwidthConverter() {
  const [inputValue, setInputValue] = reactExports.useState("");
  const [fromUnit, setFromUnit] = reactExports.useState("Mbps");
  const [toUnit, setToUnit] = reactExports.useState("MBps");
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const [isCalculating, setIsCalculating] = reactExports.useState(false);
  const units = [
    { value: "bps", label: "b/s" },
    { value: "Kbps", label: "Kbps" },
    { value: "Mbps", label: "Mbps" },
    { value: "Gbps", label: "Gbps" },
    { value: "Bps", label: "B/s" },
    { value: "KBps", label: "KB/s" },
    { value: "MBps", label: "MB/s" },
    { value: "GBps", label: "GB/s" }
  ];
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
    setTimeout(() => {
      let baseBitsPerSecond;
      switch (fromUnit) {
        case "bps":
          baseBitsPerSecond = value;
          break;
        case "Kbps":
          baseBitsPerSecond = value * 1e3;
          break;
        case "Mbps":
          baseBitsPerSecond = value * 1e3 * 1e3;
          break;
        case "Gbps":
          baseBitsPerSecond = value * 1e3 * 1e3 * 1e3;
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
      let convertedValue;
      switch (toUnit) {
        case "bps":
          convertedValue = baseBitsPerSecond;
          break;
        case "Kbps":
          convertedValue = baseBitsPerSecond / 1e3;
          break;
        case "Mbps":
          convertedValue = baseBitsPerSecond / (1e3 * 1e3);
          break;
        case "Gbps":
          convertedValue = baseBitsPerSecond / (1e3 * 1e3 * 1e3);
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
    }, 500);
  };
  const formatNumber = (num) => {
    return num.toFixed(2).replace(/\.?0*$/, "");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl w-full max-w-lg space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 font-cinzel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "inputValue",
            className: "w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200",
            style: { color: "var(--text-color)" },
            children: "Value"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            id: "inputValue",
            placeholder: "Example: 100",
            value: inputValue,
            onChange: (e) => setInputValue(e.target.value),
            className: "w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300",
            style: {
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "fromUnit",
            className: "w-full sm:w-1/3 text-sm font-semibold transition-colors duration-200",
            style: { color: "var(--text-color)" },
            children: "From"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            id: "fromUnit",
            value: fromUnit,
            onChange: (e) => setFromUnit(e.target.value),
            className: "w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300 appearance-none",
            style: {
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)"
            },
            children: units.map((unit) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: unit.value, children: unit.label }, unit.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "toUnit",
            className: "w-full sm:w-1/3 text-sm font-semibold transition-colors duration-200",
            style: { color: "var(--text-color)" },
            children: "To"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            id: "toUnit",
            value: toUnit,
            onChange: (e) => setToUnit(e.target.value),
            className: "w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300 appearance-none",
            style: {
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)"
            },
            children: units.map((unit) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: unit.value, children: unit.label }, unit.value))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: calculateConversion,
        disabled: isCalculating,
        className: "w-full p-3 rounded-lg font-bold font-cinzel text-center transition-all duration-300",
        style: {
          backgroundColor: "var(--primary-button-bg)",
          color: "var(--primary-button-text)",
          boxShadow: isCalculating ? "none" : "0 4px 6px -1px var(--shadow-color)",
          transform: isCalculating ? "translateY(2px)" : "none"
        },
        children: isCalculating ? "Calculating..." : "Convert"
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mt-6 p-4 rounded-lg font-cinzel transition-colors duration-500",
        style: {
          backgroundColor: "var(--error-bg)",
          borderColor: "var(--error-border)",
          borderWidth: "1px"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-semibold transition-colors duration-500",
            style: { color: "var(--error-text)" },
            children: error
          }
        )
      }
    ),
    result !== null && !error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mt-6 p-4 rounded-lg space-y-2 text-center animate-fade-in font-cinzel transition-colors duration-500",
        style: {
          backgroundColor: "var(--background-color)",
          borderColor: "var(--border-bg)",
          borderWidth: "1px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-lg transition-colors duration-500",
              style: { color: "var(--text-color)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-semibold transition-colors duration-500",
                    style: { color: "var(--title-color)" },
                    children: [
                      formatNumber(parseFloat(inputValue)),
                      " ",
                      fromUnit
                    ]
                  }
                ),
                " ",
                "equals"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-xl font-bold transition-colors duration-500",
              style: { color: "var(--title-color)" },
              children: [
                formatNumber(result),
                " ",
                toUnit
              ]
            }
          )
        ]
      }
    )
  ] });
}

function PowerConverter() {
  const [inputValue, setInputValue] = reactExports.useState("");
  const [inputUnit, setInputUnit] = reactExports.useState("W");
  const [powerFactor, setPowerFactor] = reactExports.useState("0.8");
  const [result, setResult] = reactExports.useState(null);
  const [batteryResult, setBatteryResult] = reactExports.useState(
    null
  );
  const [error, setError] = reactExports.useState("");
  const [isCalculating, setIsCalculating] = reactExports.useState(false);
  const [runtimeMinutes, setRuntimeMinutes] = reactExports.useState("");
  const [batteryVoltage, setBatteryVoltage] = reactExports.useState("");
  const handleCalculate = () => {
    setError("");
    setResult(null);
    setBatteryResult(null);
    setIsCalculating(true);
    const valueNum = parseFloat(inputValue);
    const powerFactorNum = parseFloat(powerFactor);
    const runtimeNum = parseFloat(runtimeMinutes);
    const voltageNum = parseFloat(batteryVoltage);
    const batteryEfficiency = 0.9;
    if (isNaN(valueNum) || valueNum < 0 || isNaN(powerFactorNum) || powerFactorNum < 0 || powerFactorNum > 1) {
      setError(
        "Invalid input. Please enter a valid number and Power Factor (0-1)."
      );
      setIsCalculating(false);
      return;
    }
    setTimeout(() => {
      let convertedValue;
      let convertedUnit;
      let wattage;
      if (inputUnit === "W") {
        convertedValue = valueNum / (1e3 * powerFactorNum);
        convertedUnit = "kVA";
        wattage = valueNum;
      } else {
        convertedValue = valueNum * 1e3 * powerFactorNum;
        convertedUnit = "W";
        wattage = convertedValue;
      }
      setResult({
        value: parseFloat(convertedValue.toFixed(2)),
        unit: convertedUnit
      });
      if (!isNaN(runtimeNum) && !isNaN(voltageNum) && runtimeNum > 0 && voltageNum > 0) {
        const runtimeHours = runtimeNum / 60;
        const requiredAh = wattage * runtimeHours / (voltageNum * batteryEfficiency);
        setBatteryResult({ requiredAh: parseFloat(requiredAh.toFixed(2)) });
      }
      setIsCalculating(false);
    }, 500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6 transform transition-transform duration-300 hover:scale-10",
      style: {
        boxShadow: "0 0 0px var(--shadow-color)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "text-3xl font-bold text-center uppercase tracking-wider font-cinzel transition-colors duration-500 ",
            style: { color: "var(--title-color)" },
            children: "W / kVA Converter"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 font-cinzel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inputValue",
                className: "w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200",
                style: { color: "var(--text-color)" },
                children: "Value"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                id: "inputValue",
                placeholder: `Enter value in ${inputUnit}`,
                value: inputValue,
                onChange: (e) => setInputValue(e.target.value),
                className: "w-full px-4 py-2 rounded-lg focus:outline-none font-cinzel transition-all duration-300",
                style: {
                  backgroundColor: "var(--background-color)",
                  borderColor: "var(--border-bg)",
                  borderWidth: "1px",
                  color: "var(--text-color)"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "inputUnit",
                className: "w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200",
                style: { color: "var(--text-color)" },
                children: "Convert From"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "inputUnit",
                value: inputUnit,
                onChange: (e) => setInputUnit(e.target.value),
                className: "w-full px-4 py-2 rounded-lg focus:outline-none font-cinzel appearance-none transition-all duration-300",
                style: {
                  backgroundColor: "var(--background-color)",
                  borderColor: "var(--border-bg)",
                  borderWidth: "1px",
                  color: "var(--text-color)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "W", children: "Watt (W) to kVA" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "kVA", children: "kVA to Watt (W)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "powerFactor",
                className: "w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200",
                style: { color: "var(--text-color)" },
                children: "Power Factor (PF)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                id: "powerFactor",
                placeholder: "Typically 0.8 - 0.95",
                value: powerFactor,
                onChange: (e) => setPowerFactor(e.target.value),
                className: "w-full px-4 py-2 rounded-lg focus:outline-none font-cinzel transition-all duration-300",
                style: {
                  backgroundColor: "var(--background-color)",
                  borderColor: "var(--border-bg)",
                  borderWidth: "1px",
                  color: "var(--text-color)"
                }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "space-y-4 font-cinzel border-t pt-4",
            style: { borderColor: "var(--border-bg)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-xl font-bold text-center uppercase tracking-wider font-cinzel transition-colors duration-500",
                  style: { color: "var(--title-color)" },
                  children: "Optional Battery Sizing"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "runtimeMinutes",
                    className: "w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200",
                    style: { color: "var(--text-color)" },
                    children: "Runtime (minutes)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "number",
                    id: "runtimeMinutes",
                    placeholder: "e.g., 30",
                    value: runtimeMinutes,
                    onChange: (e) => setRuntimeMinutes(e.target.value),
                    className: "w-full px-4 py-2 rounded-lg focus:outline-none font-cinzel transition-all duration-300",
                    style: {
                      backgroundColor: "var(--background-color)",
                      borderColor: "var(--border-bg)",
                      borderWidth: "1px",
                      color: "var(--text-color)"
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "batteryVoltage",
                    className: "w-full sm:w-1/3 text-sm font-semibold font-cinzel transition-colors duration-200",
                    style: { color: "var(--text-color)" },
                    children: "Battery Voltage (V)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "number",
                    id: "batteryVoltage",
                    placeholder: "e.g., 12",
                    value: batteryVoltage,
                    onChange: (e) => setBatteryVoltage(e.target.value),
                    className: "w-full px-4 py-2 rounded-lg focus:outline-none font-cinzel transition-all duration-300",
                    style: {
                      backgroundColor: "var(--background-color)",
                      borderColor: "var(--border-bg)",
                      borderWidth: "1px",
                      color: "var(--text-color)"
                    }
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleCalculate,
            disabled: isCalculating,
            className: "w-full p-3 rounded-lg font-bold font-cinzel text-center transition-all duration-300",
            style: {
              backgroundColor: "var(--primary-button-bg)",
              color: "var(--primary-button-text)",
              boxShadow: isCalculating ? "none" : "0 4px 6px -1px var(--shadow-color)",
              transform: isCalculating ? "translateY(2px)" : "none"
            },
            children: isCalculating ? "Calculating..." : "Calculate"
          }
        ),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mt-6 p-4 rounded-lg font-cinzel transition-colors duration-500",
            style: {
              backgroundColor: "var(--error-bg)",
              borderColor: "var(--error-border)",
              borderWidth: "1px"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-semibold transition-colors font-cinzel duration-500",
                style: { color: "var(--error-text)" },
                children: error
              }
            )
          }
        ),
        result && !error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-6 p-4 rounded-lg space-y-2 animate-fade-in font-cinzel transition-colors duration-500",
            style: {
              backgroundColor: "var(--pages-bg)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-semibold font-cinzel transition-colors duration-500",
                    style: { color: "var(--text-color)" },
                    children: "Conversion Result:"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-medium font-cinzel transition-colors duration-500",
                    style: { color: "var(--title-color)" },
                    children: [
                      result.value,
                      " ",
                      result.unit
                    ]
                  }
                )
              ] }),
              batteryResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between items-center text-sm pt-2",
                  style: { borderTop: "1px solid var(--border-bg)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-semibold font-cinzel transition-colors duration-500",
                        style: { color: "var(--text-color)" },
                        children: "Required Battery Capacity:"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "font-medium font-cinzel transition-colors duration-500",
                        style: { color: "var(--title-color)" },
                        children: [
                          batteryResult.requiredAh,
                          " Ah"
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}

function RAIDCalculator() {
  const [numberOfDisks, setNumberOfDisks] = reactExports.useState("");
  const [diskSize, setDiskSize] = reactExports.useState("");
  const [raidType, setRaidType] = reactExports.useState("raid0");
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const [isCalculating, setIsCalculating] = reactExports.useState(false);
  const handleCalculate = () => {
    setError("");
    setResult(null);
    setIsCalculating(true);
    const numDisks = parseInt(numberOfDisks, 10);
    const sizePerDisk = parseFloat(diskSize);
    if (isNaN(numDisks) || numDisks < 1 || isNaN(sizePerDisk) || sizePerDisk <= 0) {
      setError(
        "Please enter a valid number of disks and a positive disk size."
      );
      setIsCalculating(false);
      return;
    }
    let usableCapacity;
    let faultTolerance;
    let disksUsed;
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
            "RAID 10 requires a minimum of 4 disks and must be an even number."
          );
          setIsCalculating(false);
          return;
        }
        usableCapacity = numDisks / 2 * sizePerDisk;
        disksUsed = numDisks / 2;
        faultTolerance = "Depends on mirror configuration";
        break;
      case "raid01":
        if (numDisks < 4 || numDisks % 2 !== 0) {
          setError(
            "RAID 0+1 requires a minimum of 4 disks and must be an even number."
          );
          setIsCalculating(false);
          return;
        }
        usableCapacity = numDisks / 2 * sizePerDisk;
        disksUsed = numDisks / 2;
        faultTolerance = "1 disk from each stripe";
        break;
      case "raid50":
        if (numDisks < 6 || numDisks % 3 !== 0) {
          setError(
            "RAID 50 requires a minimum of 6 disks and must be a multiple of 3."
          );
          setIsCalculating(false);
          return;
        }
        const numGroups50 = numDisks / 3;
        usableCapacity = (numDisks - numGroups50) * sizePerDisk;
        disksUsed = numGroups50;
        faultTolerance = `${numGroups50} disk, one in each sub-array`;
        break;
      case "raid60":
        if (numDisks < 8 || numDisks % 4 !== 0) {
          setError(
            "RAID 60 requires a minimum of 8 disks and must be a multiple of 4."
          );
          setIsCalculating(false);
          return;
        }
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
    setTimeout(() => {
      setResult({
        totalCapacity: (numDisks * sizePerDisk).toFixed(2) + " TB",
        usableCapacity: usableCapacity.toFixed(2) + " TB",
        disksUsed,
        faultTolerance
      });
      setIsCalculating(false);
    }, 500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl w-full max-w-lg space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 font-cinzel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "numDisks",
            className: "w-full sm:w-1/3 text-sm font-semibold transition-colors duration-200",
            style: { color: "var(--text-color)" },
            children: "Number of Disks"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            id: "numDisks",
            value: numberOfDisks,
            onChange: (e) => setNumberOfDisks(e.target.value),
            placeholder: "Example: 4",
            className: "w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300",
            style: {
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "diskSize",
            className: "w-full sm:w-1/3 text-sm font-semibold transition-colors duration-200",
            style: { color: "var(--text-color)" },
            children: "Disk Size (TB)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            id: "diskSize",
            value: diskSize,
            onChange: (e) => setDiskSize(e.target.value),
            placeholder: "Example: 8",
            step: "0.1",
            className: "w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300",
            style: {
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "raidType",
            className: "w-full sm:w-1/3 text-sm font-semibold transition-colors duration-200",
            style: { color: "var(--text-color)" },
            children: "RAID/ZFS Type"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: "raidType",
            value: raidType,
            onChange: (e) => setRaidType(e.target.value),
            className: "w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-300 appearance-none",
            style: {
              backgroundColor: "var(--background-color)",
              borderColor: "var(--border-bg)",
              borderWidth: "1px",
              color: "var(--text-color)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "raid0", children: "RAID 0 (Striping)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "raid1", children: "RAID 1 (Mirroring)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "raid5", children: "RAID 5 (Parity)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "raid6", children: "RAID 6 (Dual Parity)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "raid10", children: "RAID 10 (Striping of Mirrors)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "raid01", children: "RAID 0+1 (Mirroring of Stripes)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "raid50", children: "RAID 50 (Striping of RAID 5 Arrays)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "raid60", children: "RAID 60 (Striping of RAID 6 Arrays)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "zfs-raidz1", children: "ZFS RAID-Z1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "zfs-raidz2", children: "ZFS RAID-Z2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "zfs-raidz3", children: "ZFS RAID-Z3" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleCalculate,
        disabled: isCalculating,
        className: "w-full p-3 rounded-lg font-bold font-cinzel text-center transition-all duration-300",
        style: {
          backgroundColor: "var(--primary-button-bg)",
          color: "var(--primary-button-text)",
          boxShadow: isCalculating ? "none" : "0 4px 6px -1px var(--shadow-color)",
          transform: isCalculating ? "translateY(2px)" : "none"
        },
        children: isCalculating ? "Calculating..." : "Calculate Capacity"
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mt-6 p-4 rounded-lg font-cinzel transition-colors duration-500",
        style: {
          backgroundColor: "var(--error-bg)",
          borderColor: "var(--error-border)",
          borderWidth: "1px"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-semibold font-cinzel transition-colors duration-500",
            style: { color: "var(--error-text)" },
            children: error
          }
        )
      }
    ),
    result && !error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mt-6 p-4 rounded-lg space-y-2 animate-fade-in font-cinzel transition-colors duration-500",
        style: {
          backgroundColor: "var(--pages-bg)",
          borderColor: "var(--border-bg)",
          borderWidth: "1px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "RAID Type:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-medium font-cinzel transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: raidType.toUpperCase()
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "Total Capacity:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-medium font-cinzel transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: result.totalCapacity
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "Usable Capacity:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-medium font-cinzel transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: result.usableCapacity
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "Disks for Redundancy:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-medium font-cinzel transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: result.disksUsed
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "Fault Tolerance:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-medium font-cinzel transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: result.faultTolerance
              }
            )
          ] })
        ]
      }
    )
  ] });
}

const CircleNotch = ({ size, className }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    fill: "currentColor",
    className,
    viewBox: "0 0 256 256",
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M168,40.1a8,8,0,0,1,8-8,96,96,0,1,1-97.1,97.1,8,8,0,0,1,7.1-13.1,80,80,0,1,0,80-80ZM231.1,56.9a8,8,0,0,0-8-8,96.1,96.1,0,0,0-137.2,0,8,8,0,0,0,11.3,11.3A80,80,0,0,1,215.1,65a8,8,0,0,0,8.8-8.1Z" })
  }
);
function MacAddressLookup() {
  const [macAddress, setMacAddress] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const [isCalculating, setIsCalculating] = reactExports.useState(false);
  const [macDb, setMacDb] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const fetchMacDatabase = async () => {
      try {
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
  }, []);
  const parseCsv = (text) => {
    const lines = text.split("\r\n");
    const dataMap = /* @__PURE__ */ new Map();
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === "") continue;
      const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      if (parts.length >= 3) {
        const oui = parts[1].replace(/"/g, "").trim();
        const orgName = parts[2].replace(/"/g, "").trim();
        const orgAddress = parts[3].replace(/"/g, "").trim();
        dataMap.set(oui, { name: orgName, address: orgAddress });
      }
    }
    return dataMap;
  };
  const handleLookup = () => {
    setError("");
    setResult(null);
    setIsCalculating(true);
    if (!macDb) {
      setError("Database is not loaded yet. Please try again.");
      setIsCalculating(false);
      return;
    }
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
    }, 500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "macAddress",
          className: "block mb-2 text-sm font-medium transition-colors duration-500 font-cinzel",
          style: { color: "var(--text-color)" },
          children: "Enter MAC Address"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          id: "macAddress",
          placeholder: "Example: 00-1A-2B-3C-4D-5E",
          value: macAddress,
          onChange: (e) => setMacAddress(e.target.value),
          className: "w-full p-3 rounded-lg border-2 font-cinzel transition-colors duration-500",
          style: {
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
            borderColor: "var(--border-bg)"
          }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleLookup,
        disabled: isCalculating || !macDb,
        className: "w-full p-3 rounded-lg font-bold font-cinzel text-center transition-all duration-300",
        style: {
          backgroundColor: isCalculating || !macDb ? "var(--primary-button-bg)" : "var(--primary-button-bg)",
          color: "var(--primary-button-text)",
          boxShadow: isCalculating || !macDb ? "none" : "0 4px 6px -1px var(--shadow-color)",
          transform: isCalculating || !macDb ? "translateY(2px)" : "none"
        },
        children: isCalculating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleNotch, { size: 20, className: "animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Searching..." })
        ] }) : "Lookup Manufacturer"
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mt-6 p-4 rounded-lg font-cinzel transition-colors duration-500",
        style: {
          backgroundColor: "var(--error-bg)",
          borderColor: "var(--error-border)",
          borderWidth: "1px"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-semibold transition-colors font-cinzel duration-500",
            style: { color: "var(--error-text)" },
            children: error
          }
        )
      }
    ),
    result && !error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mt-6 p-4 rounded-lg space-y-4 text-sm animate-fade-in font-cinzel transition-colors duration-500",
        style: {
          backgroundColor: "var(--pages-bg)",
          borderColor: "var(--border-bg)",
          borderWidth: "1px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-bold text-lg mb-2 text-center transition-colors font-cinzel duration-500",
              style: { color: "var(--title-color)" },
              children: "Lookup Result"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "Organization:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-medium text-right font-cinzel transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: result.name
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold font-cinzel transition-colors duration-500",
                style: { color: "var(--text-color)" },
                children: "Address:"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-medium text-right font-cinzel transition-colors duration-500",
                style: { color: "var(--title-color)" },
                children: result.address
              }
            )
          ] })
        ]
      }
    )
  ] });
}

const $$Tools = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$Default, { "title": "Tools - HomeLabs", "data-astro-cid-mlc4vpxg": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeaderSection", HeaderSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/sections/Header", "client:component-export": "HeaderSection", "data-astro-cid-mlc4vpxg": true })} ${maybeRenderHead()}<main class="main-content-style min-h-screen p-6 md:p-12 transition-colors duration-500" data-astro-cid-mlc4vpxg> <div class="max-w-5xl mx-auto space-y-12 animate-fade-in" data-astro-cid-mlc4vpxg> <div class="text-center space-y-4 animate-fade-in-up" data-astro-cid-mlc4vpxg> <h1 class="hero-title uppercase tracking-widest font-cinzel leading-tight transition-colors duration-500" data-astro-cid-mlc4vpxg>
Tools
</h1> </div> <p class="text-sm font-light font-cinzel text-center transition-colors duration-500"${addAttribute({ color: "var(--text-color)" }, "style")} data-astro-cid-mlc4vpxg>
A collection of tools created to simplify your tasks and development.
</p> <section class="space-y-16" data-astro-cid-mlc4vpxg> <div id="subnet-calculator" class="p-8 space-y-8 tool-card backdrop-blur-sm border border-zinc-700 rounded-lg tool-card-style animate-fade-in-up" data-astro-cid-mlc4vpxg> <div class="flex flex-col sm:flex-row items-start gap-6" data-astro-cid-mlc4vpxg> <div class="space-y-4" data-astro-cid-mlc4vpxg> <h2 class="text-2xl font-bold font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--title-color)" }, "style")} data-astro-cid-mlc4vpxg>
Subnet Calculator
</h2> <p class="text-sm leading-relaxed font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--text-color)" }, "style")} data-astro-cid-mlc4vpxg>
Alat ini membantu Anda menghitung detail jaringan dari sebuah IP
                address dan CIDR.
</p> <div class="space-y-2" data-astro-cid-mlc4vpxg> <h3 class="font-bold font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--title-color)" }, "style")} data-astro-cid-mlc4vpxg>
Cara Penggunaan
</h3> <ul class="list-disc list-inside text-sm font-cinzel leading-relaxed transition-colors duration-500"${addAttribute({ color: "var(--text-color)" }, "style")} data-astro-cid-mlc4vpxg> <li data-astro-cid-mlc4vpxg>
Masukkan **IP Address** yang valid, misalnya \`192.168.1.1\`.
</li> <li data-astro-cid-mlc4vpxg>
Pilih **CIDR** (Classless Inter-Domain Routing) yang sesuai
                    untuk subnet Anda.
</li> <li data-astro-cid-mlc4vpxg>
Klik tombol **"Calculate"** untuk melihat detail jaringan
                    seperti Network Address, Broadcast Address, dan jumlah host
                    yang tersedia.
</li> </ul> </div> </div> <img src="/assets/images/Items/calculator.png" alt="Subnet Calculator Icon" class="w-full sm:w-1/3 object-contain transform transition-transform duration-300 hover:scale-105 hover:rotate-3" data-astro-cid-mlc4vpxg> </div> ${renderComponent($$result2, "SubnetCalculator", SubnetCalculator, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/components/SubnetCalculator", "client:component-export": "default", "data-astro-cid-mlc4vpxg": true })} </div> <div id="bandwidth-converter" class="p-8 space-y-8 tool-card backdrop-blur-sm border border-zinc-700 rounded-lg tool-card-style animate-fade-in-up" data-astro-cid-mlc4vpxg> <div class="flex flex-col sm:flex-row-reverse items-start gap-6" data-astro-cid-mlc4vpxg> <div class="space-y-4" data-astro-cid-mlc4vpxg> <h2 class="text-2xl font-bold font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--title-color)" }, "style")} data-astro-cid-mlc4vpxg>
Bandwidth Converter
</h2> <p class="text-sm leading-relaxed font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--text-color)" }, "style")} data-astro-cid-mlc4vpxg>
Alat untuk mengkonversi kecepatan bandwidth dari berbagai unit,
                seperti Mbps ke MB/s.
</p> <div class="space-y-2" data-astro-cid-mlc4vpxg> <h3 class="font-bold font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--title-color)" }, "style")} data-astro-cid-mlc4vpxg>
Cara Penggunaan
</h3> <ul class="list-disc list-inside text-sm font-cinzel leading-relaxed transition-colors duration-500"${addAttribute({ color: "var(--text-color)" }, "style")} data-astro-cid-mlc4vpxg> <li data-astro-cid-mlc4vpxg>
Masukkan **nilai numerik** yang ingin Anda konversi ke dalam
                    kotak input.
</li> <li data-astro-cid-mlc4vpxg>
Pilih unit **asal** (misalnya Mbps) dan unit **tujuan**
                    (misalnya MBps) dari menu dropdown.
</li> <li data-astro-cid-mlc4vpxg>
Klik tombol **"Convert"** untuk melihat hasil konversinya.
</li> </ul> </div> </div> <img src="/assets/images/Items/tool-01.png" alt="Bandwidth Converter Icon" class="w-full sm:w-1/3 object-contain transform transition-transform duration-300 hover:scale-105 hover:-rotate-3" data-astro-cid-mlc4vpxg> </div> ${renderComponent($$result2, "BandwidthConverter", BandwidthConverter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/components/BandwidthConverter", "client:component-export": "default", "data-astro-cid-mlc4vpxg": true })} </div> <div id="power-converter" class="p-8 space-y-8 tool-card backdrop-blur-sm border border-zinc-700 rounded-lg tool-card-style animate-fade-in-up" data-astro-cid-mlc4vpxg> <div class="flex flex-col sm:flex-row items-start gap-6" data-astro-cid-mlc4vpxg> <div class="space-y-4" data-astro-cid-mlc4vpxg> <h2 class="text-2xl font-bold font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--title-color)" }, "style")} data-astro-cid-mlc4vpxg>
Power Converter
</h2> <p class="text-sm leading-relaxed font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--text-color)" }, "style")} data-astro-cid-mlc4vpxg>
Alat untuk mengkonversi daya (Watt/kVA) dan mengukur kebutuhan
                baterai untuk UPS Anda.
</p> <div class="space-y-2" data-astro-cid-mlc4vpxg> <h3 class="font-bold font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--title-color)" }, "style")} data-astro-cid-mlc4vpxg>
Cara Penggunaan
</h3> <ul class="list-disc list-inside text-sm font-cinzel leading-relaxed transition-colors duration-500"${addAttribute({ color: "var(--text-color)" }, "style")} data-astro-cid-mlc4vpxg> <li data-astro-cid-mlc4vpxg>
Masukkan **nilai daya** (Watt atau kVA) pada kolom input.
</li> <li data-astro-cid-mlc4vpxg>
Sesuaikan **Power Factor (PF)**. Nilai umum yang sering
                    digunakan adalah 0.8.
</li> <li data-astro-cid-mlc4vpxg>
Untuk menghitung kapasitas baterai, masukkan **Waktu Operasi
                    (Runtime)** dalam menit dan **Tegangan Baterai (V)**.
</li> <li data-astro-cid-mlc4vpxg>
Klik tombol **"Calculate"** untuk melihat hasil konversi dan
                    kapasitas baterai yang dibutuhkan.
</li> </ul> </div> </div> <img src="/assets/images/Items/tool-02.png" alt="Power Converter Icon" class="w-full sm:w-1/3 object-contain transform transition-transform duration-300 hover:scale-105 hover:rotate-3" data-astro-cid-mlc4vpxg> </div> ${renderComponent($$result2, "PowerConverter", PowerConverter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/components/PowerCoverter", "client:component-export": "default", "data-astro-cid-mlc4vpxg": true })} </div> <div id="raid-calculator" class="p-8 space-y-8 tool-card backdrop-blur-sm border border-zinc-700 rounded-lg tool-card-style animate-fade-in-up" data-astro-cid-mlc4vpxg> <div class="flex flex-col sm:flex-row-reverse items-start gap-6" data-astro-cid-mlc4vpxg> <div class="space-y-4" data-astro-cid-mlc4vpxg> <h2 class="text-2xl font-bold font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--title-color)" }, "style")} data-astro-cid-mlc4vpxg>
RAID Calculator
</h2> <p class="text-sm leading-relaxed font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--text-color)" }, "style")} data-astro-cid-mlc4vpxg>
Alat ini membantu Anda menghitung kapasitas total dan yang dapat
                digunakan untuk berbagai konfigurasi RAID dan ZFS.
</p> <div class="space-y-2" data-astro-cid-mlc4vpxg> <h3 class="font-bold font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--title-color)" }, "style")} data-astro-cid-mlc4vpxg>
Cara Penggunaan
</h3> <ul class="list-disc list-inside text-sm font-cinzel leading-relaxed transition-colors duration-500"${addAttribute({ color: "var(--text-color)" }, "style")} data-astro-cid-mlc4vpxg> <li data-astro-cid-mlc4vpxg>Masukkan **Jumlah Disk** yang ingin Anda gunakan.</li> <li data-astro-cid-mlc4vpxg>Masukkan **Ukuran Disk** dalam Terabyte (TB).</li> <li data-astro-cid-mlc4vpxg>Pilih **Tipe RAID/ZFS** yang sesuai dari dropdown.</li> <li data-astro-cid-mlc4vpxg>
Klik tombol **"Hitung Kapasitas"** untuk melihat hasilnya.
</li> </ul> </div> </div> <img src="/assets/images/Items/disk.png" alt="RAID Calculator Icon" class="w-full sm:w-1/3 object-contain transform transition-transform duration-300 hover:scale-105 hover:-rotate-3" data-astro-cid-mlc4vpxg> </div> ${renderComponent($$result2, "RAIDCalculator", RAIDCalculator, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/components/RAIDCalculator", "client:component-export": "default", "data-astro-cid-mlc4vpxg": true })} </div> <div id="mac-address-lookup" class="p-8 space-y-8 tool-card backdrop-blur-sm border border-zinc-700 rounded-lg tool-card-style animate-fade-in-up" data-astro-cid-mlc4vpxg> <div class="flex flex-col sm:flex-row items-start gap-6" data-astro-cid-mlc4vpxg> <div class="space-y-4" data-astro-cid-mlc4vpxg> <h2 class="text-2xl font-bold font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--title-color)" }, "style")} data-astro-cid-mlc4vpxg>
Mac Address Lookup
</h2> <p class="text-sm leading-relaxed font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--text-color)" }, "style")} data-astro-cid-mlc4vpxg>
Alat untuk mencari produsen perangkat berdasarkan 3 oktet
                pertama alamat MAC-nya (OUI) menggunakan database yang umum.
</p> <div class="space-y-2" data-astro-cid-mlc4vpxg> <h3 class="font-bold font-cinzel transition-colors duration-500"${addAttribute({ color: "var(--title-color)" }, "style")} data-astro-cid-mlc4vpxg>
Cara Penggunaan
</h3> <ul class="list-disc list-inside text-sm font-cinzel leading-relaxed transition-colors duration-500"${addAttribute({ color: "var(--text-color)" }, "style")} data-astro-cid-mlc4vpxg> <li data-astro-cid-mlc4vpxg>
Masukkan **alamat MAC** yang valid ke dalam kotak input.
</li> <li data-astro-cid-mlc4vpxg>
Klik tombol **"Cari Produsen"** untuk melihat hasilnya.
</li> </ul> </div> </div> <img src="/assets/images/Items/mac.png" alt="Mac Address Lookup Icon" class="w-full sm:w-1/3 object-contain transform transition-transform duration-300 hover:scale-105 hover:rotate-3" data-astro-cid-mlc4vpxg> </div> ${renderComponent($$result2, "MacAddressLookup", MacAddressLookup, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/components/MacAddressLookUp", "client:component-export": "default", "data-astro-cid-mlc4vpxg": true })} </div> </section> </div> </main> ${renderComponent($$result2, "FooterSection", FooterSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/sections/Footer", "client:component-export": "FooterSection", "data-astro-cid-mlc4vpxg": true })} ` })} `;
}, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/tools.astro", void 0);

const $$file = "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/tools.astro";
const $$url = "/tools";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Tools,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
