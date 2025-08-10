package com.blogapp.be_blog_app.dto;

import java.time.LocalDateTime;

public class PostDto {
    private Long id;
    private String title;
    private String content;
    private String url;
    private String subredditName;
    private String authorName;
    private Integer voteCount;
    private Integer commentCount;
    private LocalDateTime createdDate;

    // Constructors
    public PostDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getSubredditName() { return subredditName; }
    public void setSubredditName(String subredditName) { this.subredditName = subredditName; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public Integer getVoteCount() { return voteCount; }
    public void setVoteCount(Integer voteCount) { this.voteCount = voteCount; }

    public Integer getCommentCount() { return commentCount; }
    public void setCommentCount(Integer commentCount) { this.commentCount = commentCount; }

    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }
}
