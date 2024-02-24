package com.ecommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{
    List<Produto> findByDescricaoCurta(String descricaoCurta);
    
}
