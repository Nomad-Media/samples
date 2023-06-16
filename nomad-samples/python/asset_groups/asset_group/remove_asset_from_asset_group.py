from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

def remove_asset_to_asset_group(AUTH_TOKEN: str, ASSET_GROUP_ID, ASSETS: list) -> dict:
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")
  
    API_URL = PORTAL_API_URL + "/assetgroup/remove/" + ASSET_GROUP_ID

    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }
    
    BODY = ASSETS

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        
        if RESPONSE.status_code != 200:
            raise Exception("Response returned " + str(RESPONSE.status_code))
        

        return json.loads(RESPONSE.text)
    
    except:
      	api_exception_handler(RESPONSE, "Remove asset to asset group failed")