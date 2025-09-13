import React, { useState, useRef, useEffect } from "react";
import "../styles/global.css";
import { Search, X } from "lucide-react";

// Daftar kategori
const categories = [
  "All",
  "Linux",
  "Windows",
  "MacOS",
  "Open-Source",
  "Networking",
];

// Menentukan tipe data untuk props
interface BlogSideBarProps {
  onSearch: (query: string, category: string | null) => void;
  searchQuery: string;
  selectedCategory: string | null;
}

const BlogSideBar = ({
  onSearch,
  searchQuery,
  selectedCategory,
}: BlogSideBarProps) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleCategoryClick = (category: string) => {
    const newCategory = category === "All" ? null : category;
    onSearch("", newCategory);
    setIsSearchVisible(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(localSearchQuery, null);
      setLocalSearchQuery("");
      setIsSearchVisible(false);
    }
  };

  const handleSearchButtonClick = () => {
    onSearch(localSearchQuery, null);
    setLocalSearchQuery("");
  };

  return (
    <div
      className="p-6 rounded-xl text-zinc-200 sticky z-10 font-cinzel transition-colors duration-500"
      style={{
        backgroundColor: "transparent",
      }}
    >
      {/* Bagian Kategori */}
      <div className="mt-0">
        <h2
          className="text-4xl font-extrabold text-center mb-2 tracking-wider transition-colors duration-500"
          style={{ color: "var(--title-color)" }}
        >
          Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`relative px-4 py-1 rounded-full sm:text-base md:text-xs font-semibold uppercase tracking-wide
  transition-all duration-300 transform
  ${
    selectedCategory === cat
      ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white shadow-lg shadow-yellow-400/40 scale-105 border-2 border-yellow-300"
      : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 dark:bg-zinc-800 dark:text-gray-400 dark:hover:from-zinc-700 dark:hover:to-zinc-600 border border-transparent hover:border-gray-400/30"
  }
`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bagian Pencarian */}
      {/* Bagian Pencarian dengan tinggi tetap untuk mencegah pergeseran layout */}
      <div
        ref={searchContainerRef}
        className="flex justify-center mt-6 relative w-full h-12"
      >
        {/* Input box */}
        <div
          className={`absolute w-full max-w-xs transition-all duration-300 ease-in-out ${
            isSearchVisible
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              autoFocus={isSearchVisible}
              className="w-full pl-4 pr-12 py-3 rounded-full font-cinzel focus:outline-none transition-all duration-300 ease-in-out"
              style={{
                backgroundColor: "var(--background-color)",
                color: "var(--text-color)",
                borderColor: "var(--nav-link-border)",
                borderWidth: "1px",
              }}
            />
            {localSearchQuery && (
              <button
                onClick={handleSearchButtonClick}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
            {localSearchQuery && (
              <button
                onClick={() => setLocalSearchQuery("")}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
                aria-label="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tombol yang mengaktifkan input pencarian */}
        <button
          onClick={() => {
            setIsSearchVisible(true);
            setLocalSearchQuery(searchQuery);
          }}
          className={`w-full max-w-xs flex items-center justify-center p-3 rounded-full border border-zinc-700 font-cinzel transition-all duration-300 shadow-md font-extrabold uppercase tracking-wider text-sm transform hover:scale-105 active:opacity-75 ${
            isSearchVisible
              ? "opacity-0 scale-95 pointer-events-none"
              : "opacity-100 scale-100 pointer-events-auto"
          }`}
          aria-label="Open Search"
          style={{
            backgroundImage:
              "linear-gradient(to top right, var(--nav-link-from), var(--nav-link-via), var(--nav-link-to))",
            color: "var(--nav-link-text)",
          }}
        >
          <Search className="w-4 h-4 mr-2" />
          <span className="truncate text-l">Search Posts</span>
        </button>
      </div>
    </div>
  );
};

export default BlogSideBar;
