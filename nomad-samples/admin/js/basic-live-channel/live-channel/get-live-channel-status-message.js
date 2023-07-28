import getLiveChannel from "./get-live-channel.js";

/**
 * Get Live Channel Status Messages
 *
 * @param {string} authToken    | Authorization token
 * @param {string} channelId    | The channel ID for which to get the status messages
 */
export default async function getLiveChannelStatusMessage(authToken, channelId) {
    // Get the live channel
    const channel = await getLiveChannel(authToken, channelId);

    // Check if channel was found
    if (channel) {
        // Check if there are status messages
        if (channel.statusMessages && channel.statusMessages.length > 0) {
            // Return the first status message
            return channel.statusMessages[0];
        }
    }

    // There are no status messages
    return "";
}
