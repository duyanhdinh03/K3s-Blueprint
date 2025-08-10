import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, CreatePostRequest } from '../models/post.model';
import { environment } from 'src/environments/environment';

export interface PostPage {
  content: Post[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  getAllPosts(page: number = 0, size: number = 10, sort: string = 'createdDate'): Observable<Post[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    
    return this.http.get<Post[]>(this.apiUrl, { params });
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  getPostsBySubreddit(subredditName: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/by-subreddit/${encodeURIComponent(subredditName)}`);
  }

  createPost(post: CreatePostRequest): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(id: number, post: CreatePostRequest): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchPosts(query: string): Observable<Post[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Post[]>(`${this.apiUrl}/search`, { params });
  }
}