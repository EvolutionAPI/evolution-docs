---
sidebar_position: 4
---

# Status da Conexão

| Método | Endpoint                                          |
| ------ | ------------------------------------------------- |
| GET    | [baseUrl]/instance/connectionState/[instance] |

### Dados a serem enviados na solicitação

```json title=Payload
Esta solicitação não possui carga útil.
```

### Dados retornados pela solicitação

```json title=Result
{
  "state": "[state]",
  "statusReason": [statusCode]
}
```
