import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function updateUser(AUTH_TOKEN) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        id: "990a1ebc-3344-41fc-a331-4009b3773229",
        email: "d.fletcher@example.net",
        firstName: "Deanna ",
        lastName: "Fletcher",
        mobilePhone: "949-555-4545"
    };
  
    // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/account`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body)
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
    await apiExceptionHandler(RESPONSE, "Update user failed");
}