from constants.project_constants import *
from exceptions.api_exception_handler import *

import requests

def remove_input_schedule_event(AUTH_TOKEN, CHANNEL_ID, INPUT_ID):

    API_URL = f"{ADMIN_URL}/liveChannel/{CHANNEL_ID}/liveScheduleEvent/{INPUT_ID}" 

    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        RESPONSE = requests.delete(API_URL, headers= HEADERS)

        if not RESPONSE.ok:
            raise Exception()
        
    except:
        api_exception_handler(RESPONSE, "Remove Input Schedule Event failed")