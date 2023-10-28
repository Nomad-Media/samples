import * as prjConstants from "../constants/project-constants.js";

/**
 * Get Related Video Cookies
 *
 */
export default async function getRelatedVideoCookies(assetId, relatedAssetId, authToken) {
    // Create header for the request
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.ADMIN_API_URL}/admin/asset/${assetId}/set-cookies/${relatedAssetId}`, {
        method: "GET",
        headers: headers,
    });

    // Check for success
    if (response.ok) {
        // Get the response
        const cookies = await response.json();

        // Return the asset detail object
        return cookies;
    }

    // Log error to the console
    console.log(`Get Related Video Cookies failed: ${response.statusText}`);
}
