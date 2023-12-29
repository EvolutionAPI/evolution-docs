# Encontrar Webhook

| Método | Endpoint                              |
| ------ | ------------------------------------- |
| GET    | {{baseUrl}}/webhook/find/{{instance}} |

### Dados a serem enviados na solicitação:

```json title=Payload
Esta solicitação não possui carga útil.
```

### Dados retornados da solicitação:

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
