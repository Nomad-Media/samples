import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function getAssetGroups(authToken) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);
  
    // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/assetgroup`, {
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
    apiExceptionHandler(RESPONSE, "Failed to get asset group");
}