import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubredditService } from '../../services/subreddit.service';
import { AuthService } from '../../services/auth.service';
import { Subreddit } from '../../models/subreddit.model';

@Component({
  selector: 'app-subreddit-list',
  templateUrl: './subreddit-list.component.html',
  styleUrls: ['./subreddit-list.component.scss']
})
export class SubredditListComponent implements OnInit {
  subreddits: Subreddit[] = [];
  loading = true;
  currentUser: string | null = null;

  constructor(
    private subredditService: SubredditService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.loadSubreddits();
  }

  loadSubreddits(): void {
    this.subredditService.getAllSubreddits().subscribe({
      next: (subreddits) => {
        this.subreddits = subreddits;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading subreddits:', error);
        this.loading = false;
      }
    });
  }

  navigateToSubreddit(subredditName: string): void {
    this.router.navigate(['/r', subredditName]);
  }

  navigateToCreateSubreddit(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/create-subreddit']);
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return '1 day ago';
    } else {
      return `${diffInDays} days ago`;
    }
  }
}