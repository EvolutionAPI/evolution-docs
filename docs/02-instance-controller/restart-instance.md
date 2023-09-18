---
sidebar_position: 3
---

# Restart Instance

| Method | Endpoint                                  |
| ------ | ----------------------------------------- |
| PUT    | {{baseUrl}}/instance/restart/{{instance}} |

Data to be sent in the Request

```json title=Payload
This request has no payload.
```

Data returned from the Request

```json title=Result
{
  "state": "{{state}}",
  "statusReason": {{statusCode}}
}
```
