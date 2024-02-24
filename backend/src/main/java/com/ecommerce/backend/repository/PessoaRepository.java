package com.ecommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.ecommerce.backend.entity.Pessoa;


public interface PessoaRepository extends JpaRepository<Pessoa, Long>{
    List<UserDetails> findByEmail(String email);
    Pessoa findByCodigoVerificacao(String codigoVerificacao);
    List<Pessoa> findByToken(String token);
}
