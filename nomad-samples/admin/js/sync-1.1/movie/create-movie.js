import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function createMovie(AUTH_TOKEN, CONTENT_ID, TITLE, SLUG, PLOT, RELEASE_DATE, GENRE_MAP, IMAGE_ID, VIDEO_ID) {
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

    if (CONTENT_ID === "") CONTENT_ID = ID;
    
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

    if (GENRE_MAP !== {})
    {
        BODY.properties.genres = GENRE_MAP;
    }
    if (IMAGE_ID !== "")
    {
        BODY.properties.image = {
            description: `${TITLE} Image`,
            id: IMAGE_ID
        }
    }
    if (VIDEO_ID !== "")
    {
        BODY.properties.movieFile = {
            description: `${TITLE} Video`,
            id: VIDEO_ID
        }
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
    
