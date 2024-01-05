# Configurar Webhook

:::info Instruções:
Substitua o conteúdo existente entre [  ] por qualquer coisa que corresponda ao seu cenário ou necessidade.
:::

| Método | Endpoint                             |
| ------ | ------------------------------------ |
| POST   | [baseUrl]/webhook/set/[instance] |

Após a criação da instância, você ainda pode configurar ou alterar as configurações do Webhook.

Basta inserir os novos dados e consumir o endpoint.

### Dados a serem enviados na solicitação:

```json title=Payload
{
  "enabled": true,
  "url": "[webhookUrl]",
  "webhookByEvents": false,
  "events": [
    // "APPLICATION_STARTUP",
    "QRCODE_UPDATED",
    // "MESSAGES_SET",
    "MESSAGES_UPSERT",
    "MESSAGES_UPDATE",
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

### Dados retornados da solicitação
```json title=Result
{
  "webhook": {
    "instanceName": "[instance]",
    "webhook": {
      "enabled": true,
      "url": "[url]",
      "webhookByEvents": false,
      "events": [
        "QRCODE_UPDATED",
        "MESSAGES_UPSERT",
        "MESSAGES_UPDATE",
        "SEND_MESSAGE",
        "CONNECTION_UPDATE"
      ]
    }
  }
}
```

### Explicação dos Parâmetros

<!-- prettier-ignore -->
Parâmetro | Tipo | Descrição
--- | --- | ---
enabled | Obrigatório | Insira "true" para criar ou alterar dados de Webhook, ou "false" se desejar parar de usá-lo. <br /><br /> Valores aceitos são "true" ou "false".
url | Opcional | URL de Webhook para receber dados de eventos. <br /><br /> _Insira a URL para criar ou alterar o Webhook, ou deixe em branco ("") se desejar parar de usá-lo._
webhook_by_events | Opcional | Deseja gerar uma URL de Webhook específica para cada um de seus eventos? <br /><br /> Valores aceitos são "true" ou "false". <br /><br /> _Se você não informou o parâmetro de URL, não é necessário informar este parâmetro._
events | Opcional | Lista de eventos a serem processados. <br /><br /> _Se você não deseja usar alguns desses eventos, basta removê-los da lista. <br /><br /> Os caracteres de comentário (//) foram colocados apenas para facilitar a compreensão e devem ser removidos antes de consumir o endpoint. <br /><br /> Se você não informou o parâmetro de URL, não é necessário informar este parâmetro._

<br />

:::danger Aviso:

É extremamente necessário que a carga obedeça às regras de criação de um arquivo JSON, considerando a disposição correta de itens, formatação, colchetes, chaves e vírgulas, etc.

Antes de consumir o endpoint, se você tiver dúvidas sobre a formatação JSON, acesse https://jsonlint.com/ e valide.
:::
