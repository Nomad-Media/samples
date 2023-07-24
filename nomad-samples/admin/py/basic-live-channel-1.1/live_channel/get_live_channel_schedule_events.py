from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def get_live_channel_schedule_events(AUTH_TOKEN, CHANNEL_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not CHANNEL_ID):
        raise Exception("Get Live Schedule Events: Invalid API call")


    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.get(ADMIN_URL + "/liveChannel/" + CHANNEL_ID + "/liveScheduleEvent", headers= HEADERS)

        if not RESPONSE.ok:
            raise Exception()
        
        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Get Live Channel Schedule Events failed")

