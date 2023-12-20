package com.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.entity.CarrinhoCompraProduto;

public interface CarrinhoCompraProdutoRepository extends JpaRepository<CarrinhoCompraProduto, Long>{
    
}
