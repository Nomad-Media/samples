import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";
import liveChannelStatuses from "./live-channel-statuses.js";
import waitForLiveChannelStatus from "./wait-live-channel-status.js";
import liveChannelTypes from "./live-channel-types.js";
import slugify from "../helpers/slugify.js";

export default async function createLiveChannel(AUTH_TOKEN, NAME, THUMBNAIL_IMAGE_ID, ARCHIVE_FOLDER_ASSET_ID,
                                                IS_SECURE_OUTPUT, OUTPUT_SCREENSHOTS, TYPE, URL) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        name: NAME,
        routeName: slugify(NAME),
        thumbnailImage: { id: THUMBNAIL_IMAGE_ID },
        isSecureOutput: IS_SECURE_OUTPUT,
        outputScreenshots: OUTPUT_SCREENSHOTS,
        type: { id: TYPE }
    };

    if (ARCHIVE_FOLDER_ASSET_ID === "")
    {
        BODY.archiveFolderAsset = { id: prjConstants.ARCHIVE_FOLDER_ASSET_ID }
    }
    else
    {
        BODY.archiveFolderAsset = ARCHIVE_FOLDER_ASSET_ID;
    }

    // Set the appropriate fields based on the channel type
    if (data.type === liveChannelTypes.External) {
        BODY.externalUrl = URL;
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

    await apiExceptionHandler(RESPONSE, `Creating Live Channel ${data.name} failed`);
}
