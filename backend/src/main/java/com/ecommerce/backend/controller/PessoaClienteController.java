package com.ecommerce.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.dto.PessoaClienteRequestDTO;
import com.ecommerce.backend.entity.Pessoa;
import com.ecommerce.backend.service.PessoaClienteService;

@RestController
@RequestMapping("/api/pessoacliente")
@CrossOrigin
public class PessoaClienteController {
    @Autowired
    private PessoaClienteService pessoaService;


    
    @PostMapping("/")
    public Pessoa inserir(@RequestBody PessoaClienteRequestDTO pessoaClienteRequestDTO) {
      return pessoaService.registrar(pessoaClienteRequestDTO);
    }

  
}
