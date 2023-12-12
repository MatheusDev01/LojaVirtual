package com.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.entity.Cidade;

public interface CidadeRepository extends JpaRepository<Cidade, Long> {
    
}
