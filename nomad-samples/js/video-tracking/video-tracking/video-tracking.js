import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function getVideoTrackingService(AUTH_TOKEN, ASSET_ID, TRACKING_EVENT, SECOND) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    let api_url = `${prjConstants.PORTAL_API_URL}/asset/tracking?assetId=${ASSET_ID}`
    if (SECOND != "")
    {
        api_url += `&second=${SECOND}`
    }

    // Post
    const RESPONSE = await fetch(api_url, {
        method: "GET",
        headers: HEADERS
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        return RESPONSE.text;
    }
		
  	// There was an error
    await apiExceptionHandler(RESPONSE, "Video tracking failed");
}