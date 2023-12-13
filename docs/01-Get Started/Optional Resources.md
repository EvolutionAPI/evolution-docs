---
sidebar_position: 3
description: Guide for setup optional server resources.
---

# Optional Resources

Evolution API can be enhanced with additional resources to improve reliability and speed. Below are configurations for MongoDB, Redis, and RabbitMQ.

## MongoDB

:::warning Data Migration Alert
Switching from local storage to MongoDB will not automatically transfer your WhatsApp instances that are currently synchronized with the original local storage. As a result, all existing instances will lose their data and will require re-synchronization.
:::

MongoDB, a NoSQL database, is known for high performance and scalability. It's ideal for handling large data volumes in the Evolution API.

Set the MongoDB environment variables in the `.env` for Docker or the `dev-env.yml` for NPM file as follows:

```yaml title=".env or dev-env.yml" showLineNumbers
# Set to true to enable MongoDB.
DATABASE_ENABLED=true
# Your MongoDB connection string.
DATABASE_CONNECTION_URI=mongodb://user:password@database_URL/?authSource=admin&readPreference=primary&ssl=false&directConnection=true
# Prefix for your database name.
DATABASE_CONNECTION_DB_PREFIX_NAME=evo
```

## Redis

Redis is an in-memory data structure store, used as a database, cache, and message broker. It supports data structures such as strings, hashes, lists, sets, and more. Incorporating Redis can significantly improve the performance of Evolution API by enabling faster data access and efficient caching.

Set the Redis environment variables in the `.env` for Docker or the `dev-env.yml` for NPM file as follows:

```yaml title=".env or dev-env.yml" showLineNumbers
# Set to true to enable Redis.
REDIS_ENABLED=false
# Your Redis server URI.
REDIS_URI=redis://redis:6379
# Prefix key for Redis data.
REDIS_PREFIX_KEY=evo
```


## RabbitMQ
RabbitMQ is an open-source message broker software that facilitates efficient communication between different parts of a distributed application or between different applications altogether. RabbitMQ is used for secure and reliable message passing between different parts of an application.

```yaml title=".env or dev-env.yml" showLineNumbers
# Set to true to enable RabbitMQ.
RABBITMQ_ENABLED=true
# Connection URI for RabbitMQ.
RABBITMQ_URI=amqp://guest:guest@rabbitmq:5672
```

:::note
If you want more in-depth over personalized configuration and installation check the [environment variables](/docs/01-Get%20Started/Environment%20Variables.md) section.
:::