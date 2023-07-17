import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function createContent(AUTH_TOKEN, CONTENT_DEFINITION_ID) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/content/new?contentDefinitionId=${CONTENT_DEFINITION_ID}`, {
        method: "GET",
        headers: HEADERS
    }).catch((exception) => {
        throw exception;
    });

    if (RESPONSE.ok)
    {
        const ID_JSON = await RESPONSE.json();
        const ID = ID_JSON.contentId;
    
        return INFO
    }

    await apiExceptionHandler(RESPONSE, "Creating content failed")
}
    
