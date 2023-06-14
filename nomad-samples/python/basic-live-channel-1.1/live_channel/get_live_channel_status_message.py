from live_channel.get_live_channel import *

'''
 * Get Live Channel Status Messages
 *
 * @param {string} AUTH_TOKEN    | Authorization token
 * @param {string} CHANNEL_ID    | The CHANNEL ID for which to get the status messages
'''
async def get_live_channel_status_message(AUTH_TOKEN, CHANNEL_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not CHANNEL_ID):
        raise Exception("Get Live Channel Status: Invalid API call")


    # Get the live channel
    CHANNEL = await get_live_channel(AUTH_TOKEN, CHANNEL_ID)

    # Check if channel was found
    if (CHANNEL):
        # Check if there are status messages
        if (CHANNEL["status_messages"] and len(CHANNEL["status_messages"]) > 0):
            # Return the first status message
            return CHANNEL["status_messages"][0]



    # There are no status messages
    return ""

