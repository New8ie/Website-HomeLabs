// src/components/SideBarBlog.tsx
import React, { useState } from "react";
import type { CollectionEntry } from "astro:content";

interface Props {
  allPosts: CollectionEntry<'blog'>[];
  onSearch: (results: CollectionEntry<'blog'>[] | null) => void;
}

export default function BlogSideBar({ allPosts, onSearch }: Props) {
  const [query, setQuery] = useState("");

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
    <aside className="relative rounded-xl p-6 shadow-2xl overflow-hidden sidebar-wow-theme border border-yellow-700/50">
      <div className="absolute inset-0 bg-zinc-900/70 backdrop-blur-md"></div>
      <div className="absolute inset-0 rounded-xl pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-xl font-extrabold font-cinzel text-yellow-500 mb-4 tracking-wider">Search</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Cari artikel..."
            className="w-full px-4 py-2 rounded-md bg-zinc-800 text-zinc-200 border border-yellow-700/50 focus:outline-none focus:border-yellow-500 transition-colors"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-yellow-700/70 text-yellow-100 rounded-md font-semibold transition-colors hover:bg-yellow-600/70"
          >
            Go
          </button>
        </div>
      </div>
    </aside>
  );
}