package com.ecommerce.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.entity.CarrinhoCompraProduto;
import com.ecommerce.backend.repository.CarrinhoCompraProdutoRepository;

@Service
public class CarrinhoCompraProdutoService {
    @Autowired
    private CarrinhoCompraProdutoRepository carrinhoCompraProdutoRepository;

    public List<CarrinhoCompraProduto> buscarTodos(){
        return carrinhoCompraProdutoRepository.findAll();
    }

    public CarrinhoCompraProduto inserir(CarrinhoCompraProduto objeto){
        objeto.setDataCriacao(new Date());
        CarrinhoCompraProduto carrinhoCompraNovo = carrinhoCompraProdutoRepository.saveAndFlush(objeto);
        return carrinhoCompraNovo;
    }
    public CarrinhoCompraProduto alterar(CarrinhoCompraProduto objeto){
        objeto.setDataAtualizacao(new Date());
        return carrinhoCompraProdutoRepository.saveAndFlush(objeto);
    }
    public void excluir(Long id){
        CarrinhoCompraProduto objeto = carrinhoCompraProdutoRepository.findById(id).get();
        carrinhoCompraProdutoRepository.delete(objeto);
    }
}
