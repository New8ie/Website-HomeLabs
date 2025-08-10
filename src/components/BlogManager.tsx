// src/components/BlogManager.tsx
import React from 'react';
import type { CollectionEntry } from 'astro:content';
import BlogSideBar from "./SideBarBlog";

interface Props {
  posts: CollectionEntry<'blog'>[];
  onUpdate: (data: CollectionEntry<'blog'>[] | null) => void;
}

export default function BlogManager({ posts, onUpdate }: Props) {
  // Hanya render sidebar dan meneruskan fungsi pembaruan ke sana
  return (
    <>
      <BlogSideBar allPosts={posts} onSearch={onUpdate} />
    </>
  );
}