---
sidebar_position: 5
description: Guide to install EvolutionAPI over Nginx reverse proxy.
---

# Nginx Installation

## REVERSE PROXY CONFIGURATION

### Login to server via Bitvise Console

Server : VPS-IP
User: root
Password : PASSWORD-ROOT-VPS

### Install, start, enable and test the Nginx service

```bash
apt-get install -y nginx

systemctl start nginx
systemctl enable nginx
systemctl status nginx
```

If the information "Active: active (running)" appears in green, it means that Nginx is running and you can move on to the next step.

:::info Note:

_If the screen freezes with an (END) in the final line, press CTRL + C or just the Q key_

:::

Test if the Nginx web server is working by visiting the address below:

```
http://VPS-IP/
```

:::note If it works, a page will appear in your browser with the text:

_Welcome to nginx!_

_If you see this page, the nginx web server is successfully installed and working. Further configuration is required._

_For online documentation and support please refer to nginx.org._
_Commercial support is available at nginx.com._

_Thank you for using nginx._

:::

### Install the application needed to certify the Evolution API domain

```bash
snap install --classic certbot
```

### Remove Nginx Enabled Default Website File

```bash
rm /etc/nginx/sites-enabled/default
```

### Create a new server block file in the directory

```bash
nano /etc/nginx/conf.d/default.conf
```

Copy & Paste:

```nginx
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

### Validate Nginx configuration for subdomain

```bash
nginx -t
```

:::info If it works, the following message will appear in your terminal:

_nginx: the configuration file /etc/nginx/nginx.conf syntax is ok_
_nginx: configuration file /etc/nginx/nginx.conf test is successful_
:::

### If there are no problems, restart Nginx to enable your changes.

```bash
systemctl reload nginx
```

### Make the nginx user the owner of the web directory.

By default, it is owned by the root user.

```bash
chown www-data:www-data /usr/share/nginx/html -R
```

## REVERSE PROXY CONFIGURATION

### Create Virtual Host pointing to subdomain

```bash
cd ~
nano /etc/nginx/sites-available/api
```

Copy & Paste:

```nginx
server {
  server_name API-DOMAIN;

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

```bash
ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled
```

### Validate Nginx configuration for subdomain

```bash
nginx -t
```

:::info If it works, the following message will appear in your terminal:

_nginx: the configuration file /etc/nginx/nginx.conf syntax is ok_
_nginx: configuration file /etc/nginx/nginx.conf test is successful_
:::

### If there are no problems, restart Nginx to enable your changes.

```bash
systemctl reload nginx
```

## CERTIFIING THE SUBDOMAIN

### Certify API subdomain

```bash
certbot --nginx -d API-DOMAIN
```

You will be asked if you want to enter an email to receive notifications when the certificate generated is close to the expiration date.

Enter your email address:

`EMAIL-CERTBOT`

Press `Y` on the two messages that appear.

Type the number corresponding to the subdomain you want to certify and press ENTER.

:::info If the certification is successful, at the end of the process a line will be displayed with the following message:

_"Congratulations! You have successfully enabled HTTPS..."_

_If this message does not appear, repeat the steps from the creation of the Virtual Host_

:::

### List API subdomain certificate

```bash
ls -l /etc/letsencrypt/live/DOMINIO-DA-API/
```

### Test if the Evolution API is working on the certified subdomain by visiting the address below:

`https://API-DOMAIN/`

:::info If it works, the following message will appear in your browser:

_{"status":200,"message":"Welcome to the Evolution API, it is working!","version":"{{version}}"}_

:::

:::caution Important:

_Confirm that the padlock appears closed on the left side of the browser address bar._
:::
