import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";
import liveInputStatuses from "./live-input-statuses.js";
import waitForLiveInputStatus from "./wait-live-input-status.js";

/**
 * Delete Live Input
 *
 * NOTE: Live inputs being used in live channels can't be deleted
 *
 * @param {string} authToken    | Authorization token
 * @param {string} inputId      | The ID of the input to delete
 */
export default async function deleteLiveInput(authToken, inputId) {
    // Check for valid parameters
    if (!authToken || !inputId) {
        throw new Error("Delete Live Input: Invalid API call");
    }

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL}/liveInput/${inputId}`, {
        method: "DELETE",
        headers: HEADERS
    });

    // Check for success
    if (response && response.ok) {
        // Wait for the live input to be deleted
        await waitForLiveInputStatus(authToken, inputId, liveInputStatuses.Deleted, 60, 2);

        // Return the JSON response
        return await response.json();
    }

    await apiExceptionHandler(response, `Delete Live Input ${inputId} failed`);
}
