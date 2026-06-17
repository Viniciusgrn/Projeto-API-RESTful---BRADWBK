package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.backend.security.JwtAuthFilter;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // pré-flight CORS
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // autenticação (públicas)
                .requestMatchers("/api/auth/**").permitAll()
                // foto de perfil e arquivos servidos publicamente
                .requestMatchers(HttpMethod.GET, "/api/users/*/avatar").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                // websocket (chat em tempo real)
                .requestMatchers("/ws", "/ws/**").permitAll()
                // demais rotas exigem token válido
                .anyRequest().authenticated()
            )
            // token ausente/inválido/revogado -> 401 (não autenticado),
            // em vez do 403 padrão do Http403ForbiddenEntryPoint
            .exceptionHandling(ex -> ex.authenticationEntryPoint(
                (request, response, authException) ->
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED)))
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .cors(cors -> {}); // usa o CorsConfig
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
