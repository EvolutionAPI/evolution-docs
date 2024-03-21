---
id: docker-installation
title: Docker
hide_title: false
hide_table_of_contents: false
sidebar_label: Docker
sidebar_position: 1
pagination_label: Docker
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Install EvolutionAPI on Docker environment
# image: https://i.imgur.com/mErPwqL.png
slug: /docker-installation
last_update:
  date: 12/12/2023
  author: matheus
keywords:
  - installation
  - Docker
  - Nginx
---

# Docker

:::note Note:
These installation instructions assume that you have already installed Docker on your machine, you could find information on how to install docker in the [Official Docker Documentation](https://docs.docker.com/engine/install/).
:::

EvolutionAPI is docker ready and can be easily deployed with docker in standalone and swarm mode. [The oficial EvolutionAPI repository](https://github.com/EvolutionAPI/evolution-api) has all the compose needed to install the API.

## Deploy using docker run

:::tip
CLI installation is recommended in fast deploy mostly for tests or development, it should not be used for production, instead we recommend you to [use docker-compose](#deploy-using-docker-compose) for easy of deployment and maintainability.
:::

The fastest way to deploy EvolutionAPI with Docker is using `docker run` in the command line interface.

```bash title="Linux CLI (without MongoDB: recommended for testing)" live
docker run --name evolution-api --detach \
-p 8080:8080 \
-e AUTHENTICATION_API_KEY=YOUR_SUPER_SECURE_AUTHENTICATION_KEY \
atendai/evolution-api \
node ./dist/src/main.js
```

This will run a docker container exposing the application on port 8080 and you could start testing and request the WhatsApp QR code using the authentication variable content with de `apikey` header set.

If you want to make sure that the api is running just use your browser to access http://localhost:8080. This should be your browsers response:

```json title="http://localhost:8080/" 
{
    "status": 200,
    "message": "Welcome to the Evolution API, it is working!",
    "version": "1.x.x",
    "documentation": "http://localhost:8080/docs"
}
```

EvolutionAPI has a in-built Swagger endpoint documentation, you could use to see all the possible endpoints and test the requests by accessing `http://localhost:8080/docs`.

## Deploy using docker run with volumes

:::warning MongoDB Requirement

To ensure optimal performance and scalability, MongoDB is now a required component for deploying the Evolution API. Traditional storage solutions (HDD/SDD-based VPS) may result in `no-sessions` errors under high request volumes due to their limited speed. Transitioning to MongoDB effectively addresses these issues, providing a robust and efficient database solution for handling extensive data loads.

:::

You could also deploy using docker volumes to map EvolutionAPI data and instances to keep persist application data and all the instances of WhatsApp in yor local machine avoiding problems with container restart using `docker run` in the command line interface.

Run the following command to deploy the EvolutionAPI with the necessary volumes. This command maps the `evolution_store` and `evolution_instances` volumes to the respective directories within the container.

```bash title="Linux CLI (without MongoDB: recommended for testing)" live
docker run --name evolution-api --detach \
-p 8080:8080 \
-e AUTHENTICATION_API_KEY=YOUR_SUPER_SECURE_AUTHENTICATION_KEY \
-v evolution_store:/evolution/store \
-v evolution_instances:/evolution/instances \
atendai/evolution-api \
node ./dist/src/main.js
```

`-v evolution_store:/evolution/store`: This option mounts the evolution_store volume to the /evolution/store directory in the container. It is used for storing persistent data related to your application.

`-v evolution_instances:/evolution/instances`: This mounts the evolution_instances volume to the /evolution/instances directory. This is crucial for maintaining the state of your WhatsApp instances.

:::tip

For production environments with high volumes of requests, see the example below with Docker Compose using MongoDB.

:::

## Deploy using docker-compose

Deploying the EvolutionAPI using Docker Compose simplifies the configuration and management of your Docker containers. It allows you to define your Docker environment in a `docker-compose.yaml` file, and then use a single command to start everything.

This is an example of Docker Compose for standalone environments, that is, a single server running, for synchronization of two servers in parallel use Swarm mode, this is for more advanced docker users.

### Docker Standalone

Docker standalone is suited when your evolution API will be executed in only one machine and you will not need soon of scalability or other Docker Swarm resources, is the most convenient way of use Docker for most people.

First, create a `docker-compose.yaml` file in your project directory. This file will define the services, networks, and volumes for your Docker environment.

Here's an example `docker-compose.yaml` for **Docker Standalone** mode:

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
      - AUTHENTICATION_API_KEY=YOUR_SUPER_SECURE_AUTHENTICATION_KEY
    volumes:
      - evolution_store:/evolution/store
      - evolution_instances:/evolution/instances
  mongodb:
    image: mongo:latest
    # Is not recommended to expose ports unless necessary, use docker internal dns name of the container for connection
    # ports:
    #   - 27017:27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME: "root"
      - MONGO_INITDB_ROOT_PASSWORD: "YOUR_SUPER_SECURE_PASSWORD"
      - PUID: "1000"
      - PGID: "1000"
    volumes:
      - mongodb_data:/data/db
      - mongodb_configdb:/data/configdb
volumes:
  evolution_store:
  evolution_instances:
```

Navigate to the directory containing your docker-compose.yml file and run the following command to start the services defined in the file:

```bash title="Linux Command Line Interface"
docker-compose up --detach
```

This command will download the necessary Docker images, create the defined services, networks, and volumes, and start the EvolutionAPI service.

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
Assuming that you wil have an MongoDB and a RabbitMQ container running container running. Read the optional resources section for detailed information.
:::

This example should work for most of use cases, if you want more in-depth over personalized configuration and installation check the [environment variables](https://doc.evolution-api.com/docs/variables) section.

```yaml title="docker-compose.yaml" showLineNumbers
version: "3.8"

x-variables:
  &variables
    # Server configs
    SERVER_TYPE: "https"
    SERVER_URL: https://replace_with_your_domain.com
    CONFIG_SESSION_PHONE_CLIENT: "RENAME ME WITH YOUR COMPANY NAME"
    # ApiKey Config for authentication High Encryption AES 256 from https://acte.ltd/utils/randomkeygen
    AUTHENTICATION_TYPE: "apikey"
    AUTHENTICATION_API_KEY: "YOUR_SUPER_SECURE_KEY"
    # Database 
    DATABASE_ENABLED: "true" 
    DATABASE_CONNECTION_URI: "mongodb://root:YOUR_SUPER_SECURE_PASSWORD@mongodb:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true"
    DATABASE_CONNECTION_DB_PREFIX_NAME: "evdocker"
    # Choose the data you want to save in the application's database or store
    DATABASE_SAVE_DATA_INSTANCE: "true"
    DATABASE_SAVE_DATA_NEW_MESSAGE: "true"
    DATABASE_SAVE_MESSAGE_UPDATE: "true"
    DATABASE_SAVE_DATA_CONTACTS: "true"
    DATABASE_SAVE_DATA_CHATS: "true"
    # RabbitMQ configs
    RABBITMQ_ENABLED: "true"
    RABBITMQ_URI: "amqp://guest:guest@rabbitmq:5672"
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
        traefik.http.routers.evolution.tls.certresolver: "le" # Some users uses letsencrypt as a resolver name, check your Traefik stack
        traefik.http.routers.evolution.entrypoints: "websecure" # Some users uses https as a router name, check your Traefik stack
        traefik.http.routers.evolution.tls: "true"

  mongodb:
    image: mongo:latest
    # Is not recommended to expose ports unless necessary, use docker internal dns name of the container for connection
    # ports:
    #   - 27017:27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME: "root"
      - MONGO_INITDB_ROOT_PASSWORD: "YOUR_SUPER_SECURE_PASSWORD"
      - PUID: "1000"
      - PGID: "1000"
    volumes:
      - mongodb_data:/data/db
      - mongodb_configdb:/data/configdb
    networks:
      - internal
  
  # Express is used to visualize the database content, not obligatory
  # mongo-express:
  #   image: mongo-express
  #   environment:
  #     ME_CONFIG_MONGODB_SERVER: "mongodb"
  #     ME_CONFIG_MONGODB_ADMINUSERNAME: "root"
  #     ME_CONFIG_MONGODB_ADMINPASSWORD: "YOUR_SUPER_SECURE_PASSWORD"
  #     ME_CONFIG_BASICAUTH_USERNAME: "admin"
  #     ME_CONFIG_BASICAUTH_PASSWORD: "admin"
  #   ports:
  #     - "8089:8081"
  #   depends_on:
  #     - mongodb
  #   networks:
  #     - internal      

volumes:
  # Obligatory volumes for mongodb
  mongodb_data:
  mongodb_configdb:
  # Optional volumes for EvolutionAPI for local storage (deprecated)
  # evolution_instances:
  # evolution_store:

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
