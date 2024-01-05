---
sidebar_position: 4
---

# Enviar texto/url de status/Stories

:::note Instruções:

Substitua o conteúdo existente entre [  ] pelo que corresponder ao seu cenário ou necessidade.
:::

| Método | Endpoint                                    |
| ------ | ------------------------------------------- |
| POST   | [baseUrl]/message/sendStatus/[instance] |

Envie um Status/Stories de texto ou URL (clicável) para um, alguns ou todos os contatos em sua lista.

### Dados a serem enviados na Requisição

```json title=Payload
{
  "statusMessage": {
    "type": "text",
    "content": "Olá, como você está hoje? 😉👍\n\nVeja mais em\n\nhttps://evolution-api.com/",
    "backgroundColor": "#008000",
    "font": 1,
    "allContacts": false,
    "statusJidList": ["[remoteJid]@s.whatsapp.net"]
  }
}
```

### Dados retornados da Solicitação

```json title=Result
{
  "key": {
    "remoteJid": "status@broadcast",
    "fromMe": true,
    "id": "BAE59F76997142F0"
  },
  "message": {
    "extendedTextMessage": {
      "text": "Olá, como você está hoje? 😉👍\n\nVeja mais em\n\nhttps://evolution-api.com/",
      "matchedText": "https://evolution-api.com/",
      "canonicalUrl": "https://evolution-api.com/opensource-whatsapp-api/",
      "title": "OpenSource WhatsApp API – Evolution API",
      "backgroundArgb": 4278222848,
      "font": "SERIF",
      "previewType": "NONE",
      "thumbnailDirectPath": "/o1/v/t62.7118-24/f1/m230/up-oil-image-bae65e3e-9813-4686-99a5-53ab5e2336c7?ccb=9-4&oh=01_AdRENApzu4pB-Y6VDbbGWfD6w91B1rmxgveUJH_cCmt0Hg&oe=64DCEF1B",
      "thumbnailSha256": "QcKPDG2Bk+d3fPceiuS1cnGuBNgv/8hHM4UgcwYMtKk=",
      "thumbnailEncSha256": "UpEq8UfeJuT2/0A2nS7vEEIUZzIi+SmOydvvWQthzAs=",
      "mediaKey": "KXuIeKYSqsHVD8uxEoHnQPjXuADqTVCtfuI35zbmVxc=",
      "mediaKeyTimestamp": "1689621677",
      "thumbnailHeight": 0,
      "thumbnailWidth": 0
    }
  },
  "messageTimestamp": "1689621677",
  "status": "PENDING",
  "participant": "[sender]@s.whatsapp.net"
}
```

### Explicação dos parâmetros

<!-- prettier-ignore -->
Parameter | Type | Descrição
-|-|-
statusMessage.type | Obrigatório | Informe "text" para enviar mensagens de texto ou "url" para URLs clicáveis.
statusMessage.content | Obrigatório | Informe o texto da mensagem que deseja enviar, podendo usar os mesmos recursos que você usaria no aplicativo ou na web, que são:<br /><br /> - Emojis<br /> - Negrito, insira \*seutexto\*<br /> - Itálico, entre \_seutexto\_ <br /> - Riscado, insira \~seutexto\~ <br /> - Monoespaçado entre \```seutexto\``` <br /><br />Para quebrar uma linha, insira "\n" na mensagem. <br /><br />Confira o exemplo no payload para melhor entendimento.
statusMessage.backgroundColor | Obrigatório | Insira a cor desejada para o fundo do status/stories, usando o Código de Cor Hexadecimal. <br /><br /> Exemplos:<br /><br />   #FFFFFF = Branco<br />   #0000FF = Azul<br />#008000 = Verde<br />   #FFFF00 = Amarelo<br />    #FF0000 = Vermelho<br />   #800080 = Roxo<br />    #808080 = Cinza<br />    #FFC0CB = Rosa <br />
statusMessage.font |	Obrigatório | Escolha o tipo de fonte a ser usado. <br /><br />Aceite as opções abaixo:<br /><br />   1 = SERIF<br />   2 = NORICAN_REGULAR<br />   3 = BRYNDAN_WRITE<br />   4 = BEBASNEUE_REGULAR<br />   5 = OSWALD_HEAVY<br />
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

