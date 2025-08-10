package com.blogapp.be_blog_app.repository;

import com.blogapp.be_blog_app.model.Vote;
import com.blogapp.be_blog_app.model.Post;
import com.blogapp.be_blog_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findTopByPostAndUserOrderByIdDesc(Post post, User currentUser);
}
