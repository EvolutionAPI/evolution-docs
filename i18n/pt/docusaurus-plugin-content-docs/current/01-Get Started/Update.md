---
id: Updates
title: Atualizações
hide_title: false
hide_table_of_contents: false
sidebar_label: Atualizações
sidebar_position: 8
pagination_label: Atualizações
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Para atualizar suas instâncias da Evolution API
keywords:
  - Updates
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/12/2023
  author: matheus
---

Manter sua instância da Evolution API atualizada é crucial para segurança, desempenho e acesso a novos recursos. O método de atualização depende de como você instalou inicialmente a API. Este guia abrange os passos para atualizar sua Evolution API usando Docker Compose e NPM.

:::warning

Antes de atualizar a Evolution, certifique-se de que todas as aplicações integradas realmente funcionam com a Evolution, atualize por sua própria conta e risco.

:::

## Atualização com Docker

Se você inicialmente configurou sua Evolution API usando Docker, siga estas etapas para atualizar:

### Atualização com Docker CLI

Se sua Evolution API foi inicialmente instalada usando Docker Compose via interface de linha de comando (CLI), e não através do Portainer ou qualquer outra ferramenta de gerenciamento de contêineres, siga estas etapas para atualizá-la:

1. **Navegue até o Diretório Docker Compose**: Abra um terminal e vá para o diretório onde está localizado seu arquivo Docker Compose (`docker-compose.yml`).

2. **Baixe a Imagem Mais Recente**: Atualize a imagem da Evolution API para a versão mais recente executando o seguinte comando:


```bash title="CLI"
docker-compose pull atendai/evolution-api:latest
```

3. **Interrompa e Reinicie os Contêineres**: Após baixar a imagem mais recente, pare os contêineres atuais e reinicie-os. Isso pode ser feito usando o seguinte comando:


```bash title="CLI"
docker-compose down && docker-compose up -d

```

## Atualização com Portainer

Se você estiver usando o Portainer para o gerenciamento de contêineres, siga estas etapas para atualizar sua Evolution API:

1. **Acesse o Painel do Portainer**: Abra o painel do Portainer em um navegador da web.

2. **Navegue para Seus Contêineres**: Vá para a seção 'Stacks' onde seu contêiner da Evolution API está listado.


<!-- ![Portainer Interface](/public/images/01-portainer.png) -->

3. **Atualize o Compose**:
   - Localize o campo `image` em sua configuração do Docker Compose.


```yaml title="https://portainer.yourdomain.com/#!/1/docker/stacks/evolution" showLineNumbers
# ... (outros serviços e configurações)

  evolution_api:
    # Atualize a versão da imagem da Evolution API aqui
    # Use 'atendai/evolution-api:latest' para a versão mais recente
    # Ou especifique uma versão específica como 'atendai/evolution-api:v1.6.0'
    # highlight-next-line
    image: atendai/evolution-api:v1.x.x
    networks:
      - your_network

# ... (resto da configuração do Docker Compose)
```

- Atualize o valor para `atendai/evolution-api:latest` para a versão mais recente, ou use `atendai/evolutionapi:v1.x.x` para uma versão específica.
- Após fazer as alterações, clique no botão 'Deploy' no final da janela de edição do Compose.

<!-- ![Portainer Interface](/public/images/02-portainer.png) -->

4. **Verifique a Atualização**: Após recriar o contêiner, verifique se a Evolution API está executando a versão mais recente. Isso geralmente pode ser verificado por meio do ponto de extremidade de versão da API ou dos logs.

:::nota Recomendação para Ambientes de Produção
Para ambientes de produção, é aconselhável especificar uma versão específica da Evolution API (por exemplo, `atendai/evolution-api:v1.x.x`) em vez de usar `latest`.

Essa prática garante estabilidade e previsibilidade, protegendo seu ambiente de produção contra possíveis problemas decorrentes de alterações inesperadas na versão mais recente.
:::

Seguindo essas etapas, você pode garantir que sua Evolution API esteja sempre atualizada usando o Portainer.

## Atualização com NPM

Atualizar sua instalação da Evolution API via NPM envolve várias etapas para garantir uma transição tranquila para a nova versão. Aqui está um guia passo a passo:

1. **Flush e Stop**: Limpa todos os logs do PM2, útil para solucionar problemas após a atualização e interrompe temporariamente a Evolution API para aplicar as atualizações com segurança.


```bash title="CLI"
# Limpe todos os logs do PM2
pm2 flush

# Pare o processo atual da Evolution API
pm2 stop ApiEvolution
```

2. **Reset local repository and pull the latest updates**: Ensures your local codebase is in sync with the latest commit and downloads the latest updates from the repository. Optionally, switch to a specific version if not using the latest. It's recommended for production environments.

```bash title="CLI"
# Reset seu repositório local para o último commit
git reset --hard HEAD

# Faça o pull das últimas atualizações do repositório
git pull

# Para uma versão específica, use 'git checkout main' para a última versão
# ou 'git checkout 1.x.x' para uma versão específica. Exemplo:
# highlight-next-line
git checkout 1.x.x
```
3. **Instalação Limpa**: Remove os `node_modules` existentes para evitar possíveis conflitos com novas dependências e instala as dependências necessárias do Node.js para a versão atualizada.



```bash title="CLI"
# Remova o diretório node_modules atual para garantir uma instalação limpa
rm -rf node_modules

# Instale as dependências com o NPM
npm i

# Reinicie a Evolution API com a versão atualizada
pm2 start ApiEvolution

# Opcionalmente, visualize os logs do PM2 para a Evolution API
pm2 log ApiEvolution
```
