import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Upload Part
 *
 * @param {File}   file         | The file object
 * @param {string} url          | The S3 URL
 * @param {Object} part         | The file part object
 *
 * @returns {String} ETag
 */
export default async function uploadPart(file, url, part) {
    // Check for valid parameters
    if (!file || !url || !part) {
        throw new Error("Upload Part: Invalid API call");
    }

    // Build the payload body
    const body = file.slice(part.startingPosition, part.endingPosition + 1);

    // Create header for the request
    const headers = new Headers();
    headers.append("Accept", "application/json, text/plain, */*");

    // Send the request
    const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: body
    });

    // Check for success
    if (response && response.ok) {
        // Return the ETag from response header
        return response.headers.get("ETag");
    }

    await apiExceptionHandler(response, "Upload Part failed");
}
