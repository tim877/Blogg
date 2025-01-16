import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
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
    const postId = this.route.snapshot.paramMap.get('id'); // Hämta id från URL
    if (postId) {
      this.post = this.blogService.getBlogPostById(postId); // Hämta blogginlägg från service
    }
  }

  updateLikes(direction: string) {
    if (this.post) {
      if (direction === 'up') {
        this.post.likes++;
      } else if (direction === 'down') {
        this.post.likes--;
      }
      this.blogService.updateBlogPost(this.post); // Uppdatera posten i service
    }
  }

  updateDislikes(direction: string) {
    if (this.post) {
      if (direction === 'up') {
        this.post.dislikes++;
      } else if (direction === 'down') {
        this.post.dislikes--;
      }
      this.blogService.updateBlogPost(this.post); // Uppdatera posten i service
    }
  }
}
