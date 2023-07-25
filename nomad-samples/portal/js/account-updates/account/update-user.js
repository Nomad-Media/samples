import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function updateUser(AUTH_TOKEN, ADDRESS, ADDRESS2, CITY, COUNTRY, FIRST_NAME, LAST_NAME, 
    ORGANIZATION, PHONE_NUMBER, PHONE_EXT, POSTAL_CODE, STATE) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {};

    if (ADDRESS !== "") BODY["address"] = ADDRESS;
    if (ADDRESS2 !== "") BODY["address2"] = ADDRESS2;
    if (CITY !== "") BODY["city"] = CITY;
    if (STATE !== "") BODY["state"] = STATE;
    if (COUNTRY !== "") BODY["country"] = COUNTRY;
    if (FIRST_NAME !== "") BODY["firstName"] = FIRST_NAME;
    if (LAST_NAME !== "") BODY["lastName"] = LAST_NAME;
    if (PHONE_NUMBER !== "") BODY["phone"] = PHONE_NUMBER;
    if (PHONE_EXT !== "") BODY["phoneExt"] = PHONE_EXT;
    if (POSTAL_CODE !== "") BODY["postalCode"] = POSTAL_CODE;
    if (ORGANIZATION !== "") BODY["organization"] = ORGANIZATION;

  
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