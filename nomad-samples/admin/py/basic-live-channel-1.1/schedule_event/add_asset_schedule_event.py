from constants.system_constants import *
from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def add_asset_schedule_event(AUTH_TOKEN, DATA):
    # Check for valid parameters
    if (not AUTH_TOKEN or not DATA):
        raise Exception("Add Asset Schedule Event: Invalid API call")


    # Build the payload BODY
    BODY = {
        "id": DATA["id"],
        "isLoop": False,
        "channelId": DATA["channelId"],
        "type": {
            "id": VIDEO_ASSET_LOOKUP_ID,
            "description": "Video Asset"
        },
        "asset": {
            "id": DATA["assetId"],
            "description": "Video"
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
        RESPONSE = requests.post(ADMIN_URL + "/liveChannel/" + DATA["channelId"] + "/liveScheduleEvent", headers= HEADERS, data= json.dumps(BODY))
    
        
        if not RESPONSE.ok:
            raise Exception()
        
        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Add Asset Schedule Event failed")

