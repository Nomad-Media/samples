import getLiveChannelStatus from "./get-live-channel-status.js";
import getLiveChannelStatusMessage from "./get-live-channel-status-message.js";
import sleep from "../helpers/sleep.js";


export default async function waitForLiveChannelStatus(authToken, channelId, statusToWaitFor, timeout = 30, pollInterval = 2) {
    // Set the starting time
    const startingTime = new Date().getTime();

    // Elapsed time in seconds
    let elapsedTime = 0;

    while (elapsedTime < timeout) {
        // Get the Live Channel status
        const channelStatus = await getLiveChannelStatus(authToken, channelId);

        // If channel is in statusToWaitFor return
        if (channelStatus === statusToWaitFor) {
            // Give feedback to the console
            console.log(`Live Channel [${channelId}] transitioned to status [${statusToWaitFor}]`);
            return;
        }

        // Give feedback to the console
        console.log(`Live Channel [${channelId}] current status is [${channelStatus}]`);

        // Check for Error status
        if (channelStatus === "Error") {
            // Get the error message
            const channelStatusMessage = await getLiveChannelStatusMessage(authToken, channelId);

            // Can't continue if Live Channel is in error status
            throw new Error(`Live Channel [${channelId}] is in [Error] status: ${channelStatusMessage}`);
        }

        // Calculate elapsed time in seconds
        elapsedTime = (new Date().getTime() - startingTime) / 1000;

        // Give feedback to the console
        console.log(`Waiting for Live Channel [${channelId}] to transition to status [${statusToWaitFor}]... [${Math.round(elapsedTime)}/${timeout}]`);

        // Check for timeout
        if (elapsedTime > timeout) {
            break;
        }

        // Wait poll interval
        await sleep(pollInterval);
    }

    throw new Error(`Waiting for Live Channel [${channelId}] to transition to status [${statusToWaitFor}] timed out`);
}
