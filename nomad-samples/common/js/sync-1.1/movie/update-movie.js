import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Update existing movie
 *
 * @param {string} title        | The movie title
 * @param {string} slug         | The movie slug
 * @param {string} plot         | The movie plot
 * @param {string} releaseDate  | The movie release date in UTC format string
 * @param {string} genreId      | The movie genre lookup ID
 * @param {string} authToken    | The authorization token
 *
 */
export default async function updateMovie(movieId, title, slug, plot, releaseDate, genreId, authToken) {
    // Check for valid parameters
    if (!authToken || !movieId || !title || !slug) {
        throw new Error("Create Movie: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    // Build the payload body
    const body = {
        contentId: movieId,
        contentDefinitionId: prjConstants.MOVIE_CONTENT_DEFINITION_ID,
        properties: {
            title: title,
            slug: slug,
            plot: plot,
            releaseDate: releaseDate,
        }
    };

    // Send PUT request
    const response = await fetch(`${prjConstants.ADMIN_API_URL}/Content/${movieId}`, {
        method: "PUT",
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

    await apiExceptionHandler(response, `Update Movie [${movieId}] failed`);
}
