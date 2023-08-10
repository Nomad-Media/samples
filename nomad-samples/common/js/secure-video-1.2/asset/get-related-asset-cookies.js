import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Get related asset cookies
 *
 * @param {*} assetId           | The main asset ID
 * @param {*} relatedAssetId    | The related asset ID
 * @param {*} authToken         | The authorization token
 *
 * @returns {Array} with cookies
 */
export default async function getRelatedAssetCookies(assetId, relatedAssetId, authToken) {
    // Check for valid parameters
    if (!assetId || !relatedAssetId || !authToken) {
        throw new Error("Get Related Asset Cookies: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.PUBLIC_URL}/asset/${assetId}/set-cookies/${relatedAssetId}`, {
        method: "GET",
        headers: headers
    });

    // Check for success
    if (response && response.ok) {
        // Get the response
        const cookies = await response.json();

        // Return the cookies
        return cookies;
    }

    await apiExceptionHandler(response, `Get Related Asset Cookies failed for Asset ID: ${assetId} and Related Asset ID: ${relatedAssetId}`);
}
