package com.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
    
}
