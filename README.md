# Sistema Estoque

## Índice
- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
  - [1. Exibição de Produtos](#1-exibição-de-produtos)
  - [2. Registro de Entradas e Saídas](#2-registro-de-entradas-e-saídas)
  - [3. Visualização de Histórico](#3-visualização-de-histórico)
  - [4. Adição de Novos Produtos](#4-adição-de-novos-produtos)
- [Estrutura do Código](#estrutura-do-código)
- [Como Usar](#como-usar)
- [Endpoints da API](#endpoints-da-api)
- [Conclusão](#conclusão)

## Descrição
O Sistema Estoque é uma aplicação web desenvolvida para gerenciar o controle de estoque de produtos. Ele permite que os usuários adicionem, removam e visualizem produtos, além de acompanhar a quantidade disponível em estoque.

## Tecnologias Utilizadas
- **HTML**: Estruturação da interface do usuário.
- **CSS**: Estilização da aplicação.
- **JavaScript**: Lógica de interação e manipulação de dados.
- **Node.js**: Ambiente de execução para o servidor.
- **Express**: Framework para construção de APIs.

## Funcionalidades

### 1. Exibição de Produtos
A aplicação busca e exibe uma lista de produtos disponíveis no estoque. Se não houver produtos cadastrados, uma mensagem informativa é exibida.

### 2. Registro de Entradas e Saídas
Os usuários podem registrar entradas e saídas de produtos:
- **Registrar Entrada**: Permite adicionar uma quantidade ao estoque de um produto.
- **Registrar Saída**: Permite remover uma quantidade do estoque de um produto.

### 3. Visualização de Histórico
Os usuários podem visualizar o histórico de movimentações de um produto, incluindo entradas e saídas, com informações sobre a data e a quantidade.

### 4. Adição de Novos Produtos
Os usuários podem adicionar novos produtos ao estoque, fornecendo um ID, nome e quantidade inicial.

## Estrutura do Código

- **Constantes**: Define a URL da API e elementos do DOM.
- **Funções Assíncronas**:
    - `mostrarMensagem`: Exibe mensagens temporárias para o usuário.
    - `fetchProdutos`: Busca produtos da API e renderiza a lista.
    - `renderProdutos`: Renderiza a tabela de produtos no DOM.
    - `postEntrada`: Registra a entrada de um produto.
    - `postSaida`: Registra a saída de um produto.
    - `verHistorico`: Busca e exibe o histórico de um produto.
    - `atualizarLinha`: Atualiza a quantidade de um produto na tabela.
    
- **Eventos**: Adiciona ouvintes de eventos para botões de entrada, saída e histórico, além de um evento para o formulário de adição de produtos.

## Como Usar
1. Inicie o servidor Node.js que fornece a API.
2. Abra a aplicação em um navegador.
3. Utilize as funcionalidades para gerenciar o estoque de produtos.

## Endpoints da API

A API do Sistema Estoque possui os seguintes endpoints:

### 1. `GET /produtos`
Retorna a lista de todos os produtos disponíveis no estoque.

### 2. `POST /produtos`
Adiciona um novo produto ao estoque. É necessário enviar um JSON com os campos `id`, `nome` e `quantidade`.

### 3. `POST /produtos/:id/entrada`
Registra a entrada de um produto no estoque. É necessário enviar um JSON com o campo `quantidade`.

### 4. `POST /produtos/:id/saida`
Registra a saída de um produto do estoque. É necessário enviar um JSON com o campo `quantidade`.

### 5. `GET /produtos/:id/historico`
Retorna o histórico de movimentações (entradas e saídas) de um produto específico.

## Conclusão
O Sistema Estoque é uma solução eficiente para o gerenciamento de produtos, permitindo um controle preciso das quantidades em estoque e um histórico detalhado das movimentações.

