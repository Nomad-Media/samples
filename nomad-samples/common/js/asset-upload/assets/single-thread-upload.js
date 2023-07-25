import uploadPart from "./upload-part.js";
import uploadPartComplete from "./upload-part-complete.js";

export default async function singleThreadUpload(AUTH_TOKEN, FILE, UPLOAD_RESPONSE) {
    // Loop all parts
    for (let index = 0; index < UPLOAD_RESPONSE.parts.length; index++) {
        console.log(`Uploading part ${index + 1} of ${UPLOAD_RESPONSE.parts.length}...`);
        // Set the current part
        const part = UPLOAD_RESPONSE.parts[index];

        // Upload this part
        const etag = await uploadPart(FILE, part.url, part);

        // Complete this part upload
        await uploadPartComplete(AUTH_TOKEN, part.id, etag);

        console.log(`Uploaded part ${index + 1} of ${UPLOAD_RESPONSE.parts.length} successfully`);
    }
}