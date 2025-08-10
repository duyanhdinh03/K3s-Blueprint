import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subreddit } from '../models/subreddit.model';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  private apiUrl = 'http://localhost:8080/api/subreddits';

  constructor(private http: HttpClient) {}

  getAllSubreddits(): Observable<Subreddit[]> {
    return this.http.get<Subreddit[]>(this.apiUrl);
  }

  getSubreddit(name: string): Observable<Subreddit> {
    return this.http.get<Subreddit>(`${this.apiUrl}/${name}`);
  }

  createSubreddit(subreddit: Subreddit): Observable<Subreddit> {
    return this.http.post<Subreddit>(this.apiUrl, subreddit);
  }
}