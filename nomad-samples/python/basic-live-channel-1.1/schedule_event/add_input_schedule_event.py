from constants.system_constants import *
from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def add_input_schedule_event(AUTH_TOKEN, DATA):
    # Check for valid parameters
    if (not AUTH_TOKEN or not DATA):
        raise Exception("Add Input Schedule Event: Invalid API call")


    # Build the payload BODY
    BODY = {
        "channelId": DATA["channelId"],
        "type": {
            "id": LIVE_INPUT_LOOKUP_ID,
            "description": "Live Input"
        },
        "liveInput": {
            "id": DATA["inputId"],
            "description": "name"#DATA["name"]
        },
        "previousId": DATA["previousId"]
    }


    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.post(ADMIN_URL + "/liveChannel/" + DATA["channelId"] + "/liveScheduleEvent",  headers= HEADERS, data= json.dumps(BODY))
    
        if not RESPONSE.ok:
            raise Exception()
        
        # Return JSON response
        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Add Input Schedule Event failed")

