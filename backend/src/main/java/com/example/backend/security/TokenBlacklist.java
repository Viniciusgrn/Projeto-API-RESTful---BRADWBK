package com.example.backend.security;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

/**
 * Lista de tokens invalidados via logout (em memória).
 * Permite que /auth/logout realmente impeça o reuso do token até a sua expiração.
 */
@Service
public class TokenBlacklist {

    private final Set<String> revoked = ConcurrentHashMap.newKeySet();

    public void revoke(String token) {
        if (token != null && !token.isBlank()) {
            revoked.add(token);
        }
    }

    public boolean isRevoked(String token) {
        return token != null && revoked.contains(token);
    }
}
