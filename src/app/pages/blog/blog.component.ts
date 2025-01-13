import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Angular Router for navigation

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  blogPosts: {
    title: string;
    content: string;
    date: string;
    imageUrl?: string;
    likes: number; // Ensure likes is included
  }[] = [];
  showModal = false;
  newPostTitle = '';
  newPostContent = '';
  selectedImage: File | null = null;
  modalSubscription!: Subscription;

  @Input() isOwnerView: boolean = false; // Accept the isOwnerView flag from parent component

  constructor(
    private readonly blogService: BlogService,
    private modalService: ModalService,
    private router: Router // Inject Angular Router
  ) {}

  ngOnInit() {
    this.blogPosts = this.blogService.getBlogPosts().map(post => ({
      ...post,
      likes: post.likes ?? 0, // Ensure the likes property exists with a default value
    }));

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

    const imageUrl = this.selectedImage
      ? URL.createObjectURL(this.selectedImage)
      : '';

    const newPost = {
      title: this.newPostTitle,
      content: this.newPostContent,
      date: `${formattedDate} ${formattedTime}`,
      imageUrl,
      likes: 0, // Ensure likes is included
    };

    // Pass the newPost object with the 'likes' property
    this.blogService.addBlogPost(
      newPost.title,
      newPost.content,
      newPost.date,
      newPost.imageUrl,
      newPost.likes // Make sure likes is passed correctly
    );

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

  goToPost(post: {
    title: string;
    content: string;
    date: string;
    imageUrl?: string;
    likes: number; // Ensure likes is included
  }) {
    const postId = this.blogPosts.indexOf(post); // Find the post index
    this.router.navigate(['/blog', postId]); // Navigate to the blog details route
  }

  // Method to update likes for each post
  updateLikes(index: number, direction: string) {
    const post = this.blogPosts[index];

    // Update the likes count based on the direction
    if (direction === 'up') {
      post.likes++;
    } else if (direction === 'down') {
      post.likes--;
    }

    // Update the blog post in localStorage
    this.blogService.updateBlogPost(post);
  }
}
