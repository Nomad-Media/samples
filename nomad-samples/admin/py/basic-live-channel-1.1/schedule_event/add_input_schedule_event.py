from constants.system_constants import *
from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def add_input_schedule_event(AUTH_TOKEN, CHANNEL_ID, INPUT_ID, ON_AIR_TIME):
    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    # Build the payload BODY
    BODY = {
        "channelId": CHANNEL_ID,
        "fixedOnAirTimeUtc": ON_AIR_TIME,
        "type": {
            "id": LIVE_INPUT_LOOKUP_ID,
            "description": "Live Input"
        },
        "liveInput": {
            "id": INPUT_ID,
            "description": "name"
        }
    }


    try:
        # Send the request
        RESPONSE = requests.post(ADMIN_URL + "/liveChannel/" + CHANNEL_ID + "/liveScheduleEvent",  headers= HEADERS, data= json.dumps(BODY))
    
        if not RESPONSE.ok:
            raise Exception()
        
        # Return JSON response
        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Add Input Schedule Event failed")

