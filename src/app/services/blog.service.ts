import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Define BlogPost interface for type safety
interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  likes: number;
  dislikes: number;
  comments: string[];
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogPostsKey = 'blogPosts';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Helper function to generate unique ID
  private generateUniqueId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  // Get all blog posts from localStorage
  getBlogPosts(): BlogPost[] {
    if (isPlatformBrowser(this.platformId)) {  // Check if the code is running in the browser
      const blogPosts = localStorage.getItem(this.blogPostsKey);
      return blogPosts ? JSON.parse(blogPosts) : [];
    }
    return [];  // Return an empty array if not in the browser
  }

  // Add a new blog post
  addBlogPost(title: string, content: string, date: string, imageUrl: string): void {
    if (isPlatformBrowser(this.platformId)) {  // Check if the code is running in the browser
      const id = this.generateUniqueId();  // Create unique ID
      const blogPosts = this.getBlogPosts();  // Get existing posts
      blogPosts.push({
        id,
        title,
        content,
        date,
        imageUrl,
        likes: 0,
        dislikes: 0,
        comments: [], // Initialize comments array
      }); // Add new post
      localStorage.setItem(this.blogPostsKey, JSON.stringify(blogPosts)); // Save to localStorage
    }
  }

  // Update an existing blog post
  updateBlogPost(post: BlogPost): void {
    if (isPlatformBrowser(this.platformId)) {  // Check if the code is running in the browser
      const blogPosts = this.getBlogPosts();
      const postIndex = blogPosts.findIndex((p: BlogPost) => p.id === post.id); // Explicitly define type
      if (postIndex !== -1) {
        blogPosts[postIndex] = post;
        localStorage.setItem(this.blogPostsKey, JSON.stringify(blogPosts));
      }
    }
  }

  // Get a specific blog post by ID
  getBlogPostById(postId: string): BlogPost | undefined {
    if (isPlatformBrowser(this.platformId)) {  // Check if the code is running in the browser
      const blogPosts = this.getBlogPosts();
      return blogPosts.find((p: BlogPost) => p.id === postId); // Explicitly define type
    }
    return undefined;  // Return undefined if not in the browser
  }

  // Clear all blog posts from localStorage
  clearAllPosts(): void {
    if (isPlatformBrowser(this.platformId)) {  // Check if the code is running in the browser
      localStorage.removeItem(this.blogPostsKey);
    }
  }
}
