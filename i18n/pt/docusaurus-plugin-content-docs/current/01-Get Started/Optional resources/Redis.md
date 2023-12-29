---
id: redis
title: Redis
hide_title: true
hide_table_of_contents: false
sidebar_label: Redis
sidebar_position: 4
pagination_label: Redis
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Configure um Redis em seu ambiente com a API Evolution.
keywords:
  - Optional Resources
  - Redis
  - Database
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/19/2023
  author: matheus
---

## Configurando o Cache com Redis

:::warning Descontinuação do Redis

O Redis será descontinuado nas futuras versões da Evolution API; não recomendamos mais a instalação do Redis.

:::

O Redis é um armazenamento de estrutura de dados em memória, usado como banco de dados, cache e message broker. Ele suporta estruturas de dados como strings, hashes, listas, conjuntos e muito mais. Incorporar o Redis pode melhorar significativamente o desempenho da Evolution API, permitindo um acesso mais rápido aos dados e um armazenamento em cache eficiente.

Configure as variáveis de ambiente do Redis no arquivo `.env` para o Docker ou no arquivo `dev-env.yml` para o NPM da seguinte forma:


```yaml title=".env or dev-env.yml" showLineNumbers
# Defina como true para habilitar o Redis.
REDIS_ENABLED=false
# URI do seu servidor Redis.
REDIS_URI=redis://redis:6379
# Prefixo chave para os dados do Redis.
REDIS_PREFIX_KEY=evo
```
