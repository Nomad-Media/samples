from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def forms(AUTH_TOKEN: str, ID: str, FIRST_NAME: str, LAST_NAME: str, ACTIVE: bool, 
          START_DATE: str, LOOKUP_ID: str, DESCRIPTION: str) -> dict:

    # Check for valid parameters
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")

    API_URL = f"{PORTAL_API_URL}/media/form/{ID}"
        
    # Create header for the request
    HEADERS = {
  	    "Authorization": "Bearer "+ AUTH_TOKEN,
        "Content-Type": "application/json"
    }

    # Build the payload BODY
    BODY = {
        "firstName": FIRST_NAME,
        "lastName": LAST_NAME,
        "active": ACTIVE,
        "startDate": START_DATE,
        "state": {
            "lookupId": LOOKUP_ID,
            "description": DESCRIPTION
        }
    }

    try:
        # Send the request
        RESPONSE = requests.post(API_URL, headers= HEADERS, data= json.dumps(BODY))

        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)

    except:
        api_exception_handler(RESPONSE, "Forms failed")

