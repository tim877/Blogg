// comment-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  comment: string = '';

  @Output() commentAdded = new EventEmitter<string>();

  addComment() {
    if (this.comment.trim()) {
      this.commentAdded.emit(this.comment);
      this.comment = '';  // Clear the input field after submission
    }
  }
}
