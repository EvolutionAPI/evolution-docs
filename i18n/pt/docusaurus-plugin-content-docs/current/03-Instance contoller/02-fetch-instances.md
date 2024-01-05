---
sidebar_position: 2
---

# Buscar Instâncias

| Método | Endpoint                            |
| ------ | ----------------------------------- |
| GET    | [baseUrl]/instance/fetchInstances |

### Dados a serem enviados na solicitação

```json title=Payload
Esta solicitação não possui carga útil.
```

### Dados retornados pela solicitação

```json title=Result
[
  {
    "instance": {
      "instanceName": "[instance]",
      "owner": "[remoteJid]",
      "profileName": "[pushName]",
      "profilePictureUrl": "[profilePictureUrl]",
      "profileStatus": "[profileStatus]",
      "status": "open",
      "apikey": "[apikey]"
    }
  },
  {
    "instance": {
      "instanceName": "[instance]",
      "status": "connecting",
      "apikey": "[apikey]"
    }
  }
]
```
