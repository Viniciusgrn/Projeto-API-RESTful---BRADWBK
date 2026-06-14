package com.example.backend.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Lê o header Authorization: Bearer <token>, valida o JWT e popula o contexto de segurança.
 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final TokenBlacklist blacklist;
    private final UserRepository userRepo;

    public JwtAuthFilter(JwtService jwtService, TokenBlacklist blacklist, UserRepository userRepo) {
        this.jwtService = jwtService;
        this.blacklist = blacklist;
        this.userRepo = userRepo;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            if (!blacklist.isRevoked(token) && jwtService.isValid(token)) {
                try {
                    Claims claims = jwtService.parse(token);
                    String email = claims.getSubject();
                    User user = userRepo.findByEmailIgnoreCase(email).orElse(null);
                    if (user != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        String role = user.getRole() != null ? user.getRole() : "USER";
                        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));
                        var auth = new UsernamePasswordAuthenticationToken(user, null, authorities);
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                } catch (Exception ignored) {
                    // token inválido -> segue sem autenticar
                }
            }
        }

        chain.doFilter(request, response);
    }
}
