from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def get_video_tracking_alert(AUTH_TOKEN: str, EXTERNAL_ID: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = VIDEO_COMPARE_API_URL + "/videocompare/tracking/manifest/" + EXTERNAL_ID + "/getTracking"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer abc...xyz",
		    "Content-Type": "application/json"
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS)

        # Get the response
        

        if not RESPONSE.ok:
            raise Exception()

        

        return json.loads(RESPONSE.text)

    except:
        raise Exception("Search failed")

