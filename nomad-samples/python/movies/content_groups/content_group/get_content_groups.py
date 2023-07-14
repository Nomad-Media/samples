from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

def get_content_groups(AUTH_TOKEN: str) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authentication token not found")
  
    API_URL = PORTAL_API_URL + "/contentgroup"
    
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
      	api_exception_handler(RESPONSE, "Get content groups failed")