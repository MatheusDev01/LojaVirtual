    package com.ecommerce.backend.service;

    import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

    import com.ecommerce.backend.dto.PessoaClienteRequestDTO;
    import com.ecommerce.backend.entity.Pessoa;
    import com.ecommerce.backend.repository.PessoaClienteRepository;

    @Service
    public class PessoaClienteService {
        @Autowired
        PessoaClienteRepository pessoaRepository;

        @Autowired
        EmailService emailService;

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


        public Pessoa registrar(PessoaClienteRequestDTO pessoaClienteRequestDTO) {
            Pessoa pessoa = new PessoaClienteRequestDTO().converter(pessoaClienteRequestDTO);
            pessoa.setDataCriacao(new Date());
            pessoa.setSenha(passwordEncoder.encode(pessoa.getSenha()));
            pessoa.setPermissaoPessoa("user");
            Pessoa pessoaNovo = pessoaRepository.saveAndFlush(pessoa);
            //emailService.enviarEmailTexto(pessoaNovo.getEmail(), "Cadastro na lojavirtual", "Cadastro realizado com sucesso");
            Map<String, Object> proprMap = new HashMap<>();
                proprMap.put("name", pessoa.getName());
                proprMap.put("mensagem", "Boas Compras");
                proprMap.put("email", pessoaNovo.getEmail());
                proprMap.put("titulo1", "Cadastramento");
                proprMap.put("titulo2","Seu Cadastro foi realizado com sucesso!");
                proprMap.put("texto1", "Faça login no site para iniciar suas compras e gerenciar seus pedidos.");
                emailService.enviarEmailTemplate(pessoaNovo.getEmail(), "Cadastramento", proprMap);
            return pessoaNovo;
        }
    }
