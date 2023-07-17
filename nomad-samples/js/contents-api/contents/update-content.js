import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function updateContent(AUTH_TOKEN, CONTENT_DEFINITION_ID, ID, PROPERTIES) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        contentDefinitionId: CONTENT_DEFINITION_ID,
        contentId: ID,
        properties: PROPERTIES
    };

    // Send POST request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/content/${ID}`, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(BODY),
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        // Get the response
        const ID = await RESPONSE.text();

        // Return the ID
        return ID.replaceAll('"', "");
    }

    apiExceptionHandler(RESPONSE, "Create/Update movie failed")
}
