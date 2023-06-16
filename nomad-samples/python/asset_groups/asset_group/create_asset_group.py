from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

def create_asset_group(AUTH_TOKEN: str, BODY: dict) -> dict:
    if not AUTH_TOKEN:
        raise Exception("Authentication token not found")
  
    API_URL = PORTAL_API_URL + "/assetgroup"
    
    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    BODY = BODY

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)
   	
    except:
      	api_exception_handler(RESPONSE, "Create asset groups failed")