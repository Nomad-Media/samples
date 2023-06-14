import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function verify(EMAIL, TOKEN) 
{
		// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
  
  	const BODY = {
        userName: EMAIL,
        token: TOKEN
    };
  
  // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/account/verify`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    }).catch((exception) => {
        console.log(exception);
        throw exception;
    });
    
    // Check for success
    if (RESPONSE.ok) {
        console.log("Success");
        return(RESPONSE.status);
    }
		
  	// There was an error
    await apiExceptionHandler(RESPONSE, `Verify user failed`);
}