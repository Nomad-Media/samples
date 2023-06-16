from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

# @param {string} AUTH_TOKEN - The authentication token

def guest_invite(AUTH_TOKEN: str) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authentication token not found")
        
    API_URL = "https://" + PORTAL_API_URL + "/account/invite-user"

    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }
    
    # replace username and password with your username and password
    BODY = {
      	"contentDefinitionId": "bf8ac754-5b8b-4330-b1aa-76f15fb7f673",
        "emails":
        [
            "pawev59721@ozatvn.com"
        ]
    }

    RESPONSE = None
    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))
    
        return json.loads(RESPONSE.text)
    except:
      	api_exception_handler(RESPONSE, "Guest invite failed")

