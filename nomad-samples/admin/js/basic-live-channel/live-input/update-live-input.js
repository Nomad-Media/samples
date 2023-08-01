import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";
import liveInputTypes from "./live-input-types.js";
import liveInputStatuses from "./live-input-statuses.js";
import waitForLiveInputStatus from "./wait-live-input-status.js";
import slugify from "../helpers/slugify.js";


export default async function updateLiveInput(AUTH_TOKEN, ID, NAME, SOURCE, TYPE) {
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
    if (TYPE !== "") BODY.type = { id: liveInputTypes[TYPE] };

    // Set the appropriate fields based on the type
    if (TYPE == "RTMP_PUSH")
    {
        if (SOURCE) BODY["sourceCidr"] = SOURCE
    }
    else if (TYPE === "RTMP_PULL" || TYPE === "RTP_PUSH" || TYPE === "URL_PULL")
    {
        if (SOURCE) BODY["sources"] = [{ "url": SOURCE }]
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

        return JSON_RESPONSE;
    }

    await apiExceptionHandler(RESPONSE, `Creating Live Input ${NAME} failed`);
}
