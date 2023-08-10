from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def remove_asset_schedule_event(AUTH_TOKEN, CHANNEL_ID, SCHEDULE_EVENT_ID):
    API_URL = f"{ADMIN_URL}/liveChannel/{CHANNEL_ID}/liveScheduleEvent/{SCHEDULE_EVENT_ID}"

    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.delete(API_URL, headers= HEADERS)
    
        
        if not RESPONSE.ok:
            raise Exception()
        
        return json.loads(RESPONSE.text)
    
    except:
        api_exception_handler(RESPONSE, "Remove Asset Schedule Event failed")