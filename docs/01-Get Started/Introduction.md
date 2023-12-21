---
id: introduction
title: Introduction
hide_title: false
hide_table_of_contents: false
sidebar_label: Introduction
sidebar_position: 1
pagination_label: Introduction
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Start exploring Evolution API
keywords:
  - Introduction
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/12/2023
  author: matheus
---
## Introduction

This is a **COMPLETELY FREE** project, aiming to support small shopkeepers, entrepreneurs, self-employed professionals, and people with limited purchasing power. The goal is to enhance local or digital businesses with a WhatsApp™ messaging solution via API.

## Domain

All requests should use the domain or the IP of your Evolution API instance.

For most users is recommended using a subdomain to keep the main domain free for your dashboards or website.

```plaintext
<!-- Using localhost -->
http://localhost:8080/

 <!-- Using IP -->
http://123.123.12.123:8080/

<!-- Using subdomain -->
https://api.yoursite.com/
```

Every call has an an endpoint that is the final part of your url, every action like `send a message` or `fetch an instance` has an different endpoint.

## RESTful methods

Evolution API supports various RESTful methods to interact with your data, providing a flexible way to handle different types of requests. The primary methods used are POST, GET, and DELETE.

#### POST Method

The POST method is used to create new data on the server. In the context of the Evolution API, it's typically used to create new entries or send data to the server.

Example usage with Evolution API:

```rest
POST /your-endpoint
```

#### GET Method

The GET method retrieves data from the server. It's used for fetching records or data sets from your Evolution API instance.

Example usage with Evolution API:

```rest
GET /your-endpoint
```

#### DELETE Method

The DELETE method is used to remove data from the server. This method allows you to delete specific entries or data from your Evolution API instance.

Example usage with Evolution API:

```rest
DELETE /your-endpoint
```

## Authentication

To consume our API REST is necessary to include the `apikey` in the headers, this is the api key that authenticate the calls and secure your api to keep malicious people of using your WhatsApp api.

Every request has to send the `apikey` in the headers of the request.

If you don send the parameter or in the case of an invalid `apikey` the response of the request will be and HTTP STATUS 401 like this:

```json showLineNumbers
{
  "status": 401,
  "error": "Unauthorized",
  "response": {
    "message": "Unauthorized"
  }
}
```

### Request response status

It is always prudent that you evaluate the response code for a call made to the Evolution API. By default, we follow the HTTP specification. You can refer to this link to understand the returned codes.

In summary, some of the codes you will find in the vast majority of API calls are:

#### 200 OK

Indicates that the call was successful

#### 401 Unauthorized

Check your API token if it is being sent in the header as described here. Also check that it is an API v2 token, as tokens issued only for API v1 do not work in this version.

#### 422 Unprocessable Entity

We are unable to process the entity sent in your request. Check the endpoint documentation and response body to understand the errors that are causing it.

#### 429 Too Many Requests

Your requests are not being accepted due to the Request Limit.

#### 500 Internal Server Error

Some error has occurred within our system. Contact our team specifying the code of your request that is in the headers of your response so that we can understand the problem and provide a solution.

## Content-Type of requests

API data submission and collection is done using json.

So in both your request and response, the content-type will always be application/json.

## Objective

The content of this documentation is designed to be easy to understand and implement, even for users who are not familiar with technical procedures or systems. Efforts have been made to be as didactic as possible, anticipating potential errors and suggesting likely solutions.

## Community Support

For any inquiries, join our dedicated Discord Channel for individuals interested in Evolution-API. Visit [Evolution-API Discord](https://evolution-api.com/discord) for support and community discussions.

## Important Recommendations

Before starting the installation, **please read all recommendation before installation**:

1. This script is based on the **DEBIAN distribution, version 11 LTS 64bits**.
2. Tests were not conducted on other distributions, versions, or VPSs other than Hetzner.
3. A clean VPS was used for testing, without any other apps or services installed, to avoid conflicts unrelated to the Evolution API.
4. **Local installation is not recommended**, regardless of the operating system.
5. **Avoid installations without using a reverse proxy**. Direct access through IP + Port (e.g., `http://0.0.0.0:8080`) is discouraged.
6. While some users have successfully installed in various scenarios (other providers, local installation, Windows installation, usage and access without reverse proxy), these may require additional steps like port forwarding, additional apps, or specific settings not covered in this tutorial.
7. Any installation method deviating from this tutorial is **AT THE USER'S OWN DISCRETION AND RESPONSIBILITY**.

# License

This application is protected under the **GNU V3 Use License**.

## Overview

- The GNU User License V3 ensures that this application is distributed under the terms of the GNU General Public License Version 3.
- This means you have the rights to use, modify, and distribute this application under the terms outlined in the license.
- The GNU V3 Use License promotes the freedom to share and change software, ensuring user access to the source code and the right to exercise their rights.

**Please read the [GNU General Public License Version 3](https://www.gnu.org/licenses/gpl-3.0.html) carefully to understand your rights and obligations when using this application.**
