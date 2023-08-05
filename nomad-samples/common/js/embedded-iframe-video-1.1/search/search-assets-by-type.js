import * as sysConstants from "../constants/system-constants.js";
import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Search Assets By Type
 *
 * @param {string} authToken            | Authorization token
 * @param {string} assetType            | The asset type
 * @param {string} mediaType            | The media type
 * @param {number} pageOffset           | Page offset
 * @param {number} pageSize             | Page size
 * @param {string} folderId             | Folder ID
 * @param {Boolean} includeSubfolders   | Include subfolders
 *
 * @returns JSON Object containing a list of file assets
 */
export default async function searchAssetsByType(
    authToken,
    assetType = sysConstants.ASSET_TYPE_FILE_ENUM,
    mediaType = sysConstants.MEDIA_TYPE_VIDEO_ENUM,
    pageOffset = 0,
    pageSize = 50,
    folderId = null,
    includeSubfolders = false
) {
    // Check for valid parameters
    if (!authToken) {
        throw new Error("Search Assets By Type: Authorization token is invalid.");
    }

    // Build the payload body
    const body = {
        filters: [
            {
                fieldName: "contentDefinitionId",
                operator: "Equals",
                values: sysConstants.ASSET_CONTENT_DEFINITION_ID
            },
            {
                fieldName: "assetType",
                operator: "Equals",
                values: assetType
            },
            {
                fieldName: "mediaType",
                operator: "Equals",
                values: mediaType
            },
            {
                fieldName: "languageId",
                operator: "Equals",
                values: sysConstants.US_ENGLISH_LANGUAGE_LOOKUP_ID
            }
        ],
        pageOffset: pageOffset,
        pageSize: pageSize
    };

    // Add filter for specific folder if applicable
    if (folderId) {
        // Use parentId to limit search to the folderId only
        let fieldName = "parentId";

        // Use uuidSearchField to include subfolders too
        if (includeSubfolders) {
            fieldName = "uuidSearchField";
        }

        // Build the filter object
        const filter = {
            fieldName: fieldName,
            operator: "Equals",
            values: folderId
        };

        // Add it to the payload body
        body.filters.push(filter);
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.PUBLIC_URL}/portal/search`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    // Check for success
    if (response && response.ok) {
        // Return JSON response
        return await response.json();
    }

    await apiExceptionHandler(response, "Search Assets By Type failed");
}
