import * as prjConstants from "../constants/project-constants.js";
import getLiveChannelInputsIds from "./get-live-channel-inputs-ids.js";
import deleteLiveInput from "../live-input/delete-live-input.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";
import waitForLiveChannelStatus from "./wait-live-channel-status.js";
import liveChannelStatuses from "./live-channel-statuses.js";

/**
 * Delete Live Channel and optionally delete its Live Inputs
 *
 * @param {string} authToken        | Authorization token
 * @param {string} channelId        | The ID of the Live Channel to delete
 * @param {Boolean} deleteInputs    | Flag to delete Live Channel's Live Inputs or not
 */
export default async function deleteLiveChannel(authToken, channelId, deleteInputs = false) {
    // Check for valid parameters
    if (!authToken || !channelId) {
        throw new Error("Delete Live Channel: Invalid API call");
    }

    // If delete Live Inputs then get their IDs
    let inputIds = null;
    if (deleteInputs === true) {
        inputIds = await getLiveChannelInputsIds(authToken, channelId);
    }

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL}/liveChannel/${channelId}`, {
        method: "DELETE",
        headers: HEADERS
    });

    // Check for success
    if (response && response.ok) {
        // Wait for the Live Channel to be deleted
        await waitForLiveChannelStatus(authToken, channelId, liveChannelStatuses.Deleted, 30, 2);

        // If the Live Channel had Live Inputs
        if (deleteInputs && inputIds && inputIds.length > 0) {
            // Loop deleted Live Channel Live Inputs
            for (let index = 0; index < inputIds.length; index++) {
                // Delete Live Input
                await deleteLiveInput(authToken, inputIds[index]);
            }
        }

        // Return JSON response
        return await response.json();
    }

    await apiExceptionHandler(response, `Delete Live Channel ${channelId} failed`);
}
