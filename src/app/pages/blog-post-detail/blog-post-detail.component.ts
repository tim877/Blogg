// src/app/pages/blog-post-detail/blog-post-detail.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs'; // To manage subscriptions

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.scss'],
})
export class BlogPostDetailComponent implements OnInit, OnDestroy {
  post:
    | {
        id: string;
        title: string;
        content: string;
        date: string;
        imageUrl?: string;
        likes: number;
        dislikes: number;
        comments: string[]; // Comments associated with the post
      }
    | undefined;
  newComment: string = ''; // Stores the new comment input
  private modalSubscription!: Subscription; // Subscription to track modal visibility changes
  modalVisible: boolean = false; // Tracks modal visibility state

  constructor(
    private readonly blogService: BlogService,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {}

  // Lifecycle hook: Executes when the component initializes
  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id'); // Get post ID from route
    if (postId) {
      this.post = this.blogService.getBlogPostById(postId); // Fetch post data by ID
    }

    // Subscribe to modal visibility updates
    this.modalSubscription = this.modalService.modalVisible$.subscribe(
      (visible: boolean) => {
        this.modalVisible = visible; // Update visibility state
      }
    );
  }

  // Lifecycle hook: Executes when the component is destroyed
  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  // Updates the number of likes or dislikes
  updateLikes(direction: string) {
    if (this.post) {
      if (direction === 'up') {
        this.post.likes++; // Increment likes
      } else if (direction === 'down') {
        this.post.likes--; // Decrement likes
      }
      this.blogService.updateBlogPost(this.post); // Save updated post data
    }
  }

  // Adds a new comment to the post
  addComment() {
    if (this.post && this.newComment.trim()) {
      this.post.comments.push(this.newComment.trim()); // Add comment to the array
      this.blogService.updateBlogPost(this.post); // Update post in the service
      this.newComment = ''; // Clear the input field
    }
  }

  // Toggles the visibility of the modal
  toggleModalVisibility() {
    this.modalService.toggleModal(!this.modalVisible); // Change modal state
  }
}
