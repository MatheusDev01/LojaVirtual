package com.ecommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.entity.Permissao;

public interface PermissaoRepository extends JpaRepository<Permissao, Long>{
    List<Permissao> findByname(String name);
}
