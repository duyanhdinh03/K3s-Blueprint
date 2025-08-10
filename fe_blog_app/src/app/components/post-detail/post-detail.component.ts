import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../models/post.model';
import { Comment, CreateCommentRequest } from '../../models/comment.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];
  newComment = '';
  loading = true;
  currentUser: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.route.params.subscribe(params => {
      const postId = +params['id'];
      this.loadPost(postId);
      this.loadComments(postId);
    });
  }

  loadPost(id: number): void {
    this.postService.getPost(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading post:', error);
        this.loading = false;
      }
    });
  }

  loadComments(postId: number): void {
    this.commentService.getCommentsByPost(postId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (error) => {
        console.error('Error loading comments:', error);
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
    const daysSinceCreated = Math.floor(
      (Date.now() - new Date(post.createdDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    return post.voteCount >= 10 && daysSinceCreated <= 1;
  }

  shouldShowImagePlaceholder(post: Post): boolean {
    return post.title.toLowerCase().includes('tutorial') || 
          post.title.toLowerCase().includes('guide') ||
          post.title.toLowerCase().includes('build');
  }

  getCommentVotes(index: number): number {
    // Mock comment votes for demo
    const votes = [15, 8, 3, 12, 5, 1];
    return votes[index] || Math.floor(Math.random() * 20);
  }

  submitComment(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.newComment.trim() || !this.post) {
      return;
    }

    const commentRequest: CreateCommentRequest = {
      content: this.newComment,
      postId: this.post.id
    };

    this.commentService.createComment(commentRequest).subscribe({
      next: (comment) => {
        this.comments.push(comment);
        this.newComment = '';
        if (this.post) {
          this.post.commentCount++;
        }
      },
      error: (error) => {
        console.error('Error creating comment:', error);
      }
    });
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.id !== commentId);
        if (this.post) {
          this.post.commentCount--;
        }
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      }
    });
  }

  canDeleteComment(comment: Comment): boolean {
    return this.currentUser === comment.authorName;
  }

  upvotePost(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.post) {
      this.post.voteCount++;
    }
  }

  downvotePost(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.post) {
      this.post.voteCount--;
    }
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  }
}