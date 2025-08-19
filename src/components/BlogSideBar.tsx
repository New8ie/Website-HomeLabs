import React, { useState } from 'react';
import "../styles/global.css";
import { Search, X } from 'lucide-react';

// Daftar kategori
const categories = [
  'All',
  'Linux',
  'Windows',
  'MacOS',
  'Open-Source',
  'Networking',
];

const BlogSideBar = ({ onSearch, searchQuery, selectedCategory }: { onSearch: (query: string, category: string | null) => void; searchQuery: string; selectedCategory: string | null }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    const newCategory = category === 'All' ? null : category;
    onSearch(searchQuery, newCategory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(e.currentTarget.value, selectedCategory);
    }
  };

  const clearSearch = () => {
    onSearch('', selectedCategory);
  };

  return (
    <div
      className="p-6 rounded-xl shadow-lg text-zinc-200 sticky top-28 z-10 font-cinzel transition-colors duration-500"
      style={{
        backgroundColor: 'var(--footer-bg)',
        boxShadow: '0 0 10px var(--shadow-color)',
      }}
    >
      {/* Bagian Kategori */}
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-center mb-4 tracking-wider transition-colors duration-500"
            style={{ color: 'var(--title-color)' }}>
          Category
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-1 rounded-full text-xs font-semibold uppercase transition-all duration-200
                          ${selectedCategory === cat
                ? 'bg-yellow-700/80 text-white shadow-md'
                : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {/* Bagian Tombol Pencarian */}
      <h2
        className="text-xl font-extrabold text-center mb-4 tracking-wider transition-colors duration-500"
        style={{ color: 'var(--title-color)' }}
      >
      
      </h2>
      <div className="flex justify-center">
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="flex-shrink-0 p-3 rounded-md border font-cinzel transition-all duration-200 shadow-md font-extrabold uppercase tracking-wider text-lg transform hover:scale-110 active:opacity-75"
          aria-label="Cari"
          style={{
            backgroundImage: 'linear-gradient(to top right, var(--nav-link-from), var(--nav-link-via), var(--nav-link-to))',
            color: 'var(--nav-link-text)',
            borderColor: 'var(--nav-link-border)',
            borderWidth: '1px',
            boxShadow: '0 4px 6px -1px var(--nav-link-shadow), 0 2px 4px -2px var(--nav-link-shadow)',
          }}
        >
          <Search className="w-5 h-5" style={{ color: 'var(--nav-link-text)' }} />
        </button>
      </div>

      {/* Modal Pencarian Profesional */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center pt-10 px-4 sm:px-0 backdrop-blur-sm bg-black/60 transition-opacity duration-300 ease-in-out">
          {/* Tambahkan div ini untuk menangani klik di luar modal */}
          <div className="absolute inset-0" onClick={() => setIsSearchModalOpen(false)}></div>
          <div className="bg-zinc-900 rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 shadow-xl transform transition-all duration-300 scale-100 opacity-100 relative">
            <div className="flex justify-end mb-4">
              <button onClick={() => setIsSearchModalOpen(false)} className="text-zinc-400 hover:text-zinc-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Wrapper untuk input dan tombol */}
            <div className="flex flex-row space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value, selectedCategory)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search"
                  className="w-full pl-4 pr-12 py-2 rounded-md font-inter focus:outline-none transition-all duration-300 ease-in-out"
                  style={{
                    backgroundColor: 'var(--background-color)',
                    color: 'var(--text-color)',
                    borderColor: 'var(--border-bg)',
                    borderWidth: '1px',
                  }}
                />
                {/* Tombol clear teks, hanya terlihat jika ada teks */}
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => onSearch(searchQuery, selectedCategory)}
                className="flex-shrink-0 p-3 rounded-md border font-cinzel transition-all duration-200 shadow-md font-extrabold uppercase tracking-wider text-lg transform hover:scale-110 active:opacity-75"
                aria-label="Search"
                style={{
                  backgroundImage: 'linear-gradient(to top right, var(--nav-link-from), var(--nav-link-via), var(--nav-link-to))',
                  color: 'var(--nav-link-text)',
                  borderColor: 'var(--nav-link-border)',
                  borderWidth: '1px',
                  boxShadow: '0 4px 6px -1px var(--nav-link-shadow), 0 2px 4px -2px var(--nav-link-shadow)',
                }}
              >
                <Search className="w-5 h-5" style={{ color: 'var(--nav-link-text)' }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogSideBar;
