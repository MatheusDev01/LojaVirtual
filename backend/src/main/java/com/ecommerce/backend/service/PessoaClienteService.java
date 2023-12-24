    package com.ecommerce.backend.service;

    import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import com.ecommerce.backend.dto.PessoaClienteRequestDTO;
    import com.ecommerce.backend.entity.Pessoa;
    import com.ecommerce.backend.repository.PessoaClienteRepository;

    @Service
    public class PessoaClienteService {
        @Autowired
        PessoaClienteRepository pessoaRepository;

        @Autowired
        private PermissaoPessoaService permissaoPessoaService;

        @Autowired
        EmailService emailService;


        public Pessoa registrar(PessoaClienteRequestDTO pessoaClienteRequestDTO) {
            Pessoa pessoa = new PessoaClienteRequestDTO().converter(pessoaClienteRequestDTO);
            pessoa.setDataCriacao(new Date());
            Pessoa pessoaNovo = pessoaRepository.saveAndFlush(pessoa);
            permissaoPessoaService.vincularPessoaPermissaoCliente(pessoaNovo);
            emailService.enviarEmailTexto(pessoaNovo.getEmail(), "Cadastro na lojavirtual", "Cadastro realizado com sucesso");
            return pessoaNovo;
        }
    }
