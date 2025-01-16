import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogPostsKey = 'blogPosts';

  constructor() {}

  // Funktion för att skapa ett unikt ID
  private generateUniqueId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  // Hämta alla blogginlägg
  getBlogPosts(): {
    id: string;
    title: string;
    content: string;
    date: string;
    imageUrl?: string;
    likes: number;
    dislikes: number;
  }[] {
    const blogPosts = localStorage.getItem(this.blogPostsKey);
    return blogPosts ? JSON.parse(blogPosts) : [];
  }

  // Lägg till ett nytt inlägg
  addBlogPost(title: string, content: string, date: string, imageUrl: string) {
    const id = this.generateUniqueId(); // Create unique ID
    const blogPosts = this.getBlogPosts(); // Get existing posts
    blogPosts.push({
      id,
      title,
      content,
      date,
      imageUrl,
      likes: 0,
      dislikes: 0,
    }); // Add new post
    localStorage.setItem(this.blogPostsKey, JSON.stringify(blogPosts)); // Save to localStorage
  }

  // Uppdatera ett existerande inlägg
  updateBlogPost(post: {
    id: string;
    title: string;
    content: string;
    date: string;
    imageUrl?: string;
    likes: number;
    dislikes: number;
  }) {
    const blogPosts = this.getBlogPosts();
    const postIndex = blogPosts.findIndex((p) => p.id === post.id);
    if (postIndex !== -1) {
      blogPosts[postIndex] = post;
      localStorage.setItem(this.blogPostsKey, JSON.stringify(blogPosts));
    }
  }

  // Hämta ett specifikt inlägg baserat på ID
  getBlogPostById(postId: string) {
    const blogPosts = this.getBlogPosts(); // Get all blog posts from localStorage
    const post = blogPosts.find((p) => p.id === postId); // Find the post by id

    console.log('Post Found in Service:', post); // Debugging post retrieval
    return post ? post : undefined; // If found, return the post, otherwise return undefined
  }

  // Rensa alla inlägg
  clearAllPosts(): void {
    localStorage.removeItem(this.blogPostsKey);
  }
}
