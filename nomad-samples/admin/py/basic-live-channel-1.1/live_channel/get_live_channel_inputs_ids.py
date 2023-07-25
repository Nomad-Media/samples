from live_channel.get_live_channel_schedule_events import *

def get_live_channel_inputs_ids(AUTH_TOKEN, CHANNEL_ID):
    # Declare empty array for the IDs
    INPUT_IDS = []

    # Get all the schedule events for the channel
    CHANNEL_EVENTS = get_live_channel_schedule_events(AUTH_TOKEN, CHANNEL_ID)

    # If there are schedule events
    if (CHANNEL_EVENTS and len(CHANNEL_EVENTS) > 0):
        # Loop schedule events
        for SCHEDULE_EVENTS in CHANNEL_EVENTS:
            # Check if schedule event is input type
            if (SCHEDULE_EVENTS and "liveInput" in SCHEDULE_EVENTS):
                if SCHEDULE_EVENTS["liveInput"] != None:
                    # If it has a valid lookupId add it to the array
                    if (SCHEDULE_EVENTS["liveInput"]["id"]):
                        INPUT_IDS.append(SCHEDULE_EVENTS["liveInput"]["id"])

    # Return the array of inputs IDs
    return INPUT_IDS

