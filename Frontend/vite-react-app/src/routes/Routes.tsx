import { BrowserRouter, Route } from "react-router-dom";
import paginaInicialProdutos from "../pages/PaginaInicialProdutos";


function Routes1 () {
    return(
        <BrowserRouter>
            <Route Component = { paginaInicialProdutos }  path="/PaginaInicial"/>
        </BrowserRouter>
    )
 }
 
 export default Routes1;