import axios from "axios";
import React from "react";
import BarraSuperiorLogado from "./BarraSuperiorLogado";
import { Figure } from "react-bootstrap";
import BarraSuperiorMenu from "./BarraSuperiorMenu";




function PaginaInicialProdutos () {
    const [produtos, setProdutos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const url = 'http://localhost:8080/api'

    React.useEffect(() => {

        try {
            axios.get(url + '/produto/').then((response) => {
              setProdutos(response.data);
              setLoading(false);
            });
          } catch (error) {
            console.error(error);
          }
        }, []);

    return (
        <>
        <BarraSuperiorMenu/>

                                   { loading ?
                                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:100, marginBottom:100}}>
                                        <Figure>
                                        <img src="https://media.giphy.com/media/sxJ1nCeUoNSfe/giphy.gif" width="150" height="150"/>
                                        </Figure>
                                    </div>
                                    : false}
        
            {produtos.map(produto => 

                    <>
                        
                            <div className="card" style={{width: 250, display: "inline-flex", marginLeft: 40, marginRight: 20, marginTop: 25, marginBottom: 10}}>
                            <a href="#" className="nav-link">
                            <img src={`https://storage.googleapis.com/lojavirtual-bucket/${produto.image}`} className="card-img-top" alt="imagem produto"/>
                            <div className="card-body">
                                <h5 className="card-title">{produto.descricaoCurta}</h5>
                                <p className="card-text">R$ {produto.valorVenda}</p>
                                <p className="card-text">{produto.descricaoDetalhada.slice(0,25)}...</p>
                                <a href="#" className="btn btn-primary">Add carrinho</a>
                            </div>
                            </a>
                            </div>
                        
                       
                        </>
                )}
        </>
    )
}

export default PaginaInicialProdutos;
