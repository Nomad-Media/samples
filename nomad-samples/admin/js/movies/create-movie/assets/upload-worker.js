/**
 * Upload file part Web Worker
 *
 */
self.addEventListener(
    "message",
    async (evt) => {
        const file = evt.data.file;
        const part = evt.data.part;
        const index = evt.data.index;

        const etag = await uploadPart(file, part);

        self.postMessage({ index: index, partId: part.id, etag: etag });

        self.close();
    },
    false
);

/**
 * Upload File Part
 *
 * @param {File}    file
 * @param {Object}  part
 *
 */
async function uploadPart(file, part) {
    // Build the payload body
    const body = file.slice(part.startingPosition, part.endingPosition + 1);

    // Create header for the request
    const headers = new Headers();
    headers.append("Accept", "application/json, text/plain, */*");

    // Send the request
    const response = await fetch(part.url, {
        method: "PUT",
        headers: headers,
        body: body
    });

    // Check for success
    if (response && response.ok) {
        // Return the ETag from response header
        return response.headers.get("ETag");
    }

    throw new Error("Web Worker upload part failed");
}
