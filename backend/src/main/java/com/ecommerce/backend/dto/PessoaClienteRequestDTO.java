package com.ecommerce.backend.dto;

import org.springframework.beans.BeanUtils;

import com.ecommerce.backend.entity.Cidade;
import com.ecommerce.backend.entity.Pessoa;

import lombok.Data;

@Data
public class PessoaClienteRequestDTO {
    private String name;
    private String cpf;
    private String email;
    private String cep;
    private String endereco;
    private Cidade cidade;

    public Pessoa converter(PessoaClienteRequestDTO pessoaClienteRequestDTO){
        Pessoa pessoa = new Pessoa();
        BeanUtils.copyProperties(pessoaClienteRequestDTO, pessoa);
        return pessoa;
    }
}
