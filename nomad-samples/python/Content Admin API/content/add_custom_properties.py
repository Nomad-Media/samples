from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def add_custom_properties(AUTH_TOKEN: str, ID: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = ADMIN_API_URL + "/admin/asset/" + ID
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {
        "displayName": "new name goes here",
        "customProperties": {
            "customProp1": "new value",
          	"customProp2": None
        }
    }

    try:
        # Send the request
        RESPONSE = requests.patch(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "add custom properties failed")

