// src/app/services/blog.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogPostsKey = 'blogPosts';

  constructor() {}

  getBlogPosts(): { id: string; title: string; content: string; date: string; imageUrl?: string; likes: number }[] {
    const blogPosts = localStorage.getItem(this.blogPostsKey);
    return blogPosts ? JSON.parse(blogPosts) : [];
  }

  addBlogPost(id: string, title: string, content: string, date: string, imageUrl: string, likes: number) {
    const blogPosts = this.getBlogPosts();
    blogPosts.push({ id, title, content, date, imageUrl, likes });
    localStorage.setItem(this.blogPostsKey, JSON.stringify(blogPosts));
  }

  updateBlogPost(post: { id: string; title: string; content: string; date: string; imageUrl?: string; likes: number }) {
    const blogPosts = this.getBlogPosts();
    const postIndex = blogPosts.findIndex((p) => p.id === post.id); // Use 'id' for identification
    if (postIndex !== -1) {
      blogPosts[postIndex] = post;
      localStorage.setItem(this.blogPostsKey, JSON.stringify(blogPosts));
    }
  }

  clearAllPosts(): void {
    localStorage.removeItem(this.blogPostsKey);
  }
}
