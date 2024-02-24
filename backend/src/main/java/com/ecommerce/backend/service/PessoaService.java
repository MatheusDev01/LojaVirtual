package com.ecommerce.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.entity.Pessoa;
import com.ecommerce.backend.repository.PessoaRepository;

@Service
public class PessoaService {
    @Autowired
    private PessoaRepository pessoaRepository;

    public List<Pessoa> buscarTodos(){
        return pessoaRepository.findAll();
    }

    public Pessoa inserir(Pessoa objeto){
        var passwordEncoder = new BCryptPasswordEncoder();
        objeto.setDataCriacao(new Date());
        objeto.setSenha(passwordEncoder.encode(objeto.getSenha()));
        Pessoa pessoaNovo = pessoaRepository.saveAndFlush(objeto);
        return pessoaNovo;
    }
    public Pessoa alterar(Pessoa objeto){
        var passwordEncoder = new BCryptPasswordEncoder();
        objeto.setDataAtualizacao(new Date());
        objeto.setSenha(passwordEncoder.encode(objeto.getSenha()));
        return pessoaRepository.saveAndFlush(objeto);
    }
    public void excluir(Long id){
        Pessoa objeto = pessoaRepository.findById(id).get();
        pessoaRepository.delete(objeto);
    }
}
