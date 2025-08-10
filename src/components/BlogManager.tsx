// src/components/BlogManager.tsx
import React, { useState } from 'react';
import type { CollectionEntry } from 'astro:content';
import BlogSideBar from "./SideBarBlog";

interface Props {
  posts: CollectionEntry<'blog'>[];
  page: any;
  onUpdate: (data: CollectionEntry<'blog'>[] | null) => void;
}

export default function BlogManager({ posts, page, onUpdate }: Props) {
  const [searchResults, setSearchResults] = useState<CollectionEntry<'blog'>[] | null>(null);

  const handleSearch = (results: CollectionEntry<'blog'>[] | null) => {
    onUpdate(results);
  };

  return (
    <>
      <BlogSideBar allPosts={posts} onSearch={handleSearch} />
    </>
  );
}