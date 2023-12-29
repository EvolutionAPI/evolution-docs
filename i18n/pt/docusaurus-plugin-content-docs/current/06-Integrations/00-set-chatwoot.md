# Configurar ChatWoot

:::info Instruções:
Substitua o conteúdo existente entre {{  }} pelo que corresponder ao seu cenário ou necessidade.
:::

| Método | Endpoint                              |
| ------ | ------------------------------------- |
| POST   | {{baseUrl}}/chatwoot/set/{{instance}} |

## Configurar Instância no ChatWoot™

Nesta opção, é possível associar uma instância já criada para estabelecer a conexão com o ChatWoot™, gerando automaticamente a Caixa de Entrada (Inbox) e o Contato para o Bot EvolutionAPI.

Se a opção QrCode for selecionada como "true", uma mensagem com o QrCode já será criada na conversa para ser lida pelo seu dispositivo.

Também é possível marcar como "true" a opção de assinar automaticamente as mensagens com o nome do Atendente.

### Dados a serem enviados na Requisição


```json title=Payload
{
  "enabled": true,
  "account_id": 1,
  "token": "token",
  "url": "https://app.chatwoot.com",
  "sign_msg": true
}
```

### Dados retornados da Solicitação

```json title=Result
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

### Explicação dos parâmetros

<!-- prettier-ignore -->
Parameter | Type | Description
--- | --- | ---
enabled | Obrigatório | Gera automaticamente o QRCode? <br /><br /> _Os valores aceitos são "true" ou "false"._
account_id | Opcional | Seu ID de Conta no ChatWoot. <br /><br /> _Informe somente se você estiver se conectando ao ChatWoot™._
token | Opcional | Seu Token de Acesso, que deve ser obtido a partir da sua instalação do ChatWoot™. <br /><br /> _Informe somente se você estiver instalando com o ChatWoot™._
url | Opcional | URL de instalação do seu ChatWoot™. <br /><br /> _Informe somente se você estiver se conectando ao ChatWoot™._
sign_msg | Opcional | Deseja que as mensagens sejam assinadas com o nome do Atendente? <br /><br />_Os valores aceitos são "true" ou "false". <br /><br /> Informe somente se você estiver se conectando ao ChatWoot™._

:::danger Atenção:

É extremamente necessário que o payload obedeça às regras para criar um arquivo JSON, considerando o arranjo correto de itens, formatação, colchetes, chaves e vírgulas, etc.

Antes de consumir o endpoint, se você tiver dúvidas sobre a formatação JSON, vá para https://jsonlint.com/ e valide.
:::

