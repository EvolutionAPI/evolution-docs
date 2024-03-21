---
id: mongodb
title: MongoDB
hide_title: true
hide_table_of_contents: false
sidebar_label: MongoDB
sidebar_position: 3
pagination_label: MongoDB
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Setup an MongoBD database in your environment with Evolution API.
keywords:
  - Optional Resources
  - MongoDB
  - Database
# image: https://i.imgur.com/mErPwqL.png
slug: /mongodb
last_update:
  date: 12/19/2023
  author: matheus
---

## Setup a MongoDB database

MongoDB, a NoSQL database, is known for high performance and scalability. It's ideal for handling large data volumes in the Evolution API.

Set the MongoDB environment variables in the `.env` for Docker or the `dev-env.yml` for NPM file as follows:

```yaml title=".env" showLineNumbers
# Set to true to enable MongoDB.
DATABASE_ENABLED=true
# Your MongoDB connection string.
DATABASE_CONNECTION_URI=mongodb://user:password@database_URL/?authSource=admin&readPreference=primary&ssl=false&directConnection=true
# Prefix for your database name.
DATABASE_CONNECTION_DB_PREFIX_NAME=evo
```

## Data migration (Beta)

Switching from local storage to MongoDB will not automatically transfer your WhatsApp instances that are currently synchronized with the original local storage.

:::tip Beta: Data Migration

Make sure that you already have an MongoDB instance running.

:::

### Migrate your data in NPM or NVM from deprecated local storage

Stop the PM2 execution:

**Flush and Stop**: Clears all logs from PM2, useful for troubleshooting after the update and temporarily stops the Evolution API to safely apply updates.

```bash title="CLI"
# Clear all PM2 logs
pm2 flush

# Stop the current Evolution API process
pm2 stop ApiEvolution
```

**Evolution API directory**: access your directory installation with the following command:

```bash
cd evolution-api
```

**Migrate command**: Run the migration command in the installation directory:

```bash title="/evolution-api/"
npx evolution-manager api migrate-to-mongo
```

Follow the script steps and migrate specific WhatsApp instances or all your instances.
