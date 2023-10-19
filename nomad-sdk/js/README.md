# README.md

## SDK Setup Instructions

Follow these steps to set up the SDK:

1. Clone the repository to your local machine.
2. Install the required packages by running `npm install` in the root directory of the project.
3. Add a `config.js` file in the `config` directory with the necessary configuration options.
    * The format of the config.js file is:
    ```
    const config = {
        "username": "username",
        "password": "password",
        "serviceApiUrl": "serverApiUrl",
        "apiType": "admin",
        "debugMode": true
    };
    
    export default config;
    ```
4. You are now ready to use the SDK in your project.

Note: Make sure to keep your configuration options secret and do not share them publicly.
