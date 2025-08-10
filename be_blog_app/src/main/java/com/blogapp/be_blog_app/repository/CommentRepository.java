package com.blogapp.be_blog_app.repository;

import com.blogapp.be_blog_app.model.Comment;
import com.blogapp.be_blog_app.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostOrderByCreatedDateAsc(Post post);
}
