from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def stop_sharing_content_group_with_user(AUTH_TOKEN: str, CONTENT_GROUP_ID: str, USER_IDS: list) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    API_URL = f"{PORTAL_API_URL}/contentGroup/stopshare/{CONTENT_GROUP_ID}"
    
    HEADERS = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + AUTH_TOKEN
    }
    
    BODY = USER_IDS

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))

        if not RESPONSE.ok:
            raise Exception("Response returned " + str(RESPONSE.status_code))
    		
        return json.loads(RESPONSE.text)
      
    except:
        api_exception_handler(RESPONSE, "Share collection to user failed: ")