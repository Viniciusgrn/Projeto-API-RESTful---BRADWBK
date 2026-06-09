package com.example.backend.service;

import com.example.backend.dto.UserActivityDTO;
import com.example.backend.model.*;
import com.example.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private final ActivityRepository activityRepo;
    private final UserActivityRepository userActivityRepo;
    private final UserRepository userRepo;
    private final UserXPService xpService;

    public ActivityService(ActivityRepository activityRepo,
                           UserActivityRepository userActivityRepo,
                           UserRepository userRepo,
                           UserXPService xpService) {
        this.activityRepo = activityRepo;
        this.userActivityRepo = userActivityRepo;
        this.userRepo = userRepo;
        this.xpService = xpService;
    }

    // ── Admin: create activity ─────────────────────────────────────────────
    @Transactional
    public Activity createActivity(String title, String description,
                                   String type, int xpReward,
                                   String badgeName, String bookTitle,
                                   LocalDateTime deadline) {
        Activity a = new Activity();
        a.setTitle(title);
        a.setDescription(description);
        a.setType(Activity.ActivityType.valueOf(type));
        a.setXpReward(xpReward);
        a.setBadgeName(badgeName);
        a.setBookTitle(bookTitle);
        a.setDeadline(deadline);
        return activityRepo.save(a);
    }

    // ── Admin: assign activity to a list of user ids ───────────────────────
    @Transactional
    public void assignToUsers(Long activityId, List<Long> userIds) {
        Activity activity = activityRepo.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));
        for (Long uid : userIds) {
            userRepo.findById(uid).ifPresent(user -> {
                boolean exists = userActivityRepo
                        .findByUser_IdAndActivity_Id(uid, activityId).isPresent();
                if (!exists) {
                    UserActivity ua = new UserActivity();
                    ua.setUser(user);
                    ua.setActivity(activity);
                    userActivityRepo.save(ua);
                }
            });
        }
    }

    // ── Admin: list all activities ─────────────────────────────────────────
    public List<Activity> listAll() {
        return activityRepo.findAllByOrderByCreatedAtDesc();
    }

    // ── Admin: progress on an activity ────────────────────────────────────
    public List<UserActivityDTO> getActivityProgress(Long activityId) {
        return userActivityRepo.findByActivity_Id(activityId)
                .stream().map(UserActivityDTO::from).collect(Collectors.toList());
    }

    // ── Admin: delete activity ─────────────────────────────────────────────
    @Transactional
    public void deleteActivity(Long activityId) {
        userActivityRepo.findByActivity_Id(activityId)
                .forEach(ua -> userActivityRepo.delete(ua));
        activityRepo.deleteById(activityId);
    }

    // ── User: get my activities ────────────────────────────────────────────
    public List<UserActivityDTO> getUserActivities(Long userId) {
        return userActivityRepo.findByUser_IdOrderByAssignedAtDesc(userId)
                .stream().map(UserActivityDTO::from).collect(Collectors.toList());
    }

    // ── User: mark as completed ────────────────────────────────────────────
    @Transactional
    public UserActivityDTO completeActivity(Long userActivityId, Long userId) {
        UserActivity ua = userActivityRepo.findById(userActivityId)
                .orElseThrow(() -> new RuntimeException("UserActivity not found"));
        if (!ua.getUser().getId().equals(userId))
            throw new RuntimeException("Unauthorized");
        if (ua.getStatus() == UserActivity.Status.COMPLETED)
            return UserActivityDTO.from(ua);

        ua.setStatus(UserActivity.Status.COMPLETED);
        ua.setCompletedAt(LocalDateTime.now());
        userActivityRepo.save(ua);

        // Award XP
        int xp = ua.getActivity().getXpReward();
        if (xp > 0) xpService.addXP(userId, xp, false);

        return UserActivityDTO.from(ua);
    }
}
