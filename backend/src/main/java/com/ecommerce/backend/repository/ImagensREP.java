package com.ecommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.entity.Imagens;

public interface ImagensREP extends JpaRepository<Imagens, Long> {
    List<Imagens> findByname(String name);
}
