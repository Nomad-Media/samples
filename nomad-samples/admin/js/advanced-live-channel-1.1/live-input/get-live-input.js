import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * GET Live Input
 *
 * Note: Live Inputs are direct calls,
 *       they are not indexed, thus, the Search API cannot be used.
 *
 * @param {string} authToken    | Authorization token
 * @param {string} inputId      | The ID of the live input to get
 *
 * @returns JSON Object containing the requested live input
 */
export default async function getLiveInput(authToken, inputId) {
    // Check for valid parameters
    if (!authToken || !inputId) {
        throw new Error("Get Live Input: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL}/liveInput/${inputId}`, {
        method: "GET",
        headers: headers
    });

    // Check for valid response
    if (response) {
        // Check for success
        if (response.ok) {
            // Return the JSON response
            return await response.json();
        }

        // If not found return null
        if (response.status === 404) {
            console.error(`Live Input with ID ${inputId} was not found`);
            return null;
        }
    }

    await apiExceptionHandler(response, `Get Live Input with ID ${inputId} failed`);
}
