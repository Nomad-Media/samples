import * as sysConstants from "../constants/system-constants.js";
import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Add Input Schedule Event
 *
 * @param {string} authToken    | Authorization Token
 * @param {Object} data         | Body
 *
 * @returns JSON Object
 */
export default async function addInputScheduleEvent(authToken, CHANNEL_ID, INPUT_ID, PREVIOUS_ID) {
    // Check for valid parameters
    if (!authToken || !data) {
        throw new Error("Add Input Schedule Event: Invalid API call");
    }

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Build the payload body
    const BODY = {
        channelId: CHANNEL_ID,
        type: {
            lookupId: sysConstants.LIVE_INPUT_LOOKUP_ID,
            description: "Live Input"
        },
        liveInput: {
            lookupId: INPUT_ID,
            description: "name"
        },
        previousId: PREVIOUS_ID
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

    await apiExceptionHandler(RESPONSE, "Add Input Schedule Event failed");
}
