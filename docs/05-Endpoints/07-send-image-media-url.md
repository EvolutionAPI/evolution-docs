---
sidebar_position: 7
---

# Send Image Media Url

:::note Instructions:
Swap the existing content between [  ] for whatever matches your scenario or need.
:::

| Method | Endpoint                                   |
| ------ | ------------------------------------------ |
| POST   | [baseUrl]/message/sendMedia/[instance] |

Send images directly from the internet, in JPG and PNG formats.

### Data to be sent in the Request

```json title=Payload
{
  "number": "[remoteJid]",
  "options": {
    "delay": 1200,
    "presence": "composing"
  },
  "mediaMessage": {
    "mediatype": "image",
    "caption": "This is an example JPG image file sent by Evolution-API via URL.",
    "media": "https://evolution-api.com/files/evolution-api.jpg"
  }
}
```

### Data returned from the Request

```json title=Result
{
  "key": {
    "remoteJid": "[remoteJid]",
    "fromMe": true,
    "id": "BAE51614A82384B8"
  },
  "message": {
    "imageMessage": {
      "url": "https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m230/up-oil-image-807ef642-4b4b-4ed9-...",
      "mimetype": "image/jpeg",
      "caption": "This is an example JPG image file sent by Evolution-API via URL.",
      "fileSha256": "8VXLU/xZb6avXAocU65TB8PYu2hqBYA7GR1SKNcF8rs=",
      "fileLength": "54005",
      "height": 482,
      "width": 1728,
      "mediaKey": "y6cbe1XoK0o9muPFcwY48tE6+dtapdE3m7BmSCGIZUY=",
      "fileEncSha256": "2Qp8gKmnazumKDIYvotqNdFmkzCEQwHVQ3AM3sEdFeE=",
      "directPath": "/o1/v/t62.7118-24/f1/m230/up-oil-image-807ef642-4b4b-4ed9-b9b8-c9cc855796...",
      "mediaKeyTimestamp": "1689625686",
      "jpegThumbnail": "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV1...",
      "contextInfo": {}
    }
  },
  "messageTimestamp": "1689625687",
  "status": "PENDING"
}
```

### Explanation of Parameters

<!-- prettier-ignore -->
Parameter | Type | Description
-|-|-
number | Required | Enter the remoteJid or groupJid to whom the message will be sent.<br /><br />**remoteJid** = Number in DDI + DDD + Number format, with or without the @s.whatsapp.net ending.<br /><br />Ex: 5511911111111 or 5511911111111@s.whatsapp.net<br /><br />**groupJid** = Accepts the group identifier in hash format for new groups, or remoteJid + "-" + timestamp for old groups. In this cases, it is mandatory to inform the @g.us ending.<br /><br />Ex: 120363024158769234@g.us or 5511911111111-1111111111@g.us
options.delay | Optional | Time in milliseconds that the message must wait until it is sent, showing the presence information configured in the next item.
options.presence| Optional | The "composing" content will make the message "typing" appear in the WhatsApp™ top menu, during the time defined in the previous item.
mediaMessage.mediaType | Required | Inform "image".
mediaMessage.caption | Optional | Inform the caption text of the media you want to send, being able to use the same resources that you would use in the app or on the web, which are:<br /><br /> - Emojis<br /> - Bold, enter \*yourtext\* <br /> - Italics, between \_yourtext\_ <br /> - Scratched, come in \~yourtext\~ <br /> - Monospace between \```yourtext\``` <br /><br /> _To break a line, enter "\n" in the message._ <br /><br />Check the example in the payload for better understanding.
mediaMessage.media | Required | Enter the public url of the image.<br /><br /> We recommend a hosting service that does not block API access.

:::note Note:
Every message sent by the Evolution API initially has the status PENDING.

This indicates that the sending was successful and the message is waiting for the following statuses, which will be sent to the MESSAGES_UPDATE Webhook.
:::

:::danger Warning:
It is extremely necessary that the payload obey the rules for creating a JSON file, considering the correct arrangement of items, formatting, square brackets, braces and commas, etc.

Before consuming the endpoint, if you have questions about the JSON formatting, go to https://jsonlint.com/ and validate.
:::
