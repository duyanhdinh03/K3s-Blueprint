export interface Comment {
  id: number;
  content: string;
  authorName: string;
  postId: number;
  createdDate: string;
}

export interface CreateCommentRequest {
  content: string;
  postId: number;
}