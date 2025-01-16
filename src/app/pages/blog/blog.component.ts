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
    comments: string[]; // Add comments here
  }[] = [];
  showModal = false;
  newPostTitle = '';
  newPostContent = '';
  selectedImage: File | null = null;
  modalSubscription!: Subscription;

  @Input() isOwnerView: boolean = false;

  constructor(
    private readonly blogService: BlogService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.blogPosts = this.blogService.getBlogPosts(); // Fetch posts from the service

    // Sort posts in descending order: Latest posts first (top of the list)
    this.blogPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Sort in descending order
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

  generateUniqueId(): string {
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${randomPart}`;
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

    const imageUrl = this.selectedImage
      ? URL.createObjectURL(this.selectedImage)
      : '';

    // Use the blogService to add a new post, make sure to include 'comments'
    this.blogService.addBlogPost(
      this.newPostTitle,
      this.newPostContent,
      `${formattedDate} ${formattedTime}`,
      imageUrl
    );

    // Now update the component's blogPosts array
    this.blogPosts = this.blogService.getBlogPosts();

    // Sort posts to ensure latest ones come first
    this.blogPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    // Reset the new post fields
    this.newPostTitle = '';
    this.newPostContent = '';
    this.selectedImage = null;

    this.closeCreatePostModal();
  }

  clearAllPosts() {
    this.blogService.clearAllPosts();
    this.blogPosts = [];
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

  goToPost(post: {
    id: string;
    title: string;
    content: string;
    date: string;
    imageUrl?: string;
    likes: number;
    dislikes: number;
    comments: string[]; // Include comments
  }) {
    const postId = post.id; // Use the unique ID
    this.router.navigate(['/blog', postId]); // Navigate to the blog details route
  }

  updateLikes(index: number, direction: string) {
    const post = this.blogPosts[index];

    if (direction === 'up') {
      post.likes++;
    } else if (direction === 'down') {
      post.likes--;
    }

    this.blogService.updateBlogPost(post);
  }

  updateDislikes(index: number, direction: string) {
    const post = this.blogPosts[index];

    if (direction === 'up') {
      post.dislikes++;
    } else if (direction === 'down') {
      post.dislikes--;
    }

    this.blogService.updateBlogPost(post);
  }
}
