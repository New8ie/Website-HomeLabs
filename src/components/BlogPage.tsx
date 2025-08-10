// src/components/BlogPage.tsx
import React, { useState, useEffect } from 'react';
import type { CollectionEntry } from 'astro:content';
import { type Page } from 'astro';

interface Props {
    allPosts: CollectionEntry<'blog'>[];
    page: Page<CollectionEntry<'blog'>>;
}

export default function BlogPage({ allPosts, page }: Props) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<CollectionEntry<'blog'>[]>(page.data);

    useEffect(() => {
        if (searchTerm) {
            const results = allPosts.filter(post =>
                post.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.data.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(results);
        } else {
            setFilteredPosts(page.data);
        }
    }, [searchTerm, allPosts, page.data]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
                <div className="w-full px-4 py-2 rounded-md bg-zinc-900/60 text-zinc-200 border border-yellow-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors">
                    <input
                        type="text"
                        placeholder="Cari artikel..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full bg-transparent outline-none"
                    />
                </div>
            </div>
            <div className="md:col-span-3">
                {filteredPosts.length === 0 ? (
                    <p className="text-zinc-400 text-center mt-10">Tidak ada artikel yang cocok dengan pencarian Anda.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <a
                                href={`/blog/${post.slug}`}
                                className="group block bg-zinc-900/60 border border-yellow-700/30 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl hover:border-yellow-400/80 hover:bg-zinc-800/80"
                                aria-label={`Baca artikel ${post.data.title}`}
                                key={post.slug}
                            >
                                {post.data.image ? (
                                    <div className="h-40 w-full overflow-hidden rounded-t-xl bg-zinc-800/50 flex items-center justify-center">
                                        <img
                                            src={post.data.image}
                                            alt={post.data.title}
                                            className="max-h-full max-w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-40 w-full bg-zinc-800/50 flex items-center justify-center rounded-t-xl text-zinc-500 text-sm">
                                        Tidak ada gambar
                                    </div>
                                )}
                                <div className="p-4 flex flex-col justify-between h-44">
                                    <div>
                                        <h2 className="text-lg font-cinzel font-bold text-yellow-400 mb-2 line-clamp-2">
                                            {post.data.title}
                                        </h2>
                                        <p className="text-sm text-zinc-300 mb-3 line-clamp-3">
                                            {post.data.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-zinc-400 mt-auto">
                                        <time dateTime={post.data.pubDate.toISOString()}>
                                            {post.data.pubDate.toLocaleDateString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </time>
                                        <span className="px-2 py-1 bg-yellow-700/30 text-yellow-300 rounded-full text-xs font-cinzel font-semibold">
                                            {post.data.category}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
                {/* Pagination */}
                <div className="flex justify-between items-center mt-12 text-yellow-400 font-cinzel">
                    {page.url.prev && (
                        <a href={page.url.prev} className="hover:text-yellow-300 transition-colors duration-200">
                            ← Previous Page
                        </a>
                    )}
                    <span className="flex-1 text-center">Page {page.currentPage} of {page.lastPage}</span>
                    {page.url.next && (
                        <a href={page.url.next} className="hover:text-yellow-300 transition-colors duration-200">
                            Next Page →
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}