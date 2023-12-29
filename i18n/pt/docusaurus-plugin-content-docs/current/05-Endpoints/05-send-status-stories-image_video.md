---
sidebar_position: 5
---

# Enviar Status/Stories Imagem/Video

:::note Instruções:

Substitua o conteúdo existente entre {{  }} pelo que corresponder ao seu cenário ou necessidade.
:::

| Método | Endpoint                                    |
| ------ | ------------------------------------------- |
| POST   | {{baseUrl}}/message/sendStatus/{{instance}} |

Envie uma imagem ou vídeo no Status/Stories para um, alguns ou todos os contatos em sua lista.

### Dados a serem enviados na Requisição

```json title=Payload
{
  "statusMessage": {
    "type": "image",
    "content": "https://evolution-api.com/files/evolution-api.jpg",
    "caption": "This is my status/storie image. 📷",
    "allContacts": false,
    "statusJidList": ["{{remoteJid}}@s.whatsapp.net"]
  }
}
```

### Dados retornados da Solicitação

```json title=Result
{
  "key": {
    "remoteJid": "status@broadcast",
    "fromMe": true,
    "id": "BAE5689FDB7A25B6"
  },
  "message": {
    "imageMessage": {
      "url": "https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m231/up-oil-image-155d5601-7e78-4b9f-b...",
      "mimetype": "image/jpeg",
      "caption": "Esta é minha imagem de status/storie. 📷",
      "fileSha256": "8VXLU/xZb6avXAocU65TB8PYu2hqBYA7GR1SKNcF8rs=",
      "fileLength": "54005",
      "height": 482,
      "width": 1728,
      "mediaKey": "xVG4qXCr6dgG0P6v/c76p+2W26QDdWWjfsu6KaNZqsQ=",
      "fileEncSha256": "DGtpcQDfi6D8z1HIn/CRHCW0jIMXtB6mkswbbpC+Sok=",
      "directPath": "/o1/v/t62.7118-24/f1/m231/up-oil-image-155d5601-7e78-4b9f-bb7b-c432147ee35...",
      "mediaKeyTimestamp": "1689623202",
      "jpegThumbnail": "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19..."
    }
  },
  "messageTimestamp": "1689623202",
  "status": "PENDING",
  "participant": "{{sender}}@s.whatsapp.net"
}
```

### Explicação dos parâmetros

<!-- prettier-ignore -->
Parameter | Type | Descrição
---|---|---
statusMessage.type | Obrigatório | Informe image para enviar imagens ou video para enviar vídeos.
statusMessage.content | Obrigatório | Insira a URL pública da imagem ou vídeo.<br /><br />Recomendamos um serviço de hospedagem que não bloqueie o acesso à API.
statusMessage.caption | Opcional | Informe o texto de legenda da mídia que você deseja enviar, podendo usar os mesmos recursos que você usaria no aplicativo ou na web, que são:<br /><br /> - Emojis<br /> - Negrito, insira \*seutexto\*<br /> - Itálico, entre \_seutexto\_ <br /> - Riscado, insira \~seutexto\~ <br /> - Monoespaçado entre \```seutexto\```<br /><br />Para quebrar uma linha, insira "\n" na mensagem.<br /><br />Confira o exemplo no payload para melhor entendimento.
statusMessage.allContacts | Obrigatório | Para enviar para TODOS os contatos, digite "true".<br /><br />Os valores aceitos são "true" ou "false".<br /><br />Se "false" for informado, "statusJidList" se torna obrigatório.
statusMessage.statusJidList | Opcional | Insira o remoteJid de um ou mais contatos aos quais você deseja enviar status/stories.<br /><br />**remoteJid** = Número no formato DDI + DDD + formato de número, com ou sem o final @s.whatsapp.net.<br /><br />Ex: 5511911111111 ou 5511911111111@s.whatsapp.net<br /><br />Se você deseja enviar para mais de um contato, apenas separe-os por vírgulas, como mostrado no exemplo abaixo:<br /><br />   551191111111,<br />   5511922222222,<br />    5511933333333

:::note Nota:
Toda mensagem enviada pela Evolution API inicialmente tem o status PENDENTE.

Isso indica que o envio foi bem-sucedido e a mensagem está aguardando os seguintes status, que serão enviados para o Webhook MESSAGES_UPDATE.
:::

:::danger Atenção:
É extremamente necessário que o payload obedeça às regras para criar um arquivo JSON, considerando o arranjo correto de itens, formatação, colchetes, chaves e vírgulas, etc.

Antes de consumir o endpoint, se você tiver dúvidas sobre a formatação JSON, vá para https://jsonlint.com/ e valide.
:::

