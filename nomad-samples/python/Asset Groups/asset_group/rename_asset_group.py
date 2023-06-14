from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

def rename_asset_group(AUTH_TOKEN: str, ID: str) -> dict:
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")
  
    API_URL = PORTAL_API_URL + "/assetgroup/" + ID

    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }
    
    BODY = {
        "Name": "New Asset Group"
    }

    try:
        RESPONSE = requests.patch(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))

        return json.loads(RESPONSE.text)
    
    except:
      	api_exception_handler(RESPONSE, "Rename asset group failed")