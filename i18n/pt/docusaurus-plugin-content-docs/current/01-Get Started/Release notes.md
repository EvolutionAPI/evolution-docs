---
id: release-notes
title: Notas de lançamento
hide_title: false
hide_table_of_contents: false
sidebar_label: Notas de lançamento
sidebar_position: 7
pagination_label: Notas de lançamento
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Últimas versões da Evolution API.
keywords:
  - Updates
  - Releases
  - Versions
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/12/2023
  author: matheus
---

Novos recursos e correções de bugs para a Evolution API.

Você também pode visualizar as versões no [repositório GitHub](https://github.com/EvolutionAPI/evolution-api/releases).

## Como atualizar a Evolution API

Os passos para atualizar a sua Evolution dependem da plataforma que você utiliza. Consulte a documentação da sua Evolution:

- [Docker](/i18n/pt/docusaurus-plugin-content-docs/current/01-Get%20Started/Update.md/#update-with-docker-cli)

- [Portainer](/i18n/pt/docusaurus-plugin-content-docs/current/01-Get%20Started/Update.md/#update-with-portainer)

- [NPM](/i18n/pt/docusaurus-plugin-content-docs/current/01-Get%20Started/Update.md/#update-with-npm)

## Tags

### Docker

Existem duas tags principais usadas no Docker, `latest` e `homolog`.

- **Latest**: esta imagem contém a versão mais estável, recomendada na maioria dos casos.
- **Homolog**: teste e implementação de novos recursos, também referida como próxima versão. Esta versão pode não ser estável e não é recomendada para ambientes de produção.


### GitHub

No GitHub, existem duas principais branches/tags usadas, `main` e `homolog`.

- **main**: a versão mais estável, recomendada na maioria dos casos.
- **Homolog**: Teste e implementação de novos recursos, também referida como próxima versão. Esta versão pode não ser estável e não é recomendada para ambientes de produção.

## Nomenclatura de Versões

O Evolution utiliza versionamento semântico. Todos os números de versão estão no formato MAJOR.MINOR.PATCH. Os números de versão aumentam da seguinte forma:

- Versão **Major** ao fazer alterações incompatíveis que potencialmente exigem ação do usuário.
- Versão **Minor** ao adicionar funcionalidades de maneira compatível com versões anteriores.
- Versão **Patch** ao fazer correções de bugs compatíveis com versões anteriores.

:::info

Esta é a versão `latest`, a mais estável até o momento. Recomendamos o uso da versão `latest` em vez de `homolog` por motivos de estabilidade.

:::


## 1.6.1

> Esta é uma atualização de correção menor. A versão 1.6.1 introduz correções para o manuseio de mensagens, integração com o Typebot, compartilhamento de mídia, formatação de texto no Chatwoot e gerenciamento de instância. Também adiciona opções de personalização e resolve problemas de reconexão com o MongoDB.

<details>
  <summary>Ver changelog completo</summary>
  <div>
    <details>
      <summary>Correções</summary>
      <div>
        - Corrigido Lid Messages <br />
        - Corrigido o código de emparelhamento <br />
        - Ajustes no Typebot <br />
        - Corrigido o envio de variáveis para o Typebot <br />
        - Corrigido o envio de variáveis do Typebot <br />
        - Opções para desativar docs e manager <br />
        - Correção no envio de mídia s3/minio para o Chatwoot e Typebot <br />
        - Corrigida a formatação Bold, Italic e Underline no Chatwoot usando Regex <br />
        - Inclua o campo de Id da instância na configuração da instância <br />
        - Corrigido o problema ao desconectar a instância e reconectar usando o mongodb <br />
        - Corrigido o problema com o Typebot fechando no final do fluxo, agora isso é opcional com a variável TYPEBOT_KEEP_OPEN <br />
        - Adicionada a propriedade sign_delimiter à configuração do Chatwoot, permitindo que você defina um delimitador diferente para a assinatura. Padrão quando não definido \n <br />
      </div>
    </details>
    <details>
      <summary>Integrações suportadas</summary>
      <div>
          - Chatwoot: v3.3.1 <br/>
          - Typebot: v2.20.0 <br/>
      </div>
    </details>
  </div>
</details>

Veja os [commits](https://github.com/EvolutionAPI/evolution-api/compare/1.5.4...1.6.0) para esta versão.

Data de lançamento: 15 de dezembro de 2023


## 1.6.0

> Novo gerenciador de instâncias disponível no endpoint `/manager` e suporte para mensagens de resposta no Chatwoot.

<details>
  <summary>Ver changelog completo</summary>
  <div>
    <details>
      <summary>Recursos</summary>
      <div>
        - Adicionada Integração AWS SQS <br/>
        - Adicionado suporte para a nova API do Typebot <br/>
        - Adicionado endpoint sendPresence <br/>
        - Novo Gerenciador de Instâncias <br/>
        - Adicionado auto_create ao chatwoot para criar a caixa de entrada automaticamente ou não <br/>
        - Adicionadas respostas, exclusão e reações a mensagens no chatwoot v3.3.1 <br/>
      </div>
    </details>
    <details>
      <summary>Correções</summary>
      <div>
        - Ajustes no proxy <br/>
        - Ajustes no início da sessão para o Typebot <br/>
        - Adicionado campo mimetype ao enviar mídia <br/>
        - Ajustes nas validações para messages.upsert <br/>
        - Corrigido erro de mensagens não recebidas: tratamento de erro ao atualizar o contato no chatwoot <br/>
        - Corrigido workaround para gerenciar o parâmetro data como uma matriz no mongodb <br/>
        - Removido await do webhook ao enviar uma mensagem <br/>
        - Atualização typebot.service.ts - mudança de element.underline ~ para * <br/>
        - Ajustes no proxy <br/>
        - Removida a reinicialização da API ao receber um erro <br/>
        - Correções no mongodb e chatwoot <br/>
        - Retorno ajustado das consultas no mongodb <br/>
        - Adicionada reinicialização da instância ao atualizar a imagem de perfil <br/>
        - Correção do funcionamento do chatwoot com fluxos de administrador <br/>
        - Corrigido problema que não gerava o código QR com a opção chatwoot_conversation_pending habilitada <br/>
        - Corrigido problema em que o CSAT abria um novo ticket quando a reopen_conversation estava desativada <br/>
        - Corrigido problema ao enviar contato para o Chatwoot via iOS <br/>
      </div>
    </details>
    <details>
      <summary>Integrações suportadas</summary>
      <div>
          - Chatwoot: v3.3.1 <br/>
          - Typebot: v2.20.0 <br/>
      </div>
    </details>
    <details>
      <summary>Alterações</summary>
      <div>
          - -> Ajustando função cleaningStoreFiles para remover itens ausentes... por @jaison-x em #186 <br/>
          - Correção: tamanho dos participantes do grupo por @w3nder em #190 <br/>
          - Tratamento de encadeamento opcional para 'settings.msg_call', esta alteração previne... por @vitorogen em #197 <br/>
          - Tratamento de erros no Typebot por @gabrielpastori1 em #198 <br/>
          - Excluindo instâncias por @jaison-x em #187 <br/>
          - Correção: Removido await do webhook ao enviar uma mensagem por @craines em #216 <br/>
          - Corrigido erro de mensagens não recebidas: tratamento de erro ao atualizar contato por @raimartinsb em #228 <br/>
          - Correção: workaround para gerenciar o parâmetro data como uma matriz no mongodb por @jaison-x em #224 <br/>
          - Atualizar typebot.service.ts - mudança de element.underline ~ para * por @suissa em #215 <br/>
          - Adicionar criação de sessão para o serviço typebot por @gabrielpastori1 em #233 <br/>
          - Adicionar sendPresence por @gabrielpastori1 em #237 <br/>
          - Corrigir pesquisa do chatwoot por @gabrielpastori1 em #248 <br/>
          - Adicionar Gerenciador por @gabrielpastori1 em #250 <br/>
          - Correção: criar somente se estiver pausado por @gabrielpastori1 em #249 <br/>
      </div>
    </details>
  </div>
</details>

Veja os [commits](https://github.com/EvolutionAPI/evolution-api/compare/1.5.4...1.6.0) para esta versão.

Data de lançamento: 15 de dezembro de 2023


## 1.5.4

> Problema de digitação do registro do Baileys resolvido e problemas de mensagens duplicadas resolvidos no Chatwoot.

Veja os [commits](https://github.com/EvolutionAPI/evolution-api/compare/1.5.3...1.5.4) para esta versão.

