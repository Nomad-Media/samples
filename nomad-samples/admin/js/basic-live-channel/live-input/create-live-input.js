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

    // Default to POST to create a Live Input
    let method = "POST";

    // If we have ID then set the ID and set the method to PUT to update the Live Input
    if (data.id) {
        method = "PUT";
        BODY.id = data.id;
    }

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL}/liveInput`, {
        method: method,
        headers: HEADERS,
        body: JSON.stringify(BODY)
    });

    // Check for success
    if (response && response.ok) {
        // Parse JSON response
        const jsonResponse = await response.json();

        // Wait for the Live Input to be detached if it was just created
        if (method === "POST") {
            await waitForLiveInputStatus(authToken, jsonResponse.id, liveInputStatuses.Detached, 15, 1);
        }

        return jsonResponse;
    }

    // Handle error based on method
    let errorMethod = "Create";
    if (method === "PUT") {
        errorMethod = "Update";
    }

    await apiExceptionHandler(response, `${errorMethod} Live Input ${data.name} failed`);
}
