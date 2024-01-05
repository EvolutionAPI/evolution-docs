---
sidebar_position: 2
---

# Send Mention Text

:::note Instructions:

Swap the existing content between [  ] for whatever matches your scenario or need.
:::

| Method | Endpoint                                  |
| ------ | ----------------------------------------- |
| POST   | [baseUrl]/message/sendText/[instance] |

Send a message in a group, mentioning one or several participants, without the need to include @name in the message content.

:::info Note:
Use this feature sparingly, as in a group where participants have chosen to mute notifications, they will still be notified and tagged with the @.

Excessive use in a group with many members in this condition may cause dissatisfaction and result in an effect contrary to the desired one.
:::

### Data to be sent in the Request

```json title=Payload
{
  "number": "[groupJid]",
  "options": {
    "delay": 1200,
    "presence": "composing",
    "mentions": {
      "everyOne": false,
      "mentioned": ["[remoteJid]"]
    }
  },
  "textMessage": {
    "text": "Mention text message, sent with the _Evolution-API_ 🚀.\n\nHere you can send texts in *bold*, _italic_, ~strikethrough~ and `monospaced`.\n\nYou can also use any available emoticon on WhatsApp, like these examples below:\n\n😉🤣🤩🤝👏👍🙏"
  }
}
```

### Data returned from the Request

```json title=Result
{
  "key": {
    "remoteJid": "[groupJid]",
    "fromMe": true,
    "id": "BAE500F92531D3E2"
  },
  "message": {
    "extendedTextMessage": {
      "text": "Mention text message, sent with the _Evolution-API_ 🚀.\n\nHere you can send texts in *bold*, _italic_, ~strikethrough~ and `monospaced`.\n\nYou can also use any available emoticon on WhatsApp, like these examples below:\n\n😉🤣🤩🤝👏👍🙏",
      "contextInfo": {
        "mentionedJid": ["[remoteJid]@s.whatsapp.net"]
      }
    }
  },
  "messageTimestamp": "1689620558",
  "status": "PENDING",
  "participant": "[sender]@s.whatsapp.net"
}
```

### Explanation of Parameters

<!-- prettier-ignore -->
Parameter | Type | Description
--- | --- | ---
number | Required | Enter the groupJid to whom the message will be sent.<br /><br /> **groupJid** = Accepts the group identifier in hash format for new groups, or remoteJid + "-" + timestamp for old groups. In this case, it is mandatory to inform the @g.us ending.<br /><br /> Ex: 120363024158769234@g.us or 5511911111111-1111111111@g.us
options.delay | Optional | Time in milliseconds that the message must wait until it is sent, showing the presence information configured in the next item.
options.presence | Optional | The "composing" content will make the message "typing" appear in the WhatsApp™ top menu, during the time defined in the previous item.
options.mentions.everyOne | Required | To mention one or more participants, enter "false".<br /><br /> Accepted values ​​are "true" or "false".<br /><br /> To mention all, it will be explained in the next item.
options.mentions.mentioned | Required | Enter the remoteJid of one or more participants that will be mentioned in the group.<br /><br /> **remoteJid** = Number in DDI + DDD + Number format, with or without the @s.whatsapp.net ending.<br /><br /> Ex: 5511911111111 or 5511911111111@s.whatsapp.net<br /><br /> If you want to inform more than one participant, just separate the contacts with commas, as in the example below:<br /><br /> - 551191111111,<br /> - 5511922222222,<br /> - 5511933333333<br />
textMessage.text | Required | Inform the text of the message you want to send, being able to use the same resources you would use in the app or on the web, which are:<br /><br /> - Emojis<br /> - Bold, enter \*yourtext\*<br /> - Italics, between \_yourtext\_<br /> - Scratched, come in \~yourtext\~<br /> - Monospace between \```yourtext\``` <br /><br />To break a line, enter "\n" in the message. <br /><br />_Check the example in the payload for better understanding._

:::note Note:
Every message sent by the Evolution API initially has the status PENDING.

This indicates that the sending was successful and the message is waiting for the following statuses, which will be sent to the MESSAGES_UPDATE Webhook.
:::

:::danger Warning:
It is extremely necessary that the payload obey the rules for creating a JSON file, considering the correct arrangement of items, formatting, square brackets, braces and commas, etc.

Before consuming the endpoint, if you have questions about the JSON formatting, go to https://jsonlint.com/ and validate.
:::
