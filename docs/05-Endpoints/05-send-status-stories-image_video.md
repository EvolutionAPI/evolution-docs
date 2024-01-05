---
sidebar_position: 5
---

# Send Status Stories Image/Video

:::note Instructions:
Swap the existing content between [  ] for whatever matches your scenario or need.
:::

| Method | Endpoint                                    |
| ------ | ------------------------------------------- |
| POST   | [baseUrl]/message/sendStatus/[instance] |

Send a image or video Status/Stories to one, some or all contacts in your list.

### Data to be sent in the Request

```json title=Payload
{
  "statusMessage": {
    "type": "image",
    "content": "https://evolution-api.com/files/evolution-api.jpg",
    "caption": "This is my status/storie image. 📷",
    "allContacts": false,
    "statusJidList": ["[remoteJid]@s.whatsapp.net"]
  }
}
```

### Data returned from the Request

```json title=Result
{
  "key": {
    "remoteJid": "status@broadcast",
    "fromMe": true,
    "id": "BAE5689FDB7A25B6"
  },
  "message": {
    "imageMessage": {
      "url": "https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m231/up-oil-image-155d5601-7e78-4b9f-b...",
      "mimetype": "image/jpeg",
      "caption": "This is my status/storie image. 📷",
      "fileSha256": "8VXLU/xZb6avXAocU65TB8PYu2hqBYA7GR1SKNcF8rs=",
      "fileLength": "54005",
      "height": 482,
      "width": 1728,
      "mediaKey": "xVG4qXCr6dgG0P6v/c76p+2W26QDdWWjfsu6KaNZqsQ=",
      "fileEncSha256": "DGtpcQDfi6D8z1HIn/CRHCW0jIMXtB6mkswbbpC+Sok=",
      "directPath": "/o1/v/t62.7118-24/f1/m231/up-oil-image-155d5601-7e78-4b9f-bb7b-c432147ee35...",
      "mediaKeyTimestamp": "1689623202",
      "jpegThumbnail": "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19..."
    }
  },
  "messageTimestamp": "1689623202",
  "status": "PENDING",
  "participant": "[sender]@s.whatsapp.net"
}
```

### Explanation of Parameters

<!-- prettier-ignore -->
Parameter | Type | Description
---|---|---
statusMessage.type | Required | Inform image or video to send medias.
statusMessage.content | Required | Enter the public url of the image or video.<br /><br />We recommend a hosting service that does not block API access.
statusMessage.caption | Optional | Inform the caption text of the media you want to send, being able to use the same resources that you would use in the app or on the web, which are:<br /><br /> - Emojis<br /> - Bold, enter \*yourtext\*<br /> - Italics, between \_yourtext\_<br /> - Scratched, come in \~yourtext\~<br /> - Monospace between \```yourtext\```<br /><br />To break a line, enter "\n" in the message.<br /><br />Check the example in the payload for better understanding.
statusMessage.allContacts | Required | To send to ALL contacts, type "true".<br /><br />Accepted values ​​are "true" or "false".<br /><br />If "false" is informed, the "statusJidList" becomes required.
statusMessage.statusJidList | Optional | Enter the remoteJid of one or more contacts you want to send status/stories.<br /><br />**remoteJid** = Number in DDI + DDD + Number format, with or without the @s.whatsapp.net ending.<br /><br />Ex: 5511911111111 or 5511911111111@s.whatsapp.net<br /><br />If you want to send it to more than one contact, just separate them with commas, as shown in the example below:<br /><br />   551191111111,<br />   5511922222222,<br />    5511933333333

:::note Note:
Every message sent by the Evolution API initially has the status PENDING.

This indicates that the sending was successful and the message is waiting for the following statuses, which will be sent to the MESSAGES_UPDATE Webhook.
:::

:::danger Warning:
It is extremely necessary that the payload obey the rules for creating a JSON file, considering the correct arrangement of items, formatting, square brackets, braces and commas, etc.

Before consuming the endpoint, if you have questions about the JSON formatting, go to https://jsonlint.com/ and validate.
:::
