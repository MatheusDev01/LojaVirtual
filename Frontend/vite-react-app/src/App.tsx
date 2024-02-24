
import { redirect, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import BarraSuperior from './pages/BarraSuperiorIDeslogado'
import { Router } from '@remix-run/router'
import BarraInferior from './pages/BarraInferior'
import PaginaInicialProdutos from './pages/PaginaInicialProdutos'
import LoginCadastro from './pages/LoginCadastro'
import TabelaProduto from './pages/Produtos'
import Sidebar from './pages/sidebar'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import CarrinhoCompra from './pages/CarrinhoCompra'
import { isAuthenticade, isadm } from './pages/Auth'
import { Component } from 'react'
import { JSX } from 'react/jsx-runtime'




const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<PaginaInicialProdutos />} />
    <Route path="/cadastrologin" element={<LoginCadastro />} />
    <Route path="/menu" element={
    isadm() ? (
      <Sidebar/>
    ) : (
      <PaginaInicialProdutos/>
    )
  } />
    <Route path='/CarrinhoCompra' element={<CarrinhoCompra />} />
    </>
    
  )
)


function App() {



  return (

    <>
      <RouterProvider router={router}/>
      <BarraInferior/>
    </>
    
  )
}

export default App
