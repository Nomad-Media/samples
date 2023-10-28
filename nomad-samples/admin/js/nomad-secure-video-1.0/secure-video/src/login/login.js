import * as prjConstants from "../constants/project-constants.js";

/**
 * Login
 *
 * @param {string} username - The username
 * @param {string} password - The password
 *
 * @returns {string} Authentication token
 */
export default async function login(username, password) {
    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    // Build the payload body
    let body = {
        username: username,
        password: password,
    };

    // Send the request
    const response = await fetch(`${prjConstants.ADMIN_API_URL}/account/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
    });

    // Check for success
    if (response.ok) {
        // Get the response
        const userContext = await response.json();

        // Return the token
        if (userContext) {
            return userContext.token;
        }
    }
}
