from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def deleting_event_instance(AUTH_TOKEN: str, CONTENT_ID: str, CONTENT_DEFINITION_ID: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = f"{ADMIN_API_URL}/content/{CONTENT_ID}?contentDefinitionId={CONTENT_DEFINITION_ID}"
        
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

    except:
        api_exception_handler(RESPONSE, "Deleting event instance failed")

