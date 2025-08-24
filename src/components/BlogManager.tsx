import React, { useState, useEffect } from "react";
import { type Post, type PageData } from "../lib/db/types/blog";
import BlogSideBar from "./BlogSideBar";
import BlogPage from "./BlogPage";

export default function BlogManager({
  allPosts,
  pageData,
}: {
  allPosts: Post[];
  pageData: PageData;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(allPosts);

  const filterPosts = (query: string, category: string | null) => {
    const lowerCaseQuery = query.toLowerCase();

    const categoryFiltered = category
      ? allPosts.filter((post) => post.data.category === category)
      : allPosts;

    const finalResults = categoryFiltered.filter((post) => {
      const title = post.data?.title?.toLowerCase() || "";
      const description = post.data?.description?.toLowerCase() || "";
      return (
        title.includes(lowerCaseQuery) || description.includes(lowerCaseQuery)
      );
    });

    setFilteredPosts(finalResults);
  };

  const handleSearch = (query: string, category: string | null) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    filterPosts(query, category);
  };

  useEffect(() => {
    setFilteredPosts(allPosts);
  }, [allPosts]);

  useEffect(() => {
    filterPosts(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-16 gap-y-16">
      {/* Kolom untuk Konten Blog Utama */}
      <div className="lg:col-span-3 order-2 lg:order-1 transition-opacity duration-1000 ease-out animate-fade-in-up">
        {/* ✅ Pastikan BlogPage menerima array `filteredPosts` */}
        <BlogPage posts={filteredPosts} page={pageData} />
      </div>

      {/* Kolom untuk Sidebar */}
      <div className="lg:col-span-1 order-1 lg:order-2">
        <BlogSideBar
          onSearch={handleSearch}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}
