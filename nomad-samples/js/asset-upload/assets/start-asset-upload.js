import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function startUpload(authToken, PARENT_ID, CONTENT_LENGTH, UPLOAD_OVERWRITE_OPTION, CHUNK_SIZE, RELATIVE_PATH, LANGUAGE_ID) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);
  
    const BODY = {
        "parentId": PARENT_ASSET_ID,
        "contentLength": CONTENT_LENGTH,
        "uploadOverwriteOption": UPLOAD_OVERWRITE_OPTION,
        "chunkSize": CHUNK_SIZE,
        "relativePath": RELATIVE_PATH,
        "languageId": LANGUAGE_ID
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
    apiExceptionHandler(RESPONSE, "Start asset upload failed");
}