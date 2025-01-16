import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for two-way binding

@Component({
  standalone: true, // Ensure this is true
  imports: [CommonModule, FormsModule], // Import FormsModule here
  selector: 'app-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.scss'],
})
export class BlogPostDetailComponent implements OnInit {
  post:
    | {
        id: string;
        title: string;
        content: string;
        date: string;
        imageUrl?: string;
        likes: number;
        dislikes: number;
        comments: string[]; // Add comments to the post
      }
    | undefined;
  newComment: string = ''; // New comment text

  constructor(
    private readonly blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.post = this.blogService.getBlogPostById(postId);
    }
  }

  // Method to update likes
  updateLikes(direction: string) {
    if (this.post) {
      if (direction === 'up') {
        this.post.likes++;
      } else if (direction === 'down') {
        this.post.likes--;
      }
      this.blogService.updateBlogPost(this.post);
    }
  }

  // Method to add a comment
  addComment() {
    if (this.post && this.newComment.trim()) {
      this.post.comments.push(this.newComment.trim()); // Add comment to the post
      this.blogService.updateBlogPost(this.post); // Update the post in the service
      this.newComment = ''; // Clear the textarea after submitting
    }
  }
}
