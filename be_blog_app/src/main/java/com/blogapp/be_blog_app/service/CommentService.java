package com.blogapp.be_blog_app.service;

import com.blogapp.be_blog_app.dto.CommentDto;
import com.blogapp.be_blog_app.model.Comment;
import com.blogapp.be_blog_app.model.Post;
import com.blogapp.be_blog_app.model.User;
import com.blogapp.be_blog_app.repository.CommentRepository;
import com.blogapp.be_blog_app.repository.PostRepository;
import com.blogapp.be_blog_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CommentDto> getCommentsByPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        return commentRepository.findByPostOrderByCreatedDateAsc(post)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public CommentDto createComment(CommentDto commentDto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = new Comment();
        comment.setContent(commentDto.getContent());
        comment.setPost(post);
        comment.setAuthor(user);

        Comment savedComment = commentRepository.save(comment);
        return mapToDto(savedComment);
    }

    public void deleteComment(Long id, String username) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getAuthor().getUsername().equals(username)) {
            throw new RuntimeException("You can only delete your own comments");
        }

        commentRepository.delete(comment);
    }

    private CommentDto mapToDto(Comment comment) {
        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setContent(comment.getContent());
        commentDto.setAuthorName(comment.getAuthor().getUsername());
        commentDto.setPostId(comment.getPost().getId());
        commentDto.setCreatedDate(comment.getCreatedDate());
        return commentDto;
    }
}
