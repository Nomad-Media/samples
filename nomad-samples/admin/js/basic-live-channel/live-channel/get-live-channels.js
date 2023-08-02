import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";


export default async function getLiveChannels(AUTH_TOKEN) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/liveChannel`, {
        method: "GET",
        headers: HEADERS
    });

    // Check for valid response
    if (RESPONSE) {
        // Check for success
        if (RESPONSE.ok) {
            return await RESPONSE.json();
        }

        // If not found return null
        if (RESPONSE.status === 404) {
            console.error(`Live Channel was not found`);
            return null;
        }
    }

    await apiExceptionHandler(RESPONSE, `Get Live Channel failed`);
}
