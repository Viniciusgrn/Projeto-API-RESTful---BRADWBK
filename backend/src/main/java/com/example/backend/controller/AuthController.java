package com.example.backend.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.AuthResponse;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtService;
import com.example.backend.security.TokenBlacklist;

/**
 * Autenticação via JWT.
 *  - POST /api/auth/register : cria conta (senha em BCrypt) e devolve token
 *  - POST /api/auth/login    : valida credenciais e devolve token
 *  - POST /api/auth/logout   : invalida o token atual
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository repo;
    private final JwtService jwtService;
    private final TokenBlacklist blacklist;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private static final String SUPERUSER_EMAIL = "bruno-cardoso12@hotmail.com";

    public AuthController(UserRepository repo, JwtService jwtService, TokenBlacklist blacklist) {
        this.repo = repo;
        this.jwtService = jwtService;
        this.blacklist = blacklist;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null || user.getUsername() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome, e-mail e senha são obrigatórios");
        }
        user.setEmail(user.getEmail().trim().toLowerCase());

        if (repo.findByEmailIgnoreCase(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Este e-mail já está registrado");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole("USER");
        }
        User saved = repo.save(user);
        String token = jwtService.generateToken(saved);
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token, saved));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        String email = loginData.getEmail() != null ? loginData.getEmail().trim().toLowerCase() : "";
        Optional<User> userOpt = repo.findByEmailIgnoreCase(email);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("E-mail não encontrado");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(loginData.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta");
        }

        // Auto-promove o superusuário se ainda não for ADMIN
        if (SUPERUSER_EMAIL.equals(user.getEmail()) && !"ADMIN".equals(user.getRole())) {
            user.setRole("ADMIN");
            user = repo.save(user);
        }

        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            blacklist.revoke(authHeader.substring(7));
        }
        return ResponseEntity.ok().body("Logout efetuado");
    }
}
