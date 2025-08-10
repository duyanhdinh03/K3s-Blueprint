package com.blogapp.be_blog_app.service;

import com.blogapp.be_blog_app.model.Post;
import com.blogapp.be_blog_app.model.User;
import com.blogapp.be_blog_app.model.Vote;
import com.blogapp.be_blog_app.repository.PostRepository;
import com.blogapp.be_blog_app.repository.UserRepository;
import com.blogapp.be_blog_app.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public void vote(Long postId, Vote.VoteType voteType, String username) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Vote> existingVote = voteRepository.findTopByPostAndUserOrderByIdDesc(post, user);

        if (existingVote.isPresent()) {
            Vote vote = existingVote.get();
            if (vote.getVoteType().equals(voteType)) {
                // Remove vote if clicking same button
                voteRepository.delete(vote);
                updatePostVoteCount(post);
            } else {
                // Change vote type
                vote.setVoteType(voteType);
                voteRepository.save(vote);
                updatePostVoteCount(post);
            }
        } else {
            // Create new vote
            Vote newVote = new Vote(voteType, post, user);
            voteRepository.save(newVote);
            updatePostVoteCount(post);
        }
    }

    private void updatePostVoteCount(Post post) {
        int voteCount = post.getVotes().stream()
                .mapToInt(vote -> vote.getVoteType().getDirection())
                .sum();
        post.setVoteCount(voteCount);
        postRepository.save(post);
    }
}
