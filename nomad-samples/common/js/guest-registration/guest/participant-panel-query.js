import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js"; 

export default async function participantPanelQuery(AUTH_TOKEN, ID, API) 
{
    if (API === "portalApi") {
        API = `${prjConstants.PORTAL_API_URL}/user-session/${ID}`;
    }
    else
    {
        API = `${prjConstants.ADMIN_API_URL}/admin/user-session/${ID}`;
    }

		// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    // Make the request
    const RESPONSE = await fetch(API, {
        method: "GET",
        headers: HEADERS
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
    await apiExceptionHandler(RESPONSE, "Participant panel query failed");
}