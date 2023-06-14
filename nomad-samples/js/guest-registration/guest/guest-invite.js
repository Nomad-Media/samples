import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js"; 

export default async function guestInvite(AUTH_TOKEN, EMAILS) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        contentDefinitionId: "bf8ac754-5b8b-4330-b1aa-76f15fb7f673",
        emails: EMAILS
    };
  
  // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/account/invite-user`, {
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
    await await apiExceptionHandler(RESPONSE, "Guest Invite failed");
}