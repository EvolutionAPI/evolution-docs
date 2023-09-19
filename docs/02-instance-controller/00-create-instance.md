---
sidebar_position: 0
---

# Create Instance

## CREATE INSTANCES

:::note Instructions:

Swap the existing content between {{  }} for whatever matches your scenario or need.

:::

| Method | Endpoint                    |
| ------ | --------------------------- |
| POST   | {{baseUrl}}/instance/create |

## CREATE INSTANCE BASIC

This is the Evolution API Basic Instance Creation option.

It is recommended for those who just want to send messages and don't need to monitor responses or data received from contacts.

### Data to be sent in the Request

```json title=Payload
{
  "instanceName": "{{instance}}",
  "token": "{{apikey}}",
  "qrcode": true
}
```

### Data returned from the Request

```json title=Result
{
  "instance": {
    "instanceName": "{{instance}}",
    "status": "created"
  },
  "hash": {
    "apikey": "{{apikey}}"
  },
  "qrcode": {
    "code": "{{code}}",
    "base64": "{{base64}}"
  }
}
```

## CREATE INSTANTE WITH WEBHOOK

In this option, in addition to basic data, it is possible to create the instance with Webhook, passing a URL to receive the data and also select which events you want to receive.

Optionally, you can choose to receive everything in a single Webhook or in multiple Webhooks separated by events.

### Data to be sent in the Request

```json title=Payload
{
  "instanceName": "{{instance}}",
  "token": "{{apikey}}",
  "qrcode": true,
  "webhook": "{{webhookUrl}}",
  "webhookByEvents": false,
  "events": [
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
    "CONNECTION_UPDATE"
    // "NEW_JWT_TOKEN"
  ]
}
```

### Data returned from the Request

```json title=Result
{
  "instance": {
    "instanceName": "{{instance}}",
    "status": "created"
  },
  "hash": {
    "apikey": "{{apikey}}"
  },
  "webhook": "{{webhook}}",
  "events": [
    "QRCODE_UPDATED",
    "MESSAGES_UPSERT",
    "MESSAGES_UPDATE",
    "SEND_MESSAGE",
    "CONNECTION_UPDATE"
  ],
  "qrcode": {
    "code": "{{code}}",
    "base64": "{{base64}}"
  }
}
```

## CREATE INSTANCE FROM CHATWOOT™

In this option it is possible to create the instance for the connection with ChatWoot™, automatically generating the Inbox and the Contact for the Bot EvolutionAPI.

If the QrCode option is selected as "true", a message with the QrCode will already be created in the conversation to be read by your device.

It is also possible to mark as "true" the option to automatically sign messages with the Attendant's name.

### Data to be sent in the Request

```json title=Payload
{
  "instanceName": "{{instance}}",
  "token": "{{apikey}}",
  "qrcode": true,
  "chatwoot_account_id": 1,
  "chatwoot_token": "token",
  "chatwoot_url": "https://app.chatwoot.com",
  "chatwoot_sign_msg": true
}
```

### Data returned from the Request

```json title=Result
{
  "instance": {
    "instanceName": "{{instance}}",
    "status": "created"
  },
  "hash": {
    "apikey": "{{apikey}}"
  },
  "webhook": "{{webhook}}",
  "events": [
    "QRCODE_UPDATED",
    "MESSAGES_UPSERT",
    "MESSAGES_UPDATE",
    "SEND_MESSAGE",
    "CONNECTION_UPDATE"
  ],
  "qrcode": {
    "code": "{{code}}",
    "base64": "{{base64}}"
  },
  "chatwoot": {
    "enabled": true,
    "account_id": {{account_id}},
    "token": "{{token}}",
    "url": "{{url}}",
    "sign_msg": false,
    "name_inbox": "{{name_inbox}}",
    "webhook_url": "{{webhook_url}}"
  }
}
```

### Explanation of Parameters

<!-- prettier-ignore -->
Parameter | Type | Description
--- | --- | ---
instanceName | Required | Name of the instance to be created. <br /><br />The Instance Name will be used to refer to which connection you want to send the endpoints.<br /><br /> If using ChatWoot™, the Instance Name will also be used when creating the Inbox. <br /><br />_Special characters are not allowed. Use only non-accented lowercase alphabetic characters or numbers._
token | Required | Your instance apikey. <br /><br />This will be your instance's unique code, which will be used as an authentication key when sending endpoints. <br /><br />If not informed, a random UUID key will be created. <br /><br />_Special characters are not allowed. Use only non-accented (upper or lower case) alphabetic characters, numbers or hyphens._
qrcode | Required | Does it generate the QRCode automatically? <br />_Accepted values ​​are "true" or "false"._
webhook | Optional | Webhook URL to receive event data. <br /><br />Only use when you want to store or manage texts and media received in conversations. <br /><br />_If you don't need it, you can delete this parameter._
webhook_by_events | Optional | Want to generate a specific Webhook URL for each of your events? <br /><br />Accepted values ​​are "true" or "false".<br /><br /> _If you have not informed the Webhook parameter, there is no need to inform this parameter._
events | Optional |List of events to be processed. <br /><br />If you don't want to use some of these events, just remove them from the list. <br /><br />The comment characters (//) were placed only for ease of understanding and must be removed before consuming the endpoint. <br /><br />_If you have not informed the Webhook parameter, there is no need to inform this parameter._
chatwoot_account_id | Optional | Your ChatWoot Account ID. <br /><br />_Only inform if you are installing with ChatWoot™._
chatwoot_token | Optional | Your Access Token, which must be obtained from your ChatWoot™ installation. <br /><br />_Only inform if you are installing with ChatWoot™._
chatwoot_url | Optional | Installation URL of your ChatWoot™. <br /><br />_Only inform if you are installing with ChatWoot™._
chatwoot_sign_msg | Optional | Do you want messages to be signed with the Attendant's name? <br /><br />_Accepted values ​​are "true" or "false"._ <br /><br />_Only inform if you are installing with ChatWoot™._

:::danger Warning:

It is extremely necessary that the payload obey the rules for creating a JSON file, considering the correct arrangement of items, formatting, square brackets, braces and commas, etc.

Before consuming the endpoint, if you have questions about the JSON formatting, go to https://jsonlint.com/ and validate.
:::
