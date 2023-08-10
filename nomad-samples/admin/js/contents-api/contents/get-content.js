import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function getContent(AUTH_TOKEN, CONTENT_DEFINITION_ID, ID, IS_REVISION) {
    
    let API_URL = `${prjConstants.ADMIN_API_URL}/content/${ID}?contentDefinitionId=${CONTENT_DEFINITION_ID}&isRevision=${IS_REVISION}`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    // Send the request
    const RESPONSE = await fetch(API_URL, {
        method: "GET",
        headers: HEADERS
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        return await RESPONSE.json();
    }

    await apiExceptionHandler(RESPONSE, `Getting Content ${ID} failed`);
}