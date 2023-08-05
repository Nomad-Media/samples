import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * GET Live Channel
 *
 * @param {string} authToken      | Authorization token
 * @param {string} channelId      | The ID of the live channel to get
 *
 * @returns JSON Object containing the requested live channel
 */
export default async function getLiveChannel(authToken, channelId) {
    // Check for valid parameters
    if (!authToken || !channelId) {
        throw new Error("Get Live Channel: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL}/liveChannel/${channelId}`, {
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
            console.error(`Live Channel with ID ${channelId} was not found`);
            return null;
        }
    }

    await apiExceptionHandler(response, `Get Live Channel with ID ${channelId} failed`);
}
