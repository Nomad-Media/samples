import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function addTagOrCollection(AUTH_TOKEN, TYPE, CONTENT_ID, TAG_ID, CONTENT_DEFINITION, TAG_NAME, CREATE_NEW) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        items: [
            {
                contentDefinition: CONTENT_DEFINITION,
                contentId: CONTENT_ID,
                name: TAG_NAME,
                createNew: CREATE_NEW
            }
        ]
    };

    if (TAG_ID)
    {
        BODY.items[0].tagId = TAG_ID;
    }

    // Post
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/admin/${TYPE}/content`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    }).catch((exception) => {
        throw exception;
    });

    console.log(JSON.stringify(BODY, null, 4));

    // Check for success
    if (RESPONSE.ok) {
        // Get the JSON from the response
        const INFO = await RESPONSE.json();

        return INFO;
    }
		
  	// There was an error
    await apiExceptionHandler(RESPONSE, "Add tag or collection failed");
}