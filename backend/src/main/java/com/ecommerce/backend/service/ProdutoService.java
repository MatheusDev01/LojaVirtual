package com.ecommerce.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.entity.Produto;
import com.ecommerce.backend.repository.ProdutoRepository;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> buscarTodos(){
        return produtoRepository.findAll();
    }

    public String inserir(Produto objeto){
        
        List<Produto> lista = produtoRepository.findByDescricaoCurta(objeto.getDescricaoCurta());
        if ( lista.isEmpty()){
        Produto produtoNovo = produtoRepository.saveAndFlush(objeto);
        objeto.setDataCriacao(new Date());
        return produtoNovo.getId().toString();
        } else {
        return "";
        }
    }
    public String alterar(Produto objeto){
        objeto.setDataAtualizacao(new Date());
        try {
            
            Optional<Produto> produto1 = produtoRepository.findById(objeto.getId());
            Produto produto2 = produto1.get();
            
            produto2.setId(objeto.getId());
            produto2.setDescricaoCurta(objeto.getDescricaoCurta());
            produto2.setDescricaoDetalhada(objeto.getDescricaoDetalhada());
            produto2.setEstoque(objeto.getEstoque());
            produto2.setValorCusto(objeto.getValorCusto());
            produto2.setValorVenda(objeto.getValorVenda());
            if (objeto.getCategoria() != null){
                produto2.setCategoria(objeto.getCategoria());
            } 
            if (objeto.getMarca() != null) {
                produto2.setMarca(objeto.getMarca());
            }
            produtoRepository.saveAndFlush(produto2);
            return "Produto Atualizado com sucesso.";
        } catch (Exception e) {
            return "erro";
        } 
    }
    public void excluir(Long id){
        Produto objeto = produtoRepository.findById(id).get();
        produtoRepository.delete(objeto);
    }
}
