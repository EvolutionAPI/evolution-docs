---
sidebar_position: 1
description: Guide for install EvolutionAPI on Docker environment
---

# Docker

:::note Note:
These installation instructions assume that you have already installed Docker on your machine, you could find information on how to install docker in the [Official Docker Documentation](https://docs.docker.com/engine/install/).
:::

EvolutionAPI is docker ready and can be easily deployed with docker in standalone and swarm mode. [The oficial EvolutionAPI repository](https://github.com/EvolutionAPI/evolution-api) has all the compose needed to install the API.

## Deploy using docker run

:::info
CLI installation is recommended in fast deploy mostly for tests or development, it should not be used for production, instead we recommend you to [use docker-compose](#deploy-using-docker-compose) for easy of deployment and maintainability.
:::

The fastest way to deploy EvolutionAPI with Docker is using `docker run` in the command line interface.

```bash
docker run --name evolution-api \
-p 8080:8080 \
-e API_KEY=YOUR_SUPER_SECURE_AUTHENTICATION_KEY \
atendai/evolution-api \
node ./dist/src/main.js
```

This will run a docker container exposing the application on port 8080 and you could start testing and request the WhatsApp QR code using the authentication variable content with de `apikey` header set.

If you want to make sure that the api is running just use your browser to access http://localhost:8080. This should be your browsers response:

```json
{
    "status": 200,
    "message": "Welcome to the Evolution API, it is working!",
    "version": "1.x.x",
    "documentation": "http://localhost:8080/docs"
}
```

EvolutionAPI has a in-built Swagger endpoint documentation, you could use to see all the possible endpoints and test the requests by accessing `http://localhost:8080/docs`.

## Deploy using docker run with volumes

You could also deploy using docker volumes to map EvolutionAPI data and instances to keep persist application data and all the instances of WhatsApp in yor local machine avoiding problems with container restart using `docker run` in the command line interface.

Run the following command to deploy the EvolutionAPI with the necessary volumes. This command maps the `evolution_store` and `evolution_instances` volumes to the respective directories within the container.

```bash
docker run --name evolution-api \
-p 8080:8080 \
-e API_KEY=YOUR_SUPER_SECURE_AUTHENTICATION_KEY \
-v evolution_store:/evolution/store \
-v evolution_instances:/evolution/instances \
atendai/evolution-api \
node ./dist/src/main.js
```

`-v evolution_store:/evolution/store`: This option mounts the evolution_store volume to the /evolution/store directory in the container. It is used for storing persistent data related to your application.

`-v evolution_instances:/evolution/instances`: This mounts the evolution_instances volume to the /evolution/instances directory. This is crucial for maintaining the state of your WhatsApp instances.

## Deploy using docker-compose

Deploying the EvolutionAPI using Docker Compose simplifies the configuration and management of your Docker containers. It allows you to define your Docker environment in a `docker-compose.yml` file, and then use a single command to start everything.

### Create a docker-compose file

First, create a `docker-compose.yml` file in your project directory. This file will define the services, networks, and volumes for your Docker environment.

Here's an example `docker-compose.yml` for EvolutionAPI:

```yaml
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

Navigate to the directory containing your docker-compose.yml file and run the following command to start the services defined in the file:

```bash
docker-compose up --detach
```

This command will download the necessary Docker images, create the defined services, networks, and volumes, and start the EvolutionAPI service.

#### Check Services

After running the docker-compose up command, you should see the logs indicating that the services are up and running.

```bash
docker logs evolution_api
```

Access the API: Open your browser and navigate to http://localhost:8080 to verify that the EvolutionAPI is operational.

Using Docker Compose streamlines the deployment process, particularly for applications that require multiple containers to work together. It is ideal for development, testing, and staging environments, as well as certain production scenarios.

## Docker Swarm

:::note Swarm mode:
These installation instructions assume that you have already installed Docker and activated Swarm mode, you could find information on how to install docker in the [Official Docker Swarm Documentation](https://docs.docker.com/get-started/swarm-deploy/#deploy-to-swarm).
:::

Docker swarm let you to be able to run multiple machine parallel one to the other, this could be useful when you want to scale your operation.

It is a little more advanced since it has to be able to deal with multiple machines, before proceed we really recommend reading [Docker Swarm documentation](https://docs.docker.com/get-started/swarm-deploy/#deploy-to-swarm).

:::info Docker Network
Make sure that your cluster is configured with a manager node and the networks properly created before proceed with installation.
:::

### Docker Swarm deploy with Traefik

This is an example image with some of the environments variables set for fast configuration with Traefik proxy manager, read the [Traefik documentation](https://doc.traefik.io/traefik/providers/docker/) for more information.

:::note optional resources
Assuming that you wil have an MongoDB and a RabbitMQ container running container running. Read the [optional resources](/docs/01-Get%20Started/04-optional-resources.md) section for detailed information.
:::

This example should work for most of use cases, if you want more in-depth over personalized configuration and installation check the [environment variables](/docs/01-Get%20Started/03-Environment%20Variables.md) section.

```yaml
version: "3.8"

x-variables:
  &variables
    SUBDOMAIN: evo # This will be the subdomain in which the application will run
    DOMAIN: replace_with_your_domain.com
    # Server configs
    SERVER_TYPE: "https"
    SERVER_URL: https://${SUBDOMAIN}.${DOMAIN:-localhost}.com.br
    CONFIG_SESSION_PHONE_CLIENT: "RENAME ME WITH YOUR COMPANY NAME"
    # ApiKey Config for authentication
    AUTHENTICATION_TYPE: apikey
    AUTHENTICATION_API_KEY: YOUR_SUPER_SECURE_KEY
    # Database 
    DATABASE_ENABLED: "true" 
    DATABASE_CONNECTION_URI: mongodb://root:root@mongodb:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true
    DATABASE_CONNECTION_DB_PREFIX_NAME: evdocker
    # RabbitMQ configs
    RABBITMQ_ENABLED: "true"
    RABBITMQ_URI: amqp://guest:guest@rabbitmq:5672
    # Redis (As of version 1.6.0 still in beta for multi-session, but you can turn on in single session mode)
    REDIS_ENABLED: "false" # Mude para true caso for usar redis
    REDIS_URI: redis://redis:6379
    REDIS_PREFIX_KEY: "evdocker"

services:
  evolution:
    image: atendai/evolution-api:latest
    command: ["node", "./dist/src/main.js"]
    environment:
      <<: *variables
    volumes:
      - evolution_instances_instances:/evolution/instances
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
        traefik.enable: true
        traefik.http.routers.evolution.service: "evolution"
        traefik.http.services.evolution.loadbalancer.server.port: 8080
        traefik.http.routers.evolution.rule: "Host(`${SUBDOMAIN:-evo}.${DOMAIN:-localhost}`)"
        traefik.http.routers.evolution.tls.certresolver: "le" # Some users uses https as a router name
        traefik.http.routers.evolution.entrypoints: "websecure"
        traefik.http.routers.evolution.tls: true

volumes: 
  evolution_instances:
  evolution_data:

networks:
  public:
    name: traefik_public
    external: true
  internal:
    name: app_network
    external: true
    driver: overlay
```
