import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Create movie
 *
 * @param {string} title        | The movie title
 * @param {string} slug         | The movie slug
 * @param {string} plot         | The movie plot
 * @param {string} releaseDate  | The movie release date in UTC format string
 * @param {string} genreId      | The movie genre lookup ID
 * @param {string} authToken    | The authorization token
 *
 * @returns New movie ID string
 */
export default async function createMovie(id, title, slug, plot, releaseDate, genreId, authToken) {
    // Check for valid parameters
    if (!authToken || !title || !slug) {
        throw new Error("Create Movie: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Build the payload body
    const body = {
        contentDefinitionId: prjConstants.MOVIE_CONTENT_DEFINITION_ID,
        contentId: id,
        properties: {
            title: title,
            slug: slug,
            plot: plot,
            releaseDate: releaseDate,
            genre: {
                lookupId: genreId
            }
        }
    };

    // Send POST request
    const response = await fetch(`${prjConstants.SERVER_URL}/Content/${prjConstants.MOVIE_CONTENT_DEFINITION_ID}`, {
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

    await apiExceptionHandler(response, `Create Movie [${title}] failed`);
}
