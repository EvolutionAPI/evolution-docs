---
sidebar_position: 3
---

# Reiniciar Instância

| Método | Endpoint                                  |
| ------ | ----------------------------------------- |
| PUT    | {{baseUrl}}/instance/restart/{{instance}} |

### Dados a serem enviados na solicitação

```json title=Payload
Esta solicitação não possui carga útil.
```

### Dados retornados pela solicitação

```json title=Result
{
  "state": "{{state}}",
  "statusReason": {{statusCode}}
}
```
