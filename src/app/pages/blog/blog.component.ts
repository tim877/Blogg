import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h1>Min Blogg</h1>
      <div class="blog-posts">
        <article class="blog-post" *ngFor="let post of blogPosts">
          <h2>{{ post.title }}</h2>

          <div *ngIf="post.imageUrl">
            <img [src]="post.imageUrl" alt="Blog Post Image" class="post-image" />
          </div>

          <p>{{ post.content }}</p>
          <small>Publicerad: {{ post.date }}</small>
        </article>
      </div>

      <div *ngIf="showModal" class="modal">
        <div class="modal-content">
          <h2>Skapa Blogginlägg</h2>
          <form (ngSubmit)="createPost()">
            <label for="title">Titel:</label>
            <input id="title" [(ngModel)]="newPostTitle" name="title" required />
            <label for="content">Innehåll:</label>
            <textarea id="content" [(ngModel)]="newPostContent" name="content" required></textarea>
            <label for="image">Bild:</label>
            <input id="image" type="file" (change)="onImageSelected($event)" />
            <button type="submit">Spara inlägg</button>
            <button type="button" (click)="closeCreatePostModal()">Stäng</button>
          </form>
        </div>
      </div>

      <!-- Only show this button if it's user view -->
      <button *ngIf="!isOwnerView" (click)="clearAllPosts()" class="clear-posts-btn">
        Rensa alla inlägg
      </button>
    </div>
  `,
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  blogPosts: { title: string; content: string; date: string; imageUrl?: string }[] = [];
  showModal = false;
  newPostTitle = '';
  newPostContent = '';
  selectedImage: File | null = null;
  modalSubscription!: Subscription;

  @Input() isOwnerView: boolean = false; // Accept the isOwnerView flag from parent component

  constructor(
    private readonly blogService: BlogService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.blogPosts = this.blogService.getBlogPosts();
    this.blogPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Latest post first
    });

    this.modalSubscription = this.modalService.modalVisible$.subscribe(
      (visible) => {
        this.showModal = visible;
      }
    );
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  openCreatePostModal() {
    this.modalService.toggleModal(true);
  }

  closeCreatePostModal() {
    this.modalService.toggleModal(false);
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedImage = input.files[0];
    }
  }

  createPost() {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const formattedTime = this.formatTime(currentDate);

    const imageUrl = this.selectedImage ? URL.createObjectURL(this.selectedImage) : '';

    const newPost = {
      title: this.newPostTitle,
      content: this.newPostContent,
      date: `${formattedDate} ${formattedTime}`,
      imageUrl,
    };

    this.blogService.addBlogPost(newPost.title, newPost.content, newPost.date, newPost.imageUrl);

    this.blogPosts = this.blogService.getBlogPosts();

    this.newPostTitle = '';
    this.newPostContent = '';
    this.selectedImage = null;

    this.closeCreatePostModal();
  }

  clearAllPosts() {
    this.blogService.clearAllPosts();
    this.blogPosts = []; // Clear the blog posts in the component as well
  }

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatTime(date: Date): string {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  }
}
