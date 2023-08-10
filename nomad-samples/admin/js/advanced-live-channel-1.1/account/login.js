import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";
import refreshToken from "./refresh-token.js";

/**
 * Login
 *
 * @param {string} username | The username
 * @param {string} password | The password
 *
 * @returns {string} Authorization token
 */
export default async function login(username, password) {
    // Check for valid parameters
    if (!username || !password) {
        throw new Error("Login: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    // Build the payload body
    const body = {
        username: username,
        password: password
    };

    // Send the request
    const response = await fetch(`${prjConstants.PUBLIC_URL}/account/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    // Check for success
    if (response && response.ok) {
        // Get the response
        const userContext = await response.json();

        // Check for valid token
        if (userContext) {
            sessionStorage.setItem("token", userContext.token);
            sessionStorage.setItem("refreshToken", userContext.refreshToken);
            sessionStorage.setItem("expirationSeconds", userContext.expirationSeconds);

            // Get interval ID
            let intervalId = sessionStorage.getItem("intervalId");

            // Clear interval
            if (intervalId) {
                clearInterval(intervalId);
            }

            // Set refresh token interval
            intervalId = setInterval(async () => {
                await refreshToken();
            }, 3000 * 1000);

            // Store the interval ID
            sessionStorage.setItem("intervalId", intervalId);

            // Return the token
            return userContext.token;
        }
    }

    await apiExceptionHandler(response, "Login failed");
}
