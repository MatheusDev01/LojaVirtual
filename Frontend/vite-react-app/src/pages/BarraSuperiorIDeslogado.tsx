import './AppPages.css';
import Sidebar from "./sidebar";
import React from "react";
import axios from "axios";
import PaginaInicialProdutos from './PaginaInicialProdutos';
import LoginCadastro from './LoginCadastro';
import { Link } from 'react-router-dom';

function BarraSuperiorDeslogado(this: any){

    const [paginaAtual, setPaginaAtual] = React.useState(<></>);
    const [isMenu, setIsmenu] = React.useState(true)
    const [categorias, setCategorias] = React.useState([]);
    const url = 'http://localhost:8080/api'

        function esconderItensBarra(){
            setIsmenu(false)
        }

        function mostrarItensBarra(){
            
        }


        function acessarMenu (){
        setPaginaAtual(<Sidebar/>);
        }

        function acessarPaginaInicial (){
            setPaginaAtual(<PaginaInicialProdutos/>);
            }

            function acessarLoginCadastro (){
                setPaginaAtual(<LoginCadastro/>);
                }

    React.useEffect(() => {
        try {
            axios.get(url+'/categoria/').then((response1) => {
              setCategorias(response1.data);
            });
          } catch (error) {
            console.error(error);
          }
        }, []);


    return (
        <>
        <div style={{ width: '100%', height: '100%', paddingLeft: 80, paddingRight: 90, paddingTop: 12, paddingBottom: 12, background: 'white', justifyContent: 'flex-start', alignItems: 'center', gap: 80, display: 'inline-flex' }}>
            <div style={{ flex: '1 1 0', height: 33, justifyContent: 'flex-start', alignItems: 'center', gap: 6, display: 'flex' }}>
                <img style={{ width: 49, height: 33 }} src="https://s3-alpha-sig.figma.com/img/31df/1436/ba37da19d94a2bf474f4e05419f02fd7?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=klPlyE2LrgIC7DLEk3gyjx58dtIp7KUN3Do1ri46lTW7hCcXdveLqWGR0sBukVlwQmzB8IW3jnxStM5XKH65mE1PpZldhiC1F517JxoT6IcZb-VEIzQMc0bejankosR18AKtZQ-FgbuE44CgE6AGniEpzd7ihTfXH6KQZtrp~IzLfkN~IFIqT2PeVkEUX6M8XaTZjZ4jmzUiDRNipJvo~qv0MspIVVEN2dY~PkAo5ihIAoUhVQpYn1~P4ym4k8vlcndvkrRrY7h9YvPwXVPaoSC~CwTi8p65GJhRafOR4O-wIxEWUEBSkVBXoUhKqbZ89vNB~jzhSudPlZMe43L7Ig__" />
                <div style={{
                    color: 'black',
                    fontSize: 32,
                    fontFamily: 'Lato',
                    fontWeight: '700',
                    lineHeight: 20,
                    wordWrap: 'break-word'
                }}>E-commerce</div>
            </div>
            <div style={{ flex: '1 1 0', height: 24, justifyContent: 'flex-end', alignItems: 'center', gap: 10, display: 'flex' }}>
                <div style={{ height: 24, justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex' }}>
                    <div style={{ width: 24, height: 24, padding: 2, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <a href='#'>
                            <img style={{ width: 22, height: 22 }} src="https://cdn-icons-png.flaticon.com/128/4922/4922972.png" />
                        </a>
                    </div>
                    <div style={{ width: 24, height: 24, padding: 2, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <a href='#'>
                            <img style={{ width: 20, height: 20 }} src="https://cdn-icons-png.flaticon.com/128/87/87413.png" />
                        </a>
                    </div>
                    <div style={{ width: 24, height: 24, paddingTop: 4.06, paddingBottom: 4.66, paddingLeft: 2.29, paddingRight: 4.32, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <div style={{ width: 24, height: 24, padding: 2, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                            <a href='#'>
                                <img style={{ width: 20, height: 20 }} src="https://cdn-icons-png.flaticon.com/128/747/747374.png" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        
  
            </nav>



        <div style={{ width: '100%', height: '100%', paddingLeft: 90, paddingRight: 90, paddingTop: 0, paddingBottom: 15, background: '#262626', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
                
         
                   
                       
                       <div>
                        <a id="menucategorias" className="nav-link" data-toggle="dropdown" href="#"  aria-haspopup="true" aria-expanded="false" style={{ height: 24, justifyContent: 'flex-end', alignItems: 'center', gap: 4, display: 'flex' }}>
                                <img style={{ width: 40, height: 40 }} src="https://icon-library.com/images/white-menu-icon-png/white-menu-icon-png-18.jpg" />
                            
                            <div style={{ paddingRight:0, paddingLeft:0, flex: '1 1 0', color: 'white', fontSize: 20, fontFamily: 'Lato', fontWeight: '400',wordWrap: 'break-word' }}>Categorias</div>
                            </a>
                           
                            <ul id={"listaC"} className="dropdown-menu" >
                                {categorias.map(categoria =>
                                <>
                                <a id={categoria.name} href="#" className="dropdown-item">{categoria.name}</a></>
                                    )}
                                </ul>
                            </div>
                               
                   
                    

                    

                    
                <div style={{ height: 24, justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'flex' }}>
                    <div>
                        <a  className="nav-link" data-toggle="dropdown" href="#"  aria-haspopup="true" aria-expanded="false" style={{ height: 24, justifyContent: 'flex-end', alignItems: 'center', gap: 4, display: 'flex' }}>
                            <img style={{ width: 20, height: 20 }} src="https://flaticons.net/icon.php?slug_category=application&slug_icon=user-login" />
                        
                        <div style={{ paddingLeft: 4, flex: '1 1 0', color: 'white', fontSize: 16, fontFamily: 'Lato', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word' }}>Sign in</div>
                        </a>
                        <ul className="dropdown-menu">
                                <a className="dropdown-item" onClick={mostrarItensBarra} href='/'>Página Inicial</a>
                                <a className="dropdown-item" onClick={esconderItensBarra} href="/menu">Menu</a>
                                <a className="dropdown-item" onClick={mostrarItensBarra} href="/cadastrologin">Cadastro/Login</a>
                                </ul>
                            </div>

                        <div style={{ paddingRight: 50}}></div>
                        <div>
                        <a  className="nav-link" data-toggle="dropdown" href="#"  aria-haspopup="true" aria-expanded="false" style={{ height: 24, justifyContent: 'flex-end', alignItems: 'center', gap: 4, display: 'flex' }}>
                            <img style={{ width: 20, height: 20 }} src="https://cdn-icons-png.flaticon.com/128/5381/5381441.png" />
                            <div style={{ paddingLeft: 4, paddingRight:4 , flex: '1 1 0', color: 'white', fontSize: 16, fontFamily: 'Lato', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word' }}>Carrinho</div>
                        
                        <div style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, background: '#3DC47E', borderRadius: 30, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 4, display: 'inline-flex' }}>
                            <div style={{ width: 8, height: 19,  color: 'white', fontSize: 14, fontFamily: 'Lato', fontWeight: '400', wordWrap: 'break-word' }}>3</div>
                        </div>
                        </a>
                        <ul className="dropdown-menu">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                                <a className="dropdown-item" href="#">Separated link</a>
                                </ul>
                            </div>

                            
                    
                </div>
            </div>
                {paginaAtual}
            </>
    )
}


export default BarraSuperiorDeslogado;
