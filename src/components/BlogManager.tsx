import React, { useState, useEffect } from 'react';
import { type Post, type PageData } from '../../types/blog';
import { Search } from 'lucide-react';

// ================================================================
// src/components/SideBarBlog.tsx
// (Komponen ini sekarang adalah bagian dari file BlogManager)
const BlogSideBar = ({ onSearch, searchQuery }: { onSearch: (query: string) => void; searchQuery: string }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="p-6 rounded-xl border-2 border-yellow-700/50 bg-zinc-900/60 shadow-lg text-zinc-200 sticky top-28 z-10 font-cinzel">
      <h2 className="text-xl font-extrabold text-center text-yellow-500 mb-4 tracking-wider">Cari Artikel</h2>
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Cari..."
          className="w-full px-4 py-2 rounded-md bg-zinc-800 font-cinzel text-zinc-200 border border-yellow-700/50 focus:outline-none focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(252,211,77,0.7)] transition-all duration-300 ease-in-out"
        />
        <button
          onClick={() => onSearch(searchQuery)}
          className="flex-shrink-0 p-3 rounded-md border font-cinzel border-yellow-700 bg-gradient-to-tr from-yellow-900 via-yellow-700 to-yellow-500 text-black hover:from-yellow-600 hover:to-yellow-400 transition-all duration-200 shadow-md hover:shadow-yellow-300/30 font-extrabold uppercase tracking-wider text-lg"
          aria-label="Cari"
        >
          <Search className="w-5 h-5 text-zinc-900" />
        </button>
      </div>
    </div>
  );
};

// ================================================================
// src/components/BlogPage.tsx
// (Komponen ini sekarang adalah bagian dari file BlogManager)
const BlogPage = ({ posts, page }: { posts: Post[]; page: PageData }) => {
    const postsToDisplay = posts || [];

    return (
        <main>
            {postsToDisplay.length === 0 ? (
                <p className="text-zinc-400 text-center mt-10 font-cinzel animate-fade-in-up">Tidak ada artikel yang cocok dengan pencarian Anda.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postsToDisplay.map((post) => (
                        <a
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block border-2 border-yellow-700/50 bg-zinc-900/60 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(252,211,77,0.5)] hover:border-yellow-500/80 hover:bg-zinc-800/80 animate-fade-in-up"
                            aria-label={`Baca postingan tentang ${post.data.title}`}
                        >
                            <div className="h-48 overflow-hidden rounded-t-xl">
                                {post.data.image && (
                                    <img
                                        src={post.data.image}
                                        alt={post.data.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-extrabold text-yellow-400 mb-2 font-cinzel">
                                    {post.data.title}
                                </h3>
                                <p className="text-zinc-300 text-sm font-inter">
                                    {post.data.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            )}
            <div className="flex justify-center items-center gap-4 mt-12 text-yellow-400 font-cinzel">
                {page.url.prev && (
                    <a
                        href={page.url.prev}
                        className="px-4 py-2 rounded-md border-2 border-yellow-700/50 bg-gradient-to-tr from-yellow-900/50 to-yellow-700/50 text-yellow-400 hover:from-yellow-600 hover:to-yellow-400 hover:text-black transition-all duration-200 shadow-md hover:shadow-yellow-300/30 font-extrabold uppercase tracking-wider"
                    >
                        ← Halaman Sebelumnya
                    </a>
                )}
                <span className="flex-1 text-center font-bold text-lg">Halaman {page.currentPage} dari {page.lastPage}</span>
                {page.url.next && (
                    <a
                        href={page.url.next}
                        className="px-4 py-2 rounded-md border-2 border-yellow-700/50 bg-gradient-to-tr from-yellow-900/50 to-yellow-700/50 text-yellow-400 hover:from-yellow-600 hover:to-yellow-400 hover:text-black transition-all duration-200 shadow-md hover:shadow-yellow-300/30 font-extrabold uppercase tracking-wider"
                    >
                        Halaman Berikutnya →
                    </a>
                )}
            </div>
        </main>
    );
};

// ================================================================
// src/components/BlogManager.tsx
// (Ini adalah komponen utama yang diekspor secara default)
export default function BlogManager({ allPosts, pageData }: { allPosts: Post[]; pageData: PageData }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(pageData.data);

    const filterPosts = (query: string) => {
        if (!query) {
            setFilteredPosts(pageData.data);
            return;
        }
        const lowerCaseQuery = query.toLowerCase();
        const results = allPosts.filter(post => {
            const title = post.data?.title?.toLowerCase() || '';
            const description = post.data?.description?.toLowerCase() || '';
            return title.includes(lowerCaseQuery) || description.includes(lowerCaseQuery);
        });
        setFilteredPosts(results);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        filterPosts(query);
    };

    useEffect(() => {
        setSearchQuery('');
        setFilteredPosts(pageData.data);
    }, [pageData]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in">
            <div className="md:col-span-1 animate-slide-in-left">
                <BlogSideBar onSearch={handleSearch} searchQuery={searchQuery} />
            </div>
            <div className="md:col-span-3 animate-slide-in-right">
                <BlogPage posts={filteredPosts} page={pageData} />
            </div>
        </div>
    );
}
