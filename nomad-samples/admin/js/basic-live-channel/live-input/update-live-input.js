import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";
import liveInputTypes from "./live-input-types.js";
import liveInputStatuses from "./live-input-statuses.js";
import waitForLiveInputStatus from "./wait-live-input-status.js";
import slugify from "../helpers/slugify.js";


export default async function createLiveInput(AUTH_TOKEN, ID, NAME, SOURCE_URL, SOURCE_TYPE) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        id: ID
    };

    if (NAME !== "")
    {
         BODY.name = NAME;
        BODY.internalName = slugify(NAME);
    }
    if (SOURCE_TYPE !== "") BODY.type = { id: SOURCE_TYPE };

    // Set the appropriate fields based on the type
    switch (data.type) {
        case liveInputTypes.RTP_PUSH:
        case liveInputTypes.RTMP_PUSH:
            BODY.sourceCidr = SOURCE_URL;
            break;
        case liveInputTypes.RTMP_PULL:
        case liveInputTypes.URL_PULL:
            if (SOURCE_URL !== "") BODY.sources = ([{ url: `${SOURCE_URL}` }]);
            break;
        default:
            throw new Error(`Create Live Input: Unknown Live Input Type ${data.type}`);
    }

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/liveInput`, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        const JSON_RESPONSE = await RESPONSE.json();

        // Wait for the Live Input to be detached if it was just created
        await waitForLiveInputStatus(AUTH_TOKEN, JSON_RESPONSE.id, liveInputStatuses.Detached, 15, 1);
    }

    await apiExceptionHandler(RESPONSE, `Creating Live Input ${NAME} failed`);
}
