from constants.project_constants import *
from exceptions.api_exception_handler import *
from live_channel.live_channel_statuses import *
from live_channel.wait_live_channel_status import *
from live_channel.live_channel_types import *

import json, requests

def create_live_channel(AUTH_TOKEN, DATA):
    # Check for valid parameters
    if (not AUTH_TOKEN or not DATA):
        raise Exception("Create Live Channel: Invalid API call")


    # Build the payload BODY
    BODY = {
        "name": DATA["name"],
        "routeName": DATA["route"],
        "thumbnailImage": "",
        #"archiveFolderAsset": DATA["archiveFolderAsset"],
        "isSecureOutput": False,
        "outputScreenshots": True,
        "type": { "id": DATA["type"] }
    }


    # Set the appropriate fields based on the channel type
    if (DATA["type"] == LIVE_CHANNEL_TYPES["External"]):
        BODY["channelId"] = None
        BODY["externalUrl"] = DATA["url"]


    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        if "id" in DATA:
            RESPONSE = requests.put(f"{ADMIN_URL}/liveChannel",  headers= HEADERS, data= json.dumps(BODY))
            
            METHOD = "PUT"
            BODY["id"] = DATA["id"]
        else:
            RESPONSE = requests.post(f"{ADMIN_URL}/liveChannel",  headers= HEADERS, data= json.dumps(BODY))
            INFO = json.loads(RESPONSE.text)
            wait_for_live_channel_status(AUTH_TOKEN, INFO["id"], LIVE_CHANNEL_STATUSES["Idle"], 120, 2)
            METHOD = "POST"

        if not RESPONSE.ok:
            raise Exception()
        
        return json.loads(RESPONSE.text)

    except:
        # Handle error based on method
        ERROR_METHOD = "Create"
        if (METHOD == "PUT"):
            ERROR_METHOD = "Update"


        api_exception_handler(RESPONSE, ERROR_METHOD + " Live Channel " + DATA["name"] + " failed")

