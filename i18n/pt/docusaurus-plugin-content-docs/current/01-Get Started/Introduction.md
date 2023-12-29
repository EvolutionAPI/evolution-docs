---
id: introduction
title: Introdução
hide_title: false
hide_table_of_contents: false
sidebar_label: Introdução
sidebar_position: 1
pagination_label: Introdução
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Comece a explorar a Evolution API.
keywords:
  - Introduction
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/12/2023
  author: mateus
---

Este é um projeto **TOTALMENTE GRATUITO**, com o objetivo de apoiar pequenos comerciantes, empreendedores, profissionais autônomos e pessoas com poder de compra limitado. O objetivo é melhorar os negócios locais ou digitais com uma solução de mensagens WhatsApp™ via API.

## Domínio

Todas as solicitações devem usar o domínio ou o IP da sua instância da API Evolution.

Para a maioria dos usuários, é recomendável usar um subdomínio para manter o domínio principal livre para os seus painéis ou site..


```plaintext
<!-- Usando localhost -->
http://localhost:8080/

<!-- Usando IP -->
http://123.123.12.123:8080/

<!-- Usando subdomínio -->
https://api.seusite.com/
```

Cada chamada possui um endpoint que é a parte final da sua URL, cada ação como `enviar uma mensagem` ou `buscar uma instância` tem um endpoint diferente.

## Métodos RESTful

A Evolution API suporta vários métodos RESTful para interagir com seus dados, fornecendo uma maneira flexível de lidar com diferentes tipos de solicitações. Os principais métodos usados são POST, GET e DELETE.

#### Método POST

O método POST é usado para criar novos dados no servidor. No contexto da Evolution API, ele é normalmente usado para criar novas entradas ou enviar dados para o servidor.

Exemplo de uso com a Evolution API:


```rest
POST /seu-endpoint
```

#### Método GET

O método GET recupera dados do servidor. É usado para buscar registros ou conjuntos de dados na sua instância da Evolution API.

Exemplo de uso com a Evolution API:


```rest
GET /seu-endpoint
```

#### Método DELETE

O método DELETE é usado para remover dados do servidor. Este método permite que você exclua entradas ou dados específicos da sua instância da Evolution API.

Exemplo de uso com a Evolution API:


```rest
DELETE /seu-endpoint
```

## Autenticação

Para consumir nossa API REST, é necessário incluir a `apikey` nos cabeçalhos (headers) da solicitação. Esta é a chave de API que autentica as chamadas e protege sua API contra o uso por pessoas mal-intencionadas para acessar sua API do WhatsApp.

Cada solicitação deve enviar a `apikey` nos cabeçalhos da solicitação.

Se você não enviar o parâmetro ou no caso de uma `apikey` inválida, a resposta da solicitação será um STATUS HTTP 401, como este:


```json showLineNumbers
{
  "status": 401,
  "error": "Unauthorized",
  "response": {
    "message": "Unauthorized"
  }
}
```

### Status de resposta da solicitação

É sempre prudente avaliar o código de resposta para uma chamada feita à Evolution API. Por padrão, seguimos a especificação HTTP. Você pode consultar este link para entender os códigos retornados.

Em resumo, alguns dos códigos que você encontrará na grande maioria das chamadas da API são:

#### 200 OK

Indica que a chamada foi bem-sucedida.

#### 401 Não autorizado

Verifique seu token de API se ele está sendo enviado no cabeçalho, conforme descrito aqui. Além disso, verifique se é um token API v2, pois os tokens emitidos apenas para a API v1 não funcionam nesta versão.

#### 422 Entidade não processável

Não conseguimos processar a entidade enviada em sua solicitação. Verifique a documentação do endpoint e o corpo da resposta para entender os erros que estão causando isso.

#### 429 Muitas solicitações

Suas solicitações não estão sendo aceitas devido ao limite de solicitações.

#### 500 Erro interno do servidor

Ocorreu algum erro em nosso sistema. Entre em contato com nossa equipe especificando o código de sua solicitação que está nos cabeçalhos de sua resposta para que possamos entender o problema e fornecer uma solução.

## Tipo de conteúdo das solicitações

A submissão e coleta de dados da API são feitas usando JSON.

Portanto, em sua solicitação e resposta, o tipo de conteúdo sempre será application/json.

## Objetivo

O conteúdo desta documentação foi projetado para ser de fácil compreensão e implementação, mesmo para usuários que não estão familiarizados com procedimentos técnicos ou sistemas. Foram feitos esforços para ser o mais didático possível, antecipando erros potenciais e sugerindo soluções prováveis.

## Suporte da Comunidade

Para qualquer dúvida, junte-se ao nosso Canal Discord dedicado para pessoas interessadas na Evolution-API. Visite [Evolution-API Discord](https://evolution-api.com/discord) para suporte e discussões na comunidade.


## Recomendações Importantes

Antes de iniciar a instalação, **por favor, leia todas as recomendações antes da instalação**:

1. Este script é baseado na distribuição **DEBIAN, versão 11 LTS 64 bits**.
2. Os testes não foram realizados em outras distribuições, versões ou VPSs além da Hetzner.
3. Uma VPS limpa foi usada para testes, sem outros aplicativos ou serviços instalados, para evitar conflitos não relacionados à Evolution API.
4. **Não é recomendada a instalação local**, independentemente do sistema operacional.
5. **Evite instalações sem o uso de um servidor proxy reverso**. O acesso direto através de IP + Porta (por exemplo, `http://0.0.0.0:8080`) é desencorajado.
6. Embora alguns usuários tenham instalado com sucesso em vários cenários (outros provedores, instalação local, instalação no Windows, uso e acesso sem servidor proxy reverso), esses podem exigir etapas adicionais, como redirecionamento de portas, aplicativos adicionais ou configurações específicas não abordadas neste tutorial.
7. Qualquer método de instalação que se desvie deste tutorial é **POR CONTA E RISCO DO USUÁRIO**.


### Licença

Este aplicativo está protegido sob a **Licença de Uso GNU V3**.

## Visão geral

- A Licença de Uso GNU V3 garante que este aplicativo seja distribuído sob os termos da Licença Pública Geral GNU Versão 3.
- Isso significa que você tem o direito de usar, modificar e distribuir este aplicativo de acordo com os termos estabelecidos na licença.
- A Licença de Uso GNU V3 promove a liberdade de compartilhar e alterar software, garantindo o acesso do usuário ao código-fonte e o direito de exercer seus direitos.

**Por favor, leia atentamente a [Licença Pública Geral GNU Versão 3](https://www.gnu.org/licenses/gpl-3.0.html) para entender seus direitos e obrigações ao usar este aplicativo.**

