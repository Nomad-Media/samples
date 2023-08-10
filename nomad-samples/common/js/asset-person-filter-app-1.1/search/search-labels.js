import * as sysConstants from "../constants/system-constants.js";
import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Search Label
 *
 * @param {string} authToken    | Authorization token
 * @param {string} labelTitle   | The title of the label or null to retrieve all
 *
 * @returns Array of search result items
 */
export default async function searchLabels(authToken, labelTitle) {
    // Check for valid parameters
    if (!authToken) {
        throw new Error("Search Label: Authorization token is invalid.");
    }

    // Build the payload body
    const body = {
        filters: [
            {
                fieldName: "contentDefinitionId",
                operator: "Equals",
                values: sysConstants.LABELS_CONTENT_DEFINITION_ID
            },
            {
                fieldName: "languageId",
                operator: "Equals",
                values: sysConstants.US_ENGLISH_LANGUAGE_LOOKUP_ID
            }
        ]
    };

    // Add filter for specific label title if applicable
    if (labelTitle) {
        // Build the filter object
        const filter = {
            fieldName: "title",
            operator: "Equals",
            values: labelTitle
        };

        // Add it to the payload body
        body.filters.push(filter);
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const response = await fetch(`${prjConstants.SERVER_URL2}/admin/search`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    // Check for success
    if (response && response.ok) {
        // Return JSON response
        return await response.json();
    }

    await apiExceptionHandler(response, "Search Label failed");
}
