from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def update_user(AUTH_TOKEN: str) -> dict:
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")
  
    API_URL = PORTAL_API_URL + "/account"
  
    # Create header for the request
    HEADERS = {
        "Content-Type": "application/json"
    }

    # Build the payload body
    BODY = {
        "id": "990a1ebc-3344-41fc-a331-4009b3773229",
        "email": "d.fletcher@example.net",
        "firstName": "Deanna ",
        "lastName": "Fletcher",
        "mobilePhone": "949-555-4545"
    }
    
    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)
    except:
        api_exception_handler(RESPONSE, "Update user failed")