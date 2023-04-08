# Sobre a aplicação

Esta é uma aplicação desenvolvida com a tecnologia `NextJS`, onde o usuário poderá:

```Bash
1 - Cadastrar uma fazenda: selecionando a área (polígono) no mapa
2 - Editar informações da fazenda, bem como sua respectiva área
3 - Excluir a fazenda
```

Segue a estrutura de dados da fazenda:

```TypeScript
type Farm = {
    name: string; // Nome da fazenda
    owner string; // Nome do proprietário
    address: Address; // Endereço``
}

type Address = {
    street: string; // Rua
    neighborhood string; // Bairro
    city: string; // Cidade
    state string; // Estado
    country string; // País
}

```

Ao abrir o modal, os campos de endereço são preenchidos automaticamente, consumindo a API `Geocoding` do Google, porém o usuário ainda assim pode editar estes valores.

As informações estarão disponíveis no `local storage`, ou seja, mesmo que o usuário atualize a aba do navegador, as informações continuarão salvas e o mapa então irá renderizar em tela novamente as fazendas cadastradas anteriormente.

<img src="./public/preview.gif" alt="Preview">

---

<br>

# Instruções para executar a aplicação

## Clone

<br>

Execute o seguinte comando para fazer o clone do repositório:

```Bash
git clone https://github.com/ViniciusAmaralDev/test-bovcontrol.git
```

ou

```Bash
git clone git@github.com:ViniciusAmaralDev/test-bovcontrol.git
```

<br>

## Instale as dependências

<br>

```Bash
npm install
```

ou

```Bash
yarn install
```

<br>

Na raiz do projeto crie o arquivo `.env.local` e adicione as seguintes variáveis:

```TypeScript
// Google Geocoding
// https://developers.google.com/maps/documentation/geocoding/overview?hl=pt-br
NEXT_PUBLIC_GEOCODING_API_KEY // Chave da API
NEXT_PUBLIC_GEOCODING_API_URL // URL da API
```

## Execute o projeto

<br>

```Bash
npm run dev
```

ou

```Bash
yarn dev
```

---

<br>

# Testes unitários

A aplicação dispões de testes unitários para o serviço de `local storage`. A biblioteca de testes usada é o `Jest`.<br>
Abra o terminal na raiz do projeto e execute:

```Bash
yarn test
```

ou

```Bash
npm test
```
