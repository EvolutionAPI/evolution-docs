---
sidebar_position: 3
descriotion: Install Evolution API directly on your server with NPM.
---

# NPM Installation

## ENVIRONMENT PREPARATION FOR NPM

### Download and install Node.js

```sh
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -

apt-get install -y nodejs
```

### Update NPM to the latest version

```sh
npm install -g npm@latest
```

### Install the other necessary/recommended apps for installing and running the Evolution API

```sh
npm install -g pm2@latest

apt-get install -y git zip unzip nload snapd curl wget sudo
```

### Update the Time Zone according to your installation location

```sh
dpkg-reconfigure tzdata
```

Choose the corresponding TimeZone

TIMEZONE

### Update the system and install the necessary packages.

```sh
apt update && apt -y upgrade
```

:::tip Note:
If a window appears with information about apps to restart, check all of them and confirm.
:::

### Reboot the system

```sh
reboot
```

:::caution Important:
After receiving the message that it is now available, press CTRL + SHIFT + P to reconnect
:::

## INSTALLING THE EVOLUTION API

### Clone the Evoluton API repository

```sh
git clone https://github.com/EvolutionAPI/evolution-api.git
```

### Access the API folder and install

```sh
cd evolution-api
npm install
```

### Copy and edit the API configuration file

```sh
cp src/dev-env.yml src/env.yml
nano src/env.yml
```

```yml title=src/env.yml
# ⚠️
# ⚠️ ALL SETTINGS DEFINED IN THIS FILE ARE APPLIED TO ALL INSTANCES.
# ⚠️

# ⚠️ RENAME THIS FILE TO env.yml

# Choose the server type for the application
SERVER:
  TYPE: http # https
  PORT: 8080 # 443
  URL: API-DOMAIN

CORS:
  ORIGIN:
    - "*"
    # - yourdomain.com
  METHODS:
    - POST
    - GET
    - PUT
    - DELETE
  CREDENTIALS: true

# Install ssl certificate and replace string <domain> with domain name
# Access: https://certbot.eff.org/instructions?ws=other&os=ubuntufocal
SSL_CONF:
  PRIVKEY: /etc/letsencrypt/live/<domain>/privkey.pem
  FULLCHAIN: /etc/letsencrypt/live/<domain>/fullchain.pem

# Determine the logs to be displayed
LOG:
  LEVEL:
    - ERROR
    - WARN
    - DEBUG
    - INFO
    - LOG
    - VERBOSE
    - DARK
    - WEBHOOKS
  COLOR: true
  BAILEYS: error # "fatal" | "error" | "warn" | "info" | "debug" | "trace"

# Determine how long the instance should be deleted from memory in case of no connection.
# Default time: 5 minutes
# If you don't even want an expiration, enter the value false
DEL_INSTANCE: false # or false

# Temporary data storage
STORE:
  MESSAGES: true
  MESSAGE_UP: true
  CONTACTS: true
  CHATS: true

CLEAN_STORE:
  CLEANING_INTERVAL: 7200 # 7200 seconds === 2h
  MESSAGES: true
  MESSAGE_UP: true
  CONTACTS: true
  CHATS: true

# Permanent data storage
DATABASE:
  ENABLED: false
  CONNECTION:
    URI: "mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true"
    DB_PREFIX_NAME: evolution
  # Choose the data you want to save in the application's database or store
  SAVE_DATA:
    INSTANCE: false
    NEW_MESSAGE: false
    MESSAGE_UPDATE: false
    CONTACTS: false
    CHATS: false

REDIS:
  ENABLED: false
  URI: "redis://localhost:6379"
  PREFIX_KEY: "evolution"

RABBITMQ:
  ENABLED: false
  URI: "amqp://guest:guest@localhost:5672"

WEBSOCKET:
  ENABLED: false

# Global Webhook Settings
# Each instance's Webhook URL and events will be requested at the time it is created
WEBHOOK:
  # Define a global webhook that will listen for enabled events from all instances
  GLOBAL:
    URL: <url>
    ENABLED: false
    # With this option activated, you work with a url per webhook event, respecting the global url and the name of each event
    WEBHOOK_BY_EVENTS: false
  # Automatically maps webhook paths
  # Set the events you want to hear
  EVENTS:
    APPLICATION_STARTUP: false
    QRCODE_UPDATED: true
    MESSAGES_SET: true
    MESSAGES_UPSERT: true
    MESSAGES_UPDATE: true
    MESSAGES_DELETE: true
    SEND_MESSAGE: true
    CONTACTS_SET: true
    CONTACTS_UPSERT: true
    CONTACTS_UPDATE: true
    PRESENCE_UPDATE: true
    CHATS_SET: true
    CHATS_UPSERT: true
    CHATS_UPDATE: true
    CHATS_DELETE: true
    GROUPS_UPSERT: true
    GROUP_UPDATE: true
    GROUP_PARTICIPANTS_UPDATE: true
    CONNECTION_UPDATE: true
    CALL: true
    # This event fires every time a new token is requested via the refresh route
    NEW_JWT_TOKEN: false

CONFIG_SESSION_PHONE:
  # Name that will be displayed on smartphone connection
  CLIENT: "Evolution API"
  NAME: chrome # chrome | firefox | edge | opera | safari

# Set qrcode display limit
QRCODE:
  LIMIT: 30
  COLOR: "#198754"

# Defines an authentication type for the api
# We recommend using the apikey because it will allow you to use a custom token,
# if you use jwt, a random token will be generated and may be expired and you will have to generate a new token
AUTHENTICATION:
  TYPE: apikey # jwt or apikey
  # Define a global apikey to access all instances
  API_KEY:
    # OBS: This key must be inserted in the request header to create an instance.
    KEY: GLOBAL-API-KEY
  # Expose the api key on return from fetch instances
  EXPOSE_IN_FETCH_INSTANCES: true
  # Set the secret key to encrypt and decrypt your token and its expiration time.
  JWT:
    EXPIRIN_IN: 0 # seconds - 3600s === 1h | zero (0) - never expires
    SECRET: L=0YWt]b2w[WF>#>:&E`
```

:::caution Important:
If you do not want any of the types of LOG records to be displayed, simply insert a # character in front of the event, as in the example below, to not display the VERBOSE:

      LOG:
        LEVEL:
          - ERROR
          - WARN
          - DEBUG
          - INFO
          - LOG
          #- VERBOSE
          - DARK
          - WEBHOOKS

The Evolution API defaults to display all.
:::

## INITIALIZING THE EVOLUTION API

### Start the API

```sh
npm run start:prod
```

:::info
Check if the two pieces of information appear in the LOGS listing below the lines below:

INFO [WA MODULE] [string] Module - ON
LOG [SERVER] [string] HTTP - ON: 8080

The others of the VERBOSE type are only informative
:::

Press CTRL + C to end the API

### Configure API initialization

```sh
pm2 start 'npm run start:prod' --name ApiEvolution
pm2 startup
pm2 save --force
```

:::caution
Eventually you can complement the command with the option below, to increase the memory to be used by PM2:

```sh
pm2 start 'npm run start:prod' --name ApiEvolution -- start --node-args="--max-old-space-size=4096" --max-memory-restart 4G
```

In the example above, the VPS is assumed to have at least 4GB of RAM available only for the Evolution API
:::

### Test if the Evolution API is working through the address IP:PORT:

http://{{VPS-IP}}:8080/

If it works, the following message will appear in your browser:

```json
{ "status": 200, "message": "Welcome to the Evolution API, it is working!" }
```
