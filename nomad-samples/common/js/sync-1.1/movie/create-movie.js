import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function createMovie(AUTH_TOKEN, CONTENT_ID, TITLE, SLUG, PLOT, RELEASE_DATE, GENRE_ID, GENRE_NAME, IMAGE_ID, VIDEO_ID) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const NEW_RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/content/new?contentDefinitionId=${prjConstants.MOVIE_CONTENT_DEFINITION_ID}`, {
        method: "GET",
        headers: HEADERS
    }).catch((exception) => {
        throw exception;
    });
    const ID_JSON = await NEW_RESPONSE.json();
    const ID = ID_JSON.contentId;
    
    // Build the payload body
    const BODY = {
        contentDefinitionId: prjConstants.MOVIE_CONTENT_DEFINITION_ID,
        contentId: CONTENT_ID,
        masterID: CONTENT_ID,
        properties: {}
    };

    if (TITLE !== "") BODY.properties.title = TITLE;
    if (SLUG !== "") BODY.properties.slugifyField = SLUG;
    if (PLOT !== "") BODY.properties.plot = PLOT;
    if (RELEASE_DATE !== "") BODY.properties.releaseDate = RELEASE_DATE;

    if (GENRE_ID !== "")
    {
        BODY.properties.genre = {};
        BODY.properties.genre.id = GENRE_ID;
        BODY.properties.genre.description = GENRE_NAME;
    }
    if (IMAGE_ID !== "")
    {
        BODY.properties.image = {};
        BODY.properties.image.id = IMAGE_ID;
    }
    if (VIDEO_ID !== "")
    {
        BODY.properties.movieFile = {};
        BODY.properties.movieFile.id = VIDEO_ID;
    }



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
        return ID;
    }

    apiExceptionHandler(RESPONSE, "Create movie failed");
}
    
