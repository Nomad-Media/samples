import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function changePassword(AUTH_TOKEN)
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        password: "currentPassword",
        newPassword: "newPassword"
    };
  
    // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/account/change-password`, {
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
    await apiExceptionHandler(RESPONSE, "Change password failed");
}