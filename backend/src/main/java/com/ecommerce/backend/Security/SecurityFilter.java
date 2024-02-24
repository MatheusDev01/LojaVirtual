package com.ecommerce.backend.Security;

import java.io.IOException;

import org.hibernate.annotations.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ecommerce.backend.repository.PessoaRepository;
import com.ecommerce.backend.service.PessoaGerenciamentoService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    PessoaGerenciamentoService pessoaGerenciamentoService;

    @Autowired
    PessoaRepository pessoaRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        var token = this.recuperarToken(request);
        if(token != null){
          var subject =  pessoaGerenciamentoService.validarToken(token);

          if (subject != "Erro"){

          UserDetails user = pessoaRepository.findByEmail(subject).get(0);

          var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
          var a = user.getAuthorities();
          SecurityContextHolder.getContext().setAuthentication(authentication);
          }
        }
        filterChain.doFilter(request, response);
    }

    private String recuperarToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
    
}
