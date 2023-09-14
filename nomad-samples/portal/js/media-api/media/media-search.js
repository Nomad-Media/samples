import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function mediaSearch(AUTH_TOKEN, SEARCH_QUERY, IDS, FIELD_NAME, SORT_TYPE) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {  
        searchQuery: SEARCH_QUERY,
        ids: IDS,
        sortFields: [  
            {  
                fieldName: FIELD_NAME,
                sortType: SORT_TYPE  
            }  
        ]  
    };

    // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/media/search`, {
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
    await apiExceptionHandler(RESPONSE, "Media search failed");
}