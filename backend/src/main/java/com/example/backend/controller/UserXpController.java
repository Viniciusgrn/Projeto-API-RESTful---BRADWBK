package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.UserXPDTO;
import com.example.backend.service.UserXPService;

@RestController
@RequestMapping("/api/xp")
public class UserXpController {

    private final UserXPService userXPService;

    public UserXpController(UserXPService userXPService) {
        this.userXPService = userXPService;
    }

    // GET /api/xp/{userId}
    @GetMapping("/{userId}")
    public UserXPDTO getXP(@PathVariable Long userId) {
        return userXPService.getXP(userId);
    }

    // POST /api/xp/{userId}/book-read  (marks a book as read +50xp)
    @PostMapping("/{userId}/book-read")
    public UserXPDTO bookRead(@PathVariable Long userId) {
        return userXPService.addXP(userId, 50, true);
    }

    // GET /api/xp/leaderboard
    @GetMapping("/leaderboard")
    public List<UserXPDTO> getLeaderboard() {
        return userXPService.getLeaderboard();
    }
}
