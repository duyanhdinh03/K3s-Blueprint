import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreateSubredditComponent } from './components/create-subreddit/create-subreddit.component';
import { SubredditListComponent } from './components/subreddit-list/subreddit-list.component';

// HTTP Interceptor for adding auth headers
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('authToken');
    const currentUser = localStorage.getItem('currentUser');
    
    if (authToken && currentUser) {
      const authReq = req.clone({
        headers: req.headers
          .set('Authorization', `Basic ${btoa(currentUser + ':password')}`)
          .set('Content-Type', 'application/json')
      });
      return next.handle(authReq);
    }
    
    return next.handle(req);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponent,
    PostDetailComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    CreatePostComponent,
    CreateSubredditComponent,
    SubredditListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }