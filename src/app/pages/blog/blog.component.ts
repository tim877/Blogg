// src/app/pages/blog/blog.component.ts
import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';  // Add this import
import { FormsModule } from '@angular/forms';    // If you're using forms for the modal

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Add CommonModule here
  template: `
    <div class="page">
      <h1>Min Blogg</h1>
      <button (click)="openCreatePostModal()">Skapa nytt inlägg</button>
      <div class="blog-posts">
        <article class="blog-post" *ngFor="let post of blogPosts">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
          <small>Publicerad: {{ post.date }}</small>
        </article>
      </div>

      <div *ngIf="showModal" class="modal">
        <div class="modal-content">
          <h2>Skapa Blogginlägg</h2>
          <form (ngSubmit)="createPost()">
            <label for="title">Titel:</label>
            <input
              id="title"
              [(ngModel)]="newPostTitle"
              name="title"
              required
            />
            <label for="content">Innehåll:</label>
            <textarea
              id="content"
              [(ngModel)]="newPostContent"
              name="content"
              required
            ></textarea>
            <button type="submit">Spara inlägg</button>
            <button type="button" (click)="closeCreatePostModal()">Stäng</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  blogPosts: { title: string; content: string; date: string }[] = [];
  showModal = false;
  newPostTitle = '';
  newPostContent = '';

  constructor(private readonly blogService: BlogService) {
    // Initializing blogPosts from the service
    this.blogPosts = this.blogService.getBlogPosts();
  }

  openCreatePostModal() {
    this.showModal = true;
  }

  closeCreatePostModal() {
    this.showModal = false;
  }

  createPost() {
    // Create a new post and update the list of blog posts
    this.blogService.addBlogPost(this.newPostTitle, this.newPostContent);
    this.blogPosts = this.blogService.getBlogPosts(); // Fetch the latest posts

    this.newPostTitle = '';
    this.newPostContent = '';
    this.closeCreatePostModal();
  }
}
