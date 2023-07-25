from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def get_live_inputs(AUTH_TOKEN):
    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Get Live Inputs: Invalid API call")


    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.get(f"{ADMIN_URL}/liveInput", headers= HEADERS)
    
        # Return JSON response
        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Get Live Inputs failed")

