---
sidebar_position: 0
---

# Criar Instância

## CRIAR INSTÂNCIAS

:::note Instruções:

Substitua o conteúdo existente entre {{  }} pelo que corresponde ao seu cenário ou necessidade.

:::

| Método | Endpoint                    |
| ------ | --------------------------- |
| POST   | {{baseUrl}}/instance/create |

## CRIAÇÃO BÁSICA DE INSTÂNCIA

Esta é a opção de Criação Básica de Instância da Evolution API.

É recomendada para aqueles que desejam apenas enviar mensagens e não precisam monitorar respostas ou dados recebidos de contatos.

### Dados a serem enviados na Requisição

```json title=Payload
{
  "instanceName": "{{instance}}",
  "token": "{{apikey}}",
  "qrcode": true
}
```

### Dados retornados pela Requisição

```json title=Result
{
  "instance": {
    "instanceName": "{{instance}}",
    "status": "created"
  },
  "hash": {
    "apikey": "{{apikey}}"
  },
  "qrcode": {
    "code": "{{code}}",
    "base64": "{{base64}}"
  }
}
```

## CRIAR INSTÂNCIA COM WEBHOOK

Nesta opção, além dos dados básicos, é possível criar a instância com Webhook, passando uma URL para receber os dados e também selecionar quais eventos você deseja receber.

Opcionalmente, você pode escolher receber tudo em um único Webhook ou em vários Webhooks separados por eventos.

### Dados a serem enviados na Requisição

```json title=Payload
{
  "instanceName": "{{instance}}",
  "token": "{{apikey}}",
  "qrcode": true,
  "webhook": "{{webhookUrl}}",
  "webhookByEvents": false,
  "events": [
    // "APPLICATION_STARTUP",
    "QRCODE_UPDATED",
    // "MESSAGES_SET",
    "MESSAGES_UPSERT",
    "MESSAGES_UPDATE",
    "MESSAGES_DELETE",
    "SEND_MESSAGE",
    // "CONTACTS_SET",
    // "CONTACTS_UPSERT",
    // "CONTACTS_UPDATE",
    // "PRESENCE_UPDATE",
    // "CHATS_SET",
    // "CHATS_UPSERT",
    // "CHATS_UPDATE",
    // "CHATS_DELETE",
    // "GROUPS_UPSERT",
    // "GROUP_UPDATE",
    // "GROUP_PARTICIPANTS_UPDATE",
    "CONNECTION_UPDATE"
    // "NEW_JWT_TOKEN"
  ]
}
```

### Dados retornados da Requisição

```json title=Resultado
{
  "instance": {
    "instanceName": "{{instance}}",
    "status": "created"
  },
  "hash": {
    "apikey": "{{apikey}}"
  },
  "webhook": "{{webhook}}",
  "events": [
    "QRCODE_UPDATED",
    "MESSAGES_UPSERT",
    "MESSAGES_UPDATE",
    "SEND_MESSAGE",
    "CONNECTION_UPDATE"
  ],
  "qrcode": {
    "code": "{{code}}",
    "base64": "{{base64}}"
  }
}
```

## CRIAR INSTÂNCIA DO CHATWOOT™

Nesta opção, é possível criar a instância para a conexão com o ChatWoot™, gerando automaticamente a Caixa de Entrada e o Contato para o Bot EvolutionAPI.

Se a opção QrCode for selecionada como "true", uma mensagem com o QrCode já será criada na conversa para ser lida pelo seu dispositivo.

Também é possível marcar como "true" a opção de assinar automaticamente as mensagens com o nome do Atendente.

### Dados a serem enviados na Requisição

```json title=Payload
{
  "instanceName": "{{instance}}",
  "token": "{{apikey}}",
  "qrcode": true,
  "chatwoot_account_id": 1,
  "chatwoot_token": "token",
  "chatwoot_url": "https://app.chatwoot.com",
  "chatwoot_sign_msg": true
}
```

### Dados retornados da Requisição

```json title=Resultado
{
  "instance": {
    "instanceName": "{{instance}}",
    "status": "created"
  },
  "hash": {
    "apikey": "{{apikey}}"
  },
  "webhook": "{{webhook}}",
  "events": [
    "QRCODE_UPDATED",
    "MESSAGES_UPSERT",
    "MESSAGES_UPDATE",
    "SEND_MESSAGE",
    "CONNECTION_UPDATE"
  ],
  "qrcode": {
    "code": "{{code}}",
    "base64": "{{base64}}"
  },
  "chatwoot": {
    "enabled": true,
    "account_id": {{account_id}},
    "token": "{{token}}",
    "url": "{{url}}",
    "sign_msg": false,
    "name_inbox": "{{name_inbox}}",
    "webhook_url": "{{webhook_url}}"
  }
}
```

### Explicação dos Parâmetros

<!-- prettier-ignore -->
Peço desculpas pela formatação anterior. Aqui está a explicação dos parâmetros em formato de tabela:

| Parâmetro              | Tipo     | Descrição                                                                                                                             |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| instanceName           | Obrigatório | Nome da instância a ser criada. Será usado para identificar a conexão e referenciar os endpoints.                                  |
| token                   | Obrigatório | Token da sua instância, usado como chave de autenticação para enviar endpoints. Se não informado, um UUID aleatório será gerado. |
| qrcode                  | Obrigatório | Define se um QRCode será gerado automaticamente para a instância. Aceita "true" ou "false".                                         |
| webhook                 | Opcional  | URL do webhook para receber dados de eventos, usado para armazenar ou gerenciar mensagens e mídias recebidas.                      |
| webhook_by_events       | Opcional  | Define se deve ser gerada uma URL de webhook específica para cada evento. Aceita "true" ou "false".                                |
| events                  | Opcional  | Lista de eventos a serem processados. Remova eventos não desejados da lista.                                                         |
| chatwoot_account_id     | Opcional  | ID da conta ChatWoot, necessário apenas para instalação com ChatWoot™.                                                               |
| chatwoot_token          | Opcional  | Token de acesso, obtido na instalação ChatWoot™, necessário apenas para instalação com ChatWoot™.                                    |
| chatwoot_url            | Opcional  | URL de instalação do ChatWoot™, necessário apenas para instalação com ChatWoot™.                                                       |
| chatwoot_sign_msg       | Opcional  | Define se as mensagens serão assinadas com o nome do atendente. Aceita "true" ou "false", necessário apenas para instalação com ChatWoot™.  |


:::danger Aviso:

É extremamente necessário que a carga útil (payload) siga as regras para a criação de um arquivo JSON, considerando o arranjo correto dos itens, formatação, colchetes, chaves e vírgulas, etc.

Antes de consumir o endpoint, se você tiver dúvidas sobre a formatação JSON, vá para https://jsonlint.com/ e valide.
:::
