package com.ecommerce.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.entity.CarrinhoCompra;
import com.ecommerce.backend.repository.CarrinhoCompraRepository;

@Service
public class CarrinhoCompraService {
    @Autowired
    private CarrinhoCompraRepository carrinhoCompraRepository;

    public List<CarrinhoCompra> buscarTodos(){
        return carrinhoCompraRepository.findAll();
    }

    public CarrinhoCompra inserir(CarrinhoCompra objeto){
        objeto.setDataCriacao(new Date());
        CarrinhoCompra carrinhoCompraNovo = carrinhoCompraRepository.saveAndFlush(objeto);
        return carrinhoCompraNovo;
    }
    public CarrinhoCompra alterar(CarrinhoCompra objeto){
        objeto.setDataAtualizacao(new Date());
        return carrinhoCompraRepository.saveAndFlush(objeto);
    }
    public void excluir(Long id){
        CarrinhoCompra objeto = carrinhoCompraRepository.findById(id).get();
        carrinhoCompraRepository.delete(objeto);
    }
}
