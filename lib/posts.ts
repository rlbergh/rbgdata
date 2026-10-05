import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author?: string;
  tags?: string[];
}

export async function getPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || content.substring(0, 150),
        content,
        author: data.author || 'Rebecca Bergh',
        tags: data.tags || [],
      };
    });

  // Sort by date, newest first
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getLatestPosts(count: number): Promise<Post[]> {
  const posts = await getPosts();
  return posts.slice(0, count);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map((post) => post.slug);
}
