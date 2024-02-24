    package com.ecommerce.backend.service;

    import java.nio.charset.Charset;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.ecommerce.backend.entity.Pessoa;
    import com.ecommerce.backend.repository.PessoaRepository;
import com.google.api.client.util.Value;

    @Service
    public class PessoaGerenciamentoService {
        @Autowired
        PessoaRepository pessoaRepository;


        @Autowired
        EmailService emailService;


        public String solicitarCodigo(String email) {
            List<UserDetails> pessoaLista = pessoaRepository.findByEmail(email);
            if (pessoaLista.isEmpty()){
                return "O email não está cadastrado";
            } else {
                Pessoa pessoa = (Pessoa) pessoaLista.get(0);
                pessoa.setCodigoVerificacao(gerarCodigoVerificacao(10));
                pessoa.setDataEnvioCodigo(new Date());
                pessoaRepository.saveAndFlush(pessoa);
                //emailService.enviarEmailTexto(email, "Recuperação de Senha", "Olá, seu código de recuperação é: "+ pessoa.getCodigoVerificacao());
                Map<String, Object> proprMap = new HashMap<>();
                proprMap.put("name", pessoa.getName());
                proprMap.put("mensagem", pessoa.getCodigoVerificacao());
                proprMap.put("email", email);
                proprMap.put("titulo1", "Recuperação de Senha");
                proprMap.put("titulo2","Existe uma requisição para redefinir sua senha!");
                proprMap.put("texto1", "Se você não fez essa requisição, ignore este e-mail. Para redefinir a senha utilize o código abaixo:");
                emailService.enviarEmailTemplate(email, "Recuperação de Senha", proprMap);
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
        public String validarCodigo(String codigo, String email, String novaSenha){
            Pessoa pessoa = pessoaRepository.findByCodigoVerificacao(codigo);
            if (pessoa != null){
                String emailPessoa = pessoa.getEmail();
                    if (emailPessoa.intern() == email.intern()) {
                        Long dataEnvioCodigo = pessoa.getDataEnvioCodigo().getTime();
                        Date dataAgora = new Date();
                        Long minutoAgora = dataAgora.getTime();
                        if (dataEnvioCodigo >= (minutoAgora - 900000)){
                            pessoa.setSenha(novaSenha);
                            pessoa.setCodigoVerificacao(null);
                            pessoaRepository.saveAndFlush(pessoa);
                            return "Senha Alterada";
                        } else {
                            return "O código expirou. Favor, gerar outro código.";
                            }
                    } else {
                        return "Não há cadastro com o email informado.";
                        }
                } else {
                        return "O código é inválido";
                        }


        }

        
        

        //TokenAutenticação
        public String gerarToken(Pessoa user){

            Pessoa p = (Pessoa) pessoaRepository.findByEmail(user.getUsername()).get(0);
            
            try {
                String secret = System.getenv("TOKEN");
                Algorithm algorithm = Algorithm.HMAC256(secret);
                String token = JWT.create()
                                .withIssuer("LojaVirtual")
                                .withSubject(user.getUsername())
                                .withExpiresAt(getInstantExpiration())
                                .sign(algorithm);
                    p.setToken(token);
                    pessoaRepository.saveAndFlush(p);
                return token;
            } catch (JWTCreationException exception) {
                throw new RuntimeException("Erro ao gerar token", exception);
            }
        }

        public String validarToken(String token){
            try {
                String secret = System.getenv("TOKEN");
                Algorithm algorithm = Algorithm.HMAC256(secret);

                return JWT.require(algorithm)
                        .withIssuer("LojaVirtual")
                        .build()
                        .verify(token)
                        .getSubject();
            } catch (JWTVerificationException exception) {
                return "Erro";
            }
        }

        public Instant getInstantExpiration(){
            return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
        }

    }
