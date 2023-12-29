---
sidebar_position: 3

description: Supported Webhook events
---

# Webhooks

## EVENTOS DE WEBHOOK SUPORTADOS

Webhooks permitem integração em tempo real entre a Evolution API e o WhatsApp™, permitindo sincronização e compartilhamento automatizados de dados.

Aqui está uma tabela que lista os eventos de webhook suportados pela Evolution API, juntamente com seus nomes de ambiente, eventos da API e descrições:

| Nome de Ambiente | Evento da API        | Descrição                                                                                     |
| ----------------- | --------------------- | ---------------------------------------------------------------------------------------------- |
| APPLICATION_STARTUP | application.startup | Notifica quando uma aplicação é inicializada.                                                  |
| QRCODE_UPDATED    | qrcode.updated       | Envia o código QR em base64 para leitura.                                                       |
| CONNECTION_UPDATE | connection.update    | Informa o status da conexão com o WhatsApp.                                                     |
| MESSAGES_SET      | message.set          | Envia uma lista de todas as suas mensagens enviadas para o WhatsApp. Este evento ocorre apenas uma vez. |
| MESSAGES_UPSERT   | message.upsert       | Notifica quando uma mensagem é recebida.                                                        |
| MESSAGES_UPDATE   | message.update       | Informa quando uma mensagem é atualizada.                                                        |
| MESSAGES_DELETE   | message.delete       | Informa quando uma mensagem é excluída.                                                          |
| SEND_MESSAGE      | send.message         | Notifica quando uma mensagem é enviada.                                                          |
| CONTACTS_SET      | contacts.set         | Realiza o carregamento inicial de todos os contatos. Este evento ocorre apenas uma vez.            |
| CONTACTS_UPSERT   | contacts.upsert      | Recarrega todos os contatos com informações adicionais. Este evento ocorre apenas uma vez.        |
| CONTACTS_UPDATE   | contacts.update      | Informa quando o chat é atualizado.                                                            |
| PRESENCE_UPDATE   | presence.update      | Informa se o usuário está online, se está realizando alguma ação como escrever ou gravar e seu último visto: 'indisponível', 'disponível', 'compondo', 'gravando', 'pausado'. |
| CHATS_SET         | chats.set            | Envie uma lista de todos os chats carregados.                                                     |
| CHATS_UPDATE      | chats.update         | Informa quando o chat é atualizado.                                                             |
| CHATS_UPSERT      | chats.upsert         | Envia informações sobre novos chats.                                                             |
| GROUPS_UPSERT     | groups.upsert        | Notifica quando um grupo é criado.                                                              |
| GROUPS_UPDATE     | groups.update        | Notifica quando as informações de um grupo são atualizadas.                                       |
| GROUP_PARTICIPANTS_UPDATE | group-participants.update | Notifica quando uma ação envolvendo um participante ocorre: 'adicionar', 'remover', 'promover', 'rebaixar'. |
| NEW_TOKEN         | new.jwt              | Notifica quando o token (jwt) é atualizado.                                                     |

Esses eventos de webhook permitem a integração em tempo real da Evolution API com o WhatsApp™, possibilitando a sincronização e o compartilhamento automatizado de dados. Eles são essenciais para criar bots de autoatendimento e sistemas multi-serviço.

## ROTAS DE WEBHOOK

Ao habilitar as opções WEBHOOK_BY_EVENTS nos webhooks globais e locais, os seguintes caminhos serão adicionados ao final do webhook.

:::note Exemplo:
Supondo que a URL do seu webhook era `https://sub.domain.com/webhook-test/exclusive-webhook-code`, para o evento `QR CODE ATUALIZADO`, a URL completa ficaria assim:

`https://sub.domain.com/webhook-test/exclusive-webhook-code/qrcode-updated`
:::

Aqui está uma descrição das sufixos adicionados ao final da URL do webhook para cada um dos eventos:

```
APPLICATION_STARTUP: /application-startup
QRCODE_UPDATED: /qrcode-updated
CONNECTION_UPDATE: /connection-update
MESSAGES_SET: /messages-set
MESSAGES_UPSERT: /messages-upsert
MESSAGES_UPDATE: /messages-update
MESSAGES_DELETE: /messages-delete
SEND_MESSAGES: /send-messages
CONTACTS_SET: /contacts-set
CONTACTS_UPSERT: /contacts-upsert
CONTACTS_UPDATE: /contacts-update
PRESENCE_UPDATE: /presence-update
CHATS_SET: /chats-set
CHATS_UPDATE: /chats-update
CHATS_UPSERT: /chats-upsert
GROUPS_UPSERT: /groups-upsert
GROUPS_UPDATE: /groups-update
GROUP_PARTICIPANTS_UPDATE: /groups-participants-update
NEW_TOKEN: /new-token
```
