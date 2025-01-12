// src/app/services/blog.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogPosts: { title: string, content: string, date: string }[] = [];

  getBlogPosts() {
    return this.blogPosts;
  }

  addBlogPost(title: string, content: string) {
    const newPost = {
      title: title,
      content: content,
      date: new Date().toLocaleString()
    };
    this.blogPosts.unshift(newPost); // Lägg till nya inlägg högst upp
  }
}
