---
sidebar_position: 1
---

# Enviar uma Mensagem de Citação de Texto

:::note Instruções:
Substitua o conteúdo existente entre [  ] pelo que corresponder ao seu cenário ou necessidade.
:::

| Método | Endpoint                                  |
| ------ | ----------------------------------------- |
| POST   | [baseUrl]/message/sendText/[instance] |

Envie uma mensagem citando uma mensagem anterior na resposta.

Isso funciona tanto para mensagens recebidas quanto para citar suas próprias mensagens enviadas se você quiser lembrar o destinatário de um assunto discutido anteriormente.

### Dados a serem enviados na solicitação

```json title=Payload
{
  "number": "[remoteJid]",
  "options": {
    "delay": 1200,
    "presence": "composing",
    "quoted": {
      "key": {
        "remoteJid": "[remoteJid]@s.whatsapp.net",
        "fromMe": true,
        "id": "BAE5766236A2AEFF",
        "participant": ""
      },
      "message": {
        "conversation": "Mensagem de texto com citação de resposta, enviada com a _Evolution-API_ 🚀.\n\nAqui você pode enviar textos em *negrito*, _itálico_, ~riscado~ e `monoespaçado`.\n\nVocê também pode usar qualquer emoticon disponível no WhatsApp, como estes exemplos abaixo:\n\n😉🤣🤩🤝👏👍🙏"
      }
    }
  },
  "textMessage": {
    "text": "Mensagem de texto com citação de resposta, enviada com a _Evolution-API_ 🚀.\n\nAqui você pode enviar textos em *negrito*, _itálico_, ~riscado~ e `monoespaçado`.\n\nVocê também pode usar qualquer emoticon disponível no WhatsApp, como estes exemplos abaixo:\n\n😉🤣🤩🤝👏👍🙏"
  }
}
```

### Dados retornados da Solicitação

```json title=Result
{
  "key": {
    "remoteJid": "[remoteJid]@s.whatsapp.net",
    "fromMe": true,
    "id": "BAE5FA1CB273B533"
  },
  "message": {
    "extendedTextMessage": {
      "text": "Mensagem de texto com citação de resposta, enviada com a _Evolution-API_ 🚀.\n\nAqui você pode enviar textos em *negrito*, _itálico_, ~riscado~ e `monoespaçado`.\n\nVocê também pode usar qualquer emoticon disponível no WhatsApp, como estes exemplos abaixo:\n\n😉🤣🤩🤝👏👍🙏",
      "contextInfo": {
        "stanzaId": "BAE5766236A2AEFF",
        "participant": "[remoteJid]@s.whatsapp.net",
        "quotedMessage": {
          "conversation": "Mensagem de texto simples, enviada com a _Evolution-API_ 🚀.\n\nAqui você pode enviar textos em *negrito*, _itálico_, ~riscado~ e `monoespaçado`.\n\nVocê também pode usar qualquer emoticon disponível no WhatsApp, como estes exemplos abaixo:\n\n😉🤣🤩🤝👏👍🙏"
        }
      }
    }
  },
  "messageTimestamp": "1689608179",
  "status": "PENDING"
}
```

### Explanation of Parameters

### Explicação dos Parâmetros

<!-- prettier-ignore -->
Parâmetro | Tipo | Descrição
-|-|-
remoteJid | Obrigatório | Insira o remoteJid ou groupJid para quem a mensagem será enviada. <br /><br /> **remoteJid** = Número no formato DDI + DDD + Número, com ou sem o final @s.whatsapp.net. <br /><br />Ex: 5511911111111 ou 5511911111111@s.whatsapp.net <br /><br />**groupJid** = Aceita o identificador de grupo no formato hash para novos grupos, ou remoteJid + "-" + timestamp para grupos antigos. Neste caso, é obrigatório informar o final @g.us.<br /><br />Ex: 120363024158769234@g.us ou 5511911111111-1111111111@g.us
options.delay | Opcional | Tempo em milissegundos que a mensagem deve esperar antes de ser enviada, mostrando as informações de presença configuradas no próximo item.
options.presence | Opcional | O conteúdo "composing" fará com que a mensagem apareça como "digitando" no menu superior do WhatsApp™, durante o tempo definido no item anterior.
options.quoted.key.remoteJid | Obrigatório | Pegue esta informação do remoteJid na chave do objeto da mensagem a ser citada.
options.quoted.key.fromMe | Obrigatório | Pegue esta informação do remoteJid na chave do objeto da mensagem a ser citada.
options.quoted.key.id | Obrigatório | Pegue esta informação do remoteJid na chave do objeto da mensagem a ser citada.
options.quoted.key.participant | Obrigatório | Pegue esta informação do remoteJid na chave do objeto da mensagem a ser citada.
options.quoted.message.conversation | Obrigatório | Pegue esta informação do remoteJid na chave do objeto da mensagem a ser citada.
textMessage.text | Obrigatório | Informe o texto da mensagem que deseja enviar, podendo usar os mesmos recursos que você usaria no aplicativo ou na web, que são:<br /><br /> - Emojis<br /> - Negrito, coloque \*seutexto\* <br /> - Itálico, entre \_seutexto\_ <br /> - Riscado, insira \~seutexto\~ <br /> - Monoespaçado entre \```seutexto\``` <br /><br /> _Para quebrar uma linha, insira "\n" na mensagem._ <br /><br /> Confira o exemplo no payload para melhor entendimento.

:::note Nota:
Toda mensagem enviada pela Evolution API inicialmente tem o status PENDENTE.

Isso indica que o envio foi bem-sucedido e a mensagem está aguardando os seguintes status, que serão enviados para o Webhook MESSAGES_UPDATE.
:::

:::danger Atenção:
É extremamente necessário que o payload obedeça às regras para criar um arquivo JSON, considerando o arranjo correto de itens, formatação, colchetes, chaves e vírgulas, etc.

Antes de consumir o endpoint, se você tiver dúvidas sobre a formatação JSON, vá para https://jsonlint.com/ e valide.
:::

