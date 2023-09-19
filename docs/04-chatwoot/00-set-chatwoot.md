# Set ChatWoot

:::info Instructions:
Swap the existing content between {{  }} for whatever matches your scenario or need.
:::

| Method | Endpoint                              |
| ------ | ------------------------------------- |
| POST   | {{baseUrl}}/chatwoot/set/{{instance}} |

## Set Instance from ChatWoot™

In this option it is possible to associate an instance already created to make the connection with ChatWoot™, automatically generating the Inbox and the Contact for the Bot EvolutionAPI.

If the QrCode option is selected as "true", a message with the QrCode will already be created in the conversation to be read by your device.

It is also possible to mark as "true" the option to automatically sign messages with the Attendant's name.

### Data to be sent in the Request

```json title=Payload
{
  "enabled": true,
  "account_id": 1,
  "token": "token",
  "url": "https://app.chatwoot.com",
  "sign_msg": true
}
```

### Data returned from the Request

```json title=Result
{
  "instance": {
    "instanceName": "{{instance}}",
    "status": "created"
  },
  "hash": {
    "apikey": "{{apikey}}"
  },
  "webhook": "{{webhook}}",
  "events": [
    "QRCODE_UPDATED",
    "MESSAGES_UPSERT",
    "MESSAGES_UPDATE",
    "SEND_MESSAGE",
    "CONNECTION_UPDATE"
  ],
  "chatwoot": {
    "enabled": true,
    "account_id": {{account_id}},
    "token": "{{token}}",
    "url": "{{url}}",
    "sign_msg": false,
    "name_inbox": "{{name_inbox}}",
    "webhook_url": "{{webhook_url}}"
  }
}
```

### Explanation of Parameters

<!-- prettier-ignore -->
Parameter | Type | Description
--- | --- | ---
enabled | Required | Does it generate the QRCode automatically? <br /><br /> _Accepted values ​​are "true" or "false"._
account_id | Optional | Your ChatWoot Account ID. <br /><br /> _Enter only if you are joining ChatWoot™._
token | Optional | Your Access Token, which must be obtained from your ChatWoot™ installation. <br /><br /> _Only inform if you are installing with ChatWoot™._
url | Optional | Installation URL of your ChatWoot™. <br /><br /> _Enter only if you are joining ChatWoot™._
sign_msg | Optional | Do you want messages to be signed with the Attendant's name? <br /><br />_Accepted values ​​are "true" or "false". <br /><br /> Enter only if you are joining ChatWoot™._

:::danger Warning:

It is extremely necessary that the payload obey the rules for creating a JSON file, considering the correct arrangement of items, formatting, square brackets, braces and commas, etc.

Before consuming the endpoint, if you have questions about the JSON formatting, go to https://jsonlint.com/ and validate.
:::
