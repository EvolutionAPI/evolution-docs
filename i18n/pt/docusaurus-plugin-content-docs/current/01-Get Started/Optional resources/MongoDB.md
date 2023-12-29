---
id: mongodb
title: MongoDB
hide_title: true
hide_table_of_contents: false
sidebar_label: MongoDB
sidebar_position: 1
pagination_label: MongoDB
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Configure um banco de dados MongoBD em seu ambiente com Evolution API.
keywords:
  - Optional Resources
  - MongoDB
  - Database
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/19/2023
  author: matheus
---

## Configurar um Banco de Dados MongoDB

O MongoDB, um banco de dados NoSQL, é conhecido por seu alto desempenho e escalabilidade. É ideal para lidar com grandes volumes de dados na Evolution API.

Configure as variáveis de ambiente do MongoDB no arquivo `.env` para o Docker ou no arquivo `dev-env.yml` para o NPM da seguinte forma:

```yaml title=".env or dev-env.yml" showLineNumbers
# Defina como true para habilitar o MongoDB.
DATABASE_ENABLED=true
# Sua string de conexão com o MongoDB.
DATABASE_CONNECTION_URI=mongodb://user:password@database_URL/?authSource=admin&readPreference=primary&ssl=false&directConnection=true
# Prefixo para o nome do seu banco de dados.
DATABASE_CONNECTION_DB_PREFIX_NAME=evo
```

## Migração de Dados

A mudança do armazenamento local para o MongoDB não transferirá automaticamente suas instâncias do WhatsApp que estão atualmente sincronizadas com o armazenamento local original.

:::tip Beta: Migração de Dados

Certifique-se de que já tem uma instância do MongoDB em execução com um banco de dados criado.

:::

## Migre seus dados no NPM ou NVM

Pare a execução do PM2:

**Flush and Stop**: Limpa todos os registros do PM2, útil para solução de problemas após a atualização e interrompe temporariamente a Evolution API para aplicar atualizações com segurança.


```bash title="CLI"
# Limpar todos os registros do PM2
pm2 flush

# Parar o processo atual da Evolution API
pm2 stop ApiEvolution
```

**Diretório da Evolution API**: acesse o diretório de instalação com o seguinte comando:

```bash
cd evolution-api
```

**Comando de Migração**: Execute o comando de migração no diretório de instalação:

```bash title="/evolution-api/"
npx evolution-manager api migrate-to-mongo
```

Siga os passos do script e migre instâncias específicas do WhatsApp ou todas as suas instâncias.
