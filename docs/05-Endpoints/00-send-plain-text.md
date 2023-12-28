---
sidebar_position: 0
---

# Send Plain Text

:::note Instructions:
Swap the existing content between {{  }} for whatever matches your scenario or need.
:::

| Method | Endpoint                                  |
| ------ | ----------------------------------------- |
| POST   | {{baseUrl}}/message/sendText/{{instance}} |

Send text messages using the same features as your device or web.

### Data to be sent in the Request

```json title=Payload
{
  "number": "{{remoteJid}}",
  "options": {
    "delay": 1200,
    "presence": "composing"
  },
  "textMessage": {
    "text": "Plain text message, sent with the _Evolution-API_ 🚀.\n\nHere you can send texts in *bold*, _italic_, ~strikethrough~ and `monospaced`.\n\nYou can also use any available emoticon on WhatsApp, like these examples below:\n\n😉🤣🤩🤝👏👍🙏"
  }
}
```

### Data returned from the Request

```json title=Result
{
  "key": {
    "remoteJid": "{{remoteJid}}",
    "fromMe": true,
    "id": "BAE5B8BC84A484E3"
  },
  "message": {
    "extendedTextMessage": {
      "text": "Plain text message, sent with the _Evolution-API_ 🚀.\n\nHere you can send texts in *bold*, _italic_, ~strikethrough~ and `monospaced`.\n\nYou can also use any available emoticon on WhatsApp, like these examples below:\n\n😉🤣🤩🤝👏👍🙏"
    }
  },
  "messageTimestamp": "1689604487",
  "status": "PENDING"
}
```

### Explanation of Parameters

<!-- prettier-ignore -->
Parameter | Type | Description
--|--|--
remoteJid | Required | Enter the remoteJid or groupJid to whom the message will be sent. <br /><br /> _remoteJid = Number in DDI + DDD + Number format, with or without the @s.whatsapp.net ending. <br /><br />Ex: 5511911111111 or 5511911111111@s.whatsapp.net<br /><br /> **groupJid** = Accepts the group identifier in hash format for new groups, or remoteJid + "-" + timestamp for old groups. In this cases, it is mandatory to inform the @g.us ending. <br /><br />Ex: 120363024158769234@g.us or 5511911111111-1111111111@g.us_
options.delay | Optional | Time in milliseconds that the message must wait until it is sent, showing the presence information configured in the next item.
options.presence | Optional | The "composing" content will make the message "typing" appear in the WhatsApp™ top menu, during the time defined in the previous item.
textMessage.text | Required | Inform the text of the message you want to send, being able to use the same resources you would use in the app or on the web, which are:<br /><br /> - Emojis<br /> - Bold, enter \*yourtext\* <br /> - Italics, between \_yourtext\_ <br /> - Scratched, come in \~yourtext\~ <br /> - Monospace between \```yourtext\``` <br /><br /> _To break a line, enter "\n" in the message._ <br /><br /> Check the example in the payload for better understanding.

:::note Note:
Every message sent by the Evolution API initially has the status PENDING.

This indicates that the sending was successful and the message is waiting for the following statuses, which will be sent to the MESSAGES_UPDATE Webhook.
:::

:::danger Warning:
It is extremely necessary that the payload obey the rules for creating a JSON file, considering the correct arrangement of items, formatting, square brackets, braces and commas, etc.

Before consuming the endpoint, if you have questions about the JSON formatting, go to https://jsonlint.com/ and validate.
:::
