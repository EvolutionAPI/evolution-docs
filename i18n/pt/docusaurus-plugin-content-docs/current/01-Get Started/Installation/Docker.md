---
id: docker-installation
title: Docker
hide_title: false
hide_table_of_contents: false
sidebar_label: Docker
sidebar_position: 1
pagination_label: Docker
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Instale o EvolutionAPI no ambiente Docker
keywords:
  - installation
  - Docker
  - Nginx
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/12/2023
  author: matheus
---

# Docker

:::note Nota:
Estas instruções de instalação pressupõem que você já instalou o Docker em sua máquina. Você pode encontrar informações sobre como instalar o Docker na [Documentação Oficial do Docker](https://docs.docker.com/engine/install/).
:::

O EvolutionAPI está pronto para o Docker e pode ser facilmente implantado com o Docker no modo autônomo e no modo swarm. [O repositório oficial do EvolutionAPI](https://github.com/EvolutionAPI/evolution-api) possui todos os arquivos de composição necessários para instalar a API.

## Implante usando docker run

:::tip observação
A instalação por CLI é recomendada para implantação rápida, principalmente para testes ou desenvolvimento, não deve ser usada em produção. Em vez disso, recomendamos que você use o docker-compose para facilitar a implantação e manutenção.
:::

A maneira mais rápida de implantar o EvolutionAPI com o Docker é usar `docker run` na interface de linha de comando.

```bash title="Linux Command Line Interface" live
docker run --name evolution-api --detach \
-p 8080:8080 \
-e API_KEY=YOUR_SUPER_SECURE_AUTHENTICATION_KEY \
atendai/evolution-api \
node ./dist/src/main.js
```
Isso executará um contêiner Docker expondo a aplicação na porta 8080, e você pode começar a testar e solicitar o código QR do WhatsApp usando o conteúdo da variável de autenticação com o cabeçalho `apikey` definido.

Se você deseja garantir que a API esteja em execução, basta usar seu navegador para acessar http://localhost:8080. Esta deve ser a resposta do seu navegador:

```json title="http://localhost:8080/" 
{
    "status": 200,
    "message": "Welcome to the Evolution API, it is working!",
    "version": "1.x.x",
    "documentation": "http://localhost:8080/docs"
}
```

O EvolutionAPI possui uma documentação de endpoint Swagger integrada que você pode usar para ver todos os endpoints possíveis e testar as solicitações acessando `http://localhost:8080/docs`.

## Implantação usando docker run com volumes

Você também pode implantar usando volumes do Docker para mapear os dados e instâncias do EvolutionAPI e manter os dados da aplicação e todas as instâncias do WhatsApp em sua máquina local, evitando problemas com a reinicialização do contêiner usando `docker run` na interface de linha de comando.

Execute o seguinte comando para implantar o EvolutionAPI com os volumes necessários. Este comando mapeia os volumes `evolution_store` e `evolution_instances` para os respectivos diretórios dentro do contêiner.

```bash title="Linux Command Line Interface" live
docker run --name evolution-api --detach \
-p 8080:8080 \
-e API_KEY=YOUR_SUPER_SECURE_AUTHENTICATION_KEY \
-v evolution_store:/evolution/store \
-v evolution_instances:/evolution/instances \
atendai/evolution-api \
node ./dist/src/main.js
```

`-v evolution_store:/evolution/store`: Esta opção monta o volume evolution_store no diretório /evolution/store no contêiner. É usado para armazenar dados persistentes relacionados à sua aplicação.

`-v evolution_instances:/evolution/instances`: Isso monta o volume evolution_instances no diretório /evolution/instances. Isso é crucial para manter o estado de suas instâncias do WhatsApp.

:::tip observação

Para ambientes de produção com alto volume de solicitações, veja o exemplo abaixo com o Docker Compose usando o MongoDB.

:::

Implantar o EvolutionAPI usando o Docker Compose simplifica a configuração e o gerenciamento de seus contêineres Docker. Isso permite que você defina seu ambiente Docker em um arquivo `docker-compose.yaml` e, em seguida, use um único comando para iniciar tudo.

Este é um exemplo do Docker Compose para ambientes autônomos, ou seja, um único servidor em execução. Para sincronização de dois servidores em paralelo, use o modo Swarm, que é para usuários Docker mais avançados.

### Docker Standalone

O Docker Standalone é adequado quando sua API de evolução será executada apenas em uma máquina e você não precisará em breve de escalabilidade ou outros recursos do Docker Swarm. É a maneira mais conveniente de usar o Docker para a maioria das pessoas.

Primeiro, crie um arquivo `docker-compose.yaml` em seu diretório de projeto. Este arquivo definirá os serviços, redes e volumes para seu ambiente Docker.

Aqui está um exemplo de `docker-compose.yaml` para o modo **Docker Standalone**:

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
      - API_KEY=YOUR_SUPER_SECURE_AUTHENTICATION_KEY
    volumes:
      - evolution_store:/evolution/store
      - evolution_instances:/evolution/instances

volumes:
  evolution_store:
  evolution_instances:
```

Navegue até o diretório que contém seu arquivo docker-compose.yaml e execute o seguinte comando para iniciar os serviços definidos no arquivo:

```bash title="Linux Command Line Interface"
docker-compose up --detach
```

Este comando irá baixar as imagens Docker necessárias, criar os serviços, redes e volumes definidos e iniciar o serviço EvolutionAPI.

#### Verificar Serviços

Após executar o comando docker-compose up, você deve ver os logs indicando que os serviços estão em execução.

```bash title="Linux Command Line Interface"
docker logs evolution_api
```

Acesse a API: Abra seu navegador e acesse http://localhost:8080 para verificar se o EvolutionAPI está operacional.

O uso do Docker Compose simplifica o processo de implantação, especialmente para aplicativos que requerem vários contêineres que funcionam juntos. É ideal para ambientes de desenvolvimento, testes e preparação, bem como para cenários de produção específicos.

## Docker Swarm

O Docker Swarm permite que você execute várias máquinas em paralelo, o que pode ser útil quando você deseja escalar suas operações.

É um pouco mais avançado, pois lida com várias máquinas. Antes de prosseguir, recomendamos que você leia a [documentação do Docker Swarm](https://docs.docker.com/get-started/swarm-deploy/#deploy-to-swarm).

:::warning Rede do Docker
Certifique-se de que seu cluster esteja configurado com um nó gerenciador e que as redes estejam corretamente criadas antes de prosseguir com a instalação.
:::

### Implantação do Docker Swarm com Traefik

Este é um exemplo de imagem com algumas das variáveis de ambiente definidas para configuração rápida com o Traefik proxy manager. Leia a [documentação do Traefik](https://doc.traefik.io/traefik/providers/docker/) para obter mais informações.

:::note Recursos opcionais
Supondo que você tenha um contêiner MongoDB e um contêiner RabbitMQ em execução. Consulte a seção de recursos opcionais para obter informações detalhadas.
:::

Este exemplo deve funcionar para a maioria dos casos de uso. Se você deseja uma configuração mais detalhada ou personalizada, verifique a seção de variáveis de ambiente.

```yaml title="docker-compose.yaml" showLineNumbers
version: "3.8"

x-variables:
  &variables
    # Configurações do servidor
    SERVER_TYPE: "https"
    SERVER_URL: https://replace_with_your_domain.com
    CONFIG_SESSION_PHONE_CLIENT: "RENAME ME WITH YOUR COMPANY NAME"
    # Configuração da ApiKey para autenticação com criptografia AES 256 https://acte.ltd/utils/randomkeygen
    AUTHENTICATION_TYPE: apikey
    AUTHENTICATION_API_KEY: YOUR_SUPER_SECURE_KEY
    # Banco de Dados 
    DATABASE_ENABLED: "true" 
    DATABASE_CONNECTION_URI: mongodb://yourmongouser:yourmongopassword@mongodb:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true
    DATABASE_CONNECTION_DB_PREFIX_NAME: evdocker
    # Configurações do RabbitMQ
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
       # Etiquetas do Traefik para proxy reverso
        traefik.enable: "true"
        traefik.http.routers.evolution.service: "evolution"
        traefik.http.services.evolution.loadbalancer.server.port: 8080
        traefik.http.routers.evolution.rule: "Host(`replace_with_your_domain.com`)"
        traefik.http.routers.evolution.tls.certresolver: "le" # Alguns usuários usam https como nome do roteador
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

Agora basta implantar o compose como um stack Swarm com o seguinte comando:

```bash title="CLI"
docker stack deploy -c docker-compose.yaml evolution
```

Isso vai implantar no modo Swarm em um ambiente pronto para escalabilidade, adequado para desenvolvedores ou pessoas que precisam de mais recursos.
