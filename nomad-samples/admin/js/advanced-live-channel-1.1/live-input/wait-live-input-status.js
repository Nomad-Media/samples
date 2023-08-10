import getLiveInputStatus from "./get-live-input-status.js";
import getLiveInputStatusMessage from "./get-live-input-status-message.js";
import sleep from "../helpers/sleep.js";

/**
 * Wait for a Live Input to transition to specified status
 *
 * @param {string} authToken                    | Authorization authToken
 * @param {string} inputId                      | The Live Input ID for which to get the status
 * @param {liveInputStatuses} statusToWaitFor   | The live Live Input status to wait for
 * @param {number} timeout                      | Timeout in seconds
 * @param {number} pollInterval                 | Poll interval in seconds
 */
export default async function waitForLiveInputStatus(authToken, inputId, statusToWaitFor, timeout = 30, pollInterval = 2) {
    // Check for valid parameters
    if (!authToken || !inputId || !statusToWaitFor) {
        throw new Error("Wait for Live Input Status: Invalid API call");
    }

    // Set the starting time
    const startingTime = new Date().getTime();

    // Elapsed time in seconds
    let elapsedTime = 0;

    while (elapsedTime < timeout) {
        // Get the Live Input status
        const inputStatus = await getLiveInputStatus(authToken, inputId);

        // If Live Input is in statusToWaitFor return
        if (inputStatus === statusToWaitFor) {
            // Give feedback to the console
            console.log(`Live Input ${inputId} transitioned to status ${statusToWaitFor}`);
            return;
        }

        // Give feedback to the console
        console.log(`Live Input [${inputId}] is in status [${inputStatus}]`);

        // Check for Error status
        if (inputStatus === "Error") {
            // Get the error message
            const inputStatusMessage = await getLiveInputStatusMessage(authToken, inputId);

            // Can't continue if Live Input is in error status
            throw new Error(`Live Input ${inputId} is in Error status: ${inputStatusMessage}`);
        }

        // Calculate elapsed time in seconds
        elapsedTime = (new Date().getTime() - startingTime) / 1000;

        // Give feedback to the console
        console.log(`Waiting for Live Input [${inputId}] to transition to status [${statusToWaitFor}]... [${Math.round(elapsedTime)}/${timeout}]`);

        // Check for timeout
        if (elapsedTime > timeout) {
            break;
        }

        // Wait poll interval
        await sleep(pollInterval);
    }

    throw new Error(`Waiting for Live Input [${inputId}] to transition to status [${statusToWaitFor}] timed out`);
}

/**

 */
