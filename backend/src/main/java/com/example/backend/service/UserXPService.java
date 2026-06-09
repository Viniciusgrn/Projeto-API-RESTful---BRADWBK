package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.dto.UserXPDTO;
import com.example.backend.model.User;
import com.example.backend.model.UserXP;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.UserXPRepository;

@Service
public class UserXPService {

    private final UserXPRepository userXPRepository;
    private final UserRepository userRepository;

    public UserXPService(UserXPRepository userXPRepository, UserRepository userRepository) {
        this.userXPRepository = userXPRepository;
        this.userRepository = userRepository;
    }

    public UserXPDTO getXP(Long userId) {
        UserXP xp = getOrCreate(userId);
        return toDTO(xp);
    }

    @Transactional
    public UserXPDTO addXP(Long userId, int amount, boolean bookRead) {
        UserXP xp = getOrCreate(userId);
        xp.addXp(amount);
        xp.updateStreak();
        if (bookRead) {
            xp.setTotalBooksRead(xp.getTotalBooksRead() + 1);
            xp.addXp(50); // bonus for reading a book
        }
        xp.setTotalPosts(xp.getTotalPosts() + (bookRead ? 0 : 1));
        return toDTO(userXPRepository.save(xp));
    }

    public List<UserXPDTO> getLeaderboard() {
        return userXPRepository.findTop10ByOrderByLevelDescXpDesc()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private UserXP getOrCreate(Long userId) {
        return userXPRepository.findByUser_Id(userId).orElseGet(() -> {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            UserXP newXp = new UserXP();
            newXp.setUser(user);
            return userXPRepository.save(newXp);
        });
    }

    private UserXPDTO toDTO(UserXP xp) {
        UserXPDTO dto = new UserXPDTO();
        dto.setUserId(xp.getUser().getId());
        dto.setUsername(xp.getUser().getUsername());
        dto.setUserAvatarUrl(xp.getUser().getAvatarUrl());
        dto.setXp(xp.getXp());
        dto.setLevel(xp.getLevel());
        dto.setXpForNextLevel(UserXP.xpForLevel(xp.getLevel()));
        dto.setStreak(xp.getStreak());
        dto.setTotalBooksRead(xp.getTotalBooksRead());
        dto.setTotalPosts(xp.getTotalPosts());
        return dto;
    }
}
