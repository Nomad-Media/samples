from constants.project_constants import *
from exceptions.api_exception_handler import *


import requests, json

def get_live_channels(AUTH_TOKEN):
    API_URL = f"{ADMIN_URL}/liveChannel"

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
        
        

        return RESPONSE.json()


    except:
        api_exception_handler(RESPONSE, f"Get Live Channels failed")

