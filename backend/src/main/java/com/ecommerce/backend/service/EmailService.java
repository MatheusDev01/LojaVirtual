package com.ecommerce.backend.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import freemarker.template.Configuration;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class EmailService  {
    
    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    private Configuration fmConfiguration;

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
    public void enviarEmailTemplate(String destinatario, String titulo, Map<String, Object> propriedades) {
        MimeMessage mimeMessage =javaMailSender.createMimeMessage();
           try {
    
               MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

               mimeMessageHelper.setSubject(titulo);
               mimeMessageHelper.setFrom("matheusmeneses07@gmail.com");
               mimeMessageHelper.setTo(destinatario);
               
               mimeMessageHelper.setText(getConteudoTemplate(propriedades), true);
    
               javaMailSender.send(mimeMessageHelper.getMimeMessage());
           } catch (MessagingException e) {
               e.printStackTrace();
           }
       }
    
       public String getConteudoTemplate(Map < String, Object >model)     { 
           StringBuffer content = new StringBuffer();
    
           try {
               content.append(FreeMarkerTemplateUtils.processTemplateIntoString(fmConfiguration.getTemplate("email-recuperacao-codigo.flth"), model));
           } catch (Exception e) {
               e.printStackTrace();
           }
           return content.toString();
       }

}
