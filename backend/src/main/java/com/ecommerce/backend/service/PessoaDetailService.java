package com.ecommerce.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.entity.Pessoa;
import com.ecommerce.backend.repository.PessoaRepository;

@Service
public class PessoaDetailService implements UserDetailsService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<UserDetails> pessoa = pessoaRepository.findByEmail(username);
        if(pessoa.isEmpty()){
            throw new UsernameNotFoundException("Pessoa não encontrada pelo Email");
        }  

        return pessoa.get(0);
    }
    
}
