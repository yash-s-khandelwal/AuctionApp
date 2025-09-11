package com.adslide.auction.auction.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="User")
public class User {
    public User(){}
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String Username;
    private String email;
    private String phoneNumber;
    private String firstName;
    private String LastName;
    
    @CreationTimestamp
    private LocalDateTime createdAt;

    public Long getUserId(){
        return userId;
    }


}
