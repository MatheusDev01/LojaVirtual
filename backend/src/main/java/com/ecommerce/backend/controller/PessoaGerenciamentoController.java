package com.ecommerce.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Window;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.entity.Pessoa;
import com.ecommerce.backend.entity.Token;
import com.ecommerce.backend.repository.PessoaRepository;
import com.ecommerce.backend.service.PessoaGerenciamentoService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/pessoa-gerenciamento")
@CrossOrigin("http://localhost:5173")
public class PessoaGerenciamentoController {
    @Autowired
    private PessoaGerenciamentoService pessoagerenciamento;

    @Autowired
    private PessoaRepository pessoaRepository;
    
    @PostMapping("/enviarcodigo")
    public String RecuperarSenha(@RequestParam String email) {
      return pessoagerenciamento.solicitarCodigo(email);
    }

    @PostMapping("/alterarsenha")
    public String AlterarSenha(@RequestParam String email, @RequestParam String codigo, @RequestParam String novasenha) {
      return pessoagerenciamento.validarCodigo(codigo, email, novasenha);
    }

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PessoaGerenciamentoService pessoaGerenciamentoService;

	@SuppressWarnings("rawtypes")
  @PostMapping	("/auth")
	public String login(@RequestBody Pessoa pessoa) {

  
try {
        var usernamePassword = new UsernamePasswordAuthenticationToken(pessoa.getUsername(), pessoa.getPassword());
      var auth = this.authenticationManager.authenticate(usernamePassword);

      var token = pessoaGerenciamentoService.gerarToken((Pessoa) auth.getPrincipal());

      Pessoa pessoa1 = (Pessoa) pessoaRepository.findByEmail(pessoa.getEmail()).get(0); 

      String role = pessoa1.getPermissaoPessoa();
      
      return role;
    } catch (Exception e) {
      return "";
    }
      
	}

  @PostMapping("/validarLogin")
  public String getMethodName(@RequestBody Token token) {
    if (token.getToken() == null) {
      return "false";
    }
    var token1 = token.getToken();
      if (pessoaGerenciamentoService.validarToken(token1).equals("Erro")){
        return "false";
      } else {
        return "true";
      }

  }  
  
}
