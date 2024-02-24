package com.ecommerce.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Token")
@Data
public class Token {
     @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String token;
}
