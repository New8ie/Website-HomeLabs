// src/types/blog.ts
// Mendefinisikan tipe data untuk postingan blog yang sesuai dengan skema koleksi Astro.
export interface PostData {
    title: string;
    description: string;
    pubDate: Date;
    image: string;
    category: string;
}

export interface Post {
    slug: string;
    data: PostData;
}

// Mendefinisikan tipe data untuk pagination.
// Saya menambahkan properti `first` dan `last` pada `url` untuk mencocokkan tipe data Astro.
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
        first: string | undefined; // Ditambahkan
        last: string | undefined;  // Ditambahkan
    };
    start: number;
    end: number;
}
