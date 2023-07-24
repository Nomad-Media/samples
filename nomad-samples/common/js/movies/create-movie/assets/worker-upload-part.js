import uploadPartComplete from "./upload-part-complete.js";

export default function workerUploadPart(AUTH_TOKEN, FILE, PART, INDEX, workerCountDone) {
    // Build start worker object
    
    const startWorker = {
        file: FILE,
        part: PART,
        index: INDEX
    };

    // Create a new worker thread
    const worker = new Worker("assets/upload-worker.js");

    const decr = () => { workerCountDone.value--; };
    // Listen for messages
    worker.addEventListener("message", async (evt) => {
        // Check from proper message from the web worker
        if (!evt || !evt.data || !evt.data.partId || !evt.data.etag) {
            // An unknown error occurred, abort the upload
            throw new Error("Web Worker sent invalid message");
        }

        // Complete this part upload
        await uploadPartComplete(AUTH_TOKEN, evt.data.partId, evt.data.etag);
        decr();
    });

    // Listen for errors
    worker.addEventListener("messageerror", (event) => {
        // Log the error
        console.error(`Worker Message Error: ${event}`);

        // If one web worker failed we can't continue with the upload
        throw new Error(event);
    });

    // Start web worker
    worker.postMessage(startWorker);

    return workerCountDone;
}