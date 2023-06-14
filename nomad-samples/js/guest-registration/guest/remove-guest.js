import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js"; 

export default async function removeGuest(AUTH_TOKEN, CONTENT_DEFINITION_ID, USER_ID) 
{
		// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        contentDefinitionId: CONTENT_DEFINITION_ID,
        userId: USER_ID
    };
  
  // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/account/remove-user`, {
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
    await apiExceptionHandler(RESPONSE, "Remove guest invitation failed");
}