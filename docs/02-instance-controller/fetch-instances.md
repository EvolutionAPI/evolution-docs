---
sidebar_position: 2
---

# Fetch Instances

| Method | Endpoint                            |
| ------ | ----------------------------------- |
| GET    | {{baseUrl}}/instance/fetchInstances |

Data to be sent in the Request

```json title=Payload
This request has no payload.
```

Data returned from the Request

```json title=Result
[
  {
    "instance": {
      "instanceName": "{{instance}}",
      "owner": "{{remoteJid}}",
      "profileName": "{{pushName}}",
      "profilePictureUrl": "{{profilePictureUrl}}",
      "profileStatus": "{{profileStatus}}",
      "status": "open",
      "apikey": "{{apikey}}"
    }
  },
  {
    "instance": {
      "instanceName": "{{instance}}",
      "status": "connecting",
      "apikey": "{{apikey}}"
    }
  }
]
```
