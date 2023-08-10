from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

# @param {string} AUTH_TOKEN - The authentication token

def participant_panel_query(AUTH_TOKEN: str, ID: str, API) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authentication token not found")

    if API == "portal":
        API_URL = f"{PORTAL_API_URL}/user-session/{ID}"
    else:
        API_URL = f"{PORTAL_API_URL}/admin/user-session/{ID}"

    HEADERS = {
        "Content-Type": "application/json",
      	"Authorization": "Bearer " + AUTH_TOKEN
    }
    
    try:
        RESPONSE = requests.get(API_URL, headers=HEADERS)
        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)
    except:
      raise Exception("Participant panel query filed")