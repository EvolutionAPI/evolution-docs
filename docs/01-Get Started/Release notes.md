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
# image: https://i.imgur.com/mErPwqL.png
slug: /release-notes
last_update:
  date: 12/12/2023
  author: matheus
keywords:
  - Updates
  - Releases
  - Versions
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

import UpdatesComponent from '@site/src/components/UpdatesComponent';

<UpdatesComponent />
