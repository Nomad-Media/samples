import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";


export default async function getLiveChannel(AUTH_TOKEN, CHANNEL_ID) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/liveChannel/${CHANNEL_ID}`, {
        method: "GET",
        headers: HEADERS
    });

    // Check for valid response
    if (RESPONSE) {
        // Check for success
        if (RESPONSE.ok) {
            return await RESPONSE.json();
        }
    }

        // Check for success
    if (RESPONSE.status === 404) {
        // Parse JSON response
        return await RESPONSE.json();
    }

    await apiExceptionHandler(RESPONSE, `Get Live Channel with ID ${CHANNEL_ID} failed`);
}
