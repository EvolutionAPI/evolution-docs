---
id: websocket
title: Websocket
hide_title: true
hide_table_of_contents: false
sidebar_label: Websocket
sidebar_position: 4
pagination_label: Websocket
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Capture eventos Websocket da API Evolution em seu aplicativo.
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

## Usando WebSockets na Evolution API

A Evolution API utiliza o socket.io para emitir eventos, aproveitando a tecnologia WebSocket. Isso torna o desenvolvimento de integrações mais eficiente e direto para os desenvolvedores. WebSocket fornece um canal de comunicação full-duplex por meio de uma única conexão de longa duração, permitindo o fluxo de dados em tempo real entre o cliente e o servidor.

### Conectando ao WebSocket

Para se conectar ao servidor WebSocket na Evolution API, você pode usar o seguinte formato de URL:


```plaintext
wss://api.seusite.com/instance_name
```

Substitua api.yoursite.com pelo domínio real da sua API e instance_name pelo nome da sua instância específica.

Aqui está um exemplo básico de como estabelecer uma conexão WebSocket usando JavaScript:

```javascript
const socket = io('wss://api.yoursite.com/instance_name', {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('Conectado ao WebSocket da Evolution API');
});

// Ouvindo eventos
socket.on('event_name', (data) => {
  console.log('Evento recebido:', data);
});

// Lidando com desconexão
socket.on('disconnect', () => {
  console.log('Desconectado do WebSocket da Evolution API');
});
```

Neste exemplo, substitua `event_name` pelo evento específico que você deseja ouvir.

### Lidando com Eventos

Depois de conectado, você pode ouvir vários eventos emitidos pelo servidor. Cada evento pode transportar dados relevantes para o contexto do evento. Por exemplo, se você estiver ouvindo por atualizações de mensagens, pode receber dados que contenham o conteúdo atualizado da mensagem e metadados.

### Enviando Mensagens

Você também pode enviar mensagens para o servidor usando o método emit:


```javascript
socket.emit('send_message', { message: 'Olá, Mundo!' });
Neste caso, 'send_message' é o nome do evento, e o objeto { message: 'Olá, Mundo!' } é os dados que estão sendo enviados.
```

### Fechando a Conexão

Para encerrar a conexão WebSocket, utilize o método disconnect:


```javascript
socket.disconnect();
```

Lembre-se de tratar a conexão de forma responsável, desconectando-a quando a sua aplicação ou componente for desmontado para evitar vazamentos de memória e garantir uma utilização eficiente de recursos.

Ao aproveitar os WebSockets, a Evolution API oferece uma maneira poderosa de interagir com o sistema em tempo real, proporcionando uma experiência contínua tanto para desenvolvedores quanto para os usuários finais.
