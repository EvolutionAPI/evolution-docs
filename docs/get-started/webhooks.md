---
sidebar_position: 8
description: Supported Webhook events
---

# Webhooks

## SUPPORTED WEBHOOK EVENTS

Webhooks enable real-time integration between the Evolution API and WhatsApp™, allowing automated data synchronization and sharing.

It is exactly this feature that enables the creation of self-service bots and multi-service systems.

These are the available and supported webhook events::

<!-- prettier-ignore -->
 **Env Name** | **API Event** | **Description**
--- | --- | ---
 APPLICATION_STARTUP | application.startup | Notifies you when an application startup.
 QRCODE_UPDATED | qrcode.updated| Sends the base64 of the qrcode for reading
 CONNECTION_UPDATE | connection.update | Informs the status of the connection with WhatsApp
 MESSAGES_SET | message.set | Sends a list of all your messages uploaded on WhatsApp. This event occurs only once
 MESSAGES_UPSERT | message.upsert | Notifies you when a message is received
 MESSAGES_UPDATE | message.update | Tells you when a message is updated
 MESSAGES_DELETE | message.delete | Tells you when a message is deleted
 SEND_MESSAGE | send.message | Notifies when a message is sent
 CONTACTS_SET| contacts.set | Performs initial loading of all contacts.This event occurs only once
 CONTACTS_UPSERT | contacts.upsert | Reloads all contacts with additional information.This event occurs only once
 CONTACTS_UPDATE | contacts.update | Informs you when the chat is updated
 PRESENCE_UPDATE | presence.update | Informs if the user is online, if he is performing some action like writing or recording and his last seen: 'unavailable', 'available', 'composing', 'recording', 'paused'
 CHATS_SET | chats.set | Send a list of all loaded chats
 CHATS_UPDATE | chats.update | Informs you when the chat is updated
 CHATS_UPSERT | chats.upsert | Sends any new chat information
 GROUPS_UPSERT | groups.upsert | Notifies when a group is created
 GROUPS_UPDATE | groups.update | Notifies when a group has its information updated
 GROUP_PARTICIPANTS_UPDATE | group-participants.update | Notifies when an action occurs involving a participant: 'add', 'remove', 'promote', 'demote'
 NEW_TOKEN | new.jwt | Notifies when the token (jwt) is updated

## WEBHOOK ROUTES

When enabling the WEBHOOK_BY_EVENTS options in the global and local webhooks, the following paths will be added at the end of the webhook.

:::note Example:
Assuming your webhook url was `https://sub.domain.com/webhook-test/exclusive-webhook-code`, for the `QRCODE_UPDATED` event the complete url would look like this:

`https://sub.domain.com/webhook-test/exclusive-webhook-code/qrcode-updated`
:::

Below is a breakdown of the suffixes added to the end of the webhook url for each of the events:

```
APPLICATION_STARTUP: /application-startup
QRCODE_UPDATED: /qrcode-updated
CONNECTION_UPDATE: /connection-update
MESSAGES_SET: /messages-set
MESSAGES_UPSERT: /messages-upsert
MESSAGES_UPDATE: /messages-update
MESSAGES_DELETE: /messages-delete
SEND_MESSAGES: /send-messages
CONTACTS_SET: /contacts-set
CONTACTS_UPSERT: /contacts-upsert
CONTACTS_UPDATE: /contacts-update
PRESENCE_UPDATE: /presence-update
CHATS_SET: /chats-set
CHATS_UPDATE: /chats-update
CHATS_UPSERT: /chats-upsert
GROUPS_UPSERT: /groups-upsert
GROUPS_UPDATE: /groups-update
GROUP_PARTICIPANTS_UPDATE: /groups-participants-update
NEW_TOKEN: /new-token
```
