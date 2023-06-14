import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function removeAssetFromAssetGroup(AUTH_TOKEN, ASSET_GROUP_ID, ASSETS) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = ASSETS;
  
  // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/assetgroup/remove/${ASSET_GROUP_ID}`, {
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
    apiExceptionHandler(RESPONSE, "Failed to remove asset from asset group");
}