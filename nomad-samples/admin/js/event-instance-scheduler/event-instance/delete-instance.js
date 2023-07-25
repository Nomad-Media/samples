import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function deletingEventInstance(AUTH_TOKEN, ID, CONTENT_DEFINITION_ID) 
{
		// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Post
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/content/${ID}?contentDefinitionId=${CONTENT_DEFINITION_ID}`, {
        method: "DELETE",
        headers: HEADERS
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        return RESPONSE.status;
    }
  	// There was an error
    await apiExceptionHandler(RESPONSE, "Deleting event instance failed");
}