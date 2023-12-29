---
id: nvm-installation
title: NVM
hide_title: false
hide_table_of_contents: false
sidebar_label: NVM
sidebar_position: 2
pagination_label: NVM
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Como instalar o Evolution com NVM
keywords:
  - installation
  - NPM
  - NVM
  - Nginx
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/12/2023
  author: matheus
---


A Evolution API pode ser facilmente instalada usando o Node Version Manager (NVM). Siga estas etapas para configurar seu ambiente e executar a Evolution API em seu servidor.

### Instale o NVM

Primeiro, faça o download e instale o Node.js. Você pode fazer isso executando os seguintes comandos:


import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="curl" label="curl">

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  ```

  </TabItem>

  <TabItem value="wget" label="wget">

  ```bash
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  ```

  </TabItem>
</Tabs>

Agora é só apontar os diretórios do NVM e instalar o node:

```bash title="CLI"
# Carregue o bash para ambientes
source ~/.bashrc

# Diretórios
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Isso carrega o nvm

# Instale o Node.js:
nvm install v20.10.0 && nvm use v20.10.0
```

Confirme se o NVM foi instalado com sucesso:

```bash
command -v nvm
```

:::note
Se ainda não o fez, você também pode configurar o fuso horário do servidor privado com o seguinte comando:

```bash
dpkg-reconfigure tzdata
```

:::

Clone o repositório oficial do Github para o seu servidor privado.

```bash title="CLI"
git clone https://github.com/EvolutionAPI/evolution-api.git
```

Em seguida, acesse a pasta onde está o projeto

```bash title="CLI"
cd evolution-api
npm install
```

Agora vamos copiar o arquivo `env.yml` com as configurações que você precisa editar.

```bash title="CLI"
cp src/dev-env.yml src/env.yml
nano src/env.yml
```

Este comando cria uma cópia do arquivo de ambiente padrão.

A seguir, abra o arquivo `env.yml` em um editor de texto para inserir suas configurações de configuração. Você pode usar o nano, um editor de texto de linha de comando, para esse fim:

```bash title="CLI"
nano src/env.yml
```

No editor nano, navegue pelo arquivo e substitua os valores padrão pelas suas configurações específicas. Isso pode incluir strings de conexão com o banco de dados, chaves de API, portas do servidor, etc.

:::note NOTA

Acesse a seção de variáveis de ambiente para obter instruções detalhadas sobre como configurar seu arquivo `env.yml`.

:::

Para iniciar a Evolution API, use o seguinte comando:

```bash title="CLI"
npm run start:prod
```

## Instalar e Configurar o PM2

Use o PM2 para instalar o PM2 e iniciar o gerenciador para o processo da API:

```bash title="CLI"
npm install pm2 -g
pm2 start 'npm run start:prod' --name ApiEvolution
pm2 startup
pm2 save --force
```

:::note Opcional
Você pode precisar alocar mais memória para o PM2, especialmente se o seu servidor tiver capacidade para isso:

```sh
pm2 start 'npm run start:prod' --name ApiEvolution -- start --node-args="--max-old-space-size=4096" --max-memory-restart 4G
```

No exemplo acima, pressupõe-se que o seu VPS tem pelo menos 4GB de RAM disponíveis exclusivamente para a Evolution API.

A quantidade de memória disponível pode variar, recomendamos pelo menos 1GB para executar a Evolution.
:::

Se você deseja garantir que a API esteja em execução, basta usar seu navegador para acessar http://localhost:8080. A resposta do seu navegador deve ser a seguinte:

```json title="http://localhost:8080/" showLineNumbers
{
    "status": 200,
    "message": "Welcome to the Evolution API, it is working!",
    "version": "1.x.x",
    "documentation": "http://localhost:8080/docs"
}
```

:::tip DICA

Facilite sua vida com a extensão JSON Formatter no [Google Chrome](https://chromewebstore.google.com/detail/json-formatter/gpmodmeblccallcadopbcoeoejepgpnb?hl=pt-BR) ou [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/json-formatter/hdebmbedhflilekbidmmdiaiilaegkjl).

:::

O EvolutionAPI possui uma documentação de endpoint Swagger embutida que você pode usar para ver todos os endpoints possíveis e testar as solicitações acessando `http://localhost:8080/docs`.

