from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def get_channel_frame_manifest(AUTH_TOKEN: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = VIDEO_COMPARE_API_URL + "/videocompare/tracking/manifest"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer abc...xyz",
		    "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {
        "VideoTrackingId": "abc00000-0000-0000-0000-000000000000",   
        "FrameDt": "2022-10-05T17:22:07+05:00"
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        # Get the response
        

        if not RESPONSE.ok:
            raise Exception()

        

        return json.loads(RESPONSE.text)

    except:
        raise Exception("Search failed")

