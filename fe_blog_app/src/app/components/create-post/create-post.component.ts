import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { SubredditService } from '../../services/subreddit.service';
import { CreatePostRequest } from '../../models/post.model';
import { Subreddit } from '../../models/subreddit.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  post: CreatePostRequest = {
    title: '',
    content: '',
    url: '',
    subredditName: ''
    
  };
  fullEditorOpen = false;
  subreddits: Subreddit[] = [];
  loading = false;
  error = '';

  constructor(
    private postService: PostService,
    private subredditService: SubredditService,
    private router: Router
  ) {
    this.loadSubreddits();
  }

  loadSubreddits(): void {
    this.subredditService.getAllSubreddits().subscribe({
      next: (subreddits) => {
        this.subreddits = subreddits;
        if (subreddits.length > 0) {
          this.post.subredditName = subreddits[0].name;
        }
      },
      error: (error) => {
        console.error('Error loading subreddits:', error);
      }
    });
  }

  openFullEditor(): void {
    this.fullEditorOpen = true;
  }

  closeFullEditor(): void {
    this.fullEditorOpen = false;
    this.error = '';
  }
  onSubmit(): void {
    if (!this.post.title.trim()) {
      this.error = 'Title is required';
      return;
    }

    if (!this.post.subredditName) {
      this.error = 'Please select a subreddit';
      return;
    }

    this.loading = true;
    this.error = '';

    this.postService.createPost(this.post).subscribe({
      next: (createdPost) => {
        this.loading = false;
        this.router.navigate(['/posts', createdPost.id]);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Failed to create post';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}