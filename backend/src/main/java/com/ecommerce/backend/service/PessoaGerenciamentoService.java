    package com.ecommerce.backend.service;

    import java.nio.charset.Charset;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Random;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import com.ecommerce.backend.entity.Pessoa;
    import com.ecommerce.backend.repository.PessoaRepository;

    @Service
    public class PessoaGerenciamentoService {
        @Autowired
        PessoaRepository pessoaRepository;


        @Autowired
        EmailService emailService;


        public String solicitarCodigo(String email) {
            List<Pessoa> pessoaLista = pessoaRepository.findByEmail(email);
            if (pessoaLista.isEmpty()){
                return "O email não está cadastrado";
            } else {
                Pessoa pessoa = pessoaLista.get(0);
                pessoa.setCodigoVerificacao(gerarCodigoVerificacao(10));
                pessoa.setDataEnvioCodigo(new Date());
                pessoaRepository.saveAndFlush(pessoa);
                emailService.enviarEmailTexto(email, "Recuperação de Senha", "Olá, seu código de recuperação é: "+ pessoa.getCodigoVerificacao());
                return "Código enviado";
            }
        }

        private String gerarCodigoVerificacao(Integer i){
            // bind the length
            byte[] bytearray;
            bytearray = new byte[256];
            String mystring;
            StringBuffer thebuffer;
            String theAlphaNumericS;

            new Random().nextBytes(bytearray);

            mystring = new String(bytearray, Charset.forName("UTF-8"));

            thebuffer = new StringBuffer();

            // remove all spacial char
            theAlphaNumericS = mystring.replaceAll("[^A-Z0-9]", "");

            // random selection
            for (int m = 0; m < theAlphaNumericS.length(); m++) {
            if (Character.isLetter(theAlphaNumericS.charAt(m)) && (i > 0)
                || Character.isDigit(theAlphaNumericS.charAt(m)) && (i > 0)) {
                thebuffer.append(theAlphaNumericS.charAt(m));
                i--;
            }
            }

            // the resulting string
            String codigo = thebuffer.toString();
            return codigo;

        }
        
        //Validar codigo
        public String validarCodigo(String codigo, String email){
            Pessoa pessoa = pessoaRepository.findByCodigoVerificacao(codigo);
            String emailPessoa = pessoa.getEmail();
            if (pessoa != null && (emailPessoa.intern() == email.intern())) {
                Long dataEnvioCodigo = pessoa.getDataEnvioCodigo().getTime();
                Date dataAgora = new Date();
                Long minutoAgora = dataAgora.getTime();
                if (dataEnvioCodigo >= (minutoAgora - 900000)){
                    return "Código Válido";
                } else {return "O código expirou. Favor, gerar outro código.";}
            } return "O código é inválido ou não há cadastro com o email informado.";
        }
    }
