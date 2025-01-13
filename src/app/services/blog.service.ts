import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogPostsKey = 'blogPosts';

  constructor() {}

  // Method to get all blog posts from localStorage
  getBlogPosts(): { title: string; content: string; date: string; imageUrl?: string }[] {
    const blogPosts = localStorage.getItem(this.blogPostsKey);
    return blogPosts ? JSON.parse(blogPosts) : [];
  }

  // Method to add a new blog post
  addBlogPost(title: string, content: string, date: string, imageUrl: string) {
    const blogPosts = this.getBlogPosts();
    blogPosts.push({ title, content, date, imageUrl });
    localStorage.setItem(this.blogPostsKey, JSON.stringify(blogPosts));
  }

  // Method to clear all blog posts from localStorage
  clearAllPosts(): void {
    localStorage.removeItem(this.blogPostsKey);
  }
}
