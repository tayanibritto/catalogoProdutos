import { useState, useEffect } from 'react';
import ProdutoCard from './components/ProdutoCard';

const API_URL = 'https://crudcrud.com/api/ab2e8d8b30194759bf40027ad4fc49bc/produtos';

function App() {

  const [produtos, setProdutos] = useState([]);

  //Formulário
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');
  const [descricao, setDescricao] = useState('');

  //Feedback ao usuário
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  //Buscar dados quando o componente for montado
  useEffect(() => {
    setCarregando(true); //Iniciar carregamento
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao buscar produtos');
        return res.json(); 
      })
      .then(dados => setProdutos(dados))
      .catch(erro => {
        console.error('Erro ao buscar produtos:', erro);
        setErro('Erro ao carregar produtos. Tente novamente mais tarde.');
    })
      .finally(() => setCarregando(false)); //Finalizar carregamento
  }, []);

  //Adicionar novo produto
  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setErro('');

    //Validação básica dos campos
    if (!nome.trim() || !descricao.trim()) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    const precoNumero = Number(preco);
    if (Number.isNaN(precoNumero) || precoNumero <= 0) {
      setErro('Informe um preço válido (maior que 0).');
      return;
    }

  //Criar objeto do novo produto
    const novoProduto = {
      nome: nome.trim(),
      preco: precoNumero,
      imagem: imagem.trim() || 'https://placehold.co/600x400/png', //aceita a url da imagem e, caso não tenha, coloca uma imagem padrão
      descricao: descricao.trim()
    };

    try {
      setCarregando(true);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto),
      });

      if (!res.ok) {
        const texto = await res.text();
        console.error('Resposta da API:', res.status, ':', texto);
        throw new Error('Falha ao adicionar produto');
      }

    //API retorna objeto com ID
      const produtoAdicionado = await res.json();
      setProdutos((prevProdutos) => [...prevProdutos, produtoAdicionado]);

    //Limpar formulário
      setNome('');
      setPreco('');
      setImagem('');
      setDescricao('');
    }

    catch (erro) {
      console.error('Erro ao adicionar produto:', erro);
      setErro('Não foi possível adicionar o produto. Tente novamente mais tarde.');
    }

    finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <div className="container-sm shadow-lg p-3 mb-5 bg-body-tertiary rounded mt-5">
        <h1 className="text-center mt-5 text-primary">Catálogo de Produtos</h1>
        <p className="text-center mt-5 text-secondary">Adicione novos produtos ao catálogo preenchendo os campos abaixo:</p>
        <form onSubmit={handleSubmit} className="mt-5 mb-5 lg:p-5">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nome (obrigatório):</span>
            <input type="text" className="form-control" placeholder="Digite o nome do produto" aria-label="Nome" aria-describedby="basic-addon1" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Preço (R$) (obrigatório):</span>
            <input type="number" className="form-control" placeholder="Digite o preço do produto" aria-label="Preço" aria-describedby="basic-addon1" value={preco} onChange={(e) => setPreco(e.target.value)} required />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Descrição (obrigatório):</span>
            <input type="text" className="form-control" placeholder="Digite a descrição do produto" aria-label="Descrição" aria-describedby="basic-addon1" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Imagem (URL):</span>
            <input type="url" className="form-control" placeholder="Copie e cole a URL aqui" aria-label="Imagem" aria-describedby="basic-addon1" value={imagem} onChange={(e) => setImagem(e.target.value)} />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary rounded mt-5">Adicionar Produto</button>
          </div>
          {carregando && <p className="text-center mt-3 text-info alert alert-info" role="info">Carregando... Aguarde...</p>}
        </form>
      </div>

      <div className="container-sm shadow-lg p-3 mb-5 bg-body-tertiary rounded mt-5">
        <h1 className="text-center mt-5 text-primary mb-5">Produtos Disponíveis</h1>
        {erro && <p className="text-center mt-3 text-danger alert alert-danger" role="alert">{erro}</p>}
        <div className="row">
            {produtos.map((produto) => (
              <div className="col-sm-1 col-md-4 col-lg-3 mb-4 d-flex justify-content-center" key={produto._id}>
                <ProdutoCard {...produto} />
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default App
