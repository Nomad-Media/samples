export default async function getChannelFrameManifest(AUTH_TOKEN, VIDEO_TRACKING_ID, FRAME_DT) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        VideoTrackingId: VIDEO_TRACKING_ID,   
        FrameDt: FRAME_DT
    };

    // Post
    const RESPONSE = await fetch(`https://${videoCompareApiUrl}/api/videocompare/tracking/manifest`, {
        method: "GET",
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
    await apiExceptionHandler(RESPONSE, "Getting channel frame mainifest failed");
}