# Set Webhook

:::info Instructions:
Swap the existing content between {{  }} for whatever matches your scenario or need.
:::

| Method | Endpoint                             |
| ------ | ------------------------------------ |
| POST   | {{baseUrl}}/webhook/set/{{instance}} |

After Instance Creation, you can still configure or change Webhook settings.

Just enter the new data and consume the endpoint.

### Data to be sent in the Request:

```json title=Payload
{
  "enabled": true,
  "url": "{{webhookUrl}}",
  "webhookByEvents": false,
  "events": [
    // "APPLICATION_STARTUP",
    "QRCODE_UPDATED",
    // "MESSAGES_SET",
    "MESSAGES_UPSERT",
    "MESSAGES_UPDATE",
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
  "webhook": {
    "instanceName": "{{instance}}",
    "webhook": {
      "enabled": true,
      "url": "{{url}}",
      "webhookByEvents": false,
      "events": [
        "QRCODE_UPDATED",
        "MESSAGES_UPSERT",
        "MESSAGES_UPDATE",
        "SEND_MESSAGE",
        "CONNECTION_UPDATE"
      ]
    }
  }
}
```

### Explanation of Parameters

<!-- prettier-ignore -->
Parameter | Type | Description
--- | --- | ---
enabled | Required | Enter "true" to create or change Webhook data, or "false" if you want to stop using it. <br /><br /> Accepted values ​​are "true" or "false".
url | Optional | Webhook URL to receive event data. <br /><br /> _Enter the URL to create or change the Webhook, or leave "" empty if you want to stop using it._
webhook_by_events | Optional | Want to generate a specific Webhook URL for each of your events? <br /><br /> _Accepted values ​​are "true" or "false". <br /> If you have not informed the URL parameter, there is no need to inform this parameter._
events | Optional | List of events to be processed. <br /><br /> _If you don't want to use some of these events, just remove them from the list.  <br /><br /> The comment characters (//) were placed only for ease of understanding and must be removed before consuming the endpoint. <br /><br /> If you have not informed the URL parameter, there is no need to inform this parameter._

<br />

:::danger Warning:

It is extremely necessary that the payload obey the rules for creating a JSON file, considering the correct arrangement of items, formatting, square brackets, braces and commas, etc.

Before consuming the endpoint, if you have questions about the JSON formatting, go to https://jsonlint.com/ and validate.
:::
