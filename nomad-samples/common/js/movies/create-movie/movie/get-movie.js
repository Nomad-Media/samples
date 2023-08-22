import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function getMovie(AUTH_TOKEN, ID) {
    // Check for valid parameters
    if (!AUTH_TOKEN || !ID) {
        throw new Error("Get Movie: Invalid API call");
    }

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${AUTH_TOKEN}`);

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
                values: ID
            },
            {
                fieldName: "languageId",
                operator: "Equals",
                values: prjConstants.US_ENGLISH_LANGUAGE_LOOKUP_ID
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
            },
            {
                name: "movieFile",
                SearchResultFields: [
                    {
                        name: "fullUrl"
                    }
                ]
            }
        ]
    };

    // Send POST request
    const response = await fetch(`${prjConstants.ADMIN_API_URL}/admin/search`, {
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

    await apiExceptionHandler(response, `Get Movie [${ID}] failed`);
}
