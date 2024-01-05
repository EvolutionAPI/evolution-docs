---
sidebar_position: 0
---

# Enviar Texto Simples

:::note Instruções:
Substitua o conteúdo existente entre [  ] pelo que corresponde ao seu cenário ou necessidade.
:::

| Método | Endpoint                                  |
| ------ | ----------------------------------------- |
| POST   | [baseUrl]/message/sendText/[instance] |

Envie mensagens de texto usando as mesmas funcionalidades do seu dispositivo ou da web.

### Dados a serem enviados na solicitação

```json title=Payload
{
  "number": "[remoteJid]",
  "options": {
    "delay": 1200,
    "presence": "composing"
  },
  "textMessage": {
    "text": "Esta é uma mensagem de texto simples, enviada com a _Evolution-API_ 🚀.\n\nAqui você pode enviar textos em *negrito*, _itálico_, ~riscado~ e `monoespaçado`.\n\nVocê também pode usar qualquer emoji disponível no WhatsApp, como os exemplos abaixo:\n\n😉🤣🤩🤝👏👍🙏"
  }
}
```

### Dados retornados da Solicitação

```json title=Result
{
  "key": {
    "remoteJid": "[remoteJid]",
    "fromMe": true,
    "id": "BAE5B8BC84A484E3"
  },
  "message": {
    "extendedTextMessage": {
      "text": "Esta é uma mensagem de texto simples, enviada com a _Evolution-API_ 🚀.\n\nAqui você pode enviar textos em *negrito*, _itálico_, ~riscado~ e `monoespaçado`.\n\nVocê também pode usar qualquer emoji disponível no WhatsApp, como os exemplos abaixo:\n\n😉🤣🤩🤝👏👍🙏"
    }
  },
  "messageTimestamp": "1689604487",
  "status": "PENDING"
}
```

### Explicação dos Parâmetros

<!-- prettier-ignore -->
Parâmetro | Tipo | Descrição
--|--|--
remoteJid | Obrigatório | Insira o remoteJid ou groupJid para quem a mensagem será enviada. <br /><br /> _remoteJid = Número no formato DDI + DDD + número, com ou sem o final @s.whatsapp.net. <br /><br />Exemplo: 5511911111111 ou 5511911111111@s.whatsapp.net<br /><br /> **groupJid** = Aceita o identificador de grupo no formato de hash para novos grupos, ou remoteJid + "-" + timestamp para grupos antigos. Nesses casos, é obrigatório informar o final @g.us. <br /><br />Exemplo: 120363024158769234@g.us ou 5511911111111-1111111111@g.us_
options.delay | Opcional | Tempo em milissegundos que a mensagem deve esperar antes de ser enviada, mostrando as informações de presença configuradas no item seguinte.
options.presence | Opcional | O conteúdo "composing" fará com que a mensagem "digitando" apareça no menu superior do WhatsApp™, durante o tempo definido no item anterior.
textMessage.text | Obrigatório | Informe o texto da mensagem que deseja enviar, podendo usar os mesmos recursos que você usaria no aplicativo ou na web, que são:<br /><br /> - Emojis<br /> - Negrito, entre \*seutexto\* <br /> - Itálico, entre \_seutexto\_ <br /> - Riscado, entre \~seutexto\~ <br /> - Monoespaçado, entre \```seutexto\``` <br /><br /> _Para quebrar uma linha, insira "\n" na mensagem._ <br /><br /> Confira o exemplo no payload para melhor compreensão.

:::note Nota:
Toda mensagem enviada pela Evolution API inicialmente possui o status PENDENTE.

Isso indica que o envio foi bem-sucedido e a mensagem está aguardando os seguintes status, que serão enviados para o Webhook MESSAGES_UPDATE.
:::

:::danger Aviso:
É extremamente necessário que o payload siga as regras para criar um arquivo JSON, considerando o arranjo correto de itens, formatação, colchetes, chaves e vírgulas, etc.

Antes de consumir o endpoint, se você tiver dúvidas sobre a formatação JSON, vá para https://jsonlint.com/ e valide.
:::
