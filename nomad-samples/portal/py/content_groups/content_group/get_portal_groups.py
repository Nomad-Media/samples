from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def get_portal_groups(AUTH_TOKEN: str, RETURNED_GROUP_NAMES: list) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    API_URL = f"{PORTAL_API_URL}/portal/groups"
    
    HEADERS = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + AUTH_TOKEN
    }
    
    BODY = {
      "returnedGroupNames": RETURNED_GROUP_NAMES
    }

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))

        if not RESPONSE.ok:
            raise Exception()
    		
        return json.loads(RESPONSE.text)
      
    except:
      	api_exception_handler(RESPONSE, "Get poral groups failed: ")