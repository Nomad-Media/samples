import getLiveInput from "./get-live-input.js";

/**
 * Get Live Input Status
 *
 * @param {string} authToken    | Authorization token
 * @param {string} inputId      | The input ID for which to get the status
 */
export default async function getLiveInputStatus(authToken, inputId) {
    // Get the live input
    const input = await getLiveInput(authToken, inputId);

    // Check if input was found
    if (input) {
        // Return the status of the input
        return input.status.description;
    }

    // Input was not found
    return "Deleted";
}
