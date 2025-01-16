import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  standalone: true, // Ensure this is true
  imports: [CommonModule], // CommonModule should be used here
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
      }
    | undefined;

  constructor(
    private readonly blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id'); // Get id from URL
    if (postId) {
      this.post = this.blogService.getBlogPostById(postId); // Get post from service
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
      // Update the post in your blog service or localStorage
      this.blogService.updateBlogPost(this.post);
    }
  }
}
