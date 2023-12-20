package com.ecommerce.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.entity.PermissaoPessoa;
import com.ecommerce.backend.repository.PermissaoPessoaRepository;

@Service
public class PermissaoPessoaService {
    @Autowired
    private PermissaoPessoaRepository permissaoPessoaRepository;

    public List<PermissaoPessoa> buscarTodos(){
        return permissaoPessoaRepository.findAll();
    }

    public PermissaoPessoa inserir(PermissaoPessoa objeto){
        objeto.setDataCriacao(new Date());
        PermissaoPessoa permissaoNovo = permissaoPessoaRepository.saveAndFlush(objeto);
        return permissaoNovo;
    }
    public PermissaoPessoa alterar(PermissaoPessoa objeto){
        objeto.setDataAtualizacao(new Date());
        return permissaoPessoaRepository.saveAndFlush(objeto);
    }
    public void excluir(Long id){
        PermissaoPessoa objeto = permissaoPessoaRepository.findById(id).get();
        permissaoPessoaRepository.delete(objeto);
    }
}
