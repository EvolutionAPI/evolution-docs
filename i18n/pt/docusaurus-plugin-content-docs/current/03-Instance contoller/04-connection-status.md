---
sidebar_position: 4
---

# Connection Status

| Method | Endpoint                                          |
| ------ | ------------------------------------------------- |
| GET    | {{baseUrl}}/instance/connectionState/{{instance}} |

### Data to be sent in the Request

```json title=Payload
This request has no payload.
```

### Data returned from the Request

```json title=Result
{
  "state": "{{state}}",
  "statusReason": {{statusCode}}
}
```
