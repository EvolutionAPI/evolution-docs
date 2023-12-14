---
id: Updates
title: Updates
hide_title: false
hide_table_of_contents: false
sidebar_label: Updates
sidebar_position: 5
pagination_label: Updates
# custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
description: Update your Evolution API instances
keywords:
  - Updates
# image: https://i.imgur.com/mErPwqL.png
# slug: /myDoc
last_update:
  date: 12/12/2023
  author: matheus
---

# How to Update Your Evolution API

Keeping your Evolution API instance up-to-date is crucial for security, performance, and accessing new features. The update method depends on how you initially installed the API. This guide covers the steps for updating your Evolution API using Docker Compose and NPM.

## Update with Docker

If you initially set up your Evolution API using Docker, follow these steps to update:

### Update with Docker CLI

If your Evolution API was initially installed using Docker Compose via the command line interface (CLI), and not through Portainer or any other container management tool, follow these steps to update it:

1. **Navigate to Docker Compose Directory**: Open a terminal and go to the directory where your Docker Compose file (`docker-compose.yml`) is located.

2. **Pull the Latest Image**: Update the Evolution API image to the latest version by running the following command:

```bash title="CLI"
docker-compose pull atendai/evolution-api:latest
```

3. **Stop and Restart the Containers**: After pulling the latest image, stop the current containers and restart them. This can be done using the following command:

```bash title="CLI"
docker-compose down && docker-compose up -d

```

## Update with Portainer

If you're using Portainer for container management, follow these steps to update your Evolution API:

1. **Access Portainer Dashboard**: Open your Portainer dashboard in a web browser.

2. **Navigate to Your Containers**: Go to the 'Stacks' section where your Evolution API container is listed.

<!-- ![Portainer Interface](/public/images/01-portainer.png) -->

3. **Update the Compose**:
   - Locate the `image` field in your Docker Compose configuration.

```yaml title="https://portainer.yourdomain.com/#!/1/docker/stacks/evolution"
# ... (other services and configurations)

  evolution_api:
    # Update the Evolution API image version here
    # Use 'atendai/evolution-api:latest' for the latest version
    # Or specify a specific version like 'atendai/evolutionapi:v1.6.0'
    # highlight-next-line
    image: atendai/evolution-api:v1.x.x
    networks:
      - your_network

# ... (rest of the Docker Compose configuration)
```
   - Update the value to `atendai/evolution-api:latest` for the latest version, or use `atendai/evolutionapi:v1.x.x` for a specific version.
   - After making the changes, click the 'Deploy' button at the end of the edit compose window.

<!-- ![Portainer Interface](/public/images/02-portainer.png) -->

4. **Verify the Update**: After recreating the container, check to ensure Evolution API is running the latest version. This can typically be verified through the API's version endpoint or logs.

:::note Production Environment Recommendation
For production environments, it's advisable to specify a particular version of the Evolution API (e.g., `atendai/evolution-api:v1.x.x`) rather than using `latest`.

This practice ensures stability and predictability, as it protects your production environment from potential issues arising from unexpected changes in the latest version.
:::

By following these steps, you can ensure your Evolution API is always up to date using Portainer.

## Update with NPM

Updating your Evolution API installation via NPM involves several steps to ensure a smooth transition to the new version. Here's a step-by-step guide:

1. **Flush and Stop**: Clears all logs from PM2, useful for troubleshooting after the update and temporarily stops the Evolution API to safely apply updates.

```bash title="CLI"
# Clear all PM2 logs
pm2 flush

# Stop the current Evolution API process
pm2 stop ApiEvolution
```

2. **Reset local repository and pull the latest updates**: Ensures your local codebase is in sync with the latest commit and downloads the latest updates from the repository. Optionally, switch to a specific version if not using the latest. It's recommended for production environments.

```bash title="CLI"
# Reset your local repository to the latest commit
git reset --hard HEAD

# Pull the latest updates from the repository
git pull

# For a specific version, use either 'git checkout main' for the latest, 
# or 'git checkout 1.x.x' for a specific version. Example:
# highlight-next-line
git checkout 1.x.x
```

3. **Clean Installation**: Removes existing `node_modules` to prevent potential conflicts with new dependencies and installs the required Node.js dependencies for the updated version.


```bash title="CLI"
# Remove the current node_modules directory to ensure clean installation
rm -rf node_modules

# Install dependencies with NPM
npm i

# Restart the Evolution API with the updated version
pm2 start ApiEvolution

# Optionally, view the PM2 logs for the Evolution API
pm2 log ApiEvolution
```