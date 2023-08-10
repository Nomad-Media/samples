import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";
import liveChannelStatuses from "./live-channel-statuses.js";
import waitForLiveChannelStatus from "./wait-live-channel-status.js";
import LIVE_CHANNEL_TYPES from "./live-channel-types.js";
import slugify from "../helpers/slugify.js";

export default async function updateLiveChannel(AUTH_TOKEN, ID, NAME, THUMBNAIL_IMAGE_ID, ARCHIVE_FOLDER_ASSET_ID,
                                                ENABLE_HIGH_AVAILABILITY, ENABLE_LIVE_CLIPPING, IS_SECURE_OUTPUT, 
                                                OUTPUT_SCREENSHOTS, TYPE, URL) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        id: ID,
        enableHighAvailability: ENABLE_HIGH_AVAILABILITY,
        enableLiveClipping: ENABLE_LIVE_CLIPPING,
        isSecureOutput: IS_SECURE_OUTPUT,
        outputScreenshots: OUTPUT_SCREENSHOTS
    };

    if (NAME !== "")
    {
        BODY.name = NAME;
        BODY.routeName = slugify(NAME);
    }
    if (THUMBNAIL_IMAGE_ID !== "") BODY.thumbnailImage = { id: THUMBNAIL_IMAGE_ID };
    if (ARCHIVE_FOLDER_ASSET_ID !== "") BODY.archiveFolderAsset = { id: ARCHIVE_FOLDER_ASSET_ID };
    if (TYPE !== "") BODY.type = { id: LIVE_CHANNEL_TYPES[TYPE] };


    // Set the appropriate fields based on the channel type
    if (TYPE === "External") {
        if (URL !== "") BODY.externalUrl = URL;
    }

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/liveChannel`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        // Parse JSON response
        const jsonResponse = await RESPONSE.json();

        // Wait for Live Channel to be idle if it was just created
        await waitForLiveChannelStatus(AUTH_TOKEN, jsonResponse.id, liveChannelStatuses.Idle, 120, 2);

        return jsonResponse;
    }

    await apiExceptionHandler(RESPONSE, `Creating Live Channel ${NAME} failed`);
}
