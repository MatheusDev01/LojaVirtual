import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import BarraSuperiorMenu from "./BarraSuperiorMenu";
import { gettoken } from "./Auth";

function TabelaProduto(){

    React.useEffect(() => {
        try {
            axios.get(url+'/marca/').then((response) => {
              setMarcas(response.data);
            });
          } catch (error) {
            console.error(error);
          }
        }, []);

    const [produtos, setProdutos] = React.useState([]);
    const [marcas, setMarcas] = React.useState([]);
    const [categorias, setCategorias] = React.useState([]);
    const [idAtual, setId] = React.useState('');
    const [acao, setacao] = React.useState('');
    const [str, setStr] = React.useState('');
    const [nomeProdutoAtualizar, setNomeProdutoAtualizar] = React.useState('');
    const [precoCustoAualizar, setPrecoCustoAtualizar] = React.useState('');
    const [precoVendaAtualizar, setPrecoVendaAtualizar] = React.useState('');
    const [estoqueAtualizar, setEstoqueAtualizar] = React.useState('');
    const [descricaoAtualizar, setDescricaoAtualizar] = React.useState('');
    const url = 'http://localhost:8080/api'

    React.useEffect(() => {
        try {
            axios.get(url + '/produto/').then((response) => {
              setProdutos(response.data);
            });
          } catch (error) {
            console.error(error);
          }
        }, []);
   

       
            
            

            React.useEffect(() => {
                try {
                    axios.get(url+'/categoria/').then((response) => {
                      setCategorias(response.data);
                    });
                  } catch (error) {
                    console.error(error);
                  }
                }, []);

    async function getProdutos() {
        try {
          await axios.get(url + '/produto/').then((response) => {
            setProdutos(response.data);
          });
        } catch (error) {
          console.error(error);
        }
      }

    
      async function cadastrarProduto() {
        
        if (acao == "atualizar"){

            const nome = document.getElementById("nomeProdutoA").value;
        const precoCusto = document.getElementById("precoCustoA").value;
        const precoVenda = document.getElementById("precoVendaA").value;
        const estoque = document.getElementById("estoqueA").value;
        //const imagem = document.getElementById("imagemA").value;
        const categoriaSelecionada = document.getElementById("categoriaA").value;
        const marcaSelecionada = document.getElementById("marcaA").value ;
        const descricao = document.getElementById("descricaoA").value;

        var m = marcaSelecionada.toString();
        var idMarca = "";
        for (let i = 0 ; i < m.length ; i++){
            
            if (m[i] == "-"){
                break
            } else {
                idMarca += m[i];
            }
        }
        var c = categoriaSelecionada.toString();
        var idCategoria = "";
        for (let i = 0 ; i < c.length ; i++){
            
            if (c[i] == "-"){
                break
            } else {
                idCategoria += c[i];
            }
        }
        
        
        console.log(nome, precoCusto, precoVenda, estoque, idCategoria, idMarca, descricao);
            

            if (idMarca !== '' && idCategoria !== ''){
                var produtoAtualizado = JSON.stringify( {
                    id: idAtual,
                    descricaoCurta: nome,
                    descricaoDetalhada: descricao,
                    valorCusto: precoCusto,
                    valorVenda: precoVenda,
                    estoque: estoque,
                    marca: {
                        id: idMarca
                    },
                    categoria: {
                        id: idCategoria
                    }
                });
            } else if (idMarca == '' && idCategoria == ''){
                var produtoAtualizado = JSON.stringify( {
                    id: idAtual,
                    descricaoCurta: nome,
                    descricaoDetalhada: descricao,
                    valorCusto: precoCusto,
                    valorVenda: precoVenda,
                    estoque: estoque
            })} else if (idCategoria !== ''){
                var produtoAtualizado = JSON.stringify( {
                    id: idAtual,
                    descricaoCurta: nome,
                    descricaoDetalhada: descricao,
                    valorCusto: precoCusto,
                    valorVenda: precoVenda,
                    estoque: estoque,
                    categoria: {
                        id: idCategoria
                    }
                    })
            } else {
                var produtoAtualizado = JSON.stringify( {
                    id: idAtual,
                    descricaoCurta: nome,
                    descricaoDetalhada: descricao,
                    valorCusto: precoCusto,
                    valorVenda: precoVenda,
                    estoque: estoque,
                    marca: {
                        id: idMarca
                    }
                })
            }
            

            console.log(produtoAtualizado)
            const customConfig = {
                headers: {
                'Content-Type': 'application/json'
                }
            };
            setacao('nulo');
            try {
                axios.put(url + '/produto/', produtoAtualizado, customConfig).then((response) => {
                  console.log(response.data);
                  const str1 = response.data;
                  if(str1.toString() == "Produto Atualizado com sucesso."){
                    $('#ModalProdutoAtualizado').modal()
                  } else {
                    $('#ModalProdutoNaoAtualizado').modal()
                  }
                });
              } catch (error) {
                console.error(error);
              }
              
        } else {
            const nome = document.getElementById("nomeProduto").value;
        const precoCusto = document.getElementById("precoCusto").value;
        const precoVenda = document.getElementById("precoVenda").value;
        const estoque = document.getElementById("estoque").value;
        const imagem = document.getElementById("imagem").value;
        const categoriaSelecionada = document.getElementById("categoria").value;
        const marcaSelecionada = document.getElementById("marca").value ;
        const descricao = document.getElementById("descricao").value;

        var m = marcaSelecionada.toString();
        var idMarca = "";
        for (let i = 0 ; i < m.length ; i++){
            
            if (m[i] == "-"){
                break
            } else {
                idMarca += m[i];
            }
        }
        var c = categoriaSelecionada.toString();
        var idCategoria = "";
        for (let i = 0 ; i < c.length ; i++){
            
            if (c[i] == "-"){
                break
            } else {
                idCategoria += c[i];
            }
        }
        
        
        console.log(nome, precoCusto, precoVenda, estoque, imagem, idCategoria, idMarca, descricao);

        const produtonovo = JSON.stringify( {
            descricaoCurta: nome,
            descricaoDetalhada: descricao,
            valorCusto: precoCusto,
            valorVenda: precoVenda,
            estoque: estoque,
            marca: {
                id: idMarca
            },
            categoria: {
                id: idCategoria
            }
        });
        const customConfig = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        try {
            axios.post(url + '/produto/', produtonovo, customConfig).then((response) => {
              console.log(response.data);
              setStr(response.data);
                let str2 = response.data;
              if(str2.toString() !== ""){
                $('#ModalProdutoCadastrado').modal()
              }
            });
          } catch (error) {
            console.error(error);
          }
            const formData = new FormData();
            const imagefile = document.getElementById("ImagemCadastro").files[0];
            console.log(imagefile);
            // 'fileimage' é o campo que o 'multer' procura o arquivo de imagem.
                formData.append("file", imagefile);
                formData.append("idProduto", str); // cpf junto ao formData.

                axios.put(url + "/api/imagens/", formData, {
                headers: {
                "Content-Type": 'multipart/form-data'
                }
                }).then(response => console.log(response));

        document.getElementById("nomeProduto").value = '';
        document.getElementById("precoCusto").value = '';
        document.getElementById("precoVenda").value = '';
        document.getElementById("estoque").value = '';
        document.getElementById("imagem").value = '';
        document.getElementById("categoria").value = '';
        document.getElementById("marca").value = '';
        document.getElementById("descricao").value = "";
        }

      }

      var descendentes = document.querySelectorAll(".AtualizarProduto");
        for (var i = 0; i < descendentes.length; i++) {
            descendentes[i].addEventListener("click", function(event) {
                let id = event.target.id.toString();
                setId(id);
                setacao('atualizar');
                $('#AtualizarProdutoConfirmacao').modal()    
        })}


        
      function atualizarProduto() {
        
        console.log(idAtual);
        let index = produtos.findIndex(i =>  i.id.toString() === idAtual.toString());
        document.getElementById("nomeProdutoA").value = produtos[index].descricaoCurta;
        document.getElementById("precoCustoA").value = produtos[index].valorCusto;
        document.getElementById("precoVendaA").value = produtos[index].valorVenda;
        document.getElementById("estoqueA").value = produtos[index].estoque;
        document.getElementById("descricaoA").value = produtos[index].descricaoDetalhada;
        console.log(produtos[index].precoCusto)
        
        $('#ModalAtualizar').modal() 
        

      }

      
        var descendentes = document.querySelectorAll(".ExluirProduto");
            for (var i = 0; i < descendentes.length; i++) {
                descendentes[i].addEventListener("click", function(event) {
                    let id = event.target.id.toString();
                    setId(id);
                    console.log(idAtual);
                    $('#ModalProdutoExcluir').modal()
                   
            })
            }

           
     
        function excluirProduto() {
            var token = gettoken();
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            try {
                axios.delete(url + '/produto/' + idAtual, config).then(() => {
                   $('#ModalProdutoExcluido').modal()

                });
              } catch (error) {
                console.error(error);
              }
        }

        function acaof (){
            setacao('nulo');
        }

      
     


    return(

        <>
       

       
                                <div id="ModalProdutoAtualizado" className="modal fade" tabIndex={-1} role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        
                                    <div className="modal-body">
                                        <br></br>
                                        <p style={{textAlign:'center', fontSize:20}}>Produto Atualizado com sucesso.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                <div id="ModalProdutoNaoAtualizado" className="modal fade" tabIndex={-1} role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        
                                    <div className="modal-body">
                                        <br></br>
                                        <p style={{textAlign:'center', fontSize:20}}>Produto não atualizado, tente novamente.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
                                    </div>
                                    </div>
                                </div>
                                </div>


                            <div id="ModalProdutoCadastrado" className="modal fade" tabIndex={-1} role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        
                                    <div className="modal-body">
                                        <br></br>
                                        <p style={{textAlign:'center', fontSize:20}}>Produto Cadastrado com sucesso.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
                                    </div>
                                    </div>
                                </div>
                                </div>


                                <div id="AtualizarProdutoConfirmacao" className="modal fade" tabIndex={-1} role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        
                                    <div className="modal-body">
                                        <br></br>
                                        <p style={{textAlign:'center', fontSize:20}}>Deseja atualizar o Produto?</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={atualizarProduto}>Sim</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={acaof}>Não</button>
                                    </div>
                                    </div>
                                </div>
                                </div>


                                <div id="ModalProdutoExcluir" className="modal fade" tabIndex={-1} role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        
                                    <div className="modal-body">
                                        <br></br>
                                        <p style={{textAlign:'center', fontSize:20}}>Tem certeza que deseja excluir o Produto?</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={excluirProduto}>Sim</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Não</button>
                                    </div>
                                    </div>
                                </div>
                                </div>



                                <div id="ModalProdutoExcluido" className="modal fade" tabIndex={-1} role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        
                                    <div className="modal-body">
                                        <br></br>
                                        <p style={{textAlign:'center', fontSize:20}}>Produto Excluido com sucesso.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
                                    </div>
                                    </div>
                                </div>
                                </div>




    
                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Novo Produto</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Nome</label>
                                <input id="nomeProduto" className="form-control" type="text" placeholder=""/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Preço Custo</label>
                                <input id="precoCusto" className="form-control" type="number" placeholder=""/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Preço Venda</label>
                                <input id="precoVenda" className="form-control" type="number" placeholder=""/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Quantidade</label>
                                <input id="estoque" className="form-control" type="number" placeholder=""/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="imagem">Imagem </label>
                                <br></br>
                                <input  type="file" className="form-control-file" id="ImagemCadastro"/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="categoria" >Categoria</label>
                                <select className="form-control" id="categoria">
                                <option></option>
                                {categorias.map(categoria =>
                                <>
                                <option>{categoria.id} - {categoria.name}</option></>
                                    )}
                                </select>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="Marca">Marca</label>
                                <select className="form-control" id="marca">
                                <option></option>
                                    {marcas.map(marca =>
                                <>
                                <option>{marca.id} - {marca.name}</option></>
                                    )}
                                </select>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="descricao">Descrição do Produto</label>
                                <textarea className="form-control" id="descricao" rows={3}></textarea>
                            </div>
                            </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="submit" className="btn btn-primary" onClick={cadastrarProduto} data-dismiss="modal">Salvar</button>
                    </div>
                    </div>
                </div>
                </div>



                <div className="modal fade" id="ModalAtualizar" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Atualizar Produto</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Nome</label>
                                <input id="nomeProdutoA" className="form-control" type="text" defaultValue={nomeProdutoAtualizar}/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Preço Custo</label>
                                <input id="precoCustoA" className="form-control" type="number" defaultValue={precoCustoAualizar}/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Preço Venda</label>
                                <input id="precoVendaA" className="form-control" type="number" defaultValue={precoVendaAtualizar}/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Quantidade</label>
                                <input id="estoqueA" className="form-control" type="number" defaultValue={estoqueAtualizar}/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="imagemA">Imagem </label>
                                <br></br>
                                <input  type="file" className="form-control-file" id="imagem"/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="categoria" >Categoria</label>
                                <select className="form-control" id="categoriaA">
                                <option></option>
                                {categorias.map(categoria =>
                                <>
                                <option>{categoria.id} - {categoria.name}</option></>
                                    )}
                                </select>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="Marca">Marca</label>
                                <select className="form-control" id="marcaA">
                                <option></option>
                                    {marcas.map(marca =>
                                <>
                                <option>{marca.id} - {marca.name}</option></>
                                    )}
                                </select>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="descricaoA">Descrição do Produto</label>
                                <textarea className="form-control" id="descricaoA" rows={3} defaultValue={descricaoAtualizar}></textarea>
                            </div>
                            </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={acaof}>Cancelar</button>
                        <button type="submit" className="btn btn-primary" onClick={cadastrarProduto} data-dismiss="modal">Salvar</button>
                    </div>
                    </div>
                </div>
                </div>




                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Produtos</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group mr-2">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >Cadastrar</button>
                <button type="button" className="btn btn-info" onClick={getProdutos}>Atualizar</button>
              </div>
              
            </div>
          </div>


        
        
            <table className="table" style={{textAlign:'center'}}>
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Preço Compra</th>
                    <th scope="col">Preço Venda</th>
                    <th scope="col">Imagem</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Estoque</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                </tr>
            </thead>

            <tbody>
               
                {produtos.map(produto => 
                    <tr>
                    <td>{produto.id}</td>
                    <td>{produto.descricaoCurta}</td>
                    <td>{produto.descricaoDetalhada}</td>
                    <td>R$ {produto.valorCusto}</td>
                    <td>R$ {produto.valorVenda}</td>
                    <td>
                        <img style={{width: 30, height: 30 }}  src={`https://storage.googleapis.com/lojavirtual-bucket/${produto.image}`} />
                    </td>
                    <td>{produto.categoria.name}</td>
                    <td>{produto.marca.name}</td>
                    <td>{produto.estoque}</td>
                    <td>
                        <a   href="#">
                        <img className="AtualizarProduto" id={produto.id} style={{ width: 30, height: 30 }} src="https://cdn-icons-png.flaticon.com/128/84/84380.png" />
                        </a>
                    </td>
                    <td  >
                        <a href="#"  >
                        <img className="ExluirProduto" id={produto.id} style={{ width: 35, height: 35 }} src="https://cdn-icons-png.flaticon.com/128/3625/3625005.png" />
                        </a>
                    </td>
                    </tr>
                )}
                   
                
            </tbody>
        </table>
        </main>
        </>
    )
                }

export default TabelaProduto;