from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

async def get_live_input(AUTH_TOKEN, INPUT_ID):
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

