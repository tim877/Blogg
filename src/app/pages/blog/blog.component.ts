// src/app/pages/blog/blog.component.ts
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  blogPosts: {
    id: string;
    title: string;
    content: string;
    date: string;
    imageUrl?: string;
    likes: number;
    dislikes: number;
    comments: string[]; // Comments for each post
  }[] = [];
  showModal = false; // Tracks modal visibility
  newPostTitle = ''; // Stores new post title input
  newPostContent = ''; // Stores new post content input
  selectedImage: File | null = null; // Holds the selected image file
  modalSubscription!: Subscription; // Subscription for modal visibility changes

  @Input() isOwnerView: boolean = false; // Determines if the owner view is enabled

  constructor(
    private readonly blogService: BlogService,
    private modalService: ModalService,
    private router: Router
  ) {}

  // Lifecycle hook: Initialize component and fetch posts
  ngOnInit() {
    this.blogPosts = this.blogService.getBlogPosts(); // Get all blog posts

    // Sort posts by date (latest first)
    this.blogPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    // Subscribe to modal visibility changes
    this.modalSubscription = this.modalService.modalVisible$.subscribe(
      (visible) => {
        this.showModal = visible;
      }
    );
  }

  // Lifecycle hook: Cleanup subscriptions on component destruction
  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  // Generates a unique ID for a new blog post
  generateUniqueId(): string {
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${randomPart}`;
  }

  // Opens the create post modal
  openCreatePostModal() {
    this.modalService.toggleModal(true);
  }

  // Closes the create post modal
  closeCreatePostModal() {
    this.modalService.toggleModal(false);
  }

  // Handles image selection for a new post
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedImage = input.files[0];
    }
  }

  // Creates a new blog post and adds it to the service
  createPost() {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const formattedTime = this.formatTime(currentDate);

    const imageUrl = this.selectedImage
      ? URL.createObjectURL(this.selectedImage)
      : '';

    // Add a new post to the service
    this.blogService.addBlogPost(
      this.newPostTitle,
      this.newPostContent,
      `${formattedDate} ${formattedTime}`,
      imageUrl
    );

    // Refresh and sort posts
    this.blogPosts = this.blogService.getBlogPosts();
    this.blogPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    // Reset input fields
    this.newPostTitle = '';
    this.newPostContent = '';
    this.selectedImage = null;

    this.closeCreatePostModal();
  }

  // Clears all blog posts
  clearAllPosts() {
    this.blogService.clearAllPosts();
    this.blogPosts = [];
  }

  // Formats a date as 'DD/MM/YYYY'
  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Formats time as 'HH:MM'
  formatTime(date: Date): string {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  }

  // Navigates to the details page of a specific blog post
  goToPost(post: {
    id: string;
    title: string;
    content: string;
    date: string;
    imageUrl?: string;
    likes: number;
    dislikes: number;
    comments: string[];
  }) {
    const postId = post.id; // Get post ID
    this.router.navigate(['/blog', postId]); // Navigate to the post's details page
  }

  // Updates likes for a specific post
  updateLikes(index: number, direction: string) {
    const post = this.blogPosts[index];
    if (direction === 'up') {
      post.likes++;
    } else if (direction === 'down') {
      post.likes--;
    }
    this.blogService.updateBlogPost(post); // Save updated post data
  }

  // Updates dislikes for a specific post
  updateDislikes(index: number, direction: string) {
    const post = this.blogPosts[index];
    if (direction === 'up') {
      post.dislikes++;
    } else if (direction === 'down') {
      post.dislikes--;
    }
    this.blogService.updateBlogPost(post); // Save updated post data
  }
}