## Configuração do Nginx

Primeiro, vamos instalar, iniciar, habilitar e testar o serviço Nginx em seu servidor privado.

```bash title="CLI"
apt-get install -y nginx
systemctl start nginx
systemctl enable nginx
systemctl status nginx
```

Se a informação "Ativo: ativo (em execução)" aparecer em verde, significa que o Nginx está em execução e você pode prosseguir para a próxima etapa.

### Remover a Configuração Padrão do Nginx

Primeiro, remova o arquivo do site padrão que vem habilitado com o Nginx:

```bash title="CLI"
rm /etc/nginx/sites-enabled/default
```

### Crie um novo arquivo de bloco de servidor no diretório

```bash title="CLI" 
nano /etc/nginx/conf.d/default.conf
```

Em seguida, cole a configuração do Nginx no arquivo `default.conf`:

```nginx title="/etc/nginx/conf.d/default.conf" showLineNumbers
server {
  listen 80;
  listen [::]:80;
  server_name _;
  root /var/www/html/;
  index index.php index.html index.htm index.nginx-debian.html;

  location / {
    try_files $uri $uri/ /index.php;
  }

  location ~ \.php$ {
    fastcgi_pass unix:/run/php/php7.4-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
    include snippets/fastcgi-php.conf;
  }

  # Um tempo de vida em cache longo do navegador pode acelerar visitas repetidas à sua página
  location ~* \.(jpg|jpeg|gif|png|webp|svg|woff|woff2|ttf|css|js|ico|xml)$ {
      access_log off;
      log_not_found off;
      expires 360d;
  }

  # Desabilite o acesso a arquivos ocultos
  location ~ /\.ht {
      access_log off;
      log_not_found off;
      deny all;
  }
}
```

Após fazer alterações na configuração do Nginx, é essencial recarregar o serviço do Nginx. Isso garante que quaisquer modificações que você tenha feito sejam aplicadas e tenham efeito.

Execute o seguinte comando no terminal para recarregar o Nginx:

```bash title="CLI"
systemctl reload nginx
```

Faça com que o usuário do Nginx seja o proprietário do diretório da web, por padrão, ele é de propriedade do usuário root:

```bash title="CLI"
chown www-data:www-data /usr/share/nginx/html -R
```

Agora, crie um Virtual Host apontando para seu subdomínio editando o arquivo `api`:

```bash title="CLI"
cd ~
nano /etc/nginx/sites-available/api
```

Em seguida, cole a configuração do Nginx no arquivo `api`:

```nginx title="/etc/nginx/sites-available/api" showLineNumbers
server {
  server_name replace-this-with-your-cool-domain.com;

location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_cache_bypass $http_upgrade;
  }
}

```

Crie um link simbólico entre o arquivo `api` e o diretório `sites-enabled`:

```bash title="CLI"
ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled
```

Em seguida, valide a configuração do Nginx para o subdomínio:

```bash title="CLI"
nginx -t
```

:::info Esta mensagem deve aparecer no seu terminal se tudo estiver configurado corretamente:

_nginx: the configuration file /etc/nginx/nginx.conf syntax is ok_
_nginx: configuration file /etc/nginx/nginx.conf test is successful_
:::

Recarregue o Nginx para que as alterações tenham efeito.

```bash title="CLI"
systemctl reload nginx
```

## Instalar o Certbot para Certificado SSL

Para proteger sua Evolution API com um certificado SSL, você pode usar o Certbot. Instale o Certbot usando o seguinte comando:

```bash title="CLI"
snap install --classic certbot
```

### Certify API subdomain

```bash title="CLI"
certbot --nginx -d replace-this-with-your-cool-domain.com
```

Você será solicitado a inserir um e-mail para receber notificações quando o certificado gerado estiver próximo da data de vencimento.

:::info INFORMAÇÃO

Se a certificação for bem-sucedida, no final do processo, uma linha será exibida com a seguinte mensagem:

"Parabéns! Você habilitou com sucesso o HTTPS"

:::
