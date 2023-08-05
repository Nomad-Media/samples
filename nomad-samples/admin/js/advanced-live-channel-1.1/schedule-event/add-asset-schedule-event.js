import * as sysConstants from "../constants/system-constants.js";
import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Add Asset Schedule Event
 *
 * @param {string} authToken    | Authorization Token
 * @param {Object} data         | Body
 *
 * @returns JSON Object
 */
export default async function addAssetScheduleEvent(authToken, data) {
    // Check for valid parameters
    if (!authToken || !data) {
        throw new Error("Add Asset Schedule Event: Invalid API call");
    }

    // Build the payload body
    const body = {
        id: data.id,
        isLoop: false,
        channelId: data.channelId,
        type: {
            lookupId: sysConstants.VIDEO_ASSET_LOOKUP_ID
        },
        asset: {
            lookupId: data.assetId
        },
        previousId: data.previousId
    };

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL}/LiveChannel/${data.channelId}/liveScheduleEvent`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    // Check for success
    if (response && response.ok) {
        // Return JSON response
        return await response.json();
    }

    await apiExceptionHandler(response, "Add Asset Schedule Event failed");
}
