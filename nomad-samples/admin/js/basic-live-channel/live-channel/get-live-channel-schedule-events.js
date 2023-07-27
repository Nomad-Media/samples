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
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/liveChannel/${channelId}/liveScheduleEvent`, {
        method: "GET",
        headers: HEADERS
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        // Return JSON response
        return await RESPONSE.json();
    }

    await apiExceptionHandler(RESPONSE, "Get Live Channel Schedule Events failed");
}
