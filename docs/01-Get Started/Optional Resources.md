---
id: optional-resources
title: Optional Resources
hide_title: false
hide_table_of_contents: false
sidebar_label: Optional resources
sidebar_position: 3
pagination_label: Optional resources
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Guide for setup optional server resources.
keywords:
  - Optional Resources
  - Redis
  - RabbitMQ
  - MongoDB
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/12/2023
  author: matheus
---

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

:::warning Deprecation of Redis

Redis will be deprecated in future versions of Evolution API, we do not recommend Redis installation anymore.

:::

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

## Activating RabbitMQ

To effectively utilize RabbitMQ with the Evolution API for managing WhatsApp instances, it's essential to activate RabbitMQ on each individual WhatsApp instance. This activation allows each instance to start receiving and processing AMQP (Advanced Message Queuing Protocol) queue requests that are specific to that particular WhatsApp instance.

In other words, for each WhatsApp instance where you want to use RabbitMQ, you need to ensure that RabbitMQ integration is enabled. This setup will allow the instance to communicate with the RabbitMQ server and handle its queue of messages and requests. Enabling RabbitMQ on each instance is crucial for proper distribution and management of messaging tasks across different WhatsApp instances in your system.

### RabbitMQ setup for an individual instance

To configure RabbitMQ for individual WhatsApp instances in the Evolution API, you can use the following endpoint:

```plaintext title="POST"
{{baseUrl}}/rabbitmq/set/{{instance_name}}
```

This endpoint allows you to enable RabbitMQ and specify which events each WhatsApp instance should subscribe to in the AMQP queue. Below is an example of the JSON body for this endpoint:

```json title="body"
{
    "enabled": true,
    "events": [
        // List of events to subscribe to. Uncomment the events you need.
        // "APPLICATION_STARTUP",
        "QRCODE_UPDATED",
        // "MESSAGES_SET",
        "MESSAGES_UPSERT",
        "MESSAGES_UPDATE",
        "MESSAGES_DELETE",
        "SEND_MESSAGE",
        // "CONTACTS_SET",
        // "CONTACTS_UPSERT",
        // "CONTACTS_UPDATE",
        // "PRESENCE_UPDATE",
        // "CHATS_SET",
        // "CHATS_UPSERT",
        // "CHATS_UPDATE",
        // "CHATS_DELETE",
        // "GROUPS_UPSERT",
        // "GROUP_UPDATE",
        // "GROUP_PARTICIPANTS_UPDATE",
        "CONNECTION_UPDATE",
        "CALL"
        // "NEW_JWT_TOKEN"
    ]    
}
```

When setting up RabbitMQ integration, adjust the events array in the JSON body to include only the events you want to subscribe to. Uncomment any event you wish to enable for RabbitMQ notifications.

:::note

If you want more in-depth over personalized configuration and installation check the [environment variables](/docs/01-Get%20Started/Environment%20Variables.md) section.

:::
