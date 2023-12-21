---
id: nvm-installation
title: NVM
hide_title: false
hide_table_of_contents: false
sidebar_label: NVM
sidebar_position: 2
pagination_label: NVM
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: How to install Evolution with NVM
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

Evolution API can be easily installed using the Node Version Manager (NVM). Follow these steps to set up your environment and get Evolution API up and running on your server.

## Install NVM

First, download and install Node.js. You can do this by running the following commands:

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

Now just point the NVM directiories and install node:

```bash title="CLI"
# Source the bash for environments
source ~/.bashrc

# Directories
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# Install node:
 nvm install v20.10.0 && nvm use v20.10.0
```

Confirm that NVM is successfully installed:

```bash
command -v nvm
```

:::note
If you haven`t already you could also configure your private server timezone with the following command

```bash
dpkg-reconfigure tzdata
```

:::

Clone the oficial repository from Github to your private server.

```bash title="CLI"
git clone https://github.com/EvolutionAPI/evolution-api.git
```

Then acess the folder that the project is on

```bash title="CLI"
cd evolution-api
npm install
```

Now lets copy the `env.yml` file with the configurations that you have to edit.

```bash title="CLI"
cp src/dev-env.yml src/env.yml
nano src/env.yml
```

This command creates a copy of the default environment file.

Next, open the env.yml file in a text editor to input your configuration settings. You can use nano, a command-line text editor, for this purpose:

```bash title="CLI"
nano src/env.yml
```

In the nano editor, navigate through the file and replace the default values with your specific configurations. This may include database connection strings, API keys, server ports, etc.

:::note

Acess the [environment variables](/docs/01-Get%20Started/Environment%20variables.md) section for detailed instructions on configuring your `env.yml` file.

:::

To start the Evolution API, use the following command:

```bash title="CLI"
npm run start:prod
```

## Configure PM2

Use PM2 to manage the API process:

```bash title="CLI"
pm2 start 'npm run start:prod' --name ApiEvolution
pm2 startup
pm2 save --force
```

:::note Optional
You may need to allocate more memory to PM2, especially if your server has the capacity:

```sh
pm2 start 'npm run start:prod' --name ApiEvolution -- start --node-args="--max-old-space-size=4096" --max-memory-restart 4G
```

In the above example, it's assumed that your VPS has at least 4GB of RAM available exclusively for the Evolution API.

The available memory may vary we recommend at least 1GB to run Evolution.
:::

If you want to make sure that the api is running just use your browser to access http://localhost:8080. This should be your browsers response:

```json title="http://localhost:8080/" showLineNumbers
{
    "status": 200,
    "message": "Welcome to the Evolution API, it is working!",
    "version": "1.x.x",
    "documentation": "http://localhost:8080/docs"
}
```

:::tip

Make your life easier with some the JSON Formatter extension on [Google Chrome](https://chromewebstore.google.com/detail/json-formatter/gpmodmeblccallcadopbcoeoejepgpnb?hl=pt-BR) or [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/json-formatter/hdebmbedhflilekbidmmdiaiilaegkjl) stores.

:::

EvolutionAPI has a in-built Swagger endpoint documentation, you could use to see all the possible endpoints and test the requests by accessing `http://localhost:8080/docs`.

## Nginx configuration

First let`s install, start, enable and test the Nginx service in your private server.

```bash title="CLI"
apt-get install -y nginx
systemctl start nginx
systemctl enable nginx
systemctl status nginx
```

If the information "Active: active (running)" appears in green, it means that Nginx is running and you can move on to the next step.

### Remove Nginx Default Configuration

First, remove the default website file that comes enabled with Nginx:

```bash title="CLI"
rm /etc/nginx/sites-enabled/default
```

### Create a new server block file in the directory

```bash title="CLI" 
nano /etc/nginx/conf.d/default.conf
```

Then paste the Nginx config in the `default.conf` file:

```nginx title="/etc/nginx/conf.d/default.conf" showLineNumbers
server {
  listen 80;
  listen \[::\]:80;
  server_name \_;
  root /var/www/html/;
  index index.php index.html index.htm index.nginx-debian.html;

location / {
    try_files $uri $uri/ /index.php;
  }

location ~ \\.php$ {
    fastcgi_pass unix:/run/php/php7.4-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $document\_root$fastcgi_script_name;
    include fastcgi_params;
    include snippets/fastcgi-php.conf;
  }

# A long browser cache lifetime can speed up repeat visits to your page
location ~\* \\.(jpg|jpeg|gif|png|webp|svg|woff|woff2|ttf|css|js|ico|xml)$ {
       access_log        off;
       log_not_found     off;
       expires           360d;
  }

# disable access to hidden files
location ~ /\\.ht {
      access_log off;
      log_not_found off;
      deny all;
  }
}
```

After making changes to your Nginx configuration, it's essential to reload the Nginx service. This ensures that any modifications you've made are applied and become effective.

Run the following command in the terminal to reload Nginx:

```bash title="CLI"
systemctl reload nginx
```

Make the nginx user the owner of the web directory, by default, it is owned by the root user:

```bash title="CLI"
chown www-data:www-data /usr/share/nginx/html -R
```

Now, create a Virtual Host pointing to your subdomain by editing the `api` file:

```bash title="CLI"
cd ~
nano /etc/nginx/sites-available/api
```

Then paste the Nginx config in the `api` file:

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

Create a symbolic link between the `api` and `sites-enabled` files:

```bash title="CLI"
ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled
```

Then validate Nginx configuration for subdomain:

```bash title="CLI"
nginx -t
```

:::info This message should appear in your teminal if all have been configured correctly:

_nginx: the configuration file /etc/nginx/nginx.conf syntax is ok_
_nginx: configuration file /etc/nginx/nginx.conf test is successful_
:::

Reload Nginx to make the changes effective.

```bash title="CLI"
systemctl reload nginx
```

## Install Certbot for SSL Certificate

To secure your Evolution API with an SSL certificate, you can use Certbot. Install Certbot using the following command:

```bash title="CLI"
snap install --classic certbot
```

### Certify API subdomain

```bash title="CLI"
certbot --nginx -d replace-this-with-your-cool-domain.com
```

You will be asked if you want to enter an email to receive notifications when the certificate generated is close to the expiration date.

:::info 

If the certification is successful, at the end of the process a line will be displayed with the following message:

"Congratulations! You have successfully enabled HTTPS"

:::
