import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Delete Live Input
 *
 * NOTE: Live inputs being used in live channels can't be deleted
 *
 * @param {string} authToken    | Authorization token
 * @param {string} inputId      | The ID of the input to delete
 */
export default async function deleteLiveInput(authToken, inputId) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/liveInput/${inputId}`, {
        method: "DELETE",
        headers: HEADERS
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {

        // Return the JSON response
        return;
    }

    await apiExceptionHandler(RESPONSE, `Delete Live Input ${inputId} failed`);
}
