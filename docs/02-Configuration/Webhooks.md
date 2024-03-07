---
id: webhooks
title: Webhooks
hide_title: false
hide_table_of_contents: false
sidebar_label: Webhooks
sidebar_position: 3
pagination_label: Webhooks
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Listen to events on external apps
# image: https://i.imgur.com/mErPwqL.png
slug: /webhook-configuration
last_update:
  date: 10/02/2024
  author: matheus
keywords:
  - Webhooks
  - Events
---

Webhooks enable real-time integration between the Evolution API and WhatsApp™, allowing automated data synchronization and sharing.

It is exactly this feature that enables the creation of self-service bots and multi-service systems.

## Activating webhooks

There is two ways to activate the webhook:
  - In the `.env` with global events
  - By calling the endpoint `/webhook/instance`

### Instance webhook events

Most of the users will prefer the activation by instance, this way is easier to control the events that are received, however in some cases a global webhook is needed this could be done by using the global webhook variable.

Here is an example with some commonly listened events:

```json title="/webhook/instance" showLineNumbers
{
  "url": "{{webhookUrl}}",
    "webhook_by_events": false,
    "webhook_base64": false,
    "events": [
        "QRCODE_UPDATED",
        "MESSAGES_UPSERT",
        "MESSAGES_UPDATE",
        "MESSAGES_DELETE",
        "SEND_MESSAGE",
        "CONNECTION_UPDATE",
        "TYPEBOT_START",
        "TYPEBOT_CHANGE_STATUS"
    ]    
}
```
### Parameters

Parameter         | Type      | Required  | Description
---               | ---       | ---       | ---
enabled           | boolean   | Required  | Enter "true" to create or change Webhook data, or "false" if you want to stop using it.
url               | string    | Required  | Webhook URL to receive event data.
webhook_by_events | boolean   | Optional  | Want to generate a specific Webhook URL for each of your events.
events            | array     | Optional  | List of events to be processed. If you don't want to use some of these events, just remove them from the list.

:::danger Warning:

It is extremely necessary that the payload obey the rules for creating a JSON file, considering the correct arrangement of items, formatting, square brackets, braces and commas, etc.

Before consuming the endpoint, if you have questions about the JSON formatting, go to https://jsonlint.com/ and validate.

:::

### Global Webhook events 

Each instance's Webhook URL and events will be requested at the time it is created
Define a global webhook that will listen for enabled events from all instances

```bash title="Global events env example"
WEBHOOK_GLOBAL_URL=''
WEBHOOK_GLOBAL_ENABLED=false

# With this option activated, you work with a url per webhook event, respecting the global url and the name of each event
WEBHOOK_GLOBAL_WEBHOOK_BY_EVENTS=false

## Set the events you want to hear, all listed events below are supported
WEBHOOK_EVENTS_APPLICATION_STARTUP=false
WEBHOOK_EVENTS_QRCODE_UPDATED=true

# Some extra events for errors
WEBHOOK_EVENTS_ERRORS=false
WEBHOOK_EVENTS_ERRORS_WEBHOOK=
```
## Supported events

These are the available and supported webhook events:

<!-- prettier-ignore -->
 **Environment variable**   | **URL**                    | **Description**
