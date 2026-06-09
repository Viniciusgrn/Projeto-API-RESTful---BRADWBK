package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.UserXP;

public interface UserXPRepository extends JpaRepository<UserXP, Long> {
    Optional<UserXP> findByUser_Id(Long userId);
    List<UserXP> findTop10ByOrderByLevelDescXpDesc();
}
