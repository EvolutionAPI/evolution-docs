---
sidebar_position: 6
---

# Send Status/Stories Audio

:::note Instructions:
Swap the existing content between [  ] for whatever matches your scenario or need.
:::

| Method | Endpoint                                    |
| ------ | ------------------------------------------- |
| POST   | [baseUrl]/message/sendStatus/[instance] |

Send a audio Status/Stories to one, some or all contacts in your list.

### Data to be sent in the Request

```json title=Payload
{
    "statusMessage": {
        "type": "audio",
        "content": "https://evolution-api.com/files/narratedaudio.mp3",
        "allContacts": false
        "statusJidList": [
            "[remoteJid]@s.whatsapp.net"
        ]
    }
}
```

### Data returned from the Request

```json title=Result
{
  "key": {
    "remoteJid": "status@broadcast",
    "fromMe": true,
    "id": "BAE5B0FC8A8EA66F"
  },
  "message": {
    "audioMessage": {
      "url": "https://mmg.whatsapp.net/v/t62.7114-24/28510574_1291945264794607_9192703486876771390_n.enc?ccb=11-4&oh=01_AdQIRJtm58sVzCQUneKp1a0-WGw8fIZtjyUm1rqP5xA-QQ&oe=64DD2832&mms3=true",
      "mimetype": "audio/mp4",
      "fileSha256": "9gAg85yo8szE2mFn9ZO4wG+P3wilP3txBR7uPVjvRj4=",
      "fileLength": "326006",
      "seconds": 19,
      "ptt": true,
      "mediaKey": "F8BinfCyJuCDTBB9jnLNSgWxjvyxH1clqSVOmPwtqBY=",
      "fileEncSha256": "r8veVXB8gf87qjNRhjeDWlAkrdL1fvNgcapy5lh9N04=",
      "directPath": "/v/t62.7114-24/28510574_1291945264794607_9192703486876771390_n.enc?ccb=11-4&oh=01_AdQIRJtm58sVzCQUneKp1a0-WGw8fIZtjyUm1rqP5xA-QQ&oe=64DD2832",
      "mediaKeyTimestamp": "1689624384"
    }
  },
  "messageTimestamp": "1689624384",
  "status": "PENDING",
  "participant": "[sender]@s.whatsapp.net"
}
```

### Explanation of Parameters

<!-- prettier-ignore -->
Parameter | Type | Description
-|-|-
statusMessage.type | Required | Inform audio to send Waveform.
statusMessage.content | Required | Enter the public url of the audio.<br /><br />We recommend a hosting service that does not block API access.
statusMessage.allContacts | Required | To send to ALL contacts, type "true".<br /><br />Accepted values ​​are "true" or "false".<br /><br />If "false" is informed, the "statusJidList" becomes required.
statusMessage.statusJidList | Optional | Enter the remoteJid of one or more contacts you want to send status/stories.<br /><br />**remoteJid** = Number in DDI + DDD + Number format, with or without the @s.whatsapp.net ending.<br /><br />Ex: 5511911111111 or 5511911111111@s.whatsapp.net<br /><br />If you want to send it to more than one contact, just separate them with commas, as shown in the example below:<br /><br />   551191111111,<br />5511922222222,<br />5511933333333

:::note Note:
Every message sent by the Evolution API initially has the status PENDING.

This indicates that the sending was successful and the message is waiting for the following statuses, which will be sent to the MESSAGES_UPDATE Webhook.
:::

:::danger Warning:
It is extremely necessary that the payload obey the rules for creating a JSON file, considering the correct arrangement of items, formatting, square brackets, braces and commas, etc.

Before consuming the endpoint, if you have questions about the JSON formatting, go to https://jsonlint.com/ and validate.
:::
