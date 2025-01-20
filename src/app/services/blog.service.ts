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
  private blogPostsKey = 'blogPosts'; // Key used to store blog posts in localStorage

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Generates a unique ID for each blog post
  private generateUniqueId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  // Retrieves all blog posts from localStorage
  getBlogPosts(): BlogPost[] {
    if (isPlatformBrowser(this.platformId)) {
      // Ensure the code runs only in the browser
      const blogPosts = localStorage.getItem(this.blogPostsKey);
      return blogPosts ? JSON.parse(blogPosts) : []; // Parse and return posts or an empty array
    }
    return []; // Return an empty array if not running in the browser
  }

  // Adds a new blog post and saves it to localStorage
  addBlogPost(
    title: string,
    content: string,
    date: string,
    imageUrl: string
  ): void {
    if (isPlatformBrowser(this.platformId)) {
      // Ensure the code runs only in the browser
      const id = this.generateUniqueId(); // Generate a unique ID for the new post
      const blogPosts = this.getBlogPosts(); // Get existing posts from localStorage
      blogPosts.push({
        id,
        title,
        content,
        date,
        imageUrl,
        likes: 0, // Initialize likes count
        dislikes: 0, // Initialize dislikes count
        comments: [], // Initialize comments array
      });
      localStorage.setItem(this.blogPostsKey, JSON.stringify(blogPosts)); // Save updated posts to localStorage
    }
  }

  // Updates an existing blog post in localStorage
  updateBlogPost(post: BlogPost): void {
    if (isPlatformBrowser(this.platformId)) {
      // Ensure the code runs only in the browser
      const blogPosts = this.getBlogPosts(); // Get existing posts from localStorage
      const postIndex = blogPosts.findIndex((p: BlogPost) => p.id === post.id); // Find the index of the post to update
      if (postIndex !== -1) {
        blogPosts[postIndex] = post; // Update the post
        localStorage.setItem(this.blogPostsKey, JSON.stringify(blogPosts)); // Save updated posts to localStorage
      }
    }
  }

  // Retrieves a specific blog post by its ID
  getBlogPostById(postId: string): BlogPost | undefined {
    if (isPlatformBrowser(this.platformId)) {
      // Ensure the code runs only in the browser
      const blogPosts = this.getBlogPosts(); // Get existing posts from localStorage
      return blogPosts.find((p: BlogPost) => p.id === postId); // Find and return the post with the specified ID
    }
    return undefined; // Return undefined if not running in the browser
  }

  // Clears all blog posts from localStorage
  clearAllPosts(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Ensure the code runs only in the browser
      localStorage.removeItem(this.blogPostsKey); // Remove all blog posts from localStorage
    }
  }
}
