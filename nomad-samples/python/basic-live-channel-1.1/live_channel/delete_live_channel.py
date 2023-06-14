from constants.project_constants import *
from live_channel.get_live_channel_inputs_ids import *
from live_input.delete_live_input import *
from exceptions.api_exception_handler import *
from live_channel.wait_live_channel_status import *
from live_channel.live_channel_statuses import *

from libraries import requests, json

'''
 * Delete Live Channel and optionally delete its Live Inputs
 *
 * @param {string} AUTH_TOKEN        | Authorization token
 * @param {string} CHANNEL_ID        | The ID of the Live Channel to delete
 * @param {Boolean} DELETE_INPUTS    | Flag to delete Live Channel's Live Inputs or not
'''
async def delete_live_channel(AUTH_TOKEN, CHANNEL_ID, DELETE_INPUTS = False):
    # Check for valid parameters
    if (not AUTH_TOKEN or not CHANNEL_ID):
        raise Exception("Delete Live Channel: Invalid API call")


    # If delete Live Inputs then get their IDs
    INPUT_IDS = None
    if (DELETE_INPUTS == True):
        INPUT_IDS = await get_live_channel_inputs_ids(AUTH_TOKEN, CHANNEL_ID)


    # Create header for the request
    HEADERS = {
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.delete(SERVER_URL + "/liveChannel/ " + CHANNEL_ID , headers= HEADERS)

        # Wait for the Live Channel to be deleted
        await wait_for_live_channel_status(AUTH_TOKEN, CHANNEL_ID, LIVE_CHANNEL_STATUSES["Deleted"], 30, 2)

        # If the Live Channel had Live Inputs
        if (DELETE_INPUTS and INPUT_IDS and len(INPUT_IDS) > 0):
            # Loop deleted Live Channel Live Inputs
            for IDS in INPUT_IDS:
                # Delete Live Input
                await delete_live_input(AUTH_TOKEN, IDS)



        # Return JSON response
        return json.loads(RESPONSE.text)

    except:
        await api_exception_handler(RESPONSE, "Delete Live Channel " + CHANNEL_ID + " failed")

