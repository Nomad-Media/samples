import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function getGenres(AUTH_TOKEN) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        filters: [
            {
                fieldName: "contentDefinitionId",
                operator: "Equals",
                values: prjConstants.MOVIE_GENRE_CONTENT_DEFINITION_ID,
            },
            {
                fieldName: "languageId",
                operator: "Equals",
                values: prjConstants.US_ENGLISH_LANGUAGE_LOOKUP_ID,
            }
        ],
        returnedFieldNames:["title"]
    };

    // Send POST request
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/portal/search`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY),
    });

    // Check for success
    if (RESPONSE.ok) {
        // Get the response
        const GENRES = await RESPONSE.json();

        // Return the genres
        return GENRES;
    }

    apiExceptionHandler(RESPONSE, "Getting genres failed");
}
