---
id: websocket
title: Websocket
hide_title: true
hide_table_of_contents: false
sidebar_label: Websocket
sidebar_position: 4
pagination_label: Websocket
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Capture Websocket events of Evolution API in your application.
keywords:
  - Optional Resources
  - Developers
  - Websocket
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/19/2023
  author: matheus
---

## Using WebSockets in Evolution API

Evolution API utilizes socket.io to emit events, leveraging WebSocket technology. This makes the development of integrations more efficient and straightforward for developers. WebSocket provides a full-duplex communication channel over a single, long-lived connection, enabling real-time data flow between the client and server.

### Connecting to WebSocket

To connect to the WebSocket server in the Evolution API, you can use the following URL format:

```plaintext
wss://api.yoursite.com/instance_name
```

Replace api.yoursite.com with your actual API domain and instance_name with the name of your specific instance.

Example of Establishing a WebSocket Connection
Here's a basic example of how to establish a WebSocket connection using JavaScript:

```javascript
const socket = io('wss://api.yoursite.com/instance_name', {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('Connected to Evolution API WebSocket');
});

// Listening to events
socket.on('event_name', (data) => {
  console.log('Event received:', data);
});

// Handling disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from Evolution API WebSocket');
});
```

In this example, replace event_name with the specific event you want to listen to.

### Handling Events

Once connected, you can listen for various events emitted by the server. Each event may carry data relevant to the event's context. For instance, if you're listening for message updates, you might receive data containing the updated message content and metadata.

### Sending Messages

You can also send messages to the server using the emit method:

```javascript
socket.emit('send_message', { message: 'Hello, World!' });
In this case, send_message is the event name, and the object { message: 'Hello, World!' } is the data being sent.
```

### Closing the Connection

To close the WebSocket connection, use the disconnect method:

```javascript
socket.disconnect();
```

Remember to handle the connection responsibly, disconnecting when your application or component unmounts to prevent memory leaks and ensure efficient resource usage.

By leveraging WebSockets, Evolution API offers a powerful way to interact with the system in real time, providing a seamless experience for both developers and end-users.