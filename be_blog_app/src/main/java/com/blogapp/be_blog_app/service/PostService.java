package com.blogapp.be_blog_app.service;

import com.blogapp.be_blog_app.dto.PostDto;
import com.blogapp.be_blog_app.model.Post;
import com.blogapp.be_blog_app.model.Subreddit;
import com.blogapp.be_blog_app.model.User;
import com.blogapp.be_blog_app.repository.PostRepository;
import com.blogapp.be_blog_app.repository.SubredditRepository;
import com.blogapp.be_blog_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private SubredditRepository subredditRepository;

    @Autowired
    private UserRepository userRepository;

    public List<PostDto> getAllPosts() {
        return postRepository.findAllOrderByCreatedDateDesc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<PostDto> getPostsBySubreddit(String subredditName) {
        Subreddit subreddit = subredditRepository.findByName(subredditName)
                .orElseThrow(() -> new RuntimeException("Subreddit not found"));
        return postRepository.findBySubredditOrderByCreatedDateDesc(subreddit)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public PostDto getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return mapToDto(post);
    }

    public PostDto createPost(PostDto postDto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Subreddit subreddit = subredditRepository.findByName(postDto.getSubredditName())
                .orElseThrow(() -> new RuntimeException("Subreddit not found"));

        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setUrl(postDto.getUrl());
        post.setAuthor(user);
        post.setSubreddit(subreddit);

        Post savedPost = postRepository.save(post);
        return mapToDto(savedPost);
    }

    public void deletePost(Long id, String username) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getAuthor().getUsername().equals(username)) {
            throw new RuntimeException("You can only delete your own posts");
        }

        postRepository.delete(post);
    }

    private PostDto mapToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setContent(post.getContent());
        postDto.setUrl(post.getUrl());
        postDto.setSubredditName(post.getSubreddit().getName());
        postDto.setAuthorName(post.getAuthor().getUsername());
        postDto.setVoteCount(post.getVoteCount());
        postDto.setCommentCount(post.getComments() != null ? post.getComments().size() : 0);
        postDto.setCreatedDate(post.getCreatedDate());
        return postDto;
    }
}