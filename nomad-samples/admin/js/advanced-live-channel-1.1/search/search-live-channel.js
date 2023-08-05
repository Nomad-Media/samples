import * as sysConstants from "../constants/system-constants.js";
import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Search Live Channel
 *
 * @param {string} authToken    | Authorization token
 * @param {string} channelId    | The ID of the channel to find
 *
 * @returns JSON Object containing the requested live channel
 */
export default async function searchLiveChannel(authToken, channelId) {
    // Check for valid parameters
    if (!authToken || !channelId) {
        throw new Error("Search Live Channel: Invalid API call");
    }

    // Build the payload body
    const body = {
        filters: [
            {
                fieldName: "contentDefinitionId",
                operator: "Equals",
                values: sysConstants.LIVE_CHANNEL_CONTENT_DEFINITION_ID
            },
            {
                fieldName: "masterId",
                operator: "Equals",
                values: channelId
            },
            {
                fieldName: "languageId",
                operator: "Equals",
                values: sysConstants.US_ENGLISH_LANGUAGE_LOOKUP_ID
            }
        ],
        pageOffset: 0,
        pageSize: 25
    };

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL2}/admin/search`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    // Check for success
    if (response && response.ok) {
        // Return JSON response
        return await response.json();
    }

    await apiExceptionHandler(response, `Search Live Channel with ID ${channelId} failed`);
}
