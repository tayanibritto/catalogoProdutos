Título: Catálogo de Produtos

Descrição: Aplicação front-end utilizando React para exibir um catálogo de produtos. Foram aplicados conceitos de criação de componentes reutilizáveis, uso de JSX, props, state, controle de formulários e ciclo de vida com o hook useEffect.

Tecnologias utilizadas: React.js · JSX (JavaScript eXtension) · HTML5 · Fetch · Node.js

Pré-requisitos: Navegador atualizado (projeto foi testado e funciona no Google Chrome Versão 142.0.7444.163 64 bits - Caso utilize este navegador, recomenda-se tal versão ou superior). Necessita-se de acesso à Internet, pois a página utiliza uma API externa (CRUDCRUD).

Instalação:

Passos para clonar e rodar: git clone https://github.com/tayanibritto/catalogoProdutos.git cd catalogoProdutos abrir index.html no navegador 

Como usar: Será necessário gerar um link de simulador de back-end no https://crudcrud.com. Copie o link gerado no campo em destaque no site e cole no lugar do link expirado disponível no projeto inicial, que é este: https://crudcrud.com/api/ab2e8d8b30194759bf40027ad4fc49bc. Você pode buscar por este link no arquivo no arquivo ./src/App.jsx através do atalho CTRL+F e substituir pelo link que o CRUDCRUD gerou para você. A página funcionará perfeitamente após isso. Só digitar os campos e clicar em "Adicionar Produtos". 
Estrutura do Projeto: 
  src/
    App.jsx
    main.jsx
  .gitattributes
  .gitignore
  eslint.config.js
  index.html
  package-lock.json
  package.json
  vite.config.js

Observações: Por utilizar uma API externa, a página NÃO funcionará corretamente sem acesso à Internet.
