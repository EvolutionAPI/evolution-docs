---
sidebar_position: 2
description: The recommended and necessary to work with Evolution API
---

# Infrastructure

## PREREQUISITES & PREPARATION

To use the Evolution API, we recommend hiring an exclusive VPS for this purpose.

In all our tests carried out, Hetzner was the one that presented the best cost x benefit, offering a reliable, fast and cheap infrastructure.

If you haven't purchased a VPS yet, we recommend doing so using the link below:

https://hetzner.cloud/?ref=E1AsUeCv1soz

By purchasing through this link, you will be guaranteed a credit of 20 EUR to use in your trial period.
:::info Note:
This credit is only valid for NEW ACCOUNTS.
:::

1. Minimum suggested configuration:

- Plan CX11
- 2 vCPU
- 2 GB RAM
- 40GB NVMe
- 20TB Transfer

2. Register a domain to make the project available.

   Ex: `evolution-api.com`

3. If you haven't already, create a Cloudflare account at https://www.cloudflare.com/ and use the Free Plan to add your domain and replace DNS servers.

4. Make the DNS notes with Type A entries of the subdomains for the VPS IP.

- Point out the following subdomains:
- rest.evolution-api.com (Evolution API)

:::info Note:
DO NOT mark the proxy option (little orange cloud) when making the note.
:::

:::caution Important:
The domain "evolution-api.com" and the subdomain "rest" above are just examples used in this tutorial.
You must use your information and change the rest of this Script Installation, otherwise it will not work.
:::

5. To make it easier, we created a glossary of terms to be replaced in your file, making it easier to using this script. Depending on the text editor you use, just click on the Edit menu, then in Replace and inform the Terms of the File to search and the New Term for Replacement so that they are changed throughout this file:

<!-- prettier-ignore -->
FILE TERM | NEW TERM AFTER REPLACEMENT | DESCRIPTION
---- | --- | ---
API-DOMAIN | API-DOMAIN | Full domain where the bot will work (Ex: https://rest.evolution-api.com). <br /><br />**IMPORTANT:** For the correct functioning of the Evolution API, the use of the HTTPS protocol is mandatory, therefore, configure your reverse proxy and use SSL.
VPS-IP | VPS-IP | Contracted VPS IP
PASSWORD-ROOT-VPS | PASSWORD-ROOT-VPS | VPS "root" User Password (Suggestion: 20 characters \| Uppercase and lowercase letters, Numbers and Symbols)
TIMEZONE | TIMEZONE | Time Zone to be used (Ex: America/Sao_Paulo or America/Fortaleza)
GLOBAL-API-KEY | GLOBAL-API-KEY | Create and enter a unique code for the Global API Key
EMAIL-CERTBOT | EMAIL-CERTBOT | Email that will receive certificate expiration notification

:::tip Note:
Using this Glossary of Terms, your work will be much easier, because all relevant information from the configuration file will already be informed with your personalized content.
:::

6. Test the response of the notes to the subdomains created through the DNS Checker in the address https://dnschecker.org.

7. Download Bitvise at https://www.bitvise.com/ssh-client-download and install on your computer, allowing you to connect via SSH to your VPS. I recommend Bitvise at over others, as it allows a connection via Console and sFTP on the same screen.

8. Follow the installation script step-by-step below, very calmly and carefully, as one slightest detail can generate unexpected behavior and consequently the Evolution API will not work correctly:

- VPS login
- Tips for Using this Tutorial
- Preparation of the Environment
- Installation of the Evolution API

  If, in the end, the API does not work correctly, it is recommended to review it item by item or eventually redo the complete installation after restoring the VPS to its original configuration.

9. DONE. Now all you have to do is make use of the Evolution API in your projects.

10. To access Postman's Complete Documentation and Collection, register on our page by accessing the address below:

https://evolution-api.com/opensource-whatsapp-api/

## VPS LOGIN

#### Login to server via Bitvise Console

Server : VPS-IP
User: root
Password : PASSWORD-ROOT-VPS

:::tip Tips for using this tutorial:

Run each of the commands below in your Terminal, exactly in the order presented, without doing
no intervention in any error messages that may be displayed.

If by chance at the end of the process the Evolution API does not work properly, then come back and try to check if there are any unforeseen errors. Combined?

Whenever there is a starting and ending sequence of three hyphens, as shown below:

--- <br />
CONTENT <br />
\---

It means that the CONTENT within that sequence must be copied and pasted in the Terminal after executing the previous command, which will normally be "nano".

Do not copy the sequences of three hyphens, as they are not part of the code.

To copy in this file, mark the text block and press "CTRL + C".

To paste in Terminal, just position the cursor where you want to paste and click the button right mouse button.

To save the content and exit, type in Terminal the commands "CTRL + X", then "Y" and "ENTER".
