from constants.project_constants import *
from exceptions.api_exception_handler import *
from live_channel.live_channel_statuses import *
from live_channel.wait_live_channel_status import *

from libraries import json, requests
'''
 * Start a live channel
 *
 * @param {string} AUTH_TOKEN    | Authentication token
 * @param {string} CHANNEL_ID    | The ID of the channel to start
'''
async def start_live_channel(AUTH_TOKEN, CHANNEL_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not CHANNEL_ID):
        raise Exception("Start Live Channel: Invalid API call")


    # Create header for the request
    HEADERS = {
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.post(SERVER_URL + "/liveChannel/" + CHANNEL_ID + "/start", headers= HEADERS)

    
    
        # Wait for the Live Channel to be running
        await wait_for_live_channel_status(AUTH_TOKEN, CHANNEL_ID, LIVE_CHANNEL_STATUSES["Running"], 120, 2)
        return

    except:
        raise Exception("Start Live Channel " + CHANNEL_ID + " failed\n" + json.dumps(RESPONSE))

