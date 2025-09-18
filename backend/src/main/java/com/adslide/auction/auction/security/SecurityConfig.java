package com.adslide.auction.auction.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // 1. PUBLIC ENDPOINTS (allow all visitors)
                        .requestMatchers("/api/auth/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v0/product/allProducts").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v0/product/getProductDetails/{productId}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v0/bid/getBidsOnProduct/{productId}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v0/category/getAllCategory").permitAll()

                        // 2. PROTECTED ENDPOINTS (require a valid token)
                        .requestMatchers(HttpMethod.POST, "/api/v0/bid/createBid").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v0/product/createProduct").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/v0/bid/getBidsOfUser/{userId}").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v0/user/updateUser").authenticated()

                        // 3. CATCH-ALL RULE (protect any other endpoints by default)
                        .anyRequest().authenticated());

        // Add the JWT filter to the chain before the standard authentication filter
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}