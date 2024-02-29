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
slug: /websocket-connection
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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="js" label="NodeJs">

```javascript
// Require the Socket.IO client library
const io = require("socket.io-client");

// Establish a connection to the WebSocket server
const socket = io("wss://api.yoursite.com/instance_name", {
  transports: ["websocket"], // Specify that only WebSockets should be used
});

// Event listener for successful connection
socket.on("connect", () => {
  console.log("Connected to the WebSocket server successfully");
});

// Listen for custom events from the server
socket.on("event_name", (data) => {
  // Handle the event and process the received data
  console.log("Event received:", data);
});

// Event listener for disconnection
socket.on("disconnect", () => {
  console.log("Disconnected from the WebSocket server");
});

// Handle connection errors (e.g., server unreachable)
socket.on("connect_error", (error) => {
  console.log("Connection error:", error.message);
});
```

</TabItem>
<TabItem value="rc" label="React">

```javascript
// Use client-side for this component
"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Assuming these types are defined for TypeScript usage
// type QrCodeProps = {
//   base64: string;
//   apikey: string;
//   token: string;
// }

const QrCode = ({ base64 }) => {
  const [qrCodeSrc, setQrCodeSrc] = useState("");
  const [connectionStatus, setConnectionStatus] = useState(
    "Waiting for QRCode..."
  );

  useEffect(() => {
    // Initializes the socket inside useEffect to avoid unreachable code
    const socket = io(`wss://api.yoursite.com/instance_name`, {
      transports: ["websocket"],
    });

    // Sets up socket listeners after connecting
    socket.on("connect", () => {
      setQrCodeSrc(base64); // Use the base64 passed via props
      console.log(base64);
      setConnectionStatus("Scan the QRCode...");
    });

    socket.on("qrcode.updated", (data) => {
      // Dynamically updates the QR Code and connection status
      setQrCodeSrc(data.data.qrcode.base64);
      setConnectionStatus("Waiting for connection...");
    });

    socket.on("connection.update", (data) => {
      // Updates the connection state based on the state received from the socket
      const { state } = data.data;
      switch (state) {
        case "close":
          setConnectionStatus("Recreating connection...");
          break;
        case "connecting":
          setConnectionStatus("Attempting to connect...");
          break;
        case "open":
          setConnectionStatus("Successfully connected...");
          setTimeout(() => {
            window.location.reload();
          }, 3500);
          break;
        default:
          // Handle unknown or explicitly unhandled states
          setConnectionStatus("Unknown state...");
          break;
      }
    });

    // Cleans up and disconnects the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [base64]); // useEffect dependencies

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <img src={qrCodeSrc} alt="QR Code" height="250" width="250" />
      <div>{connectionStatus}</div>
    </div>
  );
};

export default QrCode;
```

</TabItem>
<TabItem value="php" label="PHP">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>QR Code WebSocket</title>
    <!-- Ensure jQuery is included -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Include Socket.IO -->
    <script src="https://cdn.socket.io/4.2.0/socket.io.min.js"></script>
  </head>
  <body>
    <div id="qrcode"><img src="" alt="QR Code" style="display:none;" /></div>
    <div id="statusConnect">Waiting for QRCode...</div>

    <script>
      $(document).ready(function() {
        // Establishes the WebSocket connection using Socket.IO
        const socket = io('wss://<?= htmlspecialchars($data->getServer()->domain); ?>/<?= htmlspecialchars($data->uuid); ?>', {
            transports: ['websocket']
        });

        socket.on('connect', () => {
            // Upon connection, display the initial QR Code (if available)
            $("#qrcode img").attr('src', 'data:image/png;base64,<?= htmlspecialchars($instance->base64 ?? ''); ?>').show();
            $('#statusConnect').html('Scan the QRCode...');
        });

        // Updates the QR Code when a new one is received
        socket.on('qrcode.updated', (data) => {
            $("#qrcode img").attr('src', 'data:image/png;base64,' + data.data.qrcode.base64).show();
            $('#statusConnect').html('Waiting for connection...');
        });

        // Updates connection status based on received events
        socket.on('connection.update', (data) => {
            switch (data.data.state) {
                case 'close':
                    $('#statusConnect').html('Recreating connection...');
                    break;
                case 'connecting':
                    $('#statusConnect').html('Attempting to connect...');
                    break;
                case 'open':
                    $('#statusConnect').html('Successfully connected...');
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 3500);
                    break;
            }
        });
      });
    </script>
  </body>
</html>
```

</TabItem>
</Tabs>

In this example, replace event_name with the specific event you want to listen to.

### Handling Events

Once connected, you can listen for various events emitted by the server. Each event may carry data relevant to the event's context. For instance, if you're listening for message updates, you might receive data containing the updated message content and metadata.

<!-- prettier-ignore -->
**Event**                   | **Description**
---                         | ---
 application.startup        | Notifies you when an application startup.
 qrcode.updated             | Sends the base64 of the qrcode for reading
 connection.update          | Informs the status of the connection with WhatsApp
 messages.set               | Sends a list of all your messages uploaded on WhatsApp. This event occurs only once
 messages.upsert            | Notifies you when a message is received
 messages.update            | Tells you when a message is updated
 messages.delete            | Tells you when a message is deleted
 send.message               | Notifies when a message is sent
 contacts.set               | Performs initial loading of all contacts.This event occurs only once
 contacts.upsert            | Reloads all contacts with additional information.This event occurs only once
 contacts.update            | Informs you when the chat is updated
 presence.update            | Informs if the user is online, if he is performing some action like writing or recording and his last seen: 'unavailable', 'available', 'composing', 'recording', 'paused'
 chats.set                  | Send a list of all loaded chats
 chats.update               | Informs you when the chat is updated
 chats.upsert               | Sends any new chat information
 groups.upsert              | Notifies when a group is created
 groups.update              | Notifies when a group has its information updated
 group-participants.update  | Notifies when an action occurs involving a participant: 'add', 'remove', 'promote', 'demote'
 new.jwt                    | Notifies when the token (jwt) is updated

### Sending Messages

You can also send messages to the server using the emit method:

```javascript
socket.emit('send.message', { message: 'Hello, World!' });
In this case, send.message is the event name, and the object { message: 'Hello, World!' } is the data being sent.
```

### Closing the Connection

To close the WebSocket connection, use the disconnect method:

```javascript
socket.disconnect();
```

Remember to handle the connection responsibly, disconnecting when your application or component unmounts to prevent memory leaks and ensure efficient resource usage.

By leveraging WebSockets, Evolution API offers a powerful way to interact with the system in real time, providing a seamless experience for both developers and end-users.
