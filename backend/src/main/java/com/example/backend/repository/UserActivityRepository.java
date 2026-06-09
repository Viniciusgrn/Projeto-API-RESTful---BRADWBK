package com.example.backend.repository;

import com.example.backend.model.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {
    List<UserActivity> findByUser_IdOrderByAssignedAtDesc(Long userId);
    List<UserActivity> findByActivity_Id(Long activityId);
    Optional<UserActivity> findByUser_IdAndActivity_Id(Long userId, Long activityId);
}
