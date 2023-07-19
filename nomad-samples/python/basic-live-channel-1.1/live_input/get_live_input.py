from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

'''
 * GET Live Input
 *
 * Note: Live Inputs are direct calls,
 *       they are not indexed, thus, the Search API cannot be used.
 *
 * @param {string} AUTH_TOKEN    | Authentication token
 * @param {string} INPUT_ID      | The ID of the live input to get
 *
 * @returns JSON Object containing the requested live input
'''
async def get_live_input(AUTH_TOKEN, INPUT_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not INPUT_ID):
        raise Exception("Get Live Input: Invalid API call")


    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.get(ADMIN_URL + "/liveInput/" + INPUT_ID, headers= HEADERS)

        

        # If not found return None
        if (not RESPONSE.ok):
            raise Exception("Live Input with ID " + INPUT_ID + " was not found")
        
        

        return json.loads(RESPONSE.text)


    except:
        await api_exception_handler(RESPONSE, f"Get Live Input with ID {INPUT_ID} failed")

