package com.ecommerce.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService  {
    
    @Autowired
    JavaMailSender javaMailSender;


    public String enviarEmailTexto(String destinatario, String titulo, String menssagem){
        
        try {
            
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom("matheusmeneses07@gmail.com");
            simpleMailMessage.setTo(destinatario);
            simpleMailMessage.setSubject(titulo);
            simpleMailMessage.setText(menssagem);
            javaMailSender.send(simpleMailMessage);

            return "Email Enviado";

        } catch (Exception e) {
            return "Erro ao enviar Email";
        }
    }

}
