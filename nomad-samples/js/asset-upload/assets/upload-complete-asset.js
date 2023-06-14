import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function completeUpload(authToken) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
  	HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Post
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/asset/upload/${assetUploadId}/complete`, {
        method: "POST",
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
    await apiExceptionHandler(RESPONSE, "Upload complete asset failed");
}