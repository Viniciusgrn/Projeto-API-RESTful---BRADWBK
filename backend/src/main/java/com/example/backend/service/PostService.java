package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.dto.PostCommentDTO;
import com.example.backend.dto.PostDTO;
import com.example.backend.model.Post;
import com.example.backend.model.PostComment;
import com.example.backend.model.PostLike;
import com.example.backend.model.User;
import com.example.backend.repository.PostCommentRepository;
import com.example.backend.repository.PostLikeRepository;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.UserRepository;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;
    private final PostCommentRepository postCommentRepository;
    private final UserRepository userRepository;
    private final UserXPService userXPService;

    public PostService(PostRepository postRepository,
                       PostLikeRepository postLikeRepository,
                       PostCommentRepository postCommentRepository,
                       UserRepository userRepository,
                       UserXPService userXPService) {
        this.postRepository = postRepository;
        this.postLikeRepository = postLikeRepository;
        this.postCommentRepository = postCommentRepository;
        this.userRepository = userRepository;
        this.userXPService = userXPService;
    }

    public List<PostDTO> getFeed(Long currentUserId) {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(p -> toDTO(p, currentUserId))
                .collect(Collectors.toList());
    }

    public List<PostDTO> getUserPosts(Long userId, Long currentUserId) {
        return postRepository.findByUser_IdOrderByCreatedAtDesc(userId)
                .stream()
                .map(p -> toDTO(p, currentUserId))
                .collect(Collectors.toList());
    }

    @Transactional
    public PostDTO createPost(Long userId, String bookTitle, String bookAuthor,
                              String coverImageUrl, String content) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setUser(user);
        post.setBookTitle(bookTitle);
        post.setBookAuthor(bookAuthor);
        post.setCoverImageUrl(coverImageUrl);
        post.setContent(content);

        Post saved = postRepository.save(post);

        // Award XP for posting
        userXPService.addXP(userId, 20, false);

        return toDTO(saved, userId);
    }

    @Transactional
    public PostDTO toggleLike(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        postLikeRepository.findByPostAndUser(post, user).ifPresentOrElse(
                postLikeRepository::delete,
                () -> {
                    PostLike like = new PostLike();
                    like.setPost(post);
                    like.setUser(user);
                    postLikeRepository.save(like);
                }
        );

        return toDTO(postRepository.findById(postId).orElseThrow(), userId);
    }

    @Transactional
    public PostDTO addComment(Long postId, Long userId, String content) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PostComment comment = new PostComment();
        comment.setPost(post);
        comment.setUser(user);
        comment.setContent(content);
        postCommentRepository.save(comment);

        return toDTO(postRepository.findById(postId).orElseThrow(), userId);
    }

    @Transactional
    public void deletePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        if (!post.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized");
        }
        postRepository.delete(post);
    }

    private PostDTO toDTO(Post post, Long currentUserId) {
        PostDTO dto = new PostDTO();
        dto.setId(post.getId());
        dto.setUserId(post.getUser().getId());
        dto.setUsername(post.getUser().getUsername());
        dto.setUserAvatarUrl(post.getUser().getAvatarUrl());
        dto.setBookTitle(post.getBookTitle());
        dto.setBookAuthor(post.getBookAuthor());
        dto.setCoverImageUrl(post.getCoverImageUrl());
        dto.setContent(post.getContent());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setLikesCount(postLikeRepository.countByPost(post));

        if (currentUserId != null) {
            User currentUser = userRepository.findById(currentUserId).orElse(null);
            if (currentUser != null) {
                dto.setLikedByCurrentUser(postLikeRepository.existsByPostAndUser(post, currentUser));
            }
        }

        List<PostCommentDTO> commentDTOs = post.getComments().stream()
                .map(c -> {
                    PostCommentDTO cd = new PostCommentDTO();
                    cd.setId(c.getId());
                    cd.setUserId(c.getUser().getId());
                    cd.setUsername(c.getUser().getUsername());
                    cd.setUserAvatarUrl(c.getUser().getAvatarUrl());
                    cd.setContent(c.getContent());
                    cd.setCreatedAt(c.getCreatedAt());
                    return cd;
                }).collect(Collectors.toList());
        dto.setComments(commentDTOs);

        return dto;
    }
}
