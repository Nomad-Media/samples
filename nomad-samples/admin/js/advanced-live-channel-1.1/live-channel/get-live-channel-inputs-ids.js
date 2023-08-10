import getLiveChannelScheduleEvents from "./get-live-channel-schedule-events.js";

/**
 * Get Live Channel Inputs IDs
 *
 * @param {string} token        Authorization token
 * @param {string} channelId    THe channel ID for which to retrieve the inputs IDs
 *
 * @returns {Array} of live inputs IDs if any
 */
export default async function getLiveChannelInputsIds(token, channelId) {
    // Declare empty array for the IDs
    const inputIds = [];

    // Get all the schedule events for the channel
    const channelEvents = await getLiveChannelScheduleEvents(token, channelId);

    // If there are schedule events
    if (channelEvents && channelEvents.length > 0) {
        // Loop schedule events
        channelEvents.forEach((scheduleEvent) => {
            // Check if schedule event is input type
            if (scheduleEvent && scheduleEvent.liveInput && scheduleEvent.liveInput != null) {
                // If it has a valid lookupId add it to the array
                if (scheduleEvent.liveInput.lookupId) {
                    inputIds.push(scheduleEvent.liveInput.lookupId);
                }
            }
        });
    }

    // Return the array of inputs IDs
    return inputIds;
}
