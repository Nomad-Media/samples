from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def deleting_event_instance(AUTH_TOKEN: str, CONTENT_ID: str, ID: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = ADMIN_API_URL + "/content/" + CONTENT_ID + "?contentDefinitionId=d34f116d-2a51-4d4a-b928-5dd581d9fd5e"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        # Send the request
        RESPONSE = requests.delete(API_URL, headers= HEADERS)

        if RESPONSE.status_code != 204:
            raise Exception("Response returned " + str(RESPONSE.status_code))

    except:
        api_exception_handler(RESPONSE, "Deleting event instance failed")

