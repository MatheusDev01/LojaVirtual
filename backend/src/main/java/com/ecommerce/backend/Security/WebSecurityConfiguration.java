package com.ecommerce.backend.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {

    @Autowired
    SecurityFilter securityFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.POST,"/api/pessoa-gerenciamento/auth").permitAll()
                .requestMatchers(HttpMethod.GET,"/api/pessoa-gerenciamento/validarLogin").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/produto/").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/categoria/").permitAll()
                            .requestMatchers(HttpMethod.POST, "/api/produto/").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/api/produto/").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/api/produto/").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.POST, "/api/pessoacliente/").permitAll()
                            .requestMatchers(HttpMethod.POST, "/api/pessoa/").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/api/pessoa/").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/api/pessoa/").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET, "/api/pessoa/").permitAll()
                            .anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)       
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
