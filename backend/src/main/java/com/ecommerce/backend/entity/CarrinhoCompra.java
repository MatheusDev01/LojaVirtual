package com.ecommerce.backend.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Table(name = "CarrinhoCompra")
@Data
public class CarrinhoCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    
    @ManyToOne
    @JoinColumn(name = "idPessoa")
    private Pessoa pessoa;

    private Date dataCompra;

    private String observacao;
    private String situacao;

    @OneToMany(mappedBy = "carrinhoCompra", orphanRemoval = true, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @Setter(value = AccessLevel.NONE)
    private List<CarrinhoCompraProduto> carrinhoCompraProduto;
    

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCriacao;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataAtualizacao;

    public void setCarrinhoCompraProduto(List<CarrinhoCompraProduto> ccp){
        for(CarrinhoCompraProduto p:ccp){
            p.setCarrinhoCompra(this);
        }
        this.carrinhoCompraProduto = ccp;
    }
}
