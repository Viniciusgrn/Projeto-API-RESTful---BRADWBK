package com.example.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "user_xp")
public class UserXP {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private int xp = 0;

    @Column(nullable = false)
    private int level = 1;

    @Column(nullable = false)
    private int streak = 0;

    @Column(name = "last_activity_date")
    private LocalDate lastActivityDate;

    @Column(name = "total_books_read", nullable = false)
    private int totalBooksRead = 0;

    @Column(name = "total_posts", nullable = false)
    private int totalPosts = 0;

    public static int xpForLevel(int level) {
        return level * 100;
    }

    public void addXp(int amount) {
        this.xp += amount;
        while (this.xp >= xpForLevel(this.level)) {
            this.xp -= xpForLevel(this.level);
            this.level++;
        }
    }

    public void updateStreak() {
        LocalDate today = LocalDate.now();
        if (lastActivityDate == null) {
            streak = 1;
        } else if (lastActivityDate.equals(today.minusDays(1))) {
            streak++;
        } else if (!lastActivityDate.equals(today)) {
            streak = 1;
        }
        lastActivityDate = today;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }

    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }

    public int getStreak() { return streak; }
    public void setStreak(int streak) { this.streak = streak; }

    public LocalDate getLastActivityDate() { return lastActivityDate; }
    public void setLastActivityDate(LocalDate lastActivityDate) { this.lastActivityDate = lastActivityDate; }

    public int getTotalBooksRead() { return totalBooksRead; }
    public void setTotalBooksRead(int totalBooksRead) { this.totalBooksRead = totalBooksRead; }

    public int getTotalPosts() { return totalPosts; }
    public void setTotalPosts(int totalPosts) { this.totalPosts = totalPosts; }
}
