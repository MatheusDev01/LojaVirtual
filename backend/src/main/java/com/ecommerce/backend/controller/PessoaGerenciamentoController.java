package com.ecommerce.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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


    
    @PostMapping("/")
    public String RecuperarSenha(@RequestParam("email") String email) {
      return pessoagerenciamento.solicitarCodigo(email);
    }

    @PostMapping("/validarcodigo")
    public String validarCodigo(@RequestParam("email") String email, @RequestParam("codigo") String codigo) {
      return pessoagerenciamento.validarCodigo(codigo, email);
    }

  
}
