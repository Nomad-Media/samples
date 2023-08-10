import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Get Asset Details
 *
 * @param {string} assetId   | The asset ID
 * @param {string} authToken | The authorization token
 *
 * @returns {Object} Asset details object
 */
export default async function getAssetDetails(assetId, authToken) {
    // Check for valid parameters
    if (!assetId || !authToken) {
        throw new Error("Get Asset Details: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.PUBLIC_URL}/asset/${assetId}/detail`, {
        method: "GET",
        headers: headers
    });

    // Check for success
    if (response && response.ok) {
        // Get the response
        const details = await response.json();

        // Return the asset detail object
        return details;
    }

    await apiExceptionHandler(response, "Get Asset Details failed");
}
