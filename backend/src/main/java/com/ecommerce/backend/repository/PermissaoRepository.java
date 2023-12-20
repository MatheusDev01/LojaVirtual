package com.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.entity.Permissao;

public interface PermissaoRepository extends JpaRepository<Permissao, Long>{
    
}
