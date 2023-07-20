from constants.project_constants import *
from exceptions.api_exception_handler import *


import requests, json

def get_live_channel(AUTH_TOKEN, CHANNEL_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not CHANNEL_ID):
        raise Exception("Get Live Channel: Invalid API call")

    API_URL = f"{ADMIN_URL}/liveChannel/{CHANNEL_ID}"

    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        # Send the request
        RESPONSE = requests.get(API_URL, headers= HEADERS)
        
        
        
        # If not found return None
        if (not RESPONSE.ok):
            raise Exception()
        
        

        return json.loads(RESPONSE.text)


    except:
        api_exception_handler(RESPONSE, f"Get Live Channel with ID {CHANNEL_ID} failed")

