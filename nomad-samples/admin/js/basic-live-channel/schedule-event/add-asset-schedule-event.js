import * as sysConstants from "../constants/system-constants.js";
import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";


export default async function addAssetScheduleEvent(authToken, ID, CHANNEL_ID, ASSET_ID, IS_LOOP) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Build the payload body
    const BODY = {
        id: ID,
        isLoop: IS_LOOP,
        channelId: CHANNEL_ID,
        type: {
            id: sysConstants.VIDEO_ASSET_LOOKUP_ID,
            description: "Video Asset"
        },
        asset: {
            id: ASSET_ID,
            description: "Video"
        }
    };

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/LiveChannel/${CHANNEL_ID}/liveScheduleEvent`, {
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
