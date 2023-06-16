from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def update_user(AUTH_TOKEN: str, BODY: dict) -> dict:
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")
  
    API_URL = PORTAL_API_URL + "/account"
  
    # Create header for the request
    HEADERS = {
        "Content-Type": "application/json"
    }
    
    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)
    except:
        api_exception_handler(RESPONSE, "Update user failed")