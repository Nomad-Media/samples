import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Logout
 *
 */
export default async function logout(APPLICATION_ID) {
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);

    // Build the POST payload body
    const BODY = {
       "userSessionId": sessionStorage.getItem("userSessionId"),
       "applicationId": APPLICATION_ID
    };

    // Send the request
    const response = await fetch(`${prjConstants.PORTAL_API_URL}/account/logout`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    }).catch((exception) => {
        throw exception;
    });


    // Check for success
    if (response && response.ok) {
        // Get interval ID
        const intervalId = sessionStorage.getItem("intervalId");

        // Clear interval
        if (intervalId) {
            clearInterval(intervalId);
        }

        sessionStorage.clear();

        return true;
    }

    await apiExceptionHandler(response, "Logout failed");
}
