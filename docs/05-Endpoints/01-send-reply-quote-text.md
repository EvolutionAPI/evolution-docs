---
sidebar_position: 1
---

# Send Reply Quote Text

:::note Instructions:
Swap the existing content between [  ] for whatever matches your scenario or need.
:::

| Method | Endpoint                                  |
| ------ | ----------------------------------------- |
| POST   | [baseUrl]/message/sendText/[instance] |

Send a message quoting a previous message in the reply.

It works both for incoming messages and for quoting your own outgoing messages if you want to remind the recipient of a previously discussed subject.

### Data to be sent in the Request

```json title=Payload
{
  "number": "[remoteJid]",
  "options": {
    "delay": 1200,
    "presence": "composing",
    "quoted": {
      "key": {
        "remoteJid": "[remoteJid]@s.whatsapp.net",
        "fromMe": true,
        "id": "BAE5766236A2AEFF",
        "participant": ""
      },
      "message": {
        "conversation": "Plain text message, sent with the _Evolution-API_ 🚀.\n\nHere you can send texts in *bold*, _italic_, ~strikethrough~ and `monospaced`.\n\nYou can also use any available emoticon on WhatsApp, like these examples below:\n\n😉🤣🤩🤝👏👍🙏"
      }
    }
  },
  "textMessage": {
    "text": "Reply quote text message, sent with the _Evolution-API_ 🚀.\n\nHere you can send texts in *bold*, _italic_, ~strikethrough~ and `monospaced`.\n\nYou can also use any available emoticon on WhatsApp, like these examples below:\n\n😉🤣🤩🤝👏👍🙏"
  }
}
```

### Data returned from the Request

```json title=Result
{
  "key": {
    "remoteJid": "[remoteJid]@s.whatsapp.net",
    "fromMe": true,
    "id": "BAE5FA1CB273B533"
  },
  "message": {
    "extendedTextMessage": {
      "text": "Reply quote text message, sent with the _Evolution-API_ 🚀.\n\nHere you can send texts in *bold*, _italic_, ~strikethrough~ and `monospaced`.\n\nYou can also use any available emoticon on WhatsApp, like these examples below:\n\n😉🤣🤩🤝👏👍🙏",
      "contextInfo": {
        "stanzaId": "BAE5766236A2AEFF",
        "participant": "[remoteJid]@s.whatsapp.net",
        "quotedMessage": {
          "conversation": "Plain text message, sent with the _Evolution-API_ 🚀.\n\nHere you can send texts in *bold*, _italic_, ~strikethrough~ and `monospaced`.\n\nYou can also use any available emoticon on WhatsApp, like these examples below:\n\n😉🤣🤩🤝👏👍🙏"
        }
      }
    }
  },
  "messageTimestamp": "1689608179",
  "status": "PENDING"
}
```

### Explanation of Parameters

<!-- prettier-ignore -->
Parameter | Type | Description
-|-|-
remoteJid | Required | Enter the remoteJid or groupJid to whom the message will be sent. <br /><br /> **remoteJid** = Number in DDI + DDD + Number format, with or without the @s.whatsapp.net ending. <br /><br />Ex: 5511911111111 or 5511911111111@s.whatsapp.net <br /><br />**groupJid** = Accepts the group identifier in hash format for new groups, or remoteJid + "-" + timestamp for old groups. In this case, it is mandatory to inform the @g.us ending.<br /><br />Ex: 120363024158769234@g.us or 5511911111111-1111111111@g.us
options.delay | Optional | Time in milliseconds that the message must wait until it is sent, showing the presence information configured in the next item.
options.presence | Optional | The "composing" content will make the message "typing" appear in the WhatsApp™ top menu, during the time defined in the previous item.
options.quoted.key.remoteJid | Required | Take this information from the remoteJid in the key of the object of the message to be quoted.
options.quoted.key.fromMe | Required | Take this information from the remoteJid in the key of the object of the message to be quoted.
options.quoted.key.id | Required | Take this information from the remoteJid in the key of the object of the message to be quoted.
options.quoted.key.participant | Required | Take this information from the remoteJid in the key of the object of the message to be quoted.
options.quoted.message.conversation | Required | Take this information from the remoteJid in the key of the object of the message to be quoted.
textMessage.text | Required | Inform the text of the message you want to send, being able to use the same resources you would use in the app or on the web, which are:<br /><br /> - Emojis<br /> - Bold, enter \*yourtext\* <br /> - Italics, between \_yourtext\_ <br /> - Scratched, come in \~yourtext\~ <br /> - Monospace between \```yourtext\``` <br /><br /> _To break a line, enter "\n" in the message._ <br /><br /> Check the example in the payload for better understanding.

:::note Note:
Every message sent by the Evolution API initially has the status PENDING.

This indicates that the sending was successful and the message is waiting for the following statuses, which will be sent to the MESSAGES_UPDATE Webhook.
:::

:::danger Warning:
It is extremely necessary that the payload obey the rules for creating a JSON file, considering the correct arrangement of items, formatting, square brackets, braces and commas, etc.

Before consuming the endpoint, if you have questions about the JSON formatting, go to https://jsonlint.com/ and validate.
:::
