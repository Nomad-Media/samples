/**
 * API Exception Handler
 *
 * @param {Stream} response
 * @param {string} message
 */
export default async function apiExceptionHandler(response, message) {
    // Set a default error message
    let error = "Unknown error occurred";

    // Get interval ID
    const intervalId = sessionStorage.getItem("intervalId");

    // Clear interval
    if (intervalId) {
        clearInterval(intervalId);
    }

    // Check if we have a response object and error message
    if (!response) {
        // If not response then throw default error or message
        if (!message || message.trim().length === 0) {
            throw new Error(error);
        } else {
            throw new Error(message);
        }
    }

    // Get the response content type to determine how to parse it
    const contentType = response.headers.get("content-type");

    // If response body is JSON
    if (contentType && contentType.indexOf("application/json") !== -1) {
        try {
            // Read response as JSON
            error = await response.json();
            // If error JSON object has error messages then throw the first
            if (error && error.errors && error.errors.length > 0) {
                throw new Error(`${message}: ${error.errors[0].message}`);
            }
        } catch (ignore) {
            // Throw message and response status
            throw new Error(`${message}: ${response.status}`);
        }

        // Throw message and response status
        throw new Error(`${message}: ${response.status}`);
    } else {
        try {
            // Response body is text
            error = await response.text();

            // Throw error if valid
            if (error && error.trim().length > 0) {
                throw new Error(`${message}: ${error}`);
            }
        } catch (ignore) {
            // Throw message and response status
            throw new Error(`${message}: ${response.status}`);
        }

        // Throw message and response status
        throw new Error(`${message}: ${response.status}`);
    }
}
