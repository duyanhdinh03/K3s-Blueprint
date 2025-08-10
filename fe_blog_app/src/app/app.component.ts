import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fe_blog_app';
  constructor(private router: Router) {}

  showCreatePost(): boolean {
    // Show create post component on home page and subreddit pages
    const currentRoute = this.router.url;
    return currentRoute === '/' || currentRoute.startsWith('/r/');
  }
}
