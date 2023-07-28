import getLiveChannel from "./get-live-channel.js";

/**
 * Get Live Channel Status
 *
 * @param {string} authToken    | Authorization token
 * @param {string} channelId    | The live channel ID for which to get the status
 */
export default async function getLiveChannelStatus(authToken, channelId) {
    // Get the live channel
    const channel = await getLiveChannel(authToken, channelId);

    // Check if live channel was found
    if (channel) {
        // Return the status of the live channel
        return channel.status.description;
    }

    // Live channel was not found
    return "Deleted";
}
