function FormularioProduto(){
    return(
        <form>
            <input type='number' placeholder='id' />
            <input type='text' placeholder='descricaoCurta' />
            <input type='text' placeholder='descricaoDetalhada' />
            <input type='number' placeholder='valorCusto' />
            <input type='number' placeholder='valorVenda' />
            <input type='file' placeholder='image' />
            <input type='text' placeholder='marca' />
            <input type='text' placeholder='categoria' />
            <br></br>
            <input type='button' value='Cadastrar' className="btn btn-primary" />
            <input type='button' value='Alterar' className="btn btn-warning" />
            <input type='button' value='Excluir' className="btn btn-danger" />
        </form>
    )
}

export default FormularioProduto;