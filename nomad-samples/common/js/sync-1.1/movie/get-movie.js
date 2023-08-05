import * as prjConstants from "../constants/project-constants.js";
import * as sysConstants from "../constants/system-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Get movie by ID
 *
 * @param {string} movieId      | The ID of the movie to retrieve
 * @param {string} authToken    | The authorization token
 *
 * @returns {object} Movie record
 */
export default async function getMovie(movieId, authToken) {
    // Check for valid parameters
    if (!authToken || !movieId) {
        throw new Error("Get Movie: Invalid API call");
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
                fieldName: "masterId",
                operator: "Equals",
                values: movieId
            },
            {
                fieldName: "languageId",
                operator: "Equals",
                values: sysConstants.US_ENGLISH_LANGUAGE_LOOKUP_ID
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
    const response = await fetch(`${prjConstants.SERVER_URL2}/admin/search`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    // Check for success
    if (response && response.ok) {
        // Get the response
        const movie = await response.json();

        // Return the movie
        return movie;
    }

    await apiExceptionHandler(response, `Get Movie [${movieId}] failed`);
}
