---
id: rabbitmq
title: RabbitMQ
hide_title: true
hide_table_of_contents: false
sidebar_label: RabbitMQ
sidebar_position: 2
pagination_label: RabbitMQ
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Integrate RabbitMQ queues in your develop environment with Evolution API.
keywords:
  - Optional Resources
  - RabbitMQ
  - Developers
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/19/2023
  author: matheus
---

## Activating RabbitMQ

To effectively utilize RabbitMQ with the Evolution API for managing WhatsApp instances, it's essential to activate RabbitMQ on each individual WhatsApp instance. This activation allows each instance to start receiving and processing AMQP (Advanced Message Queuing Protocol) queue requests that are specific to that particular WhatsApp instance.

In other words, for each WhatsApp instance where you want to use RabbitMQ, you need to ensure that RabbitMQ integration is enabled. This setup will allow the instance to communicate with the RabbitMQ server and handle its queue of messages and requests. Enabling RabbitMQ on each instance is crucial for proper distribution and management of messaging tasks across different WhatsApp instances in your system.

### RabbitMQ setup for an individual instance

For **developers** who wants to use in their applications AMQP messaging system, you could use RabbitMQ for queue your instances actions.

To configure RabbitMQ for individual WhatsApp instances in the Evolution API, you can use the following endpoint:

```plaintext title="POST"
[baseUrl]/rabbitmq/set/[instance_name]
```

This endpoint allows you to enable RabbitMQ and specify which events each WhatsApp instance should subscribe to in the AMQP queue. Below is an example of the JSON body for this endpoint:

```json title="body" showLineNumbers
{
    "enabled": true,
    "events": [
        // List of events to subscribe to. Uncomment the events you need.
        "APPLICATION_STARTUP",
        "QRCODE_UPDATED",
        "MESSAGES_SET",
        "MESSAGES_UPSERT",
        "MESSAGES_UPDATE",
        "MESSAGES_DELETE",
        "SEND_MESSAGE",
        "CONTACTS_SET",
        "CONTACTS_UPSERT",
        "CONTACTS_UPDATE",
        "PRESENCE_UPDATE",
        "CHATS_SET",
        "CHATS_UPSERT",
        "CHATS_UPDATE",
        "CHATS_DELETE",
        "GROUPS_UPSERT",
        "GROUP_UPDATE",
        "GROUP_PARTICIPANTS_UPDATE",
        "CONNECTION_UPDATE",
        "CALL",
        "NEW_JWT_TOKEN"
    ]    
}
```

:::tip

Remove unused events to keep low resource usage with RabbitMQ.

:::

When setting up RabbitMQ integration, adjust the events array in the JSON body to include only the events you want to subscribe to. Uncomment any event you wish to enable for RabbitMQ notifications.

Now you can send to your application the messages and consume them in RabbitMQ.

:::note

If you want more in-depth over personalized configuration and installation check the environment variables section.

:::
