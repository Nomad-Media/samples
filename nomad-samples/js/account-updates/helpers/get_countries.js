export default async function getCountries(AUTH_TOKEN)
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Post
    const RESPONSE = await fetch(`https://dev-05.demos.media/config/ea1d7060-6291-46b8-9468-135e7b94021b/lookups.json`, {
        method: "GET",
        headers: HEADERS
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        // Get the JSON from the response
        const INFO = await RESPONSE.json();

        return INFO[5];
    }

    // There was an error
    await apiExceptionHandler(RESPONSE, "Get countries failed");
}