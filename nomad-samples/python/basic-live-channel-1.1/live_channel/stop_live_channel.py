from constants.project_constants import *
from exceptions.api_exception_handler import *
from live_channel.live_channel_statuses import *
from live_channel.wait_live_channel_status import *

'''
 * Stop a live channel
 *
 * @param {string} AUTH_TOKEN    | Authentication token
 * @param {string} CHANNEL_ID    | The ID of the channel to stop
'''
async def stop_live_channel(AUTH_TOKEN, CHANNEL_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not CHANNEL_ID):
        raise Exception("Stop Live Channel: Invalid API call")


    # Create header for the request
    HEADERS = {
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    # Send the request
    try:
        RESPONSE = requests.post(SERVER_URL + "/liveChannel/" + CHANNEL_ID + "/stop", headers= HEADERS)

        # Wait for the live channel to be idle
        await wait_for_live_channel_status(AUTH_TOKEN, CHANNEL_ID, LIVE_CHANNEL_STATUSES["Idle"], 120, 2)
        return

    except:
        await api_exception_handler(RESPONSE, "Stop Live Channel " + CHANNEL_ID + " failed")

