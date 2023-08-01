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
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/liveChannel/${channelId}/start`, {
        method: "POST",
        headers: HEADERS
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        // Wait for the Live Channel to be running
        await waitForLiveChannelStatus(authToken, channelId, liveChannelStatuses.Running, 120, 2);
        return;
    }

    await apiExceptionHandler(RESPONSE, `Start Live Channel ${channelId} failed`);
}
