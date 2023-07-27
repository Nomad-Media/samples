import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";
import liveInputTypes from "./live-input-types.js";
import liveInputStatuses from "./live-input-statuses.js";
import waitForLiveInputStatus from "./wait-live-input-status.js";

/**
 * Create or Update a Live Input
 *
 * @param {string} authToken    | Authorization token
 * @param {Object} data         | Body
 */
export default async function createLiveInput(authToken, data) {
    // Check for valid parameters
    if (!authToken || !data) {
        throw new Error("Create Live Input: Invalid API call");
    }

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Build the payload body
    const BODY = {
        name: data.name,
        internalName: data.internalName,
        type: { lookupId: data.type }
    };

    // Set the appropriate fields based on the type
    switch (data.type) {
        case liveInputTypes.RTP_PUSH:
        case liveInputTypes.RTMP_PUSH:
            BODY.sourceCidr = data.source;
            break;
        case liveInputTypes.RTMP_PULL:
        case liveInputTypes.URL_PULL:
            BODY.sources = [];
            BODY.sources.push({ url: `${data.source}` });
            break;
        default:
            throw new Error(`Create Live Input: Unknown Live Input Type ${data.type}`);
    }

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/liveInput`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        const JSON_RESPONSE = await RESPONSE.json();

        // Wait for the Live Input to be detached if it was just created
        await waitForLiveInputStatus(authToken, JSON_RESPONSE.id, liveInputStatuses.Detached, 15, 1);
    }

    await apiExceptionHandler(RESPONSE, `${errorMethod} Live Input ${data.name} failed`);
}
