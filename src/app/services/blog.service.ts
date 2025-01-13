import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogPostsKey = 'blogPosts';

  constructor() {}

  // Method to get all blog posts from localStorage
  getBlogPosts(): { title: string; content: string; date: string; imageUrl?: string; likes: number }[] {
    const blogPosts = localStorage.getItem(this.blogPostsKey);
    return blogPosts ? JSON.parse(blogPosts) : [];
  }

  // Method to add a new blog post
  addBlogPost(title: string, content: string, date: string, imageUrl: string, likes: number) {
    const blogPosts = this.getBlogPosts();
    blogPosts.push({ title, content, date, imageUrl, likes });
    localStorage.setItem(this.blogPostsKey, JSON.stringify(blogPosts));
  }

  // Method to update an existing blog post
  updateBlogPost(post: { title: string; content: string; date: string; imageUrl?: string; likes: number }) {
    const blogPosts = this.getBlogPosts();
    const postIndex = blogPosts.findIndex((p) => p.title === post.title && p.date === post.date);
    if (postIndex !== -1) {
      blogPosts[postIndex] = post; // Update the post with the new likes
      localStorage.setItem(this.blogPostsKey, JSON.stringify(blogPosts));
    }
  }

  // Method to clear all blog posts from localStorage
  clearAllPosts(): void {
    localStorage.removeItem(this.blogPostsKey);
  }
}
