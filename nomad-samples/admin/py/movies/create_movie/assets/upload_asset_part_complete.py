from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def upload_asset_part_complete(AUTH_TOKEN: str, PART_ID: str, ETAG: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = ADMIN_API_URL + "/asset/upload/part/" + PART_ID + "/complete"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {
        "etag": ETAG
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if not RESPONSE.ok:
            raise Exception()

    except:
        api_exception_handler(RESPONSE, "Upload asset part failed")

