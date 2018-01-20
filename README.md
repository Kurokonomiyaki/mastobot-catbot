### What is it?

A simple cat bot that publish cat toots regularly.

### How to deploy on your server

0. Install node: https://nodejs.org/en/download/package-manager

1. Clone the repository and install production dependencies using npm

    ```bash
    git clone https://github.com/Kurokonomiyaki/mastobot-catbot.git
    cd mastobot-catbot
    npm install --production
    ```

2. Get a token for your bot

    Run the script and then follow the instructions:
    ```bash
    npm run token
    ```

3. Configure the bot

    Copy the `edit-these-settings.json` file into `settings.json`.

    ```bash
    cp edit-these-settings.json settings.json
    ```

    Edit `settings.json` and set the instance url and access token.

4. Run the bot

    You can run the bot directly using `node`.

    ```bash
    node compiled/index.js
    ```

    You should create a service for the bot. You can use `mastobot-catbot.service` as a template for a systemd service.
    Read [this documentation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/sect-managing_services_with_systemd-unit_files) about systemd service files.