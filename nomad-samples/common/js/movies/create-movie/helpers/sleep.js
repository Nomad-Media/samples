/**
 *  Sleep
 *
 * @param duration  | Duration in seconds
 */
export default async function sleep(duration) {
    // Check for valid duration
    if (!duration || duration === 0) {
        // Ignore
        return;
    }

    // Sleep
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration * 1000);
    });
}
