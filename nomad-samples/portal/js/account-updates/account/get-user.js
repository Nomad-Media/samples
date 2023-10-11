import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function _getUser(AUTH_TOKEN, DEBUG_MODE)
{
    const API_URL = `${prjConstants.PORTAL_API_URL}/account/user`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json();
        }

        return await RESPONSE.json();
    }
    catch (error) {
        await apiExceptionHandler(error, "Get user failed");
    }
}