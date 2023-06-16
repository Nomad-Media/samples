from constants.project_constants import *
from exceptions.api_exception_handler import *

from libraries import json, requests

'''
 * Get Live Inputs
 *
 * Note: Live Inputs are direct calls,
 *       they are not indexed, thus, the Search API cannot be used.
 *
 * @param {string} AUTH_TOKEN    | Authentication token
 * @returns JSON Object containing a list of live inputs
'''
async def get_live_inputs(AUTH_TOKEN):
    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Get Live Inputs: Invalid API call")


    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.get(SERVER_URL + "/liveInput", headers= HEADERS)
    
        # Return JSON response
        return json.loads(RESPONSE.text)

    except:
        await api_exception_handler(RESPONSE, "Get Live Inputs failed")

