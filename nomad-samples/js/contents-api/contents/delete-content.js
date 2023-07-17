import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function deleteContent(AUTH_TOKEN, ID, CONTENT_DEFINITION_ID)
{
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Send POST request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/content/${ID}?contentDefinitionId=${CONTENT_DEFINITION_ID}`, {
        method: "DELETE",
        headers: HEADERS
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        return true;
    } 

    apiExceptionHandler(RESPONSE, "Deleting movie failed");
}