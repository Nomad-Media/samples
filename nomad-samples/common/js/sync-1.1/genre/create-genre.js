import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Create Genre
 *
 * @param {string} name         | The genre name
 * @param {string} slug         | The genre slug
 * @param {string} authToken    | The authorization token
 *
 * @returns {string} New genre ID
 */
export default async function createGenre(name, slug, authToken) {
    // Check for valid parameters
    if (!name || !slug || !authToken) {
        throw new Error("Create Genre: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Build the payload body
    const body = {
        contentDefinitionId: prjConstants.MOVIE_GENRE_CONTENT_DEFINITION_ID,
        properties: {
            name: name,
            slug: slug
        }
    };

    // Send POST request
    const response = await fetch(`${prjConstants.SERVER_URL}/Content/${prjConstants.MOVIE_GENRE_CONTENT_DEFINITION_ID}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    // Check for success
    if (response && response.ok) {
        // Get the response
        const id = await response.text();

        // Return the ID
        return id.replaceAll('"', "");
    }

    await apiExceptionHandler(response, `Create Genre ${name} failed`);
}
