from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

def create_content_group(AUTH_TOKEN: str, CONTENT_GROUP_NAME: str) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authentication token not found")
  
    API_URL = PORTAL_API_URL + "/contentgroup"
    
    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    BODY = {
        "Name": CONTENT_GROUP_NAME
    }

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)
   	
    except:
      	api_exception_handler(RESPONSE, "Create content groups failed")