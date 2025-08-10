export interface Post {
  id: number;
  title: string;
  content? : string;
  url?: string;
  subredditName: string;
  authorName: string;
  voteCount: number;
  commentCount: number;
  createdDate: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  url?: string;
  subredditName: string;
}