import React from 'react';
import './AppPages.css';
import TabelaProduto from './Produtos';
import BarraSuperiorMenu from './BarraSuperiorMenu';
import axios from 'axios';

function Sidebar (){
  const url = 'http://localhost:8080/api'

  
   
 
    const [current, setcurrent] = React.useState(<></>);

    function tabelaProdutos(){
        setcurrent(<TabelaProduto/>);
    }

    return(
        
        <>
         <BarraSuperiorMenu/>
        
       


    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <br></br>
                <a className="nav-link active" onClick={tabelaProdutos} href="#">
                  <span data-feather="home"></span>
                  Produtos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="file"></span>
                  Orders
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="shopping-cart"></span>
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="users"></span>
                  Customers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="bar-chart-2"></span>
                  Reports
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="layers"></span>
                  Integrations
                </a>
              </li>
              <br></br>
            </ul>

            
            
          </div>
        </nav>

        

         

         
                {current}
           
              
       
      </div>
    </div>
            </>
       
    )
}

export default Sidebar;