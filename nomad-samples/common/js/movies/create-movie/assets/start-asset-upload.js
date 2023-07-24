import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function startUpload(AUTH_TOKEN, NAME, UPLOAD_OVERWRITE_OPTION, FILE) 
{
    const AWS_MIN_LIMIT = 5242880;
    let chunkSize = FILE.size / 10000;
    
    if (chunkSize < (AWS_MIN_LIMIT * 4))
    {
        chunkSize = 20971520;
    }

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        displayName: NAME || FILE.name,
        contentLength: FILE.size,
        uploadOverwriteOption: UPLOAD_OVERWRITE_OPTION,
        relativePath: FILE.name,
        relatedContentId: "",
        chunkSize: chunkSize
    };

    // Post
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/asset/upload/start`, {
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
    await apiExceptionHandler(RESPONSE, "Start asset upload failed");
}