---                         | ---                        | ---
 APPLICATION_STARTUP        | /application-startup       | Notifies you when an application startup
 QRCODE_UPDATED             | /qrcode-updated            | Sends the base64 of the qrcode for reading
 CONNECTION_UPDATE          | /connection-update         | Informs the status of the connection with WhatsApp
 MESSAGES_SET               | /messages-set              | Sends a list of all your messages uploaded on WhatsApp. This event occurs only once
 MESSAGES_UPSERT            | /messages-upsert           | Notifies you when a message is received
 MESSAGES_UPDATE            | /messages-update           | Tells you when a message is updated
 MESSAGES_DELETE            | /messages-delete           | Tells you when a message is deleted
 SEND_MESSAGE               | /send-message              | Notifies when a message is sent
 CONTACTS_SET               | /contacts-set              | Performs initial loading of all contacts.This event occurs only once
 CONTACTS_UPSERT            | /contacts-upsert           | Reloads all contacts with additional information.This event occurs only once
 CONTACTS_UPDATE            | /contacts-update           | Informs you when the chat is updated
 PRESENCE_UPDATE            | /presence-update           | Informs if the user is online, if he is performing some action like writing or recording and his last seen: 'unavailable', 'available', 'composing', 'recording', 'paused'
 CHATS_SET                  | /chats-set                 | Send a list of all loaded chats
 CHATS_UPDATE               | /chats-update              | Informs you when the chat is updated
 CHATS_UPSERT               | /chats-upsert              | Sends any new chat information
 CHATS_DELETE               | /chats-delete              | Notify you when a message is deleted
 GROUPS_UPSERT              | /groups-upsert             | Notifies when a group is created
 GROUPS_UPDATE              | /groups-update             | Notifies when a group has its information updated
 GROUP_PARTICIPANTS_UPDATE  | /group-participants-update | Notifies when an action occurs involving a participant: 'add', 'remove', 'promote', 'demote'
 NEW_TOKEN                  | /new-jwt                   | Notifies when the token (jwt) is updated

## Webhook by events

When enabling the WEBHOOK_BY_EVENTS options in the global and local webhooks, the following paths will be added at the end of the webhook.

:::note Example:

Add on the end of the url the event name with a dash (-) between the words that compose the event for the event.

:::
 
 ### Example

 Assuming your webhook url was `https://sub.domain.com/webhook/`. Evolution will add automatically in the end of the url the name of the event when `webhook_by_events` is set to true.

  **Event**                 | **New webhook by Events URL**
---                         | ---
 APPLICATION_STARTUP        | https://sub.domain.com/webhook/application-startup       
 QRCODE_UPDATED             | https://sub.domain.com/webhook/qrcode-updated            
 CONNECTION_UPDATE          | https://sub.domain.com/webhook/connection-update         
 MESSAGES_SET               | https://sub.domain.com/webhook/messages-set              
 MESSAGES_UPSERT            | https://sub.domain.com/webhook/messages-upsert           
 MESSAGES_UPDATE            | https://sub.domain.com/webhook/messages-update           
 MESSAGES_DELETE            | https://sub.domain.com/webhook/messages-delete           
 SEND_MESSAGE               | https://sub.domain.com/webhook/send-message              
 CONTACTS_SET               | https://sub.domain.com/webhook/contacts-set              
 CONTACTS_UPSERT            | https://sub.domain.com/webhook/contacts-upsert           
 CONTACTS_UPDATE            | https://sub.domain.com/webhook/contacts-update           
 PRESENCE_UPDATE            | https://sub.domain.com/webhook/presence-update      
 CHATS_SET                  | https://sub.domain.com/webhook/chats-set                 
 CHATS_UPDATE               | https://sub.domain.com/webhook/chats-update              
 CHATS_UPSERT               | https://sub.domain.com/webhook/chats-upsert          
 CHATS_DELETE               | https://sub.domain.com/webhook/chats-delete           
 GROUPS_UPSERT              | https://sub.domain.com/webhook/groups-upsert
 GROUPS_UPDATE              | https://sub.domain.com/webhook/groups-update
 GROUP_PARTICIPANTS_UPDATE  | https://sub.domain.com/webhook/group-participants-update 
 NEW_TOKEN                  | https://sub.domain.com/webhook/new-jwt

 ## Find Webhook

If necessary, there is an option to find any active webhook on the specific instance.

| Method | Endpoint                              |
| ------ | ------------------------------------- |
| GET    | [baseUrl]/webhook/find/[instance]     |


### Data returned from the Request:

Calling the endpoint will return all the information about the webhook that is being used by the instance.

```json title=Result
{
  "enabled": true,
  "url": "[url]",
  "webhookByEvents": false,
  "events": [
    [events]
  ]
}
```