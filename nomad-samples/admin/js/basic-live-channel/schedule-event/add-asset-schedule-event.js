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

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Build the payload body
    const BODY = {
        id: data.id,
        isLoop: false,
        channelId: data.channelId,
        type: {
            lookupId: sysConstants.VIDEO_ASSET_LOOKUP_ID,
            description: "Video Asset"
        },
        asset: {
            lookupId: data.assetId,
            description: "Video"
        },
        previousId: data.previousId
    };

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/LiveChannel/${data.channelId}/liveScheduleEvent`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        // Return JSON response
        return await RESPONSE.json();
    }

    await apiExceptionHandler(RESPONSE, "Add Asset Schedule Event failed");
}
