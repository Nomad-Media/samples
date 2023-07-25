from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def get_specific_video_tracking_job_manifets(AUTH_TOKEN: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = VIDEO_COMPARE_API_URL + "/videocompare/tracking/" + videoTrackingId + "/manifest"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer abc...xyz",
		    "Content-Type": "application/json"
    }

    try:
        # Send the request
        RESPONSE = requests.get(API_URL, headers= HEADERS)

        # Get the response
        

        if not RESPONSE.ok:
            raise Exception()

        

        return json.loads(RESPONSE.text)

    except:
        raise Exception("Search failed")

