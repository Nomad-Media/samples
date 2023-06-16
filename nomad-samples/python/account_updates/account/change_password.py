from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def change_password(AUTH_TOKEN: str, CURRENT_PASSWORD: str, NEW_PASSWORD: str) -> dict:
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")
  
    API_URL = PORTAL_API_URL + "/account/change-password"
  
    # Create header for the request
    HEADERS = {
        "Content-Type": "application/json"
    }

    # Build the payload body
    BODY = {
        "password": CURRENT_PASSWORD,
        "newPassword": NEW_PASSWORD
    }
    
    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        
        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

    except:
        api_exception_handler(RESPONSE, "Change password failed")