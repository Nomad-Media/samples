from constants.project_constants import *
from exceptions.api_exception_handler import *


from libraries import requests, json
'''
 * GET Live Channel
 *
 * @param {string} AUTH_TOKEN      | Authorization token
 * @param {string} CHANNEL_ID      | The ID of the live channel to get
 *
 * @returns JSON Object containing the requested live channel
'''
async def get_live_channel(AUTH_TOKEN, CHANNEL_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not CHANNEL_ID):
        raise Exception("Get Live Channel: Invalid API call")


    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.get(SERVER_URL + "/liveChannel/" + CHANNEL_ID + "", headers= HEADERS)
        
        
        
        # If not found return None
        if (RESPONSE.status_code != 200):
            raise Exception()
        
        

        return json.loads(RESPONSE.text)


    except:
        await api_exception_handler(RESPONSE, "Get Live Channel with ID " + CHANNEL_ID + " failed")

