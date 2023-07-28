import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";
import liveChannelStatuses from "./live-channel-statuses.js";
import waitForLiveChannelStatus from "./wait-live-channel-status.js";

/**
 * Stop a live channel
 *
 * @param {string} authToken    | Authorization token
 * @param {string} channelId    | The ID of the channel to stop
 */
export default async function stopLiveChannel(authToken, channelId) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/liveChannel/${channelId}/stop`, {
        method: "POST",
        headers: HEADERS
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        // Wait for the live channel to be idle
        await waitForLiveChannelStatus(authToken, channelId, liveChannelStatuses.Idle, 120, 2);
        return;
    }

    await apiExceptionHandler(RESPONSE, `Stop Live Channel ${channelId} failed`);
}
