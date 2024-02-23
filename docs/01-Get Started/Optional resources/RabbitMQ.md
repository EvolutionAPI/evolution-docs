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

To effectively utilize RabbitMQ with the Evolution API for managing WhatsApp instances, it's essential to activate RabbitMQ on each individual WhatsApp instance. 

This activation allows each instance to start receiving and processing AMQP (Advanced Message Queuing Protocol) queue requests that are specific to that particular WhatsApp instance.

In other words, for each WhatsApp instance where you want to use RabbitMQ, you need to ensure that RabbitMQ integration is enabled. 

This setup will allow the instance to communicate with the RabbitMQ server and handle its queue of messages and requests. 

Enabling RabbitMQ on each instance is crucial for proper distribution and management of messaging tasks across different WhatsApp instances in your system.

### RabbitMQ instance setup

For **developers** who wants to use in their applications AMQP messaging system, you could use RabbitMQ for queue your instances actions.

To configure RabbitMQ for individual WhatsApp instances in the Evolution API, you can use the following endpoint:

This endpoint allows you to enable RabbitMQ and specify which events each WhatsApp instance should subscribe to in the AMQP queue. Below is an example of the JSON body for this endpoint:

```json title="POST /rabbitmq/set/{instance_name}" showLineNumbers
{
  "enabled": true,
  "events": [
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

## Consuming RabbitMQ messages

There is many ways to consume the queue of the application, for users who do do not know how to code, n8n a low code automation tool could be used to consume the queue.

### n8n

Use the RabbitMQ webhook node to consume the queue.

### NodeJs

First install the `amqp.node` package

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="npm" label="npm">
```bash
npm i amqplib @types/amqplib --save
```
</TabItem>

<TabItem value="pnpm" label="pnpm">
```bash
pnpm i amqplib @types/amqplib --save
```
</TabItem>

<TabItem value="bun" label="bun">
```bash
bun i amqplib @types/amqplib --save
```
</TabItem>
</Tabs>

Now, lets consume RabbitMQ events using the `amqp` lib consumer.

```javascript
import amqp from 'amqplib';

class RabbitMQConsumer {
  constructor(instanceName) {
    this.instanceName = instanceName;
    this.connection = null;
    this.channel = null;
  }

  async init() {
    try {
      this.connection = await amqp.connect('amqp://admin:admin@rabbitmq:5672');
      this.channel = await this.connection.createChannel();

      await this.setupExchangesAndQueues();
    } catch (error) {
      console.log(`Error initializing RabbitMQConsumer: ${error}`);
    }
  }

  async setupExchangesAndQueues() {
    let queueBindings = this.getQueueBindings();

    for (let { queueName, bindingKey } of queueBindings) {
      await this.createQueue(queueName, bindingKey);
      this.consumeQueue(queueName);
    }
  }

  getQueueBindings() {
    return [
        {
          queueName: ${instanceName}.state.instance,
          bindingKey: "state.instance"
        },
        {
          queueName: ${instanceName}.connection.update,
          bindingKey: "state.instance"
        },
        {
          queueName: ${instanceName}.qrcode.update,
          bindingKey: "qrcode.update"
        },
        {
          queueName: ${instanceName}.chats.upsert,
          bindingKey: "chats.upsert"
        },
        {
          queueName: ${instanceName}.contacts.upsert,
          bindingKey: "contacts.upsert"
        },
        {
          queueName: ${instanceName}.contacts.update,
          bindingKey: "contacts.update"
        },
        {
          queueName: ${instanceName}.chats.set,
          bindingKey: "chats.set"
        },
        {
          queueName: ${instanceName}.messages.set,
          bindingKey: "messages.set"
        },
        {
          queueName: ${instanceName}.messages.upsert,
          bindingKey: "messages.upsert"
        },
        {
          queueName: ${instanceName}.messages.update,
          bindingKey: "messages.update"
        },
        {
          queueName: ${instanceName}.groups.upsert,
          bindingKey: "groups.upsert"
        },        {
          queueName: ${instanceName}.qrcode.updated,
          bindingKey: "qrcode.updated"
        },
        {
          queueName: ${instanceName}.connection.update,
          bindingKey: "connection.update"
        },
        {
          queueName: ${instanceName}.messages.upsert,
          bindingKey: "messages.upsert"
        },
        {
          queueName: ${instanceName}.send.message,
          bindingKey: "send.message"
        },
        {
          queueName: ${instanceName}.messages.update,
          bindingKey: "messages.update"
        },
        {
          queueName: ${instanceName}.messages.delete,
          bindingKey: "messages.delete"
        }
    ];
  }

  async createQueue(queueName, bindingKey) {
    await this.channel.assertQueue(queueName, { durable: true });
    await this.channel.bindQueue(queueName, exchangeName, bindingKey);
  }

  consumeQueue(queueName) {
    this.channel.consume(queueName, message => {
      if (message !== null) {
        // Here you can change the logic for your application
        console.log(`Received message from ${queueName}: ${message.content.toString()}`);
        this.channel.ack(message);
      }
    });
  }
}

// Uso
const rabbitMQConsumer = new RabbitMQConsumer('instanceName');
rabbitMQConsumer.init();

```

### Binding keys

Once connected, you have the capability to listen for various events emitted by the server. Each event may carry data that is pertinent to the context of the event. For example, if you are subscribed to message updates, you might receive data containing the content and metadata of the updated message.

The table below outlines the key binding keys available and the type of information or notification each represents:


<!-- prettier-ignore -->
**bindingKey**              | **Description**
---                         | ---
 application.startup        | Notifies you when an application startup.
 qrcode.updated             | Sends the base64 of the qrcode for reading
 connection.update          | Informs the status of the connection with WhatsApp
 message.set                | Sends a list of all your messages uploaded on WhatsApp. This event occurs only once
 message.upsert             | Notifies you when a message is received
 message.update             | Tells you when a message is updated
 message.delete             | Tells you when a message is deleted
 send.message               | Notifies when a message is sent
 contacts.set               | Performs initial loading of all contacts.This event occurs only once
 contacts.upsert            | Reloads all contacts with additional information.This event occurs only once
 contacts.update            | Informs you when the chat is updated
 presence.update            | Informs if the user is online, if he is performing some action like writing or recording and his last seen: 'unavailable', 'available', 'composing', 'recording', 'paused'
 chats.set                  | Send a list of all loaded chats
 chats.update               | Informs you when the chat is updated
 chats.upsert               | Sends any new chat information
 groups.upsert              | Notifies when a group is created
 groups.update              | Notifies when a group has its information updated
 group-participants.update  | Notifies when an action occurs involving a participant: 'add', 'remove', 'promote', 'demote'
 new.jwt                    | Notifies when the token (jwt) is updated

This structure provides a clear and organized understanding of the events you can listen for through the API, facilitating the implementation of specific logic in response to each type of notification or data received.
