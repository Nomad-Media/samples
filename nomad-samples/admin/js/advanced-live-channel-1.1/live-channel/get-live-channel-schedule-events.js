import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * GET list of live schedule events
 *
 * Note: Schedule Events are direct calls,
 *       they are not indexed, thus, the Search API cannot be used
 *
 * @param {string} authToken    | Authorization token
 * @param {string} channelId    | The ID of the channel
 *
 * @returns {Object} containing list of live schedule events
 */
export default async function getLiveChannelScheduleEvents(authToken, channelId) {
    // Check for valid parameters
    if (!authToken || !channelId) {
        throw new Error("Get Live Schedule Events: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL}/liveChannel/${channelId}/liveScheduleEvent`, {
        method: "GET",
        headers: headers
    });

    // Check for success
    if (response && response.ok) {
        // Return JSON response
        return await response.json();
    }

    await apiExceptionHandler(response, "Get Live Channel Schedule Events failed");
}
