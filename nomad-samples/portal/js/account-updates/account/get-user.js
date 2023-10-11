const _apiExceptionHandler = require("../../exceptions/api-exception-handler");

async function _getUser(AUTH_TOKEN, URL, DEBUG_MODE)
{
    const API_URL = `${URL}/account/user`;

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
        _apiExceptionHandler(error, "Get user failed");
    }
}

module.exports = _getUser;