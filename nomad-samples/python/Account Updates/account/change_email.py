from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def change_email(AUTH_TOKEN: str) -> dict:
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")
  
    API_URL = PORTAL_API_URL + "/account/change-email"
  
    # Create header for the request
    HEADERS = {
        "Content-Type": "application/json"
    }

    # Build the payload body
    BODY = {
        "password": "currentPassword",
        "newEmail": "newEmail@newEmail.net"
    }
    
    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)
    except:
        api_exception_handler(RESPONSE, "Change email failed")