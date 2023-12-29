---
sidebar_position: 5
---

# Logout da Instância

| Método | Endpoint                                 |
| ------ | ---------------------------------------- |
| DELETE | {{baseUrl}}/instance/logout/{{instance}} |

### Dados a serem enviados na solicitação

```json title=Payload
Esta solicitação não possui carga útil.
```

### Dados retornados pela solicitação

```json title=Result
{
  "error": "{{error}}",
  "message": "{{message}}"
}
```
