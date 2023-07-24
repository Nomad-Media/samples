from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def change_email(AUTH_TOKEN: str, EMAIL: str, PASSWORD: str) -> dict:
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")
  
    API_URL = PORTAL_API_URL + "/account/change-email"
  
    # Create header for the request
    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    # Build the payload body
    BODY = {
        "password": PASSWORD,
        "newEmail": EMAIL
    }
    
    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)
    except:
        api_exception_handler(RESPONSE, "Change email failed")