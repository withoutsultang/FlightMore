package com.inhatc.flightmore.common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/login/naver","/login/callback/naver","/api/notify/**","/api/flights/**", "/api/telegram/**", "/send-telegram-message",  "/v3/api-docs/**",
                                        "/swagger-ui/**",
                                        "/swagger-ui.html",
                                        "/swagger-resources/**",
                                        "/webjars/**").permitAll()
                                // /login/naver and /callback/naver 경로에 대한 접근 허용
                                .anyRequest().authenticated() // 나머지 요청은 인증 필요
                )
                .csrf(csrf -> csrf.disable()); // CSRF 보안 기능 비활성화
        return http.build();
    }
}
