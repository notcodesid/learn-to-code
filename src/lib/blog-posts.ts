export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  readingTime: number;
  keywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "learn-rust-online-interactive",
    title: "Learn Rust Online with Interactive Coding Practice",
    description: "Interactive browser-based Rust learning platforms accelerate skill acquisition through hands-on coding without local setup friction.",
    publishedAt: "2026-06-01",
    category: "Learning",
    readingTime: 8,
    keywords: ["learn rust online interactive", "rust interactive tutorial", "browser rust compiler"]
  },
  {
    slug: "rust-online-compiler",
    title: "Best Rust Online Compilers: Browser vs Desktop vs Remote Options",
    description: "Compare Rust Playpen, Rust Explorer, and browser-based IDEs for interactive learning without local setup.",
    publishedAt: "2026-06-01", 
    category: "Tools",
    readingTime: 7,
    keywords: ["rust online compiler", "rust playground", "browser rust ide"]
  },
  {
    slug: "best-way-to-learn-rust-for-beginners",
    title: "Best Way to Learn Rust as a Beginner: The Complete Learning Path",
    description: "Structured approach to learning Rust from zero programming experience to building real projects.",
    publishedAt: "2026-06-01",
    category: "Guide", 
    readingTime: 9,
    keywords: ["best way to learn rust", "rust beginner guide", "learn rust from scratch"]
  },
  {
    slug: "rust-by-practice",
    title: "Rust by Practice: Hands-On Learning That Actually Sticks",
    description: "Why practice-based learning outperforms traditional courses for mastering Rust programming concepts.",
    publishedAt: "2026-06-01",
    category: "Learning",
    readingTime: 6,
    keywords: ["rust by practice", "hands on rust learning", "rust exercises"]
  },
  {
    slug: "interactive-rust-tutorials",
    title: "The Best Interactive Rust Tutorials: Learn by Doing, Not Just Reading",
    description: "Discover interactive Rust tutorials that provide immediate feedback and accelerate learning through practice.",
    publishedAt: "2026-06-01",
    category: "Tutorial",
    readingTime: 7,
    keywords: ["interactive rust tutorials", "rust learning platform", "rust coding practice"]
  }
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}