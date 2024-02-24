import axios from "axios";
import React from "react";
import { Figure } from "react-bootstrap";
import { createBootstrapComponent } from "react-bootstrap/esm/ThemeProvider";
import BarraSuperiorDeslogado from "./BarraSuperiorIDeslogado";
import BarraSuperiorMenu from "./BarraSuperiorMenu";

function LoginCadastro(){
    const [loading, setLoading] = React.useState(false);
    const url = 'http://localhost:8080/api';

    function pesquisacep() {

        var valor = document.getElementById('cep').value
        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep !== "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value="...";
                document.getElementById('bairro').value="...";
                document.getElementById('cidade').value="...";
                document.getElementById('estado').value="...";

                //Cria um elemento javascript.
                

                //Sincroniza com o callback.
                loadcep(cep.toString());
                

            } //end if.
            else {
                //cep é inválido.
                limpa_formulario_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulario_cep();
        }
    }

    function loadcep(cep: string) {
        var urlcep = 'https://viacep.com.br/ws/'+ cep + '/json/';
        fetch(urlcep).then(response => response.json())
        .then(data => {
            document.getElementById('rua').value=(data.logradouro);
            document.getElementById('bairro').value=(data.bairro);
            document.getElementById('cidade').value=(data.localidade);
            document.getElementById('estado').value=(data.uf);
        })
        .catch(err => {
          console.log(err);
          limpa_formulario_cep();
            document.getElementById('cep').value="";
            alert("CEP não encontrado.");
        })
      
         
        // logs [{ name: 'Joker'}, { name: 'Batman' }]
      }


    function limpa_formulario_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('rua').value=("");
        document.getElementById('bairro').value=("");
        document.getElementById('cidade').value=("");
        document.getElementById('estado').value=("");

    }
        function cadastrarCliente() {
            setLoading(true);
            $('#ModalCarregando').modal()
            const nome = document.getElementById("NomeCadastro").value;
            const email = document.getElementById("EmailCadastro").value;
            const cpf = document.getElementById("CPF").value;
            const cep = document.getElementById("cep").value;
            const endereco = document.getElementById("rua").value + document.getElementById("numero").value + document.getElementById("bairro").value;
            const cidade = document.getElementById("cidade").value;
            const estado = document.getElementById("estado").value;
            const senha = document.getElementById("passwordCadastro").value;



            const enderecoCliente = JSON.stringify( {
                name: nome,
                email: email,
                cpf: cpf,
                cep: cep,
                endereco: endereco,
                cidade: cidade,
                estado: estado,
                senha: senha
            });
            const customConfig = {
                headers: {
                'Content-Type': 'application/json'
                }
            };
            try {
                axios.post(url + '/pessoacliente/', enderecoCliente, customConfig).then((response) => {
                  console.log(response.data);
                  setLoading(false);
                    $('#ModalClienteCadastrado').modal()
                  
                });
              } catch (error) {
                console.error(error);
                alert(error);
              }
              
        }

        function login() {
            setLoading(true);
            $('#ModalCarregando').modal()
            const email = document.getElementById("EmailLogin").value;
            const senha = document.getElementById("passwordLogin").value;



            const login = JSON.stringify( {
                email: email,
                senha: senha
            });
            const customConfig = {
                headers: {
                'Content-Type': 'application/json'
                }
            };
            try {
                axios.post(url + '/pessoa-gerenciamento/auth', login, customConfig).then((response) => {
                  console.log(response.data);
                  if (response.data == ""){
                    setLoading(false);
                    $('#ModalClienteLoginErro').modal()
                    console.log("erro");
                    
                    window.localStorage.setItem("isloged","false");
                    window.localStorage.setItem("role","null");
                  } else {
                    setLoading(false);
                    $('#ModalClienteLogin').modal()
                    console.log("ok");
                    window.localStorage.setItem("isloged","true");
                    window.localStorage.setItem("role",response.data);
                  }
                  
                });
              } catch (error) {
                console.error(error);
                alert(error);
              }
              
        }
        




    return (
        <>
        <BarraSuperiorMenu/>

        <div id="ModalClienteCadastrado" className="modal fade" tabIndex={-1} role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        
                                    <div className="modal-body" style={{justifyContent:"center", textAlign:"center"}}>
                                        <br></br>
                                        <img style={{width: 100, height: 100, justifyContent:"center", alignItems:"center"}}src="https://s3-alpha-sig.figma.com/img/bc70/2821/f788667f7598077974049436a4307d58?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OhTyeLczXobfkKuZu3tnl3YQG2u5aU7Juf9jz3OlUakwE2x2ICazny7uXWlCq0Qt6k5MU~MCC7DcdcjKYRx4Dm3ygrMUzYHx37UfxJsBaFI7UBArxWscYzHgMZp8mbWijb1R0ppHNRz4sDiVy0IlqCM2j6KLENTJ-jDbHAtzZYHxfAEH74RSdqWlPCIxYcwS6--1c-zNFJ9BjWEHbtheqY9ry5OVhS~sv9e9Oa~bUIPeYFF13dmGPRhwueHPC-cks5jJoZ-mOWIl9O-XirwTi~fLML6nb8Z0HqPHNVgoIpVHPt7FNpsvN5-Buo6LDg0Xlo5XrX99IByCEWi~atitEQ__" />
                                        <br></br>
                                        <br></br>
                                        <p style={{textAlign:'center', fontSize:20, fontFamily:"Lato", fontWeight:700}}>Cadastro realizado com sucesso!</p>
                                        <p style={{textAlign:'center', fontSize:20, fontFamily:"Lato", fontWeight:400}}>Enviamos um email de confirmação para você.</p>
                                        <p style={{textAlign:'center', fontSize:20, fontFamily:"Lato", fontWeight:400}}>Para iniciar as compras faça login</p>
                                    </div>
                                    <div className="modal-footer">
                                        <a href="/">
                                        <button type="button" id="b" className="btn btn-primary" data-dismiss="modal">Ok</button>
                                        </a>
                                    </div>
                                    </div>
                                </div>
                                </div>




                                <div id="ModalClienteLogin" className="modal fade" tabIndex={-1} role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        
                                    <div className="modal-body" style={{justifyContent:"center", textAlign:"center"}}>
                                        <br></br>
                                        <img style={{width: 100, height: 100, justifyContent:"center", alignItems:"center"}}src="https://s3-alpha-sig.figma.com/img/bc70/2821/f788667f7598077974049436a4307d58?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OhTyeLczXobfkKuZu3tnl3YQG2u5aU7Juf9jz3OlUakwE2x2ICazny7uXWlCq0Qt6k5MU~MCC7DcdcjKYRx4Dm3ygrMUzYHx37UfxJsBaFI7UBArxWscYzHgMZp8mbWijb1R0ppHNRz4sDiVy0IlqCM2j6KLENTJ-jDbHAtzZYHxfAEH74RSdqWlPCIxYcwS6--1c-zNFJ9BjWEHbtheqY9ry5OVhS~sv9e9Oa~bUIPeYFF13dmGPRhwueHPC-cks5jJoZ-mOWIl9O-XirwTi~fLML6nb8Z0HqPHNVgoIpVHPt7FNpsvN5-Buo6LDg0Xlo5XrX99IByCEWi~atitEQ__" />
                                        <br></br>
                                        <br></br>
                                        <p style={{textAlign:'center', fontSize:20, fontFamily:"Lato", fontWeight:700}}>Login realizado com sucesso!</p>
                                    </div>
                                    <div className="modal-footer">
                                        <a href="/">
                                        <button type="button" id="b" className="btn btn-primary" data-dismiss="modal">Ok</button>
                                        </a>
                                    </div>
                                    </div>
                                </div>
                                </div>




                                <div id="ModalClienteLoginErro" className="modal fade" tabIndex={-1} role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        
                                    <div className="modal-body" style={{justifyContent:"center", textAlign:"center"}}>
                                        <br></br>
                                        <p style={{textAlign:'center', fontSize:20, fontFamily:"Lato", fontWeight:700}}>Erro ao tentar realizar o Login!</p>
                                        <p style={{textAlign:'center', fontSize:20, fontFamily:"Lato", fontWeight:400}}>Verifique se o Email e senha estão corretos e tente novamente.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <a href="/cadastrologin">
                                        <button type="button" id="b" className="btn btn-primary" data-dismiss="modal">Ok</button>
                                        </a>
                                    </div>
                                    </div>
                                </div>
                                </div>


                                
                                                                      
                                   
                           


        <div style={{width: '100%', height: '100%', paddingLeft: 90, position:"relative", paddingRight: 90, paddingTop: 44, paddingBottom: 44, background: 'white', justifyContent: 'center', alignItems: 'flex-start', gap: 24, display: 'inline-flex'}}>
                                    { loading ?
                                    <div className="z-3 position-absolute p-5 rounded-3" style={{display:"flex", justifyContent:"center", position:"absolute", alignItems:"center", height:800}}>
                                        <Figure>
                                        <img src="https://media.giphy.com/media/sxJ1nCeUoNSfe/giphy.gif" width="150" height="150"/>
                                        </Figure>
                                    </div>
                                    : false}
            <div >
                <p style={{color:"black", fontSize: 20, fontFamily: "Lato", fontWeight: 600, wordWrap: "break-word"}}>Cadastro</p>
            <form style={{width:400}}>
            <div className="mb-3">
                    <label htmlFor="NomeCadastro" className="form-label">Nome</label>
                    <input  type="txt" className="form-control" required={true} id="NomeCadastro" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="CPF" className="form-label">CPF</label>
                    <input  type="cpf" className="form-control" id="CPF" required={true} aria-describedby="emailHelp"/>
                </div>
                    <div style={{display:"flex", marginBottom:5, marginTop:30}} className="form-group">
                    <label className="col-md-2 control-label" htmlFor="CEP">CEP *</label>
                    <div style={{width:200, marginRight:30}} className="col-md-2">
                        <input id="cep" name="cep" placeholder="Apenas números" className="form-control input-md" required={true}  type="search" maxLength={8} pattern="[0-9]+$"/>
                    </div>
                    <div className="col-md-2">
                        <button type="button" className="btn btn-primary" onClick={pesquisacep}>Pesquisar</button>
                        </div>
                    </div>
                    <div className="form-group">
                    <label className="form-label" htmlFor="prependedtext">Endereço</label>
                    <div style={{width:400, marginBottom:20}} className="col-md-4">
                        <div className="input-group">
                        <span className="input-group-text">Rua</span>
                        <input id="rua" name="rua" className="form-control" placeholder="" required={true}  type="text"aria-describedby="basic-addon3 basic-addon4"/>
                        </div>
                        
                    </div>
                    <div style={{display:"flex", marginBottom:20}}>
                        <div style={{width:150}} className="col-md-4">
                        <div className="input-group">
                        <span className="input-group-text">Nº</span>
                        <input id="numero" name="numero" className="form-control" required={true} placeholder=""   type="text" aria-describedby="basic-addon3 basic-addon4"/>
                        </div>
                        
                    </div>
                    
                    <div className="col-md-4">
                        <div style={{width:250}} className="input-group">
                        <span className="input-group-text">Bairro</span>
                        <input id="bairro" name="bairro" className="form-control" required={true} placeholder=""  type="text" aria-describedby="basic-addon3 basic-addon4"/>
                        </div>
                        
                    </div>
                    </div>

                    </div>

                    <div style={{display:"flex", marginBottom:20}}>
                    <div style={{width:250}} className="col-md-4">
                        <div  className="input-group">
                        <span className="input-group-text">Cidade</span>
                        <input id="cidade" name="cidade" aria-describedby="basic-addon3 basic-addon4" required={true} className="form-control" placeholder=""  readOnly={true} type="text" disabled/>
                        </div>
                        
                    </div>
                    
                    <div className="col-md-4">
                        <div style={{width:150}} className="input-group">
                        <span className="input-group-text">Estado</span>
                        <input id="estado" name="estado" className="form-control" placeholder="" required={true}  readOnly={true} type="text" aria-describedby="basic-addon3 basic-addon4" disabled/>
                        </div>
                        
                    </div>
                    </div>
                <div className="mb-3">
                    <label htmlFor="EmailCadastro" className="form-label">Email</label>
                    <input  type="email" className="form-control" id="EmailCadastro" required={true} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordCadastro" className="form-label">Senha</label>
                    <input type="password" className="form-control" required={true} id="passwordCadastro"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="termosECondicoesC"/>
                    <label className="form-check-label" htmlFor="termosECondicoesC">Concordo com os termos e condições</label>
                </div>
                <button style={{width:400, background: "#4172DC"}} type="button" className="btn btn-primary" onClick={cadastrarCliente}>Cadastrar</button>
                </form>
            </div>


            <div>
            
                    <div style={{ width: 2, height: 730, background: '#D9D9D9' }} />
                
            </div>


            <div >
                <p style={{color:"black", fontSize: 20, fontFamily: "Lato", fontWeight: 600, wordWrap: "break-word"}}>Entrar</p>
            <form style={{width:400}}>
                <div className="mb-3">
                    <label htmlFor="EmailLogin" className="form-label">Email</label>
                    <input type="email" className="form-control" id="EmailLogin" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordLogin" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="passwordLogin"/>
                </div>
                <a href="#">
                    Esqueceu a senha?
                </a>
                <p></p>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="termosECondicoesL"/>
                    <label className="form-check-label" htmlFor="termosECondicoesL">Concordo com os termos e condições</label>
                </div>
                <button style={{width:400, background: "#4172DC"}} type="button" className="btn btn-primary" onClick={login} >Entrar</button>
                </form>
            </div>

        </div>


        </>
    )
}

export default LoginCadastro;