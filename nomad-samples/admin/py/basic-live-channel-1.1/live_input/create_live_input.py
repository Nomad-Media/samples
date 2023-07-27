from constants.project_constants import *
from exceptions.api_exception_handler import *
from live_input.live_input_types import *
from live_input.live_input_statuses import *
from live_input.wait_live_input_status import *

import json, requests

def create_live_input(AUTH_TOKEN, DATA):
    # Check for valid parameters
    if (not AUTH_TOKEN or not DATA):
        raise Exception("Create Live Input: Invalid API call")


    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    # Build the payload BODY
    # Error Object of type set is not JSON serializable
    BODY = {
        "name": DATA["name"],
        "internalName": DATA["internalName"],
        "type": { "id": DATA["type"] }
    }


    # Set the appropriate fields based on the type
    if (DATA["type"] == LIVE_INPUT_TYPES["RTM_PUSH"]):
        pass
    elif (DATA["type"] == LIVE_INPUT_TYPES["RTMP_PUSH"]):
        BODY["sourceCidr"] = DATA["source"]
    elif (DATA["type"] == LIVE_INPUT_TYPES["RTMP_PULL"]):
        pass
    elif (DATA["type"] == LIVE_INPUT_TYPES["URL_PULL"]):
        BODY["sources"] = []
        BODY["sources"].append({ "url": DATA["source"] })
    else:
        print("Create Live Input: Unknown Live Input Type " + DATA["type"])
        exit

    try:
        RESPONSE = requests.post(ADMIN_URL + "/liveInput",  headers= HEADERS, data= json.dumps(BODY))
    
        # Parse JSON response
        INFO = RESPONSE.text

        # Wait for the Live Input to be detached if it was just created
        wait_for_live_input_status(AUTH_TOKEN, INFO["id"], LIVE_INPUT_STATUSES["Detached"], 15, 1)

        return json.loads(INFO)
    
    except:
        api_exception_handler(RESPONSE, f"Creating Live Input {DATA['name']} failed")

