package com.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.entity.Estado;

public interface EstadoRepository extends JpaRepository<Estado, Long> {
    
}
