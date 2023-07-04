from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def track_video_hidden(AUTH_TOKEN: str, ASSET_ID: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = f"{PORTAL_API_URL}/asset/tracking?assetId={ASSET_ID}&trackingEvent=5"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        # Send the request
        RESPONSE = requests.get(API_URL, headers= HEADERS)

        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

    except:
        api_exception_handler(RESPONSE, "Track video with hidden failed")

