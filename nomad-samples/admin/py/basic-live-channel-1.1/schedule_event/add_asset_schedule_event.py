from constants.system_constants import *
from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def add_asset_schedule_event(AUTH_TOKEN, ID, CHANNEL_ID, ASSET_ID, IS_LOOP):
    API_URL = f"{ADMIN_URL}/liveChannel/{CHANNEL_ID}/liveScheduleEvent" 

    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    # Build the payload BODY
    BODY = {
        "id": ID,
        "isLoop": IS_LOOP,
        "channelId": CHANNEL_ID,
        "type": {
            "id": VIDEO_ASSET_LOOKUP_ID,
            "description": "Video-Asset"
        },
        "asset": {
            "id": ASSET_ID,
            "description": "Video"
        },
        "previousId": None,
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))
    
        
        if not RESPONSE.ok:
            raise Exception()
        
        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Add Asset Schedule Event failed")

