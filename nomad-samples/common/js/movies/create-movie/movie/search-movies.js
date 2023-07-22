import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function searchMovies(AUTH_TOKEN, PAGE_OFFSET, PAGE_SIZE, SEARCH_QUERY, FILTERS, SEARCH_RESULT_FIELDS, SORT_FIELD, SORT_TYPE, IS_ADMIN) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const DEFAULT_FILTERS = [
        {
            fieldName: "contentDefinitionId",
            operator: "Equals",
            values: prjConstants.MOVIE_CONTENT_DEFINITION_ID,
        },
        {
            fieldName: "languageId",
            operator: "Equals",
            values: prjConstants.US_ENGLISH_LANGUAGE_LOOKUP_ID,
        },
    ]

    for(let filter_idx = 0; filter_idx < FILTERS.length; ++filter_idx)
    {
        DEFAULT_FILTERS.push(FILTERS[filter_idx]);
    }

    // Build the payload body
    const BODY = {
        filters: DEFAULT_FILTERS,
        SearchResultFields: SEARCH_RESULT_FIELDS
    };

    if (PAGE_OFFSET !== ""){BODY["pageOffset"] == PAGE_OFFSET}    
    if (PAGE_SIZE !== ""){BODY["pageSize"] == PAGE_SIZE}
    if (SEARCH_QUERY !== ""){BODY["searchQuery"] == SEARCH_QUERY}

    if (SORT_FIELD != "")
    {
        BODY.sortFields = [
            {
                fieldName: SORT_FIELD,
                sortType: SORT_TYPE
            }
        ]
    }

    // Send POST request
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/portal/search`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY),
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        // Get the response
        const MOVIES = await RESPONSE.json();

        // Return the movies
        return MOVIES;
    }

    apiExceptionHandler(RESPONSE, "Getting movies failed");
}
