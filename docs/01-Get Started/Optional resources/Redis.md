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

Redis is an in-memory data structure store, used as a database, cache, and message broker. It supports data structures such as strings, hashes, lists, sets, and more. Incorporating Redis can significantly improve the performance of Evolution API by enabling faster data access and efficient caching. Its integration with the Evolution API enhances system responsiveness through:

1. **Caching Chatwoot Messages**: Significantly improves message retrieval and response times.
2. **Instance Storage**: _(Deprecated)_ Previously used for managing API instances efficiently.

### Configuring Redis for Evolution API

#### Docker Setup (Recommended)

For environments utilizing Docker, configure your Redis settings in the `.env` file:

```javascript title=".env" showLineNumbers
CACHE_REDIS_ENABLED=true
CACHE_REDIS_URI=redis://localhost:6379
CACHE_REDIS_PREFIX_KEY=chatwoot-cache
CACHE_REDIS_TTL=604800
CACHE_LOCAL_ENABLED=true
CACHE_LOCAL_TTL=86400
```
#### PM2 Setup (test and development)

If you use PM2 installation method, the variables has to be set on `env.yml`:

```yaml title="src/env.yml" showLineNumbers
CACHE:
  REDIS:
    ENABLED: true
    URI: "redis://localhost:6379"
    PREFIX_KEY: "evolution-cache"
    TTL: 604800
  LOCAL:
    ENABLED: true
    TTL: 86400
```

## Deprecation Notice: Redis Instance Storage

:::info Deprecation of Redis for instances

Redis for saving instances will be deprecated in future versions of Evolution API, we do not recommend Redis installation anymore for instance management, there is some problems when using more than one instance.

:::

Set the Redis environment variables in the `.env` for Docker or the `dev-env.yml` for NPM file as follows:

**Bug:** with multiple instances Redis ends up mixing information of messages sometimes, this is why deprecation is planned in future versions.

```javascript title=".env" showLineNumbers
REDIS_ENABLED=false
REDIS_URI=redis://redis:6379
REDIS_PREFIX_KEY=evo
```
