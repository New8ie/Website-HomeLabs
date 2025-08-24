// src/types/blog.ts

// ✅ Gunakan tipe yang disediakan oleh Astro
import type { CollectionEntry } from 'astro:content';

// `Post` sekarang adalah alias untuk tipe yang disediakan oleh Astro.
// Ini secara otomatis akan mencakup properti seperti `slug`, `data`, `body`, dan `draft`.
export type Post = CollectionEntry<'blog'>;

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