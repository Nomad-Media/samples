import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function startBroadcast(AUTH_TOKEN, ID, PREROLL_ASSET_ID, POSTROLL_ASSET_ID, LIVE_INPUT_ID, 
    RELATED_CONTENT_IDS, TAG_IDS) {
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    // Create body for the request
    const BODY = {
        id: ID
    };

    if (PREROLL_ASSET_ID !== "") { BODY.prerollAsset = { id: PREROLL_ASSET_ID }; }
    if (POSTROLL_ASSET_ID !== "") { BODY.postrollAsset = { id: POSTROLL_ASSET_ID }; }
    if (LIVE_INPUT_ID !== "") { BODY.liveInput = { id: LIVE_INPUT_ID }; }

    if (RELATED_CONTENT_IDS[0] !== "") {
        BODY.relatedContent = RELATED_CONTENT_IDS.map(id => ({ id }));
    }
    if (TAG_IDS[0] !== "") {
        BODY.tags = TAG_IDS.map(id => ({ id }));
    }

    // Send the request
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/admin/liveOperator/start`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    });

    // Check for success
    if (RESPONSE && RESPONSE.ok) {
        return await RESPONSE.json();
    }

    await apiExceptionHandler(RESPONSE, `Starting Broadcast ${ID} failed`);
}