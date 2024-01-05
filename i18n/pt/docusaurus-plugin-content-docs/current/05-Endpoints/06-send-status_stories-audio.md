---
sidebar_position: 6
---

# Enviar Status/Stories Audio

:::note Instruções:

Substitua o conteúdo existente entre [  ] pelo que corresponder ao seu cenário ou necessidade.
:::

| Método | Endpoint                                    |
| ------ | ------------------------------------------- |
| POST   | [baseUrl]/message/sendStatus/[instance] |

Envie um áudio no Status/Stories para um, alguns ou todos os contatos em sua lista.

### Dados a serem enviados na Requisição


```json title=Payload
{
    "statusMessage": {
        "type": "audio",
        "content": "https://evolution-api.com/files/narratedaudio.mp3",
        "allContacts": false
        "statusJidList": [
            "[remoteJid]@s.whatsapp.net"
        ]
    }
}
```

### Dados retornados da Solicitação

```json title=Result
{
  "key": {
    "remoteJid": "status@broadcast",
    "fromMe": true,
    "id": "BAE5B0FC8A8EA66F"
  },
  "message": {
    "audioMessage": {
      "url": "https://mmg.whatsapp.net/v/t62.7114-24/28510574_1291945264794607_9192703486876771390_n.enc?ccb=11-4&oh=01_AdQIRJtm58sVzCQUneKp1a0-WGw8fIZtjyUm1rqP5xA-QQ&oe=64DD2832&mms3=true",
      "mimetype": "audio/mp4",
      "fileSha256": "9gAg85yo8szE2mFn9ZO4wG+P3wilP3txBR7uPVjvRj4=",
      "fileLength": "326006",
      "seconds": 19,
      "ptt": true,
      "mediaKey": "F8BinfCyJuCDTBB9jnLNSgWxjvyxH1clqSVOmPwtqBY=",
      "fileEncSha256": "r8veVXB8gf87qjNRhjeDWlAkrdL1fvNgcapy5lh9N04=",
      "directPath": "/v/t62.7114-24/28510574_1291945264794607_9192703486876771390_n.enc?ccb=11-4&oh=01_AdQIRJtm58sVzCQUneKp1a0-WGw8fIZtjyUm1rqP5xA-QQ&oe=64DD2832",
      "mediaKeyTimestamp": "1689624384"
    }
  },
  "messageTimestamp": "1689624384",
  "status": "PENDING",
  "participant": "[sender]@s.whatsapp.net"
}
```

### Explicação dos parâmetros

<!-- prettier-ignore -->
Parameter | Type | Descrição
-|-|-
statusMessage.type | Obrigatório | Informe audio para enviar uma forma de onda.
statusMessage.content | Obrigatório | Insira a URL pública do áudio.<br /><br />Recomendamos um serviço de hospedagem que não bloqueie o acesso à API.
statusMessage.allContacts | Obrigatório | Para enviar para TODOS os contatos, digite "true".<br /><br />Os valores aceitos são "true" ou "false".<br /><br />Se "false" for informado, "statusJidList" se torna obrigatório.
statusMessage.statusJidList | Opcional | Insira o remoteJid de um ou mais contatos aos quais você deseja enviar status/stories.<br /><br />**remoteJid** = Número no formato DDI + DDD + formato de número, com ou sem o final @s.whatsapp.net.<br /><br />Ex: 5511911111111 ou 5511911111111@s.whatsapp.net<br /><br />Se você deseja enviar para mais de um contato, apenas separe-os por vírgulas, como mostrado no exemplo abaixo:<br /><br />   551191111111,<br />5511922222222,<br />5511933333333

:::note Nota:
Toda mensagem enviada pela Evolution API inicialmente tem o status PENDENTE.

Isso indica que o envio foi bem-sucedido e a mensagem está aguardando os seguintes status, que serão enviados para o Webhook MESSAGES_UPDATE.
:::

:::danger Atenção:
É extremamente necessário que o payload obedeça às regras para criar um arquivo JSON, considerando o arranjo correto de itens, formatação, colchetes, chaves e vírgulas, etc.

Antes de consumir o endpoint, se você tiver dúvidas sobre a formatação JSON, vá para https://jsonlint.com/ e valide.
:::

