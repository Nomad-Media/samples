export default async function createVideoTrackingJob(AUTH_TOKEN, CHANNEL_GROUPS, DEFAULT_THRESHOLD_INFOS, EXTERNAL_ID, PROGRAM_START_DT_UTC, PROGRAM_END_DT_UTC, PROGRAM_NAME) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        externalId: EXTERNAL_ID,
        programStartDtUtc: PROGRAM_START_DT_UTC,
        programEndDtUtc: PROGRAM_END_DT_UTC,
        programName: PROGRAM_NAME,
        channelGroup: CHANNEL_GROUPS,
        defaultThresholdInfos: DEFAULT_THRESHOLD_INFOS
    };

    // Post
    const RESPONSE = await fetch(`https://${videoCompareApiUrl}/api/videocompare/tracking`, {
        method: "POST",
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
    await apiExceptionHandler(RESPONSE, "Creating video tracking job failed");
}