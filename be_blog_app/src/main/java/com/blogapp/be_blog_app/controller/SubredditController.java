package com.blogapp.be_blog_app.controller;


import com.blogapp.be_blog_app.model.Subreddit;
import com.blogapp.be_blog_app.repository.SubredditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/subreddits")
@CrossOrigin(origins = "http://localhost:4200")
public class SubredditController {

    @Autowired
    private SubredditRepository subredditRepository;

    @GetMapping
    public ResponseEntity<List<Subreddit>> getAllSubreddits() {
        return ResponseEntity.ok(subredditRepository.findAll());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Subreddit> getSubreddit(@PathVariable String name) {
        Subreddit subreddit = subredditRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Subreddit not found"));
        return ResponseEntity.ok(subreddit);
    }

    @PostMapping
    public ResponseEntity<Subreddit> createSubreddit(@RequestBody Subreddit subreddit) {
        if (subredditRepository.existsByName(subreddit.getName())) {
            throw new RuntimeException("Subreddit already exists");
        }
        return ResponseEntity.ok(subredditRepository.save(subreddit));
    }
}
