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
    <div
      className="p-6 rounded-xl shadow-lg text-zinc-200 sticky top-28 z-10 font-cinzel transition-colors duration-500"
      // Menggunakan variabel CSS untuk latar belakang, border, dan bayangan
      style={{
        backgroundColor: 'var(--footer-bg)',
        borderColor: 'var(--border-bg)',
        borderWidth: '2px',
        boxShadow: '0 0 10px var(--shadow-color)',
      }}
    >
      <h2
        className="text-xl font-extrabold text-center mb-4 tracking-wider transition-colors duration-500"
        // Menggunakan variabel CSS untuk warna teks judul
        style={{ color: 'var(--title-color)' }}
      >
        Search
      </h2>
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-md font-cinzel focus:outline-none transition-all duration-300 ease-in-out"
          // Menggunakan variabel CSS untuk warna input dan border
          style={{
            backgroundColor: 'var(--background-color)',
            color: 'var(--text-color)',
            borderColor: 'var(--border-bg)',
            borderWidth: '1px',
          }}
        />
        <button
          onClick={() => onSearch(searchQuery)}
          className="flex-shrink-0 p-3 rounded-md border font-cinzel transition-all duration-200 shadow-md font-extrabold uppercase tracking-wider text-lg"
          aria-label="Cari"
          // Menggunakan variabel CSS untuk gaya tombol
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
        <p
          className="text-center mt-10 font-cinzel animate-fade-in-up transition-colors duration-500"
          style={{ color: 'var(--text-color)' }}
        >
          Tidak ada artikel yang cocok dengan pencarian Anda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {postsToDisplay.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fade-in-up"
              aria-label={`Baca postingan tentang ${post.data.title}`}
              // Menggunakan variabel CSS untuk gaya kartu postingan
              style={{
                backgroundColor: 'var(--footer-bg)',
                borderColor: 'var(--border-bg)',
                borderWidth: '2px',
                boxShadow: '0 0 10px var(--shadow-color)',
              }}
            >
              <div className="h-48 overflow-hidden rounded-t-xl">
                {post.data.image && (
                  <img
                    src={post.data.image}
                    alt={post.data.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-40"
                  />
                )}
              </div>
              <div className="p-4">
                <h3
                  className="text-xl font-extrabold mb-2 font-cinzel transition-colors duration-500"
                  style={{ color: 'var(--title-color)' }}
                >
                  {post.data.title}
                </h3>
                <p
                  className="text-sm font-inter transition-colors duration-500"
                  style={{ color: 'var(--text-color)' }}
                >
                  {post.data.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
      <div
        className="flex justify-center items-center gap-4 mt-12 font-cinzel transition-colors duration-500"
        style={{ color: 'var(--text-color)' }}
      >
        {page.url.prev && (
          <a
            href={page.url.prev}
            className="px-4 py-2 rounded-md border-2 transition-all duration-200 shadow-md font-extrabold uppercase tracking-wider"
            style={{
              backgroundImage: 'linear-gradient(to top right, var(--nav-link-from), var(--nav-link-via), var(--nav-link-to))',
              color: 'var(--nav-link-text)',
              borderColor: 'var(--nav-link-border)',
              boxShadow: '0 4px 6px -1px var(--nav-link-shadow), 0 2px 4px -2px var(--nav-link-shadow)',
            }}
          >
            ← Halaman Sebelumnya
          </a>
        )}
        <span className="flex-1 text-center font-bold text-lg">
          Halaman {page.currentPage} dari {page.lastPage}
        </span>
        {page.url.next && (
          <a
            href={page.url.next}
            className="px-4 py-2 rounded-md border-2 transition-all duration-200 shadow-md font-extrabold uppercase tracking-wider"
            style={{
              backgroundImage: 'linear-gradient(to top right, var(--nav-link-from), var(--nav-link-via), var(--nav-link-to))',
              color: 'var(--nav-link-text)',
              borderColor: 'var(--nav-link-border)',
              boxShadow: '0 4px 6px -1px var(--nav-link-shadow), 0 2px 4px -2px var(--nav-link-shadow)',
            }}
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
