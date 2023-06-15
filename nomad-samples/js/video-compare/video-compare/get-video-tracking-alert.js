export default async function getVideoTrackingAlert(AUTH_TOKEN, EXTERNAL_ID) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Post
    const RESPONSE = await fetch(`https://${videoCompareApiUrl}/api/videocompare/tracking/manifest/${EXTERNAL_ID}/getTracking`, {
        method: "POST",
        headers: HEADERS
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
    await apiExceptionHandler(RESPONSE, "Getting video tracking alert failed");
}