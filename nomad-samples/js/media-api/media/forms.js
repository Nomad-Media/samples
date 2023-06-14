import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function forms(AUTH_TOKEN, FIRST_NAME, LAST_NAME, ACTIVE, START_DATE, LOOKUP_ID, DESCRIPTION, ID) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        active: ACTIVE,
        startDate: START_DATE,
        state: {
            lookupId: LOOKUP_ID,
            description: DESCRIPTION
        }
    }

    // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/media/form/${ID}`, {
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
    await apiExceptionHandler(RESPONSE, "Forms failed");
}