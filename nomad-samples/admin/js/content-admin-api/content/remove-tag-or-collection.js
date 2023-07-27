import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function removeTagOrCollection(AUTH_TOKEN, TYPE, CONTENT_ID, TAG_ID, CONTENT_DEFINITION) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        items: [
            {
                contentDefinition: CONTENT_DEFINITION,
                contentId: CONTENT_ID
            }
        ]
    };

    BODY.items[0][`${TYPE}Id`] = TAG_ID;
    

    // Post
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/admin/${TYPE}/content/delete`, {
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
    await apiExceptionHandler(RESPONSE, "Delete tag or collection failed");
}