from constants.project_constants import *
from exceptions.api_exception_handler import *
from live_input.live_input_statuses import *
from live_input.wait_live_input_status import *

from libraries import json, requests

'''
 * Delete Live Input
 *
 * NOTE: Live inputs being used in live channels can't be deleted
 *
 * @param {string} AUTH_TOKEN    | Authentication token
 * @param {string} INPUT_ID      | The ID of the input to delete
'''
async def delete_live_input(AUTH_TOKEN, INPUT_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not INPUT_ID):
        raise Exception("Delete Live Input: Invalid API call")


    # Create header for the request
    HEADERS = {
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.delete(SERVER_URL + "/liveInput/" + INPUT_ID, headers= HEADERS)

        # Wait for the live input to be deleted
        await wait_for_live_input_status(AUTH_TOKEN, INPUT_ID, LIVE_INPUT_STATUSES["Deleted"], 60, 2)

        # Return the JSON response
        return json.loads(RESPONSE.text)

    except:

        await api_exception_handler(RESPONSE, "Delete Live Input " + INPUT_ID + " failed")

