from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

# @param {string} AUTH_TOKEN - The authentication token

def ping_user(AUTH_TOKEN: str, APPLICATION_ID: str, USER_ID: str) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authentication token not found")
        
    API_URL = f"PORTAL_API_URL/account/ping"

    HEADERS = {
        "Content-Type": "application/json",
      	"Authorization": "Bearer " + AUTH_TOKEN
    }
    
    # replace username and password with your username and password
    BODY = {
      	"applicationId": APPLICATION_ID,
        "userId": USER_ID
    }

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)
    except:
      	api_exception_handler(RESPONSE, "Removing Guest Failed")

