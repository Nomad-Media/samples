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

    // Build the payload body
    const body = {
        name: data.name,
        routeName: data.route,
        thumbnailImage: "",
        archiveFolderAsset: data.archiveFolderAsset,
        isSecureOutput: false,
        outputScreenshots: true,
        type: { lookupId: data.type }
    };

    // Default to POST to create a live channel
    let method = "POST";

    // If we have ID then set the ID and set the method to PUT to update the live channel
    if (data.id) {
        method = "PUT";
        body.id = data.id;
    }

    // Set the appropriate fields based on the channel type
    if (data.type === liveChannelTypes.External) {
        body.channelId = null;
        body.externalUrl = data.url;
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL}/liveChannel`, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    });

    // Check for success
    if (response && response.ok) {
        // Parse JSON response
        const jsonResponse = await response.json();

        // Wait for Live Channel to be idle if it was just created
        if (method === "POST") {
            await waitForLiveChannelStatus(authToken, jsonResponse.id, liveChannelStatuses.Idle, 120, 2);
        }

        return jsonResponse;
    }

    // Handle error based on method
    let errorMethod = "Create";
    if (method === "PUT") {
        errorMethod = "Update";
    }

    await apiExceptionHandler(response, `${errorMethod} Live Channel ${data.name} failed`);
}
