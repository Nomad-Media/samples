import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function addCustomProperties(AUTH_TOKEN, ID, NAME, CUSTOM_PROPERTY_NAMES, CUSTOM_PROPERTIES) 
{
		// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        displayName: NAME,
        customProperties: {
        }
    };

    for (let numProps = 0; numProps < CUSTOM_PROPERTIES.length; ++numProps)
    {
        BODY.customProperties[CUSTOM_PROPERTY_NAMES[numProps]] = CUSTOM_PROPERTIES[numProps];
    }

    // Post
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/admin/asset/${ID}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        // Get the JSON from the response
        const INFO = await RESPONSE.json();

        return INFO;
    }
		
  	// There was an error
    await apiExceptionHandler(RESPONSE, "Add custom properties failed");
}