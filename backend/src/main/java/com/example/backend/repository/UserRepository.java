package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 🔹 Verificações usadas no cadastro
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    // 🔹 Busca usada no login
    Optional<User> findByEmail(String email);

    // 🔹 Busca case-insensitive
    Optional<User> findByEmailIgnoreCase(String email);
    Optional<User> findByUsernameIgnoreCase(String username);
}
