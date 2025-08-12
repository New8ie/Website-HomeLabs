// src/components/SideBarBlog.tsx
import React, { useState, useEffect } from "react";
import type { CollectionEntry } from "astro:content";

interface Props {
  allPosts: CollectionEntry<'blog'>[];
  onSearch: (results: CollectionEntry<'blog'>[] | null) => void;
}

// Definisikan URL gambar untuk setiap mode
const hordeTowerUrl = "/assets/images/Items/horde-tower.png";
const allyTowerUrl = "/assets/images/Items/ally-tower.png";

export default function BlogSideBar({ allPosts, onSearch }: Props) {
  const [query, setQuery] = useState("");
  const [towerImageSrc, setTowerImageSrc] = useState(hordeTowerUrl);

  // Efek untuk memuat tema dari localStorage dan mengatur gambar menara
  useEffect(() => {
    // Pastikan kode ini hanya berjalan di sisi klien (browser)
    if (typeof window !== "undefined") {
      const htmlElement = document.documentElement;

      const updateTowerImage = () => {
        const isDarkMode = htmlElement.classList.contains("dark");
        const newSrc = isDarkMode ? hordeTowerUrl : allyTowerUrl;
        setTowerImageSrc(newSrc);
      };

      // Panggil sekali saat mount untuk mengatur nilai awal yang benar di klien
      updateTowerImage();

      // Buat MutationObserver untuk memantau perubahan atribut 'class' pada <html>
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.attributeName === "class") {
            updateTowerImage();
          }
        });
      });

      observer.observe(htmlElement, { attributes: true });

      // Cleanup observer saat komponen di-unmount
      return () => observer.disconnect();
    }
  }, []);

  const handleSearch = () => {
    if (!allPosts || !Array.isArray(allPosts)) {
      onSearch(null);
      return;
    }

    if (query.length === 0) {
      onSearch(null);
      return;
    }

    const filteredPosts = allPosts.filter(post => {
      const title = post.data?.title?.toLowerCase() || '';
      const description = post.data?.description?.toLowerCase() || '';
      const searchQuery = query.toLowerCase();
      
      return title.includes(searchQuery) || description.includes(searchQuery);
    });

    onSearch(filteredPosts);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <aside className="relative rounded-xl p-6 shadow-2xl overflow-hidden sidebar-wow-theme">
      <div className="absolute inset-0 bg-zinc-900/70 backdrop-blur-md"></div>
      <div className="absolute inset-0 rounded-xl pointer-events-none"></div>

      <div className="relative z-10 font-cinzel">
        <h2 className="text-xl font-extrabold text-center text-yellow-500 mb-4 tracking-wider">Search</h2>
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className="w-full px-4 py-2 rounded-md bg-zinc-800 font-cinzel text-center text-zinc-200 border border-yellow-700/50 focus:outline-none focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(252,211,77,0.7)] transition-all duration-300 ease-in-out"
          />
          <button
            onClick={handleSearch}
            className="flex-shrink-0 px-3 py-1.5 rounded-md border font-cinzel border-yellow-700 bg-gradient-to-tr from-yellow-900 via-yellow-700 to-yellow-500 text-black hover:from-yellow-600 hover:to-yellow-400 transition-all duration-200 shadow-md hover:shadow-yellow-300/30 font-extrabold uppercase tracking-wider text-lg"
            style={{ textShadow: "0 0 2px gold" }}
          >
            Go
          </button>
        </div>
        
        {/* Gambar di bawah search box */}
        <div className="relative w-full h-auto mt-6 rounded-lg overflow-hidden hidden md:block">
          <img 
            src={towerImageSrc}  
            alt="Tower based on theme"
            className="w-full h-auto object-cover"
          />
        </div>

      </div>
    </aside>
  );
}
