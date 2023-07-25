from constants.project_constants import *
from exceptions.api_exception_handler import *

import json
import requests

def verify(EMAIL: str, CODE: int) -> dict:
    if not EMAIL:
        raise Exception("Email: The email is invalid")
    
    if not CODE:
        raise Exception("Code: The code is invalid")
    
    API_URL = PORTAL_API_URL + "/account/verify"

    HEADERS = {
      "Content-Type": "application/json"
    }
    
    # replace username and password with your username and password
    BODY = {
    	"userName": EMAIL, 
        "token": CODE
    }

    try:
        RESPONSE = requests.post(API_URL, headers=HEADERS, data=json.dumps(BODY))
        if not RESPONSE.ok:
            raise Exception()

        return json.loads(RESPONSE.text)
    except:
      api_exception_handler(RESPONSE, "Verification failed")
            
