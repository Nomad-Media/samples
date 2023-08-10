import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Refresh Token
 *
 * @param {string} refreshToken | The refresh token
 *
 * @returns {string} Authorization token
 */
export default async function refreshToken() {
    // Get the refresh token
    const refreshToken = sessionStorage.getItem("refreshToken");

    // Check for valid parameters
    if (!refreshToken) {
        throw new Error("Refresh Token: The refresh token is invalid");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    // Build the payload body
    const body = {
        refreshToken: refreshToken
    };

    // Send the request
    const response = await fetch(`${prjConstants.PUBLIC_URL}/account/refresh-token`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    // Check for success
    if (response && response.ok) {
        // Get the response
        const refreshTokenResponse = await response.json();

        // Check for valid token
        if (refreshTokenResponse) {
            // Update the token
            sessionStorage.setItem("token", refreshTokenResponse.token);

            // Give feedback to the console
            console.info("Token refreshed: ", refreshTokenResponse);

            // Return the token
            return refreshTokenResponse.token;
        }
    }

    await apiExceptionHandler(response, "Refresh Token failed");
}
