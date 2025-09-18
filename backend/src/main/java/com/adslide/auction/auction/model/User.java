package com.adslide.auction.auction.model;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Data
@Table(name = "User")
public class User implements UserDetails {
    public User() {
    }
    // this is the model for a user

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(unique = true, nullable = false)
    private String phoneNumber;
    private String firstName;
    private String lastName;
    @Column(nullable = false)
    private String password;


    @CreationTimestamp
    private LocalDateTime createdAt;

//    public Long getUserId() {
//        return userId;
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // For a simple demo, we can return an empty list.
        // In a real app, this would return a list of roles or permissions.
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        // Assuming user accounts do not expire
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Assuming user accounts are not locked
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Assuming credentials do not expire
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Assuming the user is always enabled
        return true;
    }

}
