import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  subredditName: string | null = null;
  loading = true;
  currentUser: string | null = null;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.route.params.subscribe(params => {
      this.subredditName = params['name'] || null;
      this.loadPosts();
    });
  }

  loadPosts(): void {
    this.loading = true;
    
    const postObservable = this.subredditName 
      ? this.postService.getPostsBySubreddit(this.subredditName)
      : this.postService.getAllPosts();

    postObservable.subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.loading = false;
      }
    });
  }

  formatVoteCount(count: number): string {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  }
  isHotPost(post: Post): boolean {
    // Consider post "hot" if it has high votes and recent
    const daysSinceCreated = Math.floor(
      (Date.now() - new Date(post.createdDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    return post.voteCount >= 10 && daysSinceCreated <= 1;
  }

  shouldShowImagePlaceholder(post: Post): boolean {
    // Show placeholder for tutorial posts or posts with certain keywords
    return post.title.toLowerCase().includes('tutorial') || 
          post.title.toLowerCase().includes('guide') ||
          post.title.toLowerCase().includes('build');
  }
  upvote(post: Post): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    // Implement upvote logic
    post.voteCount++;
  }

  downvote(post: Post): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    // Implement downvote logic
    post.voteCount--;
  }

  navigateToPost(postId: number): void {
    this.router.navigate(['/posts', postId]);
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