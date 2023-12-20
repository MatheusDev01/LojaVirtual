package com.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.entity.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>{
    
}
