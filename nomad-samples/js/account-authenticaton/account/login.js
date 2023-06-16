import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";
import refreshToken from "./refresh-token.js";

/**
 * Login
 *
 * @param {string} username | The username
 * @param {string} password | The password
 *
 * @returns {string} Authentication token
 */
export default async function login(USERNAME, PASSWORD) {

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");

    // Build the payload body
    const BODY = {
        username: USERNAME,
        password: PASSWORD
    };

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/account/login`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        // Get the response
        const LOGIN_INFO = await RESPONSE.json();

        // Check for valid token
        if (LOGIN_INFO) {
            sessionStorage.setItem("token", LOGIN_INFO.token);
            sessionStorage.setItem("refreshToken", LOGIN_INFO.refreshToken);
            sessionStorage.setItem("expirationSeconds", LOGIN_INFO.expirationSeconds);
            sessionStorage.setItem("userSessionId", LOGIN_INFO.userSessionId);

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
            return LOGIN_INFO.token;
        }
    }

    await apiExceptionHandler(RESPONSE, "Login failed");
}
