package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.PostDTO;
import com.example.backend.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // GET /api/posts/feed?userId=1
    @GetMapping("/feed")
    public List<PostDTO> getFeed(@RequestParam(required = false) Long userId) {
        return postService.getFeed(userId);
    }

    // GET /api/posts/user/{userId}?currentUserId=1
    @GetMapping("/user/{userId}")
    public List<PostDTO> getUserPosts(@PathVariable Long userId,
                                      @RequestParam(required = false) Long currentUserId) {
        return postService.getUserPosts(userId, currentUserId);
    }

    // POST /api/posts
    @PostMapping
    public PostDTO createPost(@RequestBody CreatePostRequest req) {
        return postService.createPost(req.userId, req.bookTitle, req.bookAuthor,
                req.coverImageUrl, req.content);
    }

    // POST /api/posts/{id}/like?userId=1
    @PostMapping("/{id}/like")
    public PostDTO toggleLike(@PathVariable Long id, @RequestParam Long userId) {
        return postService.toggleLike(id, userId);
    }

    // POST /api/posts/{id}/comments
    @PostMapping("/{id}/comments")
    public PostDTO addComment(@PathVariable Long id, @RequestBody CommentRequest req) {
        return postService.addComment(id, req.userId, req.content);
    }

    // DELETE /api/posts/{id}?userId=1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, @RequestParam Long userId) {
        postService.deletePost(id, userId);
        return ResponseEntity.noContent().build();
    }

    // Inner request classes
    public static class CreatePostRequest {
        public Long userId;
        public String bookTitle;
        public String bookAuthor;
        public String coverImageUrl;
        public String content;
    }

    public static class CommentRequest {
        public Long userId;
        public String content;
    }
}
