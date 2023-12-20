---
id: release-notes
title: Release notes
hide_title: false
hide_table_of_contents: false
sidebar_label: Release notes
sidebar_position: 7
pagination_label: Releases
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Latest releases of Evolution API
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

New features and bug fixes for Evolution API.

You can also view the Releases in the [GitHub repository](https://github.com/EvolutionAPI/evolution-api/releases).

## How to update Evolution API

The steps to update your Evolution depend on which platform you use. Refer to the documentation for your Evolution:

- Upgrade & Update

  - [Docker](/docs/01-Get%20Started/Update.md/#update-with-docker-cli)

  - [Portainer](/docs/01-Get%20Started/Update.md/#update-with-portainer)

  - [NPM](/docs/01-Get%20Started/Update.md/#update-with-npm)

## Tags

### Docker

There is two main tags used in Docker, `latest` and `homolog`.

- **Latest**: this image contains the most stable version, recommended in most cases.
- **Homolog**: test and feature implementation, also referred as next version. This version may be not stable and is not recommended for production environments.

### Github

There is two main branches/tags used in github, `main` and `homolog`.

- **main**: most stable version, recommended in most cases.
- **Homolog**: Test and feature implementation, also referred as next version. This version may be not stable and is not recommended for production environments.

## Versions nomenclature

Evolution uses semantic versioning. All version numbers are in the format MAJOR.MINOR.PATCH. Version numbers increment as follows:

- **Major** version when making incompatible changes which potentially require user action.
- **Minor** version when adding functionality in a backward-compatible manner.
- **Patch** version when making backward-compatible bug fixes.

:::info

This is the `latest` version, the most stable as of right now. We recommend uses of the `latest` version instead of `homolog` for stability reasons.

:::

## 1.6.1

> This is a minor fix update. Version 1.6.1 introduces fixes for message handling, Typebot integration, media sharing, text formatting in Chatwoot, and instance management. It also adds customization options and resolves reconnection issues with MongoDB.

<details>
  <summary>See full changelog</summary>
  <div>
    <details>
      <summary>Fixes</summary>
      <div>
        - Fixed Lid Messages <br />
        - Fixed the pairing code <br />
        - Adjusts in typebot <br />
        - Fixed sending variables to typebot <br />
        - Fixed sending variables from typebot <br />
        - Options to disable docs and manager <br />
        - Correction sending s3/minio media to chatwoot and typebot <br />
        - Fixed chatwoot Bold, Italic and Underline formatting using Regex <br />
        - Include instance Id field in the instance configuration <br />
        - Fix the problem when disconnecting the instance and connecting again using mongodb <br />
        - Fixed the problem with typebot closing at the end of the flow, now this is optional with the TYPEBOT_KEEP_OPEN variable <br />
        - Added the sign_delimiter property to the Chatwoot configuration, allowing you to set a different delimiter for the signature. Default when not defined \n <br />
      </div>
    </details>
    <details>
      <summary>Supported integrations</summary>
      <div>
          - Chatwoot: v3.3.1 <br/>
          - Typebot: v2.20.0 <br/>
      </div>
    </details>
  </div>
</details>

View the [commits](https://github.com/EvolutionAPI/evolution-api/compare/1.5.4...1.6.0) for this version.

Release date: 2023-12-15

## 1.6.0

> New Instance manager available on endpoint `/manager` and support for reply messages in Chatwoot.

<details>
  <summary>See full changelog</summary>
  <div>
    <details>
      <summary>Features</summary>
      <div>
        - Added AWS SQS Integration <br/>
        - Added support for new typebot API <br/>
        - Added endpoint sendPresence <br/>
        - New Instance Manager <br/>
        - Added auto_create to the chatwoot set to create the inbox automatically or not <br/>
        - Added reply, delete and message reaction in chatwoot v3.3.1 <br/>
      </div>
    </details>
    <details>
      <summary>Fixes</summary>
      <div>
        - Adjusts in proxy <br/>
        - Adjusts in start session for Typebot <br/>
        - Added mimetype field when sending media <br/>
        - Ajusts in validations to messages.upsert <br/>
        - Fixed messages not received: error handling when updating contact in chatwoot <br/>
        - Fix workaround to manage param data as an array in mongodb <br/>
        - Removed await from webhook when sending a message <br/>
        - Update typebot.service.ts - element.underline change ~ for * <br/>
        - Adjusts in proxy <br/>
        - Removed api restart on receiving an error <br/>
        - Fixes in mongodb and chatwoot <br/>
        - Adjusted return from queries in mongodb <br/>
        - Added restart instance when update profile picture <br/>
        - Correction of chatwoot functioning with admin flows <br/>
        - Fixed problem that did not generate qrcode with the chatwoot_conversation_pending option enabled <br/>
        - Fixed issue where CSAT opened a new ticket when reopen_conversation was disabled <br/>
        - Fixed issue sending contact to Chatwoot via iOS <br/>
      </div>
    </details>
    <details>
      <summary>Supported integrations</summary>
      <div>
          - Chatwoot: v3.3.1 <br/>
          - Typebot: v2.20.0 <br/>
      </div>
    </details>
    <details>
      <summary>Changes</summary>
      <div>
          - -> Adjusting function cleaningStoreFiles to remove itens from missing… by @jaison-x in #186 <br/>
          - fix: size of group participants by @w3nder in #190 <br/>
          - Handle optional chaining for 'settings.msg_call', this change prevent… by @vitorogen in #197 <br/>
          - Handle erros in Typebot by @gabrielpastori1 in #198 <br/>
          - Deleting instances by @jaison-x in #187 <br/>
          - fix: Removed await from webhook when sending a message by @craines in #216 <br/>
          - fix messages not received: error handling when updating contact by @raimartinsb in #228 <br/>
          - fix: workaround to manage param data as an array in mongodb by @jaison-x in #224 <br/>
          - Update typebot.service.ts - element.underline change ~ for * by @suissa in #215 <br/>
          - Add session creation for typebot service by @gabrielpastori1 in #233 <br/>
          - Add sendPresence by @gabrielpastori1 in #237 <br/>
          - Fix chatwoot find by @gabrielpastori1 in #248 <br/>
          - Add Manager by @gabrielpastori1 in #250 <br/>
          - fix: only create if is paused by @gabrielpastori1 in #249 <br/>
      </div>
    </details>
  </div>
</details>

View the [commits](https://github.com/EvolutionAPI/evolution-api/compare/1.5.4...1.6.0) for this version.

Release date: 2023-12-15

## 1.5.4

> Baileys logger typing issue resolved and resolved duplicated messages problems in Chatwoot.

View the [commits](https://github.com/EvolutionAPI/evolution-api/compare/1.5.3...1.5.4) for this version.
