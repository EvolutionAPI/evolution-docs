---
sidebar_position: 2
---

# Enviar texto de menção

:::note Instruções:

Substitua o conteúdo existente entre [  ] pelo que corresponder ao seu cenário ou necessidade.
:::

| Método | Endpoint                                  |
| ------ | ----------------------------------------- |
| POST   | [baseUrl]/message/sendText/[instance] |

Envie uma mensagem em um grupo mencionando um ou vários participantes, sem a necessidade de incluir @nome no conteúdo da mensagem.

:::info Nota:
Use esse recurso com moderação, pois em um grupo onde os participantes escolheram silenciar notificações, eles ainda serão notificados e marcados com o @.

O uso excessivo em um grupo com muitos membros nessas condições pode causar insatisfação e resultar em um efeito contrário ao desejado.
:::

### Dados a serem enviados na Requisição


```json title=Payload
{
  "number": "[groupJid]",
  "options": {
    "delay": 1200,
    "presence": "composing",
    "mentions": {
      "everyOne": false,
      "mentioned": ["[remoteJid]"]
    }
  },
  "textMessage": {
    "text": "Mencione a mensagem de texto, enviada com a _Evolution-API_ 🚀.\n\nAqui você pode enviar textos em *negrito*, _itálico_, ~riscado~ e `monoespaçado`.\n\nVocê também pode usar qualquer emoticon disponível no WhatsApp, como estes exemplos abaixo:\n\n😉🤣🤩🤝👏👍🙏"
  }
}
```

### Dados retornados da Solicitação

```json title=Result
{
  "key": {
    "remoteJid": "[groupJid]",
    "fromMe": true,
    "id": "BAE500F92531D3E2"
  },
  "message": {
    "extendedTextMessage": {
      "text": "Mencione a mensagem de texto, enviada com a _Evolution-API_ 🚀.\n\nAqui você pode enviar textos em *negrito*, _itálico_, ~riscado~ e `monoespaçado`.\n\nVocê também pode usar qualquer emoticon disponível no WhatsApp, como estes exemplos abaixo:\n\n😉🤣🤩🤝👏👍🙏",
      "contextInfo": {
        "mentionedJid": ["[remoteJid]@s.whatsapp.net"]
      }
    }
  },
  "messageTimestamp": "1689620558",
  "status": "PENDING",
  "participant": "[sender]@s.whatsapp.net"
}
```

### Explicação dos parâmetros

<!-- prettier-ignore -->
Parameter | Type | Description
--- | --- | ---
number | Obrigatório | Insira o groupJid para quem a mensagem será enviada.<br /><br /> **groupJid** = Aceita o identificador de grupo no formato hash para novos grupos, ou remoteJid + "-" + timestamp para grupos antigos. Neste caso, é obrigatório informar o final @g.us.<br /><br /> Ex: 120363024158769234@g.us ou 5511911111111-1111111111@g.us
options.delay | Opcional | Tempo em milissegundos que a mensagem deve esperar antes de ser enviada, mostrando as informações de presença configuradas no próximo item.
options.presence | Opcional | O conteúdo "composing" fará com que a mensagem apareça como "digitando" no menu superior do WhatsApp™, durante o tempo definido no item anterior.
options.mentions.everyOne | Obrigatório | Para mencionar um ou mais participantes, insira "false".<br /><br /> Os valores aceitos são "true" ou "false".<br /><br /> Para mencionar todos, será explicado no próximo item.
options.mentions.mentioned | Obrigatório | Insira o remoteJid de um ou mais participantes que serão mencionados no grupo.<br /><br /> **remoteJid** = Número no formato DDI + DDD + Número, com ou sem o final @s.whatsapp.net.<br /><br /> Ex: 5511911111111 ou 5511911111111@s.whatsapp.net<br /><br /> Se você deseja informar mais de um participante, apenas separe os contatos com vírgulas, como no exemplo abaixo:<br /><br /> - 551191111111,<br /> - 5511922222222,<br /> - 5511933333333<br />
textMessage.text | Obrigatório | Informe o texto da mensagem que deseja enviar, podendo usar os mesmos recursos que você usaria no aplicativo ou na web, que são:<br /><br /> - Emojis<br /> - Negrito, coloque \*seutexto\*<br /> - Itálico, entre \_seutexto\_ <br /> - Riscado, insira \~seutexto\~ <br /> - Monoespaçado entre \```seutexto\``` <br /><br /> Para quebrar uma linha, insira "\n" na mensagem. <br /><br /> Confira o exemplo no payload para melhor entendimento.

:::note Nota:
Toda mensagem enviada pela Evolution API inicialmente tem o status PENDENTE.

Isso indica que o envio foi bem-sucedido e a mensagem está aguardando os seguintes status, que serão enviados para o Webhook MESSAGES_UPDATE.
:::

:::danger Atenção:
É extremamente necessário que o payload obedeça às regras para criar um arquivo JSON, considerando o arranjo correto de itens, formatação, colchetes, chaves e vírgulas, etc.

Antes de consumir o endpoint, se você tiver dúvidas sobre a formatação JSON, vá para https://jsonlint.com/ e valide.
:::

