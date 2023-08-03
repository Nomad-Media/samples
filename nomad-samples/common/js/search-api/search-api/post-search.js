import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function postSearch(AUTH_TOKEN, PAGE_OFFSET, PAGE_SIZE, SEARCH_QUERY, FILTERS, 
                                         RESULT_FIELDS_JSON, FIELD_NAME, SORT_TYPE, IS_ADMIN) 
{
    const API_URL = IS_ADMIN ? `${prjConstants.ADMIN_API_URL}/admin/search` : `${prjConstants.PORTAL_API_URL}/portal/search`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        filters: FILTERS,
        SearchResultFields: RESULT_FIELDS_JSON
    };

    if (PAGE_OFFSET !== ""){BODY["pageOffset"] == PAGE_OFFSET}    
    if (PAGE_SIZE !== ""){BODY["pageSize"] == PAGE_SIZE}
    if (SEARCH_QUERY !== ""){BODY["searchQuery"] == SEARCH_QUERY}

    if (FIELD_NAME != "")
    {
        BODY.sortFields = [
            {
                fieldName: FIELD_NAME,
                sortType: SORT_TYPE
            }
        ]
    }

    // Post
    const RESPONSE = await fetch(API_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        // Get the JSON from the response
        const INFO = await RESPONSE.json();

        return INFO;
    }
		
  	// There was an error
    await apiExceptionHandler(RESPONSE, "Content search failed");
}