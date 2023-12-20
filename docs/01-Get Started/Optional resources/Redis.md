---
id: redis
title: Redis
hide_title: true
hide_table_of_contents: false
sidebar_label: Redis
sidebar_position: 4
pagination_label: Redis
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Setup an Redis in your environment with Evolution API.
keywords:
  - Optional Resources
  - Redis
  - Database
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/19/2023
  author: matheus
---

## Setup Redis Cache

:::warning Deprecation of Redis

Redis will be deprecated in future versions of Evolution API, we do not recommend Redis installation anymore.

:::

Redis is an in-memory data structure store, used as a database, cache, and message broker. It supports data structures such as strings, hashes, lists, sets, and more. Incorporating Redis can significantly improve the performance of Evolution API by enabling faster data access and efficient caching.

Set the Redis environment variables in the `.env` for Docker or the `dev-env.yml` for NPM file as follows:

```yaml title=".env or dev-env.yml" showLineNumbers
# Set to true to enable Redis.
REDIS_ENABLED=false
# Your Redis server URI.
REDIS_URI=redis://redis:6379
# Prefix key for Redis data.
REDIS_PREFIX_KEY=evo
```
