import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function startSegment(AUTH_TOKEN, ID) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/admin/liveOperator/${ID}/startSegment`, {
        method: "POST",
        headers: HEADERS
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        return;
    }

    await apiExceptionHandler(RESPONSE, `Starting Segment ${ID} failed`);
}