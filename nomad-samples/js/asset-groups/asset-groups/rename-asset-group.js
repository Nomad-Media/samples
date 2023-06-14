import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function renameAssetGroup(authToken) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);
  
  	const BODY = {
        Name: "New Asset Group"
    };
  
    // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/assetgroup/{assetGroupId}`, {
        method: "PATCH",
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
    await apiExceptionHandler(RESPONSE, "Failed to rename asset group");
}