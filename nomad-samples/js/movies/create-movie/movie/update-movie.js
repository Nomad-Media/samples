import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function updateMovie(AUTH_TOKEN, ID, TITLE, SLUG, PLOT, RELEASE_DATE, GENRE_ID, GENRE_NAME, IMAGE_ID, VIDEO_ID) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        contentDefinitionId: prjConstants.MOVIE_CONTENT_DEFINITION_ID,
        contentId: ID,
        title: TITLE,
        slugifyField: SLUG,
        plot: PLOT,
        releaseDate: RELEASE_DATE,
        genre: {
            id: GENRE_ID,
            description: GENRE_NAME
        },
        image: {
            id: IMAGE_ID
        },
        movieFile: {
            id: VIDEO_ID
        },
        properties: {
            title: TITLE,
            slugifyField: SLUG,
            plot: PLOT,
            releaseDate: RELEASE_DATE,
            genre: {
                id: GENRE_ID,
                description: GENRE_NAME
            },
            image: {
                id: IMAGE_ID
            },
            movieFile: {
                id: VIDEO_ID
            }
        },
    };

    // Send POST request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/content/${ID}`, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(BODY),
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        // Get the response
        const ID = await RESPONSE.text();

        // Return the ID
        return ID.replaceAll('"', "");
    }

    apiExceptionHandler(RESPONSE, "Create/Update movie failed")
}
