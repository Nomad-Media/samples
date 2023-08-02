import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function getLiveOperator(AUTH_TOKEN, ID) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/admin/liveOperator/${ID}`, {
        method: "GET",
        headers: HEADERS
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        return await RESPONSE.json();
    }

    await apiExceptionHandler(RESPONSE, `Getting Live Operator ${ID} failed`);
}