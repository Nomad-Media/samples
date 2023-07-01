from constants.project_constants import *
from exceptions.api_exception_handler import *

import json, requests

def get_content_group(AUTH_TOKEN: str, CONTENT_GROUP_ID: str) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authorization token not found")
  
    API_URL = f"{PORTAL_API_URL}/contentGroup/{CONTENT_GROUP_ID}"
    
    HEADERS = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        RESPONSE = requests.get(API_URL, headers=HEADERS)

        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))
    		
        return json.loads(RESPONSE.text)
      
    except:
      	api_exception_handler(RESPONSE, "Get content group failed: ")