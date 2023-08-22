import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Get all movie genres
 *
 * @param {string} authToken    | The authorization token
 *
 * @returns {Array} List of search results
 */
export default async function getGenres(authToken) {
    // Check for valid parameters
    if (!authToken) {
        throw new Error("Get Genres: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Build the payload body
    const body = {
        filters: [
            {
                fieldName: "contentDefinitionId",
                operator: "Equals",
                values: prjConstants.MOVIE_GENRE_CONTENT_DEFINITION_ID
            },
            {
                fieldName: "languageId",
                operator: "Equals",
                values: prjConstants.US_ENGLISH_LANGUAGE_LOOKUP_ID
            }
        ]
    };

    // Send POST request
    const response = await fetch(`${prjConstants.ADMIN_API_URL}/admin/search`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    // Check for success
    if (response && response.ok) {
        // Get the response
        const genres = await response.json();

        // Return the genres
        return genres;
    }

    await apiExceptionHandler(response, "Get Genres failed");
}
