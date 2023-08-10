import * as prjConstants from "../constants/project-constants.js";

/**
 * Get Asset Details
 *
 */
export default async function getAssetDetails(assetId, authToken) {
    // Create header for the request
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL}/admin/asset/${assetId}/detail`, {
        method: "GET",
        headers: headers,
    });

    // Check for success
    if (response.ok) {
        // Get the response
        const details = await response.json();

        // Return the asset detail object
        return details;
    }

    // Log error to the console
    console.log(`Get Asset Details failed: ${response.statusText}`);
}
