---
sidebar_position: 6
description: Configuração de variáveis
---
# Variáveis ​de ​Ambiente

```bash
# URL do Servidor - Configure a URL da sua aplicação

SERVER_URL=API-DOMAIN

# Cors - \* para todos ou defina separados por vírgulas - ex.: 'yourdomain1.com, yourdomain2.com'

CORS_ORIGIN=*
CORS_METHODS=POST,GET,PUT,DELETE
CORS_CREDENTIALS=true

# Determina os logs a serem exibidos

LOG_LEVEL=ERROR,WARN,DEBUG,INFO,LOG,VERBOSE,DARK,WEBHOOKS
LOG_COLOR=true

# Log do Baileys - "fatal" | "error" | "warn" | "info" | "debug" | "trace"

LOG_BAILEYS=error

# Determina por quanto tempo a instância deve ser excluída da memória em caso de falta de conexão.

# Tempo padrão: 5 minutos

# Se você não quiser que expire, insira o valor false

DEL_INSTANCE=false

# Armazenamento temporário de dados

STORE_MESSAGES=true
STORE_MESSAGE_UP=true
STORE_CONTACTS=true
STORE_CHATS=true

# Defina o intervalo de limpeza do armazenamento em segundos (7200 = 2h)

CLEAN_STORE_CLEANING_INTERVAL=7200
CLEAN_STORE_MESSAGES=true
CLEAN_STORE_MESSAGE_UP=true
CLEAN_STORE_CONTACTS=true
CLEAN_STORE_CHATS=true

# Armazenamento permanente de dados

DATABASE_ENABLED=false
DATABASE_CONNECTION_URI=mongodb://root:root@mongodb:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true
DATABASE_CONNECTION_DB_PREFIX_NAME=evdocker

# Escolha os dados que deseja salvar no banco de dados da aplicação ou armazenar

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

# Configurações Globais de Webhook

# Cada Webhook de instância será solicitado no momento em que ela for criada

## Defina um webhook global que ouvirá eventos habilitados de todas as instâncias

WEBHOOK_GLOBAL_URL=<url>
WEBHOOK_GLOBAL_ENABLED=false

# Com esta opção ativada, você trabalha com uma URL por evento de webhook, respeitando a URL global e o nome de cada evento

WEBHOOK_GLOBAL_WEBHOOK_BY_EVENTS=false

## Defina os eventos que deseja ouvir

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

# Este evento é disparado sempre que um novo token é solicitado via rota de atualização

WEBHOOK_EVENTS_NEW_JWT_TOKEN=false

# Nome que será exibido na conexão de smartphone

CONFIG_SESSION_PHONE_CLIENT=Evolution API

# Nome do Navegador = chrome | firefox | edge | opera | safari

CONFIG_SESSION_PHONE_NAME=chrome

# Defina o limite de exibição do qrcode

QRCODE_LIMIT=30
QRCODE_COLOR=#198754

# Define um tipo de autenticação para a API

# Recomendamos usar o apikey porque permitirá usar um token personalizado,

# se você usar jwt, um token aleatório será gerado e poderá expirar, e você terá que gerar um novo token

# jwt ou 'apikey'

AUTHENTICATION_TYPE=apikey

## Defina um apikey global para acessar todas as instâncias.

### OBS: Esta chave deve ser inserida no cabeçalho da solicitação para criar uma instância.

AUTHENTICATION_API_KEY=GLOBAL-API-KEY
AUTHENTICATION_EXPOSE_IN_FETCH_INSTANCES=true

## Defina a chave secreta para criptografar e descriptografar seu token e seu tempo de expiração

# segundos - 3600s ===1h | zero (0) - nunca expira

AUTHENTICATION_JWT_EXPIRIN_IN=0
AUTHENTICATION_JWT_SECRET='L=0YWt]b2w[WF>#>:&E`'
```
