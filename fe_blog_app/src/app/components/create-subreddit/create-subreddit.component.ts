import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubredditService } from '../../services/subreddit.service';
import { Subreddit } from '../../models/subreddit.model';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.scss']
})
export class CreateSubredditComponent {
  subreddit: Partial<Subreddit> = {
    name: '',
    description: ''
  };

  loading = false;
  error = '';

  constructor(
    private subredditService: SubredditService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.subreddit.name?.trim()) {
      this.error = 'Subreddit name is required';
      return;
    }

    if (!this.subreddit.description?.trim()) {
      this.error = 'Description is required';
      return;
    }

    this.loading = true;
    this.error = '';

    this.subredditService.createSubreddit(this.subreddit as Subreddit).subscribe({
      next: (created) => {
        this.loading = false;
        this.router.navigate(['/r', created.name]);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Failed to create subreddit';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}