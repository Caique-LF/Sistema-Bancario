<h1 align="center">:file_cabinet: Sistema Bancário</h1>

## :memo: Descrição
Projeto de sistema bancário no qual é possível criar, atualizar e excluir contas, fazer saques, depósitos e transferências de valores, consultar saldo e emitir extrato, funcionalidades essas que são acessadas através de rotas HTTP.

Desenvolvido na linguagem JavaScript usando Node.js para instalação de bibliotecas (pacotes) NPM que facilitam e tornam possíveis as interações entre cliente e servidor.

## :books: Funcionalidades
* <b>Listar contas</b>: Nessa funcionalidade, o cliente pode ver todas as contas cadastradas no banco, contas essas que retornam no corpo da resposta no formato JSON.
  - Para obter a resposta da rota, é necessário fazer uma requisição HTTP apontando a porta e passando os parâmetros de rotas e query params, sendo eles que /contas?senha-banco=(senha escolhida pelo desenvolvedor).

        Verbo: GET
        Rota: http://localhost:3000/contas?senha_banco=Cubos123Bank

![alt text](./imagens/listarContas.png)

* <b>Criação de conta Bancária</b>: Essa funcionalidade possibilita a criação de contas, passando informações através do corpo da requisição em formato JSON. Apenas os campos de usuário são informados na requisição; os demais campos como número da conta e saldo são gerados automaticamente pelo sistema. Observe que ao criar a conta, o saldo é 0 (zero).

        Verbo: POST
        Rota: http://localhost:3000/contas
        Informações do usuário que devem ser informadas no corpo da requisição como JSON:

        nome
        cpf
        data_nascimento
        telefone
        e-mail
        senha

![alt text](./imagens/criarContas.png)

* <b>Atualização de usuário de uma conta</b>: Essa funcionalidade possibilita a atualização de dados de usuário de uma conta específica. É necessário informar como parâmetro de rota o número da conta nas quais as atualizações serão incrementadas. Os dados do usuário devem ser informados no corpo da requisição no formato JSON.

        Verbo: PUT
        Rota: http://localhost:3000/contas/2/usuario
        Dados do usuário que devem ser enviados no corpo da requisição:

        nome
        cpf
        data_nascimento
        telefone
        e-mail
        senha

![alt text](./imagens/atualizarContas.png)

* <b>Deletar conta bancária</b>: Essa funcionalidade exclui uma conta bancária da memória do banco. Para usá-la, o cliente deve informar ao servidor o número da conta como parâmetro de rota.

        Verbo: DELETE
        Rota: http://localhost:3000/contas/1

![alt text](./imagens/ExcluirContas.png)

* <b>Depositar</b>: Essa funcionalidade possibilita o depósito de valores em uma conta específica. No corpo da requisição, as informações que devem ser enviadas são o número da conta e o valor a ser depositado.

        Verbo: POST
        Rota: http://localhost:3000/transacoes/depositar
        Dados da transação que devem ser enviados no corpo da requisição:

        numero_conta
        valor

![alt text](./imagens/depositar.png)

* <b>Sacar</b>: Essa funcionalidade possibilita o saque de valores de uma determinada conta que deve ser informada no corpo da requisição, junto com o valor a ser sacado e a senha.

        Verbo: POST
        Rota: http://localhost:3000/transacoes/sacar
        Dados da transação que devem ser enviados no corpo da requisição:

        numero_conta
        valor
        senha

![alt text](./imagens/sacar.png)

* <b>Transferir</b>: Essa funcionalidade possibilita transferir valores de uma conta para outra conta. Para usá-la, devem ser informados no corpo da requisição o número da conta de origem, o número da conta de destino, o valor a ser transferido e a senha da conta de origem.

        Verbo: POST
        Rota: http://localhost:3000/transacoes/transferir
        Dados da transação que devem ser enviados no corpo da requisição:

        numero_conta_origem
        numero_conta_destino
        valor
        senha

![alt text](./imagens/transferirvalor.png)

* <b>Consultar Saldo</b>: Essa funcionalidade torna possível a consulta do saldo de uma conta. A conta deve ser informada na rota, junto com a senha.

        Verbo: GET
        Rota: http://localhost:3000/contas/saldo?numero_conta=2&senha=12345

![alt text](./imagens/saldo.png)

* <b>Emitir extrato</b>: Essa funcionalidade permite emitir todo o histórico de depósitos, saldos e transferências de uma determinada conta. É necessário passar no corpo da requisição as informações, número da conta e senha.

        Verbo: GET
        Rota: http://localhost:3000/contas/extrato?numero_conta=2&senha=12345
        Dados do usuário que devem ser enviados como parâmetros de rota:

        numero_conta
        senha

![alt text](./imagens/emitirExtrato.png)

## :wrench: Tecnologias utilizadas
![Git](https://img.shields.io/badge/Git-E44C30?style=for-the-badge&logo=git&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-FFFF00?style=for-the-badge&logo=javascript&logoColor=000000) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## :rocket: Rodando o projeto
Para rodar o repositório, é necessário cloná-lo e dar o seguinte comando para iniciar o projeto:

```
// Clonando o repositório em sua máquina
git clone git@github.com:Caique-LF/Sistema-Bancario.git

// Navegando até o projeto
cd Sistema-Bancario

// Baixando dependências
npm install

// Iniciando o Servidor
npm run dev
```
