export default async function getListCurrentVideoTrackingJobs(AUTH_TOKEN) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Post
    const RESPONSE = await fetch(`https://${videoCompareApiUrl}/api/videocompare/tracking`, {
        method: "GET",
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
    await apiExceptionHandler(RESPONSE, "Get list of current video tracking jobs failed");
}