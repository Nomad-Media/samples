export default async function getPortalGroups(authToken, PORTAL_GROUPS) 
{
		// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${authToken}`);
  
  	const BODY = {
        "returnedGroupNames": PORTAL_GROUPS
    }
  
  	// Post
    const RESPONSE = await fetch(`${portalApiUrl}/portal/groups`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(BODY)
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        // Get the JSON from the response
        const userContext = await RESPONSE.json();

        return userContext;
    }
		
  	// There was an error
    return undefined;
}