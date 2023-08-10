import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";
import liveChannelStatuses from "./live-channel-statuses.js";
import waitForLiveChannelStatus from "./wait-live-channel-status.js";

/**
 * Start a live channel
 *
 * @param {string} authToken    | Authorization token
 * @param {string} channelId    | The ID of the channel to start
 */
export default async function startLiveChannel(authToken, channelId) {
    // Check for valid parameters
    if (!authToken || !channelId) {
        throw new Error("Start Live Channel: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL}/liveChannel/${channelId}/start`, {
        method: "POST",
        headers: headers
    });

    // Check for success
    if (response && response.ok) {
        // Wait for the Live Channel to be running
        await waitForLiveChannelStatus(authToken, channelId, liveChannelStatuses.Running, 120, 2);
        return;
    }

    await apiExceptionHandler(response, `Start Live Channel ${channelId} failed`);
}
