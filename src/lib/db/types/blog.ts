// src/lib/db/types/blog.ts

import type { CollectionEntry } from 'astro:content';
// ✅ PERBAIKI: Mengubah jalur impor dari '../db/db' menjadi '../db'


// ✅ Perbarui tipe 'Post' untuk menyertakan properti 'likes'
export type Post = CollectionEntry<'blog'> & {
    likes: number;
};

// `PageData` tidak memerlukan properti `first` dan `last` di `url`
// karena Astro Pagination tidak menyediakannya.
export interface PageData {
    data: Post[];
    size: number;
    total: number;
    currentPage: number;
    lastPage: number;
    url: {
        current: string;
        next: string | undefined;
        prev: string | undefined;
    };
    start: number;
    end: number;
}