export interface Post {
  title: string;
  description: string;
  slug: string;
  pubDate: Date;
  categories: string[];
  author?: {
    name: string;
    title?: string;
    image?: string;
  };
  image?: string;
}
