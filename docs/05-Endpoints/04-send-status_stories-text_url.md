---
sidebar_position: 4
---

# Send Status/Stories Text/Url

:::note Instructions:
Swap the existing content between {{  }} for whatever matches your scenario or need.
:::

| Method | Endpoint                                    |
| ------ | ------------------------------------------- |
| POST   | {{baseUrl}}/message/sendStatus/{{instance}} |

Send a text or url (clickable) Status/Stories to one, some or all contacts in your list.

### Data to be sent in the Request

```json title=Payload
{
  "statusMessage": {
    "type": "text",
    "content": "Hi, how are you today? 😉👍\n\nSee more in\n\nhttps://evolution-api.com/",
    "backgroundColor": "#008000",
    "font": 1,
    "allContacts": false,
    "statusJidList": ["{{remoteJid}}@s.whatsapp.net"]
  }
}
```

### Data returned from the Request

```json title=Result
{
  "key": {
    "remoteJid": "status@broadcast",
    "fromMe": true,
    "id": "BAE59F76997142F0"
  },
  "message": {
    "extendedTextMessage": {
      "text": "Hi, how are you today? 😉👍\n\nSee more in\n\nhttps://evolution-api.com/",
      "matchedText": "https://evolution-api.com/",
      "canonicalUrl": "https://evolution-api.com/opensource-whatsapp-api/",
      "title": "OpenSource WhatsApp API – Evolution API",
      "backgroundArgb": 4278222848,
      "font": "SERIF",
      "previewType": "NONE",
      "thumbnailDirectPath": "/o1/v/t62.7118-24/f1/m230/up-oil-image-bae65e3e-9813-4686-99a5-53ab5e2336c7?ccb=9-4&oh=01_AdRENApzu4pB-Y6VDbbGWfD6w91B1rmxgveUJH_cCmt0Hg&oe=64DCEF1B",
      "thumbnailSha256": "QcKPDG2Bk+d3fPceiuS1cnGuBNgv/8hHM4UgcwYMtKk=",
      "thumbnailEncSha256": "UpEq8UfeJuT2/0A2nS7vEEIUZzIi+SmOydvvWQthzAs=",
      "mediaKey": "KXuIeKYSqsHVD8uxEoHnQPjXuADqTVCtfuI35zbmVxc=",
      "mediaKeyTimestamp": "1689621677",
      "thumbnailHeight": 0,
      "thumbnailWidth": 0
    }
  },
  "messageTimestamp": "1689621677",
  "status": "PENDING",
  "participant": "{{sender}}@s.whatsapp.net"
}
```

### Explanation of Parameters

<!-- prettier-ignore -->
Parameter | Type |	Description
-|-|-
statusMessage.type | Required | Inform text, to send text messages or clickable url's.
statusMessage.content |	Required | Inform the text of the message you want to send, being able to use the same resources you would use in the app or on the web, which are:<br /><br /> - Emojis<br /> - Bold, enter \*yourtext\*<br /> - Italics, between \_yourtext\_<br /> - Scratched, come in \~yourtext\~<br /> - Monospace between \```yourtext\``` <br /><br />To break a line, enter "\n" in the message. <br /><br />_Check the example in the payload for better understanding._
statusMessage.backgroundColor | Required | Enter the color you want for the status/stories background, using the Hex Color Code. <br /><br /> Examples:<br /><br />   #FFFFFF = White<br />   #0000FF = Blue<br />#008000 = Green<br />   #FFFF00 = Yellow<br />    #FF0000 = Red<br />   #800080 = Purple<br />    #808080 = Gray<br />    #FFC0CB = Pink <br />
statusMessage.font |	Required | Choose the font type to be used. <br /><br />Accept the options below:<br /><br />   1 = SERIF<br />   2 = NORICAN_REGULAR<br />   3 = BRYNDAN_WRITE<br />   4 = BEBASNEUE_REGULAR<br />   5 = OSWALD_HEAVY<br />
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
