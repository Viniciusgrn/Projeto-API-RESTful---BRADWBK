package com.example.backend.controller;

import com.example.backend.dto.UserActivityDTO;
import com.example.backend.model.Activity;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;
    private final UserRepository userRepo;

    public ActivityController(ActivityService activityService, UserRepository userRepo) {
        this.activityService = activityService;
        this.userRepo = userRepo;
    }

    // ── ADMIN endpoints ────────────────────────────────────────────────────

    // POST /api/activities/admin/create?requesterId=1
    @PostMapping("/admin/create")
    public ResponseEntity<?> create(@RequestParam Long requesterId,
                                    @RequestBody CreateActivityRequest req) {
        if (!isAdmin(requesterId)) return ResponseEntity.status(403).body("Forbidden");
        Activity a = activityService.createActivity(
                req.title, req.description, req.type,
                req.xpReward, req.badgeName, req.bookTitle,
                req.deadline != null ? LocalDateTime.parse(req.deadline) : null);
        return ResponseEntity.ok(a);
    }

    // POST /api/activities/admin/{activityId}/assign?requesterId=1
    @PostMapping("/admin/{activityId}/assign")
    public ResponseEntity<?> assign(@PathVariable Long activityId,
                                    @RequestParam Long requesterId,
                                    @RequestBody List<Long> userIds) {
        if (!isAdmin(requesterId)) return ResponseEntity.status(403).body("Forbidden");
        activityService.assignToUsers(activityId, userIds);
        return ResponseEntity.ok().build();
    }

    // GET /api/activities/admin/all?requesterId=1
    @GetMapping("/admin/all")
    public ResponseEntity<?> listAll(@RequestParam Long requesterId) {
        if (!isAdmin(requesterId)) return ResponseEntity.status(403).body("Forbidden");
        return ResponseEntity.ok(activityService.listAll());
    }

    // GET /api/activities/admin/{activityId}/progress?requesterId=1
    @GetMapping("/admin/{activityId}/progress")
    public ResponseEntity<?> progress(@PathVariable Long activityId,
                                      @RequestParam Long requesterId) {
        if (!isAdmin(requesterId)) return ResponseEntity.status(403).body("Forbidden");
        return ResponseEntity.ok(activityService.getActivityProgress(activityId));
    }

    // DELETE /api/activities/admin/{activityId}?requesterId=1
    @DeleteMapping("/admin/{activityId}")
    public ResponseEntity<?> delete(@PathVariable Long activityId,
                                    @RequestParam Long requesterId) {
        if (!isAdmin(requesterId)) return ResponseEntity.status(403).body("Forbidden");
        activityService.deleteActivity(activityId);
        return ResponseEntity.noContent().build();
    }

    // GET /api/activities/admin/users  (list all users for assignment picker)
    @GetMapping("/admin/users")
    public ResponseEntity<?> listUsers(@RequestParam Long requesterId) {
        if (!isAdmin(requesterId)) return ResponseEntity.status(403).body("Forbidden");
        return ResponseEntity.ok(userRepo.findAll().stream().map(u -> new UserSummary(u.getId(), u.getUsername(), u.getEmail(), u.getRole())));
    }

    // ── USER endpoints ─────────────────────────────────────────────────────

    // GET /api/activities/user/{userId}
    @GetMapping("/user/{userId}")
    public List<UserActivityDTO> myActivities(@PathVariable Long userId) {
        return activityService.getUserActivities(userId);
    }

    // POST /api/activities/user/{userActivityId}/complete?userId=1
    @PostMapping("/user/{userActivityId}/complete")
    public UserActivityDTO complete(@PathVariable Long userActivityId,
                                    @RequestParam Long userId) {
        return activityService.completeActivity(userActivityId, userId);
    }

    // ── Helpers ────────────────────────────────────────────────────────────

    private static final String SUPERUSER_EMAIL = "bruno-cardoso12@hotmail.com";

    private boolean isAdmin(Long userId) {
        return userRepo.findById(userId)
                .map(u -> SUPERUSER_EMAIL.equals(u.getEmail()) || "ADMIN".equals(u.getRole()))
                .orElse(false);
    }

    public static class CreateActivityRequest {
        public String title;
        public String description;
        public String type = "TASK";
        public int xpReward = 0;
        public String badgeName;
        public String bookTitle;
        public String deadline; // ISO-8601
    }

    public record UserSummary(Long id, String username, String email, String role) {}
}
