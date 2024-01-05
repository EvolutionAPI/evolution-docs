---
id: rabbitmq
title: RabbitMQ
hide_title: true
hide_table_of_contents: false
sidebar_label: RabbitMQ
sidebar_position: 2
pagination_label: RabbitMQ
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Integre filas RabbitMQ em seu ambiente de desenvolvimento com a API Evolution.
keywords:
  - Optional Resources
  - RabbitMQ
  - Developers
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/19/2023
  author: matheus
---

## Ativando o RabbitMQ

Para utilizar efetivamente o RabbitMQ com a Evolution API para o gerenciamento de instâncias do WhatsApp, é essencial ativar o RabbitMQ em cada instância individual do WhatsApp. Essa ativação permite que cada instância comece a receber e processar solicitações de fila AMQP (Protocolo Avançado de Filas de Mensagens) específicas para aquela instância específica do WhatsApp.

Em outras palavras, para cada instância do WhatsApp onde você deseja usar o RabbitMQ, você precisa garantir que a integração com o RabbitMQ esteja ativada. Essa configuração permitirá que a instância se comunique com o servidor RabbitMQ e lide com sua fila de mensagens e solicitações. Ativar o RabbitMQ em cada instância é crucial para a distribuição e gerenciamento adequados de tarefas de mensagens em diferentes instâncias do WhatsApp em seu sistema.

### Configuração do RabbitMQ para uma instância individual

Para **desenvolvedores** que desejam usar em suas aplicações um sistema de mensagens AMQP, é possível usar o RabbitMQ para enfileirar as ações de suas instâncias.

Para configurar o RabbitMQ para instâncias individuais do WhatsApp na Evolution API, você pode usar o seguinte endpoint:


```plaintext title="POST"
[baseUrl]/rabbitmq/set/[instance_name]
```

Este endpoint permite habilitar o RabbitMQ e especificar a quais eventos cada instância do WhatsApp deve se inscrever na fila AMQP. Abaixo está um exemplo do corpo JSON para este endpoint:

```json title="body" showLineNumbers
{
    "enabled": true,
    "events": [
       // Lista de eventos para se inscrever. Descomente os eventos que você precisa.
        "APPLICATION_STARTUP",
        "QRCODE_UPDATED",
        "MESSAGES_SET",
        "MESSAGES_UPSERT",
        "MESSAGES_UPDATE",
        "MESSAGES_DELETE",
        "SEND_MESSAGE",
        "CONTACTS_SET",
        "CONTACTS_UPSERT",
        "CONTACTS_UPDATE",
        "PRESENCE_UPDATE",
        "CHATS_SET",
        "CHATS_UPSERT",
        "CHATS_UPDATE",
        "CHATS_DELETE",
        "GROUPS_UPSERT",
        "GROUP_UPDATE",
        "GROUP_PARTICIPANTS_UPDATE",
        "CONNECTION_UPDATE",
        "CALL",
        "NEW_JWT_TOKEN"
    ]    
}
```

:::tip LEMBRETE

Remova os eventos não utilizados para manter baixo uso de recursos com o RabbitMQ.

:::

Ao configurar a integração com o RabbitMQ, ajuste a matriz de eventos no corpo JSON para incluir apenas os eventos aos quais você deseja se inscrever. Remova os comentários de qualquer evento que você deseja habilitar para notificações do RabbitMQ.

Agora você pode enviar mensagens para a sua aplicação e consumi-las no RabbitMQ.

:::note NOTA

Se você deseja uma configuração mais detalhada ou personalizada, verifique a seção de variáveis de ambiente.

:::

