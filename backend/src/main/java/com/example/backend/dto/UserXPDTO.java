package com.example.backend.dto;

public class UserXPDTO {
    private Long userId;
    private String username;
    private String userAvatarUrl;
    private int xp;
    private int level;
    private int xpForNextLevel;
    private int streak;
    private int totalBooksRead;
    private int totalPosts;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getUserAvatarUrl() { return userAvatarUrl; }
    public void setUserAvatarUrl(String userAvatarUrl) { this.userAvatarUrl = userAvatarUrl; }

    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }

    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }

    public int getXpForNextLevel() { return xpForNextLevel; }
    public void setXpForNextLevel(int xpForNextLevel) { this.xpForNextLevel = xpForNextLevel; }

    public int getStreak() { return streak; }
    public void setStreak(int streak) { this.streak = streak; }

    public int getTotalBooksRead() { return totalBooksRead; }
    public void setTotalBooksRead(int totalBooksRead) { this.totalBooksRead = totalBooksRead; }

    public int getTotalPosts() { return totalPosts; }
    public void setTotalPosts(int totalPosts) { this.totalPosts = totalPosts; }
}
