export default function ProdutoCard({ nome, preco, imagem, descricao }) {
    return (   
        <div className="card h-100 w-100">
            <img 
                src={imagem} 
                className="card-img-top rounded align-self-center mt-3" 
                alt={nome} 
                style= {{ width: '200px', height: '200px', objectFit: 'cover'}}
            />
            <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-break">{nome}</h5>
                <p className="card-text text-break">{descricao}</p>
                <p className="card-text text-break">{
                    Number (preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })} </p>
            </div>
        </div>
    )
}