import type { CollectionEntry } from "astro:content";

// ✅ Perbarui tipe 'Post' untuk membuat properti 'likes' menjadi opsional
export type Post = CollectionEntry<"blog"> & {
  likes?: number;
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
