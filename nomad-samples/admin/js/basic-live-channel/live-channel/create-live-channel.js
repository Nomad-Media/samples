import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";
import liveChannelStatuses from "./live-channel-statuses.js";
import waitForLiveChannelStatus from "./wait-live-channel-status.js";
import liveChannelTypes from "./live-channel-types.js";

/**
 *  Create or Update a Live Channel
 *
 * @param {string} authToken    | Authorization token
 * @param {object} data         | Body
 */
export default async function createLiveChannel(authToken, data) {
    // Check for valid parameters
    if (!authToken || !data) {
        throw new Error("Create Live Channel: Invalid API call");
    }

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Build the payload body
    const BODY = {
        name: data.name,
        routeName: data.route,
        thumbnailImage: "",
        archiveFolderAsset: data.archiveFolderAsset,
        isSecureOutput: false,
        outputScreenshots: true,
        type: { lookupId: data.type }
    };

    // Set the appropriate fields based on the channel type
    if (data.type === liveChannelTypes.External) {
        BODY.externalUrl = data.url;
    }

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/liveChannel`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        // Parse JSON response
        const jsonResponse = await RESPONSE.json();

        // Wait for Live Channel to be idle if it was just created
        await waitForLiveChannelStatus(authToken, jsonResponse.id, liveChannelStatuses.Idle, 120, 2);

        return jsonResponse;
    }

    await apiExceptionHandler(RESPONSE, `Creating Live Channel ${data.name} failed`);
}
