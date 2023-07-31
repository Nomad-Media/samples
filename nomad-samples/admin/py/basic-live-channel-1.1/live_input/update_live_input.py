from constants.project_constants import *
from exceptions.api_exception_handler import *
from helpers.slugify import *
from live_input.live_input_statuses import *
from live_input.live_input_types import *
from live_input.wait_live_input_status import *

import json, requests

def update_live_input(AUTH_TOKEN, ID, NAME, TYPE, SOURCE):
    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    # Build the payload BODY
    # Error Object of type set is not JSON serializable
    BODY = { "id": ID }

    if NAME != "":
        BODY["name"] = NAME
        BODY["internalName"] = slugify(NAME)
    if TYPE != "": BODY["type"] = { "id": TYPE }


    # Set the appropriate fields based on the type
    if (TYPE == "RTMP_PUSH"):
        if SOURCE: BODY["sourceCidr"] = SOURCE
    elif (TYPE == "RTMP_PULL" or TYPE == "RTP_PUSH" or TYPE == "URL_PULL"):
        if SOURCE: BODY["sources"] = [{ "url": SOURCE }]

    try:
        RESPONSE = requests.put(ADMIN_URL + "/liveInput",  headers= HEADERS, data= json.dumps(BODY))
    
        # Parse JSON response
        INFO = RESPONSE.json()

        # Wait for the Live Input to be detached if it was just created
        wait_for_live_input_status(AUTH_TOKEN, INFO["id"], LIVE_INPUT_STATUSES["Detached"], 15, 1)

        return INFO
    
    except:
        api_exception_handler(RESPONSE, f"Creating Live Input {NAME} failed")

