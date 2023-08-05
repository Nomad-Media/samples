import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Embed Public Video
 *
 * @param {string} assetId   | The asset ID
 *
 * @returns {JSON} Video
 */
export default async function embedPublicVideo(assetId) {
    // Check for valid parameters
    if (!assetId) {
        throw new Error("Embed Public Video: Invalid API call");
    }

    // Send the request
    const response = await fetch(`${prjConstants.PUBLIC_URL}/embedded/video/${assetId}`, {
        method: "GET"
    });

    // Check for valid response
    if (response) {
        // Check for success
        if (response.ok) {
            // Get the response
            const video = await response.json();

            // Return the video
            return video;
        }

        // If not found return null
        if (response.status === 404) {
            console.error(`Video Asset with ID ${assetId} was not found`);
            return null;
        }
    }

    await apiExceptionHandler(response, "Embed Public Video failed");
}
