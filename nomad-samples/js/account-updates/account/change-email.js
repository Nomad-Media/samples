import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function changeEmail(AUTH_TOKEN) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        password: "currentPassword",
        newEmail: "newEmail@newEmail.net"
    };
  
  	// Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/account/change-email`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
      return(RESPONSE.status);
    }
		
  	// There was an error
    apiExceptionHandler(RESPONSE, "Change email failed");
}