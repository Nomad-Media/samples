import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Refresh Token
 *
 * @param {string} refreshToken | The refresh token
 *
 * @returns {string} Authentication token
 */
export default async function REFRESH_TOKEN() {
    // Get the refresh token
    const REFRESH_TOKEN = sessionStorage.getItem("refreshToken");

    // Check for valid parameters
    if (!REFRESH_TOKEN) {
        throw new Error("Refresh Token: The refresh token is invalid");
    }

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");

    // Build the payload body
    const BODY = {
        refreshToken: REFRESH_TOKEN
    };

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/account/refresh-token`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        // Get the response
        const REFRESH_TOKEN_RESPONSE = await RESPONSE.json();

        // Check for valid token
        if (REFRESH_TOKEN_RESPONSE) {
            // Update the token
            sessionStorage.setItem("token", REFRESH_TOKEN_RESPONSE.token);
        }
    }

    await apiExceptionHandler(RESPONSE, "Refresh Token failed");
}
