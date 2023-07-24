from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

def delete_content_group(AUTH_TOKEN: str, CONTENT_GROUP_ID) -> dict:
    if (not AUTH_TOKEN):
        raise Exception("Authentication Token: The authentication token is invalid")
  
    API_URL = PORTAL_API_URL + "/contentgroup/" + CONTENT_GROUP_ID

    HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AUTH_TOKEN
    }

    try:
        RESPONSE = requests.delete(API_URL, headers=HEADERS)
        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)
   	
    except:
      	api_exception_handler(RESPONSE, "Delete content group failed")