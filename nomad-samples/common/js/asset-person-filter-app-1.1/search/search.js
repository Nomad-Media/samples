import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Search
 *
 * @param {string} authToken    | Authorization token
 * @param {string} body         | The request payload
 * @param {string} url          | API Server URL
 * @param {string} endpoint     | Search endpoint
 *
 * @returns JSON Object containing a list of search items
 */
export default async function search(authToken, body, url, endpoint) {
    // Check for valid parameters
    if (!authToken || !body) {
        throw new Error("Search: Invalid API call");
    }

    if (!url) {
        url = prjConstants.PUBLIC_URL;
    }

    if (!endpoint) {
        endpoint = "portal/search";
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${url}/${endpoint}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    // Check for success
    if (response && response.ok) {
        // Return JSON response
        return await response.json();
    }

    await apiExceptionHandler(response, "Search failed");
}
