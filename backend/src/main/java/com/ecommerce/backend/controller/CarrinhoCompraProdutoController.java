package com.ecommerce.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.entity.CarrinhoCompraProduto;
import com.ecommerce.backend.service.CarrinhoCompraProdutoService;

@RestController
@RequestMapping("/api/carrinhocompraproduto")
public class CarrinhoCompraProdutoController {
    @Autowired
    private CarrinhoCompraProdutoService carrinhoCompraProdutoService;

    @GetMapping("/")
    public List<CarrinhoCompraProduto> buscarTodos(){
        return carrinhoCompraProdutoService.buscarTodos();
    }
    
    @PostMapping("/")
    public CarrinhoCompraProduto inserir(@RequestBody CarrinhoCompraProduto objeto){
        return carrinhoCompraProdutoService.inserir(objeto);
    }

    @PutMapping("/")
    public CarrinhoCompraProduto alterar(@RequestBody CarrinhoCompraProduto objeto){
        return carrinhoCompraProdutoService.alterar(objeto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id){
            carrinhoCompraProdutoService.excluir(id);
            return ResponseEntity.ok().build();
    }
}
