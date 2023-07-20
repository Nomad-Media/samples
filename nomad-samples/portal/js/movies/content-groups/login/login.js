import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function login(USERNAME, PASSWORD) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");

    // Build the payload body
    const BODY = {
        username: USERNAME,
        password: PASSWORD,
    };

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/account/login`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY),
    });

    // Check for success
    if (RESPONSE.ok) 
    {
        // Get the response
        const INFO = await RESPONSE.json();

        // Return the token
        return INFO.token;
    }

    await apiExceptionHandler(RESPONSE, "Login failed");
}
