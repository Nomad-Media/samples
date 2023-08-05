import getLiveInput from "./get-live-input.js";

/**
 * Get Live Input Status Message
 *
 * @param {string} authToken    | Authorization token
 * @param {string} inputId      | The input ID for which to get the status message
 */
export default async function getLiveInputStatusMessage(authToken, inputId) {
    // Check for valid parameters
    if (!authToken || !inputId) {
        throw new Error("Get Live Input Status: Invalid API call");
    }

    // Get the live input
    const input = await getLiveInput(authToken, inputId);

    // Check if input was found
    if (input) {
        // Check if there is status message
        if (input.statusMessage && input.statusMessage) {
            // Return input status message
            return input.statusMessage;
        }
    }

    // There is no status message
    return "";
}
