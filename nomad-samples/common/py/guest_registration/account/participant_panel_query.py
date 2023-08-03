from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

# @param {string} AUTH_TOKEN - The authentication token

def participant_panel_query(AUTH_TOKEN: str, ID: str) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authentication token not found")

    API_URL = "https://" + PORTAL_API_URL + "/user-session/" + ID

    HEADERS = {
        "Content-Type": "application/json",
      	"Authorization": "Bearer " + AUTH_TOKEN
    }
    
    BODY = {
        "id": ID
    }
    
    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)
    except:
      raise Exception("Participant panel query filed")