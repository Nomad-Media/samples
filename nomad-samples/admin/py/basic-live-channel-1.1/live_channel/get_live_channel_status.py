from live_channel.get_live_channel import *

def get_live_channel_status(AUTH_TOKEN, CHANNEL_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not CHANNEL_ID):
        raise Exception("Get Live Channel Status: Invalid API call")


    # Get the live channel
    CHANNEL = get_live_channel(AUTH_TOKEN, CHANNEL_ID)

    # Check if live channel was found
    if (CHANNEL):
        # Return the status of the live channel
        return CHANNEL["status"]["description"]


    # Live channel was not found
    return "Deleted"

