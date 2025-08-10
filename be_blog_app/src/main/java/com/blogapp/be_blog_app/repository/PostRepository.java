package com.blogapp.be_blog_app.repository;

import com.blogapp.be_blog_app.model.Post;
import com.blogapp.be_blog_app.model.Subreddit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findBySubredditOrderByCreatedDateDesc(Subreddit subreddit);

    @Query("SELECT p FROM Post p ORDER BY p.createdDate DESC")
    List<Post> findAllOrderByCreatedDateDesc();

    @Query("SELECT p FROM Post p ORDER BY p.voteCount DESC, p.createdDate DESC")
    List<Post> findAllOrderByVoteCountDesc();
}