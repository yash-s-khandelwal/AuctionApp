package com.adslide.auction.auction.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="User")
public class User {
    public User(){}
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_sequence_gen")
    @SequenceGenerator(name = "my_sequence_gen", sequenceName = "my_entity_sequence", initialValue = 1000)
    private Long userId;

    private String Username;
    private String email;
    private String phoneNumber;
    private String firstName;
    private String LastName;
    
    @CreationTimestamp
    private LocalDateTime createdAt;


}
