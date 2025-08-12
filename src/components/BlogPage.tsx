// src/components/BlogPage.tsx
import React, { useState, useEffect } from 'react';
import type { CollectionEntry } from 'astro:content';
import { type Page } from 'astro';
import BlogSideBar from './SideBarBlog'; // Mengimpor komponen sidebar yang baru

interface Props {
    allPosts: CollectionEntry<'blog'>[];
    page: Page<CollectionEntry<'blog'>>;
}

export default function BlogPage({ allPosts, page }: Props) {
    // Menggunakan state untuk menyimpan hasil pencarian dari sidebar
    const [filteredPosts, setFilteredPosts] = useState<CollectionEntry<'blog'>[]>(page.data);

    // Fungsi ini akan dipanggil oleh BlogSideBar saat ada hasil pencarian baru
    const handleSearchResults = (results: CollectionEntry<'blog'>[] | null) => {
        if (results) {
            setFilteredPosts(results);
        } else {
            // Jika pencarian kosong, kembalikan ke data default halaman
            setFilteredPosts(page.data);
        }
    };

    // Efek untuk merespons perubahan halaman (pagination)
    // atau saat pertama kali komponen dimuat tanpa pencarian
    useEffect(() => {
        setFilteredPosts(page.data);
    }, [page.data]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
                {/* Menempatkan komponen BlogSideBar di kolom pertama */}
                {/* Melewatkan semua postingan dan fungsi callback untuk hasil pencarian */}
                <BlogSideBar allPosts={allPosts} onSearch={handleSearchResults} />
            </div>
            <div className="md:col-span-3">
                {filteredPosts.length === 0 ? (
                    <p className="text-zinc-400 text-center mt-10 font-cinzel">Tidak ada artikel yang cocok dengan pencarian Anda.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <a
                                href={`/blog/${post.slug}`}
                                className="group block border-2 border-yellow-700/50 bg-zinc-900/60 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(252,211,77,0.5)] hover:border-yellow-500/80 hover:bg-zinc-800/80"
                                aria-label={`Baca artikel ${post.data.title}`}
                                key={post.slug}
                            >
                                {post.data.image ? (
                                    <div className="h-40 w-full overflow-hidden rounded-t-lg bg-zinc-800/50 flex items-center justify-center">
                                        <img
                                            src={post.data.image}
                                            alt={post.data.title}
                                            className="max-h-full max-w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-40 w-full bg-zinc-800/50 flex items-center justify-center rounded-t-lg text-zinc-500 text-sm font-cinzel">
                                        Tidak Ada Gambar
                                    </div>
                                )}
                                <div className="p-4 flex flex-col justify-between h-44">
                                    <div>
                                        <h2 className="text-sm font-cinzel font-bold text-yellow-400 mb-2 line-clamp-2">
                                            {post.data.title}
                                        </h2>
                                        <p className="text-xs font-cinzel text-zinc-300 mb-3 line-clamp-3">
                                            {post.data.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center font-cinzel text-xs text-zinc-400 mt-auto">
                                        <time dateTime={post.data.pubDate.toISOString()}>
                                            {post.data.pubDate.toLocaleDateString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </time>
                                        <span className="px-2 py-1 bg-yellow-700/30 text-yellow-300 rounded-sm text-xs font-cinzel font-semibold">
                                            {post.data.category}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
                {/* Pagination */}
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
            </div>
        </div>
    );
}
