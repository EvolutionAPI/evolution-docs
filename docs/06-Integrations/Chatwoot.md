---
id: chatwoot
title: Chatwoot Integration
hide_title: false
hide_table_of_contents: false
sidebar_label: Evolution with Chatwoot
sidebar_position: 1
pagination_label: Chatwoot
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Cloud API configuration
# image: https://i.imgur.com/mErPwqL.png
slug: /integrations-chatwoot
last_update:
  date: 12/12/2023
  author: matheus
keywords:
  - Integrations
  - Chatwoot
---

## Evolution Integration with Chatwoot

Evolution's latest update brings an enhanced integration with Chatwoot, a leading customer support and engagement platform. This integration facilitates seamless communication by enabling the import of messages and contacts directly from WhatsApp to Chatwoot.
<!-- prettier-ignore -->
Parameter                   | Type      | Description
---                         | ---       | ---
enabled                     | Required  | Does it generate the QRCode automatically? 
account_id                  | Optional  | Your ChatWoot Account ID.
token                       | Optional  | Your Access Token, which must be obtained from your ChatWoot™ installation. 
url                         | Optional  | Installation URL of your ChatWoot™.
sign_msg                    | Optional  | If you want messages to be signed with the Attendant's name.
reopen_conversation         | Optional  | Reopen conversations when a contact talks to you on second time.
conversation_pending        | Optional  | Do not finalize chats, if true stays as pendent status.
import_contacts             | Optional  | Import contacts from WhatsApp to chatwoot database
import_messages             | Optional  | Import messages from WhatsApp to chatwoot database
days_limit_import_messages  | Optional  | Limit of days to import messages from WhatsApp to chatwoot database

### Key Features

#### Import Contacts

- **Automated Contact Sync**: Automatically import contacts from WhatsApp into Chatwoot, ensuring your customer information is always up to date and easily accessible.

#### Import Messages

- **Historical Message Import**: Import historical messages from WhatsApp to Chatwoot, allowing support teams to view and continue conversations without losing context.
- **Days Limit for Message Import**: Customize the number of days for which you want to import the historical messages, giving you control over the amount of data transferred.

### Configuration Steps

Before you proceed with the Chatwoot integration, please be aware of the following limitations and operational notes:

### Limitations

:::danger WARNING
The current implementation of Chatwoot's import functionality comes with certain restrictions:

- **Group Messages**: The import feature does not support the importing of group messages.
- **Media Files**: Importing of audio and image media files is not supported at this time.

It's important to plan your customer support strategy accordingly, considering these limitations.
:::

### Operational Notes

:::note
**Syncing Messages**:

- Messages will be synchronized with Chatwoot upon the scanning of the WhatsApp QR Code.
- To initiate the import of messages to Chatwoot, you may need to disconnect your Evolution instance from WhatsApp and reconnect it. This process triggers the import operation, ensuring that your messages are up-to-date.

Make sure to follow this procedure to maintain seamless communication with your customers through Chatwoot.
:::


Parameter                                           | Type      | Description
---                                                 | ---       | ---
CHATWOOT_MESSAGE_DELETE                             | Required  | If you leave this option as false, when deleting the message for everyone on WhatsApp, it will not be deleted on Chatwoot.
CHATWOOT_IMPORT_DATABASE_CONNECTION_URI             | Optional  | This db connection is used to import messages from whatsapp to chatwoot database
CHATWOOT_IMPORT_DATABASE_PLACEHOLDER_MEDIA_MESSAGE  | Optional  | The text that will be showed when imported a media message.


1. **Enable WhatsApp Integration**: Ensure that your Evolution instance is connected.

```yaml title=".env or dev-env.yml" showLineNumbers
#Chatwoot
CHATWOOT_MESSAGE_DELETE=false # false | true
# This db connection is used to import messages from whatsapp to chatwoot database
CHATWOOT_IMPORT_DATABASE_CONNECTION_URI=postgres://user:password@hostname:port/dbname
CHATWOOT_IMPORT_DATABASE_PLACEHOLDER_MEDIA_MESSAGE=true
```

  2. **Set sync full history on the desired instance**:
     - Specify the `days_limit_import_messages` according to your needs.

```javascript title='POST /settings/set/{instanceName}' showLineNumbers
{
  "reject_call": true,
  "msg_call": "string",
  "groups_ignore": true,
  "always_online": true,
  "read_messages": true,
  "read_status": true,
  // highlight-next-line
  "sync_full_history": true
}
```

  3. **Set Import Preferences**:
     - To enable contacts import, set `import_contacts` to `true`.
     - To enable messages import, set `import_messages` to `true` and specify the `days_limit_import_messages` according to your needs.
     
```javascript title='POST /chatwoot/set/{instanceName}' showLineNumbers
{
  "enabled": true,
  "account_id": "string",
  "token": "string",
  "url": "string",
  "sign_msg": true,
  "reopen_conversation": true,
  "conversation_pending": true,
    // highlight-next-line
  "import_contacts": true,
    // highlight-next-line
  "import_messages": true,
    // highlight-next-line
  "days_limit_import_messages": 30 // Limit of 365 days
}
```


- **Sync Full History (`sync_full_history`)**: This boolean setting allows for a complete historical sync from Baileys, ensuring that all previous interactions are included. To enable this feature, set the `sync_full_history` option to `true` within your instance configuration.

#### Chatwoot Integration Options

- **Import Contacts (`import_contacts`)**: By setting `import_contacts` to `true`, users can automate the importation of contacts into Chatwoot from WhatsApp, enhancing customer information management.
- **Import Messages (`import_messages`)**: Activating this option by setting `import_messages` to `true` allows for the importation of message history, centralizing communication within Chatwoot.
- **Days Limit Import Messages (`days_limit_import_messages`)**: This numeric setting limits the number of days for importing historical messages. Adjust this by setting `days_limit_import_messages` to the desired number of days.

### Practical Examples

The integration and configuration of these new features are straightforward, as demonstrated in the following code snippets:

# Find Chatwoot integrations

This request is used to find existing integrations with Chatwoot.

:::info Instructions:

Swap the existing instanceName content for whatever matches your scenario or need.

:::

```json title='GET /chatwoot/find/{instanceName}' 
// Data returned from the Request
// No body is necessary to be sent with this request
{
  "enabled": true,
  "url": "url",
  "webhookByEvents": false,
  "events": [
    "EVENT1",
    "EVENT2",
    "EVENT3"
  ]
}
```

## Set Instance from ChatWoot™

In this option it is possible to associate an instance already created to make the connection with ChatWoot™, automatically generating the Inbox and the Contact for the Bot EvolutionAPI.

If the QrCode option is selected as "true", a message with the QrCode will already be created in the conversation to be read by your device.

It is also possible to mark as "true" the option to automatically sign messages with the Attendant's name.

### Data to be sent in the Request

### Explanation of Parameters



:::danger Warning:

It is extremely necessary that the payload obey the rules for creating a JSON file, considering the correct arrangement of items, formatting, square brackets, braces and commas, etc.

Before consuming the endpoint, if you have questions about the JSON formatting, go to https://jsonlint.com/ and validate.
:::
