import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function deleteTagOrCollection(AUTH_TOKEN, TYPE, TAG_ID)
{
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    
    // Post
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/admin/${TYPE}/${TAG_ID}`, {
        method: "DELETE",
        headers: HEADERS
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        return;
    }

    // There was an error
    await apiExceptionHandler(RESPONSE, "Delete tag or collection failed");
}