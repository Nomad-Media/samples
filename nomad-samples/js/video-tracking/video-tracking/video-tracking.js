import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function getVideoTrackingService(AUTH_TOKEN, ASSET_ID, TRACKING_EVENT, SECOND) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Post
    const RESPONSE = await fetch(`${prjConstants.PORTAL_API_URL}/asset/tracking?assetId=${ASSET_ID}&trackingEvent=${TRACKING_EVENT}&second=${SECOND}`, {
        method: "GET",
        headers: HEADERS
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        return RESPONSE.status;
    }
		
  	// There was an error
    apiExceptionHandler(RESPONSE, "Video tracking failed");
}