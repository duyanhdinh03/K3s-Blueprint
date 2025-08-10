import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubredditService } from '../../services/subreddit.service';
import { AuthService } from '../../services/auth.service';
import { Subreddit } from '../../models/subreddit.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  subreddits: Subreddit[] = [];
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
      },
      error: (error) => {
        console.error('Error loading subreddits:', error);
      }
    });
  }

  navigateToSubreddit(subredditName: string): void {
    this.router.navigate(['/r', subredditName]);
  }

  getCommunityColor(index: number): string {
    const colors = ['#FF4500', '#0079D3', '#46D160', '#FFB000', '#9C27B0', '#F44336'];
    return colors[index % colors.length];
  }

  getCommunityMemberCount(index: number): string {
    const counts = ['950k', '2.1M', '1.5k', '415'];
    return counts[index] || '1k';
  }

  navigateToAllCommunities(): void {
    this.router.navigate(['/subreddits']);
  }

  navigateToCreatePost(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/create-post']);
  }

  navigateToCreateSubreddit(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/create-subreddit']);
  }
}