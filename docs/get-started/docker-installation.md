---
sidebar_position: 4
description: Guide for install EvolutionAPI on Docker environment
---

# Docker Installation

## ENVIRONMENT PREPARATION FOR DOCKER

### Download and install Docker

```bash
curl -fsSL https://get.docker.com | bash
```

### Install the other necessary/recommended apps for installing and running the Evolution API

```bash
apt-get install -y git zip unzip nload snapd curl wget sudo
```

### Update the Time Zone according to your installation location

```bash
dpkg-reconfigure tzdata
```

Choose the corresponding TimeZone

TIMEZONE

### Update the system and install the necessary packages.

```bash
apt update && apt -y upgrade
```

:::note Note:
If a window appears with information about apps to restart, check all of them and confirm.
:::

### Reboot the system

reboot
Important:

After receiving the message that it is now available, press CTRL + SHIFT + P to reconnect

## INSTALLING THE EVOLUTION API

### Clone the Evoluton API repository

git clone https://github.com/EvolutionAPI/evolution-api.git

### Access the API folder

cd evolution-api

### Copy and edit the API configuration file

cp Docker/.env.example Docker/.env
nano Docker/.env

Copy & Paste:

```bash

# Server URL - Set your application url

SERVER_URL=API-DOMAIN

# Cors - \* for all or set separate by commas - ex.: 'yourdomain1.com, yourdomain2.com'

CORS_ORIGIN=\*
CORS_METHODS=POST,GET,PUT,DELETE
CORS_CREDENTIALS=true

# Determine the logs to be displayed

LOG_LEVEL=ERROR,WARN,DEBUG,INFO,LOG,VERBOSE,DARK,WEBHOOKS
LOG_COLOR=true

# Log Baileys - "fatal" | "error" | "warn" | "info" | "debug" | "trace"

LOG_BAILEYS=error

# Determine how long the instance should be deleted from memory in case of no connection.

# Default time: 5 minutes

# If you don't even want an expiration, enter the value false

DEL_INSTANCE=false

# Temporary data storage

STORE_MESSAGES=true
STORE_MESSAGE_UP=true
STORE_CONTACTS=true
STORE_CHATS=true

# Set Store Interval in Seconds (7200 = 2h)

CLEAN_STORE_CLEANING_INTERVAL=7200
CLEAN_STORE_MESSAGES=true
CLEAN_STORE_MESSAGE_UP=true
CLEAN_STORE_CONTACTS=true
CLEAN_STORE_CHATS=true

# Permanent data storage

DATABASE_ENABLED=false
DATABASE_CONNECTION_URI=mongodb://root:root@mongodb:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true
DATABASE_CONNECTION_DB_PREFIX_NAME=evdocker

# Choose the data you want to save in the application's database or store

DATABASE_SAVE_DATA_INSTANCE=false
DATABASE_SAVE_DATA_NEW_MESSAGE=false
DATABASE_SAVE_MESSAGE_UPDATE=false
DATABASE_SAVE_DATA_CONTACTS=false
DATABASE_SAVE_DATA_CHATS=false

REDIS_ENABLED=false
REDIS_URI=redis://redis:6379
REDIS_PREFIX_KEY=evdocker

RABBITMQ_ENABLED=false
RABBITMQ_URI=amqp://guest:guest@rabbitmq:5672

WEBSOCKET_ENABLED=false

# Global Webhook Settings

# Each instance's Webhook URL and events will be requested at the time it is created

## Define a global webhook that will listen for enabled events from all instances

WEBHOOK_GLOBAL_URL=<url>
WEBHOOK_GLOBAL_ENABLED=false

# With this option activated, you work with a url per webhook event, respecting the global url and the name of each event

WEBHOOK_GLOBAL_WEBHOOK_BY_EVENTS=false

## Set the events you want to hear

WEBHOOK_EVENTS_APPLICATION_STARTUP=false
WEBHOOK_EVENTS_QRCODE_UPDATED=true
WEBHOOK_EVENTS_MESSAGES_SET=true
WEBHOOK_EVENTS_MESSAGES_UPSERT=true
WEBHOOK_EVENTS_MESSAGES_UPDATE=true
WEBHOOK_EVENTS_MESSAGES_DELETE=true
WEBHOOK_EVENTS_SEND_MESSAGE=true
WEBHOOK_EVENTS_CONTACTS_SET=true
WEBHOOK_EVENTS_CONTACTS_UPSERT=true
WEBHOOK_EVENTS_CONTACTS_UPDATE=true
WEBHOOK_EVENTS_PRESENCE_UPDATE=true
WEBHOOK_EVENTS_CHATS_SET=true
WEBHOOK_EVENTS_CHATS_UPSERT=true
WEBHOOK_EVENTS_CHATS_UPDATE=true
WEBHOOK_EVENTS_CHATS_DELETE=true
WEBHOOK_EVENTS_GROUPS_UPSERT=true
WEBHOOK_EVENTS_GROUPS_UPDATE=true
WEBHOOK_EVENTS_GROUP_PARTICIPANTS_UPDATE=true
WEBHOOK_EVENTS_CONNECTION_UPDATE=true
WEBHOOK_EVENTS_CALL=true

# This event fires every time a new token is requested via the refresh route

WEBHOOK_EVENTS_NEW_JWT_TOKEN=false

# Name that will be displayed on smartphone connection

CONFIG_SESSION_PHONE_CLIENT=Evolution API

# Browser Name = chrome | firefox | edge | opera | safari

CONFIG_SESSION_PHONE_NAME=chrome

# Set qrcode display limit

QRCODE_LIMIT=30
QRCODE_COLOR=#198754

# Defines an authentication type for the api

# We recommend using the apikey because it will allow you to use a custom token,

# if you use jwt, a random token will be generated and may be expired and you will have to generate a new token

# jwt or 'apikey'

AUTHENTICATION_TYPE=apikey

## Define a global apikey to access all instances.

### OBS: This key must be inserted in the request header to create an instance.

AUTHENTICATION_API_KEY=GLOBAL-API-KEY
AUTHENTICATION_EXPOSE_IN_FETCH_INSTANCES=true

## Set the secret key to encrypt and decrypt your token and its expiration time

# seconds - 3600s ===1h | zero (0) - never expires

AUTHENTICATION_JWT_EXPIRIN_IN=0
AUTHENTICATION_JWT_SECRET='L=0YWt]b2w[WF>#>:&E`'
```

:::info Important:

If you do not want any of the types of LOG records to be displayed, simply delete the name of the LOG that you do not need from the line, as in the example below, so as not to display the VERBOSE:

```
LOG_LEVEL='ERROR,WARN,DEBUG,INFO,LOG,DARK,WEBHOOKS'

