---
sidebar_position: 7
---

# Enviar Imagem Media Url

:::note Instruções:

Substitua o conteúdo existente entre {{  }} pelo que corresponder ao seu cenário ou necessidade.
:::

| Método | Endpoint                                   |
| ------ | ------------------------------------------ |
| POST   | {{baseUrl}}/message/sendMedia/{{instance}} |

Envie imagens diretamente da internet, nos formatos JPG e PNG.

### Dados a serem enviados na Requisição

```json title=Payload
{
  "number": "{{remoteJid}}",
  "options": {
    "delay": 1200,
    "presence": "composing"
  },
  "mediaMessage": {
    "mediatype": "image",
    "caption": "Este é um exemplo de arquivo de imagem JPG enviado pela Evolution-API via URL.",
    "media": "https://evolution-api.com/files/evolution-api.jpg"
  }
}
```

### Data returned from the Request

```json title=Result
{
  "key": {
    "remoteJid": "{{remoteJid}}",
    "fromMe": true,
    "id": "BAE51614A82384B8"
  },
  "message": {
    "imageMessage": {
      "url": "https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m230/up-oil-image-807ef642-4b4b-4ed9-...",
      "mimetype": "image/jpeg",
      "caption": "Este é um exemplo de arquivo de imagem JPG enviado pela Evolution-API via URL.",
      "fileSha256": "8VXLU/xZb6avXAocU65TB8PYu2hqBYA7GR1SKNcF8rs=",
      "fileLength": "54005",
      "height": 482,
      "width": 1728,
      "mediaKey": "y6cbe1XoK0o9muPFcwY48tE6+dtapdE3m7BmSCGIZUY=",
      "fileEncSha256": "2Qp8gKmnazumKDIYvotqNdFmkzCEQwHVQ3AM3sEdFeE=",
      "directPath": "/o1/v/t62.7118-24/f1/m230/up-oil-image-807ef642-4b4b-4ed9-b9b8-c9cc855796...",
      "mediaKeyTimestamp": "1689625686",
      "jpegThumbnail": "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV1...",
      "contextInfo": {}
    }
  },
  "messageTimestamp": "1689625687",
  "status": "PENDING"
}
```

### Explicação dos parâmetros

<!-- prettier-ignore -->
Parameter | Type | Descrição
-|-|-
number | Obrigatório | Insira o remoteJid ou groupJid para quem a mensagem será enviada.<br /><br />**remoteJid** = Número no formato DDI + DDD + formato de número, com ou sem o final @s.whatsapp.net.<br /><br />Ex: 5511911111111 ou 5511911111111@s.whatsapp.net<br /><br />**groupJid** = Aceita o identificador de grupo no formato de hash para novos grupos, ou remoteJid + "-" + timestamp para grupos antigos. Nesses casos, é obrigatório informar o final @g.us.<br /><br />Ex: 120363024158769234@g.us ou 5511911111111-1111111111@g.us
options.delay | Opcional | Tempo em milissegundos que a mensagem deve aguardar até ser enviada, mostrando a informação de presença configurada no próximo item.
options.presence | Opcional | O conteúdo "composing" fará com que a mensagem "digitando" apareça no menu superior do WhatsApp™, durante o tempo definido no item anterior.
mediaMessage.mediaType | Obrigatório | Informe "image".
mediaMessage.caption | Opcional | Informe o texto de legenda da mídia que você deseja enviar, podendo usar os mesmos recursos que você usaria no aplicativo ou na web, que são:<br /><br /> - Emojis<br /> - Negrito, insira \*seutexto\* <br /> - Itálico, entre \_seutexto\_ <br /> - Riscado, insira \~seutexto\~ <br /> - Monoespaçado entre \```seutexto\``` <br /><br /> _Para quebrar uma linha, insira "\n" na mensagem._ <br /><br />Confira o exemplo no payload para melhor entendimento.
mediaMessage.media | Obrigatório | Insira a URL pública da imagem.<br /><br /> Recomendamos um serviço de hospedagem que não bloqueie o acesso à API.

:::note Nota:
Toda mensagem enviada pela Evolution API inicialmente tem o status PENDENTE.

Isso indica que o envio foi bem-sucedido e a mensagem está aguardando os seguintes status, que serão enviados para o Webhook MESSAGES_UPDATE.
:::

:::danger Atenção:
É extremamente necessário que o payload obedeça às regras para criar um arquivo JSON, considerando o arranjo correto de itens, formatação, colchetes, chaves e vírgulas, etc.

Antes de consumir o endpoint, se você tiver dúvidas sobre a formatação JSON, vá para https://jsonlint.com/ e valide.
:::

