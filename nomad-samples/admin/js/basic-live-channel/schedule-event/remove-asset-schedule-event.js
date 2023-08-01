import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function removeAssetScheduleEvent(authToken, CHANNEL_ID, SCHEDULE_EVENT_ID) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/LiveChannel/${CHANNEL_ID}/liveScheduleEvent/${SCHEDULE_EVENT_ID}`, {
        method: "DELETE",
        headers: HEADERS
    });

    if (RESPONSE.ok) {
        return;
    }

    await apiExceptionHandler(RESPONSE, "Remove Asset Schedule Event failed");
}