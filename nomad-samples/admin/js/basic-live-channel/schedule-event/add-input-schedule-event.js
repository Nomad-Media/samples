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
export default async function addInputScheduleEvent(authToken, data) {
    // Check for valid parameters
    if (!authToken || !data) {
        throw new Error("Add Input Schedule Event: Invalid API call");
    }

    // Build the payload body
    const BODY = {
        channelId: data.channelId,
        type: {
            lookupId: sysConstants.LIVE_INPUT_LOOKUP_ID,
            description: "Live Input"
        },
        liveInput: {
            lookupId: data.inputId,
            description: data.name
        },
        previousId: data.previousId
    };

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL}/LiveChannel/${data.channelId}/liveScheduleEvent`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    });

    // Check for success
    if (response && response.ok) {
        // Return JSON response
        return await response.json();
    }

    await apiExceptionHandler(response, "Add Input Schedule Event failed");
}