The Evolution API defaults to display all.
```

:::

### Copy and edit the API's Docker configuration file

```bash
cp docker-compose.yaml.example docker-compose.yaml
nano docker-compose.yaml
```

Copy & Paste:

```yaml
version: "3.3"

services:
  api:
    container_name: evolution_api
    image: evolution/api:local
    restart: always
    ports:
      - 8080:8080
    volumes:
      - evolution_instances:/evolution/instances - evolution_store:/evolution/store
    networks:
      - evolution-net
    env_file:
      - ./Docker/.env
    command: ["node", "./dist/src/main.js"]
    expose:
      - 8080

volumes:
  evolution_instances:
  evolution_store:

networks:
  evolution-net:
    external: true
```

### Grant execute permissions to docker.sh

```bash
chmod +x docker.sh
```

## INITIALIZING THE EVOLUTION API

### Run docker.sh to install the Evolution API

```bash
./docker.sh
```

Wait for the end of execution
:::info Note:

Check if the message below appears on the last line:

```log
      Container evolution_api           Started
```

:::

### Run the command below to check the Evolution API logs

```bash
docker container logs -f evolution_api
```

:::info Check if the two pieces of information appear in the LOGS listing below the lines below:

```log
INFO [WA MODULE] [string] Module - ON
LOG [SERVER] [string] HTTP - ON: 8080
```

:::
The others of the VERBOSE type are only informative.

Press `CTRL + C` to close the Container's LOGS

### Test if the Evolution API is working through the address IP:PORT:

`http://VPS-IP:8080/`

:::note If it works, the following message will appear in your browser:

```json
{
  "status": 200,
  "message": "Welcome to the Evolution API, it is working!",
  "version": "{{version}}"
}
```

:::

## UPDATING THE EVOLUTION API

### Commands for updating the API

:::danger Warning:

> ALWAYS take a snapshot of your VPS before performing the upgrade procedure.<br/>
> ALL CHANGES AND CUSTOMIZATION MADE DIRECTLY TO THE CODE WILL BE LOST.
> ALL LOGS WILL BE DELETED, FREEING UNNECESSARY USED SPACE.

:::

Log into the API installation folder via the Bitvise Console and run the commands below:

```bash
cd ~/evolution-api/

git reset --hard HEAD
git pull
./docker.sh
```

## TUTORIAL IN TEXT FILE (pt-BR only)

Download the Evolution API Installation Tutorial in text file.

Click on the link below, save the file on your computer and unzip it.

https://evolution-api.com/files/evolution-api-install-on-docker.zip
