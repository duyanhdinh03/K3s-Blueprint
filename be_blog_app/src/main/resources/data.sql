INSERT INTO users (username, email, password, created_date, enabled) VALUES
                                                                         ('ProgrammingTechie', 'programming@example.com', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6', NOW(), true),
                                                                         ('TestUser', 'test@example.com', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6', NOW(), true),
                                                                         ('RedditFan', 'fan@example.com', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6', NOW(), true);

INSERT INTO subreddit (name, description, created_date) VALUES
                                                            ('FirstPost', 'A place for first posts and beginners', NOW()),
                                                            ('Fun Things To Talk About', 'Discuss anything fun and interesting', NOW()),
                                                            ('Technology', 'All about tech and programming', NOW()),
                                                            ('General', 'General discussion topics', NOW()),
                                                            ('Gaming', 'Everything about video games', NOW()),
                                                            ('Movies', 'Discuss your favorite films', NOW());

INSERT INTO post (title, content, vote_count, created_date, author_id, subreddit_id) VALUES
                                                                                         ('Build a Blog with Springboot and Angular', 'Complete tutorial on building a modern web application using Spring Boot and Angular. This covers everything from setup to deployment.', 15, DATEADD('DAY', -20, NOW()), 1, 3),
                                                                                         ('Welcome to our Reddit Clone!', 'This is our first post in this amazing Reddit clone. Feel free to explore and create your own posts!', 8, DATEADD('DAY', -18, NOW()), 1, 1),
                                                                                         ('Best Programming Practices', 'What are some programming practices that every developer should follow?', 12, DATEADD('DAY', -15, NOW()), 2, 3),
                                                                                         ('Favorite Movies of 2024', 'What were your top movies this year? Share your recommendations!', 6, DATEADD('DAY', -10, NOW()), 3, 6),
                                                                                         ('Gaming Setup Recommendations', 'Looking for advice on building a new gaming PC. What are your suggestions?', 9, DATEADD('DAY', -8, NOW()), 2, 5),
                                                                                         ('Random Fun Facts', 'Share interesting facts that will blow peoples minds!', 4, DATEADD('DAY', -5, NOW()), 3, 2);

INSERT INTO comment (content, created_date, post_id, author_id) VALUES
                                                                    ('Great post! Very informative and well-written.', DATEADD('HOUR', -10, NOW()), 1, 2),
                                                                    ('Thanks for sharing this tutorial. Very helpful!', DATEADD('HOUR', -8, NOW()), 1, 3),
                                                                    ('Looking forward to more content like this.', DATEADD('HOUR', -6, NOW()), 1, 1),
                                                                    ('Welcome! This platform looks amazing.', DATEADD('HOUR', -15, NOW()), 2, 2),
                                                                    ('Code reviews and testing are essential!', DATEADD('HOUR', -12, NOW()), 3, 1),
                                                                    ('I agree with clean code principles.', DATEADD('HOUR', -5, NOW()), 3, 3),
                                                                    ('Dune Part Two was incredible!', DATEADD('HOUR', -20, NOW()), 4, 1),
                                                                    ('RTX 4080 is a great choice for gaming.', DATEADD('HOUR', -18, NOW()), 5, 1),
                                                                    ('Did you know octopuses have three hearts?', DATEADD('HOUR', -3, NOW()), 6, 2);

INSERT INTO vote (vote_type, post_id, user_id) VALUES
                                                   (0, 1, 1), (0, 1, 2), (0, 1, 3),
                                                   (0, 2, 2), (0, 2, 3),
                                                   (0, 3, 1), (0, 3, 3),
                                                   (1, 4, 1),
                                                   (0, 5, 2), (0, 5, 3);