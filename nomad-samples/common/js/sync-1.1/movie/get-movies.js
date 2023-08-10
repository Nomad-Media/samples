import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Get all movies
 *
 * @param {string} authToken    | The authorization token
 *
 * @returns {Array} List of search results
 */
export default async function getMovies(authToken) {
    // Check for valid parameters
    if (!authToken) {
        throw new Error("Get Movies: Invalid API call");
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
                values: prjConstants.MOVIE_CONTENT_DEFINITION_ID
            },
            {
                fieldName: "languageId",
                operator: "Equals",
                values: prjConstants.US_ENGLISH_LANGUAGE_LOOKUP_ID
            }
        ],
        SearchResultFields: [
            {
                name: "contentDefinitionId"
            },
            {
                name: "contentDefinitionTitle"
            },
            {
                name: "plot"
            },
            {
                name: "releaseDate"
            },
            {
                name: "genre"
            },
            {
                name: "image",
                SearchResultFields: [
                    {
                        name: "fullUrl"
                    }
                ]
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
        const movies = await response.json();

        // Return the movies
        return movies;
    }

    await apiExceptionHandler(response, "Get Movies failed");
}
