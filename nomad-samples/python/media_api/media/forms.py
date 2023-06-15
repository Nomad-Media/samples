from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def forms(AUTH_TOKEN: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = PORTAL_API_URL + "/media/form/a13429e6-85e2-4e38-a4d7-3fe3179a2e99"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer "+ AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {
        "firstName": "Dwight",
        "lastName": "Fairfield",
        "active": True,
        "startDate": "2022-09-12T10:00:00Z",
        "state": {
            "lookupId": "37ab0b00-8214-4a55-9e67-e9ff7858b29e",
            "description": "California"
        }
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Forms failed")

