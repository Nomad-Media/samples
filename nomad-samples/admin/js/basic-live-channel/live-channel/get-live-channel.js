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
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/liveChannel/${channelId}`, {
        method: "GET",
        headers: HEADERS
    });

    // Check for valid response
    if (RESPONSE) {
        // Check for success
        if (RESPONSE.ok) {
            return await RESPONSE.json();
        }

        // If not found return null
        if (RESPONSE.status === 404) {
            console.error(`Live Channel with ID ${channelId} was not found`);
            return null;
        }
    }

    await apiExceptionHandler(RESPONSE, `Get Live Channel with ID ${channelId} failed`);
}
