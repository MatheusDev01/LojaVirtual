package com.ecommerce.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.service.PessoaGerenciamentoService;

@RestController
@RequestMapping("/api/pessoa-gerenciamento")
public class PessoaGerenciamentoController {
    @Autowired
    private PessoaGerenciamentoService pessoagerenciamento;


    
    @PostMapping("/enviarcodigo")
    public String RecuperarSenha(@RequestParam String email) {
      return pessoagerenciamento.solicitarCodigo(email);
    }

    @PostMapping("/alterarsenha")
    public String AlterarSenha(@RequestParam String email, @RequestParam String codigo, @RequestParam String novasenha) {
      return pessoagerenciamento.validarCodigo(codigo, email, novasenha);
    }

  
}
