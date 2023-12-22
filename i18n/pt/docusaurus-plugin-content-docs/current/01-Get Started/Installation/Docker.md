---
id: instalação-com-docker
title: Docker
hide_title: false
hide_table_of_contents: false
sidebar_label: Docker
sidebar_position: 1
pagination_label: Docker
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Instale a EvolutionAPI no seu ambiente Docker.
keywords:
  - installation
  - Docker
  - Traefik
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/12/2023
  author: matheus
---

# Docker

:::note Note:

Essas instruções de instalação pressupõem que você já tenha instalado o Docker em sua máquina, você pode encontrar informações sobre como instalar o docker na [Documentação Oficial do Docker](https://docs.docker.com/engine/install/).

:::

EvolutionAPI é Docker-ready e pode ser facilmente implantada com Docker no modo Standalone e Swarm. Mais abaixo você vera alguns exemplos prontos para deploy, veja [o repositório oficial da Evolution API](https://github.com/EvolutionAPI/evolution-api) para mais exemplos de compose além dos exemplos da documentação.

## Deploy usando o comando docker run

:::tip Dica

A instalação via CLI é recomendada para testes ou desenvolvimento e não é recomendada para produção, por isso recomendamos o deploy via [docker compose](#deploy-using-docker-compose) para facilitar a escala, updates e sustentabilidade da aplicação.

:::

A maneira mais rápida de instalar a Evolution com Docker é usando o comando `docker run` via CLI do seu sistema.

```bash title="Linux Command Line Interface" live
docker run --name evolution-api --detach \
-p 8080:8080 \
-e API_KEY=SUA_CHAVE_SUPER_SEGURA \
atendai/evolution-api \
node ./dist/src/main.js
```

Isso executará um contêiner docker expondo o aplicativo na porta 8080 e você poderá começar a testar e solicitar o código QR do WhatsApp usando a o cabeçalho de autenticação `apikey` definido.

Se você quiser ter certeza de que a API está rodando, basta usar seu navegador para acessar http://localhost:8080. Esta deve ser a resposta do seu navegador:

```json title="http://localhost:8080/"
{
    "status": 200,
    "message": "Welcome to the Evolution API, it is working!",
    "version": "1.x.x",
    "documentation": "http://localhost:8080/docs"
}
```

EvolutionAPI tem uma documentação de endpoint Swagger embutida, que você pode usar para ver todos os endpoints possíveis e testar as solicitações acessando `http://localhost:8080/docs`.

## Deploy usando o docker run com volumes

Você também pode implantar usando volumes docker para mapear dados e instâncias do EvolutionAPI para manter os dados persistentes do aplicativo e todas as instâncias do WhatsApp em sua máquina local, evitando problemas com a reinicialização do contêiner usando `docker run` na interface de linha de comando.

Execute o comando a seguir para implementar o EvolutionAPI com os volumes necessários. Este comando mapeia os volumes `evolution_store` e `evolution_instances` para os respectivos diretórios dentro do contêiner.

```bash title="Linux Command Line Interface" live
docker run --name evolution-api --detach \
-p 8080:8080 \
-e API_KEY=SUA_CHAVE_SUPER_SEGURA \
-v evolution_store:/evolution/store \
-v evolution_instances:/evolution/instances \
atendai/evolution-api \
node ./dist/src/main.js
```

`-v Evolution_store:/evolution/store`: Esta opção monta o volume Evolution_store no diretório /evolution/store no contêiner. É usado para armazenar dados persistentes relacionados ao seu aplicativo.

`-v evolution_instances:/evolution/instances`: Isso monta o volume evolution_instances no diretório /evolution/instances. Isso é crucial para manter o estado das suas instâncias do WhatsApp.

:::tip Dica

Para ambientes de produção com altos volumes de requisições veja abaixo o exemplo com docker compose usando o banco de dados MongoDB.

:::

## Deploy usando docker-compose

A implantação da EvolutionAPI usando Docker Compose simplifica a configuração e o gerenciamento de seus contêineres Docker. Ele permite que você defina seu ambiente Docker em um arquivo `docker-compose.yaml` e, em seguida, use um único comando para iniciar tudo.

Esse é o exemplo de docker compose para ambientes standalone, ou seja, um único servidor rodando, para sincronia de dois servidores em paralelo usando o modo Swarm para usuários mais avançados.

### Docker Standalone

O Docker autônomo é adequado quando sua API de evolução será executada em apenas uma máquina e você não precisará em breve de escalabilidade ou outros recursos do Docker Swarm, é a maneira mais conveniente de usar o Docker para a maioria das pessoas.

Primeiro, crie um arquivo `docker-compose.yaml` no diretório do seu projeto. Este arquivo definirá os serviços, redes e volumes para o seu ambiente Docker.

Aqui está um exemplo `docker-compose.yaml` para o modo **Docker Standalone**:

```yaml title="docker-compose.yaml" showLineNumbers
version: '3'

services:
  evolution-api:
    image: atendai/evolution-api
    command: ["node", "./dist/src/main.js"]
    container_name: evolution_api
    restart: always
    ports:
      - "8080:8080"
    environment:
      - API_KEY=SUA_CHAVE_SUPER_SEGURA
    volumes:
      - evolution_store:/evolution/store
      - evolution_instances:/evolution/instances

volumes:
  evolution_store:
  evolution_instances:
```

Navegue até o diretório que contém seu arquivo docker-compose.yml e execute o seguinte comando para iniciar os serviços definidos no arquivo:

```bash title="Linux Command Line Interface"
docker-compose up --detach
```

Este comando fará download das imagens Docker necessárias, criará os serviços, redes e volumes definidos e iniciará o serviço EvolutionAPI.

#### Check Services

After running the docker-compose up command, you should see the logs indicating that the services are up and running.

```bash title="Linux Command Line Interface"
docker logs evolution_api
```

Access the API: Open your browser and navigate to http://localhost:8080 to verify that the EvolutionAPI is operational.

Using Docker Compose streamlines the deployment process, particularly for applications that require multiple containers to work together. It is ideal for development, testing, and staging environments, as well as certain production scenarios.

## Docker Swarm

:::note Swarm mode
These installation instructions assume that you have already installed Docker and activated Swarm mode, you could find information on how to install docker in the [Official Docker Swarm Documentation](https://docs.docker.com/get-started/swarm-deploy/#deploy-to-swarm).
:::

Docker swarm let you to be able to run multiple machine parallel one to the other, this could be useful when you want to scale your operation.

It is a little more advanced since it has to be able to deal with multiple machines, before proceed we really recommend reading [Docker Swarm documentation](https://docs.docker.com/get-started/swarm-deploy/#deploy-to-swarm).

:::warning Docker Network
Make sure that your cluster is configured with a manager node and the networks properly created before proceed with installation.
:::

### Docker Swarm deploy with Traefik

This is an example image with some of the environments variables set for fast configuration with Traefik proxy manager, read the [Traefik documentation](https://doc.traefik.io/traefik/providers/docker/) for more information.

:::note optional resources
Assuming that you wil have an MongoDB and a RabbitMQ container running container running. Read the [optional resources](/docs/01-Get%20Started/Optional%20resources/) section for detailed information.
:::

This example should work for most of use cases, if you want more in-depth over personalized configuration and installation check the [environment variables](/docs/01-Get%20Started/Environment%20variables.md) section.

```yaml title="docker-compose.yaml" showLineNumbers
version: "3.8"

x-variables:
  &variables
    # Server configs
    SERVER_TYPE: "https"
    SERVER_URL: https://replace_with_your_domain.com
    CONFIG_SESSION_PHONE_CLIENT: "RENAME ME WITH YOUR COMPANY NAME"
    # ApiKey Config for authentication High Encryption AES 256 from https://acte.ltd/utils/randomkeygen
    AUTHENTICATION_TYPE: apikey
    AUTHENTICATION_API_KEY: YOUR_SUPER_SECURE_KEY
    # Database 
    DATABASE_ENABLED: "true" 
    DATABASE_CONNECTION_URI: mongodb://yourmongouser:yourmongopassword@mongodb:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true
    DATABASE_CONNECTION_DB_PREFIX_NAME: evdocker
    # RabbitMQ configs
    RABBITMQ_ENABLED: "true"
    RABBITMQ_URI: amqp://guest:guest@rabbitmq:5672
    # Typebot
    TYPEBOT_API_VERSION: "latest" # old | latest
    TYPEBOT_KEEP_OPEN: "false"

services:
  evolution:
    image: atendai/evolution-api:latest
    command: ["node", "./dist/src/main.js"]
    environment:
      <<: *variables
    volumes:
      - evolution_instances:/evolution/instances
      - evolution_store:/evolution/store
    ports:
    - 8080:8080
    networks:
      - public
      - internal
    deploy:
      mode: replicated
      replicas: 1
      labels:
        # Traefik labels for reverse proxy
        traefik.enable: "true"
        traefik.http.routers.evolution.service: "evolution"
        traefik.http.services.evolution.loadbalancer.server.port: 8080
        traefik.http.routers.evolution.rule: "Host(`replace_with_your_domain.com`)"
        traefik.http.routers.evolution.tls.certresolver: "le" # Some users uses https as a router name
        traefik.http.routers.evolution.entrypoints: "websecure"
        traefik.http.routers.evolution.tls: "true"

volumes: 
  evolution_instances:
  evolution_store:

networks:
  public:
    name: traefik_public
    external: true
  internal:
    name: app_network
    external: true
    driver: overlay
```

Now just deploy the compose as a Swarm stack with the following command:

```bash title="CLI"
docker stack deploy -c docker-compose.yaml evolution
```

This will deploy in Swarm mode in ready to scale environment, suited for developers or people who needs more resources.
