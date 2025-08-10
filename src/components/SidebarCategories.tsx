import React, { useState } from "react";

const categories = [
  "Networking",
  "MacOS",
  "Windows",
  "Linux",
  "Virtualization",
  "Other",
];

export default function SidebarCategories({ onSelectCategory }: { onSelectCategory?: (cat: string) => void }) {
  const [active, setActive] = useState<string>("");

  const handleClick = (cat: string) => {
    setActive(cat);
    if (onSelectCategory) onSelectCategory(cat);
  };

  return (
    <aside className="bg-zinc-900 border border-yellow-700 rounded-lg p-4 space-y-2">
      <h2 className="text-lg font-cinzel font-bold text-yellow-500 mb-2">Categories</h2>
      <ul className="space-y-1">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => handleClick(cat)}
              className={`block w-full text-left px-2 py-1 rounded hover:bg-yellow-700/30 ${
                active === cat ? "bg-yellow-700/50 text-yellow-300" : "text-gray-300"
              }`}
              style={{ fontSize: "0.85rem" }}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
