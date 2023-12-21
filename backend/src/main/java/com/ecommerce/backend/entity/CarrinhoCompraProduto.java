package com.ecommerce.backend.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "CarrinhoCompraProduto")
@Data
public class CarrinhoCompraProduto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Double valor;
    private Double quantidade;
    private String observacao;

    @ManyToOne
    @JoinColumn(name = "idCarrinhoCompra")
    @JsonIgnore
    private CarrinhoCompra carrinhoCompra;

    @ManyToOne
    @JoinColumn(name = "idProduto")
    private Produto produto;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCriacao;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataAtualizacao;
}
