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


    # Build the payload BODY
    # Error Object of type set is not JSON serializable
    BODY = {
        "name": DATA["name"],
        "internal_name": DATA["internalName"],
        "type": { "id": DATA["type"] }
    }


    # Set the appropriate fields based on the type
    #if (DATA["type"] == LIVE_INPUT_TYPES["RTM_PUSH"]):

    if (DATA["type"] == LIVE_INPUT_TYPES["RTMP_PUSH"]):
        BODY["sourceCidr"] = DATA["source"]
    #elif (DATA["type"] == LIVE_INPUT_TYPES["RTMP_PULL"]):
    elif (DATA["type"] == LIVE_INPUT_TYPES["URL_PULL"]):
        BODY["sources"] = []
        BODY["sources"].append({ "url": DATA["source"] })
    else:
        print("Create Live Input: Unknown Live Input Type " + DATA["type"])
        exit


    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        METHOD = None
        # Send the request
        if "id" in DATA:
            RESPONSE = requests.put(ADMIN_URL + "/liveInput",  headers= HEADERS, data= json.dumps(BODY))
            BODY["id"] = DATA["id"]
            METHOD = "PUT"
        else:
            RESPONSE = requests.post(ADMIN_URL + "/liveInput",  headers= HEADERS, data= json.dumps(BODY))
            METHOD = "POST"
    
        # Parse JSON response
        INFO = RESPONSE.text

        # Wait for the Live Input to be detached if it was just created
        if (METHOD == "POST"):
            wait_for_live_input_status(AUTH_TOKEN, INFO["id"], LIVE_INPUT_STATUSES["Detached"], 15, 1)

        return json.loads(INFO)
    except:

        # Handle error based on METHOD
        ERROR_METHOD = "Create"
        if (METHOD == "PUT"):
            ERROR_METHOD = "Update"


        api_exception_handler(RESPONSE, f"{ERROR_METHOD} Live Input {DATA['name']} failed")

