# Encontrar ChatWoot

| Método | Endpoint                              |
| ------ | ------------------------------------- |
| GET    | {{baseUrl}}/chatwoot/find/{{instance}} |

### Dados a serem enviados na Requisição

```json title=Payload
Esta requisição não possui payload.
```

### Dados retornados da Requisição



```json title=Result
{
  "enabled": true,
  "url": "{{url}}",
  "webhookByEvents": false,
  "events": [
    {{events}}
  ]
}
```
