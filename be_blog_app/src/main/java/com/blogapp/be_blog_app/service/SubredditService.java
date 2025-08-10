package com.blogapp.be_blog_app.service;

import com.blogapp.be_blog_app.model.Subreddit;
import com.blogapp.be_blog_app.repository.SubredditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SubredditService {

    @Autowired
    private SubredditRepository subredditRepository;

    public List<Subreddit> getAllSubreddits() {
        return subredditRepository.findAll();
    }

    public Optional<Subreddit> getSubredditByName(String name) {
        return subredditRepository.findByName(name);
    }

    public Subreddit createSubreddit(Subreddit subreddit) {
        if (subredditRepository.existsByName(subreddit.getName())) {
            throw new RuntimeException("Subreddit already exists with name: " + subreddit.getName());
        }
        return subredditRepository.save(subreddit);
    }

    public Subreddit updateSubreddit(Long id, Subreddit subredditDetails) {
        Subreddit subreddit = subredditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subreddit not found"));

        subreddit.setName(subredditDetails.getName());
        subreddit.setDescription(subredditDetails.getDescription());

        return subredditRepository.save(subreddit);
    }

    public void deleteSubreddit(Long id) {
        Subreddit subreddit = subredditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subreddit not found"));
        subredditRepository.delete(subreddit);
    }
}