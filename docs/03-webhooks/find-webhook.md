---
sidebar_position: 1
---

# Find Webhook

| Method | Endpoint                              |
| ------ | ------------------------------------- |
| GET    | {{baseUrl}}/webhook/find/{{instance}} |

### Data to be sent in the Request:

```json title=Payload
This request has no payload.
```

### Data returned from the Request:

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
