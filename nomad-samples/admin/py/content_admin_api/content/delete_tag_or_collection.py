from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def delete_tag_or_collection(AUTH_TOKEN: str, TYPE: str, TAG_ID: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = f"{ADMIN_API_URL}/admin/{TYPE}/{TAG_ID}"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        # Send the request
        RESPONSE = requests.delete(API_URL, headers= HEADERS)

        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "delete tag or colleciton failed")

