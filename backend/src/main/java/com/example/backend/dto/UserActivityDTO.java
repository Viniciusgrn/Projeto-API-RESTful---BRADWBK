package com.example.backend.dto;

import com.example.backend.model.Activity;
import com.example.backend.model.UserActivity;
import java.time.LocalDateTime;

public class UserActivityDTO {
    public Long id;
    public Long activityId;
    public String title;
    public String description;
    public String type;
    public int xpReward;
    public String badgeName;
    public String bookTitle;
    public LocalDateTime deadline;
    public String status;
    public LocalDateTime assignedAt;
    public LocalDateTime completedAt;
    // stats (admin view)
    public Long userId;
    public String username;

    public static UserActivityDTO from(UserActivity ua) {
        UserActivityDTO d = new UserActivityDTO();
        d.id = ua.getId();
        Activity a = ua.getActivity();
        d.activityId = a.getId();
        d.title = a.getTitle();
        d.description = a.getDescription();
        d.type = a.getType().name();
        d.xpReward = a.getXpReward();
        d.badgeName = a.getBadgeName();
        d.bookTitle = a.getBookTitle();
        d.deadline = a.getDeadline();
        d.status = ua.getStatus().name();
        d.assignedAt = ua.getAssignedAt();
        d.completedAt = ua.getCompletedAt();
        d.userId = ua.getUser().getId();
        d.username = ua.getUser().getUsername();
        return d;
    }
}
