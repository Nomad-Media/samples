import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

/**
 * Logout
 *
 */
export default async function logout() {
    // Send the request
    const response = await fetch(`${prjConstants.PUBLIC_URL}/account/logout`, {
        method: "POST"
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
