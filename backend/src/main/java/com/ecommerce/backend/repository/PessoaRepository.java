package com.ecommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.entity.Pessoa;


public interface PessoaRepository extends JpaRepository<Pessoa, Long>{
    List<Pessoa> findByEmail(String email);
    Pessoa findByCodigoVerificacao(String codigoVerificacao);
}
