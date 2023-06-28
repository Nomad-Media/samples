import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function updateUser(AUTH_TOKEN, ADDRESS1, ADDRESS2, CITY, COUNTRY, FIRST_NAME, LAST_NAME, 
    ORGANIZATION, PHONE_NUMBER, PHONE_EXT, POSTAL_CODE, STATE) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        address: ADDRESS1,
        address2: ADDRESS2,
        city: CITY,
        state: STATE,
        country: COUNTRY,
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        phoneExt: PHONE_EXT,
        phone: PHONE_NUMBER,
        postalCode: POSTAL_CODE,
        organization: ORGANIZATION
    };
  
    // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/account/user`, {
        method: "PUT",
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
    await apiExceptionHandler(RESPONSE, "Update user failed");
}