import * as prjConstants from "../constants/project-constants.js";

/**
 * Create Genre
 *
 * @param {string} name        - The movie title
 * @param {string} slug         - The movie slug
 * @param {string} authToken    - The authentication token
 *
 * @returns {string} New movie ID string
 */
export default async function createGenre(NAME, SLUG, AUTH_TOKEN) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const NEW_RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/content/new?contentDefinitionId=${prjConstants.MOVIE_GENRE_CONTENT_DEFINITION_ID}`, {
        method: "GET",
        headers: HEADERS
    }).catch((exception) => {
        throw exception;
    });
    const ID = NEW_RESPONSE.contentId;

    // Build the payload body
    const BODY = {
        contentId: ID,
        contentDefinitionId: prjConstants.MOVIE_GENRE_CONTENT_DEFINITION_ID,
        properties: {
            name: NAME,
            slug: SLUG,
        },
    };

    // Send POST request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/Content/${prjConstants.MOVIE_GENRE_CONTENT_DEFINITION_ID}`, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(BODY),
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        // Get the response
        const id = await RESPONSE.text();

        // Return the ID
        return id.replaceAll('"', "");
    }
}
