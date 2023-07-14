from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def share_content_group_with_user(AUTH_TOKEN: str, CONTENT_GROUP_ID: str, USER_IDS: list) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    API_URL = f"{PORTAL_API_URL}/contentGroup/share/{CONTENT_GROUP_ID}"
    
    HEADERS = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + AUTH_TOKEN
    }
    
    BODY = USER_IDS

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))

        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))
    		
        return json.loads(RESPONSE.text)
      
    except:
      	api_exception_handler(RESPONSE, "Share content group with user failed")