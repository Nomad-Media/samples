from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def delete_video_tracking_job(AUTH_TOKEN: str, EXTERNAL_ID) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = VIDEO_COMPARE_API_URL + "/videocompare/tracking/manifest/" + EXTERNAL_ID
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer abc...xyz",
		    "Content-Type": "application/json"
    }

    try:
        # Send the request
        RESPONSE = requests.delete(API_URL, headers= HEADERS)

        # Get the response
        

        if not RESPONSE.ok:
            raise Exception()

        

        return json.loads(RESPONSE.text)

    except:
        raise Exception("Search failed")

