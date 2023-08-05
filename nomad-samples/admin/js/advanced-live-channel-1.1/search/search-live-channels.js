import * as sysConstants from "../constants/system-constants.js";
import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Search Live Channels
 *
 * @param {string} authToken    | Authorization token
 *
 * @returns JSON object containing list of live channels
 */
export default async function searchLiveChannels(authToken) {
    // Check for valid parameters
    if (!authToken) {
        throw new Error("Search Live Channels: Invalid API call");
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
                fieldName: "languageId",
                operator: "Equals",
                values: sysConstants.US_ENGLISH_LANGUAGE_LOOKUP_ID
            }
        ],
        sortFields: [
            {
                fieldName: "type.description",
                sortType: "Ascending"
            },
            {
                fieldName: "title",
                sortType: "Ascending"
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

    await apiExceptionHandler(response, "Search Live Channels failed");
}
