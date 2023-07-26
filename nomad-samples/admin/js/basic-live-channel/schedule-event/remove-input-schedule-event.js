import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function removeInputScheduleEvent(AUTH_TOKEN, CHANNEL_ID, INPUT_ID)
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);


    // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/liveChannel/${CHANNEL_ID}/liveScheduleEvent/${INPUT_ID}`, {
        method: "delete",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        
    }

    // There was an error
    await apiExceptionHandler(RESPONSE, "Failed to remove input schedule event");
}