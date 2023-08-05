import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Get Live Inputs
 *
 * Note: Live Inputs are direct calls,
 *       they are not indexed, thus, the Search API cannot be used.
 *
 * @param {string} authToken    | Authorization token
 * @returns JSON Object containing a list of live inputs
 */
export default async function getLiveInputs(authToken) {
    // Check for valid parameters
    if (!authToken) {
        throw new Error("Get Live Inputs: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL}/liveInput`, {
        method: "GET",
        headers: headers
    });

    // Check for success
    if (response && response.ok) {
        // Return JSON response
        return await response.json();
    }

    await apiExceptionHandler(response, "Get Live Inputs failed");
}
