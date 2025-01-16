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
  addBlogPost(
    title: string,
    content: string,
    date: string,
    imageUrl: string,
    likes: number = 0,
    dislikes: number = 0
  ) {
    const id = this.generateUniqueId(); // Skapa unikt ID
    const blogPosts = this.getBlogPosts();
    blogPosts.push({ id, title, content, date, imageUrl, likes, dislikes }); // Lägg till dislikes här
    localStorage.setItem(this.blogPostsKey, JSON.stringify(blogPosts));
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
  // Hämta ett specifikt inlägg baserat på ID
  getBlogPostById(postId: string) {
    const blogPosts = this.getBlogPosts(); // Use the method to get the blog posts
    const post = blogPosts.find((p) => p.id === postId); // Now search within the fetched posts

    if (post) {
      return {
        ...post,
        id: post.id || 'default-id', // Ensure 'id' is always available
        date: post.date || new Date().toISOString(), // Default to current date if 'date' is missing
      };
    }
    return undefined; // Or handle the case when no post is found
  }

  // Rensa alla inlägg
  clearAllPosts(): void {
    localStorage.removeItem(this.blogPostsKey);
  }
}
