import workerUploadPart from "./worker-upload-part.js";
import sleep from "../helpers/sleep.js";

export default async function multiThreadUpload(AUTH_TOKEN, FILE, UPLOAD_RESPONSE) {
    // Set constants
    const PARTS = UPLOAD_RESPONSE.parts;
    const TOTAL_PARTS = PARTS.length;
    const MAX_ACTIVE_WORKERS = 8;

    // There can't be more workers than parts
    const MAX_WORKERS = TOTAL_PARTS >= MAX_ACTIVE_WORKERS ? MAX_ACTIVE_WORKERS : TOTAL_PARTS;

    // Initialize parts index
    let index = 0;
    let workerCount = 0;
    let workerCountDone = { value: 0 };
    // Loop file parts
    while (index < TOTAL_PARTS) {
        // Loop while available workers
        while (workerCount < MAX_WORKERS) {
            // Create a web worker for this file part
            workerCountDone = workerUploadPart(AUTH_TOKEN, FILE, PARTS[index], index, workerCountDone);

            // Update counters
            index++;
            workerCount++;
        }

        // Wait briefly for a web worker to finish
        while (workerCount + workerCountDone.value === MAX_WORKERS) {
            await sleep(0.5);
        }

    }

    // Wait briefly for all web workers to finish
    while (true) {
        if (workerCount + workerCountDone.value > 0) {
            await sleep(0.5);
            continue;
        }

        // Upload is finished
        break;
    }
}