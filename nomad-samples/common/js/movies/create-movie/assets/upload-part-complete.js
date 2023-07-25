import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Upload Part Complete
 *
 * @param {string} authToken    | The authorization token
 * @param {string} partId       | The file part ID
 * @param {string} etag         | The ETag
 *
 */
export default async function uploadPartComplete(authToken, partId, etag) {
    // Check for valid parameters
    if (!authToken || !partId || !etag) {
        throw new Error("Upload Part Complete: Invalid API call");
    }

    // Build the payload body
    const body = { etag: etag };

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.ADMIN_API_URL}/asset/upload/part/${partId}/complete`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    // Check for success
    if (response && response.ok) {
        return true;
    }

    await apiExceptionHandler(response, "Upload Part Complete failed");
}
