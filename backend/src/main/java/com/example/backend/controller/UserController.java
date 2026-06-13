package com.example.backend.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.dto.UserDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3002")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repo;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    // Converte a entidade User em UserDTO (inclui a bio)
    private UserDTO toDTO(User u) {
        UserDTO dto = new UserDTO(u.getId(), u.getUsername(), u.getEmail(), u.getAvatarUrl(), u.getRole());
        dto.setBio(u.getBio());
        return dto;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody User user) {
        return create(user); // Reaproveita o método existente
    }

    // ========================
    // Listar todos os usuários
    // ========================
    @GetMapping
    public List<UserDTO> getAll() {
        return repo.findAll()
                .stream()
                .map(user -> toDTO(user))
                .collect(Collectors.toList());
    }

    // ========================
    // Buscar usuário por ID
    // ========================
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(user -> ResponseEntity.ok(toDTO(user)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // ========================
    // Buscar usuário por email
    // ========================
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getByEmail(@PathVariable String email) {
        return repo.findByEmailIgnoreCase(email.trim())
                .map(user -> ResponseEntity.ok(toDTO(user)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // ========================
    // Criar novo usuário
    // ========================
    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null || user.getUsername() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        // Normalizar email para minúsculas e sem espaços
        user.setEmail(user.getEmail().trim().toLowerCase());

        // Verificar duplicado (case-insensitive)
        if (repo.findByEmailIgnoreCase(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = repo.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(toDTO(saved));
    }

    // ========================
    // Atualizar usuário
    // ========================
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody User userDetails) {
        Optional<User> userOpt = repo.findById(id);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            // só atualiza o avatar se vier preenchido (evita apagar a foto ao salvar o perfil)
            if (userDetails.getAvatarUrl() != null) {
                user.setAvatarUrl(userDetails.getAvatarUrl());
            }
            // bio: atualiza quando enviada (string vazia limpa a bio)
            if (userDetails.getBio() != null) {
                user.setBio(userDetails.getBio());
            }

            if (userDetails.getPassword() != null && !userDetails.getPassword().isBlank()) {
                user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            }

            User updated = repo.save(user);
            return ResponseEntity.ok(toDTO(updated));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        String email = loginData.getEmail() != null ? loginData.getEmail().trim().toLowerCase() : "";
        Optional<User> userOpt = repo.findByEmailIgnoreCase(email);

        if (userOpt.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("E-mail não encontrado");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(loginData.getPassword(), user.getPassword())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Senha incorreta");
        }

        // Auto-promove o superutilizador se ainda não for ADMIN
        if (SUPERUSER_EMAIL.equals(user.getEmail()) && !"ADMIN".equals(user.getRole())) {
            user.setRole("ADMIN");
            user = repo.save(user);
        }

        return ResponseEntity.ok(toDTO(user));
    }

    // ========================
    // Upload de avatar (multipart)
    // A imagem é guardada no banco de dados (coluna avatar_data) para sobreviver
    // a reinícios/rebuilds do container — o disco local não é persistido.
    // ========================
    @PostMapping("/{id}/avatar")
    public ResponseEntity<UserDTO> uploadAvatar(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Optional<User> userOpt = repo.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        if (file == null || file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        try {
            User user = userOpt.get();
            user.setAvatarData(file.getBytes());
            String contentType = file.getContentType();
            user.setAvatarContentType(contentType != null ? contentType : "image/jpeg");
            // aponta para o endpoint que serve a imagem do banco; o sufixo ?v= quebra o cache do navegador
            user.setAvatarUrl("/api/users/" + id + "/avatar?v=" + System.currentTimeMillis());
            User updated = repo.save(user);

            logger.info("Avatar salvo no banco com sucesso (usuario id={}, {} bytes)", id, file.getSize());

            return ResponseEntity.ok(toDTO(updated));
        } catch (IOException e) {
            logger.error("Erro ao salvar imagem para usuario {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ========================
    // Servir o avatar guardado no banco
    // ========================
    @GetMapping("/{id}/avatar")
    public ResponseEntity<byte[]> getAvatar(@PathVariable Long id) {
        Optional<User> userOpt = repo.findById(id);
        if (userOpt.isEmpty() || userOpt.get().getAvatarData() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        User user = userOpt.get();
        String contentType = user.getAvatarContentType() != null ? user.getAvatarContentType() : "image/jpeg";
        return ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.CONTENT_TYPE, contentType)
                .header(org.springframework.http.HttpHeaders.CACHE_CONTROL, "public, max-age=31536000, immutable")
                .body(user.getAvatarData());
    }

    // ========================
    // Deletar usuário
    // ========================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ========================
    // Promover utilizador a ADMIN
    // (apenas o superutilizador pode promover)
    // ========================
    private static final String SUPERUSER_EMAIL = "bruno-cardoso12@hotmail.com";

    @PostMapping("/{id}/promote")
    public ResponseEntity<UserDTO> promote(@PathVariable Long id,
                                           @RequestParam Long requesterId) {
        Optional<User> requesterOpt = repo.findById(requesterId);
        if (requesterOpt.isEmpty() || !SUPERUSER_EMAIL.equals(requesterOpt.get().getEmail())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Optional<User> target = repo.findById(id);
        if (target.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        User u = target.get();
        u.setRole("ADMIN");
        User saved = repo.save(u);
        return ResponseEntity.ok(toDTO(saved));
    }

    // ========================
    // Bootstrap: torna o primeiro utilizador a solicitar em ADMIN
    // (só funciona se não existir nenhum admin ainda E com a chave secreta correta)
    // Nota: o superutilizador é promovido automaticamente no login — este endpoint
    // destina-se apenas a promover outros utilizadores numa primeira configuração.
    // ========================
    @PostMapping("/{id}/bootstrap-admin")
    public ResponseEntity<?> bootstrapAdmin(@PathVariable Long id,
                                            @RequestParam(required = false) String secret) {
        if (!"bookgram-setup-2026".equals(secret)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Chave inválida");
        }
        // Apenas o superutilizador pode ser promovido via bootstrap
        Optional<User> target = repo.findById(id);
        if (target.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        if (!SUPERUSER_EMAIL.equals(target.get().getEmail())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Apenas o superutilizador pode usar este endpoint");
        }
        User u = target.get();
        u.setRole("ADMIN");
        User saved = repo.save(u);
        return ResponseEntity.ok(toDTO(saved));
    }
}
