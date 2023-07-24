import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js"; 

export default async function registerGuest(AUTH_TOKEN, EMAIL, PASSWORD) 
{
		// Create header for the request
    const HEADERS = new Headers(AUTH_TOKEN);
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        email: EMAIL,
        firstName: "Guest",
        lastName: "User",
        organization: "Nomad Media, Corp",
        password: PASSWORD,
        passwordConfirmation: PASSWORD
    };
  
  // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/account/register-guest`, {
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
    await apiExceptionHandler(RESPONSE, "Register guest failed");
}