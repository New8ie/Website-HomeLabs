// src/components/CategorySidebar.tsx
import React, { useState } from "react";

interface Post {
  title: string;
  slug: string;
  description: string;
  pubDate: Date;
  category: string;
}

interface Props {
  posts: Post[];
}

const categories = ["All", "Networking", "MacOS", "Windows", "Linux", "Virtualization", "Other"];

export default function CategorySidebar({ posts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar */}
      <aside className="md:col-span-1 space-y-2">
        <h3 className="text-yellow-500 text-sm font-bold border-b border-yellow-700 pb-1">
          Categories
        </h3>
        <ul className="space-y-1 text-xs">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`block w-full text-left px-2 py-1 rounded 
                ${
                  selectedCategory === cat
                    ? "bg-yellow-700 text-white"
                    : "text-yellow-300 hover:bg-yellow-800"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Blog List */}
      <section className="md:col-span-3 space-y-6">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-zinc-900 border border-yellow-700 shadow-md shadow-yellow-300/10 rounded-lg p-4 transition-transform duration-300 hover:scale-[1.01] hover:shadow-yellow-300/20 hover:border-yellow-500"
          >
            <a href={`/blog/${post.slug}`} className="block group">
              <h2 className="text-lg font-bold text-yellow-500 group-hover:underline">
                {post.title}
              </h2>
              <p className="text-xs text-yellow-200 mb-1">
                {new Date(post.pubDate).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-xs text-gray-200">{post.description}</p>
            </a>
          </article>
        ))}
      </section>
    </div>
  );
}
