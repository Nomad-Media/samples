import * as prjConstants from "../constants/project-constants.js";
import updateMovie from "./update-movie.js";

export default async function createMovie(AUTH_TOKEN, TITLE, SLUG, PLOT, RELEASE_DATE, GENRE_ID, GENRE_NAME, IMAGE_ID, VIDEO_ID) {
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
    
    return updateMovie(AUTH_TOKEN, ID, TITLE, SLUG, PLOT, RELEASE_DATE, GENRE_ID, GENRE_NAME, IMAGE_ID, VIDEO_ID);
}
    
